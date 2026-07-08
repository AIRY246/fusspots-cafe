'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Navigation, Clock } from 'lucide-react'

const highlights = [
  {
    icon: MapPin,
    title: 'Minutes from Ebor Falls',
    description: "One of NSW's most spectacular waterfalls is right on your doorstep.",
  },
  {
    icon: Navigation,
    title: 'Halfway Between Armidale & Coffs Harbour',
    description: 'A natural rest stop on the Waterfall Way — the most scenic drive in the New England region.',
  },
  {
    icon: Clock,
    title: 'Open Weekends from 8am',
    description: 'Early enough to fuel up before the falls. We\'ll have your coffee ready.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export function WaterfallWay() {
  return (
    <section
      className="relative overflow-hidden bg-[#111111]"
      aria-label="Waterfall Way — your stop near Ebor Falls"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/ebor-falls.jpg"
          alt="Ebor Falls, New South Wales — on the Waterfall Way"
          fill
          className="object-cover object-center"
          sizes="100vw"
          loading="lazy"
        />
        {/* Left-heavy gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-black/20" />
        {/* Subtle vignette top/bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-36">
        <div className="max-w-lg">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-brand-brown" />
            <span className="text-brand-brown text-sm font-semibold tracking-[0.15em] uppercase">
              Your Gateway to Ebor Falls
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
          >
            The Perfect Stop<br />
            on{' '}
            <span className="text-brand-brown">Waterfall Way</span>
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/70 text-lg leading-relaxed mb-10"
          >
            Fusspots Cafe sits right in the heart of Ebor, on the famous Waterfall Way
            scenic drive. Whether you&apos;re heading out to the lookout or winding back
            from a day in Guy Fawkes River National Park — pull in, take a breath, and
            let us take care of the rest.
          </motion.p>

          {/* Highlights */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col gap-5 mb-10"
          >
            {highlights.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-brown/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-brand-brown" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm mb-0.5 leading-snug">
                    {title}
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="https://www.google.com/maps/place/Fusspots+at+Ebor,+33+Ebor+St,+Ebor+NSW+2453,+Australia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-brown hover:bg-brand-brown/85 text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </a>
            <a
              href="https://www.nationalparks.nsw.gov.au/visit-a-park/parks/guy-fawkes-river-national-park"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/30 hover:border-white/60 text-white/80 hover:text-white font-semibold text-sm transition-all duration-300 hover:bg-white/5"
            >
              About Ebor Falls ↗
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
