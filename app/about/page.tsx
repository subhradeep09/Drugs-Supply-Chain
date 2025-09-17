'use client'

import Navbar from '@/app/ui/Navbar'
import Footer from '@/app/ui/Footer'
import { Building2, Users, Heart, Globe, Award, Target, Eye, Zap } from 'lucide-react'

export default function AboutPage() {
  const milestones = [
    { phase: 'Foundation', title: 'Project Inception', description: 'Ayush Sampark project was conceived with a vision to revolutionize pharmaceutical supply chains.' },
    { phase: 'Development', title: 'Blockchain Integration', description: 'Currently developing our blockchain-powered tracking system for drug authenticity.' },
    { phase: 'Testing', title: 'Partner Network', description: 'Building relationships with 100+ future healthcare partners across India.' },
    { phase: 'Beta', title: 'AI Integration', description: 'Integrating AI-powered analytics for predictive supply chain management.' },
    { phase: 'Launch', title: 'Global Expansion', description: 'Planning to serve healthcare organizations across 45+ countries.' },
    { phase: 'Future', title: 'Impact Goal', description: 'Aiming to positively impact over 1 million patient lives.' }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Patient-Centric',
      description: 'Every decision we make prioritizes patient safety and access to authentic medications.',
      gradient: 'from-red-400 to-pink-600'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We believe in complete transparency across the entire pharmaceutical supply chain.',
      gradient: 'from-blue-400 to-cyan-600'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuous innovation drives our mission to transform healthcare technology.',
      gradient: 'from-yellow-400 to-orange-600'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our platform and service delivery.',
      gradient: 'from-purple-400 to-pink-600'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Our goal is to create a positive impact on healthcare systems worldwide.',
      gradient: 'from-green-400 to-emerald-600'
    },
    {
      icon: Building2,
      title: 'Reliability',
      description: 'Healthcare organizations trust us for our consistent, reliable platform performance.',
      gradient: 'from-indigo-400 to-purple-600'
    }
  ]

  const team = [
    {
      name: 'Dr. Ananya Sharma',
      role: 'CEO & Co-Founder',
      bio: 'Former healthcare executive with 15+ years in pharmaceutical operations.',
      gradient: 'from-purple-400 to-pink-600'
    },
    {
      name: 'Rajesh Kumar',
      role: 'CTO & Co-Founder',
      bio: 'Blockchain architect with expertise in healthcare technology solutions.',
      gradient: 'from-blue-400 to-cyan-600'
    },
    {
      name: 'Dr. Priya Mehta',
      role: 'Chief Medical Officer',
      bio: 'Renowned pharmacologist ensuring medical compliance and safety standards.',
      gradient: 'from-green-400 to-emerald-600'
    },
    {
      name: 'Vikram Patel',
      role: 'Head of Operations',
      bio: 'Supply chain expert optimizing pharmaceutical distribution networks.',
      gradient: 'from-orange-400 to-red-600'
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
              About
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Ayush Sampark
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Pioneering the future of pharmaceutical supply chain management through blockchain innovation, 
              AI-powered analytics, and unwavering commitment to patient safety.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-8">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                To revolutionize pharmaceutical supply chains worldwide by providing transparent, secure, and efficient 
                blockchain-powered solutions that ensure every patient receives authentic, safe medications.
              </p>
              <p className="text-gray-400 leading-relaxed">
                We are committed to eliminating counterfeit drugs, reducing healthcare costs, and improving patient 
                outcomes through innovative technology and strategic partnerships with healthcare organizations globally.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                To create a world where every pharmaceutical transaction is transparent, every drug is authentic, 
                and every patient has access to safe, effective medications through our innovative platform.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our vision is to establish Ayush Sampark as the global standard for pharmaceutical supply chain management, 
                serving healthcare organizations across all continents and protecting millions of lives worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> Journey</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From a revolutionary idea to a global platform transforming healthcare supply chains worldwide.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">The Beginning</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Ayush Sampark was born from a critical realization: the pharmaceutical supply chain needed radical transformation. 
                Our founders, Dr. Ananya Sharma and Rajesh Kumar, witnessed firsthand the devastating impact of counterfeit drugs 
                and inefficient supply chain management on patient outcomes.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                During recent global health challenges, the vulnerabilities in pharmaceutical supply chains became more apparent than ever. 
                Critical medications were delayed, authenticity was questioned, and patients suffered. This was our call to action.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Combining Dr. Sharma's deep healthcare expertise with Kumar's blockchain mastery, we set out to create a platform 
                that would ensure transparency, authenticity, and efficiency in every pharmaceutical transaction.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {milestone.phase}
                  </div>
                  <div className="flex-grow bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h4 className="text-xl font-bold text-white mb-2">{milestone.title}</h4>
                    <p className="text-gray-300">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> Values</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The core principles that guide every decision we make and every solution we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>

                <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500 -z-10 rounded-3xl`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Meet Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> Team</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Visionary leaders and experts driving innovation in healthcare technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 text-center relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                
                <div className="relative z-10">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${member.gradient} flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  
                  <p className={`text-sm font-medium mb-4 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                    {member.role}
                  </p>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Achievements */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> Impact</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-4">
                1M+
              </div>
              <div className="text-white font-semibold text-lg mb-2">Lives Protected</div>
              <div className="text-gray-400 text-sm">Patients receiving authentic medications</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
                45+
              </div>
              <div className="text-white font-semibold text-lg mb-2">Countries Served</div>
              <div className="text-gray-400 text-sm">Global healthcare network</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                1200+
              </div>
              <div className="text-white font-semibold text-lg mb-2">Healthcare Partners</div>
              <div className="text-gray-400 text-sm">Trusted organizations worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-4">
                $50M+
              </div>
              <div className="text-white font-semibold text-lg mb-2">Cost Savings</div>
              <div className="text-gray-400 text-sm">Generated for healthcare systems</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}