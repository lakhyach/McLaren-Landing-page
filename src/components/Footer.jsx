import React from 'react'
import { BRAND, NAV_LINKS } from '../assets/content'

const REPO_URL = 'https://github.com/lakhyach/McLaren-Landing-page'
const EMAIL = 'lakhya.support@gmail.com'

// Tiny inline icon set (keeps the bundle lean, no brand-icon dependency).
const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.57.1.78-.25.78-.55v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.79 1.06.79 2.14v3.17c0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
  </svg>
)
const MailIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
)
const ArrowUpRightIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export default function Footer() {
  const toTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/5 bg-carbon-950 px-6 pb-10 pt-20 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-baseline gap-1.5 font-display text-xl font-bold uppercase tracking-[0.3em] text-paper">
              {BRAND.marque}
              <span className="text-[10px] tracking-normal text-titanium-500">®</span>
            </div>
            <p className="mt-4 max-w-xs text-xs font-light leading-relaxed text-titanium-500">
              An independent, real-time 3D automotive experience.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-titanium-300 transition-colors hover:border-white/30 hover:text-paper"
              >
                <GithubIcon /> Source
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-titanium-300 transition-colors hover:border-white/30 hover:text-paper"
              >
                <MailIcon /> {EMAIL}
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="col-span-1 flex flex-col gap-3 md:col-span-3">
            <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-titanium-500">
              Sections
            </span>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-xs text-titanium-300 transition-colors hover:text-paper">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="col-span-1 flex flex-col gap-3 md:col-span-4">
            <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-titanium-500">
              Built with
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-titanium-300">
              <span>React Three Fiber</span>
              <span>Three.js</span>
              <span>drei</span>
              <span>Framer Motion</span>
              <span>Tailwind CSS</span>
              <span>Vite</span>
            </div>
            <a
              href="#overview"
              onClick={toTop}
              className="group mt-4 flex w-fit items-center gap-2 font-display text-2xl font-bold tracking-tight text-titanium-500 transition-colors hover:text-paper"
            >
              Back to top
              <ArrowUpRightIcon size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* giant wordmark */}
        <div className="mt-16 select-none overflow-hidden">
          <h2 className="bg-gradient-to-r from-carbon-700 via-papaya-600/40 to-carbon-700 bg-clip-text text-center font-display text-[22vw] font-bold leading-none tracking-tighter text-transparent">
            {BRAND.marque}
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/5 pt-6 text-[11px] text-titanium-500 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} · {BRAND.marque} {BRAND.model} · 3D model by{' '}
            <a
              href="https://sketchfab.com/3d-models/mclaren-p1-wwwvecarzcom-adae2edc721e4ce7b31c1d06a581e30a"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/20 underline-offset-2 hover:text-paper"
            >
              vecarz
            </a>{' '}
            (CC BY 4.0).
          </span>
          <span className="max-w-2xl md:text-right">
            Unofficial concept. Not affiliated with or endorsed by McLaren Automotive. All trademarks
            belong to their respective owners.
          </span>
        </div>
      </div>
    </footer>
  )
}
