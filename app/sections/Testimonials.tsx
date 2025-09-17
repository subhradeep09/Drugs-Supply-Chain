'use client'

import { Star, Quote } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Chief Pharmacist",
      organization: "AIIMS Delhi",
      image: "/api/placeholder/80/80",
      content: "Ayush Sampark has revolutionized our drug procurement process. The transparency and real-time tracking have eliminated counterfeit drugs from our supply chain entirely.",
      rating: 5,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Rajesh Kumar",
      role: "Supply Chain Director",
      organization: "Sun Pharma",
      image: "/api/placeholder/80/80",
      content: "The blockchain integration has streamlined our distribution network by 70%. We now have complete visibility from manufacturing to patient delivery.",
      rating: 5,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Dr. Anita Desai",
      role: "Hospital Administrator",
      organization: "Max Healthcare",
      image: "/api/placeholder/80/80",
      content: "Patient safety has improved dramatically. We can verify every medication's authenticity and storage conditions throughout the entire supply chain.",
      rating: 5,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      name: "Vikram Patel",
      role: "Pharmacy Owner",
      organization: "MedPlus Pharmacy Chain",
      image: "/api/placeholder/80/80",
      content: "Our inventory management is now automated and precise. The AI-powered demand forecasting has reduced waste by 45% while ensuring stock availability.",
      rating: 5,
      gradient: "from-orange-500 to-red-500"
    },
    {
      name: "Dr. Sanjay Gupta",
      role: "Quality Assurance Head",
      organization: "Cipla Pharmaceuticals",
      image: "/api/placeholder/80/80",
      content: "The immutable audit trails have made regulatory compliance effortless. Every batch can be tracked with complete documentation and temperature logs.",
      rating: 5,
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      name: "Meera Jain",
      role: "Procurement Manager",
      organization: "Apollo Hospitals",
      image: "/api/placeholder/80/80",
      content: "Cost savings of 30% and delivery time reduction by half. The smart contracts have automated our entire procurement workflow seamlessly.",
      rating: 5,
      gradient: "from-teal-500 to-cyan-500"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.1),transparent_50%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Trusted by
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> Healthcare Leaders</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Healthcare professionals across India are transforming their operations with our blockchain-powered platform. 
            Here's what industry leaders say about their experience.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/10 relative overflow-hidden"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-20">
                <Quote className="w-12 h-12 text-white transform rotate-12" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 leading-relaxed mb-8 relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author info */}
              <div className="flex items-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white font-bold text-xl mr-4`}>
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {testimonial.role}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {testimonial.organization}
                  </p>
                </div>
              </div>

              {/* Hover gradient effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                98%
              </div>
              <div className="text-gray-300 font-medium">Customer Satisfaction</div>
              <div className="text-gray-500 text-sm mt-1">Across all user segments</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                45%
              </div>
              <div className="text-gray-300 font-medium">Cost Reduction</div>
              <div className="text-gray-500 text-sm mt-1">Average savings reported</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                2.5x
              </div>
              <div className="text-gray-300 font-medium">Faster Processing</div>
              <div className="text-gray-500 text-sm mt-1">Compared to traditional systems</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-2">
                100%
              </div>
              <div className="text-gray-300 font-medium">Drug Authenticity</div>
              <div className="text-gray-500 text-sm mt-1">Zero counterfeit incidents</div>
            </div>
          </div>
        </div>

        {/* Partners logos */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Trusted by Leading Healthcare Organizations</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {[
              "AIIMS", "Apollo Hospitals", "Max Healthcare", "Fortis", "Sun Pharma", 
              "Cipla", "Dr. Reddy's", "MedPlus", "Guardian Healthcare", "Manipal Hospitals"
            ].map((partner, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 text-white font-semibold">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}