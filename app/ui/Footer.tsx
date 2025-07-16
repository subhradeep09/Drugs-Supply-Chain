import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#f8fafc] text-blue-900 py-12 mt-20 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-10">
        {/* Left: Logo, Brand, Description */}
        <div className="flex flex-col items-center md:items-start gap-4 md:w-1/2">
          <img src="/logo.png" alt="Logo" className="h-38 w-38 object-contain rounded-xl p-2 mb-2 opacity-100" />
          <p className="text-sm text-blue-500 max-w-xs text-center md:text-left">
            DrugChain is a blockchain-powered platform for secure, transparent, and efficient pharmaceutical supply chain management. Empowering healthcare with trust and technology.
          </p>
          <div className="flex space-x-3 mt-2">
            <FooterSocial icon="twitter" href="#" />
            <FooterSocial icon="linkedin" href="#" />
            <FooterSocial icon="github" href="#" />
          </div>
        </div>
        {/* Divider for desktop */}
        <div className="hidden md:block w-px bg-blue-100 mx-8 my-2" />
        {/* Right: Navigation and Secondary Links */}
        <div className="flex flex-col items-center md:items-end gap-6 md:w-1/2">
          <nav className="flex flex-col md:flex-row gap-3 md:gap-8 text-base font-medium">
            <FooterLink href="/" label="Home" />
            <FooterLink href="/about" label="About Us" />
            <FooterLink href="/features" label="Features" />
            <FooterLink href="/contact" label="Contact Us" />
          </nav>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-xs text-blue-400 mt-2">
            <Link href="#privacy" className="hover:text-blue-700 transition-colors">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-blue-700 transition-colors">Terms of Service</Link>
            <Link href="#support" className="hover:text-blue-700 transition-colors">Support</Link>
          </div>
          <div className="text-xs text-blue-300 mt-2">&copy; {new Date().getFullYear()} DrugChain. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="relative px-2 py-1 rounded transition-all duration-200 hover:text-blue-600 focus:text-blue-600 outline-none group"
    >
      <span className="transition-colors duration-200 group-hover:text-blue-700 group-focus:text-blue-700">
        {label}
      </span>
      <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-200 scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
    </Link>
  );
}

function FooterSocial({ icon, href }: { icon: 'twitter' | 'linkedin' | 'github'; href: string }) {
  const icons: Record<string, JSX.Element> = {
    twitter: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.92c-.8.36-1.67.6-2.58.71a4.48 4.48 0 0 0 1.97-2.48 8.94 8.94 0 0 1-2.83 1.08A4.48 4.48 0 0 0 11.1 9.7c0 .35.04.7.1 1.03C7.72 10.6 4.8 8.97 2.88 6.6c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.95 3.65-.72-.02-1.4-.22-1.99-.55v.06c0 2.13 1.52 3.9 3.54 4.3-.37.1-.76.16-1.16.16-.28 0-.55-.03-.82-.08.56 1.74 2.18 3 4.1 3.03A8.98 8.98 0 0 1 2 20.13a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.77 0-.2 0-.41-.02-.61.88-.64 1.65-1.44 2.26-2.35z" /></svg>
    ),
    linkedin: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" /></svg>
    ),
    github: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.11 2.51.32 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" /></svg>
    ),
  };
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-700 transition-colors p-2 rounded-full bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200">
      {icons[icon]}
    </a>
  );
} 