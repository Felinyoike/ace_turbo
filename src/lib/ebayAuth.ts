import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const TOKEN_FILE = path.join(process.cwd(), ".data", "ebay-tokens.json");

const BASE_AUTH_URL = process.env.EBAY_SANDBOX === "true"
  ? "https://auth.sandbox.ebay.com/oauth2/authorize"
  : "https://auth.ebay.com/oauth2/authorize";

const BASE_TOKEN_URL = process.env.EBAY_SANDBOX === "true"
  ? "https://api.sandbox.ebay.com/identity/v1/oauth2/token"
  : "https://api.ebay.com/identity/v1/oauth2/token";

const SCOPES = [
  "https://api.ebay.com/oauth/api_scope",
  "https://api.ebay.com/oauth/api_scope/sell.inventory",
  "https://api.ebay.com/oauth/api_scope/sell.account",
  "https://api.ebay.com/oauth/api_scope/sell.fulfillment"
].join(" ");

type StoredTokens = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

export function isEbayConfigured() {
  return !!(process.env.EBAY_APP_ID && process.env.EBAY_CERT_ID);
}

export function getEbayAuthUrl() {
  const appId = process.env.EBAY_APP_ID;
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const redirectUri = `${baseUrl}/api/ebay/callback`;
  const ruName = process.env.EBAY_REDIRECT_NAME || redirectUri;

  return `${BASE_AUTH_URL}?client_id=${appId}&response_type=code&redirect_uri=${encodeURIComponent(ruName)}&scope=${encodeURIComponent(SCOPES)}`;
}

function getBasicAuth() {
  const appId = process.env.EBAY_APP_ID || "";
  const certId = process.env.EBAY_CERT_ID || "";
  return Buffer.from(`${appId}:${certId}`).toString("base64");
}

export async function exchangeCodeForTokens(code: string): Promise<StoredTokens> {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const redirectUri = process.env.EBAY_REDIRECT_NAME || `${baseUrl}/api/ebay/callback`;

  const res = await fetch(BASE_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${getBasicAuth()}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`eBay token exchange failed: ${err}`);
  }

  const data = await res.json();
  const tokens: StoredTokens = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + (data.expires_in * 1000)
  };

  await saveTokens(tokens);
  return tokens;
}

export async function refreshAccessToken(): Promise<StoredTokens> {
  const existing = await loadTokens();
  if (!existing?.refreshToken) throw new Error("No eBay refresh token stored. Re-authenticate.");

  const res = await fetch(BASE_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${getBasicAuth()}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: existing.refreshToken,
      scope: SCOPES
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`eBay token refresh failed: ${err}`);
  }

  const data = await res.json();
  const tokens: StoredTokens = {
    accessToken: data.access_token,
    refreshToken: existing.refreshToken,
    expiresAt: Date.now() + (data.expires_in * 1000)
  };

  await saveTokens(tokens);
  return tokens;
}

export async function getValidAccessToken(): Promise<string> {
  if (process.env.EBAY_AUTH_TOKEN) {
    return process.env.EBAY_AUTH_TOKEN;
  }

  const tokens = await loadTokens();
  if (!tokens) throw new Error("Not connected to eBay. Please authenticate first.");

  if (Date.now() >= tokens.expiresAt - 60_000) {
    const refreshed = await refreshAccessToken();
    return refreshed.accessToken;
  }

  return tokens.accessToken;
}

export async function isEbayConnected(): Promise<boolean> {
  if (process.env.EBAY_AUTH_TOKEN) return true;
  const tokens = await loadTokens();
  return !!tokens?.refreshToken;
}

async function saveTokens(tokens: StoredTokens) {
  await mkdir(path.dirname(TOKEN_FILE), { recursive: true });
  await writeFile(TOKEN_FILE, JSON.stringify(tokens, null, 2), "utf8");
}

async function loadTokens(): Promise<StoredTokens | null> {
  try {
    const content = await readFile(TOKEN_FILE, "utf8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}
