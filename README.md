# VELOCE GT-01 — McLaren-Inspired 3D Concept

> An independent, real-time WebGL automotive concept experience built as a
> portfolio study. **Not affiliated with or endorsed by McLaren Automotive or any
> vehicle manufacturer.** See [`NOTICE.md`](./NOTICE.md) for the full licensing &
> provenance disclosure.

A cinematic landing page for a fictional hypercar, rendered entirely in the
browser with **React Three Fiber**. The vehicle is **original, procedural
geometry** — no third-party 3D model, HDRI or bitmap is required, so it loads
fast and stays legally clean.

![VELOCE GT-01](./public/og.svg)

## What's here

- **Cinematic WebGL hero** — a scroll-bound camera that flies through the car,
  driven by Framer Motion and a custom keyframe rig, with mouse parallax.
- **Original procedural 3D car** — extruded monocoque, glass canopy, four wheels,
  active rear wing and an emissive light signature, all authored in code.
- **Custom lightformer studio** — PBR clearcoat paint lit by a baked `<Lightformer>`
  environment (no external HDRI download).
- **Scroll storytelling** — an animated, original SVG aerodynamic blueprint with
  live airflow streamlines that re-highlights per feature.
- **Live configurator** — orbit-able 3D with real-time paint / wheel / caliper /
  aero selection, material lerping and running price total.
- **Production hardening** — reduced-motion support, mobile/low-power fallbacks,
  accessible nav & focus states, SEO metadata + Open Graph + JSON-LD, sitemap,
  robots.txt and Vercel security headers (CSP, HSTS, X-Frame-Options, …).

## Tech stack

React 19 · Vite · Tailwind CSS v4 · React Three Fiber · drei · three · Framer Motion · lucide-react.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint     # eslint
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  three/         # ConceptCar.jsx, StudioEnvironment.jsx, HeroScene.jsx (procedural 3D)
  components/    # Preloader, Nav, Hero, Performance, AeroStory, Manifesto, Configurator, Footer
  lib/hooks.js   # reduced-motion + device-capability hooks
  assets/content.js  # original copy, specs, configurator data
```

## Credits

- Design, 3D, engineering & copy: **Lakhya Jit** — lakhya911@gmail.com
- Font: Space Grotesk (SIL OFL 1.1), Inter (SIL OFL 1.1)
- Open-source libraries under their own MIT/ISC licenses (see NOTICE.md)

## License

Original source code © 2026 Lakhya Jit — [MIT](./LICENSE). This license does not
cover any third-party trademarks or vehicle designs. See [NOTICE.md](./NOTICE.md).
