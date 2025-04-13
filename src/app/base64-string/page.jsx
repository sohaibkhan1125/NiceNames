'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Base64String = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [mode, setMode] = useState('encode'); // 'encode' or 'decode'

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError('');
    setCopySuccess('');
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setInput('');
    setOutput('');
    setError('');
    setCopySuccess('');
  };

  const processInput = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
      setError('');
    } catch (err) {
      setError('Invalid input for Base64 ' + (mode === 'encode' ? 'encoding' : 'decoding'));
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
          <h1 className="text-3xl font-bold mb-6">Base64 String Tool</h1>
          <p className="mb-8 text-[#C7D3D4]/80">
            Encode or decode strings using Base64 encoding. Enter your text and choose the operation.
          </p>

          <div className="space-y-6">
            <div>
              <label htmlFor="mode" className="block text-lg font-semibold mb-2">
                Operation
              </label>
              <select
                id="mode"
                value={mode}
                onChange={handleModeChange}
                className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
              >
                <option value="encode">Encode to Base64</option>
                <option value="decode">Decode from Base64</option>
              </select>
            </div>

            <div>
              <label htmlFor="input" className="block text-lg font-semibold mb-2">
                {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
              </label>
              <textarea
                id="input"
                value={input}
                onChange={handleInputChange}
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
                className="w-full h-32 bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40 resize-none"
              />
            </div>

            <button
              onClick={processInput}
              className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
            >
              {mode === 'encode' ? 'Encode' : 'Decode'}
            </button>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {output && (
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    {mode === 'encode' ? 'Encoded Base64' : 'Decoded Text'}
                  </h3>
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
            <p className="mb-2">About Base64:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Base64 is a binary-to-text encoding scheme</li>
              <li>Commonly used for encoding binary data in text-based protocols</li>
              <li>Uses 64 characters: A-Z, a-z, 0-9, +, /</li>
              <li>Often used in data URLs, email attachments, and basic authentication</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Base64String;
