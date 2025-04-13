'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DateGenerator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [format, setFormat] = useState('YYYY-MM-DD');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const generateDate = () => {
    try {
      if (!startDate || !endDate) {
        throw new Error('Please select both start and end dates');
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        throw new Error('Start date must be before end date');
      }

      const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
      const randomDate = new Date(randomTime);

      let formattedDate;
      switch (format) {
        case 'YYYY-MM-DD':
          formattedDate = randomDate.toISOString().split('T')[0];
          break;
        case 'DD/MM/YYYY':
          formattedDate = `${String(randomDate.getDate()).padStart(2, '0')}/${String(randomDate.getMonth() + 1).padStart(2, '0')}/${randomDate.getFullYear()}`;
          break;
        case 'MM/DD/YYYY':
          formattedDate = `${String(randomDate.getMonth() + 1).padStart(2, '0')}/${String(randomDate.getDate()).padStart(2, '0')}/${randomDate.getFullYear()}`;
          break;
        case 'YYYY-MM-DD HH:mm:ss':
          formattedDate = randomDate.toISOString().replace('T', ' ').split('.')[0];
          break;
        case 'DD/MM/YYYY HH:mm:ss':
          formattedDate = `${String(randomDate.getDate()).padStart(2, '0')}/${String(randomDate.getMonth() + 1).padStart(2, '0')}/${randomDate.getFullYear()} ${String(randomDate.getHours()).padStart(2, '0')}:${String(randomDate.getMinutes()).padStart(2, '0')}:${String(randomDate.getSeconds()).padStart(2, '0')}`;
          break;
        default:
          throw new Error('Invalid date format');
      }

      setResult(formattedDate);
      setError('');
    } catch (err) {
      setError('Error generating date: ' + err.message);
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
          <h1 className="text-3xl font-bold mb-6">Date Generator</h1>
          <p className="mb-8 text-[#C7D3D4]/80">
            Generate random dates within a specified range. Choose your preferred date format and click Generate.
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-lg font-semibold mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-lg font-semibold mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="format" className="block text-lg font-semibold mb-2">
                Date Format
              </label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
              >
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD HH:mm:ss">YYYY-MM-DD HH:mm:ss</option>
                <option value="DD/MM/YYYY HH:mm:ss">DD/MM/YYYY HH:mm:ss</option>
              </select>
            </div>

            <button
              onClick={generateDate}
              className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
            >
              Generate Date
            </button>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Generated Date</h3>
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
            <p className="mb-2">About Date Formats:</p>
            <ul className="list-disc list-inside mt-2">
              <li>YYYY-MM-DD: International standard format</li>
              <li>DD/MM/YYYY: European format</li>
              <li>MM/DD/YYYY: US format</li>
              <li>YYYY-MM-DD HH:mm:ss: With time in 24-hour format</li>
              <li>DD/MM/YYYY HH:mm:ss: European format with time</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DateGenerator;
