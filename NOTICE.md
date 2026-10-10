# NOTICE — Provenance, Third-Party Assets & Legal Disclosure

## 1. What this project is

`VELOCE GT-01` is an **independent design and engineering concept** built as a
portfolio study. It is **inspired by** the design language of high-performance
motorsport road cars, but it is **not** affiliated with, sponsored by, endorsed
by, or connected to **McLaren Automotive**, **BYD**, **Porsche**, or any other
vehicle manufacturer. All vehicle names, marks, colours, specifications and
pricing in this project are **fictional**.

No protected logo, wordmark, or copyrighted vehicle body from any manufacturer
is reproduced here. The 3D model is an original, procedural abstraction.

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

## 4. Assets that are ORIGINAL (authored for this project)

- **3D vehicle** — fully procedural react-three-fiber geometry (`src/three/*`).
- **Lighting/environment** — custom `<Lightformer>` studio rig (no external HDRI).
- **Typography** — Space Grotesk (`public/fonts/SpaceGrotesk.ttf`) is **SIL Open
  Font License 1.1** and is redistributed with credit; Inter is loaded from
  Google Fonts (**SIL Open Font License 1.1**).
- **Favicon / OG image** — original vector artwork (`public/favicon.svg`,
  `public/og.svg`) authored for this study.
- All UI, copy, colour system and data are original.

## 5. Third-party runtime libraries (remain installed via npm)

| Library | License |
|---|---|
| React, React DOM | MIT |
| three | MIT |
| @react-three/fiber, @react-three/drei | MIT |
| framer-motion | MIT |
| tailwindcss | MIT |
| vite, @vitejs/plugin-react | MIT |

Full texts are available in each package's repository.

## 6. Attribution of the source model (for the record)

Although the model was **removed and never shipped** in this project, credit is
recorded for the starting point it was based on:
- 2024 BYD Seal — *Ddiaz Design*, https://sketchfab.com/ddiaz-design
  (CC-BY-NC-SA-4.0). No derivative of this model is distributed here.
