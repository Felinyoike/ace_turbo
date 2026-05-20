# Required Environment Variables

Copy these into `.env.local` for local dev, and into your Hostinger / Vercel production env panel.

## Core (required before launch)

```
# MySQL — Hostinger format:
DATABASE_URL=mysql://DB_USER:DB_PASSWORD@DB_HOST:3306/DB_NAME

# App base URL (no trailing slash)
NEXTAUTH_URL=https://aceturbo.co.uk
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
```

## Payments — Stripe

```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## Email — SendGrid

```
SENDGRID_API_KEY=SG....
SENDGRID_FROM_EMAIL=orders@aceturbo.co.uk
```

## Cloudflare (run `npm run cloudflare:configure` once set)

```
CF_API_TOKEN=<Cloudflare API token with Zone:Edit permission>
CF_ZONE_ID=<Zone ID from Cloudflare dashboard Overview tab>
```

## Redis (optional — falls back to in-process if not set)

```
REDIS_URL=redis://default:PASSWORD@HOST:PORT
```

## DVLA Vehicle Lookup

```
DVLA_API_KEY=<from api.gov.uk>
```

## eBay Trading API (optional)

```
EBAY_APP_ID=
EBAY_CERT_ID=
EBAY_DEV_ID=
EBAY_AUTH_TOKEN=
```

## Analytics (optional)

```
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

## Data migration (optional override)

```
# Override source file path for npm run migrate:existing
MIGRATION_SOURCE=/absolute/path/to/your-export.json
```
