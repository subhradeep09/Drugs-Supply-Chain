'use client'

import { Button } from '@/app/ui/button'
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CTA() {
  const router = useRouter()

  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            Join the Healthcare Revolution
          </div>

          {/* Main heading */}
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Ready to Transform Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 block">
              Supply Chain?
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Join thousands of healthcare professionals who have revolutionized their operations with blockchain technology.
          </p>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience unprecedented transparency, security, and efficiency in pharmaceutical supply chain management. 
            Start your digital transformation journey today.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center text-white/80 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
              <Shield className="w-5 h-5 mr-3 text-green-400" />
              Enterprise-Grade Security
            </div>
            <div className="flex items-center text-white/80 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
              <Zap className="w-5 h-5 mr-3 text-yellow-400" />
              Instant Implementation
            </div>
            <div className="flex items-center text-white/80 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
              <Sparkles className="w-5 h-5 mr-3 text-purple-400" />
              24/7 Expert Support
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => router.push('/register')}
              className="group bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white px-12 py-6 text-xl font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 min-w-[200px]"
            >
              Start Free Trial
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => router.push('/contact')}
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-12 py-6 text-xl font-bold rounded-full transition-all duration-300 min-w-[200px]"
            >
              Book Demo
            </Button>
          </div>

          {/* Guarantee */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">30-Day Money-Back Guarantee</h3>
            <p className="text-gray-300 leading-relaxed">
              Try Ayush Sampark risk-free for 30 days. If you're not completely satisfied with the results, 
              we'll refund your investment—no questions asked. Join over 1,200 healthcare organizations 
              who trust us with their supply chain transformation.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                No Setup Fees
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Cancel Anytime
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Dedicated Support
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                GDPR Compliant
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"></div>
    </section>
  )
}