import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useGsapStagger } from '../hooks/useGsap'
import catalogData from '../data/catalog.json'

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function Catalog() {
  const [search, setSearch] = useState('')
  const gridRef = useGsapStagger({ stagger: 0.03 })

  const allProducts = catalogData.categories.flatMap((cat) =>
    cat.products.map((p) => ({ ...p, category: cat.name, categoryZh: cat.nameZh }))
  )

  const filtered = search.trim()
    ? allProducts.filter(
        (p) =>
          p.name?.toLowerCase().includes(search.toLowerCase()) ||
          p.nameZh?.includes(search) ||
          p.category?.toLowerCase().includes(search.toLowerCase())
      )
    : allProducts

  return (
    <section className="pt-24 pb-16">
      <div className="container-custom">
        <h1 className="font-display text-display-lg mb-2">FULL CATALOG</h1>
        <p className="text-panda-muted mb-8">
          {allProducts.length} products &middot; Prices valid {catalogData.validPeriod.start} to {catalogData.validPeriod.end}
        </p>

        {/* Search */}
        <div className="relative max-w-md mb-10">
          <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 -translate-y-1/2 text-panda-muted text-xl" />
          <input
            type="text"
            placeholder="Search products, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-panda-dark border border-panda-border rounded-lg pl-12 pr-4 py-3 text-sm text-panda-white placeholder:text-panda-muted/50 focus:outline-none focus:border-panda-red/50 transition-colors"
          />
        </div>

        {/* Results */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              data-animate
              className="glass-card p-5 flex flex-col gap-2 hover:border-panda-red/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-panda-white leading-tight">
                  {product.name}
                </h3>
                {product.price != null && (
                  <span className="text-panda-red font-bold text-lg whitespace-nowrap">
                    ${product.price}
                  </span>
                )}
              </div>

              {product.nameZh && (
                <p className="text-panda-muted/50 text-xs">{product.nameZh}</p>
              )}

              <div className="flex flex-wrap gap-2 mt-1">
                {product.size && (
                  <span className="text-xs bg-panda-surface px-2 py-0.5 rounded text-panda-muted">
                    {product.size}
                  </span>
                )}
                {product.packing && (
                  <span className="text-xs bg-panda-surface px-2 py-0.5 rounded text-panda-muted">
                    {product.packing}
                  </span>
                )}
              </div>

              {product.deals && product.deals.length > 0 && (
                <div className="mt-2 space-y-1">
                  {product.deals.map((deal, i) => (
                    <p key={i} className="text-xs text-panda-gold flex items-center gap-1">
                      <Icon icon="mdi:tag" className="text-sm flex-shrink-0" />
                      {deal}
                    </p>
                  ))}
                </div>
              )}

              <Link
                to={`/catalog/${slugify(product.category)}`}
                className="text-xs text-panda-muted/40 mt-auto pt-2 hover:text-panda-red transition-colors"
              >
                {product.category}
              </Link>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Icon icon="mdi:magnify-close" className="text-5xl text-panda-muted/30 mx-auto mb-4" />
            <p className="text-panda-muted">No products match "{search}"</p>
          </div>
        )}
      </div>
    </section>
  )
}
