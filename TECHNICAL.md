# Technical README — Portfolio

Engineering notes for the source code behind [portfolio-vob.vercel.app](https://portfolio-vob.vercel.app/).
For the candidate-facing overview, see [`README.md`](./README.md).

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000?style=flat-square&logo=vercel)](https://vercel.com)

---

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.2.6** (App Router) | RSC by default; `"use client"` only where needed (motion, canvas, forms) |
| Runtime | **React 19.2.4** | Concurrent features available; no experimental APIs used |
| Language | **TypeScript 5** (strict) | `paths: { "@/*": ["./*"] }` for absolute imports |
| Styling | **Tailwind CSS v4** | New `@theme inline` token syntax, no `tailwind.config.js` |
| Motion | **Framer Motion 12** | Hero ink-reveal, modal spring transitions, scroll cue |
| Background FX | Canvas + SVG | `FallingPetals` (rAF) + `HeroBackdrop` (parallax SVG mountains) |
| Icons | `lucide-react` (UI) + `react-icons/fa6` (brands) | Lucide dropped brand marks in v1.x — `fa6` fills GitHub/LinkedIn |
| Forms | **Web3Forms** | Serverless POST → email, honeypot + domain allow-list on Web3Forms side |
| Toasts | `sonner` | Themed via `toastOptions.style` to match forest palette |
| Utilities | `clsx` + `tailwind-merge` | Wrapped in `lib/cn.ts` |
| SEO | App Router Metadata API + JSON-LD | `Person` schema, OG, Twitter card, generated `sitemap.ts` / `robots.ts` |
| PostCSS | `@tailwindcss/postcss` | Sole plugin in `postcss.config.mjs` |
| Linting | `eslint-config-next` (flat config) | `eslint.config.mjs` |
| Deploy | **Vercel** | Single env var: `NEXT_PUBLIC_WEB3FORMS_KEY` |

> **Heads-up:** Next.js 16 introduces breaking changes vs. older majors. See `AGENTS.md` and `node_modules/next/dist/docs/` before contributing.

---

## Project structure

```
app/
  layout.tsx        # Metadata, viewport, JSON-LD Person, fonts, Toaster
  page.tsx          # Section assembly (Hero · About · Experience · Projects · Skills · Contact)
  globals.css       # Tailwind v4 import, CSS vars, @theme tokens, custom @utility classes
  sitemap.ts        # /sitemap.xml — MetadataRoute.Sitemap
  robots.ts         # /robots.txt — MetadataRoute.Robots
  icon.svg          # Favicon
  apple-icon.svg    # Apple touch icon
components/
  Navbar.tsx        # Scroll-spy nav via IntersectionObserver, mobile menu
  Footer.tsx        # Static footer with social links
  sections/         # Hero · About · Experience · Projects · Skills · Contact
  effects/
    FallingPetals.tsx   # Canvas rAF loop, reduced-motion aware, visibilitychange pause
    HeroBackdrop.tsx    # SVG parallax mountains + drifting cloud gradients
  ui/
    SectionShell.tsx    # Section wrapper (id anchor + spacing)
    SectionTitle.tsx    # Kicker + title + subtitle
    StackChips.tsx      # Tech-stack chip row
    ExperienceCard.tsx  # Collapsible experience entry → opens Modal
    EducationCard.tsx   # Education entry
    ProjectCard.tsx     # Project entry → opens Modal with full bullets
    Modal.tsx           # Portal-based modal, focus trap, ESC close, body-scroll lock
data/                   # Plain TS modules — single source of truth
  personal.ts           # Identity, stats, education, links
  experience.ts         # Roles (typed Experience[])
  projects.ts           # Projects (typed Project[], featured flag, category enum)
  skills.ts             # Grouped skills (typed SkillGroup[])
  achievements.ts       # Achievements (typed Achievement[])
content/
  personal-details.md   # Long-form source for the data above
lib/
  cn.ts                 # clsx + tailwind-merge helper
public/                 # Static assets
```

---

## Architecture notes

### Rendering model
- Server Components by default. Client boundaries are minimal and scoped to interactive pieces (`Hero`, `Navbar`, `Modal`, `Contact`, `FallingPetals`).
- All data is statically imported from `data/*.ts` at build time — no runtime fetch, no CMS, no DB.
- The site is effectively a single static document rendered from one route (`/`), with the contact form being the only network call (client-side POST to Web3Forms).

### Data layer
- Each `data/*.ts` module exports a typed array (`Experience[]`, `Project[]`, etc.) plus its `export type`.
- Sections import these arrays directly. To add a project or role, edit one file and ship — no schema/CMS migration.
- `Project.featured: boolean` controls whether a card shows in the default grid; non-featured items live behind a "See all" interaction.

### Sections & shells
- `SectionShell` provides the consistent vertical rhythm and `id` anchor each section needs for the navbar's scroll-spy.
- `SectionTitle` standardises the kicker / display heading / subtitle triplet so the page stays visually consistent.
- Cards (`ExperienceCard`, `ProjectCard`) follow a progressive-disclosure pattern: a compact card on the page that opens a `Modal` for full bullets — keeping the initial scroll within a ~6-screen budget for recruiter scan patterns.

### Navbar scroll-spy (`components/Navbar.tsx`)
- Uses `IntersectionObserver` with `rootMargin: "-40% 0px -50% 0px"` to highlight the section currently in the viewport's mid-band.
- Picks the most-visible entry from `entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]`.
- Adds a backdrop-blur header background once `window.scrollY > 24`.

### `Modal` (`components/ui/Modal.tsx`)
- Rendered via `createPortal` into `document.body`.
- On open: locks body scroll (`document.body.style.overflow = "hidden"`), focuses the close button, and binds `keydown` for ESC.
- On close: restores body scroll and refocuses the previously active element.
- Spring transition (`stiffness: 260, damping: 26`) for the panel, fade for the backdrop. Bottom-sheet on mobile, centered card on `sm+`.

### `FallingPetals` (`components/effects/FallingPetals.tsx`)
- Bails out immediately if `prefers-reduced-motion: reduce` matches.
- Single `requestAnimationFrame` loop drawing 10 (mobile) / 18 (desktop) petals on a DPR-scaled canvas.
- Listens to `visibilitychange` — pauses the rAF loop when the tab is hidden, resumes on focus. Saves battery on background tabs.
- Resizes on `window.resize`; canvas backing store capped at `min(devicePixelRatio, 2)`.

### `HeroBackdrop` (`components/effects/HeroBackdrop.tsx`)
- Pure SVG with three layered `<path>` mountain ranges using vertical `<linearGradient>` fills (`m1`, `m2`, `m3`) for depth.
- Three CSS-animated cloud divs drift across the top via a single `@keyframes drift` (70s / 95s / 120s for natural parallax).
- All cloud animation is suppressed under `prefers-reduced-motion: reduce`.

### `Contact` form (`components/sections/Contact.tsx`)
- Plain HTML form POSTing `FormData` to `https://api.web3forms.com/submit` — no SDK.
- `access_key` is `NEXT_PUBLIC_WEB3FORMS_KEY`. This is intentionally public: Web3Forms keys are per-form identifiers, not credentials, and abuse is blocked via **domain allow-listing on the Web3Forms dashboard**.
- Hidden `company` field acts as a **honeypot** — non-empty values short-circuit submission.
- Success / failure surfaced through `sonner` toasts; the form resets on success.

### Tailwind v4 token system (`app/globals.css`)
- `@import "tailwindcss";` replaces the old per-layer imports.
- Design tokens are declared as CSS vars under `:root` and re-exposed to Tailwind via `@theme inline { --color-*: var(--*) }`. This generates utilities like `bg-forest-700`, `text-parchment`, `border-sunset` without a JS config file.
- Custom utilities defined with the new `@utility` directive:
  - `glass` — translucent dark-forest gradient + `backdrop-filter: blur(10px) saturate(140%)` + soft border. Used on cards, the modal, and the contact form.
  - `ink-divider` — inline-SVG sumi-e brush stroke as a section separator.

### SEO & metadata
- `app/layout.tsx` declares `Metadata` (title template, description, keywords, OG, Twitter, robots) plus a `Viewport` with `themeColor: "#0b3d2e"`.
- A JSON-LD `Person` schema is injected as a `<script type="application/ld+json">` in `<body>` for richer search results.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt` at build via `MetadataRoute`.

### Accessibility & motion
- `prefers-reduced-motion: reduce` is honored in three places: global CSS animation kill-switch, `FallingPetals` early return, and `HeroBackdrop` cloud animation pause.
- Modal sets `role="dialog"`, `aria-modal="true"`, focus trap, and restores previously focused element on close.
- All decorative SVG / canvas layers are `aria-hidden`.
- Navigation links use semantic `<nav aria-label="Primary">`; mobile menu toggles `aria-expanded`.

---

## Local development

```bash
git clone https://github.com/Vanshoberoi-dev/portfolio.git
cd portfolio
npm install
cp .env.example .env.local      # add your Web3Forms key
npm run dev                     # http://localhost:3000
```

A free Web3Forms access key (email-only, no signup) is available at <https://web3forms.com/>.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Next.js dev server with HMR |
| `npm run build` | Production build (statically renders `/`, `/sitemap.xml`, `/robots.txt`) |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint with the Next.js flat config |

---

## Deployment (Vercel)

One-click on Vercel. In **Project Settings → Environment Variables** set:

```
NEXT_PUBLIC_WEB3FORMS_KEY = <your-access-key>
```

After the first deploy, add the production domain to the **Web3Forms allow-list** so the contact form continues to accept submissions from that origin.

### Environment variables

| Name | Required | Scope | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Yes | Public | Web3Forms per-form identifier used by the contact form. Not a credential. |

---

## Conventions

- **Single source of truth in `data/*.ts`** — never duplicate content into a component.
- **Match commenting style** of surrounding code; comments are sparse and explain *why*, not *what*.
- **Client boundaries are opt-in** — add `"use client"` only when you need state, effects, browser APIs, or motion.
- **Tailwind tokens flow through CSS vars** — extend the palette in `globals.css` (both `:root` and `@theme inline`), don't add `tailwind.config.js`.
- **Respect `prefers-reduced-motion`** for any new animation.

---

## License

Code is **MIT**. Content (copy, project descriptions, design) © 2025 Vansh Oberoi.
