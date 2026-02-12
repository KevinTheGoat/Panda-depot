import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="pt-28 pb-20 min-h-screen flex items-center justify-center">
      <div className="container-custom text-center">
        {/* Broken fortune cookie SVG */}
        <div className="mb-8 inline-block">
          <svg viewBox="0 0 200 160" className="w-48 h-auto mx-auto" aria-hidden="true">
            {/* Left cookie half */}
            <path
              d="M30 100 Q50 40 90 80 Q95 85 92 95 Q80 120 40 115 Z"
              fill="#D4A056"
              stroke="#B8863C"
              strokeWidth="2"
            />
            <path
              d="M35 98 Q52 48 88 82 Q90 88 88 94 Q78 114 44 110 Z"
              fill="#E8B96A"
            />
            {/* Right cookie half */}
            <path
              d="M170 100 Q150 40 110 80 Q105 85 108 95 Q120 120 160 115 Z"
              fill="#D4A056"
              stroke="#B8863C"
              strokeWidth="2"
            />
            <path
              d="M165 98 Q148 48 112 82 Q110 88 112 94 Q122 114 156 110 Z"
              fill="#E8B96A"
            />
            {/* Fortune paper slip */}
            <rect x="70" y="55" width="60" height="50" rx="2" fill="#FFF8F0" stroke="#D4A056" strokeWidth="1" transform="rotate(-5 100 80)" />
            <text x="100" y="74" textAnchor="middle" fontSize="7" fill="#1A1008" fontFamily="'Noto Sans SC', sans-serif">404</text>
            <text x="100" y="85" textAnchor="middle" fontSize="5.5" fill="#8B7355" fontFamily="'Noto Sans SC', sans-serif">page not found</text>
            <text x="100" y="96" textAnchor="middle" fontSize="8" fill="#EE1C25" fontFamily="'Ma Shan Zheng', cursive">找不到页面</text>
            {/* Crumbs */}
            <circle cx="75" cy="122" r="2.5" fill="#D4A056" opacity="0.6" />
            <circle cx="130" cy="125" r="2" fill="#D4A056" opacity="0.5" />
            <circle cx="95" cy="128" r="1.5" fill="#D4A056" opacity="0.4" />
            <circle cx="115" cy="130" r="3" fill="#D4A056" opacity="0.5" />
            <circle cx="85" cy="132" r="1.8" fill="#D4A056" opacity="0.3" />
          </svg>
        </div>

        <h1 className="font-heading text-6xl md:text-8xl text-panda-red mb-2">404</h1>
        <p className="font-chinese text-panda-red/40 text-xl mb-6">找不到页面</p>

        <p className="text-[#6B5D4F] text-lg max-w-md mx-auto mb-2">
          This fortune cookie is empty — the page you're looking for doesn't exist.
        </p>
        <p className="text-[#6B5D4F]/60 text-sm mb-10">
          Maybe the path was mistyped, or the page was moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/"
            className="px-8 py-3 bg-panda-red text-white font-heading tracking-wider rounded-lg hover:bg-panda-red/90 transition-colors"
          >
            BACK TO HOME
          </Link>
          <Link
            to="/catalog"
            className="px-8 py-3 border border-panda-red/30 text-panda-red font-heading tracking-wider rounded-lg hover:bg-panda-red/5 transition-colors"
          >
            VIEW CATALOG
          </Link>
        </div>

      </div>
    </section>
  )
}
