
# Hemant Kumar — Personal Portfolio

A modern, minimal, futuristic personal portfolio built for **Hemant Kumar**, a B.Tech Computer Science Engineering student aspiring to become an AI/ML Engineer.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 6**
- **Tailwind CSS v4**
- **Lucide Icons**
- **HTML5 Canvas** (Interactive 3D Neural Network Orb)

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Updating Content Easily

All portfolio data is centralized in **`src/data/portfolio.ts`**:

- **Update Email / Social Links:** Edit `PERSONAL_INFO` in `src/data/portfolio.ts`.
- **Add Certificates Later:** Place certificate images inside `public/certificates/` and add entries to the `CERTIFICATES` array in `src/data/portfolio.ts`. The Certificates section will automatically switch from the `"Certificates coming soon"` placeholder to a responsive card grid.
- **Update Skills / Experience / Education:** Edit `SKILL_CATEGORIES`, `INTERNSHIPS`, `FEATURED_PROJECT`, or `EDUCATION` directly in `src/data/portfolio.ts`.

