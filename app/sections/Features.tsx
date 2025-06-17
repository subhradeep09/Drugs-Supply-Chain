'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/app/ui/card'
import { 
  ShieldCheckIcon, 
  ChartBarIcon, 
  TruckIcon, 
  UserGroupIcon,
  DocumentTextIcon,
  CogIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    title: 'Blockchain Security',
    description: 'Immutable records ensure transparency and prevent counterfeit drugs from entering the supply chain.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Real-time Tracking',
    description: 'Track every drug from manufacturer to patient with real-time updates and location data.',
    icon: ChartBarIcon,
  },
  {
    title: 'Supply Chain Management',
    description: 'Efficient inventory management and automated reordering based on consumption patterns.',
    icon: TruckIcon,
  },
  {
    title: 'Multi-role Access',
    description: 'Role-based dashboards for hospitals, pharmacies, vendors, and administrators.',
    icon: UserGroupIcon,
  },
  {
    title: 'Compliance & Reporting',
    description: 'Automated compliance reporting and audit trails for regulatory requirements.',
    icon: DocumentTextIcon,
  },
  {
    title: 'Smart Contracts',
    description: 'Automated execution of supply chain agreements and payment processing.',
    icon: CogIcon,
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Key Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform provides comprehensive tools for managing the entire drug supply chain 
            with transparency, security, and efficiency.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 