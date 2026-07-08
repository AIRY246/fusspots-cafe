'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import * as Tabs from '@radix-ui/react-tabs'
import { Sparkles } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import type { MenuData, MenuItem } from '@/types'

interface MenuProps {
  menu: MenuData
}

const dietaryColors: Record<string, string> = {
  V: 'bg-green-50 text-green-700 border-green-200',
  VG: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  GF: 'bg-amber-50 text-amber-700 border-amber-200',
}

function MenuCard({ item, currency }: { item: MenuItem; currency: string }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-2xl overflow-hidden border border-brand-border hover:border-brand-green/20 hover:shadow-card-hover transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {item.signature && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-brown text-white text-xs font-semibold shadow-sm">
            <Sparkles className="w-3 h-3" />
            Signature
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-serif text-lg font-semibold text-text-primary leading-tight">
            {item.name}
          </h3>
          <span className="text-brand-green font-bold text-lg whitespace-nowrap">
            {formatPrice(item.price, currency)}
          </span>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed mb-3">
          {item.description}
        </p>

        {item.dietary.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.dietary.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'text-xs font-medium px-2 py-0.5 rounded-full border',
                  dietaryColors[tag] ?? 'bg-gray-50 text-gray-600 border-gray-200'
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}

export function Menu({ menu }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState(menu.categories[0])

  const filteredItems = menu.items.filter(
    (item) => item.category === activeCategory
  )

  return (
    <section
      id="menu"
      className="py-24 md:py-32 bg-white"
      aria-label="Our menu"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-brand-green" />
            <span className="text-brand-green text-sm font-semibold tracking-[0.15em] uppercase">
              Our Menu
            </span>
            <div className="h-px w-10 bg-brand-green" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
            Crafted with Care
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">
            Fresh, seasonal ingredients transformed into dishes that nourish and delight.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs.Root
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Tabs.List
              className="flex flex-wrap justify-center gap-2 mb-12 p-1 bg-[#F7F5F2] rounded-2xl max-w-2xl mx-auto"
              aria-label="Menu categories"
            >
              {menu.categories.map((category) => (
                <Tabs.Trigger
                  key={category}
                  value={category}
                  className={cn(
                    'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer',
                    'text-text-secondary hover:text-text-primary',
                    'data-[state=active]:bg-white data-[state=active]:text-brand-green',
                    'data-[state=active]:shadow-[0_2px_12px_rgba(0,0,0,0.08)]'
                  )}
                >
                  {category}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </motion.div>

          {menu.categories.map((category) => (
            <Tabs.Content
              key={category}
              value={category}
              className="outline-none"
            >
              <AnimatePresence mode="wait">
                {activeCategory === category && (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {filteredItems.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.4 }}
                      >
                        <MenuCard item={item} currency={menu.currency} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </Tabs.Content>
          ))}
        </Tabs.Root>

        {/* Dietary Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-4 mt-12 pt-8 border-t border-brand-border"
        >
          <span className="text-text-secondary text-sm font-medium">Key:</span>
          {Object.entries(menu.dietaryLegend).map(([key, label]) => (
            <span key={key} className="flex items-center gap-1.5 text-sm text-text-secondary">
              <span className={cn(
                'text-xs font-semibold px-2 py-0.5 rounded-full border',
                dietaryColors[key] ?? 'bg-gray-50 text-gray-600 border-gray-200'
              )}>
                {key}
              </span>
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
