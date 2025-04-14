'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateRandomBytes = (count) => {
    const bytes = new Uint8Array(count);
    window.crypto.getRandomValues(bytes);
    return bytes;
  };

  const generatePassword = () => {
    if (!isClient) return;

    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);
    setIsGenerating(true);

    try {
      const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const numberChars = '0123456789';
      const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

      let availableChars = '';
      if (includeUppercase) availableChars += uppercaseChars;
      if (includeLowercase) availableChars += lowercaseChars;
      if (includeNumbers) availableChars += numberChars;
      if (includeSymbols) availableChars += symbolChars;

      if (availableChars.length === 0) {
        throw new Error('Please select at least one character type');
      }

      const bytes = generateRandomBytes(length);
      const password = Array.from(bytes)
        .map(byte => availableChars[byte % availableChars.length])
        .join('');

      setResult(password);
    } catch (err) {
      setError(err.message);
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
            <h1 className="text-4xl font-bold mb-4">Password Generator</h1>
            <p className="text-xl text-gray-600">
              Generate secure, random passwords with customizable options
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Password Length: {length}
                </label>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span>Include Uppercase Letters (A-Z)</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span>Include Lowercase Letters (a-z)</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span>Include Numbers (0-9)</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span>Include Symbols (!@#$%^&*)</span>
                </label>
              </div>

              <button
                onClick={generatePassword}
                disabled={!isClient || isGenerating}
                className={`w-full bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  !isClient || isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate Password'}
              </button>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {isClient && result !== null && (
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Generated Password</h2>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-xl font-mono text-gray-800">
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
                Note: This tool generates random passwords using cryptographically secure random number generation.
                The generated passwords are not stored or transmitted anywhere.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Password Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our Password Generator is a secure tool designed to create strong, random passwords for your online accounts. This utility is essential for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Creating secure account passwords</li>
                <li>Generating API keys and tokens</li>
                <li>Setting up secure access credentials</li>
                <li>Testing password strength requirements</li>
                <li>Educational purposes</li>
              </ul>
              <p>
                The generator uses cryptographically secure random number generation to create truly random passwords, making them resistant to guessing and brute-force attacks.
              </p>
              <p>
                Our tool provides customizable options to meet various password requirements while ensuring maximum security. Whether you're setting up a new account or updating existing credentials, this generator provides a reliable solution for your password needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Password Security</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Strong passwords are essential for protecting your online accounts and sensitive information. Understanding password security best practices is crucial for maintaining your digital safety.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Password Best Practices</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Length:</strong> Use passwords of at least 12 characters
                </li>
                <li>
                  <strong>Complexity:</strong> Include uppercase, lowercase, numbers, and symbols
                </li>
                <li>
                  <strong>Uniqueness:</strong> Use different passwords for different accounts
                </li>
                <li>
                  <strong>Regular Updates:</strong> Change passwords periodically
                </li>
                <li>
                  <strong>Storage:</strong> Use a password manager to store passwords securely
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Common Password Mistakes</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Using personal information (names, birthdays, etc.)</li>
                <li>Using common words or phrases</li>
                <li>Using sequential or repeated characters</li>
                <li>Using the same password across multiple accounts</li>
                <li>Writing down passwords in unsecure locations</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Password Security Tips</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Enable two-factor authentication when available</li>
                <li>Use a password manager to generate and store passwords</li>
                <li>Regularly check for password breaches</li>
                <li>Be cautious of phishing attempts</li>
                <li>Keep your devices and software updated</li>
              </ul>

              <p className="mt-4">
                Understanding and implementing proper password security practices is crucial for protecting your digital identity and sensitive information. Our Password Generator provides a convenient way to create strong, secure passwords while following best practices. Remember to use these passwords responsibly and store them securely.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PasswordGenerator;
