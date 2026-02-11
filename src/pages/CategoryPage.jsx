import { useParams, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useGsapStagger } from '../hooks/useGsap'
import catalogData from '../data/catalog.json'

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function CategoryPage() {
  const { categorySlug } = useParams()
  const gridRef = useGsapStagger({ stagger: 0.05 })

  const category = catalogData.categories.find(
    (c) => slugify(c.name) === categorySlug
  )

  if (!category) {
    return (
      <section className="pt-32 pb-20">
        <div className="container-custom text-center">
          <Icon icon="mdi:alert-circle-outline" className="text-5xl text-panda-muted/30 mx-auto mb-4" />
          <h1 className="font-heading text-display-md mb-4">Category Not Found</h1>
          <Link to="/catalog" className="btn-primary">Back to Catalog</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-24 pb-16">
      <div className="container-custom">
        <Link to="/catalog" className="inline-flex items-center gap-1 text-panda-muted text-sm mb-6 hover:text-panda-red transition-colors">
          <Icon icon="mdi:arrow-left" />
          All Categories
        </Link>

        <div className="flex items-end gap-4 mb-1">
          <h1 className="font-heading text-display-lg">{category.name.toUpperCase()}</h1>
        </div>
        {category.nameZh && (
          <p className="font-chinese text-panda-gold/40 text-lg mb-2">{category.nameZh}</p>
        )}
        <div className="h-[1px] w-24 bg-gradient-to-r from-panda-red to-panda-gold/20 mb-4" />
        <p className="text-panda-muted text-sm mb-10">
          {category.products.length} products
          {category.note && <span className="block mt-1 text-panda-gold text-xs">{category.note}</span>}
        </p>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.products.map((product) => (
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
                {product.price != null && (
                  <div className="text-right flex-shrink-0">
                    <span className="text-panda-red font-bold text-xl text-glow-red">${product.price}</span>
                    {product.unit && (
                      <p className="text-panda-muted/50 text-[10px]">{product.unit}</p>
                    )}
                  </div>
                )}
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

              {product.deals && product.deals.length > 0 && (
                <div className="bg-panda-gold/5 border border-panda-gold/15 rounded-lg p-3 space-y-1">
                  {product.deals.map((deal, i) => (
                    <p key={i} className="text-xs text-panda-gold flex items-center gap-1.5">
                      <Icon icon="mdi:tag" className="text-sm flex-shrink-0" />
                      {deal}
                    </p>
                  ))}
                </div>
              )}

              {product.note && (
                <p className="text-xs text-panda-muted/60 italic">{product.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
