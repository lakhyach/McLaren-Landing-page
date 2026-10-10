# NOTICE — Provenance, Third-Party Assets & Legal Disclosure

## 1. What this project is

This is an **independent real-time WebGL design study** of the **McLaren P1**,
built as a portfolio piece. It is **not** affiliated with, sponsored by, endorsed
by, or connected to **McLaren Automotive** or any other vehicle manufacturer.
“McLaren” and “P1” are trademarks of McLaren Automotive; they are used here only
to identify the subject of an editorial study. No McLaren logo or wordmark
appears in this project.

The 3D vehicle is a properly licensed third-party model (see §4 and §7), not an
original abstraction. Specifications quoted on the site are published public
figures for the road car; pricing in the configurator is illustrative.

## 2. Starting point (inherited)

Development began from a clone of a public repository
(`Footprintarts/3D_LandingPage`) that shipped **without any license file** —
meaning it was "all rights reserved" by default and could not be freely reused.
Rather than reuse that content, the project was **rebuilt from the ground up**.
What remained is only the general idea of a "3D landing page" and the standard
open-source toolchain. Every component, asset and line of copy is original.

## 3. Assets that were REMOVED for licensing reasons

| Removed | Reason |
|---|---|
| `2024_byd_seal-transformed.glb` | Sketchfab model by *Ddiaz Design*, licensed **CC-BY-NC-SA-4.0** (non-commercial). Not used; replaced with original procedural geometry. |
| 70 `public/frames/*.png` scroll renders | Renders of the third-party BYD model above; same non-commercial restriction. |
| `public/hero*.png`, `config_*.png`, `footer_1.png` | Screenshots of the prior project referencing another author's work. |
| Colour names referencing Porsche/Audi trademarks | Replaced with original fictional colour names. |
| `Helvetica.ttf`, `PRISTINA.TTF`, `PANCHANG.ttf`, `script.otf` | Commercially licensed fonts not safe to redistribute. |

## 4. Third-party 3D model (shipped, licensed)

- **`public/mclaren-p1.glb`** — “Mclaren P1 | www.vecarz.com” by **vecarz**
  (*heynic*), published on Sketchfab under **Creative Commons Attribution 4.0
  International (CC-BY 4.0)** — attribution required, commercial use allowed.
  Model page: https://sketchfab.com/3d-models/mclaren-p1-wwwvecarzcom-adae2edc721e4ce7b31c1d06a581e30a
  The shipped file is a **size-optimised re-encode of the author’s own GLB
  download** (Draco/meshopt compression, WebP texture recompression); no
  geometry, texture or design data was altered. The credit is displayed in the
  site footer as required by the license.

## 5. Assets that are ORIGINAL (authored for this project)

- **Lighting/environment** — custom `<Lightformer>` studio rig (no external HDRI).
- **Typography** — Space Grotesk (`public/fonts/SpaceGrotesk.ttf`) is **SIL Open
  Font License 1.1** and is redistributed with credit; Inter is loaded from
  Google Fonts (**SIL Open Font License 1.1**).
- **Favicon / OG image** — original vector artwork (`public/favicon.svg`,
  `public/og.svg`) authored for this study.
- All UI, copy, colour system and data are original. The procedural GT-01
  vehicle generator that shipped previously is retained for reference in
  `blender/build_car.py` but is no longer used by the site.

## 6. Third-party runtime libraries (remain installed via npm)

| Library | License |
|---|---|
| React, React DOM | MIT |
| three | MIT |
| @react-three/fiber, @react-three/drei | MIT |
| framer-motion | MIT |
| tailwindcss | MIT |
| vite, @vitejs/plugin-react | MIT |

Full texts are available in each package's repository.

## 7. Attribution record

Current shipped model:
- **Mclaren P1 | www.vecarz.com** — *vecarz* (https://sketchfab.com/heynic),
  CC-BY 4.0 (credited in the site footer).

Historical (removed, never shipped after remediation):

Although the model was **removed and never shipped** in this project, credit is
recorded for the starting point it was based on:
- 2024 BYD Seal — *Ddiaz Design*, https://sketchfab.com/ddiaz-design
  (CC-BY-NC-SA-4.0). No derivative of this model is distributed here.
- The earlier `veloce-gt01.glb` procedural export was removed when the licensed
  P1 model replaced it.
