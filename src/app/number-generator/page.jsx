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
    <div className="min-h-screen bg-[#603F83] text-[#C7D3D4]">
      <Navbar />
      
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Home Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#C7D3D4] hover:text-white transition-colors duration-200 mb-8"
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
            <h1 className="text-4xl font-bold mb-4">Random Number Generator</h1>
            <p className="text-xl text-[#C7D3D4]/80">
              Generate random numbers within your specified range
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="min" className="block text-sm font-medium mb-2">
                  Minimum Number
                </label>
                <input
                  type="number"
                  id="min"
                  value={min}
                  onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-[#C7D3D4]/20 focus:border-[#C7D3D4] focus:ring-2 focus:ring-[#C7D3D4]/20 text-[#C7D3D4]"
                  placeholder="Enter minimum number"
                />
              </div>
              <div>
                <label htmlFor="max" className="block text-sm font-medium mb-2">
                  Maximum Number
                </label>
                <input
                  type="number"
                  id="max"
                  value={max}
                  onChange={(e) => setMax(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-[#C7D3D4]/20 focus:border-[#C7D3D4] focus:ring-2 focus:ring-[#C7D3D4]/20 text-[#C7D3D4]"
                  placeholder="Enter maximum number"
                />
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
                {error}
              </div>
            )}

            <div className="flex justify-center mb-8">
              <button
                onClick={generateNumber}
                className="bg-[#C7D3D4] text-[#603F83] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
              >
                Generate Random Number
              </button>
            </div>

            {result !== null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">Your Random Number</h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-6xl font-bold text-[#C7D3D4]">{result}</div>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg bg-[#C7D3D4]/20 hover:bg-[#C7D3D4]/30 transition-colors duration-200"
                    title="Copy to clipboard"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
                  <div className="mt-2 text-green-400">{copySuccess}</div>
                )}
              </div>
            )}

            <div className="mt-8 text-sm text-[#C7D3D4]/60">
              <p className="text-center">
                Note: The generated number will be an integer between your specified minimum and maximum values (inclusive).
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
