import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BRAND, NAV_LINKS } from '../assets/content'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on Escape and lock background scroll while the mobile sheet is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  const go = (href) => (e) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full px-4 pt-4 md:px-6 md:pt-5">
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full border px-5 py-3 transition-all duration-300 md:px-7 ${
            scrolled
              ? 'border-white/10 bg-carbon-950/70 backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          {/* Wordmark */}
          <a
            href="#overview"
            onClick={go('#overview')}
            className="flex items-baseline gap-1.5 font-display text-sm font-bold uppercase tracking-[0.35em] text-paper"
          >
            {BRAND.marque}
            <span className="text-[9px] tracking-normal text-titanium-500">®</span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={go(l.href)}
                className="text-[13px] font-medium tracking-wide text-titanium-300 transition-colors hover:text-paper"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#configure"
              onClick={go('#configure')}
              className="hidden rounded-full bg-papaya-500 px-5 py-2 text-[13px] font-semibold text-carbon-950 transition-colors hover:bg-papaya-400 sm:inline-block"
            >
              Configure
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-paper md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-transform ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-transform ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-carbon-950/95 px-8 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={go(l.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="font-display text-4xl font-medium tracking-tight text-paper"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
