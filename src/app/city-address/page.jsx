'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CityAddressGenerator = () => {
  const [includeStreet, setIncludeStreet] = useState(true);
  const [includeCity, setIncludeCity] = useState(true);
  const [includeState, setIncludeState] = useState(true);
  const [includeZipCode, setIncludeZipCode] = useState(true);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const generateCityAddress = () => {
    setError('');
    setCopySuccess('');

    if (!includeStreet && !includeCity && !includeState && !includeZipCode) {
      setError('Please select at least one address component');
      return;
    }

    const streets = ['Main St', 'Oak Ave', 'Pine Rd', 'Maple Dr', 'Cedar Ln', 'Elm St', 'Birch Way', 'Willow Blvd'];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'];
    const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'WA'];

    let address = [];

    if (includeStreet) {
      const streetNumber = Math.floor(Math.random() * 9999) + 1;
      const street = streets[Math.floor(Math.random() * streets.length)];
      address.push(`${streetNumber} ${street}`);
    }

    if (includeCity) {
      address.push(cities[Math.floor(Math.random() * cities.length)]);
    }

    if (includeState) {
      address.push(states[Math.floor(Math.random() * states.length)]);
    }

    if (includeZipCode) {
      const zipCode = Math.floor(Math.random() * 90000) + 10000;
      address.push(zipCode.toString());
    }

    setResult(address.join(', '));
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
          <h1 className="text-3xl font-bold mb-6">City Address Generator</h1>
          <p className="mb-8 text-[#C7D3D4]/80">
            Generate random city addresses with customizable components. Select which parts of the address you want to include.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="street"
                checked={includeStreet}
                onChange={(e) => setIncludeStreet(e.target.checked)}
                className="w-4 h-4 text-[#603F83] rounded focus:ring-[#C7D3D4]"
              />
              <label htmlFor="street" className="ml-2">
                Include Street Address
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="city"
                checked={includeCity}
                onChange={(e) => setIncludeCity(e.target.checked)}
                className="w-4 h-4 text-[#603F83] rounded focus:ring-[#C7D3D4]"
              />
              <label htmlFor="city" className="ml-2">
                Include City
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="state"
                checked={includeState}
                onChange={(e) => setIncludeState(e.target.checked)}
                className="w-4 h-4 text-[#603F83] rounded focus:ring-[#C7D3D4]"
              />
              <label htmlFor="state" className="ml-2">
                Include State
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="zip"
                checked={includeZipCode}
                onChange={(e) => setIncludeZipCode(e.target.checked)}
                className="w-4 h-4 text-[#603F83] rounded focus:ring-[#C7D3D4]"
              />
              <label htmlFor="zip" className="ml-2">
                Include ZIP Code
              </label>
            </div>
          </div>

          <button
            onClick={generateCityAddress}
            className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 mb-6"
          >
            Generate City Address
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

export default CityAddressGenerator;