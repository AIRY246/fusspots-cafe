import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { WaterfallWay } from '@/components/WaterfallWay'
import { Menu } from '@/components/Menu'
import { Gallery } from '@/components/Gallery'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { Reviews } from '@/components/Reviews'
import { VisitUs } from '@/components/VisitUs'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'

import restaurantData from '@/data/restaurant.json'
import menuData from '@/data/menu.json'
import galleryData from '@/data/gallery.json'
import reviewsData from '@/data/reviews.json'

import type { RestaurantData, MenuData, GalleryData, ReviewsData } from '@/types'

export default function HomePage() {
  return (
    <main>
      <Navbar restaurant={restaurantData as RestaurantData} />
      <Hero restaurant={restaurantData as RestaurantData} />
      <About restaurant={restaurantData as RestaurantData} />
      <WaterfallWay />
      <Menu menu={menuData as MenuData} />
      <Gallery gallery={galleryData as GalleryData} />
      <WhyChooseUs cards={reviewsData.whyChooseUs} />
      <Reviews
        rating={reviewsData.rating}
        totalReviews={reviewsData.totalReviews}
        reviews={reviewsData.reviews}
      />
      <VisitUs restaurant={restaurantData as RestaurantData} />
      <FAQ
        items={reviewsData.faq}
        phone={restaurantData.contact.phone}
        phoneDisplay={restaurantData.contact.phoneDisplay}
      />
      <Footer restaurant={restaurantData as RestaurantData} />
    </main>
  )
}
