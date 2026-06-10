# How to Play Charades

Next.js + React + TypeScript rebuild of [how-to-play-charades.com](https://how-to-play-charades.com).

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — requests redirect to `/en`.

## Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for sitemap and metadata |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification code |

## Routes

| Path | Description |
|------|-------------|
| `/en`, `/zh` | Home — rules, tips, features, online game |
| `/en/blog`, `/zh/blog` | Blog article |
| `/en/rules`, `/zh/rules` | Charades rules |
| `/en/tips`, `/zh/tips` | Charades tips |
| `/en/user-statement` | Terms of use |

Legacy `.html` URLs redirect to the new routes via `next.config.ts`.

## SEO

- Per-locale metadata with `hreflang` alternates
- Dynamic `sitemap.xml` and `robots.txt`
- Open Graph image at `/opengraph-image`
- Structured data (WebSite, HowTo, WebApplication, BlogPosting)
- No hidden/cloaked SEO text
- Honest word count (150+ curated words)

## Deploy

```bash
npm run build
npm start
```

Compatible with Vercel and any Node.js host. Place `ads.txt` in `public/`.
