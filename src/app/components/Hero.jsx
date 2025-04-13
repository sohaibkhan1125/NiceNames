'use client';

import Link from 'next/link';
import { useRef } from 'react';

const Hero = () => {
  const toolsSectionRef = useRef(null);

  const scrollToTools = () => {
    toolsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const numberTools = [
    { name: 'Number Generator', icon: '🔢', description: 'Generate random numbers with custom ranges', href: '/number-generator' },
    { name: 'Float Numbers', icon: '📊', description: 'Create floating-point numbers with precision', href: '/float-number' },
    { name: 'PIN Generator', icon: '🔐', description: 'Generate secure PIN codes for various purposes', href: '/pin-number' },
    { name: 'Length Numbers', icon: '📏', description: 'Generate numbers with specific length', href: '/length-number' },
    { name: 'Prime Numbers', icon: '🔢', description: 'Generate random prime numbers in a range', href: '/prime-number' },
    { name: 'WPS PIN', icon: '📶', description: 'Generate valid WPS PINs for Wi-Fi routers', href: '/wps-number' },
    { name: 'ISBN Generator', icon: '📚', description: 'Generate valid ISBN-13 numbers for books', href: '/isbn-generator' },
    { name: 'IMEI Generator', icon: '📱', description: 'Generate valid IMEI numbers for mobile devices', href: '/imei-generator' },
    { name: 'ASIN Generator', icon: '🛒', description: 'Generate valid ASIN numbers for Amazon products', href: '/asin-number' },
    { name: 'EAN Generator', icon: '🏷️', description: 'Generate valid EAN-13 numbers for products', href: '/ean-number' },
  ];

  const addressTools = [
    { name: 'Address Generator', icon: '🏠', description: 'Generate random addresses with customizable components', href: '/address-generator' },
    { name: 'City Address', icon: '🌆', description: 'Generate random city addresses with street details', href: '/city-address' },
    { name: 'IP Address', icon: '🌐', description: 'Generate random IP addresses (public, private, localhost)', href: '/ip-address' },
    { name: 'Coin Address', icon: '💰', description: 'Generate random cryptocurrency addresses for different coins', href: '/coin-address' },
    { name: 'MAC Address', icon: '🔌', description: 'Generate random MAC addresses with customizable format', href: '/mac-address' },
    { name: 'MAC Vendor', icon: '🏢', description: 'Look up vendor information for MAC addresses', href: '/mac-address-vendor' },
  ];

  const developerTools = [
    { name: 'Password Generator', icon: '🔑', description: 'Generate secure passwords with customizable options', href: '/password-generator' },
    { name: 'Base64 String', icon: '📝', description: 'Encode and decode strings using Base64 encoding', href: '/base64-string' },
    { name: 'htpasswd Generator', icon: '🔒', description: 'Generate Apache htpasswd entries for basic authentication', href: '/htpassword-generator' },
    { name: 'Bytes String', icon: '🔠', description: 'Convert between text and bytes with different encodings', href: '/bytes-string' },
    { name: 'UUID Generator', icon: '🆔', description: 'Generate UUIDs in different versions (v1, v4, v5)', href: '/uuid-generator' },
    { name: 'Hash String', icon: '🔏', description: 'Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512)', href: '/hash-string' },
  ];

  const dateTimeTools = [
    { name: 'Date Generator', icon: '📅', description: 'Generate random dates with customizable formats', href: '/date-generator' },
    { name: 'Time Generator', icon: '⏰', description: 'Generate random times with customizable formats', href: '/time-generator' },
    { name: 'Date and Time Generator', icon: '📅⏰', description: 'Generate random dates and times with customizable formats', href: '/date-and-time-generator' },
  ];

  const hexadecimalTools = [
    { name: 'Hexadecimal String', icon: '🔢', description: 'Convert between text and hexadecimal strings', href: '/hexadecimal-string' },
    { name: 'Secret Key Generator', icon: '🔐', description: 'Generate cryptographically secure 64-byte secret keys', href: '/secret-key-64-bytes' },
  ];

  return (
    <div className="bg-[#603F83] text-[#C7D3D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Professional Generation Tools
          </h1>
          <p className="text-xl sm:text-2xl mb-12 max-w-3xl mx-auto">
            Generate various types of data for your needs - from numbers to addresses and more.
          </p>
          <div className="flex justify-center gap-4 mb-16">
            <button
              onClick={scrollToTools}
              className="bg-[#C7D3D4] cursor-pointer text-[#603F83] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
            >
              Explore Tools
            </button>
            <Link
              href="/about"
              className="border-2 cursor-pointer border-[#C7D3D4] text-[#C7D3D4] px-8 py-3 rounded-lg font-semibold hover:bg-[#C7D3D4] hover:text-[#603F83] transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Number Tools Grid */}
        <div ref={toolsSectionRef} className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Number Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {numberTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-[#C7D3D4]/20 hover:border-[#C7D3D4]/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-[#C7D3D4]/80">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Address Tools Grid */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Address Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {addressTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-[#C7D3D4]/20 hover:border-[#C7D3D4]/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-[#C7D3D4]/80">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Developer Tools Grid */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Developer Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developerTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-[#C7D3D4]/20 hover:border-[#C7D3D4]/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-[#C7D3D4]/80">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Date and Time Tools Grid */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Date and Time Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dateTimeTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-[#C7D3D4]/20 hover:border-[#C7D3D4]/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-[#C7D3D4]/80">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Hexadecimal Tools Grid */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Hexadecimal Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hexadecimalTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-[#C7D3D4]/20 hover:border-[#C7D3D4]/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-[#C7D3D4]/80">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">100%</div>
            <div className="text-[#C7D3D4]/80">Secure Generation</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-[#C7D3D4]/80">Available</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">1000+</div>
            <div className="text-[#C7D3D4]/80">Daily Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">27+</div>
            <div className="text-[#C7D3D4]/80">Tools Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
