'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const FloatNumberGenerator = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1);
  const [precision, setPrecision] = useState(2);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const generateFloat = () => {
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

    if (precision < 0 || precision > 10) {
      setError('Precision must be between 0 and 10 decimal places');
      return;
    }

    // Generate random float number
    const randomFloat = Math.random() * (max - min) + min;
    const roundedFloat = Number(randomFloat.toFixed(precision));
    setResult(roundedFloat);
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
            <h1 className="text-4xl font-bold mb-4">Float Number Generator</h1>
            <p className="text-xl text-gray-600">
              Generate random floating-point numbers with custom precision
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label htmlFor="min" className="block text-sm font-medium mb-2 text-gray-700">
                  Minimum Number
                </label>
                <input
                  type="number"
                  id="min"
                  value={min}
                  onChange={(e) => setMin(parseFloat(e.target.value) || 0)}
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
                  onChange={(e) => setMax(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-gray-700"
                  placeholder="Enter maximum number"
                />
              </div>
              <div>
                <label htmlFor="precision" className="block text-sm font-medium mb-2 text-gray-700">
                  Decimal Places
                </label>
                <input
                  type="number"
                  id="precision"
                  value={precision}
                  onChange={(e) => setPrecision(parseInt(e.target.value) || 0)}
                  min="0"
                  max="10"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-gray-700"
                  placeholder="Enter precision (0-10)"
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
                onClick={generateFloat}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200"
              >
                Generate Float Number
              </button>
            </div>

            {result !== null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Your Random Float Number</h2>
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
                Note: The generated number will be a floating-point number between your specified minimum and maximum values, rounded to the specified number of decimal places.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Float Number Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Generate precise floating-point numbers with our advanced number generator tool. This specialized utility allows you to create random decimal numbers within any custom range and with your desired level of precision, making it perfect for various applications including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Scientific calculations and simulations</li>
                <li>Financial modeling and analysis</li>
                <li>Statistical research and data analysis</li>
                <li>Engineering calculations</li>
                <li>Machine learning and AI development</li>
              </ul>
              <p>
                The process is simple: select your desired range by entering minimum and maximum values, specify the number of decimal places you need, then click the generate button to instantly create a random floating-point number. The generated number can be easily copied to your clipboard with a single click, ready for use in your projects or applications.
              </p>
              <p>
                Our float number generator ensures precise and accurate results, making it suitable for both casual and professional use. Whether you need a single random float or multiple iterations, this tool provides a reliable solution for all your floating-point number generation needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Floating-Point Numbers</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Floating-point numbers are a fundamental concept in mathematics and computer science, representing real numbers that can have fractional parts. They are essential for precise calculations and scientific computations.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Key Characteristics of Floating-Point Numbers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Decimal Precision:</strong> The number of digits after the decimal point
                </li>
                <li>
                  <strong>Range:</strong> Can represent both very small and very large numbers
                </li>
                <li>
                  <strong>Scientific Notation:</strong> Often represented in the form of mantissa × 10^exponent
                </li>
                <li>
                  <strong>Accuracy:</strong> Provides more precise representation than integers for fractional values
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Common Uses of Floating-Point Numbers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Scientific calculations and measurements</li>
                <li>Financial calculations and currency handling</li>
                <li>Physical simulations and modeling</li>
                <li>Statistical analysis and data processing</li>
                <li>Computer graphics and game development</li>
              </ul>

              <p className="mt-4">
                Understanding floating-point numbers is crucial for accurate calculations in various fields. Our float number generator helps you create these numbers with the exact precision you need, ensuring reliable results for your specific applications.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FloatNumberGenerator;
