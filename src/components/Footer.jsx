import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import catalogData from '../data/catalog.json'
import pandaLogo from '../assets/images/Panda Logo.svg'

const { company } = catalogData

export default function Footer() {
  return (
    <footer className="relative bg-panda-dark border-t border-panda-red/15">
      {/* Gold accent line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-panda-gold/30 to-transparent" />

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-panda-cream rounded-lg p-2">
                <img src={pandaLogo} alt="Panda Depot" className="h-12 w-auto" />
              </div>
              <div>
                <span className="font-heading text-panda-white text-xl tracking-wide leading-none block">PANDA DEPOT INC</span>
                <span className="font-chinese text-panda-gold/40 text-xs">熊猫得宝有限公司</span>
              </div>
            </div>
            <p className="text-panda-muted text-sm leading-relaxed">
              {company.description}
            </p>
            <p className="font-chinese text-panda-muted/40 text-xs mt-1">{company.descriptionZh}</p>
            <p className="text-panda-muted/60 text-xs mt-3 italic leading-relaxed">
              {company.motto}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xl text-panda-gold mb-4 tracking-wide">CONTACT</h4>
            <p className="font-chinese text-panda-gold/30 text-xs mb-4">联系方式</p>
            <div className="space-y-3 text-sm text-panda-muted">
              <a href="tel:3053223301" className="flex items-center gap-3 hover:text-panda-gold transition-colors">
                <Icon icon="mdi:phone" className="text-panda-red" />
                (305) 322-3301
              </a>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:cellphone" className="text-panda-red" />
                <span>Zelle: (954) 554-8083</span>
              </div>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 hover:text-panda-gold transition-colors">
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
            <h4 className="font-heading text-xl text-panda-gold mb-4 tracking-wide">HOURS</h4>
            <p className="font-chinese text-panda-gold/30 text-xs mb-4">营业时间</p>
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

        <div className="border-t border-panda-red/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="text-panda-muted/50 text-xs">
              &copy; {new Date().getFullYear()} Panda Depot Inc. All rights reserved.
            </p>
            <span className="font-chinese text-panda-gold/20 text-xs">熊猫得宝有限公司</span>
          </div>
          <div className="flex gap-6">
            <Link to="/catalog" className="text-panda-muted/50 text-xs hover:text-panda-gold transition-colors">Catalog</Link>
            <Link to="/contact" className="text-panda-muted/50 text-xs hover:text-panda-gold transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
