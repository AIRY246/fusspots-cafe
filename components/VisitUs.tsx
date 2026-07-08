'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'
import type { RestaurantData } from '@/types'

interface VisitUsProps {
  restaurant: RestaurantData
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function VisitUs({ restaurant }: VisitUsProps) {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-white"
      aria-label="Visit us"
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
              Find Us
            </span>
            <div className="h-px w-10 bg-brand-green" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
            Come Visit Us
          </h2>
          <p className="text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
            We&apos;d love to see you. Here&apos;s everything you need to find us.
          </p>
        </motion.div>

        {/* Map + Info Layout */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.10)] border border-brand-border"
          >
            <iframe
              src={restaurant.googleMapsEmbed}
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing location of ${restaurant.name}`}
              className="map-iframe block"
            />
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
            }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Address */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-4 p-6 bg-[#F7F5F2] rounded-2xl"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-brand-green" />
              </div>
              <div>
                <p className="font-semibold text-text-primary mb-1">Address</p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {restaurant.address.street}<br />
                  {restaurant.address.suburb} {restaurant.address.state} {restaurant.address.postcode}<br />
                  {restaurant.address.country}
                </p>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="p-6 bg-[#F7F5F2] rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-brand-green" />
                </div>
                <p className="font-semibold text-text-primary">Opening Hours</p>
              </div>
              <div className="flex flex-col gap-2">
                {restaurant.hours.map((h) => (
                  <div key={h.days} className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">{h.days}</span>
                    <span className="font-medium text-text-primary">{h.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-4 p-6 bg-[#F7F5F2] rounded-2xl"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-brand-green" />
              </div>
              <div>
                <p className="font-semibold text-text-primary mb-1">Phone</p>
                <a
                  href={`tel:${restaurant.contact.phone}`}
                  className="text-text-secondary text-sm hover:text-brand-green transition-colors"
                >
                  {restaurant.contact.phoneDisplay}
                </a>
              </div>
            </motion.div>

            {/* Email */}
            {restaurant.contact.email && (
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-4 p-6 bg-[#F7F5F2] rounded-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-brand-green" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-1">Email</p>
                  <a
                    href={`mailto:${restaurant.contact.email}`}
                    className="text-text-secondary text-sm hover:text-brand-green transition-colors break-all"
                  >
                    {restaurant.contact.email}
                  </a>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href={restaurant.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-green hover:bg-brand-green-hover text-white font-semibold text-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <ExternalLink className="w-4 h-4" />
                Get Directions
              </a>
              <a
                href={`tel:${restaurant.contact.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white font-semibold text-sm transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
