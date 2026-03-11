import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function CategorySearch({ category }) {
  const [search, setSearch] = useState('')
  const gridRef = useScrollReveal({ stagger: 40 })

  const filtered = search.trim()
    ? category.products.filter(
        (p) =>
          p.name?.toLowerCase().includes(search.toLowerCase()) ||
          p.nameZh?.includes(search) ||
          p.description?.toLowerCase().includes(search.toLowerCase())
      )
    : category.products

  return (
    <>
      {/* Search */}
      <div className="relative max-w-md mb-10">
        <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B5D4F] text-xl" />
        <input
          type="text"
          placeholder={`Search in ${category.name}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-[#E8D5BF] rounded-lg pl-12 pr-4 py-3 text-sm text-[#1A1008] placeholder:text-[#6B5D4F]/50 focus:outline-none focus:border-panda-red/50 focus:shadow-[0_0_15px_rgba(238,28,37,0.1)] transition-all"
        />
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            data-animate
            className="glass-card p-6 flex flex-col gap-3 hover:border-panda-red/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-panda-white leading-tight">
                  {product.name}
                </h3>
                {product.nameZh && (
                  <p className="font-chinese text-panda-gold/35 text-xs mt-1">{product.nameZh}</p>
                )}
              </div>
              <a href="/contact" className="text-panda-red text-xs font-medium flex-shrink-0 hover:underline">
                Call to inquire
              </a>
            </div>

            {product.description && (
              <p className="text-panda-muted text-xs">{product.description}</p>
            )}

            <div className="flex flex-wrap gap-2">
              {product.size && (
                <span className="text-xs bg-panda-surface border border-panda-border/50 px-2.5 py-1 rounded text-panda-muted">
                  {product.size}
                </span>
              )}
              {product.packing && (
                <span className="text-xs bg-panda-surface border border-panda-border/50 px-2.5 py-1 rounded text-panda-muted">
                  {product.packing}
                </span>
              )}
              {product.brands && product.brands.map((b) => (
                <span key={b} className="text-xs bg-panda-red/10 border border-panda-red/20 px-2.5 py-1 rounded text-panda-red/80">
                  {b}
                </span>
              ))}
            </div>

            {product.note && (
              <p className="text-xs text-panda-muted/60 italic">{product.note}</p>
            )}
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
  )
}
