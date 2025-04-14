'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MACAddressVendorGenerator = () => {
  const [vendor, setVendor] = useState('cisco');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateRandomBytes = () => {
    const bytes = new Uint8Array(3);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes).map(byte => byte.toString(16).padStart(2, '0'));
  };

  const generateMAC = () => {
    if (!isClient) return;

    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);
    setIsGenerating(true);

    try {
      // Vendor OUI prefixes
      const vendorPrefixes = {
        cisco: '00:00:0C',
        dell: '00:14:22',
        hp: '00:50:56',
        intel: '00:90:27',
        apple: '00:03:93',
        samsung: '00:12:47',
        microsoft: '00:50:F2',
        netgear: '00:0F:B5',
        tp_link: '00:1D:0F',
        asus: '00:1A:92'
      };

      // Generate random bytes for the last 3 octets
      const bytes = generateRandomBytes();
      const macAddress = `${vendorPrefixes[vendor]}:${bytes.join(':')}`;
      setResult(macAddress);
    } catch (err) {
      setError('Error generating MAC address. Please try again.');
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

  return (
    <div className="min-h-screen text-gray-800">
      <Navbar />
      
      <div className="py-12">
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
            <h1 className="text-4xl font-bold mb-4">MAC Address Vendor Generator</h1>
            <p className="text-xl text-gray-600">
              Generate random MAC addresses with specific vendor prefixes for testing and development
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                <button
                  onClick={() => setVendor('cisco')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    vendor === 'cisco'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Cisco
                </button>
                <button
                  onClick={() => setVendor('dell')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    vendor === 'dell'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Dell
                </button>
                <button
                  onClick={() => setVendor('hp')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    vendor === 'hp'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  HP
                </button>
                <button
                  onClick={() => setVendor('intel')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    vendor === 'intel'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Intel
                </button>
                <button
                  onClick={() => setVendor('apple')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    vendor === 'apple'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Apple
                </button>
                <button
                  onClick={() => setVendor('samsung')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    vendor === 'samsung'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Samsung
                </button>
              </div>
              <button
                onClick={generateMAC}
                disabled={!isClient || isGenerating}
                className={`bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  !isClient || isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate MAC Address'}
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {isClient && result !== null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Generated MAC Address</h2>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-xl font-mono text-gray-800">
                    {result}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
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
                Note: This tool generates random MAC addresses with vendor prefixes for testing and development purposes only.
                These addresses are not real and should not be used for actual network configuration.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About MAC Address Vendor Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our MAC Address Vendor Generator is a specialized tool designed to create random MAC addresses with specific vendor prefixes for testing and development purposes. This utility is essential for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Network device testing</li>
                <li>Vendor-specific testing</li>
                <li>Network configuration testing</li>
                <li>Educational purposes</li>
                <li>Network simulation</li>
              </ul>
              <p>
                The generator creates valid-looking MAC addresses with real vendor prefixes, making it suitable for testing network configurations, device management systems, and other applications that require vendor-specific MAC address input.
              </p>
              <p>
                Our tool uses a secure algorithm to generate valid-looking MAC addresses with proper vendor prefixes, making it suitable for both professional and educational purposes. Whether you're developing a new network application or testing an existing system, this generator provides a reliable solution for your testing needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding MAC Address Vendors</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                MAC addresses contain a vendor identifier in the first three octets (OUI - Organizationally Unique Identifier). Understanding vendor prefixes and their usage is crucial for network management and security.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Common Vendor Prefixes</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Cisco:</strong> 00:00:0C
                </li>
                <li>
                  <strong>Dell:</strong> 00:14:22
                </li>
                <li>
                  <strong>HP:</strong> 00:50:56
                </li>
                <li>
                  <strong>Intel:</strong> 00:90:27
                </li>
                <li>
                  <strong>Apple:</strong> 00:03:93
                </li>
                <li>
                  <strong>Samsung:</strong> 00:12:47
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Vendor Prefix Structure</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>First 3 octets:</strong> Vendor identifier (OUI)
                </li>
                <li>
                  <strong>Last 3 octets:</strong> Device identifier
                </li>
                <li>
                  <strong>Format:</strong> XX:XX:XX:XX:XX:XX
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices for Vendor Testing</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Test with different vendor prefixes</li>
                <li>Verify vendor identification</li>
                <li>Check network configuration handling</li>
                <li>Test security measures and access controls</li>
                <li>Verify address parsing and storage</li>
              </ul>

              <p className="mt-4">
                Understanding MAC address vendors and their proper handling is crucial for effective network management and security. Our MAC Address Vendor Generator provides a convenient way to create test addresses with specific vendor prefixes while following standard formats. Remember to use these addresses responsibly and only for testing purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MACAddressVendorGenerator;
