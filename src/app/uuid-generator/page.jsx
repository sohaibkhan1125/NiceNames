'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UUIDGenerator = () => {
  const [version, setVersion] = useState('v4');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const generateUUID = () => {
    try {
      let uuid;
      switch (version) {
        case 'v1':
          // Generate UUID v1 (timestamp-based)
          const timestamp = Date.now();
          const random = Math.random().toString(36).substring(2, 10);
          uuid = `${timestamp}-${random}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 10)}`;
          break;
        case 'v4':
          // Generate UUID v4 (random)
          uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
          break;
        case 'v5':
          // Generate UUID v5 (namespace-based)
          const namespace = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
          const name = Math.random().toString(36).substring(2);
          const bytes = new TextEncoder().encode(namespace + name);
          const hash = crypto.subtle.digest('SHA-1', bytes);
          const hex = Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
          uuid = `${hex.substring(0, 8)}-${hex.substring(8, 12)}-5${hex.substring(13, 16)}-${hex.substring(16, 20)}-${hex.substring(20, 32)}`;
          break;
        default:
          throw new Error('Invalid UUID version');
      }
      setResult(uuid);
      setError('');
    } catch (err) {
      setError('Error generating UUID: ' + err.message);
      setResult('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
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
          <h1 className="text-3xl font-bold mb-6">UUID Generator</h1>
          <p className="mb-8 text-[#C7D3D4]/80">
            Generate Universally Unique Identifiers (UUIDs) in different versions. Choose your preferred version and click Generate.
          </p>

          <div className="space-y-6">
            <div>
              <label htmlFor="version" className="block text-lg font-semibold mb-2">
                UUID Version
              </label>
              <select
                id="version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
              >
                <option value="v1">Version 1 (Timestamp-based)</option>
                <option value="v4">Version 4 (Random)</option>
                <option value="v5">Version 5 (Namespace-based)</option>
              </select>
            </div>

            <button
              onClick={generateUUID}
              className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
            >
              Generate UUID
            </button>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Generated UUID</h3>
                  <div className="flex items-start justify-between">
                    <pre className="text-[#C7D3D4]/80 font-mono whitespace-pre-wrap break-all">{result}</pre>
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
            <p className="mb-2">About UUID Versions:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Version 1: Based on timestamp and node ID</li>
              <li>Version 4: Randomly generated</li>
              <li>Version 5: Based on namespace and name</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UUIDGenerator;
