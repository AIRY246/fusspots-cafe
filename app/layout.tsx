import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import restaurantData from '@/data/restaurant.json'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: restaurantData.seo.title,
  description: restaurantData.seo.description,
  keywords: restaurantData.seo.keywords,
  authors: [{ name: restaurantData.name }],
  creator: restaurantData.name,
  metadataBase: new URL(restaurantData.seo.canonicalUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: restaurantData.seo.canonicalUrl,
    title: restaurantData.seo.title,
    description: restaurantData.seo.description,
    siteName: restaurantData.name,
    images: [
      {
        url: restaurantData.ogImage,
        width: 1200,
        height: 630,
        alt: restaurantData.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: restaurantData.seo.title,
    description: restaurantData.seo.description,
    images: [restaurantData.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: restaurantData.name,
  description: restaurantData.description,
  url: restaurantData.seo.canonicalUrl,
  telephone: restaurantData.contact.phone,
  email: restaurantData.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: restaurantData.address.street,
    addressLocality: restaurantData.address.suburb,
    addressRegion: restaurantData.address.state,
    postalCode: restaurantData.address.postcode,
    addressCountry: restaurantData.address.country,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Monday',
      opens: '09:00',
      closes: '14:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Thursday', 'Friday'],
      opens: '09:00',
      closes: '14:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '08:00',
      closes: '15:00',
    },
  ],
  servesCuisine: 'Cafe, Breakfast',
  priceRange: '$',
  hasMap: restaurantData.googleMapsUrl,
  sameAs: [
    restaurantData.social.instagram,
    restaurantData.social.facebook,
  ].filter(Boolean),
  image: restaurantData.heroImage,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.1',
    reviewCount: '483',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background font-sans antialiased">{children}</body>
    </html>
  )
}
