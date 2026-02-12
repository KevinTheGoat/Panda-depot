import { useEffect, useRef } from 'react'

export function useScrollReveal({ stagger = 50 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll('[data-animate]')
    if (!children.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.05 }
    )

    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * stagger}ms`
      observer.observe(child)
    })

    return () => observer.disconnect()
  }, [stagger])

  return ref
}
