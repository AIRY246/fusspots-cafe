'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import type { GalleryData } from '@/types'

interface GalleryProps {
  gallery: GalleryData
}

export function Gallery({ gallery }: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  const navigate = useCallback(
    (direction: 'prev' | 'next') => {
      setCurrentIndex((prev) => {
        if (direction === 'prev') {
          return prev === 0 ? gallery.images.length - 1 : prev - 1
        }
        return prev === gallery.images.length - 1 ? 0 : prev + 1
      })
    },
    [gallery.images.length]
  )

  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') navigate('prev')
      if (e.key === 'ArrowRight') navigate('next')
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, navigate, closeLightbox])

  const currentImage = gallery.images[currentIndex]

  return (
    <section
      id="gallery"
      className="py-24 md:py-32 bg-[#F7F5F2]"
      aria-label="Photo gallery"
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
              Gallery
            </span>
            <div className="h-px w-10 bg-brand-green" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
            A Taste of Fusspots
          </h2>
          <p className="text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
            From our kitchen to our counter — a glimpse of what awaits you in Ebor.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="masonry-grid" role="list">
          {gallery.images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
              className="masonry-item"
              role="listitem"
            >
              <button
                onClick={() => openLightbox(index)}
                className="group relative w-full block rounded-2xl overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                aria-label={`View photo: ${image.alt}`}
              >
                <div className="relative w-full overflow-hidden rounded-2xl">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    style={{ display: 'block' }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 rounded-2xl flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <ZoomIn className="w-5 h-5 text-text-primary" />
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
              onClick={closeLightbox}
              aria-hidden="true"
            />

            {/* Lightbox Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
              role="dialog"
              aria-modal="true"
              aria-label="Image lightbox"
            >
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="pointer-events-auto absolute top-4 right-4 md:top-6 md:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Counter */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm tabular-nums pointer-events-none">
                {currentIndex + 1} / {gallery.images.length}
              </div>

              {/* Prev */}
              <button
                onClick={(e) => { e.stopPropagation(); navigate('prev') }}
                className="pointer-events-auto absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:-translate-x-0.5 hover:-translate-y-1/2"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center w-full h-full"
                  >
                    <Image
                      src={currentImage.src}
                      alt={currentImage.alt}
                      width={currentImage.width * 2}
                      height={currentImage.height * 2}
                      className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next */}
              <button
                onClick={(e) => { e.stopPropagation(); navigate('next') }}
                className="pointer-events-auto absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:translate-x-0.5 hover:-translate-y-1/2"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Caption */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm text-center max-w-md px-4 pointer-events-none">
                {currentImage.alt}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
