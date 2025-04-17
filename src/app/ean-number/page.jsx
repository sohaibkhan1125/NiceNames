'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const EANGenerator = () => {
  const [eanType, setEanType] = useState('ean13');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateEAN = () => {
    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);

    try {
      if (eanType === 'ean13') {
        // Generate EAN-13
        const prefix = '978'; // Most common prefix for books
        const registrationGroup = Math.floor(Math.random() * 10).toString();
        const registrant = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        const publication = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        // Calculate checksum
        let sum = 0;
        const eanWithoutChecksum = `${prefix}${registrationGroup}${registrant}${publication}`;
        for (let i = 0; i < 12; i++) {
          const weight = i % 2 === 0 ? 1 : 3;
          sum += parseInt(eanWithoutChecksum[i]) * weight;
        }
        const checksum = (10 - (sum % 10)) % 10;
        
        setResult(`${eanWithoutChecksum}${checksum}`);
      } else {
        // Generate EAN-8
        const prefix = Math.floor(Math.random() * 10).toString();
        const registrant = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const publication = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        
        // Calculate checksum
        let sum = 0;
        const eanWithoutChecksum = `${prefix}${registrant}${publication}`;
        for (let i = 0; i < 7; i++) {
          const weight = i % 2 === 0 ? 3 : 1;
          sum += parseInt(eanWithoutChecksum[i]) * weight;
        }
        const checksum = (10 - (sum % 10)) % 10;
        
        setResult(`${eanWithoutChecksum}${checksum}`);
      }
    } catch (err) {
      setError('Error generating EAN. Please try again.');
    }
  };

  const copyToClipboard = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result)
        .then(() => {
          setCopySuccess('Copied!');
          setTimeout(() => setCopySuccess(''), 2000);
        })
        .catch(() => {
          setCopySuccess('Failed to copy');
          setTimeout(() => setCopySuccess(''), 2000);
        });
    }
  };

  return (
    <div className="min-h-screen text-gray-800">
     
      
      <div className="bg-[#f5f7ff] rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(0,0,0,0.15)] transition-all duration-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Home Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">EAN Generator</h1>
            <p className="text-xl text-gray-600">
              Generate valid EAN-8 or EAN-13 numbers
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="flex gap-4">
                <button
                  onClick={() => setEanType('ean13')}
                  className={`px-4 py-2 cursor-pointer rounded-lg font-semibold transition-all duration-200 ${
                    eanType === 'ean13'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  EAN-13
                </button>
                <button
                  onClick={() => setEanType('ean8')}
                  className={`px-4 py-2 cursor-pointer rounded-lg font-semibold transition-all duration-200 ${
                    eanType === 'ean8'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  EAN-8
                </button>
              </div>
              <button
                onClick={generateEAN}
                className="bg-orange-500 cursor-pointer text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200"
              >
                Generate EAN
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {isClient && result !== null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Your EAN</h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-4xl font-mono font-bold text-gray-800 tracking-wider">
                    {result}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                    title="Copy to clipboard"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  </button>
                </div>
                {copySuccess && (
                  <div className="mt-2 text-green-600">{copySuccess}</div>
                )}
              </div>
            )}

            <div className="mt-8 text-sm text-gray-500">
              <p className="text-center">
                Note: This tool generates valid EAN numbers that follow the standard format.
                EAN-13 uses a 13-digit format, while EAN-8 uses an 8-digit format.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About EAN Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our EAN Generator is a specialized tool designed to create valid European Article Numbers (EANs). This utility is essential for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Retailers and manufacturers</li>
                <li>Product catalog management</li>
                <li>Inventory tracking systems</li>
                <li>Educational purposes in retail</li>
                <li>Testing point-of-sale systems</li>
              </ul>
              <p>
                The generator creates both EAN-8 and EAN-13 numbers that include proper checksums, ensuring compatibility with retail systems worldwide. These numbers follow the official EAN standard and can be used for product identification and tracking.
              </p>
              <p>
                Our tool uses a secure algorithm to generate valid EANs, making it suitable for both professional and educational purposes. Whether you're managing a retail inventory or developing a point-of-sale system, this generator provides a reliable solution for your EAN needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding EANs</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                EAN (European Article Number) is a barcode standard used worldwide for product identification. Understanding EANs and their structure is crucial for effective retail and inventory management.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Key Aspects of EANs</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Format:</strong> EAN-13 uses 13 digits, while EAN-8 uses 8 digits
                </li>
                <li>
                  <strong>Structure:</strong> Contains country code, manufacturer code, product code, and checksum
                </li>
                <li>
                  <strong>Usage:</strong> Essential for product identification and inventory tracking
                </li>
                <li>
                  <strong>Global Standard:</strong> Recognized internationally for product identification
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices for EAN Usage</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the appropriate EAN format for your products</li>
                <li>Ensure EANs are properly registered in international databases</li>
                <li>Include EANs in all product documentation and systems</li>
                <li>Verify EAN checksums before using them</li>
                <li>Keep track of EAN assignments for your products</li>
              </ul>

              <p className="mt-4">
                Understanding EANs and their proper usage is crucial for effective retail operations. Our EAN Generator provides a convenient way to create valid EANs while following international standards. Remember to use EANs responsibly and ensure they are properly registered for your products.
              </p>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default EANGenerator;
