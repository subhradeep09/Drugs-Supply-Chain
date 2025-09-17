import Navbar from '@/app/ui/Navbar'
import { Hero } from '@/app/sections/Hero'
import { Features } from '@/app/sections/Features'
import { Stats } from '@/app/sections/Stats'
import { HowItWorks } from '@/app/sections/HowItWorks'
import { Testimonials } from '@/app/sections/Testimonials'
import { CTA } from '@/app/sections/CTA'
import Footer from '@/app/ui/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
} 