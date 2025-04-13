'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CoinAddressGenerator = () => {
  const [coinType, setCoinType] = useState('bitcoin');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const generateAddress = () => {
    setError('');
    setCopySuccess('');

    // This is a simplified version - in a real application, you would use proper
    // cryptographic libraries to generate valid addresses
    const addressLengths = {
      bitcoin: 34,
      ethereum: 42,
      litecoin: 34,
      dogecoin: 34,
      ripple: 34,
    };

    const prefixes = {
      bitcoin: '1',
      ethereum: '0x',
      litecoin: 'L',
      dogecoin: 'D',
      ripple: 'r',
    };

    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    const length = addressLengths[coinType];
    const prefix = prefixes[coinType];

    let address = prefix;
    for (let i = 0; i < length - prefix.length; i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setResult(address);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopySuccess('Address copied to clipboard!');
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
          <h1 className="text-3xl font-bold mb-6">Coin Address Generator</h1>
          <p className="mb-8 text-[#C7D3D4]/80">
            Generate random cryptocurrency addresses for different coins. Note: These are example addresses and should not be used for real transactions.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-semibold">Coin Type</label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="bitcoin"
                    name="coinType"
                    value="bitcoin"
                    checked={coinType === 'bitcoin'}
                    onChange={(e) => setCoinType(e.target.value)}
                    className="w-4 h-4 text-[#603F83] focus:ring-[#C7D3D4]"
                  />
                  <label htmlFor="bitcoin" className="ml-2">
                    Bitcoin (BTC)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ethereum"
                    name="coinType"
                    value="ethereum"
                    checked={coinType === 'ethereum'}
                    onChange={(e) => setCoinType(e.target.value)}
                    className="w-4 h-4 text-[#603F83] focus:ring-[#C7D3D4]"
                  />
                  <label htmlFor="ethereum" className="ml-2">
                    Ethereum (ETH)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="litecoin"
                    name="coinType"
                    value="litecoin"
                    checked={coinType === 'litecoin'}
                    onChange={(e) => setCoinType(e.target.value)}
                    className="w-4 h-4 text-[#603F83] focus:ring-[#C7D3D4]"
                  />
                  <label htmlFor="litecoin" className="ml-2">
                    Litecoin (LTC)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="dogecoin"
                    name="coinType"
                    value="dogecoin"
                    checked={coinType === 'dogecoin'}
                    onChange={(e) => setCoinType(e.target.value)}
                    className="w-4 h-4 text-[#603F83] focus:ring-[#C7D3D4]"
                  />
                  <label htmlFor="dogecoin" className="ml-2">
                    Dogecoin (DOGE)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ripple"
                    name="coinType"
                    value="ripple"
                    checked={coinType === 'ripple'}
                    onChange={(e) => setCoinType(e.target.value)}
                    className="w-4 h-4 text-[#603F83] focus:ring-[#C7D3D4]"
                  />
                  <label htmlFor="ripple" className="ml-2">
                    Ripple (XRP)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={generateAddress}
            className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 mb-6"
          >
            Generate Address
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

export default CoinAddressGenerator;
