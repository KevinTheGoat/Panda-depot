import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useGsapFadeIn, useGsapStagger } from '../hooks/useGsap'
import catalogData from '../data/catalog.json'
import pandaLogo from '../assets/images/Panda Logo.svg'
import pandaBrand from '../assets/images/Panda Brand.svg'

const categoryIcons = {
  'Rice & Grains': 'mdi:rice',
  'Sauces & Condiments': 'mdi:bottle-soda',
  'Cooking Oils & Vinegar': 'mdi:oil',
  'Food Pails (Chinese Takeout Boxes)': 'mdi:food-takeout-box',
  'Microwaveable Deli Containers (Black Base)': 'mdi:package-variant-closed',
  'Soup Bowls & Containers with Lid': 'mdi:bowl-mix',
  'Sushi Trays & Bento Boxes': 'mdi:bento',
  'Clear Seal Containers': 'mdi:package-variant',
  'Tamper Evident Containers & Salad Bowls': 'mdi:food-apple',
  'Catering Trays & Dome Lids': 'mdi:tray-full',
  'Portion Cups & Lids': 'mdi:cup',
  'Kraft Eco Boxes (Microwavable)': 'mdi:recycle',
  'Tableware - 2.5g Medium Weight': 'mdi:silverware-fork-knife',
  'Tableware - 5g Heavy Weight': 'mdi:silverware-variant',
  'Paper Bags': 'mdi:shopping',
  'Glassine & Foil Bags & Plastic Wrap': 'mdi:wrap',
  'Aluminum Trays & Lids': 'mdi:tray-arrow-down',
  'Foam Containers': 'mdi:cube-outline',
  'Dry Goods & Spices': 'mdi:spice',
  'Canned Food': 'mdi:canned-food',
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function Home() {
  const heroRef = useGsapFadeIn({ y: 60, duration: 1 })
  const gridRef = useGsapStagger({ stagger: 0.05 })

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Layered background: dark base + red radial + lattice */}
        <div className="absolute inset-0 bg-[#FFF8F0]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(238,28,37,0.12)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 lattice-bg" />

        {/* Floating lanterns */}
        <div className="absolute top-20 left-[5%] animate-lantern-sway opacity-50">
          <div className="lantern" />
        </div>
        <div className="absolute top-28 left-[18%] animate-lantern-sway opacity-35" style={{ animationDelay: '0.7s' }}>
          <div className="lantern" style={{ width: 22, height: 28 }} />
        </div>
        <div className="absolute top-16 left-[35%] animate-lantern-sway opacity-25" style={{ animationDelay: '1.4s' }}>
          <div className="lantern" style={{ width: 18, height: 24 }} />
        </div>
        <div className="absolute top-24 left-[50%] animate-lantern-sway opacity-20" style={{ animationDelay: '0.3s' }}>
          <div className="lantern" style={{ width: 16, height: 20 }} />
        </div>
        <div className="absolute top-18 right-[30%] animate-lantern-sway opacity-30" style={{ animationDelay: '1.8s' }}>
          <div className="lantern" style={{ width: 20, height: 26 }} />
        </div>
        <div className="absolute top-32 right-[15%] animate-lantern-sway opacity-40" style={{ animationDelay: '1s' }}>
          <div className="lantern" />
        </div>
        <div className="absolute top-22 right-[3%] animate-lantern-sway opacity-45" style={{ animationDelay: '0.5s' }}>
          <div className="lantern" style={{ width: 24, height: 32 }} />
        </div>

        {/* Gold corner ornaments on the hero container */}
        <div ref={heroRef} className="container-custom relative z-10 text-center pt-20">
          {/* Chinese decorative top element */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-panda-red/30" />
            <span className="font-chinese text-panda-red/40 text-lg">批发餐厅用品</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-panda-red/30" />
          </div>

          <p className="text-panda-red font-medium uppercase tracking-[0.3em] text-sm mb-6 text-glow-red">
            Wholesale Restaurant Supplies
          </p>

          <div className="inline-block bg-panda-cream rounded-2xl p-4 md:p-6 mb-6 shadow-[0_0_40px_rgba(238,28,37,0.15)]">
            <img src={pandaBrand} alt="Panda Depot" className="h-40 md:h-56 lg:h-72 w-auto" />
          </div>

          <p className="text-[#6B5D4F] text-lg md:text-xl max-w-2xl mx-auto mb-4">
            Containers, packaging, groceries &amp; more for restaurants across South Florida.
          </p>
          <p className="text-[#6B5D4F]/80 text-sm mb-2">
            {catalogData.company.tagline}
          </p>
          <p className="font-chinese text-panda-red/30 text-xs mb-10">
            {catalogData.company.taglineZh}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog" className="btn-primary gap-2">
              <Icon icon="mdi:storefront" className="text-lg" />
              Browse Catalog
            </Link>
            <a href="tel:3053223301" className="btn-secondary gap-2">
              <Icon icon="mdi:phone" className="text-lg" />
              (305) 322-3301
            </a>
          </div>

          {/* Seal stamp decoration */}
          <div className="mt-12 flex justify-center">
            <div className="seal-stamp opacity-60">
              <span>熊猫</span>
            </div>
          </div>
        </div>

        {/* Cloud divider at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 h-16 z-20">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 60 C150 60 150 15 300 15 C450 15 450 60 600 60 C750 60 750 15 900 15 C1050 15 1050 60 1200 60 L1200 60 L0 60Z" fill="#FFF8F0" />
          </svg>
        </div>
      </section>

      {/* ══════════ CATEGORIES GRID ══════════ */}
      <section className="section-padding lattice-bg">
        <div className="container-custom relative z-10">
          {/* Ornamental section header */}
          <div className="chinese-divider mb-2">
            <span>龙</span>
          </div>
          <h2 className="font-heading text-display-md text-center mb-2">PRODUCT CATEGORIES</h2>
          <p className="font-chinese text-panda-red/40 text-center text-xl mb-4">产品类别</p>
          <p className="text-[#6B5D4F] text-center mb-12 max-w-xl mx-auto">
            {catalogData.categories.length} categories &middot; 273+ wholesale products &middot; Prices valid {catalogData.validPeriod.start} to {catalogData.validPeriod.end}
          </p>

          <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {catalogData.categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/catalog/${slugify(cat.name)}`}
                data-animate
                className="glass-card p-5 group hover:border-panda-red/40 transition-all duration-300 hover:scale-[1.02]"
              >
                <Icon
                  icon={categoryIcons[cat.name] || 'mdi:package-variant'}
                  className="text-3xl text-panda-red mb-3 group-hover:scale-110 transition-transform"
                />
                <h3 className="font-medium text-sm text-panda-white leading-tight mb-1">
                  {cat.name}
                </h3>
                {cat.nameZh && (
                  <p className="font-chinese text-panda-gold/40 text-xs">{cat.nameZh}</p>
                )}
                <p className="text-panda-muted text-xs mt-2">
                  {cat.products.length} items
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ INFO BAR — cloud-framed ══════════ */}
      <section className="cloud-section bg-gradient-to-b from-panda-red/10 via-panda-red/5 to-panda-red/10">
        <div className="container-custom py-16 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-panda-red/10 border border-panda-red/20 flex items-center justify-center">
                <Icon icon="mdi:truck-fast" className="text-2xl text-panda-red" />
              </div>
              <h4 className="font-heading text-lg tracking-wide text-panda-red">FAST DELIVERY</h4>
              <p className="font-chinese text-panda-red/30 text-sm">快速配送</p>
              <p className="text-[#6B5D4F] text-sm">Daily delivery to restaurants</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-panda-red/10 border border-panda-red/20 flex items-center justify-center">
                <Icon icon="mdi:cash-multiple" className="text-2xl text-panda-red" />
              </div>
              <h4 className="font-heading text-lg tracking-wide text-panda-red">WHOLESALE PRICES</h4>
              <p className="font-chinese text-panda-red/30 text-sm">批发价格</p>
              <p className="text-[#6B5D4F] text-sm">Bulk discounts on every order</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-panda-red/10 border border-panda-red/20 flex items-center justify-center">
                <Icon icon="mdi:shield-check" className="text-2xl text-panda-red" />
              </div>
              <h4 className="font-heading text-lg tracking-wide text-panda-red">QUALITY GUARANTEED</h4>
              <p className="font-chinese text-panda-red/30 text-sm">质量保证</p>
              <p className="text-[#6B5D4F] text-sm">All products on approval</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
