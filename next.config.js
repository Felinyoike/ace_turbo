/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" }
    ]
  },
  async headers() {
    const scriptSrc = isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com"
      : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com";

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; img-src 'self' data: https:; ${scriptSrc}; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://driver-vehicle-licensing.api.gov.uk https://www.google-analytics.com https://pagead2.googlesyndication.com;`
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
