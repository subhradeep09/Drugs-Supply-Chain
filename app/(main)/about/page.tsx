'use client'

import {
  BuildingOfficeIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Secure Supply Chain',
    description: 'Our blockchain-based platform ensures the authenticity and traceability of every drug in the supply chain.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Global Network',
    description: 'Connect with trusted manufacturers, hospitals, and pharmacies across the globe.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Healthcare Focus',
    description: 'Dedicated to improving healthcare delivery through efficient drug supply chain management.',
    icon: HeartIcon,
  },
  {
    name: 'Enterprise Solutions',
    description: 'Comprehensive solutions for hospitals, pharmacies, and manufacturers to streamline operations.',
    icon: BuildingOfficeIcon,
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero section */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              About DrugChain
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We are revolutionizing the pharmaceutical supply chain through blockchain technology,
              ensuring safe, secure, and efficient delivery of medications to those who need them most.
            </p>
          </div>
        </div>
      </div>

      {/* Mission section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Mission</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            At DrugChain, we are committed to transforming the pharmaceutical supply chain
            through innovative technology. Our mission is to ensure that every medication
            reaches its intended destination safely, efficiently, and transparently.
          </p>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to manage your pharmaceutical supply chain
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
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

      {/* Team section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 sm:pb-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Our Team</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Meet the people behind DrugChain
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our team combines expertise in healthcare, technology, and supply chain management
            to deliver innovative solutions for the pharmaceutical industry.
          </p>
        </div>
      </div>
    </>
  )
} 