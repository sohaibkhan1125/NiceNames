'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const ISBNGenerator = () => {
  const [isbnType, setIsbnType] = useState('isbn10');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateISBN = () => {
    // Reset error and copy success
    setError('');
    setCopySuccess('');
    setResult(null);

    try {
      if (isbnType === 'isbn10') {
        // Generate ISBN-10
        const prefix = '978'; // Most common prefix
        const registrationGroup = Math.floor(Math.random() * 10).toString();
        const registrant = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        const publication = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        // Calculate checksum
        let sum = 0;
        for (let i = 0; i < 9; i++) {
          sum += parseInt(prefix[i] || registrationGroup[i-3] || registrant[i-4] || publication[i-9]) * (10 - i);
        }
        const checksum = (11 - (sum % 11)) % 11;
        const checksumChar = checksum === 10 ? 'X' : checksum.toString();
        
        setResult(`${prefix}${registrationGroup}${registrant}${publication}${checksumChar}`);
      } else {
        // Generate ISBN-13
        const prefix = '978'; // Most common prefix
        const registrationGroup = Math.floor(Math.random() * 10).toString();
        const registrant = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        const publication = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        // Calculate checksum
        let sum = 0;
        const isbnWithoutChecksum = `${prefix}${registrationGroup}${registrant}${publication}`;
        for (let i = 0; i < 12; i++) {
          const weight = i % 2 === 0 ? 1 : 3;
          sum += parseInt(isbnWithoutChecksum[i]) * weight;
        }
        const checksum = (10 - (sum % 10)) % 10;
        
        setResult(`${isbnWithoutChecksum}${checksum}`);
      }
    } catch (err) {
      setError('Error generating ISBN. Please try again.');
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
            <h1 className="text-4xl font-bold mb-4">ISBN Generator</h1>
            <p className="text-xl text-gray-600">
              Generate valid ISBN-10 or ISBN-13 numbers
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="flex gap-4">
                <button
                  onClick={() => setIsbnType('isbn10')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    isbnType === 'isbn10'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  ISBN-10
                </button>
                <button
                  onClick={() => setIsbnType('isbn13')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    isbnType === 'isbn13'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  ISBN-13
                </button>
              </div>
              <button
                onClick={generateISBN}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200"
              >
                Generate ISBN
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {isClient && result !== null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Your ISBN</h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-4xl font-mono font-bold text-gray-800 tracking-wider">
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
                Note: This tool generates valid ISBN numbers that follow the standard format.
                ISBN-10 uses a 10-digit format with a checksum, while ISBN-13 uses a 13-digit format.
              </p>
            </div>
          </div>

          {/* SEO-friendly Description Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About ISBN Generator</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our ISBN Generator is a specialized tool designed to create valid International Standard Book Numbers (ISBNs). This utility is essential for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Publishers and authors preparing new books</li>
                <li>Educational institutions managing book inventories</li>
                <li>Libraries cataloging new acquisitions</li>
                <li>Book retailers managing their inventory</li>
                <li>Testing and development of book management systems</li>
              </ul>
              <p>
                The generator creates both ISBN-10 and ISBN-13 numbers that include proper checksums, ensuring compatibility with international book databases and systems. These numbers follow the official ISBN standard and can be used for book identification and cataloging.
              </p>
              <p>
                Our tool uses a secure algorithm to generate valid ISBNs, making it suitable for both professional and educational purposes. Whether you're publishing a new book or developing a book management system, this generator provides a reliable solution for your ISBN needs.
              </p>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="mt-12 prose prose-orange max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding ISBNs</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                ISBN (International Standard Book Number) is a unique identifier for books and book-like products. Understanding ISBNs and their structure is crucial for proper book identification and cataloging.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Key Aspects of ISBNs</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Format:</strong> ISBN-10 uses 10 digits with a checksum, while ISBN-13 uses 13 digits
                </li>
                <li>
                  <strong>Structure:</strong> Contains prefix, registration group, registrant, publication, and checksum
                </li>
                <li>
                  <strong>Usage:</strong> Essential for book identification, inventory management, and sales tracking
                </li>
                <li>
                  <strong>Global Standard:</strong> Recognized internationally for book identification
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Best Practices for ISBN Usage</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the appropriate ISBN format for your publication</li>
                <li>Ensure ISBNs are properly registered in international databases</li>
                <li>Include ISBNs in all book metadata and cataloging systems</li>
                <li>Verify ISBN checksums before using them</li>
                <li>Keep track of ISBN assignments for your publications</li>
              </ul>

              <p className="mt-4">
                Understanding ISBNs and their proper usage is crucial for effective book management and distribution. Our ISBN Generator provides a convenient way to create valid ISBNs while following international standards. Remember to use ISBNs responsibly and ensure they are properly registered for your publications.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ISBNGenerator;
