'use client'

import Navbar from '@/app/ui/Navbar'
import Footer from '@/app/ui/Footer'
import { 
  Shield, 
  Zap, 
  Globe, 
  Database, 
  Lock, 
  Eye, 
  Truck, 
  Users, 
  BarChart3, 
  CheckCircle, 
  AlertTriangle,
  Search
} from 'lucide-react'

export default function FeaturesPage() {
  const features = [
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Immutable ledger technology ensures every transaction is permanently recorded and tamper-proof.',
      gradient: 'from-green-400 to-emerald-600'
    },
    {
      icon: Eye,
      title: 'Real-time Tracking',
      description: 'Track your pharmaceutical products from manufacturer to end consumer with complete transparency.',
      gradient: 'from-blue-400 to-cyan-600'
    },
    {
      icon: Database,
      title: 'Inventory Management',
      description: 'Advanced inventory systems with automated reordering and expiry date management.',
      gradient: 'from-purple-400 to-pink-600'
    },
    {
      icon: Lock,
      title: 'Data Encryption',
      description: 'Military-grade encryption protects sensitive pharmaceutical and patient data.',
      gradient: 'from-red-400 to-orange-600'
    },
    {
      icon: Globe,
      title: 'Global Compliance',
      description: 'Built-in compliance with international pharmaceutical regulations and standards.',
      gradient: 'from-indigo-400 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Smart Contracts',
      description: 'Automated contract execution reduces manual processing and eliminates errors.',
      gradient: 'from-yellow-400 to-orange-600'
    },
    {
      icon: Truck,
      title: 'Supply Chain Optimization',
      description: 'AI-powered logistics optimization reduces costs and improves delivery times.',
      gradient: 'from-teal-400 to-green-600'
    },
    {
      icon: Users,
      title: 'Multi-stakeholder Platform',
      description: 'Connect manufacturers, distributors, pharmacies, and healthcare providers seamlessly.',
      gradient: 'from-pink-400 to-red-600'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive dashboards and reports for data-driven decision making.',
      gradient: 'from-cyan-400 to-blue-600'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Automated quality checks and verification processes ensure product integrity.',
      gradient: 'from-emerald-400 to-teal-600'
    },
    {
      icon: AlertTriangle,
      title: 'Alert System',
      description: 'Real-time alerts for expiry dates, shortages, and supply chain disruptions.',
      gradient: 'from-orange-400 to-red-600'
    },
    {
      icon: Search,
      title: 'Drug Authentication',
      description: 'Instant verification of drug authenticity using blockchain-based certificates.',
      gradient: 'from-violet-400 to-purple-600'
    }
  ]

  const benefits = [
    {
      title: 'Reduce Counterfeit Drugs',
      description: 'Eliminate fake medications with blockchain verification',
      percentage: '99%'
    },
    {
      title: 'Improve Supply Chain Visibility',
      description: 'Complete transparency from manufacturer to patient',
      percentage: '100%'
    },
    {
      title: 'Decrease Administrative Costs',
      description: 'Automated processes reduce manual overhead',
      percentage: '40%'
    },
    {
      title: 'Faster Regulatory Compliance',
      description: 'Built-in compliance tools and automated reporting',
      percentage: '60%'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 mb-8 leading-tight">
              Platform
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Features
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Discover the powerful features that make Ayush Sampark the leading blockchain-powered pharmaceutical supply chain platform.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              From real-time tracking to AI-powered analytics, our platform provides everything you need 
              to transform your pharmaceutical operations.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Core
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive suite of features designed to revolutionize pharmaceutical supply chain management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500 -z-10 rounded-3xl`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Platform
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> Benefits</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience measurable improvements in your pharmaceutical supply chain operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 text-center"
              >
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
                  {benefit.percentage}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Technology
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> Stack</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built on cutting-edge technologies to ensure scalability, security, and performance.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['Blockchain', 'AI/ML', 'IoT', 'Cloud', 'Mobile', 'API'].map((tech, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 text-center group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <div className="w-6 h-6 bg-white rounded-sm"></div>
                </div>
                <h3 className="text-white font-semibold text-sm">
                  {tech}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Supply Chain?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Join the future of pharmaceutical supply chain management with our blockchain-powered platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Start Free Trial
              </button>
              <button className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}