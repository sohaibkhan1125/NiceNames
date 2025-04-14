'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DateGenerator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [format, setFormat] = useState('YYYY-MM-DD');
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
        setIsClient(true);
        setIsInitialized(true);
      } catch (err) {
        setError('Error initializing date generator. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const generateDate = () => {
    if (!isClient) return;

    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);
    setIsGenerating(true);

    try {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Please enter valid dates');
      }

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
        default:
          formattedDate = randomDate.toISOString().split('T')[0];
      }

      setResult(formattedDate);
    } catch (err) {
      setError(err.message || 'Error generating date. Please try again.');
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
            <p className="mt-4 text-gray-600">Initializing date generator...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold mb-4">Date Generator</h1>
            <p className="text-xl text-gray-600">
              Generate random dates within a specified range in various formats
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD HH:mm:ss">YYYY-MM-DD HH:mm:ss</option>
                </select>
              </div>

              <button
                onClick={generateDate}
                disabled={!isInitialized || isGenerating || !startDate || !endDate}
                className={`w-full bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  !isInitialized || isGenerating || !startDate || !endDate ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate Date'}
              </button>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {isInitialized && result !== null && (
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Generated Date</h2>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-xl font-mono text-gray-800 break-all">
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
                Note: This tool generates random dates within the specified range.
                All processing is done in your browser and no data is transmitted.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Date Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our Date Generator is a specialized tool designed to create random dates within a specified range. This utility is essential for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Generating test data for applications</li>
                <li>Creating sample dates for documentation</li>
                <li>Testing date-related functionality</li>
                <li>Educational purposes</li>
                <li>Data analysis and visualization</li>
              </ul>
              <p>
                The generator provides a simple interface to create random dates while ensuring they fall within your specified range. Whether you're developing a new application or testing an existing system, this generator provides a reliable solution for your date generation needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Date Formats</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Date formats vary across different regions and applications. Understanding these formats is crucial for proper date handling in your applications.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Common Date Formats</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>YYYY-MM-DD:</strong> International standard (ISO 8601)
                </li>
                <li>
                  <strong>DD/MM/YYYY:</strong> European format
                </li>
                <li>
                  <strong>MM/DD/YYYY:</strong> US format
                </li>
                <li>
                  <strong>YYYY-MM-DD HH:mm:ss:</strong> Full timestamp format
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use ISO 8601 format (YYYY-MM-DD) for data storage</li>
                <li>Consider timezone implications when working with dates</li>
                <li>Validate date inputs before processing</li>
                <li>Use appropriate date libraries for complex operations</li>
                <li>Document your date handling practices</li>
              </ul>

              <p className="mt-4">
                Understanding date formats and their proper implementation is crucial for effective application development. Our Date Generator provides a convenient way to create test dates while following best practices. Remember to use these dates responsibly and only for legitimate purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DateGenerator;
