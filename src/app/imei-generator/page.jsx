'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const IMEIGenerator = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateIMEI = () => {
    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);

    try {
      // Generate first 14 digits
      let imei = '';
      for (let i = 0; i < 14; i++) {
        imei += Math.floor(Math.random() * 10);
      }

      // Calculate Luhn checksum
      let sum = 0;
      for (let i = 0; i < 14; i++) {
        let digit = parseInt(imei[i]);
        if (i % 2 === 0) {
          digit *= 2;
          if (digit > 9) {
            digit = (digit % 10) + Math.floor(digit / 10);
          }
        }
        sum += digit;
      }
      const checksum = (10 - (sum % 10)) % 10;
      
      // Add checksum to complete IMEI
      const finalIMEI = imei + checksum;
      setResult(finalIMEI);
    } catch (err) {
      setError('Error generating IMEI. Please try again.');
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
      <Navbar />
      
      <div className="py-12">
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
            <h1 className="text-4xl font-bold mb-4">IMEI Generator</h1>
            <p className="text-xl text-gray-600">
              Generate valid IMEI numbers for mobile devices
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex justify-center mb-8">
              <button
                onClick={generateIMEI}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200"
              >
                Generate IMEI
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {isClient && result !== null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Your IMEI</h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-4xl font-mono font-bold text-gray-800 tracking-wider">
                    {result}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
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
                Note: This tool generates valid IMEI numbers that follow the standard format.
                The generated IMEIs are 15 digits long and include a valid Luhn checksum.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About IMEI Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our IMEI Generator is a specialized tool designed to create valid International Mobile Equipment Identity (IMEI) numbers. This utility is essential for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mobile device manufacturers and developers</li>
                <li>Telecommunications companies</li>
                <li>Device testing and quality assurance</li>
                <li>Educational purposes in mobile technology</li>
                <li>Testing mobile device management systems</li>
              </ul>
              <p>
                The generator creates 15-digit IMEI numbers that include proper Luhn checksums, ensuring compatibility with mobile networks and device management systems. These numbers follow the official IMEI standard and can be used for device identification and tracking.
              </p>
              <p>
                Our tool uses a secure algorithm to generate valid IMEIs, making it suitable for both professional and educational purposes. Whether you're developing mobile devices or testing network systems, this generator provides a reliable solution for your IMEI needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding IMEIs</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                IMEI (International Mobile Equipment Identity) is a unique identifier for mobile devices. Understanding IMEIs and their structure is crucial for proper device identification and network management.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Key Aspects of IMEIs</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Format:</strong> 15-digit number with a Luhn checksum
                </li>
                <li>
                  <strong>Structure:</strong> Contains Type Allocation Code (TAC), Serial Number, and Checksum
                </li>
                <li>
                  <strong>Usage:</strong> Essential for device identification, network access, and theft prevention
                </li>
                <li>
                  <strong>Global Standard:</strong> Recognized internationally for mobile device identification
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices for IMEI Usage</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use IMEIs only for legitimate purposes</li>
                <li>Keep IMEI records secure and confidential</li>
                <li>Verify IMEIs before using them in production systems</li>
                <li>Follow local regulations regarding IMEI usage</li>
                <li>Report lost or stolen devices with their IMEIs</li>
              </ul>

              <p className="mt-4">
                Understanding IMEIs and their proper usage is crucial for effective mobile device management. Our IMEI Generator provides a convenient way to create valid IMEIs while following international standards. Remember to use IMEIs responsibly and in accordance with applicable laws and regulations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default IMEIGenerator;
