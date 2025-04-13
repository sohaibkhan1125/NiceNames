'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HexadecimalString = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError('');
  };

  const convertToHex = () => {
    try {
      if (!input.trim()) {
        throw new Error('Please enter some text to convert');
      }
      const hexString = Array.from(input)
        .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(' ');
      setOutput(hexString);
      setError('');
    } catch (err) {
      setError('Error converting to hexadecimal: ' + err.message);
      setOutput('');
    }
  };

  const convertFromHex = () => {
    try {
      if (!input.trim()) {
        throw new Error('Please enter a hexadecimal string to convert');
      }
      // Remove any spaces and ensure even length
      const cleanHex = input.replace(/\s/g, '');
      if (cleanHex.length % 2 !== 0) {
        throw new Error('Invalid hexadecimal string length');
      }
      // Check if the string contains only valid hex characters
      if (!/^[0-9A-Fa-f]+$/.test(cleanHex)) {
        throw new Error('Invalid hexadecimal characters');
      }
      const text = cleanHex.match(/.{2}/g)
        .map(hex => String.fromCharCode(parseInt(hex, 16)))
        .join('');
      setOutput(text);
      setError('');
    } catch (err) {
      setError('Error converting from hexadecimal: ' + err.message);
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopySuccess('Copied to clipboard!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <div className="min-h-screen bg-[#603F83] text-[#C7D3D4]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-[#C7D3D4] hover:text-white transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-[#C7D3D4]/20">
          <h1 className="text-3xl font-bold mb-6">Hexadecimal String</h1>
          <p className="mb-8 text-[#C7D3D4]/80">
            Convert between text and hexadecimal strings. Enter your text or hexadecimal string and choose the conversion direction.
          </p>

          <div className="space-y-6">
            <div>
              <label htmlFor="input" className="block text-lg font-semibold mb-2">
                Input
              </label>
              <textarea
                id="input"
                value={input}
                onChange={handleInputChange}
                className="w-full h-32 bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
                placeholder="Enter text or hexadecimal string..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={convertToHex}
                className="w-full sm:w-auto bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
              >
                Text to Hex
              </button>
              <button
                onClick={convertFromHex}
                className="w-full sm:w-auto bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
              >
                Hex to Text
              </button>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {output && (
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Result</h3>
                  <div className="flex items-start justify-between">
                    <pre className="text-[#C7D3D4]/80 font-mono whitespace-pre-wrap break-all">{output}</pre>
                    <button
                      onClick={copyToClipboard}
                      className="bg-[#C7D3D4] text-[#603F83] py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 ml-4"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                {copySuccess && (
                  <div className="bg-green-500/20 border border-green-500 text-green-500 px-4 py-3 rounded-lg">
                    {copySuccess}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 text-sm text-[#C7D3D4]/60">
            <p className="mb-2">About Hexadecimal:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Hexadecimal (base-16) uses digits 0-9 and letters A-F</li>
              <li>Each byte (8 bits) is represented by two hexadecimal digits</li>
              <li>Commonly used in programming and digital systems</li>
              <li>Example: "Hello" → "48 65 6C 6C 6F"</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HexadecimalString;
