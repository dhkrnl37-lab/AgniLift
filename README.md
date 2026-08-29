# VAYUYAAN — Engine-Powered Drones for India

A private research & planning website for an IC-engine / hybrid-powered drone venture aimed at the Indian market (agriculture, defence, logistics, survey). Built as a plain static site so it hosts free on **GitHub Pages** with no build step.

> **"VAYUYAAN" is a placeholder brand name** (Sanskrit/Hindi: *vāyu* = air, *yāna* = vehicle). Rename it everywhere once you pick a real name — see "Renaming" below.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — the thesis (why combustion beats the battery ceiling) + navigation |
| `technology.html` | Literature survey — propulsion physics, battery vs IC vs hybrid vs hydrogen, design parameters, state of the art |
| `taxonomy.html` | Reference catalogue — drone size classes (DGCA), airframe types, small UAV engine table, a strawman first-product spec |
| `market.html` | India market research — size, segments, competitors, Drone Rules 2021, government schemes, SWOT |
| `roadmap.html` | Founder roadmap — a phased 0–24 month plan + checklists (technical, legal, funding, IP, team) |
| `resources.html` | Official links, glossary, and the sources behind the figures |
| `assets/style.css` | Shared stylesheet (dark engineering theme) |

## Publish on GitHub Pages

1. Create a new GitHub repository (e.g. `drone-startup` or your brand name).
2. From this folder, push the files:
   ```bash
   git init
   git add .
   git commit -m "Initial drone venture research site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / root (`/`)** → Save.
4. Your site goes live at `https://<your-username>.github.io/<your-repo>/` within a minute or two.

To use a custom domain later, add it under **Settings → Pages → Custom domain** and create a `CNAME` file.

## Renaming the brand

Search-and-replace `VAYUYAAN` across all `.html` files, update each `<title>`, and swap the `🜂` logo glyph in the header if you like. Everything else is content you can edit freely in plain HTML.

## Important — verify before you rely on anything

All market figures, regulatory details, and engine specs are **indicative**, compiled from public third-party sources in August 2026 for orientation only. They change and vary by source. Before using any number in a pitch, filing, or design decision, verify it against primary/official sources (DGCA, Digital Sky, scheme guidelines, supplier datasheets). Nothing here is legal, financial, or regulatory advice. See `resources.html` for the source list.
