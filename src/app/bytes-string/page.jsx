'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BytesString = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [mode, setMode] = useState('textToBytes'); // 'textToBytes' or 'bytesToText'
  const [encoding, setEncoding] = useState('utf8'); // 'utf8', 'ascii', 'hex', 'base64'

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

  const handleEncodingChange = (e) => {
    setEncoding(e.target.value);
    setInput('');
    setOutput('');
    setError('');
    setCopySuccess('');
  };

  const processInput = () => {
    try {
      if (mode === 'textToBytes') {
        let bytes;
        switch (encoding) {
          case 'utf8':
            bytes = new TextEncoder().encode(input);
            setOutput(Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(' '));
            break;
          case 'ascii':
            bytes = input.split('').map(c => c.charCodeAt(0));
            setOutput(bytes.map(b => b.toString(16).padStart(2, '0')).join(' '));
            break;
          case 'hex':
            const hexInput = input.replace(/\s/g, '');
            if (!/^[0-9A-Fa-f]*$/.test(hexInput)) {
              throw new Error('Invalid hex input');
            }
            setOutput(hexInput.match(/.{1,2}/g)?.join(' ') || '');
            break;
          case 'base64':
            setOutput(btoa(input));
            break;
        }
      } else {
        let text;
        switch (encoding) {
          case 'utf8':
            const utf8Bytes = input.split(' ').map(b => parseInt(b, 16));
            text = new TextDecoder().decode(new Uint8Array(utf8Bytes));
            setOutput(text);
            break;
          case 'ascii':
            const asciiBytes = input.split(' ').map(b => parseInt(b, 16));
            text = String.fromCharCode(...asciiBytes);
            setOutput(text);
            break;
          case 'hex':
            const hexBytes = input.replace(/\s/g, '');
            if (!/^[0-9A-Fa-f]*$/.test(hexBytes)) {
              throw new Error('Invalid hex input');
            }
            text = hexBytes.match(/.{1,2}/g)?.map(b => String.fromCharCode(parseInt(b, 16))).join('') || '';
            setOutput(text);
            break;
          case 'base64':
            setOutput(atob(input));
            break;
        }
      }
      setError('');
    } catch (err) {
      setError('Error processing input: ' + err.message);
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
          <h1 className="text-3xl font-bold mb-6">Bytes String Tool</h1>
          <p className="mb-8 text-[#C7D3D4]/80">
            Convert between text and bytes with different encodings. Choose your preferred operation and encoding.
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <option value="textToBytes">Text to Bytes</option>
                  <option value="bytesToText">Bytes to Text</option>
                </select>
              </div>

              <div>
                <label htmlFor="encoding" className="block text-lg font-semibold mb-2">
                  Encoding
                </label>
                <select
                  id="encoding"
                  value={encoding}
                  onChange={handleEncodingChange}
                  className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
                >
                  <option value="utf8">UTF-8</option>
                  <option value="ascii">ASCII</option>
                  <option value="hex">Hex</option>
                  <option value="base64">Base64</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="input" className="block text-lg font-semibold mb-2">
                {mode === 'textToBytes' ? 'Text to Convert' : 'Bytes to Convert'}
              </label>
              <textarea
                id="input"
                value={input}
                onChange={handleInputChange}
                placeholder={mode === 'textToBytes' ? 'Enter text to convert...' : 'Enter bytes to convert...'}
                className="w-full h-32 bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40 resize-none"
              />
            </div>

            <button
              onClick={processInput}
              className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
            >
              Convert
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
                    {mode === 'textToBytes' ? 'Bytes Output' : 'Text Output'}
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
            <p className="mb-2">About Bytes Conversion:</p>
            <ul className="list-disc list-inside mt-2">
              <li>UTF-8: Standard encoding for Unicode characters</li>
              <li>ASCII: Basic character encoding (0-127)</li>
              <li>Hex: Hexadecimal representation of bytes</li>
              <li>Base64: Binary-to-text encoding scheme</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BytesString;
