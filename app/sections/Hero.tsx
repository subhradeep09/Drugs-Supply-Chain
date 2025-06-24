'use client'

import { Button } from '@/app/ui/button'
import { useRouter } from 'next/navigation'

export function Hero() {
  const router = useRouter()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Decentralized Drug
            <span className="text-blue-600 dark:text-blue-400"> Supply Chain</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            A blockchain-based solution for transparent, secure, and efficient drug supply chain management 
            for the Government of Delhi. Track every step from manufacturer to patient.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => router.push('/sign-in')}
              className="text-lg px-8 py-3"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => router.push('/features')}
              className="text-lg px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 