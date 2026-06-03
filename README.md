# Alltrek Indonesia Ecommerce MVP

Responsive bilingual ecommerce site for Alltrek Indonesia, built with Next.js App Router, TypeScript, Tailwind, checkout flow, and an outdoor shopping advisor.

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `PIONEER_API_KEY` and `PIONEER_MODEL=claude-sonnet-4-6` in `.env.local` for the primary `/api/agent` provider. `GEMINI_API_KEY` remains supported as a fallback. Without either key, the chat widget shows the advisor as offline.

## Scripts

- `npm run dev` - local dev server.
- `npm run lint` - ESLint.
- `npm run test` - Vitest utility tests.
- `npm run build` - production build and route type generation.

## Routes

- `/` redirects to `/id`.
- `/id` and `/en` are locale roots.
- `/[locale]/products`, `/[locale]/products/[slug]`, `/[locale]/cart`, `/[locale]/checkout`, `/[locale]/orders/[id]`, `/[locale]/b2b`.

## Product Data

Product data is organized from Alltrek homepage, best sellers, About Us, product/category pages, YouTube channel metadata, and official Google Gemini SDK docs confirming `@google/genai`.

## Shopping Agent

The Alltrek Camp Advisor supports English and Bahasa Indonesia, defaults to English when no locale is supplied, and uses local catalog/cart context for product recommendations. It can suggest product bundles, apply validated cart updates, prepare a local checkout draft, and hand off to WhatsApp/Tokopedia/store directions when human confirmation is needed. Server-side parsing clamps product IDs, variants, quantities, and sold-out cart additions before returning actions to the UI.

## Vercel

Deploy with the included `vercel.json`. Required agent environment variable: `PIONEER_API_KEY` or `GEMINI_API_KEY`. Optional variables: `PIONEER_MODEL`, `GEMINI_MODEL`, `NEXT_PUBLIC_TOKOPEDIA_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`.
