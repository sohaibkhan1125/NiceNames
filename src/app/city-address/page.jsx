'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CityAddressGenerator = () => {
  const [country, setCountry] = useState('US');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateCityAddress = () => {
    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);

    try {
      if (country === 'US') {
        // Generate US city address
        const cities = [
          { name: 'New York', state: 'NY', zip: '10001' },
          { name: 'Los Angeles', state: 'CA', zip: '90001' },
          { name: 'Chicago', state: 'IL', zip: '60601' },
          { name: 'Houston', state: 'TX', zip: '77001' },
          { name: 'Phoenix', state: 'AZ', zip: '85001' },
          { name: 'Philadelphia', state: 'PA', zip: '19101' },
          { name: 'San Antonio', state: 'TX', zip: '78201' },
          { name: 'San Diego', state: 'CA', zip: '92101' },
          { name: 'Dallas', state: 'TX', zip: '75201' },
          { name: 'San Jose', state: 'CA', zip: '95101' }
        ];

        const city = cities[Math.floor(Math.random() * cities.length)];
        setResult(`${city.name}, ${city.state} ${city.zip}`);
      } else {
        // Generate UK city address
        const cities = [
          { name: 'London', postcode: 'SW1A 1AA' },
          { name: 'Manchester', postcode: 'M1 1AA' },
          { name: 'Birmingham', postcode: 'B1 1AA' },
          { name: 'Liverpool', postcode: 'L1 1AA' },
          { name: 'Glasgow', postcode: 'G1 1AA' },
          { name: 'Edinburgh', postcode: 'EH1 1AA' },
          { name: 'Bristol', postcode: 'BS1 1AA' },
          { name: 'Leeds', postcode: 'LS1 1AA' },
          { name: 'Cardiff', postcode: 'CF1 1AA' },
          { name: 'Belfast', postcode: 'BT1 1AA' }
        ];

        const city = cities[Math.floor(Math.random() * cities.length)];
        setResult(`${city.name}\n${city.postcode}`);
      }
    } catch (err) {
      setError('Error generating city address. Please try again.');
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
            <h1 className="text-4xl font-bold mb-4">City Address Generator</h1>
            <p className="text-xl text-gray-600">
              Generate random city addresses for testing and development
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="flex gap-4">
                <button
                  onClick={() => setCountry('US')}
                  className={`px-4 py-2 cursor-pointer rounded-lg font-semibold transition-all duration-200 ${
                    country === 'US'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  US Cities
                </button>
                <button
                  onClick={() => setCountry('UK')}
                  className={`px-4 py-2 cursor-pointer rounded-lg font-semibold transition-all duration-200 ${
                    country === 'UK'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  UK Cities
                </button>
              </div>
              <button
                onClick={generateCityAddress}
                className="bg-orange-500 cursor-pointer text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200"
              >
                Generate City Address
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {isClient && result !== null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Generated City Address</h2>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-xl font-mono text-gray-800 whitespace-pre-line">
                    {result}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
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
                Note: This tool generates random city addresses for testing and development purposes only.
                These addresses are not real and should not be used for actual mail or services.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About City Address Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our City Address Generator is a specialized tool designed to create random city addresses for testing and development purposes. This utility is essential for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Software development and testing</li>
                <li>Form validation testing</li>
                <li>Database testing</li>
                <li>Educational purposes</li>
                <li>UI/UX testing</li>
              </ul>
              <p>
                The generator creates realistic-looking city addresses that follow the standard format for both US and UK cities. These addresses are suitable for testing forms, databases, and other systems that require city address input.
              </p>
              <p>
                Our tool uses a secure algorithm to generate valid-looking city addresses, making it suitable for both professional and educational purposes. Whether you're developing a new application or testing an existing system, this generator provides a reliable solution for your city address testing needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding City Address Formats</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                City address formats vary by country and region. Understanding these formats is crucial for effective form design and data validation.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">US City Address Format</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>City:</strong> Name of the city
                </li>
                <li>
                  <strong>State:</strong> Two-letter state code
                </li>
                <li>
                  <strong>ZIP Code:</strong> Five-digit postal code
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">UK City Address Format</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>City:</strong> Name of the city
                </li>
                <li>
                  <strong>Postcode:</strong> Alphanumeric postal code
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices for City Address Testing</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Test with various city address formats</li>
                <li>Verify form validation for each field</li>
                <li>Check database storage and retrieval</li>
                <li>Test city address autocomplete features</li>
                <li>Verify city address formatting in different contexts</li>
              </ul>

              <p className="mt-4">
                Understanding city address formats and their proper handling is crucial for effective form design and data management. Our City Address Generator provides a convenient way to create test city addresses while following standard formats. Remember to use these addresses responsibly and only for testing purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default CityAddressGenerator;