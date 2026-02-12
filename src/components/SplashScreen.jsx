import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import brandSvgRaw from '../assets/images/Panda Brand.svg?raw'

gsap.registerPlugin(DrawSVGPlugin)

// Tag paths with data attributes before browser parses/normalizes inline styles
const taggedSvg = brandSvgRaw
  .replace(/style="fill:#000000"/g, 'style="fill:#000000" data-fill="black"')
  .replace(/style="fill:#ffffff"/g, 'style="fill:#ffffff" data-fill="white"')

export default function SplashScreen({ onComplete }) {
  const containerRef = useRef(null)
  const svgWrapperRef = useRef(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const wrapper = svgWrapperRef.current
    const container = containerRef.current
    if (!wrapper || !container) return

    const svg = wrapper.querySelector('svg')
    if (!svg) return

    svg.removeAttribute('width')
    svg.removeAttribute('height')
    svg.style.width = '100%'
    svg.style.height = 'auto'

    const VB_W = 633.33
    const VB_H = 588

    // Query by data attributes — immune to browser style normalization
    const blackEls = Array.from(svg.querySelectorAll('path[data-fill="black"]'))
    const whiteEls = Array.from(svg.querySelectorAll('path[data-fill="white"]'))

    // Filter to paths inside viewBox and with meaningful size
    const filterValid = (el) => {
      let bbox
      try { bbox = el.getBBox() } catch { return null }
      if (bbox.x > VB_W || bbox.y > VB_H || bbox.x + bbox.width < 0 || bbox.y + bbox.height < 0) return null
      if (bbox.width < 5 && bbox.height < 5) return null
      return { el, cx: bbox.x + bbox.width / 2, cy: bbox.y + bbox.height / 2 }
    }

    const blackPaths = blackEls.map(filterValid).filter(Boolean)
    const whitePaths = whiteEls.map(filterValid).filter(Boolean)

    // Group by vertical zone
    const pandaBlack = blackPaths.filter(p => p.cy < 370).sort((a, b) => a.cx - b.cx)
    const textBlack = blackPaths.filter(p => p.cy >= 370 && p.cy < 475).sort((a, b) => a.cx - b.cx)
    const chineseBlack = blackPaths.filter(p => p.cy >= 475).sort((a, b) => a.cx - b.cx)

    const pandaWhite = whitePaths.filter(p => p.cy < 370)
    const textWhite = whitePaths.filter(p => p.cy >= 370 && p.cy < 475)
    const chineseWhite = whitePaths.filter(p => p.cy >= 475)

    // Prep black paths: hide fill, add stroke outline, set drawSVG to 0%
    const prepForDraw = (paths, strokeW) => {
      paths.forEach(p => {
        p.el.style.fill = 'transparent'
        p.el.style.stroke = '#1A1008'
        p.el.style.strokeWidth = `${strokeW}px`
        p.el.style.strokeLinecap = 'round'
        p.el.style.strokeLinejoin = 'round'
        gsap.set(p.el, { drawSVG: '0%' })
      })
    }

    prepForDraw(pandaBlack, 2)
    prepForDraw(textBlack, 1.5)
    prepForDraw(chineseBlack, 1)

    // Set white paths to match background, hide until blacks fill in
    const BG = '#FFF8F0'
    whitePaths.forEach(p => {
      p.el.setAttribute('style', `fill:${BG}`)
      gsap.set(p.el, { opacity: 0 })
    })

    const tl = gsap.timeline()

    const drawGroup = (blacks, whites, drawDur, stagger, fillDur) => {
      if (blacks.length === 0) return
      const els = blacks.map(p => p.el)

      // Draw stroke outlines
      tl.to(els, { drawSVG: '100%', duration: drawDur, stagger, ease: 'power1.inOut' })
      // Flood fill black + remove stroke
      tl.to(els, { fill: '#000000', strokeWidth: 0, duration: fillDur, stagger: stagger * 0.3, ease: 'power2.in' }, `-=${fillDur * 0.6}`)

      // Reveal white paths (eye whites, letter holes) after fill
      if (whites.length > 0) {
        tl.to(whites.map(p => p.el), { opacity: 1, duration: 0.2, stagger: 0.03 }, '-=0.15')
      }
    }

    // Faster timings
    drawGroup(pandaBlack, pandaWhite, 0.7, 0.07, 0.35)
    drawGroup(textBlack, textWhite, 0.5, 0.03, 0.25)
    drawGroup(chineseBlack, chineseWhite, 0.35, 0.02, 0.2)

    // Hold briefly, then shrink toward the navbar logo
    tl.to({}, { duration: 0.5 })
    tl.call(() => {
      const navLogo = document.getElementById('home-brand')
      const wrapperRect = wrapper.getBoundingClientRect()

      if (navLogo) {
        const logoRect = navLogo.getBoundingClientRect()

        // Calculate how much to scale and where to translate
        const scaleVal = logoRect.height / wrapperRect.height
        const dx = (logoRect.left + logoRect.width / 2) - (wrapperRect.left + wrapperRect.width / 2)
        const dy = (logoRect.top + logoRect.height / 2) - (wrapperRect.top + wrapperRect.height / 2)

        const shrinkTl = gsap.timeline({
          onComplete: () => onCompleteRef.current?.()
        })

        // Shrink and move the SVG wrapper to the navbar logo position
        shrinkTl.to(wrapper, {
          x: dx,
          y: dy,
          scale: scaleVal,
          duration: 0.8,
          ease: 'power3.inOut',
        })
        // Fade the background away as it moves
        shrinkTl.to(container, {
          backgroundColor: 'rgba(255, 248, 240, 0)',
          duration: 0.6,
          ease: 'power2.out',
        }, 0.2)
        // Final fade of the wrapper itself
        shrinkTl.to(wrapper, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
        }, '-=0.2')
      } else {
        // Fallback: just fade if navbar logo not found
        gsap.to(container, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: () => onCompleteRef.current?.()
        })
      }
    })

    return () => tl.kill()
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: '#FFF8F0' }}>
      <div ref={svgWrapperRef} className="w-[85vw] max-w-[500px]" dangerouslySetInnerHTML={{ __html: taggedSvg }} />
    </div>
  )
}
