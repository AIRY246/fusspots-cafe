'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Leaf, Heart, Star, MapPin } from 'lucide-react'
import type { RestaurantData } from '@/types'

interface AboutProps {
  restaurant: RestaurantData
}

const iconMap: Record<string, React.ElementType> = {
  Leaf,
  Heart,
  Star,
  MapPin,
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

export function About({ restaurant }: AboutProps) {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-[#F7F5F2]"
      aria-label="About us"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
              <Image
                src={restaurant.aboutImage}
                alt={`Inside ${restaurant.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 md:bottom-8 md:-right-8 bg-white rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <p className="font-serif text-base font-bold text-text-primary leading-tight">
                    Waterfall Way
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5 font-medium">Ebor NSW 2453</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-brand-brown/10 -z-10" />
          </motion.div>

          {/* Content Column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col gap-8"
          >
            {/* Section Label */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="h-px w-10 bg-brand-green" />
              <span className="text-brand-green text-sm font-semibold tracking-[0.15em] uppercase">
                Our Story
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl font-bold text-text-primary leading-[1.15] tracking-tight"
            >
              A Country Café Worth<br />
              <span className="text-brand-green">Stopping For</span>
            </motion.h2>

            {/* Body Text */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              {restaurant.description.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-text-secondary leading-relaxed ${i === 0 ? 'text-lg' : ''}`}
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.div variants={fadeUp} className="w-16 h-px bg-brand-border" />

            {/* Feature Cards */}
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {restaurant.aboutFeatures.map((feature) => {
                const Icon = iconMap[feature.icon] || Leaf
                return (
                  <motion.div
                    key={feature.title}
                    variants={fadeUp}
                    className="group p-5 rounded-2xl bg-white border border-brand-border hover:border-brand-green/30 hover:shadow-card transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center mb-3 group-hover:bg-brand-green/15 transition-colors">
                      <Icon className="w-5 h-5 text-brand-green" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-text-primary mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
