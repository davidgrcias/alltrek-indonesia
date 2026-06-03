# Alltrek Indonesia Ecommerce MVP

Responsive bilingual ecommerce showcase for Alltrek Indonesia, built with Next.js App Router, TypeScript, Tailwind, local mock checkout, and a mandatory Gemini shopping agent.

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `GEMINI_API_KEY` in `.env.local` for `/api/agent`. Without it, the chat widget shows a configuration error and does not use fake responses.

## Scripts

- `npm run dev` - local dev server.
- `npm run lint` - ESLint.
- `npm run test` - Vitest utility tests.
- `npm run build` - production build and route type generation.

## Routes

- `/` redirects to `/id`.
- `/id` and `/en` are locale roots.
- `/[locale]/products`, `/[locale]/products/[slug]`, `/[locale]/cart`, `/[locale]/checkout`, `/[locale]/orders/[id]`, `/[locale]/b2b`.

## Data Sources

Seed data was scraped from Alltrek homepage, best sellers, About Us, product/category pages, YouTube channel metadata, and official Google Gemini SDK docs confirming `@google/genai`.

## Vercel

Deploy with the included `vercel.json`. Required environment variable: `GEMINI_API_KEY`. Optional variables: `GEMINI_MODEL`, `NEXT_PUBLIC_TOKOPEDIA_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`.

Hero video slot: place `public/media/alltrek-hero.mp4`. If absent, the browser keeps the Alltrek product poster image.
