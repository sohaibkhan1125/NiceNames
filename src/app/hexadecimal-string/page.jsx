'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HexadecimalStringGenerator = () => {
  const [length, setLength] = useState(32);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cryptoAvailable, setCryptoAvailable] = useState(false);

  useEffect(() => {
    const init = () => {
      try {
        setIsClient(true);
        // Check if crypto API is available
        if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
          setCryptoAvailable(true);
        } else {
          setError('Your browser does not support cryptographically secure random number generation. Please use a modern browser.');
        }
        setIsInitialized(true);
      } catch (err) {
        setError('Error initializing hexadecimal string generator. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const generateRandomBytes = (size) => {
    if (!cryptoAvailable) {
      setError('Cryptographically secure random number generation is not available.');
      return new Uint8Array(0);
    }
    try {
      const array = new Uint8Array(size);
      window.crypto.getRandomValues(array);
      return array;
    } catch (err) {
      setError('Error generating random bytes. Please try again.');
      return new Uint8Array(0);
    }
  };

  const generateHexString = () => {
    if (!isClient || !cryptoAvailable) return;

    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);
    setIsGenerating(true);

    try {
      if (length < 1 || length > 1024) {
        throw new Error('Length must be between 1 and 1024 characters');
      }

      const bytes = generateRandomBytes(Math.ceil(length / 2));
      let hexString = '';
      for (let i = 0; i < bytes.length; i++) {
        hexString += bytes[i].toString(16).padStart(2, '0');
      }
      hexString = hexString.slice(0, length);

      setResult(hexString);
    } catch (err) {
      setError(err.message || 'Error generating hexadecimal string. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (result !== null && isClient && typeof navigator !== 'undefined' && navigator.clipboard) {
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
            <p className="mt-4 text-gray-600">Initializing hexadecimal string generator...</p>
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
            <h1 className="text-4xl font-bold mb-4">Hexadecimal String Generator</h1>
            <p className="text-xl text-gray-600">
              Generate random hexadecimal strings of any length for testing and development
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="space-y-6">
              <div>
                <label htmlFor="length" className="block text-lg font-semibold mb-2">
                  String Length
                </label>
                <input
                  type="number"
                  id="length"
                  min="1"
                  max="1024"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Enter a length between 1 and 1024 characters
                </p>
              </div>

              <button
                onClick={generateHexString}
                disabled={!isInitialized || !cryptoAvailable || isGenerating || length < 1 || length > 1024}
                className={`w-full bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  !isInitialized || !cryptoAvailable || isGenerating || length < 1 || length > 1024 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate Hexadecimal String'}
              </button>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {isInitialized && result !== null && (
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Generated Hexadecimal String</h2>
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
                Note: This tool generates random hexadecimal strings using cryptographically secure random number generation.
                All processing is done in your browser and no data is transmitted.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Hexadecimal String Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our Hexadecimal String Generator is a specialized tool designed to create random hexadecimal strings of any length. This utility is essential for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Generating unique identifiers and tokens</li>
                <li>Creating test data for cryptographic applications</li>
                <li>Generating random keys and salts</li>
                <li>Testing hexadecimal parsing and validation</li>
                <li>Educational purposes</li>
              </ul>
              <p>
                The generator provides a simple interface to create random hexadecimal strings while ensuring they are cryptographically secure. Whether you're developing a new application or testing an existing system, this generator provides a reliable solution for your hexadecimal string generation needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Hexadecimal Strings</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Hexadecimal (hex) strings are a fundamental part of computer science and programming. Understanding their properties and uses is crucial for effective application development.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Common Uses of Hexadecimal Strings</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Unique Identifiers:</strong> Often used for generating unique IDs and tokens
                </li>
                <li>
                  <strong>Cryptography:</strong> Used in cryptographic keys, hashes, and salts
                </li>
                <li>
                  <strong>Data Representation:</strong> Compact representation of binary data
                </li>
                <li>
                  <strong>Memory Addresses:</strong> Used to represent memory locations
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use cryptographically secure random number generation for sensitive data</li>
                <li>Validate hexadecimal strings before processing</li>
                <li>Consider the length requirements for your specific use case</li>
                <li>Use appropriate encoding/decoding methods</li>
                <li>Document your hexadecimal string handling practices</li>
              </ul>

              <p className="mt-4">
                Understanding hexadecimal strings and their proper implementation is crucial for effective application development. Our Hexadecimal String Generator provides a convenient way to create test strings while following best practices. Remember to use these strings responsibly and only for legitimate purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HexadecimalStringGenerator;
