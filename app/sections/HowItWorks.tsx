'use client'

import { Package, Truck, Shield, CheckCircle } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      icon: Package,
      title: "Smart Manufacturing",
      description: "Manufacturers register products with unique blockchain identities, including batch numbers, expiry dates, and quality certifications.",
      details: [
        "Digital product registration",
        "Blockchain identity creation",
        "Quality certificate upload",
        "Batch tracking initialization"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Truck,
      title: "Intelligent Distribution",
      description: "Automated routing and real-time tracking ensure efficient delivery while maintaining temperature and handling requirements.",
      details: [
        "Smart contract automation",
        "Route optimization",
        "Temperature monitoring",
        "Real-time GPS tracking"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Secure Verification",
      description: "Every transaction is cryptographically secured and verified by multiple nodes in the blockchain network.",
      details: [
        "Multi-signature verification",
        "Cryptographic security",
        "Immutable record keeping",
        "Audit trail generation"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: CheckCircle,
      title: "Patient Safety",
      description: "Final delivery with complete authenticity verification, ensuring patients receive genuine, properly stored medications.",
      details: [
        "Authenticity verification",
        "Temperature validation",
        "Expiry date confirmation",
        "Patient safety assurance"
      ],
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            How It
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our revolutionary blockchain-powered system transforms the entire pharmaceutical supply chain 
            through four intelligent stages, ensuring every medication reaches patients safely and securely.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-orange-500 transform -translate-y-1/2 opacity-30"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step number */}
                <div className="lg:absolute lg:top-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-8">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl mb-6 lg:mb-0 mx-auto shadow-2xl`}>
                    {index + 1}
                  </div>
                </div>

                {/* Card */}
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:bg-white/10 mt-8 lg:mt-16">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto lg:mx-0`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 text-center lg:text-left">
                    {step.title}
                  </h3>

                  <p className="text-gray-300 mb-6 leading-relaxed text-center lg:text-left">
                    {step.description}
                  </p>

                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-gray-400 text-sm">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color} mr-3 flex-shrink-0`}></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology stack */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Powered by Advanced Technology</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">⛓️</div>
              <h4 className="text-white font-semibold mb-2">Blockchain</h4>
              <p className="text-gray-400 text-sm">Ethereum & Polygon Networks</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="text-white font-semibold mb-2">AI/ML</h4>
              <p className="text-gray-400 text-sm">Predictive Analytics</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">☁️</div>
              <h4 className="text-white font-semibold mb-2">Cloud</h4>
              <p className="text-gray-400 text-sm">Scalable Infrastructure</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">🔐</div>
              <h4 className="text-white font-semibold mb-2">Security</h4>
              <p className="text-gray-400 text-sm">End-to-End Encryption</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}