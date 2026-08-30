# AgniLift UAV Technologies — Website

Public-facing website for **AgniLift UAV Technologies**, an Indian research-led initiative
developing compact internal-combustion-engine and hybrid-powered UAV platforms.

**Tagline:** Compact Power. Longer Missions.

Plain static HTML/CSS/JS — no build step, no framework. Deploys as-is to GitHub Pages,
Netlify, Vercel, or any static host.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, technology focus, mission problem, approach, propulsion, applications, roadmap, responsible innovation, collaboration |
| `technology.html` | Technology — energy-density challenge, hybrid & direct-drive architectures, integration challenges, research status |
| `applications.html` | Applications — potential mission areas (agriculture, survey, inspection, logistics, disaster, environment, defence support) |
| `research.html` | Research — methodology, qualitative propulsion comparison, unknowns, planned testing, references |
| `about.html` | About — mission, vision, values |
| `contact.html` | Contact — enquiry form (development-state; see below) |
| `privacy.html`, `terms.html` | Placeholder legal pages (review before launch) |
| `assets/style.css` | Shared stylesheet (design system) |
| `assets/app.js` | Shared behaviour: accessible hamburger menu, contact-form state, scroll reveal |

## Design system

- Colours, type scale and components are defined once as CSS variables in `assets/style.css`.
- Fonts: Sora (headings), Inter (body), IBM Plex Mono (technical labels), loaded from Google Fonts with system fallbacks.
- Dark aerospace theme; orange (`#F26419`) used as a controlled highlight, blue (`#2F80ED`) for technical/data accents.

## Contact form — not yet connected

The form in `contact.html` has **no backend**. On submit it validates, then shows a message
directing enquiries to the placeholder address `hello@agnilift.example`. Before launch, either:

1. Wire the form to a service (Formspree, Web3Forms, Netlify Forms, etc.) and update the
   submit handler in `assets/app.js`, **or**
2. Keep the mailto fallback and replace the placeholder email everywhere.

## Placeholders you must provide before launch

- **Real contact email** — replace `hello@agnilift.example` in `contact.html`, `privacy.html`, `terms.html`, `assets/app.js`.
- **Form backend** (see above).
- **Privacy & Terms** — finalise against applicable Indian law.
- **Team content** in `about.html` when available.
- Optional: real domain, favicon, Open Graph share image.

## Deploy on GitHub Pages

```bash
git add -A
git commit -m "AgniLift public website"
git push
```
Then enable **Settings → Pages → Deploy from branch → main / root**.

## Note

The earlier internal founder-research version (market strategy, roadmap checklist, SWOT, etc.)
was moved out of this public site and preserved separately as a private knowledge base
(outside this repository).
