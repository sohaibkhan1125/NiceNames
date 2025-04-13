'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MACAddressGenerator = () => {
  const [format, setFormat] = useState('colon');
  const [uppercase, setUppercase] = useState(true);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const generateMAC = () => {
    setError('');
    setCopySuccess('');

    // Generate 6 random bytes (0-255)
    const bytes = Array.from({ length: 6 }, () => 
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    );

    let macAddress = '';
    switch (format) {
      case 'colon':
        macAddress = bytes.join(':');
        break;
      case 'hyphen':
        macAddress = bytes.join('-');
        break;
      case 'dot':
        macAddress = bytes.join('.');
        break;
      case 'none':
        macAddress = bytes.join('');
        break;
    }

    if (uppercase) {
      macAddress = macAddress.toUpperCase();
    }

    setResult(macAddress);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopySuccess('MAC address copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 2000);
    }
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
          <h1 className="text-3xl font-bold mb-6">MAC Address Generator</h1>
          <p className="mb-8 text-[#C7D3D4]/80">
            Generate random MAC addresses with customizable format and case.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold">Format</label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="colon"
                    name="format"
                    value="colon"
                    checked={format === 'colon'}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-4 h-4 text-[#603F83] focus:ring-[#C7D3D4]"
                  />
                  <label htmlFor="colon" className="ml-2">
                    Colon (00:11:22:33:44:55)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="hyphen"
                    name="format"
                    value="hyphen"
                    checked={format === 'hyphen'}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-4 h-4 text-[#603F83] focus:ring-[#C7D3D4]"
                  />
                  <label htmlFor="hyphen" className="ml-2">
                    Hyphen (00-11-22-33-44-55)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="dot"
                    name="format"
                    value="dot"
                    checked={format === 'dot'}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-4 h-4 text-[#603F83] focus:ring-[#C7D3D4]"
                  />
                  <label htmlFor="dot" className="ml-2">
                    Dot (00.11.22.33.44.55)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="none"
                    name="format"
                    value="none"
                    checked={format === 'none'}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-4 h-4 text-[#603F83] focus:ring-[#C7D3D4]"
                  />
                  <label htmlFor="none" className="ml-2">
                    No Separator (001122334455)
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="uppercase"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 text-[#603F83] rounded focus:ring-[#C7D3D4]"
              />
              <label htmlFor="uppercase" className="ml-2">
                Uppercase Letters
              </label>
            </div>
          </div>

          <button
            onClick={generateMAC}
            className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 mb-6"
          >
            Generate MAC Address
          </button>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-lg break-words">{result}</p>
              </div>
              <button
                onClick={copyToClipboard}
                className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
              >
                Copy to Clipboard
              </button>
              {copySuccess && (
                <div className="text-green-500 text-center">{copySuccess}</div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MACAddressGenerator; 