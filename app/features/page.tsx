import { Features } from '@/app/sections/Features';
import React from 'react';
import { Navbar } from '@/app/ui/Navbar';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
        <Features />
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-primary mb-4 text-center">How DrugChain Makes a Difference</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-primary mb-2">For Hospitals & Pharmacies</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Instantly verify the authenticity of received drugs.</li>
                <li>Automated inventory updates and low-stock alerts.</li>
                <li>Easy compliance reporting and audit trails.</li>
                <li>Real-time order tracking and delivery confirmation.</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-primary mb-2">For Vendors & Manufacturers</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Streamlined order management and dispatch process.</li>
                <li>Smart contract automation for secure payments.</li>
                <li>Batch-level tracking and expiry management.</li>
                <li>Performance analytics and compliance tools.</li>
              </ul>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-card rounded-lg shadow text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-primary">Feature</th>
                  <th className="px-4 py-2 text-left text-primary">Traditional Supply Chain</th>
                  <th className="px-4 py-2 text-left text-primary">DrugChain</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="border-t px-4 py-2">Drug Authenticity</td>
                  <td className="border-t px-4 py-2">Manual, error-prone</td>
                  <td className="border-t px-4 py-2">Blockchain-verified, tamper-proof</td>
                </tr>
                <tr>
                  <td className="border-t px-4 py-2">Order Tracking</td>
                  <td className="border-t px-4 py-2">Limited, delayed updates</td>
                  <td className="border-t px-4 py-2">Real-time, transparent</td>
                </tr>
                <tr>
                  <td className="border-t px-4 py-2">Inventory Management</td>
                  <td className="border-t px-4 py-2">Manual, risk of stockouts</td>
                  <td className="border-t px-4 py-2">Automated, predictive alerts</td>
                </tr>
                <tr>
                  <td className="border-t px-4 py-2">Compliance</td>
                  <td className="border-t px-4 py-2">Paper-based, time-consuming</td>
                  <td className="border-t px-4 py-2">Automated, audit-ready</td>
                </tr>
                <tr>
                  <td className="border-t px-4 py-2">Security</td>
                  <td className="border-t px-4 py-2">Vulnerable to fraud</td>
                  <td className="border-t px-4 py-2">Blockchain-secured</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
} 