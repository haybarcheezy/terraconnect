import Head from 'next/head'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'

export default function Home() {
  return (
    <>
      <Head>
        <title>TerraConnect - Land management made easy.</title>
        <meta
          name="description"
          content="Many land management platforms are robust, yet overly complex. We prioritize simplicity over needless features, in the hope that your property management remains hassle-free."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
