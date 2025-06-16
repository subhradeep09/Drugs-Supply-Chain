'use client'

import Link from 'next/link'
import {
  ShieldCheckIcon,
  TruckIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Blockchain Security',
    description: 'End-to-end encryption and blockchain technology ensure the authenticity and traceability of every drug in the supply chain.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Real-time Tracking',
    description: 'Monitor shipments in real-time with our advanced tracking system, ensuring timely delivery and reducing losses.',
    icon: TruckIcon,
  },
  {
    name: 'Analytics Dashboard',
    description: 'Comprehensive analytics and reporting tools to optimize your supply chain operations and make data-driven decisions.',
    icon: ChartBarIcon,
  },
  {
    name: 'Quality Assurance',
    description: 'Automated quality checks and compliance monitoring to maintain the highest standards in pharmaceutical distribution.',
    icon: DocumentCheckIcon,
  },
  {
    name: 'Hospital Integration',
    description: 'Seamless integration with hospital management systems for efficient inventory and order management.',
    icon: BuildingOfficeIcon,
  },
  {
    name: 'Pharmacy Solutions',
    description: 'Specialized tools for pharmacies to manage inventory, track orders, and maintain regulatory compliance.',
    icon: BuildingStorefrontIcon,
  },
  {
    name: 'Multi-stakeholder Platform',
    description: 'Connect with manufacturers, hospitals, pharmacies, and regulatory bodies in a single, secure platform.',
    icon: UserGroupIcon,
  },
  {
    name: 'Global Reach',
    description: 'Expand your operations globally with our international network of verified partners and suppliers.',
    icon: GlobeAltIcon,
  },
]

export default function FeaturesPage() {
  return (
    <>
      {/* Hero section */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Platform Features
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Discover how our comprehensive suite of features can transform your
              pharmaceutical supply chain operations and drive efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful features for every stakeholder
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="flex flex-col rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border transition-all hover:shadow-md"
              >
                <feature.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold leading-8">{feature.name}</h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to transform your supply chain?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Join the growing network of healthcare providers using DrugChain.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/register"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Get started
            </Link>
            <Link href="/contact" className="text-sm font-semibold leading-6 group">
              Contact sales <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
} 