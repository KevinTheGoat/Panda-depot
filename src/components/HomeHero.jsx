import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useGsapFadeIn } from '../hooks/useGsap'
import brandSvgRaw from '../assets/images/Panda Brand.svg?raw'

const taggedBrand = brandSvgRaw
  .replace(/style="fill:#ffffff"/g, 'style="fill:#FFF8F0" data-fill="white"')

function InlineBrand({ className, id }) {
  const ref = useRef(null)
  useEffect(() => {
    const svg = ref.current?.querySelector('svg')
    if (!svg) return
    svg.removeAttribute('width')
    svg.removeAttribute('height')
  }, [])
  return <div id={id} ref={ref} className={className} dangerouslySetInnerHTML={{ __html: taggedBrand }} />
}

export default function HomeHero({ company, categories }) {
  const heroRef = useGsapFadeIn({ y: 60, duration: 1 })

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 bg-[#FFF8F0]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(238,28,37,0.12)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 lattice-bg" />

      {/* Floating lanterns */}
      <div className="absolute top-20 left-[5%] animate-lantern-sway opacity-50">
        <div className="lantern" />
      </div>
      <div className="hidden md:block absolute top-28 left-[18%] animate-lantern-sway opacity-35" style={{ animationDelay: '0.7s' }}>
        <div className="lantern" style={{ width: 22, height: 28 }} />
      </div>
      <div className="hidden md:block absolute top-16 left-[35%] animate-lantern-sway opacity-25" style={{ animationDelay: '1.4s' }}>
        <div className="lantern" style={{ width: 18, height: 24 }} />
      </div>
      <div className="hidden md:block absolute top-24 left-[50%] animate-lantern-sway opacity-20" style={{ animationDelay: '0.3s' }}>
        <div className="lantern" style={{ width: 16, height: 20 }} />
      </div>
      <div className="hidden md:block absolute top-18 right-[30%] animate-lantern-sway opacity-30" style={{ animationDelay: '1.8s' }}>
        <div className="lantern" style={{ width: 20, height: 26 }} />
      </div>
      <div className="absolute top-32 right-[15%] animate-lantern-sway opacity-40" style={{ animationDelay: '1s' }}>
        <div className="lantern" />
      </div>
      <div className="hidden md:block absolute top-22 right-[3%] animate-lantern-sway opacity-45" style={{ animationDelay: '0.5s' }}>
        <div className="lantern" style={{ width: 24, height: 32 }} />
      </div>

      <div ref={heroRef} className="container-custom relative z-10 text-center pt-24 md:pt-20">
        <div className="hidden md:flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-panda-red/30" />
          <span className="font-chinese text-panda-red/40 text-lg">批发餐厅用品</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-panda-red/30" />
        </div>

        <p className="text-panda-red font-medium uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm mb-4 md:mb-6 text-glow-red">
          Wholesale Restaurant Supplies
        </p>

        <div className="inline-block bg-panda-cream rounded-xl md:rounded-2xl p-3 md:p-6 mb-4 md:mb-6 shadow-[0_0_40px_rgba(238,28,37,0.15)]">
          <InlineBrand id="home-brand" className="[&_svg]:h-28 [&_svg]:md:h-56 [&_svg]:lg:h-72 [&_svg]:w-auto" />
        </div>

        <p className="text-[#6B5D4F] text-base md:text-xl max-w-2xl mx-auto mb-2 md:mb-4 px-4 md:px-0">
          Containers, packaging, groceries &amp; more for restaurants across South Florida.
        </p>
        <p className="text-[#6B5D4F]/80 text-xs md:text-sm mb-1 md:mb-2">
          {company.tagline}
        </p>
        <p className="font-chinese text-panda-red/30 text-[10px] md:text-xs mb-6 md:mb-10">
          {company.taglineZh}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/catalog" className="btn-primary gap-2">
            <Icon icon="mdi:storefront" className="text-lg" />
            Browse Catalog
          </a>
          <a href="tel:3053223301" className="btn-secondary gap-2">
            <Icon icon="mdi:phone" className="text-lg" />
            (305) 322-3301
          </a>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="seal-stamp opacity-60">
            <span>熊猫</span>
          </div>
        </div>
      </div>

      {/* Cloud divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 z-20">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 60 C150 60 150 15 300 15 C450 15 450 60 600 60 C750 60 750 15 900 15 C1050 15 1050 60 1200 60 L1200 60 L0 60Z" fill="#FFF8F0" />
        </svg>
      </div>
    </section>
  )
}
