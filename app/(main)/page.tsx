'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, ShieldCheckIcon, TruckIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const stats = [
  { label: 'Active Users', value: '10,000+' },
  { label: 'Drugs Tracked', value: '1M+' },
  { label: 'Transactions', value: '5M+' },
  { label: 'Countries', value: '50+' },
]

const features = [
  {
    title: 'Blockchain Security',
    description: 'End-to-end encryption and blockchain technology ensure authenticity.',
    icon: ShieldCheckIcon,
    image: '/images/blockchain-security.jpg',
  },
  {
    title: 'Real-time Tracking',
    description: 'Monitor shipments in real-time with advanced tracking system.',
    icon: TruckIcon,
    image: '/images/real-time-tracking.jpg',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Comprehensive analytics for data-driven decisions.',
    icon: ChartBarIcon,
    image: '/images/analytics-dashboard.jpg',
  },
]

const testimonials = [
  {
    content: "DrugChain has revolutionized our supply chain management. The transparency and security features are unmatched.",
    author: "Dr. Sarah Johnson",
    role: "Hospital Administrator",
    image: "/images/testimonial-1.jpg",
  },
  {
    content: "The real-time tracking system has significantly reduced our inventory losses and improved efficiency.",
    author: "Michael Chen",
    role: "Pharmacy Manager",
    image: "/images/testimonial-2.jpg",
  },
  {
    content: "As a manufacturer, we've seen a dramatic improvement in our distribution network's reliability.",
    author: "Rajesh Patel",
    role: "Pharmaceutical Manufacturer",
    image: "/images/testimonial-3.jpg",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary/5 via-transparent to-background" />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl gradient-text">
                  Revolutionizing Pharmaceutical Supply Chain
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Secure, transparent, and efficient management of pharmaceutical supply chains
                  using blockchain technology. Join the future of healthcare logistics.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link href="/register" className="btn-primary">
                    Get started
                  </Link>
                  <Link href="/about" className="text-sm font-semibold leading-6 group hover:text-primary transition-colors">
                    Learn more <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl gradient-border shadow-soft">
                  <Image
                    src="/images/hero-image.jpg"
                    alt="Pharmaceutical supply chain"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="card-hover flex flex-col items-center rounded-2xl bg-card p-8 shadow-soft ring-1 ring-border"
              >
                <dt className="text-base font-semibold leading-7 text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-3xl font-bold tracking-tight gradient-text">
                  {stat.value}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
            Everything you need to manage your supply chain
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card-hover group relative flex flex-col rounded-2xl bg-card shadow-soft ring-1 ring-border">
              <div className="flex flex-1 flex-col p-8">
                <div className="mb-4 rounded-xl bg-primary/10 p-3 w-fit">
                  <ShieldCheckIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold leading-8">Blockchain Security</h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  End-to-end encryption and blockchain technology ensure authenticity and prevent counterfeiting.
                </p>
                <div className="mt-6">
                  <Link
                    href="/features"
                    className="inline-flex items-center text-sm font-semibold text-primary group/link hover:text-primary/80 transition-colors"
                  >
                    Learn more
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="card-hover group relative flex flex-col rounded-2xl bg-card shadow-soft ring-1 ring-border">
              <div className="flex flex-1 flex-col p-8">
                <div className="mb-4 rounded-xl bg-primary/10 p-3 w-fit">
                  <TruckIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold leading-8">Real-time Tracking</h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  Monitor shipments in real-time with our advanced tracking system and GPS integration.
                </p>
                <div className="mt-6">
                  <Link
                    href="/features"
                    className="inline-flex items-center text-sm font-semibold text-primary group/link hover:text-primary/80 transition-colors"
                  >
                    Learn more
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="card-hover group relative flex flex-col rounded-2xl bg-card shadow-soft ring-1 ring-border">
              <div className="flex flex-1 flex-col p-8">
                <div className="mb-4 rounded-xl bg-primary/10 p-3 w-fit">
                  <ChartBarIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold leading-8">Analytics Dashboard</h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  Make data-driven decisions with our comprehensive analytics and reporting tools.
                </p>
                <div className="mt-6">
                  <Link
                    href="/features"
                    className="inline-flex items-center text-sm font-semibold text-primary group/link hover:text-primary/80 transition-colors"
                  >
                    Learn more
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
            Trusted by healthcare professionals worldwide
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div className="card-hover flex flex-col rounded-2xl bg-card p-8 shadow-soft ring-1 ring-border">
            <div className="flex items-center gap-x-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-primary/10">
                <div className="absolute inset-0 flex items-center justify-center text-primary">
                  <span className="text-lg font-semibold">SJ</span>
                </div>
              </div>
              <div>
                <div className="font-semibold">Dr. Sarah Johnson</div>
                <div className="text-sm text-muted-foreground">Hospital Administrator</div>
              </div>
            </div>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              "DrugChain has revolutionized our supply chain management. The transparency and security features are unmatched."
            </p>
          </div>

          <div className="card-hover flex flex-col rounded-2xl bg-card p-8 shadow-soft ring-1 ring-border">
            <div className="flex items-center gap-x-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-primary/10">
                <div className="absolute inset-0 flex items-center justify-center text-primary">
                  <span className="text-lg font-semibold">MC</span>
                </div>
              </div>
              <div>
                <div className="font-semibold">Michael Chen</div>
                <div className="text-sm text-muted-foreground">Pharmacy Manager</div>
              </div>
            </div>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              "The real-time tracking system has significantly reduced our inventory losses and improved efficiency."
            </p>
          </div>

          <div className="card-hover flex flex-col rounded-2xl bg-card p-8 shadow-soft ring-1 ring-border">
            <div className="flex items-center gap-x-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-primary/10">
                <div className="absolute inset-0 flex items-center justify-center text-primary">
                  <span className="text-lg font-semibold">RP</span>
                </div>
              </div>
              <div>
                <div className="font-semibold">Rajesh Patel</div>
                <div className="text-sm text-muted-foreground">Pharmaceutical Manufacturer</div>
              </div>
            </div>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              "As a manufacturer, we've seen a dramatic improvement in our distribution network's reliability."
            </p>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
            Ready to transform your supply chain?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Join the growing network of healthcare providers using DrugChain to revolutionize
            their operations.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/register" className="btn-primary">
              Get started
            </Link>
            <Link href="/contact" className="text-sm font-semibold leading-6 group hover:text-primary transition-colors">
              Contact sales <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
} 