'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MACAddressVendor = () => {
  const [macAddress, setMacAddress] = useState('');
  const [vendor, setVendor] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setVendor('');
    setLoading(true);

    try {
      // Extract the OUI (first 6 characters) from the MAC address
      const oui = macAddress.replace(/[^0-9A-Fa-f]/g, '').substring(0, 6).toUpperCase();
      
      if (oui.length !== 6) {
        throw new Error('Invalid MAC address format');
      }

      // Make API request to MAC vendor lookup service
      const response = await fetch(`https://api.macvendors.com/${oui}`);
      
      if (!response.ok) {
        throw new Error('Vendor not found');
      }

      const data = await response.text();
      setVendor(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          <h1 className="text-3xl font-bold mb-6">MAC Address Vendor Lookup</h1>
          <p className="mb-8 text-[#C7D3D4]/80">
            Enter a MAC address to find its vendor information. The MAC address can be in any format (colon, hyphen, or dot separated).
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="macAddress" className="block text-lg font-semibold mb-2">
                MAC Address
              </label>
              <input
                type="text"
                id="macAddress"
                value={macAddress}
                onChange={(e) => setMacAddress(e.target.value)}
                placeholder="00:1A:2B:3C:4D:5E"
                className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Lookup Vendor'}
            </button>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {vendor && (
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Vendor Information</h3>
                  <p className="text-[#C7D3D4]/80">{vendor}</p>
                </div>
              </div>
            )}
          </form>

          <div className="mt-8 text-sm text-[#C7D3D4]/60">
            <p className="mb-2">Note: This tool uses the macvendors.com API to look up vendor information.</p>
            <p>Example MAC address formats:</p>
            <ul className="list-disc list-inside mt-2">
              <li>00:1A:2B:3C:4D:5E (colon-separated)</li>
              <li>00-1A-2B-3C-4D-5E (hyphen-separated)</li>
              <li>001A.2B3C.4D5E (dot-separated)</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MACAddressVendor;
