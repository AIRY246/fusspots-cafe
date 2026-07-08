'use client'

import { motion } from 'framer-motion'
import { Leaf, MapPin, Users, Coffee } from 'lucide-react'
import type { WhyChooseUsCard } from '@/types'

interface WhyChooseUsProps {
  cards: WhyChooseUsCard[]
}

const iconMap: Record<string, React.ElementType> = {
  Leaf,
  MapPin,
  Users,
  Coffee,
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export function WhyChooseUs({ cards }: WhyChooseUsProps) {
  return (
    <section
      className="py-24 md:py-32 bg-white"
      aria-label="Why choose us"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-brand-green" />
            <span className="text-brand-green text-sm font-semibold tracking-[0.15em] uppercase">
              Why Us
            </span>
            <div className="h-px w-10 bg-brand-green" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
            The Fusspots Difference
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">
            A few reasons travellers and locals keep stopping by, again and again.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon] || Leaf
            return (
              <motion.div
                key={card.title}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative p-8 rounded-3xl bg-[#F7F5F2] hover:bg-white border border-transparent hover:border-brand-border hover:shadow-card-hover transition-all duration-300 text-center"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-8 right-8 h-0.5 bg-transparent group-hover:bg-brand-green rounded-full transition-all duration-500" />

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-white group-hover:bg-brand-green/10 flex items-center justify-center mb-6 mx-auto shadow-[0_2px_12px_rgba(0,0,0,0.06)] group-hover:shadow-none transition-all duration-300">
                  <Icon className="w-7 h-7 text-brand-green" />
                </div>

                {/* Number */}
                <div className="text-brand-green/25 font-serif text-6xl font-bold absolute top-6 right-8 leading-none select-none group-hover:text-brand-green/40 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <h3 className="font-serif text-xl font-bold text-text-primary mb-3 leading-tight">
                  {card.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
