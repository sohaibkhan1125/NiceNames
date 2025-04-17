'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HtpasswordGenerator = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = () => {
      try {
        // Check if crypto API is available
        if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
          setIsClient(true);
          setIsInitialized(true);
        } else {
          setError('Your browser does not support secure random number generation. Please use a modern browser.');
        }
      } catch (err) {
        setError('Error initializing secure random number generation. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const generateRandomBytes = (count) => {
    if (!isClient) return new Uint8Array(count);
    
    try {
      const bytes = new Uint8Array(count);
      window.crypto.getRandomValues(bytes);
      return bytes;
    } catch (err) {
      setError('Error generating random bytes. Please try again.');
      return new Uint8Array(count);
    }
  };

  const generateHtpassword = () => {
    if (!isClient) return;

    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);
    setIsGenerating(true);

    try {
      if (!username.trim() || !password.trim()) {
        throw new Error('Username and password are required');
      }

      const salt = generateRandomBytes(16);
      const saltString = Array.from(salt)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      const htpasswdLine = `${username}:{SHA}${isClient ? btoa(String.fromCharCode(...salt)) : ''}${password}`;
      setResult(htpasswdLine);
    } catch (err) {
      setError(err.message || 'Error generating htpasswd entry. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result)
        .then(() => {
          setCopySuccess('Copied!');
          setTimeout(() => setCopySuccess(''), 2000);
        })
        .catch(() => {
          setCopySuccess('Failed to copy');
          setTimeout(() => setCopySuccess(''), 2000);
        });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen text-gray-800">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Initializing secure generator...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-800">
     
      
      <div className="bg-[#f5f7ff] rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(0,0,0,0.15)] transition-all duration-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Home Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">htpasswd Generator</h1>
            <p className="text-xl text-gray-600">
              Generate secure htpasswd entries for Apache authentication
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter password"
                />
              </div>

              <button
                onClick={generateHtpassword}
                disabled={!isInitialized || isGenerating}
                className={`w-full cursor-pointer bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  !isInitialized || isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate htpasswd Entry'}
              </button>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {isInitialized && result !== null && (
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Generated htpasswd Entry</h2>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-xl font-mono text-gray-800 break-all">
                    {result}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                    title="Copy to clipboard"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  </button>
                </div>
                {copySuccess && (
                  <div className="mt-2 text-green-600">{copySuccess}</div>
                )}
              </div>
            )}

            <div className="mt-8 text-sm text-gray-500">
              <p className="text-center">
                Note: This tool generates secure htpasswd entries using cryptographically secure random number generation.
                The generated entries are not stored or transmitted anywhere.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About htpasswd Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our htpasswd Generator is a specialized tool designed to create secure htpasswd entries for Apache authentication. This utility is essential for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Setting up basic authentication for web applications</li>
                <li>Protecting sensitive directories and resources</li>
                <li>Creating test authentication entries</li>
                <li>Managing access control lists</li>
                <li>Educational purposes</li>
              </ul>
              <p>
                The generator uses cryptographically secure random number generation to create truly secure htpasswd entries, making them suitable for production use.
              </p>
              <p>
                Our tool provides a simple interface to create secure authentication entries while ensuring maximum security. Whether you're setting up a new web application or managing existing access controls, this generator provides a reliable solution for your authentication needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding htpasswd</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                htpasswd is a utility used to create and update the flat-files used to store usernames and passwords for basic authentication of HTTP users. Understanding htpasswd and its proper implementation is crucial for web security.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Common Uses of htpasswd</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Web Authentication:</strong> Protecting web directories and resources
                </li>
                <li>
                  <strong>Access Control:</strong> Managing user access to specific areas
                </li>
                <li>
                  <strong>Development Testing:</strong> Testing authentication flows
                </li>
                <li>
                  <strong>API Protection:</strong> Securing API endpoints
                </li>
                <li>
                  <strong>Content Protection:</strong> Restricting access to sensitive content
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Security Considerations</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use strong, unique passwords</li>
                <li>Regularly update passwords</li>
                <li>Store htpasswd files securely</li>
                <li>Use HTTPS for transmission</li>
                <li>Implement proper file permissions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use appropriate encryption methods</li>
                <li>Regularly audit access logs</li>
                <li>Implement password policies</li>
                <li>Monitor failed login attempts</li>
                <li>Keep software up to date</li>
              </ul>

              <p className="mt-4">
                Understanding htpasswd and its proper implementation is crucial for effective web security. Our htpasswd Generator provides a convenient way to create secure authentication entries while following best practices. Remember to use these entries responsibly and only for legitimate purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default HtpasswordGenerator;
