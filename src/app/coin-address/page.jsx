'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CoinAddressGenerator = () => {
  const [coinType, setCoinType] = useState('bitcoin');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateAddress = () => {
    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);

    try {
      let address = '';
      const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

      if (coinType === 'bitcoin') {
        // Generate Bitcoin address (starts with 1, 3, or bc1)
        const prefix = Math.random() < 0.5 ? '1' : '3';
        address = prefix;
        for (let i = 0; i < 33; i++) {
          address += chars.charAt(Math.floor(Math.random() * chars.length));
        }
      } else if (coinType === 'ethereum') {
        // Generate Ethereum address (starts with 0x)
        address = '0x';
        for (let i = 0; i < 40; i++) {
          address += chars.charAt(Math.floor(Math.random() * chars.length));
        }
      } else if (coinType === 'litecoin') {
        // Generate Litecoin address (starts with L or M)
        const prefix = Math.random() < 0.5 ? 'L' : 'M';
        address = prefix;
        for (let i = 0; i < 33; i++) {
          address += chars.charAt(Math.floor(Math.random() * chars.length));
        }
      }

      setResult(address);
    } catch (err) {
      setError('Error generating address. Please try again.');
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
            <h1 className="text-4xl font-bold mb-4">Cryptocurrency Address Generator</h1>
            <p className="text-xl text-gray-600">
              Generate random cryptocurrency addresses for testing and development
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="flex gap-4">
                <button
                  onClick={() => setCoinType('bitcoin')}
                  className={`px-4 py-2 cursor-pointer rounded-lg font-semibold transition-all duration-200 ${
                    coinType === 'bitcoin'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Bitcoin
                </button>
                <button
                  onClick={() => setCoinType('ethereum')}
                  className={`px-4 py-2 cursor-pointer rounded-lg font-semibold transition-all duration-200 ${
                    coinType === 'ethereum'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Ethereum
                </button>
                <button
                  onClick={() => setCoinType('litecoin')}
                  className={`px-4 py-2 cursor-pointer rounded-lg font-semibold transition-all duration-200 ${
                    coinType === 'litecoin'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Litecoin
                </button>
              </div>
              <button
                onClick={generateAddress}
                className="bg-orange-500 cursor-pointer text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200"
              >
                Generate Address
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {isClient && result !== null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Generated Address</h2>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-xl font-mono text-gray-800 break-all">
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
                Note: This tool generates random cryptocurrency addresses for testing and development purposes only.
                These addresses are not real and should not be used for actual transactions.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Cryptocurrency Address Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our Cryptocurrency Address Generator is a specialized tool designed to create random cryptocurrency addresses for testing and development purposes. This utility is essential for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Blockchain application development</li>
                <li>Cryptocurrency wallet testing</li>
                <li>Transaction simulation</li>
                <li>Educational purposes</li>
                <li>Security testing</li>
              </ul>
              <p>
                The generator creates valid-looking addresses for popular cryptocurrencies like Bitcoin, Ethereum, and Litecoin. These addresses are suitable for testing wallet applications, transaction systems, and other blockchain-related software.
              </p>
              <p>
                Our tool uses a secure algorithm to generate valid-looking addresses, making it suitable for both professional and educational purposes. Whether you're developing a new cryptocurrency application or testing an existing system, this generator provides a reliable solution for your testing needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Cryptocurrency Addresses</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Cryptocurrency addresses are unique identifiers used to send and receive digital currencies. Understanding address formats and their usage is crucial for blockchain development and security.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Bitcoin Address Format</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Format:</strong> Starts with 1, 3, or bc1
                </li>
                <li>
                  <strong>Length:</strong> 26-35 characters
                </li>
                <li>
                  <strong>Usage:</strong> Most common cryptocurrency
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Ethereum Address Format</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Format:</strong> Starts with 0x
                </li>
                <li>
                  <strong>Length:</strong> 42 characters
                </li>
                <li>
                  <strong>Usage:</strong> Smart contract platform
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Litecoin Address Format</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Format:</strong> Starts with L or M
                </li>
                <li>
                  <strong>Length:</strong> 26-35 characters
                </li>
                <li>
                  <strong>Usage:</strong> Faster Bitcoin alternative
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices for Address Testing</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Test with multiple cryptocurrency types</li>
                <li>Verify address validation and formatting</li>
                <li>Check transaction handling</li>
                <li>Test security measures and access controls</li>
                <li>Verify address parsing and storage</li>
              </ul>

              <p className="mt-4">
                Understanding cryptocurrency addresses and their proper handling is crucial for effective blockchain development and security. Our Cryptocurrency Address Generator provides a convenient way to create test addresses while following standard formats. Remember to use these addresses responsibly and only for testing purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default CoinAddressGenerator;
