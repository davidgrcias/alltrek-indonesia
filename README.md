# Alltrek Indonesia Ecommerce MVP

Responsive bilingual ecommerce site for Alltrek Indonesia, built with Next.js App Router, TypeScript, Tailwind, checkout flow, and an outdoor shopping advisor.

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `GEMINI_API_KEY` in `.env.local` for `/api/agent`. Without it, the chat widget shows the advisor as offline.

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

## Vercel

Deploy with the included `vercel.json`. Required environment variable: `GEMINI_API_KEY`. Optional variables: `GEMINI_MODEL`, `NEXT_PUBLIC_TOKOPEDIA_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`.
