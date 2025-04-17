'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const PrimeNumberGenerator = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  const generatePrime = () => {
    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);

    // Validate input
    if (min < 1) {
      setError('Minimum value must be at least 1');
      return;
    }
    if (max <= min) {
      setError('Maximum value must be greater than minimum value');
      return;
    }
    if (max > 1000000) {
      setError('Maximum value cannot exceed 1,000,000');
      return;
    }

    // Find a random prime number in the range
    let attempts = 0;
    let prime;
    while (attempts < 1000) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      if (isPrime(randomNum)) {
        prime = randomNum;
        break;
      }
      attempts++;
    }

    if (prime) {
      setResult(prime);
    } else {
      setError('No prime number found in the specified range. Try a different range.');
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
            <h1 className="text-4xl font-bold mb-4">Prime Number Generator</h1>
            <p className="text-xl text-gray-600">
              Generate random prime numbers within a specified range
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="max-w-md mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="min" className="block text-sm font-medium mb-2 text-gray-700">
                    Minimum Value
                  </label>
                  <input
                    type="number"
                    id="min"
                    value={min}
                    onChange={(e) => setMin(parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-gray-700"
                  />
                </div>
                <div>
                  <label htmlFor="max" className="block text-sm font-medium mb-2 text-gray-700">
                    Maximum Value
                  </label>
                  <input
                    type="number"
                    id="max"
                    value={max}
                    onChange={(e) => setMax(parseInt(e.target.value) || 100)}
                    min="2"
                    max="1000000"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-gray-700"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            <div className="flex justify-center mb-8">
              <button
                onClick={generatePrime}
                className="bg-orange-500 cursor-pointer text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200"
              >
                Generate Prime Number
              </button>
            </div>

            {result !== null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Your Prime Number</h2>
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
                Note: This tool generates random prime numbers between your specified minimum and maximum values.
                The maximum value cannot exceed 1,000,000 for performance reasons.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Prime Number Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our Prime Number Generator is a specialized tool designed to create random prime numbers within any specified range. This mathematical utility is perfect for various applications including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cryptography and security applications</li>
                <li>Mathematical research and education</li>
                <li>Algorithm testing and development</li>
                <li>Number theory experiments</li>
                <li>Educational demonstrations</li>
              </ul>
              <p>
                The process is simple: enter your desired minimum and maximum values (between 1 and 1,000,000), click the generate button, and instantly receive a random prime number within that range. The generated prime number can be easily copied to your clipboard with a single click, ready for immediate use.
              </p>
              <p>
                Our generator uses an efficient algorithm to find prime numbers, making it suitable for both casual and professional use cases. Whether you need a small prime number for educational purposes or a larger one for cryptographic applications, this tool provides a reliable solution for all your prime number generation needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Prime Numbers</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Prime numbers are fundamental building blocks in mathematics, with applications ranging from cryptography to number theory. Understanding prime numbers and their properties is essential for many areas of mathematics and computer science.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Key Properties of Prime Numbers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Definition:</strong> A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself
                </li>
                <li>
                  <strong>Fundamental Theorem of Arithmetic:</strong> Every integer greater than 1 can be represented uniquely as a product of prime numbers
                </li>
                <li>
                  <strong>Distribution:</strong> Prime numbers become less frequent as numbers get larger, but there are infinitely many primes
                </li>
                <li>
                  <strong>Applications:</strong> Prime numbers are crucial in cryptography, particularly in public-key cryptosystems like RSA
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Common Uses of Prime Numbers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cryptographic key generation and encryption</li>
                <li>Hash functions and digital signatures</li>
                <li>Random number generation</li>
                <li>Error detection and correction codes</li>
                <li>Mathematical research and number theory</li>
              </ul>

              <p className="mt-4">
                Understanding prime numbers is crucial for many applications in mathematics, computer science, and security. Our Prime Number Generator provides a simple yet powerful tool for generating prime numbers of any desired size, ensuring they meet the requirements of your specific use case.
              </p>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default PrimeNumberGenerator;
