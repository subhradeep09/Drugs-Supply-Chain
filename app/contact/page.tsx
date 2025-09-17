'use client'

import Navbar from '@/app/ui/Navbar'
import Footer from '@/app/ui/Footer'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Building2, Users2, Headphones } from 'lucide-react'

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      primary: '+91 80-4567-8900',
      secondary: '+91 80-4567-8901 (Emergency)',
      description: 'Available 24/7 for urgent healthcare needs',
      gradient: 'from-green-400 to-emerald-600'
    },
    {
      icon: Mail,
      title: 'Email Support',
      primary: 'support@ayushsampark.com',
      secondary: 'enterprise@ayushsampark.com',
      description: 'Response within 2 hours during business hours',
      gradient: 'from-blue-400 to-cyan-600'
    },
    {
      icon: MapPin,
      title: 'Head Office',
      primary: 'Bangalore Technology Hub',
      secondary: 'Electronic City, Bangalore 560100',
      description: 'Visit us for in-person consultations',
      gradient: 'from-purple-400 to-pink-600'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      primary: 'Available on Website',
      secondary: 'AI-powered instant responses',
      description: 'Get immediate answers to common questions',
      gradient: 'from-orange-400 to-red-600'
    }
  ]

  const supportTeams = [
    {
      icon: Headphones,
      title: 'Technical Support',
      description: 'Platform technical issues, integration support, API assistance',
      email: 'tech@ayushsampark.com',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: Users2,
      title: 'Customer Success',
      description: 'Onboarding, training, best practices, account management',
      email: 'success@ayushsampark.com',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: Building2,
      title: 'Enterprise Sales',
      description: 'Custom solutions, pricing, enterprise partnerships',
      email: 'enterprise@ayushsampark.com',
      gradient: 'from-purple-500 to-pink-600'
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
              Contact
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Us
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Get in touch with our experts to transform your pharmaceutical supply chain with blockchain technology.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Our dedicated support team is available 24/7 to help you implement, optimize, 
              and scale your supply chain management solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Get In
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> Touch</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose your preferred method to connect with our team of healthcare technology experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${method.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${method.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">
                    {method.title}
                  </h3>
                  
                  <div className="mb-4">
                    <p className="text-gray-200 font-medium mb-1">{method.primary}</p>
                    <p className="text-gray-400 text-sm">{method.secondary}</p>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {method.description}
                  </p>
                </div>

                <div className={`absolute inset-0 bg-gradient-to-r ${method.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500 -z-10 rounded-3xl`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Send Us a
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> Message</span>
              </h2>
              <p className="text-xl text-gray-300">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-white text-sm font-medium mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-white text-sm font-medium mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-3">
                      Organization
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
                      placeholder="Your organization name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-3">
                    Inquiry Type *
                  </label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300">
                    <option value="">Select inquiry type</option>
                    <option value="demo">Request Demo</option>
                    <option value="pricing">Pricing Information</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-3">
                    Message *
                  </label>
                  <textarea
                    rows={6}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your requirements and how we can help you..."
                    required
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="group bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center"
                  >
                    Send Message
                    <Send className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Support Teams */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Specialized
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> Support Teams</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect directly with our specialized teams for targeted assistance and expert guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {supportTeams.map((team, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${team.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${team.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <team.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">
                    {team.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {team.description}
                  </p>
                  
                  <a
                    href={`mailto:${team.email}`}
                    className={`text-sm font-medium bg-gradient-to-r ${team.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
                  >
                    {team.email} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Need Quick
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> Answers?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Check out our frequently asked questions or access our knowledge base for immediate assistance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Browse FAQ
              </button>
              <button className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                Knowledge Base
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 