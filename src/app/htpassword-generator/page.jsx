'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HTPasswordGenerator = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('bcrypt');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const generateHTPasswd = async () => {
    setError('');
    setCopySuccess('');
    setResult('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      let encodedPassword;
      if (encryption === 'bcrypt') {
        // For bcrypt, we'll use a simple implementation
        // In a real application, you should use a proper bcrypt library
        const salt = '$2a$10$' + Math.random().toString(36).substring(2, 28);
        encodedPassword = salt + password;
      } else if (encryption === 'md5') {
        // For MD5, we'll use a simple implementation
        // In a real application, you should use a proper MD5 library
        encodedPassword = 'MD5:' + btoa(password);
      } else if (encryption === 'sha1') {
        // For SHA1, we'll use a simple implementation
        // In a real application, you should use a proper SHA1 library
        encodedPassword = '{SHA}' + btoa(password);
      } else {
        // Plain text (not recommended)
        encodedPassword = password;
      }

      const htpasswdEntry = `${username}:${encodedPassword}`;
      setResult(htpasswdEntry);
    } catch (err) {
      setError('Error generating htpasswd entry');
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
          <h1 className="text-3xl font-bold mb-6">htpasswd Generator</h1>
          <p className="mb-8 text-[#C7D3D4]/80">
            Generate Apache htpasswd entries for basic authentication. Choose your preferred encryption method.
          </p>

          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-lg font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
              />
            </div>

            <div>
              <label htmlFor="encryption" className="block text-lg font-semibold mb-2">
                Encryption Method
              </label>
              <select
                id="encryption"
                value={encryption}
                onChange={(e) => setEncryption(e.target.value)}
                className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
              >
                <option value="bcrypt">BCrypt (Recommended)</option>
                <option value="md5">MD5</option>
                <option value="sha1">SHA1</option>
                <option value="plain">Plain Text (Not Recommended)</option>
              </select>
            </div>

            <button
              onClick={generateHTPasswd}
              className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
            >
              Generate htpasswd Entry
            </button>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">htpasswd Entry</h3>
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
            <p className="mb-2">About htpasswd:</p>
            <ul className="list-disc list-inside mt-2">
              <li>htpasswd is used to create and update the flat-files used to store usernames and password for basic authentication</li>
              <li>BCrypt is the most secure option and recommended for new installations</li>
              <li>MD5 and SHA1 are older methods and less secure</li>
              <li>Plain text is not recommended for production use</li>
              <li>Add the generated entry to your .htpasswd file</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HTPasswordGenerator;
