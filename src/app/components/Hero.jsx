'use client';

import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';

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

  const RotateIcon = () => (
    <div className="relative w-12 h-12 group">
      <Image
        src="/rotate.png"
        alt="Rotate icon"
        width={48}
        height={48}
        className="group-hover:animate-spin-slow"
      />
    </div>
  );

  return (
    <div className="bg-white text-gray-800">
      <style jsx global>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 1.5s linear infinite;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Free And Useful Online Data Generators
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            ToolsHub makes it possible to generate useful data with different tools. There are a total of 27 generators in different categories.
          </p>
        </div>

        {/* Number Tools Section */}
        <div ref={toolsSectionRef} className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">All About Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {numberTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="flex flex-col items-center p-4 hover:bg-orange-50 rounded-lg transition-colors group border border-gray-200 hover:border-orange-300"
              >
                <RotateIcon />
                <span className="mt-3 text-sm font-medium text-gray-700 text-center">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Address Tools Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Addresses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {addressTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="flex flex-col items-center p-4 hover:bg-orange-50 rounded-lg transition-colors group border border-gray-200 hover:border-orange-300"
              >
                <RotateIcon />
                <span className="mt-3 text-sm font-medium text-gray-700 text-center">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Developer Tools Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Developers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {developerTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="flex flex-col items-center p-4 hover:bg-orange-50 rounded-lg transition-colors group border border-gray-200 hover:border-orange-300"
              >
                <RotateIcon />
                <span className="mt-3 text-sm font-medium text-gray-700 text-center">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Date and Time Tools Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Date And Time</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {dateTimeTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="flex flex-col items-center p-4 hover:bg-orange-50 rounded-lg transition-colors group border border-gray-200 hover:border-orange-300"
              >
                <RotateIcon />
                <span className="mt-3 text-sm font-medium text-gray-700 text-center">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Hexadecimal Tools Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Hexadecimal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {hexadecimalTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="flex flex-col items-center p-4 hover:bg-orange-50 rounded-lg transition-colors group border border-gray-200 hover:border-orange-300"
              >
                <RotateIcon />
                <span className="mt-3 text-sm font-medium text-gray-700 text-center">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
