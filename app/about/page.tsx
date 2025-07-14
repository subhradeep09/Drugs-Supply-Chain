import React from 'react';
import { Navbar } from '@/app/ui/Navbar';

// Simple SVG vector illustrations for sections
const HeroVector = () => (
  <svg viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-2xl mx-auto mb-10">
    <ellipse cx="300" cy="100" rx="280" ry="80" fill="url(#paint0_linear)" fillOpacity="0.2" />
    <ellipse cx="300" cy="100" rx="200" ry="60" fill="url(#paint1_linear)" fillOpacity="0.3" />
    <g>
      <circle cx="120" cy="100" r="40" fill="#3b82f6" fillOpacity="0.15" />
      <circle cx="480" cy="100" r="40" fill="#6366f1" fillOpacity="0.15" />
      <rect x="270" y="60" width="60" height="80" rx="20" fill="#2563eb" fillOpacity="0.18" />
    </g>
    <defs>
      <linearGradient id="paint0_linear" x1="20" y1="100" x2="580" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3b82f6" />
        <stop offset="1" stopColor="#6366f1" />
      </linearGradient>
      <linearGradient id="paint1_linear" x1="100" y1="100" x2="500" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a5b4fc" />
        <stop offset="1" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
  </svg>
);

const SectionIcon = ({ color }: { color: string }) => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
    <circle cx="18" cy="18" r="18" fill={color} fillOpacity="0.15" />
    <circle cx="18" cy="18" r="10" fill={color} fillOpacity="0.4" />
  </svg>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-foreground">
      <Navbar />
      <main className="flex flex-col items-center justify-center py-24 px-4">
        <HeroVector />
        <div className="max-w-3xl w-full mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-center text-primary drop-shadow-lg">About Us</h1>
          <p className="text-xl text-muted-foreground mb-10 text-center leading-relaxed">
            DrugChain is a full-stack, blockchain-enabled platform for secure, transparent, and efficient management of pharmaceutical supply chains. Our mission is to ensure the integrity and safety of medicines from manufacturer to patient, leveraging modern technology for the public good.
          </p>
          <div className="bg-card rounded-2xl shadow-lg p-8 mb-10 flex flex-col md:flex-row items-center gap-6">
            <SectionIcon color="#2563eb" />
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-primary">Our Story</h2>
              <p className="text-base text-muted-foreground mb-2">
                Founded in 2023, DrugChain was born out of a vision to revolutionize the pharmaceutical supply chain in India. Our founders, a team of healthcare professionals and blockchain enthusiasts, witnessed firsthand the challenges of counterfeit drugs, supply inefficiencies, and lack of transparency. Determined to make a difference, they set out to build a platform that leverages blockchain technology to bring trust, security, and efficiency to every step of the drug supply process.
              </p>
              <p className="text-base text-muted-foreground">
                Today, DrugChain partners with government agencies, hospitals, pharmacies, and manufacturers to ensure that every medicine is tracked, verified, and delivered safely to those who need it most.
              </p>
            </div>
          </div>
          <div className="bg-card rounded-2xl shadow-lg p-8 mb-10 flex flex-col md:flex-row items-center gap-6">
            <SectionIcon color="#6366f1" />
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-primary">Our Vision & Values</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><span className="font-semibold text-primary">Transparency:</span> Every transaction is recorded and verifiable on the blockchain.</li>
                <li><span className="font-semibold text-primary">Security:</span> Patient safety and data integrity are at the core of our platform.</li>
                <li><span className="font-semibold text-primary">Innovation:</span> We embrace new technologies to solve real-world problems.</li>
                <li><span className="font-semibold text-primary">Collaboration:</span> We work with all stakeholders to build a better healthcare ecosystem.</li>
                <li><span className="font-semibold text-primary">Impact:</span> Our goal is to save lives by ensuring the right medicine reaches the right person at the right time.</li>
              </ul>
            </div>
          </div>
          <div className="bg-card rounded-2xl shadow-lg p-8">
            <SectionIcon color="#60a5fa" />
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-primary">Tech Stack</h2>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Frontend: Next.js, React, Tailwind CSS, Redux Toolkit</li>
                <li>Backend: Next.js API Routes, Mongoose (MongoDB)</li>
                <li>Blockchain: Solidity Smart Contracts, Ethers.js</li>
                <li>Authentication: NextAuth.js</li>
                <li>File Storage: Cloudinary</li>
                <li>Testing: Jest, React Testing Library</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 