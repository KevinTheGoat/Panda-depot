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
        {/* Header with Chinese ornament */}
        <div className="flex items-end gap-4 mb-2">
          <h1 className="font-heading text-display-lg">FULL CATALOG</h1>
          <span className="font-chinese text-panda-red/40 text-2xl pb-1">完整目录</span>
        </div>
        <div className="h-[1px] w-32 bg-gradient-to-r from-panda-red to-panda-red/20 mb-4" />
        <p className="text-[#6B5D4F] mb-2">
          {allProducts.length} products &middot; Call for pricing
        </p>
        <p className="font-chinese text-panda-red/30 text-xs mb-8">
          {catalogData.company.welcomeZh}
        </p>

        {/* Search */}
        <div className="relative max-w-md mb-10">
          <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B5D4F] text-xl" />
          <input
            type="text"
            placeholder="Search products, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#E8D5BF] rounded-lg pl-12 pr-4 py-3 text-sm text-[#1A1008] placeholder:text-[#6B5D4F]/50 focus:outline-none focus:border-panda-red/50 focus:shadow-[0_0_15px_rgba(238,28,37,0.1)] transition-all"
          />
        </div>

        {/* Results */}
        {search.trim() ? (
          <>
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
                    <Link to="/contact" className="text-panda-red text-xs font-medium whitespace-nowrap hover:underline">
                      Call to inquire
                    </Link>
                  </div>

                  {product.nameZh && (
                    <p className="font-chinese text-panda-gold/35 text-xs">{product.nameZh}</p>
                  )}

                  <div className="flex flex-wrap gap-2 mt-1">
                    {product.size && (
                      <span className="text-xs bg-panda-surface border border-panda-border/50 px-2 py-0.5 rounded text-panda-muted">
                        {product.size}
                      </span>
                    )}
                    {product.packing && (
                      <span className="text-xs bg-panda-surface border border-panda-border/50 px-2 py-0.5 rounded text-panda-muted">
                        {product.packing}
                      </span>
                    )}
                  </div>

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
                <Icon icon="mdi:magnify-close" className="text-5xl text-[#6B5D4F]/40 mx-auto mb-4" />
                <p className="text-[#6B5D4F]">No products match "{search}"</p>
              </div>
            )}
          </>
        ) : (
          <div ref={gridRef} className="space-y-10">
            {catalogData.categories.map((cat) => (
              <div key={cat.name} data-animate>
                <Link
                  to={`/catalog/${slugify(cat.name)}`}
                  className="group flex items-end gap-3 mb-4 hover:opacity-80 transition-opacity"
                >
                  <h2 className="font-heading text-display-sm">{cat.name.toUpperCase()}</h2>
                  {cat.nameZh && (
                    <span className="font-chinese text-panda-red/40 text-lg pb-0.5">{cat.nameZh}</span>
                  )}
                  <Icon icon="mdi:arrow-right" className="text-[#6B5D4F] mb-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <div className="h-[1px] w-16 bg-gradient-to-r from-panda-red to-panda-red/20 mb-4" />
                <p className="text-[#6B5D4F] text-sm mb-4">{cat.products.length} products</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {cat.products.slice(0, 4).map((product) => (
                    <div
                      key={product.id}
                      className="glass-card p-5 flex flex-col gap-2 hover:border-panda-red/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-panda-white leading-tight">
                          {product.name}
                        </h3>
                        <Link to="/contact" className="text-panda-red text-xs font-medium whitespace-nowrap hover:underline">
                          Call to inquire
                        </Link>
                      </div>
                      {product.nameZh && (
                        <p className="font-chinese text-panda-gold/35 text-xs">{product.nameZh}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-1">
                        {product.size && (
                          <span className="text-xs bg-panda-surface border border-panda-border/50 px-2 py-0.5 rounded text-panda-muted">
                            {product.size}
                          </span>
                        )}
                        {product.packing && (
                          <span className="text-xs bg-panda-surface border border-panda-border/50 px-2 py-0.5 rounded text-panda-muted">
                            {product.packing}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {cat.products.length > 4 && (
                  <Link
                    to={`/catalog/${slugify(cat.name)}`}
                    className="inline-flex items-center gap-1 text-panda-red text-sm mt-4 hover:underline"
                  >
                    View all {cat.products.length} products
                    <Icon icon="mdi:arrow-right" className="text-base" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
