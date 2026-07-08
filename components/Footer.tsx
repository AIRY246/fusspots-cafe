'use client'

import { motion } from 'framer-motion'
import { UtensilsCrossed, Instagram, Facebook, MapPin, Phone, Mail, ArrowUp } from 'lucide-react'
import type { RestaurantData } from '@/types'

interface FooterProps {
  restaurant: RestaurantData
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

function scrollToSection(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function Footer({ restaurant }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-[#1A1A1A] text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-full bg-brand-green flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-lg font-semibold text-white">
                {restaurant.name}
              </span>
            </div>
            <p className="text-[#ABABAB] text-sm leading-relaxed mb-6 max-w-xs">
              {restaurant.shortDescription}
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {restaurant.social.instagram && (
                <a
                  href={restaurant.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-green flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
              )}
              {restaurant.social.facebook && (
                <a
                  href={restaurant.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-green flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-4 h-4 text-white" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Navigation
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-[#ABABAB] hover:text-white text-sm transition-colors duration-200 hover:pl-1"
                      style={{ transition: 'color 0.2s, padding-left 0.2s' }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Opening Hours
            </h3>
            <ul className="flex flex-col gap-2.5">
              {restaurant.hours.map((h) => (
                <li key={h.days} className="flex flex-col gap-0.5">
                  <span className="text-[#ABABAB] text-xs">{h.days}</span>
                  <span className="text-white text-sm font-medium">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Get In Touch
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={restaurant.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[#ABABAB] hover:text-white transition-colors group"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-green" />
                  <span className="text-sm leading-relaxed">{restaurant.address.full}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${restaurant.contact.phone}`}
                  className="flex items-center gap-3 text-[#ABABAB] hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-brand-green" />
                  <span className="text-sm">{restaurant.contact.phoneDisplay}</span>
                </a>
              </li>
              {restaurant.contact.email && (
                <li>
                  <a
                    href={`mailto:${restaurant.contact.email}`}
                    className="flex items-center gap-3 text-[#ABABAB] hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0 text-brand-green" />
                    <span className="text-sm break-all">{restaurant.contact.email}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#666666] text-xs text-center sm:text-left">
            &copy; {year} {restaurant.name}. All rights reserved.
            &nbsp;·&nbsp;
            <span>{restaurant.address.suburb}, {restaurant.address.state}</span>
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#666666] hover:text-white text-xs transition-colors group"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <span className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-brand-green flex items-center justify-center transition-colors">
              <ArrowUp className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
