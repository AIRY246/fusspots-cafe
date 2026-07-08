import type { MetadataRoute } from 'next'
import restaurantData from '@/data/restaurant.json'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = restaurantData.seo.canonicalUrl

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
