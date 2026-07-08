'use client'

import { motion } from 'framer-motion'
import * as Accordion from '@radix-ui/react-accordion'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FAQItem } from '@/types'

interface FAQProps {
  items: FAQItem[]
  phone?: string
  phoneDisplay?: string
}

export function FAQ({ items, phone, phoneDisplay }: FAQProps) {
  return (
    <section
      className="py-24 md:py-32 bg-[#F7F5F2]"
      aria-label="Frequently asked questions"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
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
              FAQ
            </span>
            <div className="h-px w-10 bg-brand-green" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
            Good to Know
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Answers to the questions we hear most often.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Accordion.Root
            type="single"
            collapsible
            className="flex flex-col gap-3"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Accordion.Item
                  value={String(item.id)}
                  className={cn(
                    'bg-white rounded-2xl border border-brand-border overflow-hidden',
                    'data-[state=open]:border-brand-green/30 data-[state=open]:shadow-card',
                    'transition-all duration-300'
                  )}
                >
                  <Accordion.Header>
                    <Accordion.Trigger
                      className={cn(
                        'w-full flex items-center justify-between gap-4 px-6 py-5 text-left',
                        'font-semibold text-text-primary text-base',
                        'hover:text-brand-green transition-colors duration-200',
                        'group cursor-pointer',
                        '[&[data-state=open]]:text-brand-green'
                      )}
                    >
                      <span className="leading-snug">{item.question}</span>
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F7F5F2] group-data-[state=open]:bg-brand-green/10 flex items-center justify-center transition-colors duration-300">
                        <Plus className="w-4 h-4 text-text-secondary group-data-[state=open]:hidden" />
                        <Minus className="w-4 h-4 text-brand-green hidden group-data-[state=open]:block" />
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>

                  <Accordion.Content className="accordion-content overflow-hidden">
                    <div className="px-6 pb-6 pt-0">
                      <div className="w-full h-px bg-brand-border mb-4" />
                      <p className="text-text-secondary leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </motion.div>

        {/* Bottom CTA */}
        {phone && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12 p-8 bg-white rounded-3xl border border-brand-border"
          >
            <p className="text-text-secondary mb-4 leading-relaxed">
              Still have a question? Give us a call — we&apos;d love to help.
            </p>
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-brand-green hover:bg-brand-green-hover text-white font-semibold text-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              Call {phoneDisplay ?? phone}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
