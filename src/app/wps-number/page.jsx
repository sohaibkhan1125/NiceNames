'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const WPSNumberGenerator = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateWPS = () => {
    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);

    // Generate a random 8-digit number
    const randomNum = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    
    // Calculate the checksum
    let checksum = 0;
    for (let i = 0; i < 7; i++) {
      checksum += parseInt(randomNum[i]) * (i + 1);
    }
    checksum = (10 - (checksum % 10)) % 10;
    
    // Combine the number with checksum
    const wpsPin = randomNum + checksum;
    setResult(wpsPin);
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
            <h1 className="text-4xl font-bold mb-4">WPS PIN Generator</h1>
            <p className="text-xl text-gray-600">
              Generate valid WPS PINs for Wi-Fi routers
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex justify-center mb-8">
              <button
                onClick={generateWPS}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200"
              >
                Generate WPS PIN
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {isClient && result !== null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Your WPS PIN</h2>
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
                Note: This tool generates valid WPS PINs that can be used for Wi-Fi Protected Setup.
                The PIN is 8 digits long with a checksum digit, making it compatible with most routers.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About WPS PIN Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our WPS PIN Generator is a specialized tool designed to create valid WPS (Wi-Fi Protected Setup) PINs for wireless routers. This utility is essential for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Setting up new wireless networks</li>
                <li>Connecting devices to existing networks</li>
                <li>Network troubleshooting and maintenance</li>
                <li>Educational purposes in networking</li>
                <li>Testing network security configurations</li>
              </ul>
              <p>
                The generator creates 8-digit PINs that include a checksum digit, ensuring compatibility with most modern routers. These PINs follow the WPS standard and can be used to quickly connect devices to your wireless network without manually entering long passwords.
              </p>
              <p>
                Our tool uses a secure algorithm to generate valid WPS PINs, making it suitable for both home and professional network setup. Whether you're setting up a new router or connecting a device to an existing network, this generator provides a reliable solution for your WPS needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding WPS PINs</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                WPS (Wi-Fi Protected Setup) is a network security standard that allows users to easily connect devices to a wireless network. Understanding WPS and its PIN system is crucial for secure network setup and management.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Key Aspects of WPS PINs</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Format:</strong> WPS PINs are 8 digits long, with the last digit being a checksum
                </li>
                <li>
                  <strong>Security:</strong> While convenient, WPS PINs should be used with caution as they can be vulnerable to brute-force attacks
                </li>
                <li>
                  <strong>Compatibility:</strong> Most modern routers support WPS, but some manufacturers have disabled it by default for security reasons
                </li>
                <li>
                  <strong>Usage:</strong> WPS PINs are typically used for one-time setup of devices and should be changed or disabled after use
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices for WPS</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use WPS only for initial device setup</li>
                <li>Disable WPS after completing the setup process</li>
                <li>Regularly change your WPS PIN if you need to keep it enabled</li>
                <li>Use WPS in combination with other security measures like WPA2/WPA3</li>
                <li>Keep your router's firmware updated to ensure the latest security patches</li>
              </ul>

              <p className="mt-4">
                Understanding WPS and its security implications is crucial for maintaining a secure wireless network. Our WPS PIN Generator provides a convenient way to create valid PINs while following best security practices. Remember to use WPS responsibly and always prioritize network security.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WPSNumberGenerator;
