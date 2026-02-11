import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Catalog', path: '/catalog' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-panda-black/90 backdrop-blur-lg border-b border-panda-border/30'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <span className="text-panda-red font-display text-3xl md:text-4xl tracking-wide">
            PANDA DEPOT
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`accent-line text-sm font-medium uppercase tracking-wider pb-1 transition-colors ${
                location.pathname === link.path
                  ? 'text-panda-red'
                  : 'text-panda-muted hover:text-panda-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a href="tel:9545548083" className="btn-primary text-xs gap-2">
            <Icon icon="mdi:phone" className="text-lg" />
            Call Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-panda-white p-2"
        >
          <Icon icon={mobileOpen ? 'mdi:close' : 'mdi:menu'} className="text-2xl" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-panda-dark/95 backdrop-blur-xl border-t border-panda-border/30">
          <div className="container-custom py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium py-2 ${
                  location.pathname === link.path
                    ? 'text-panda-red'
                    : 'text-panda-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a href="tel:9545548083" className="btn-primary text-sm mt-2 w-full justify-center gap-2">
              <Icon icon="mdi:phone" className="text-lg" />
              (954) 554-8083
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
