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
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-panda-red/10 via-panda-black to-panda-black" />
        <div ref={heroRef} className="container-custom relative z-10 text-center pt-20">
          <p className="text-panda-red font-medium uppercase tracking-[0.3em] text-sm mb-6">
            Wholesale Restaurant Supplies
          </p>
          <h1 className="font-display text-display-xl text-panda-white mb-6">
            PANDA DEPOT
          </h1>
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
        </div>
      </section>

      {/* Categories grid */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="font-display text-display-md text-center mb-4">PRODUCT CATEGORIES</h2>
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
                  <p className="text-panda-muted/50 text-xs">{cat.nameZh}</p>
                )}
                <p className="text-panda-muted text-xs mt-2">
                  {cat.products.length} items
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section className="bg-panda-red/10 border-y border-panda-red/20">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Icon icon="mdi:truck-fast" className="text-3xl text-panda-red" />
              <h4 className="font-display text-lg tracking-wide">FAST DELIVERY</h4>
              <p className="text-panda-muted text-sm">Daily delivery to restaurants</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Icon icon="mdi:cash-multiple" className="text-3xl text-panda-red" />
              <h4 className="font-display text-lg tracking-wide">WHOLESALE PRICES</h4>
              <p className="text-panda-muted text-sm">Bulk discounts on every order</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Icon icon="mdi:shield-check" className="text-3xl text-panda-red" />
              <h4 className="font-display text-lg tracking-wide">QUALITY GUARANTEED</h4>
              <p className="text-panda-muted text-sm">All products on approval</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
