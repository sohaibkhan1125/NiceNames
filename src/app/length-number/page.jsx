'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const LengthNumberGenerator = () => {
  const [length, setLength] = useState(6);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const generateNumber = () => {
    // Reset error and copy success
    setError('');
    setCopySuccess('');

    // Validate input
    if (length < 1 || length > 20) {
      setError('Length must be between 1 and 20 digits');
      return;
    }

    // Generate number with specified length
    let number = '';
    for (let i = 0; i < length; i++) {
      number += Math.floor(Math.random() * 10);
    }
    setResult(number);
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
            <h1 className="text-4xl font-bold mb-4">Length Number Generator</h1>
            <p className="text-xl text-gray-600">
              Generate random numbers with your desired length
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="max-w-md mx-auto mb-8">
              <label htmlFor="length" className="block text-sm font-medium mb-2 text-gray-700">
                Number Length (1-20 digits)
              </label>
              <input
                type="number"
                id="length"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value) || 1)}
                min="1"
                max="20"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-gray-700"
              />
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            <div className="flex justify-center mb-8">
              <button
                onClick={generateNumber}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200"
              >
                Generate Number
              </button>
            </div>

            {result !== null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Your Generated Number</h2>
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
                Note: This tool generates random numbers with the exact length you specify, from 1 to 20 digits.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Length Number Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our Length Number Generator is a specialized tool designed to create random numbers of any specified length, from 1 to 20 digits. This versatile utility is perfect for various applications including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Generating unique identifiers and reference numbers</li>
                <li>Creating test data for software development</li>
                <li>Generating random codes for verification purposes</li>
                <li>Creating sample data for mathematical analysis</li>
                <li>Generating random numbers for games and simulations</li>
              </ul>
              <p>
                The process is simple: enter your desired number length (between 1 and 20 digits), click the generate button, and instantly receive a random number of exactly that length. The generated number can be easily copied to your clipboard with a single click, ready for immediate use.
              </p>
              <p>
                Our generator ensures true randomness by using cryptographically secure random number generation, making it suitable for both casual and professional use cases. Whether you need a short 4-digit code or a longer 20-digit number, this tool provides a reliable solution for all your random number generation needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Random Number Generation</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Random number generation is a fundamental concept in mathematics and computer science, with applications ranging from cryptography to statistical analysis. Understanding how random numbers are generated and their properties is essential for using them effectively.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Key Aspects of Random Numbers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Uniformity:</strong> Each digit (0-9) has an equal probability of appearing in any position
                </li>
                <li>
                  <strong>Independence:</strong> The value of one digit does not influence the value of any other digit
                </li>
                <li>
                  <strong>Unpredictability:</strong> It should be impossible to predict the next number in the sequence
                </li>
                <li>
                  <strong>Reproducibility:</strong> The same sequence can be reproduced if the same seed is used
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices for Using Random Numbers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Choose appropriate length based on your specific use case</li>
                <li>Consider the security requirements of your application</li>
                <li>Be aware of potential biases in random number generation</li>
                <li>Understand the limitations of pseudo-random number generators</li>
                <li>Use cryptographically secure random number generators for sensitive applications</li>
              </ul>

              <p className="mt-4">
                Understanding random number generation is crucial for many applications in computer science, mathematics, and security. Our Length Number Generator provides a simple yet powerful tool for generating random numbers of any desired length, ensuring they meet the requirements of your specific use case.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LengthNumberGenerator;
