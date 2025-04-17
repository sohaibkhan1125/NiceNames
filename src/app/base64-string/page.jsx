'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Base64StringGenerator = () => {
  const [length, setLength] = useState(12);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsInitialized(true);
  }, []);

  const generateRandomBytes = (count) => {
    if (!isClient) return new Uint8Array(count);
    const bytes = new Uint8Array(count);
    window.crypto.getRandomValues(bytes);
    return bytes;
  };

  const generateBase64 = () => {
    if (!isClient) return;

    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);
    setIsGenerating(true);

    try {
      const bytes = generateRandomBytes(length);
      const base64String = isClient ? btoa(String.fromCharCode(...bytes)) : '';
      setResult(base64String);
    } catch (err) {
      setError('Error generating Base64 string. Please try again.');
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
            <h1 className="text-4xl font-bold mb-4">Base64 String Generator</h1>
            <p className="text-xl text-gray-600">
              Generate random Base64 encoded strings for testing and development
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-2">
                  String Length: {length}
                </label>
                <input
                  type="range"
                  min="4"
                  max="64"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <button
                onClick={generateBase64}
                disabled={!isInitialized || isGenerating}
                className={`w-full bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  !isInitialized || isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate Base64 String'}
              </button>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {isInitialized && result !== null && (
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Generated Base64 String</h2>
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
                Note: This tool generates random Base64 encoded strings using cryptographically secure random number generation.
                The generated strings are not stored or transmitted anywhere.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Base64 String Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our Base64 String Generator is a specialized tool designed to create random Base64 encoded strings for testing and development purposes. This utility is essential for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Testing Base64 encoding/decoding functionality</li>
                <li>Generating test tokens and keys</li>
                <li>Creating test data for API endpoints</li>
                <li>Testing data validation</li>
                <li>Educational purposes</li>
              </ul>
              <p>
                The generator uses cryptographically secure random number generation to create truly random Base64 strings, making them suitable for various testing scenarios.
              </p>
              <p>
                Our tool provides customizable options to meet various testing requirements while ensuring maximum security. Whether you're developing a new application or testing an existing system, this generator provides a reliable solution for your testing needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Base64 Encoding</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. Understanding Base64 encoding and its applications is crucial for modern web development.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Common Uses of Base64</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Data Transmission:</strong> Encoding binary data for safe transmission over text-based protocols
                </li>
                <li>
                  <strong>Data Storage:</strong> Storing binary data in text-based formats
                </li>
                <li>
                  <strong>Authentication:</strong> Encoding credentials and tokens
                </li>
                <li>
                  <strong>Data URLs:</strong> Embedding small files directly in HTML/CSS
                </li>
                <li>
                  <strong>API Testing:</strong> Testing endpoints that handle Base64 encoded data
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Base64 Character Set</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Uppercase letters (A-Z)</li>
                <li>Lowercase letters (a-z)</li>
                <li>Numbers (0-9)</li>
                <li>Special characters (+ and /)</li>
                <li>Padding character (=)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices for Base64 Usage</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use appropriate string lengths for your use case</li>
                <li>Handle padding characters correctly</li>
                <li>Consider URL-safe variants when needed</li>
                <li>Validate Base64 strings before processing</li>
                <li>Be aware of the 33% size increase when encoding</li>
              </ul>

              <p className="mt-4">
                Understanding Base64 encoding and its proper implementation is crucial for effective data handling in modern applications. Our Base64 String Generator provides a convenient way to create test strings while following standard encoding practices. Remember to use these strings responsibly and only for testing purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Base64StringGenerator;
