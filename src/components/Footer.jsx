import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import catalogData from '../data/catalog.json'

const { company } = catalogData

export default function Footer() {
  return (
    <footer className="bg-panda-dark border-t border-panda-border/30">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-display-sm text-panda-red mb-2">PANDA DEPOT</h3>
            <p className="text-panda-muted text-sm leading-relaxed">
              {company.description}
            </p>
            <p className="text-panda-muted/60 text-xs mt-2">{company.descriptionZh}</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl text-panda-white mb-4 tracking-wide">CONTACT</h4>
            <div className="space-y-3 text-sm text-panda-muted">
              <a href={`tel:${company.phone[0].replace(/-/g, '')}`} className="flex items-center gap-3 hover:text-panda-white transition-colors">
                <Icon icon="mdi:phone" className="text-panda-red" />
                {company.phone[0]}
              </a>
              <a href={`tel:${company.phone[1].replace(/-/g, '')}`} className="flex items-center gap-3 hover:text-panda-white transition-colors">
                <Icon icon="mdi:phone" className="text-panda-red" />
                {company.phone[1]}
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 hover:text-panda-white transition-colors">
                <Icon icon="mdi:email-outline" className="text-panda-red" />
                {company.email}
              </a>
              <div className="flex items-start gap-3">
                <Icon icon="mdi:map-marker" className="text-panda-red mt-0.5" />
                <span>{company.address}</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-xl text-panda-white mb-4 tracking-wide">HOURS</h4>
            <div className="space-y-3 text-sm text-panda-muted">
              <div className="flex items-center gap-3">
                <Icon icon="mdi:clock-outline" className="text-panda-red" />
                <div>
                  <p className="text-panda-white font-medium">Opening</p>
                  <p>{company.openingTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:truck-delivery" className="text-panda-red" />
                <div>
                  <p className="text-panda-white font-medium">Delivery</p>
                  <p>{company.deliveryTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Icon icon="mdi:wechat" className="text-panda-red text-xl" />
                <Icon icon="mdi:whatsapp" className="text-panda-red text-xl" />
                <span className="text-xs text-panda-muted/60">WeChat & WhatsApp available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-panda-border/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-panda-muted/50 text-xs">
            &copy; {new Date().getFullYear()} Panda Depot Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/catalog" className="text-panda-muted/50 text-xs hover:text-panda-white transition-colors">Catalog</Link>
            <Link to="/contact" className="text-panda-muted/50 text-xs hover:text-panda-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
