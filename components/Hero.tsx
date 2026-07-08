'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown, MapPin, UtensilsCrossed, Phone } from 'lucide-react'
import type { RestaurantData } from '@/types'

interface HeroProps {
  restaurant: RestaurantData
}

export function Hero({ restaurant }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 600], [0, 180])
  const contentY = useTransform(scrollY, [0, 600], [0, 80])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen min-h-[600px] overflow-hidden bg-gray-900"
      aria-label="Hero section"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={restaurant.heroImage}
          alt={`${restaurant.name} - ${restaurant.tagline}`}
          fill
          priority
          quality={90}
          className="object-cover scale-110"
          sizes="100vw"
        />
        {/* Multi-layer overlay for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="h-px w-8 bg-white/50" />
          <span className="text-white/80 text-sm font-medium tracking-[0.2em] uppercase">
            Coffee &bull; Breakfast &bull; Homemade Cakes
          </span>
          <div className="h-px w-8 bg-white/50" />
        </motion.div>

        {/* Restaurant Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6"
        >
          {restaurant.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/85 text-lg sm:text-xl md:text-2xl font-light max-w-xl leading-relaxed mb-10"
        >
          {restaurant.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => scrollToSection('menu')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-green hover:bg-brand-green-hover text-white font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 min-w-[160px] justify-center"
          >
            <UtensilsCrossed className="w-4 h-4" />
            View Menu
          </button>
          <a
            href={restaurant.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/60 hover:border-white text-white font-semibold text-base transition-all duration-300 hover:bg-white/10 min-w-[160px] justify-center"
          >
            <MapPin className="w-4 h-4" />
            Get Directions
          </a>
          <a
            href={`tel:${restaurant.contact.phone}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/60 hover:border-white text-white font-semibold text-base transition-all duration-300 hover:bg-white/10 min-w-[160px] justify-center"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </motion.div>

        {/* Location Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 flex items-center gap-1.5 text-white/60 text-sm"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>{restaurant.address.suburb}, {restaurant.address.state}</span>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors group"
        aria-label="Scroll to content"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 scroll-indicator" />
      </motion.button>
    </section>
  )
}
