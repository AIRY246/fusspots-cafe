'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import type { Review } from '@/types'

interface ReviewsProps {
  rating: number
  totalReviews: number
  reviews: Review[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-brand-brown text-brand-brown' : 'text-gray-200 fill-gray-200'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-2xl p-6 border border-brand-border hover:border-brand-green/20 hover:shadow-card-hover transition-all duration-300 flex flex-col gap-4"
    >
      {/* Quote icon */}
      <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center">
        <Quote className="w-4 h-4 text-brand-green fill-brand-green" />
      </div>

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Text */}
      <p className="text-text-secondary text-sm leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-brand-border">
        <div
          className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          aria-hidden="true"
        >
          {review.initials}
        </div>
        <div>
          <p className="font-semibold text-text-primary text-sm">{review.name}</p>
          <p className="text-text-secondary text-xs">{review.dateDisplay}</p>
        </div>
      </div>
    </motion.article>
  )
}

export function Reviews({ rating, totalReviews, reviews }: ReviewsProps) {
  return (
    <section
      className="py-24 md:py-32 bg-[#F7F5F2]"
      aria-label="Customer reviews"
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
              Reviews
            </span>
            <div className="h-px w-10 bg-brand-green" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-6">
            What Our Guests Say
          </h2>

          {/* Rating Badge */}
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-7 py-4 shadow-card border border-brand-border">
            <div className="text-center">
              <div className="font-serif text-4xl font-bold text-text-primary leading-none mb-1">
                {rating}
              </div>
              <div className="flex justify-center mb-1">
                <StarRating rating={Math.round(rating)} />
              </div>
              <div className="text-text-secondary text-xs">
                {totalReviews.toLocaleString()} Google Reviews
              </div>
            </div>
            <div className="w-px h-14 bg-brand-border" />
            <div className="flex items-center gap-2">
              {/* Google logo SVG */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" aria-label="Google">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="text-left">
                <div className="font-semibold text-text-primary text-sm">Google</div>
                <div className="text-text-secondary text-xs">Verified Reviews</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.google.com/search?q=Fusspots+Cafe+Ebor+NSW&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-green hover:text-brand-green-hover font-semibold text-sm transition-colors border-b border-brand-green/30 hover:border-brand-green pb-0.5"
          >
            Read all {totalReviews} reviews on Google
          </a>
        </motion.div>
      </div>
    </section>
  )
}
