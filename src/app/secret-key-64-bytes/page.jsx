'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SecretKeyGenerator = () => {
  const [key, setKey] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [error, setError] = useState('');

  const generateKey = () => {
    try {
      // Create a Uint8Array of 64 bytes
      const array = new Uint8Array(64);
      // Fill it with cryptographically secure random values
      window.crypto.getRandomValues(array);
      // Convert to hexadecimal string
      const hexString = Array.from(array)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
      setKey(hexString);
      setError('');
    } catch (err) {
      setError('Error generating key: ' + err.message);
      setKey('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(key);
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
          <h1 className="text-3xl font-bold mb-6">Secret Key Generator (64 Bytes)</h1>
          <p className="mb-8 text-[#C7D3D4]/80">
            Generate a cryptographically secure 64-byte secret key. This key can be used for various cryptographic purposes such as encryption, authentication, and signing.
          </p>

          <div className="space-y-6">
            <button
              onClick={generateKey}
              className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
            >
              Generate New Key
            </button>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {key && (
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Generated Key</h3>
                  <div className="flex items-start justify-between">
                    <pre className="text-[#C7D3D4]/80 font-mono whitespace-pre-wrap break-all">{key}</pre>
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
            <p className="mb-2">About 64-byte Secret Keys:</p>
            <ul className="list-disc list-inside mt-2">
              <li>64 bytes = 512 bits of cryptographic strength</li>
              <li>Generated using cryptographically secure random number generator</li>
              <li>Suitable for various cryptographic operations</li>
              <li>Commonly used in encryption, authentication, and signing</li>
              <li>Each key is unique and unpredictable</li>
            </ul>
            <p className="mt-4 font-semibold">⚠️ Important Security Notes:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Store generated keys securely</li>
              <li>Never share your secret keys</li>
              <li>Use different keys for different purposes</li>
              <li>Regularly rotate keys for enhanced security</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SecretKeyGenerator;
