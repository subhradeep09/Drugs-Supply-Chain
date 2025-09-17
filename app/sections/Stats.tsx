'use client'

import { TrendingUp, Shield, Clock, Users } from 'lucide-react'

export function Stats() {
  const stats = [
    {
      icon: TrendingUp,
      value: "500K+",
      label: "Drugs Successfully Tracked",
      description: "Pharmaceutical products monitored through our blockchain network",
      gradient: "from-green-400 to-emerald-600"
    },
    {
      icon: Users,
      value: "1,200+",
      label: "Healthcare Partners",
      description: "Hospitals, pharmacies, and manufacturers in our network",
      gradient: "from-blue-400 to-cyan-600"
    },
    {
      icon: Shield,
      value: "99.9%",
      label: "Security Uptime",
      description: "Blockchain-verified transactions with zero security breaches",
      gradient: "from-purple-400 to-pink-600"
    },
    {
      icon: Clock,
      value: "2.5x",
      label: "Faster Processing",
      description: "Reduced delivery times through automated smart contracts",
      gradient: "from-orange-400 to-red-600"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transforming Healthcare
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Through Innovation
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our blockchain-powered platform is revolutionizing drug supply chain management 
            with measurable results and unprecedented transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className={`text-4xl md:text-5xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}>
                  {stat.value}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {stat.label}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>

              {/* Hover effect glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Additional metrics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-2">45</div>
            <div className="text-gray-400 text-sm">Countries Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">15M+</div>
            <div className="text-gray-400 text-sm">Patients Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-gray-400 text-sm">Customer Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400 text-sm">System Availability</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">5min</div>
            <div className="text-gray-400 text-sm">Average Response Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-400 text-sm">Data Integrity</div>
          </div>
        </div>
      </div>
    </section>
  )
}