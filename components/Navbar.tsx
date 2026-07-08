'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, UtensilsCrossed } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RestaurantData } from '@/types'

interface NavbarProps {
  restaurant: RestaurantData
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar({ restaurant }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#F7F5F2]/95 backdrop-blur-md shadow-[0_1px_24px_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#home')}
              className="flex items-center gap-2.5 group"
              aria-label={`${restaurant.name} - Go to top`}
            >
              <div className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300',
                scrolled ? 'bg-brand-green' : 'bg-white/20'
              )}>
                <UtensilsCrossed
                  className={cn(
                    'w-4 h-4 transition-colors duration-300',
                    scrolled ? 'text-white' : 'text-white'
                  )}
                />
              </div>
              <span
                className={cn(
                  'font-serif text-lg font-semibold tracking-tight transition-colors duration-300 leading-tight',
                  scrolled ? 'text-text-primary' : 'text-white'
                )}
              >
                {restaurant.name}
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative group',
                    scrolled
                      ? 'text-text-secondary hover:text-text-primary hover:bg-black/5'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={restaurant.reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-brand-green hover:bg-brand-green-hover text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Reserve a Table
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                'lg:hidden p-2 rounded-full transition-all duration-300',
                scrolled ? 'text-text-primary hover:bg-black/5' : 'text-white hover:bg-white/10'
              )}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,90vw)] bg-[#F7F5F2] shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-brand-border">
                <span className="font-serif text-lg font-semibold text-text-primary">
                  {restaurant.name}
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 text-text-primary"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 p-6 flex flex-col gap-1" role="navigation">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1 }}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-4 py-3.5 rounded-xl text-text-primary font-medium hover:bg-black/5 transition-colors"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="p-6 border-t border-brand-border">
                <a
                  href={restaurant.reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-6 py-3.5 rounded-full text-sm font-semibold bg-brand-green hover:bg-brand-green-hover text-white transition-all duration-300"
                >
                  Reserve a Table
                </a>
                <div className="mt-4 text-center">
                  <a
                    href={`tel:${restaurant.contact.phone}`}
                    className="text-sm text-text-secondary hover:text-brand-green transition-colors"
                  >
                    {restaurant.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
