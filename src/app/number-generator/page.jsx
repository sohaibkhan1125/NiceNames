'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const NumberGenerator = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const generateNumber = () => {
    // Reset error and copy success
    setError('');
    setCopySuccess('');

    // Validate inputs
    if (min >= max) {
      setError('Minimum number must be less than maximum number');
      return;
    }

    if (min < -1000000 || max > 1000000) {
      setError('Numbers must be between -1,000,000 and 1,000,000');
      return;
    }

    // Generate random number
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setResult(randomNumber);
  };

  const copyToClipboard = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result.toString())
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

          <div className="text-center mb-12 ">
            <h1 className="text-4xl font-bold mb-4">Random Number Generator</h1>
            <p className="text-xl text-gray-600">
              Generate random numbers within your specified range
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="min" className="block text-sm font-medium mb-2 text-gray-700">
                  Minimum Number
                </label>
                <input
                  type="number"
                  id="min"
                  value={min}
                  onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-gray-700"
                  placeholder="Enter minimum number"
                />
              </div>
              <div>
                <label htmlFor="max" className="block text-sm font-medium mb-2 text-gray-700">
                  Maximum Number
                </label>
                <input
                  type="number"
                  id="max"
                  value={max}
                  onChange={(e) => setMax(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-gray-700"
                  placeholder="Enter maximum number"
                />
              </div>
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
                Generate Random Number
              </button>
            </div>

            {result !== null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Your Random Number</h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-6xl font-bold text-gray-800">{result}</div>
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
                Note: The generated number will be an integer between your specified minimum and maximum values (inclusive).
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Random Number Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Generate a random number effortlessly with our user-friendly number generator tool. This powerful utility allows you to create random numbers within any custom range you specify, making it perfect for various applications including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Statistical sampling and analysis</li>
                <li>Game development and simulations</li>
                <li>Random selection processes</li>
                <li>Educational purposes</li>
                <li>Data testing and validation</li>
              </ul>
              <p>
                The process is simple: select your desired range by entering minimum and maximum values, then click the generate button to instantly create a random number. The generated number can be easily copied to your clipboard with a single click, ready for use in your projects or applications.
              </p>
              <p>
                Our random number generator ensures fair and unbiased results, making it suitable for both casual and professional use. Whether you need a single random number or multiple iterations, this tool provides a reliable solution for all your random number generation needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Numbers</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Numbers are fundamental mathematical objects that serve as the building blocks of mathematics and everyday life. They are used for counting, measuring, and labeling various aspects of our world.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Types and Uses of Numbers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Natural Numbers:</strong> The most basic form of numbers (1, 2, 3, 4, 5, etc.) used for counting and ordering
                </li>
                <li>
                  <strong>Counting:</strong> Basic enumeration of objects or events
                </li>
                <li>
                  <strong>Measurement:</strong> Quantifying physical properties like length, weight, or time
                </li>
                <li>
                  <strong>Labeling:</strong> Unique identifiers such as telephone numbers or employee IDs
                </li>
                <li>
                  <strong>Ordering:</strong> Sequential arrangement using serial numbers
                </li>
                <li>
                  <strong>Coding:</strong> Specialized formats like ISBNs for books or product codes
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Number Representation</h3>
              <p>
                In everyday usage, numbers can be represented in various forms:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Symbols (digits like 1, 2, 3)</li>
                <li>Words (one, two, three)</li>
                <li>Abstract mathematical concepts</li>
                <li>Visual representations (tally marks, Roman numerals)</li>
              </ul>

              <p className="mt-4">
                Understanding the nature and properties of numbers is essential for effective use of our random number generator. Whether you're generating numbers for statistical analysis, game development, or any other purpose, having a solid grasp of number theory helps ensure you're using the right range and format for your specific needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NumberGenerator;
