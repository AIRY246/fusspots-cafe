export interface RestaurantAddress {
  street: string
  suburb: string
  state: string
  postcode: string
  country: string
  full: string
}

export interface RestaurantContact {
  phone: string
  phoneDisplay: string
  email: string
}

export interface OpeningHours {
  days: string
  hours: string
}

export interface SocialLinks {
  instagram: string
  facebook: string
  tiktok: string
}

export interface AboutFeature {
  icon: string
  title: string
  description: string
}

export interface SEO {
  title: string
  description: string
  keywords: string[]
  canonicalUrl: string
}

export interface LogoConfig {
  text: string
  image: string | null
}

export interface RestaurantData {
  name: string
  tagline: string
  description: string
  shortDescription: string
  established: number | null
  logo: LogoConfig
  heroImage: string
  aboutImage: string
  ogImage: string
  address: RestaurantAddress
  contact: RestaurantContact
  hours: OpeningHours[]
  social: SocialLinks
  googleMapsEmbed: string
  googleMapsUrl: string
  reservationUrl: string
  aboutFeatures: AboutFeature[]
  seo: SEO
}

export interface MenuItem {
  id: number
  category: string
  name: string
  description: string
  price: number
  image: string
  signature: boolean
  dietary: string[]
}

export interface MenuData {
  categories: string[]
  currency: string
  items: MenuItem[]
  dietaryLegend: Record<string, string>
}

export interface GalleryImage {
  id: number
  src: string
  alt: string
  width: number
  height: number
  featured: boolean
}

export interface GalleryData {
  images: GalleryImage[]
}

export interface Review {
  id: number
  name: string
  initials: string
  rating: number
  date: string
  dateDisplay: string
  text: string
  avatar: string | null
}

export interface WhyChooseUsCard {
  icon: string
  title: string
  description: string
}

export interface FAQItem {
  id: number
  question: string
  answer: string
}

export interface ReviewsData {
  rating: number
  totalReviews: number
  platform: string
  reviews: Review[]
  whyChooseUs: WhyChooseUsCard[]
  faq: FAQItem[]
}
