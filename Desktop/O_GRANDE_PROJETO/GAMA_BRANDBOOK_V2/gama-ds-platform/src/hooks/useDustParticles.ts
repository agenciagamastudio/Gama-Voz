import { RefObject, useEffect } from 'react'

export function useDustParticles(
  ref: RefObject<HTMLElement>,
  interval = 600
) {
  useEffect(() => {
    const container = ref.current
    if (!container) return

    function spawnParticle() {
      if (!container) return
      const el = document.createElement('div')
      el.className = 'dust-particle'

      const size = Math.random() * 2 + 2
      const duration = Math.random() * 4 + 3
      const drift = (Math.random() - 0.5) * 30
      const delay = Math.random() * 3
      const x = Math.random() * (container.offsetWidth * 0.6) + container.offsetWidth * 0.2

      el.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `bottom:${Math.random() * 120 + 20}px`,
        `left:${x}px`,
        `--drift:${drift}px`,
        `animation-duration:${duration}s`,
        `animation-delay:${delay}s`,
        `opacity:0`,
      ].join(';')

      container.appendChild(el)
      setTimeout(() => el.remove(), (duration + delay + 1) * 1000)
    }

    for (let i = 0; i < 6; i++) setTimeout(spawnParticle, i * 300)
    const id = setInterval(spawnParticle, interval)

    return () => {
      clearInterval(id)
      container.querySelectorAll('.dust-particle').forEach(el => el.remove())
    }
  }, [ref, interval])
}
