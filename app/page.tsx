import { Navbar } from '@/app/ui/Navbar'
import { Hero } from '@/app/sections/Hero'
import { Features } from '@/app/sections/Features'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
    </div>
  )
} 