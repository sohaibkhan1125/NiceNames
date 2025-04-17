'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setIsClient(true);
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const footerLinks = {
    tools: [
      { name: 'Number Generator', href: '/tools/number-generator' },
      { name: 'Float Numbers', href: '/tools/float-numbers' },
      { name: 'PIN Generator', href: '/tools/pin-generator' },
      { name: 'Custom Patterns', href: '/tools/custom-patterns' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    social: [
      { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
      { name: 'Whatsapp', href: 'https://wa.me/', icon: 'whatsapp' },
      { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
      { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    ],
  };

  const getSocialIcon = (icon) => {
    const baseClass = 'h-6 w-6 text-white hover:text-orange-300 transition duration-200';

    switch (icon) {
      case 'whatsapp':
        return (
         <img src="/whatsapp.png" className='h-6 w-6' alt="whatsapp" />
        );
      case 'twitter':
        return (
         <img src="/twitter.png" className='h-6 w-6' alt="twitter" />
        );
      case 'linkedin':
        return (
          <img src="/linkedin.png" className='h-6 w-6' alt="linkedin" />
        );
      case 'facebook':
        return (
          <img src="/facebook.png" className='h-6 w-6' alt="facebook" />
        );
      default:
        return null;
    }
  };

  return (
    <footer className="bg-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img className="w-8 h-8" src="/logo.png" alt="logo" />
              <h3 className="text-2xl font-bold">Tools4Freee</h3>
            </div>
            <p className="text-orange-100">
              Free online tools for developers and professionals.
            </p>
            <div className="mt-4 flex gap-4">
              {footerLinks.social.map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30"
                >
                  {getSocialIcon(icon)}
                </a>
              ))}
            </div>
          </div>
          {isClient && (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-orange-100 hover:text-white transition">Home</Link></li>
                  <li><Link href="/about" className="text-orange-100 hover:text-white transition">About</Link></li>
                  <li><Link href="/contact" className="text-orange-100 hover:text-white transition">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="/privacy-policy" className="text-orange-100 hover:text-white transition">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-orange-100 hover:text-white transition">Terms of Service</Link></li>
                  <li><Link href="/cookies" className="text-orange-100 hover:text-white transition">Cookie Policy</Link></li>
                  <li><Link href="/disclaimer" className="text-orange-100 hover:text-white transition">Disclaimer</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-orange-100">
                  <li>Email: asatechinfilimited@gmail.com</li>
                  <li>© {currentYear} Tools4Freee. All rights reserved.</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
