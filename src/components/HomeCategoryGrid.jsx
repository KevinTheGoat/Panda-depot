import { Icon } from '@iconify/react'
import { useScrollReveal } from '../hooks/useScrollReveal'

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

export default function HomeCategoryGrid({ categories, validPeriod }) {
  const gridRef = useScrollReveal({ stagger: 50 })

  return (
    <section className="section-padding lattice-bg">
      <div className="container-custom relative z-10">
        <div className="chinese-divider mb-2">
          <span>龙</span>
        </div>
        <h2 className="font-heading text-display-md text-center mb-2">PRODUCT CATEGORIES</h2>
        <p className="font-chinese text-panda-red/40 text-center text-xl mb-4">产品类别</p>
        <p className="text-[#6B5D4F] text-center mb-12 max-w-xl mx-auto">
          {categories.length} categories &middot; 273+ wholesale products &middot; Prices valid {validPeriod.start} to {validPeriod.end}
        </p>

        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={`/catalog/${slugify(cat.name)}`}
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
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
