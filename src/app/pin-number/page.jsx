'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const PinGenerator = () => {
  const [length, setLength] = useState(4);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeLetters, setIncludeLetters] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const generatePIN = () => {
    // Reset error and copy success
    setError('');
    setCopySuccess('');

    // Validate inputs
    if (length < 4 || length > 20) {
      setError('PIN length must be between 4 and 20 characters');
      return;
    }

    if (!includeNumbers && !includeLetters && !includeSpecialChars) {
      setError('Please select at least one character type');
      return;
    }

    // Define character sets
    const numbers = '0123456789';
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Create available characters string based on selected options
    let availableChars = '';
    if (includeNumbers) availableChars += numbers;
    if (includeLetters) availableChars += letters;
    if (includeSpecialChars) availableChars += specialChars;

    // Generate PIN
    let pin = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      pin += availableChars[randomIndex];
    }

    setResult(pin);
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
            <h1 className="text-4xl font-bold mb-4">PIN Generator</h1>
            <p className="text-xl text-gray-600">
              Generate secure PINs with customizable length and character types
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="length" className="block text-sm font-medium mb-2 text-gray-700">
                  PIN Length (4-20)
                </label>
                <input
                  type="number"
                  id="length"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value) || 4)}
                  min="4"
                  max="20"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-gray-700"
                />
              </div>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">Include Numbers (0-9)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeLetters}
                    onChange={(e) => setIncludeLetters(e.target.checked)}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">Include Letters (A-Z, a-z)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeSpecialChars}
                    onChange={(e) => setIncludeSpecialChars(e.target.checked)}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">Include Special Characters (!@#$%^&*)</span>
                </label>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            <div className="flex justify-center mb-8">
              <button
                onClick={generatePIN}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200"
              >
                Generate PIN
              </button>
            </div>

            {result !== null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Your Generated PIN</h2>
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
                Note: For maximum security, consider using a combination of numbers, letters, and special characters.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About PIN Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Create secure and customizable PINs with our advanced PIN generator tool. This specialized utility allows you to generate random PINs with your preferred length and character combinations, making it perfect for various security applications including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Online account security</li>
                <li>Two-factor authentication</li>
                <li>Physical access control systems</li>
                <li>Secure document access</li>
                <li>Financial transaction verification</li>
              </ul>
              <p>
                The process is simple: select your desired PIN length (between 4 and 20 characters), choose which character types to include (numbers, letters, and/or special characters), then click the generate button to instantly create a secure PIN. The generated PIN can be easily copied to your clipboard with a single click, ready for immediate use.
              </p>
              <p>
                Our PIN generator ensures maximum security by using cryptographically secure random number generation, making it suitable for both personal and professional security needs. Whether you need a simple numeric PIN or a complex alphanumeric code, this tool provides a reliable solution for all your PIN generation requirements.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding PIN Security</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Personal Identification Numbers (PINs) are a fundamental aspect of modern security systems, providing a simple yet effective way to authenticate users and protect sensitive information.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Key Aspects of PIN Security</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Length:</strong> Longer PINs are more secure, with a minimum recommended length of 6-8 characters
                </li>
                <li>
                  <strong>Complexity:</strong> Using multiple character types (numbers, letters, special characters) increases security
                </li>
                <li>
                  <strong>Randomness:</strong> Truly random PINs are more secure than predictable patterns
                </li>
                <li>
                  <strong>Uniqueness:</strong> Each PIN should be unique and not reused across different systems
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices for PIN Security</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use a minimum of 8 characters for critical systems</li>
                <li>Include a mix of character types when possible</li>
                <li>Avoid using personal information or common patterns</li>
                <li>Change PINs regularly, especially for sensitive accounts</li>
                <li>Never share PINs or write them down in unsecured locations</li>
              </ul>

              <p className="mt-4">
                Understanding PIN security is crucial for protecting your digital and physical assets. Our PIN generator helps you create secure, random PINs that meet modern security standards, ensuring your sensitive information remains protected.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PinGenerator;
