import { Icon } from '@iconify/react'
import { useGsapFadeIn } from '../hooks/useGsap'
import catalogData from '../data/catalog.json'

const { company } = catalogData

export default function Contact() {
  const contentRef = useGsapFadeIn({ y: 40 })

  return (
    <section className="pt-28 pb-20">
      <div ref={contentRef} className="container-custom">
        <div className="flex items-end gap-4 mb-2">
          <h1 className="font-heading text-display-lg">GET IN TOUCH</h1>
          <span className="font-chinese text-panda-red/40 text-2xl pb-1">联系我们</span>
        </div>
        <div className="h-[1px] w-32 bg-gradient-to-r from-panda-red to-panda-red/20 mb-4" />
        <p className="text-[#6B5D4F] mb-12 max-w-lg">
          We deliver to restaurants across South Florida. Call, text, or visit our warehouse in Hialeah.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info cards */}
          <div className="space-y-4">
            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-panda-red/10 border border-panda-red/20 flex items-center justify-center flex-shrink-0">
                <Icon icon="mdi:phone" className="text-lg text-panda-red" />
              </div>
              <div>
                <h3 className="font-semibold text-panda-white mb-1">Phone</h3>
                <a href={`tel:${company.phone[0].replace(/-/g, '')}`} className="text-panda-muted hover:text-panda-gold transition-colors block">
                  {company.phone[0]}
                </a>
                <a href={`tel:${company.phone[1].replace(/-/g, '')}`} className="text-panda-muted hover:text-panda-gold transition-colors block">
                  {company.phone[1]}
                </a>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-panda-red/10 border border-panda-red/20 flex items-center justify-center flex-shrink-0">
                <Icon icon="mdi:email-outline" className="text-lg text-panda-red" />
              </div>
              <div>
                <h3 className="font-semibold text-panda-white mb-1">Email</h3>
                <a href={`mailto:${company.email}`} className="text-panda-muted hover:text-panda-gold transition-colors">
                  {company.email}
                </a>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-panda-red/10 border border-panda-red/20 flex items-center justify-center flex-shrink-0">
                <Icon icon="mdi:map-marker" className="text-lg text-panda-red" />
              </div>
              <div>
                <h3 className="font-semibold text-panda-white mb-1">Location</h3>
                <p className="text-panda-muted">{company.address}</p>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-panda-red/10 border border-panda-red/20 flex items-center justify-center flex-shrink-0">
                <Icon icon="mdi:clock-outline" className="text-lg text-panda-red" />
              </div>
              <div>
                <h3 className="font-semibold text-panda-white mb-1">Hours</h3>
                <p className="text-panda-muted text-sm">{company.openingTime}</p>
                <p className="text-panda-muted/60 text-xs mt-1">Delivery: {company.deliveryTime}</p>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-panda-red/10 border border-panda-red/20 flex items-center justify-center flex-shrink-0">
                <Icon icon="mdi:wechat" className="text-lg text-panda-red" />
              </div>
              <div>
                <h3 className="font-semibold text-panda-white mb-1">WeChat / WhatsApp</h3>
                <p className="text-panda-muted text-sm">{company.wechat}</p>
              </div>
            </div>
          </div>

          {/* Map embed */}
          <div className="glass-card overflow-hidden h-[400px] md:h-auto">
            <iframe
              title="Panda Depot Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3590.5!2d-80.27!3d25.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ5JzEyLjAiTiA4MMKwMTYnMTIuMCJX!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
