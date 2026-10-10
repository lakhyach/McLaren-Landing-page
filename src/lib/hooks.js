import { useEffect, useState } from 'react'

// Detect a coarse pointer / small viewport so heavy 3D effects can be reduced.
export function useIsCompact(minWidth = 768) {
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${minWidth - 1}px)`)
    const update = () => setCompact(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [minWidth])
  return compact
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

// Rough device-pixel-ratio / capability probe for the WebGL canvases.
export function usePerformanceProfile() {
  const reduced = usePrefersReducedMotion()
  const compact = useIsCompact()
  return {
    reducedMotion: reduced,
    compact,
    dpr: compact ? [1, 1.25] : [1, 1.75],
    shadows: !compact,
    reflector: !compact && !reduced,
  }
}
