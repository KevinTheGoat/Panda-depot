import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useGsapFadeIn, useGsapStagger } from '../hooks/useGsap'
import catalogData from '../data/catalog.json'

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
        <div className="absolute inset-0 bg-panda-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(238,28,37,0.12)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 lattice-bg" />

        {/* Floating lanterns */}
        <div className="absolute top-24 left-[8%] animate-lantern-sway opacity-40">
          <div className="lantern" />
        </div>
        <div className="absolute top-32 right-[12%] animate-lantern-sway opacity-30" style={{ animationDelay: '1s' }}>
          <div className="lantern" />
        </div>
        <div className="absolute top-20 left-[35%] animate-lantern-sway opacity-20" style={{ animationDelay: '0.5s' }}>
          <div className="lantern" style={{ width: 20, height: 26 }} />
        </div>

        {/* Gold corner ornaments on the hero container */}
        <div ref={heroRef} className="container-custom relative z-10 text-center pt-20">
          {/* Chinese decorative top element */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-panda-gold/40" />
            <span className="font-chinese text-panda-gold/50 text-lg">批发餐厅用品</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-panda-gold/40" />
          </div>

          <p className="text-panda-red font-medium uppercase tracking-[0.3em] text-sm mb-6 text-glow-red">
            Wholesale Restaurant Supplies
          </p>

          <h1 className="font-heading text-display-xl text-panda-white mb-2 text-glow-red">
            PANDA DEPOT
          </h1>

          {/* Chinese subtitle */}
          <p className="font-chinese text-panda-gold text-3xl md:text-4xl mb-6 text-glow-gold">
            熊猫仓库
          </p>

          <p className="text-panda-muted text-lg md:text-xl max-w-2xl mx-auto mb-4">
            Containers, packaging, groceries &amp; more for restaurants across South Florida.
          </p>
          <p className="text-panda-muted/60 text-sm mb-10">
            {catalogData.company.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog" className="btn-primary gap-2">
              <Icon icon="mdi:storefront" className="text-lg" />
              Browse Catalog
            </Link>
            <a href="tel:9545548083" className="btn-secondary gap-2">
              <Icon icon="mdi:phone" className="text-lg" />
              (954) 554-8083
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
            <path d="M0 60 C150 60 150 15 300 15 C450 15 450 60 600 60 C750 60 750 15 900 15 C1050 15 1050 60 1200 60 L1200 60 L0 60Z" fill="#0C0A08" />
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
          <p className="font-chinese text-panda-gold/50 text-center text-xl mb-4">产品类别</p>
          <p className="text-panda-muted text-center mb-12 max-w-xl mx-auto">
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
              <h4 className="font-heading text-lg tracking-wide text-panda-gold">FAST DELIVERY</h4>
              <p className="font-chinese text-panda-gold/40 text-sm">快速配送</p>
              <p className="text-panda-muted text-sm">Daily delivery to restaurants</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-panda-red/10 border border-panda-red/20 flex items-center justify-center">
                <Icon icon="mdi:cash-multiple" className="text-2xl text-panda-red" />
              </div>
              <h4 className="font-heading text-lg tracking-wide text-panda-gold">WHOLESALE PRICES</h4>
              <p className="font-chinese text-panda-gold/40 text-sm">批发价格</p>
              <p className="text-panda-muted text-sm">Bulk discounts on every order</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-panda-red/10 border border-panda-red/20 flex items-center justify-center">
                <Icon icon="mdi:shield-check" className="text-2xl text-panda-red" />
              </div>
              <h4 className="font-heading text-lg tracking-wide text-panda-gold">QUALITY GUARANTEED</h4>
              <p className="font-chinese text-panda-gold/40 text-sm">质量保证</p>
              <p className="text-panda-muted text-sm">All products on approval</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
