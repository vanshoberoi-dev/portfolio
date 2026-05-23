<div align="center">

# 🌿 Portfolio — Source Code

One-page personal portfolio for **Vansh Oberoi** · Studio Ghibli-forest aesthetic, built for recruiter scan patterns (≤ 6 screens, progressive disclosure).

[![Live Site](https://img.shields.io/badge/▶_View_Live_Site-portfolio--vob.vercel.app-2d6a4f?style=for-the-badge)](https://portfolio-vob.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000?style=flat-square&logo=vercel)](https://vercel.com)

</div>

---

## What this is

This repo is the **source code** for my live portfolio. If you're here to learn about me as a candidate, the site itself is the better read — it's designed for that. This README is for people poking the code.

## Tech stack

- **Framework** — Next.js 16 (App Router) + React 19 + TypeScript
- **Styling** — Tailwind CSS **v4** (new `@theme inline` syntax, no `tailwind.config.js`)
- **Motion** — Framer Motion (ink-reveal entrance, modal transitions)
- **Background FX** — Canvas-based falling petals + parallax SVG mountains
- **Icons** — `lucide-react` for UI, `react-icons/fa6` for brand marks (GitHub/LinkedIn — Lucide dropped these in v1.x)
- **Forms** — Web3Forms (serverless POST → email, honeypot spam protection)
- **Toasts** — `sonner`
- **SEO** — App-Router Metadata API, JSON-LD `Person` schema, generated `sitemap.ts` + `robots.ts`

## Architecture highlights

A few choices worth a second look if you're reviewing the code:

- **Data layer is plain TS modules** (`data/*.ts`) — single source of truth for experience, projects, skills, achievements. No CMS, no JSON. Easy to diff in PRs.
- **Strict 6-screen budget** enforced via progressive disclosure: detail cards collapse into modals so the initial scroll stays scannable for recruiters.
- **Canvas perf** — `FallingPetals` uses a single `requestAnimationFrame` loop and pauses on `visibilitychange` to avoid burning battery on hidden tabs.
- **Tailwind v4** — design tokens live in `app/globals.css` under `@theme inline`; this is the new v4 way and replaces the old JS config file. Check `AGENTS.md` for project-specific rules.
- **SEO is fully static** — `sitemap.xml`, `robots.txt`, and OG metadata pre-render at build time. Verified via `next build`.
- **No client secrets** — the Web3Forms key is `NEXT_PUBLIC_*` (intentional; it's a public per-form identifier, not a credential). Domain whitelisting is enforced on Web3Forms' side.

## Project structure

```
app/
  layout.tsx        # Metadata, JSON-LD, fonts, global providers
  page.tsx          # Section assembly
  globals.css       # Tailwind v4 @theme tokens
  sitemap.ts        # /sitemap.xml
  robots.ts         # /robots.txt
  icon.svg          # Favicon
components/
  sections/         # Hero · About · Experience · Projects · Skills · Contact
  effects/          # FallingPetals · HeroBackdrop (parallax mountains)
  ui/               # Reusable primitives
data/               # Source of truth (experience, projects, skills, etc.)
content/            # Long-form markdown (personal details)
lib/cn.ts           # clsx + tailwind-merge helper
```

## Run locally

```bash
git clone https://github.com/Vanshoberoi-dev/portfolio.git
cd portfolio
npm install
cp .env.example .env.local      # paste your Web3Forms key
npm run dev                     # http://localhost:3000
```

Get a free Web3Forms access key (email-only, no signup) at <https://web3forms.com/>.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (verifies static export of `/`, `/sitemap.xml`, `/robots.txt`) |
| `npm start` | Serve the built app |
| `npm run lint` | ESLint (Next.js config) |

## Deploy

One-click on Vercel. In **Project Settings → Environment Variables** add:

```
NEXT_PUBLIC_WEB3FORMS_KEY = <your-access-key>
```

After deploy, add the production domain to the allow-list on the Web3Forms dashboard so the contact form keeps working.

---

## About the author

I'm **Vansh Oberoi** — Software Developer working in Sitecore + Next.js + applied AI. The portfolio itself has the full story; below are the fastest ways to reach me:

- 🌐 **Portfolio** — <https://portfolio-vob.vercel.app/>
- 📄 **Resume** — [Google Drive](https://drive.google.com/file/d/1xSwKRfzUR2IPfNQ1_Y0hPtF5VXNFB627/view?usp=drive_link)
- 💼 **LinkedIn** — [linkedin.com/in/vansh-o](https://linkedin.com/in/vansh-o/)
- ✉️ **Email** — [vanshoberoi462@gmail.com](mailto:vanshoberoi462@gmail.com)

## License

Code is MIT. Content (copy, project descriptions, design) © 2025 Vansh Oberoi.

