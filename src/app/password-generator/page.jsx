'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const generatePassword = () => {
    setError('');
    setCopySuccess('');

    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecialChars) {
      setError('Please select at least one character type');
      return;
    }

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (includeUppercase) chars += uppercaseChars;
    if (includeLowercase) chars += lowercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSpecialChars) chars += specialChars;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopySuccess('Password copied to clipboard!');
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
          <h1 className="text-3xl font-bold mb-6">Password Generator</h1>
          <p className="mb-8 text-[#C7D3D4]/80">
            Generate secure passwords with customizable options. Select your preferences and click generate.
          </p>

          <div className="space-y-6">
            <div>
              <label htmlFor="length" className="block text-lg font-semibold mb-2">
                Password Length: {length}
              </label>
              <input
                type="range"
                id="length"
                min="8"
                max="32"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-[#C7D3D4]/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="uppercase"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-4 h-4 text-[#603F83] rounded focus:ring-[#C7D3D4]"
                />
                <label htmlFor="uppercase" className="ml-2">
                  Include Uppercase Letters (A-Z)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="lowercase"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="w-4 h-4 text-[#603F83] rounded focus:ring-[#C7D3D4]"
                />
                <label htmlFor="lowercase" className="ml-2">
                  Include Lowercase Letters (a-z)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="numbers"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-4 h-4 text-[#603F83] rounded focus:ring-[#C7D3D4]"
                />
                <label htmlFor="numbers" className="ml-2">
                  Include Numbers (0-9)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="special"
                  checked={includeSpecialChars}
                  onChange={(e) => setIncludeSpecialChars(e.target.checked)}
                  className="w-4 h-4 text-[#603F83] rounded focus:ring-[#C7D3D4]"
                />
                <label htmlFor="special" className="ml-2">
                  Include Special Characters (!@#$%^&*)
                </label>
              </div>
            </div>

            <button
              onClick={generatePassword}
              className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
            >
              Generate Password
            </button>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {password && (
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Generated Password</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-[#C7D3D4]/80 font-mono">{password}</p>
                    <button
                      onClick={copyToClipboard}
                      className="bg-[#C7D3D4] text-[#603F83] py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
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
            <p className="mb-2">Password Security Tips:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Use at least 12 characters</li>
              <li>Include a mix of uppercase, lowercase, numbers, and special characters</li>
              <li>Avoid using common words or phrases</li>
              <li>Don't reuse passwords across different services</li>
              <li>Consider using a password manager for better security</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordGenerator;
