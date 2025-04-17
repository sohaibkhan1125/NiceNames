'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PasswordGeneratorClient() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePassword = () => {
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

      const bytes = new Uint8Array(length);
      window.crypto.getRandomValues(bytes);

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
    if (result) {
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
    <div className="min-h-screen bg-[#f5f7ff] text-gray-800 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
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

        <h1 className="text-4xl font-bold mb-4 text-center">Password Generator</h1>
        <p className="text-xl text-center text-gray-600 mb-8">
          Generate secure, random passwords with customizable options.
        </p>

        <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
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
                className="w-5 h-5"
              />
              <span>Include Uppercase Letters (A-Z)</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-5 h-5"
              />
              <span>Include Lowercase Letters (a-z)</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-5 h-5"
              />
              <span>Include Numbers (0-9)</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-5 h-5"
              />
              <span>Include Symbols (!@#$%^&*)</span>
            </label>
          </div>

          <button
            onClick={generatePassword}
            disabled={isGenerating}
            className={`w-full bg-orange-500 cursor-pointer text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
            }`}
          >
            {isGenerating ? 'Generating...' : 'Generate Password'}
          </button>

          {error && <p className="text-red-600">{error}</p>}

          {result && (
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-semibold mb-2">Generated Password</h2>
              <div className="bg-gray-100 px-4 py-2 rounded font-mono text-lg break-all mb-3">
                {result}
              </div>
              <button
                onClick={copyToClipboard}
                className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                {copySuccess || 'Copy to Clipboard'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
