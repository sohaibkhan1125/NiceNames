'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AddressGenerator = () => {
  const [country, setCountry] = useState('US');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateAddress = () => {
    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);

    try {
      if (country === 'US') {
        // Generate US address
        const streetNumbers = ['123', '456', '789', '101', '202', '303', '404', '505', '606', '707'];
        const streetNames = ['Main', 'Oak', 'Pine', 'Maple', 'Cedar', 'Elm', 'Washington', 'Lincoln', 'Jefferson', 'Madison'];
        const streetTypes = ['Street', 'Avenue', 'Boulevard', 'Drive', 'Road', 'Lane', 'Court', 'Place', 'Circle', 'Way'];
        const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
        const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'GA', 'NC'];
        const zipCodes = ['10001', '90001', '60601', '77001', '85001', '19101', '78201', '92101', '75201', '95101'];

        const streetNumber = streetNumbers[Math.floor(Math.random() * streetNumbers.length)];
        const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
        const streetType = streetTypes[Math.floor(Math.random() * streetTypes.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const state = states[Math.floor(Math.random() * states.length)];
        const zipCode = zipCodes[Math.floor(Math.random() * zipCodes.length)];

        setResult(`${streetNumber} ${streetName} ${streetType}\n${city}, ${state} ${zipCode}`);
      } else {
        // Generate UK address
        const houseNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        const streetNames = ['High', 'Church', 'Park', 'Victoria', 'George', 'King', 'Queen', 'Market', 'Bridge', 'Mill'];
        const streetTypes = ['Street', 'Road', 'Avenue', 'Lane', 'Close', 'Drive', 'Court', 'Gardens', 'Square', 'Place'];
        const cities = ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Glasgow', 'Edinburgh', 'Bristol', 'Leeds', 'Cardiff', 'Belfast'];
        const postcodes = ['SW1A 1AA', 'M1 1AA', 'B1 1AA', 'L1 1AA', 'G1 1AA', 'EH1 1AA', 'BS1 1AA', 'LS1 1AA', 'CF1 1AA', 'BT1 1AA'];

        const houseNumber = houseNumbers[Math.floor(Math.random() * houseNumbers.length)];
        const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
        const streetType = streetTypes[Math.floor(Math.random() * streetTypes.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const postcode = postcodes[Math.floor(Math.random() * postcodes.length)];

        setResult(`${houseNumber} ${streetName} ${streetType}\n${city}\n${postcode}`);
      }
    } catch (err) {
      setError('Error generating address. Please try again.');
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
            <h1 className="text-4xl font-bold mb-4">Address Generator</h1>
            <p className="text-xl text-gray-600">
              Generate random addresses for testing and development
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="flex gap-4">
                <button
                  onClick={() => setCountry('US')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    country === 'US'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  US Address
                </button>
                <button
                  onClick={() => setCountry('UK')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    country === 'UK'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  UK Address
                </button>
              </div>
              <button
                onClick={generateAddress}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200"
              >
                Generate Address
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {isClient && result !== null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Generated Address</h2>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-xl font-mono text-gray-800 whitespace-pre-line">
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
                Note: This tool generates random addresses for testing and development purposes only.
                These addresses are not real and should not be used for actual mail or services.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Address Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our Address Generator is a specialized tool designed to create random addresses for testing and development purposes. This utility is essential for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Software development and testing</li>
                <li>Form validation testing</li>
                <li>Database testing</li>
                <li>Educational purposes</li>
                <li>UI/UX testing</li>
              </ul>
              <p>
                The generator creates realistic-looking addresses that follow the standard format for both US and UK addresses. These addresses are suitable for testing forms, databases, and other systems that require address input.
              </p>
              <p>
                Our tool uses a secure algorithm to generate valid-looking addresses, making it suitable for both professional and educational purposes. Whether you're developing a new application or testing an existing system, this generator provides a reliable solution for your address testing needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Address Formats</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Address formats vary by country and region. Understanding these formats is crucial for effective form design and data validation.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">US Address Format</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Street Address:</strong> House number and street name
                </li>
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

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">UK Address Format</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>House Number and Street:</strong> Building number and street name
                </li>
                <li>
                  <strong>City:</strong> Name of the city
                </li>
                <li>
                  <strong>Postcode:</strong> Alphanumeric postal code
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices for Address Testing</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Test with various address formats</li>
                <li>Verify form validation for each field</li>
                <li>Check database storage and retrieval</li>
                <li>Test address autocomplete features</li>
                <li>Verify address formatting in different contexts</li>
              </ul>

              <p className="mt-4">
                Understanding address formats and their proper handling is crucial for effective form design and data management. Our Address Generator provides a convenient way to create test addresses while following standard formats. Remember to use these addresses responsibly and only for testing purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddressGenerator;
