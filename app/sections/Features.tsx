'use client'

import { 
  Shield, 
  BarChart3, 
  Truck, 
  Users,
  FileText,
  Settings,
  Zap,
  Eye,
  Lock
} from 'lucide-react'

const features = [
  {
    title: 'Blockchain Security',
    description: 'Immutable records ensure transparency and prevent counterfeit drugs from entering the supply chain.',
    icon: Shield,
    gradient: 'from-green-400 to-emerald-600',
    details: [
      'Cryptographic verification',
      'Multi-signature transactions',
      'Immutable audit trails',
      'Zero-trust architecture'
    ]
  },
  {
    title: 'Real-time Tracking',
    description: 'Track every drug from manufacturer to patient with real-time updates and location data.',
    icon: Eye,
    gradient: 'from-blue-400 to-cyan-600',
    details: [
      'GPS-enabled tracking',
      'Temperature monitoring',
      'Chain of custody logs',
      'Live status updates'
    ]
  },
  {
    title: 'Supply Chain Management',
    description: 'Efficient inventory management and automated reordering based on consumption patterns.',
    icon: Truck,
    gradient: 'from-purple-400 to-pink-600',
    details: [
      'AI-powered forecasting',
      'Automated procurement',
      'Inventory optimization',
      'Demand prediction'
    ]
  },
  {
    title: 'Multi-role Access',
    description: 'Role-based dashboards for hospitals, pharmacies, vendors, and administrators.',
    icon: Users,
    gradient: 'from-orange-400 to-red-600',
    details: [
      'Granular permissions',
      'Custom workflows',
      'Role-based analytics',
      'Secure authentication'
    ]
  },
  {
    title: 'Compliance & Reporting',
    description: 'Automated compliance reporting and audit trails for regulatory requirements.',
    icon: FileText,
    gradient: 'from-indigo-400 to-purple-600',
    details: [
      'Regulatory compliance',
      'Automated reporting',
      'Audit trail generation',
      'Document management'
    ]
  },
  {
    title: 'Smart Contracts',
    description: 'Automated execution of supply chain agreements and payment processing.',
    icon: Zap,
    gradient: 'from-yellow-400 to-orange-600',
    details: [
      'Contract automation',
      'Payment processing',
      'Condition verification',
      'Dispute resolution'
    ]
  },
  {
    title: 'Advanced Analytics',
    description: 'Comprehensive insights and predictive analytics for optimized decision making.',
    icon: BarChart3,
    gradient: 'from-teal-400 to-green-600',
    details: [
      'Performance metrics',
      'Predictive insights',
      'Cost optimization',
      'Trend analysis'
    ]
  },
  {
    title: 'Enterprise Security',
    description: 'Military-grade encryption and security protocols protecting sensitive healthcare data.',
    icon: Lock,
    gradient: 'from-pink-400 to-rose-600',
    details: [
      'End-to-end encryption',
      'Secure data storage',
      'Access controls',
      'Privacy compliance'
    ]
  },
  {
    title: 'System Integration',
    description: 'Seamless integration with existing healthcare and ERP systems.',
    icon: Settings,
    gradient: 'from-cyan-400 to-blue-600',
    details: [
      'API integrations',
      'Legacy system support',
      'Custom connectors',
      'Data synchronization'
    ]
  },
]

export function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Powerful
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover the comprehensive suite of advanced features that make Ayush Sampark 
            the most trusted blockchain-powered pharmaceutical supply chain platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden"
            >
              {/* Gradient hover effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Feature details */}
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-gray-400 text-sm">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} mr-3 flex-shrink-0`}></div>
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Learn more link */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <button className={`text-sm font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}>
                    Learn More →
                  </button>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500 -z-10 rounded-3xl`}></div>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-20 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Experience the Future of Healthcare Supply Chain?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of healthcare professionals who have revolutionized their operations 
              with our cutting-edge blockchain technology.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Explore All Features
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 