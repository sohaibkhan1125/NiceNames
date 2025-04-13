'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const IPAddressGenerator = () => {
  const [ipType, setIpType] = useState('public');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const generateIP = () => {
    setError('');
    setCopySuccess('');

    let ipAddress = '';

    if (ipType === 'public') {
      // Generate public IP (excluding private ranges)
      const octet1 = Math.floor(Math.random() * 223) + 1; // 1-223
      const octet2 = Math.floor(Math.random() * 255);
      const octet3 = Math.floor(Math.random() * 255);
      const octet4 = Math.floor(Math.random() * 255);
      ipAddress = `${octet1}.${octet2}.${octet3}.${octet4}`;
    } else if (ipType === 'private') {
      // Generate private IP (10.x.x.x, 172.16-31.x.x, 192.168.x.x)
      const privateType = Math.floor(Math.random() * 3);
      let octet1, octet2, octet3, octet4;

      switch (privateType) {
        case 0: // 10.x.x.x
          octet1 = 10;
          octet2 = Math.floor(Math.random() * 255);
          octet3 = Math.floor(Math.random() * 255);
          octet4 = Math.floor(Math.random() * 255);
          break;
        case 1: // 172.16-31.x.x
          octet1 = 172;
          octet2 = Math.floor(Math.random() * 16) + 16;
          octet3 = Math.floor(Math.random() * 255);
          octet4 = Math.floor(Math.random() * 255);
          break;
        case 2: // 192.168.x.x
          octet1 = 192;
          octet2 = 168;
          octet3 = Math.floor(Math.random() * 255);
          octet4 = Math.floor(Math.random() * 255);
          break;
      }
      ipAddress = `${octet1}.${octet2}.${octet3}.${octet4}`;
    } else if (ipType === 'localhost') {
      ipAddress = '127.0.0.1';
    }

    setResult(ipAddress);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopySuccess('IP address copied to clipboard!');
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
          <h1 className="text-3xl font-bold mb-6">IP Address Generator</h1>
          <p className="mb-8 text-[#C7D3D4]/80">
            Generate random IP addresses. Choose between public, private, or localhost IP addresses.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold">IP Address Type</label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="public"
                    name="ipType"
                    value="public"
                    checked={ipType === 'public'}
                    onChange={(e) => setIpType(e.target.value)}
                    className="w-4 h-4 text-[#603F83] focus:ring-[#C7D3D4]"
                  />
                  <label htmlFor="public" className="ml-2">
                    Public IP Address
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="private"
                    name="ipType"
                    value="private"
                    checked={ipType === 'private'}
                    onChange={(e) => setIpType(e.target.value)}
                    className="w-4 h-4 text-[#603F83] focus:ring-[#C7D3D4]"
                  />
                  <label htmlFor="private" className="ml-2">
                    Private IP Address
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="localhost"
                    name="ipType"
                    value="localhost"
                    checked={ipType === 'localhost'}
                    onChange={(e) => setIpType(e.target.value)}
                    className="w-4 h-4 text-[#603F83] focus:ring-[#C7D3D4]"
                  />
                  <label htmlFor="localhost" className="ml-2">
                    Localhost (127.0.0.1)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={generateIP}
            className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 mb-6"
          >
            Generate IP Address
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

export default IPAddressGenerator;
