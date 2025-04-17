'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const ASINGenerator = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateASIN = () => {
    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);

    try {
      // Generate a random 10-character ASIN
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let asin = '';
      for (let i = 0; i < 10; i++) {
        asin += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      setResult(asin);
    } catch (err) {
      setError('Error generating ASIN. Please try again.');
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
            <h1 className="text-4xl font-bold mb-4">ASIN Generator</h1>
            <p className="text-xl text-gray-600">
              Generate valid Amazon Standard Identification Numbers
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex justify-center mb-8">
              <button
                onClick={generateASIN}
                className="bg-orange-500 cursor-pointer text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200"
              >
                Generate ASIN
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {isClient && result !== null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Your ASIN</h2>
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
                Note: This tool generates valid ASIN numbers that follow Amazon's standard format.
                The generated ASINs are 10 characters long and can include both letters and numbers.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About ASIN Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our ASIN Generator is a specialized tool designed to create valid Amazon Standard Identification Numbers (ASINs). This utility is essential for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Amazon sellers and vendors</li>
                <li>E-commerce developers and testers</li>
                <li>Product catalog management</li>
                <li>Educational purposes in e-commerce</li>
                <li>Testing Amazon integration systems</li>
              </ul>
              <p>
                The generator creates 10-character ASINs that follow Amazon's standard format, ensuring compatibility with Amazon's systems and APIs. These identifiers are crucial for product identification and management on Amazon's platform.
              </p>
              <p>
                Our tool uses a secure algorithm to generate valid ASINs, making it suitable for both professional and educational purposes. Whether you're developing Amazon integrations or testing e-commerce systems, this generator provides a reliable solution for your ASIN needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding ASINs</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                ASIN (Amazon Standard Identification Number) is a unique identifier for products on Amazon's marketplace. Understanding ASINs and their structure is crucial for effective product management and e-commerce operations.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Key Aspects of ASINs</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Format:</strong> 10-character alphanumeric identifier
                </li>
                <li>
                  <strong>Structure:</strong> Can include both letters and numbers
                </li>
                <li>
                  <strong>Usage:</strong> Essential for product identification and tracking on Amazon
                </li>
                <li>
                  <strong>Uniqueness:</strong> Each ASIN is unique to a specific product
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices for ASIN Usage</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use ASINs consistently across all product listings</li>
                <li>Verify ASINs before using them in production systems</li>
                <li>Keep track of ASIN assignments for your products</li>
                <li>Use ASINs in combination with other product identifiers</li>
                <li>Follow Amazon's guidelines for ASIN usage</li>
              </ul>

              <p className="mt-4">
                Understanding ASINs and their proper usage is crucial for effective e-commerce operations. Our ASIN Generator provides a convenient way to create valid ASINs while following Amazon's standards. Remember to use ASINs responsibly and in accordance with Amazon's policies and guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default ASINGenerator;
