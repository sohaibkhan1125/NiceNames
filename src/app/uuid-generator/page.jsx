'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UUIDGenerator = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = () => {
      try {
        // Check if crypto API is available
        if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
          setIsClient(true);
          setIsInitialized(true);
        } else {
          setError('Your browser does not support secure random number generation. Please use a modern browser.');
        }
      } catch (err) {
        setError('Error initializing secure random number generation. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const generateRandomBytes = (count) => {
    if (!isClient) return new Uint8Array(count);
    
    try {
      const bytes = new Uint8Array(count);
      window.crypto.getRandomValues(bytes);
      return bytes;
    } catch (err) {
      setError('Error generating random bytes. Please try again.');
      return new Uint8Array(count);
    }
  };

  const generateUUID = () => {
    if (!isClient) return;

    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);
    setIsGenerating(true);

    try {
      const bytes = generateRandomBytes(16);
      
      // Set version (4) and variant (8, 9, A, or B)
      bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
      bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant 10xx

      // Convert to UUID string format
      const uuid = Array.from(bytes)
        .map((b, i) => {
          if (i === 4 || i === 6 || i === 8 || i === 10) {
            return '-' + b.toString(16).padStart(2, '0');
          }
          return b.toString(16).padStart(2, '0');
        })
        .join('');

      setResult(uuid);
    } catch (err) {
      setError(err.message || 'Error generating UUID. Please try again.');
    } finally {
      setIsGenerating(false);
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

  if (isLoading) {
    return (
      <div className="min-h-screen text-gray-800">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Initializing secure generator...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold mb-4">UUID Generator</h1>
            <p className="text-xl text-gray-600">
              Generate secure UUIDs (Universally Unique Identifiers) for your applications
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="space-y-6">
              <button
                onClick={generateUUID}
                disabled={!isInitialized || isGenerating}
                className={`w-full bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  !isInitialized || isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate UUID'}
              </button>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {isInitialized && result !== null && (
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Generated UUID</h2>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-xl font-mono text-gray-800 break-all">
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
                Note: This tool generates secure UUIDs using cryptographically secure random number generation.
                The generated UUIDs are not stored or transmitted anywhere.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About UUID Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our UUID Generator is a specialized tool designed to create secure UUIDs (Universally Unique Identifiers) for your applications. This utility is essential for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Generating unique identifiers for database records</li>
                <li>Creating unique session tokens</li>
                <li>Generating unique file names</li>
                <li>Creating unique API keys</li>
                <li>Educational purposes</li>
              </ul>
              <p>
                The generator uses cryptographically secure random number generation to create truly unique UUIDs, making them suitable for various applications.
              </p>
              <p>
                Our tool provides a simple interface to create secure UUIDs while ensuring maximum uniqueness. Whether you're developing a new application or testing an existing system, this generator provides a reliable solution for your unique identifier needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding UUIDs</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                UUIDs (Universally Unique Identifiers) are 128-bit identifiers that are unique across time and space. Understanding UUIDs and their applications is crucial for modern software development.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Common Uses of UUIDs</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Database Records:</strong> Unique primary keys for database entries
                </li>
                <li>
                  <strong>Session Management:</strong> Unique session identifiers
                </li>
                <li>
                  <strong>File Systems:</strong> Unique file names and identifiers
                </li>
                <li>
                  <strong>API Keys:</strong> Unique API access tokens
                </li>
                <li>
                  <strong>Distributed Systems:</strong> Unique identifiers across multiple systems
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">UUID Versions</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Version 1: Time-based UUID</li>
                <li>Version 2: DCE security UUID</li>
                <li>Version 3: MD5 hash-based UUID</li>
                <li>Version 4: Random UUID (most common)</li>
                <li>Version 5: SHA-1 hash-based UUID</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use appropriate UUID version for your use case</li>
                <li>Store UUIDs efficiently in databases</li>
                <li>Consider performance implications</li>
                <li>Handle UUIDs consistently across systems</li>
                <li>Document UUID usage and requirements</li>
              </ul>

              <p className="mt-4">
                Understanding UUIDs and their proper implementation is crucial for effective software development. Our UUID Generator provides a convenient way to create test UUIDs while following best practices. Remember to use these UUIDs responsibly and only for legitimate purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UUIDGenerator;
