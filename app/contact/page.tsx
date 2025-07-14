import React from 'react';
import { Navbar } from '@/app/ui/Navbar';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex flex-col items-center justify-center py-24 px-4">
        <div className="max-w-xl w-full mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-primary">Contact Us</h1>
          <p className="text-lg text-muted-foreground mb-8 text-center">
            Have questions or need support? Fill out the form below or reach us directly at <a href="mailto:support@yourdomain.com" className="text-primary underline">support@yourdomain.com</a>.
          </p>
          <form className="bg-card rounded-lg shadow p-6 space-y-4 mb-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1 text-primary">Name</label>
              <input type="text" id="name" name="name" className="input" placeholder="Your Name" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-primary">Email</label>
              <input type="email" id="email" name="email" className="input" placeholder="you@example.com" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1 text-primary">Message</label>
              <textarea id="message" name="message" className="textarea" placeholder="How can we help you?" required />
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold hover:bg-primary/90 transition-colors">Send Message</button>
          </form>
          <div className="bg-card rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-primary">Support & Office</h2>
            <p className="text-muted-foreground mb-2">Email: <a href="mailto:support@yourdomain.com" className="text-primary underline">support@yourdomain.com</a></p>
            <p className="text-muted-foreground mb-2">Phone: <a href="tel:+911234567890" className="text-primary underline">+91 12345 67890</a></p>
            <p className="text-muted-foreground">Address: 2nd Floor, HealthTech Tower, Connaught Place, New Delhi, 110001, India</p>
          </div>
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-2 text-primary">Frequently Asked Questions</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><span className="font-semibold text-primary">How do I track my order?</span> Log in to your dashboard and navigate to the 'Track Orders' section for real-time updates.</li>
              <li><span className="font-semibold text-primary">Who can use DrugChain?</span> Our platform is designed for government agencies, hospitals, pharmacies, and vendors involved in the pharmaceutical supply chain.</li>
              <li><span className="font-semibold text-primary">How secure is my data?</span> All data is encrypted and secured using blockchain technology and industry best practices.</li>
              <li><span className="font-semibold text-primary">How do I become a partner?</span> Contact us via the form above or email us at <a href="mailto:support@yourdomain.com" className="text-primary underline">support@yourdomain.com</a> for partnership inquiries.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
} 