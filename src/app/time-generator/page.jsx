'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TimeGenerator = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [format, setFormat] = useState('HH:mm:ss');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const generateTime = () => {
    try {
      if (!startTime || !endTime) {
        throw new Error('Please select both start and end times');
      }

      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);

      if (startHour > endHour || (startHour === endHour && startMinute > endMinute)) {
        throw new Error('Start time must be before end time');
      }

      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;
      const randomMinutes = Math.floor(Math.random() * (endMinutes - startMinutes + 1)) + startMinutes;

      const randomHour = Math.floor(randomMinutes / 60);
      const randomMinute = randomMinutes % 60;
      const randomSecond = Math.floor(Math.random() * 60);

      let formattedTime;
      switch (format) {
        case 'HH:mm:ss':
          formattedTime = `${String(randomHour).padStart(2, '0')}:${String(randomMinute).padStart(2, '0')}:${String(randomSecond).padStart(2, '0')}`;
          break;
        case 'HH:mm':
          formattedTime = `${String(randomHour).padStart(2, '0')}:${String(randomMinute).padStart(2, '0')}`;
          break;
        case 'hh:mm:ss a':
          const period = randomHour >= 12 ? 'PM' : 'AM';
          const hour12 = randomHour % 12 || 12;
          formattedTime = `${String(hour12).padStart(2, '0')}:${String(randomMinute).padStart(2, '0')}:${String(randomSecond).padStart(2, '0')} ${period}`;
          break;
        case 'hh:mm a':
          const period2 = randomHour >= 12 ? 'PM' : 'AM';
          const hour12_2 = randomHour % 12 || 12;
          formattedTime = `${String(hour12_2).padStart(2, '0')}:${String(randomMinute).padStart(2, '0')} ${period2}`;
          break;
        default:
          throw new Error('Invalid time format');
      }

      setResult(formattedTime);
      setError('');
    } catch (err) {
      setError('Error generating time: ' + err.message);
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
          <h1 className="text-3xl font-bold mb-6">Time Generator</h1>
          <p className="mb-8 text-[#C7D3D4]/80">
            Generate random times within a specified range. Choose your preferred time format and click Generate.
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startTime" className="block text-lg font-semibold mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-lg font-semibold mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="format" className="block text-lg font-semibold mb-2">
                Time Format
              </label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
              >
                <option value="HH:mm:ss">24-hour with seconds (HH:mm:ss)</option>
                <option value="HH:mm">24-hour without seconds (HH:mm)</option>
                <option value="hh:mm:ss a">12-hour with seconds (hh:mm:ss AM/PM)</option>
                <option value="hh:mm a">12-hour without seconds (hh:mm AM/PM)</option>
              </select>
            </div>

            <button
              onClick={generateTime}
              className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
            >
              Generate Time
            </button>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Generated Time</h3>
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
            <p className="mb-2">About Time Formats:</p>
            <ul className="list-disc list-inside mt-2">
              <li>HH:mm:ss: 24-hour format with seconds (e.g., 14:30:45)</li>
              <li>HH:mm: 24-hour format without seconds (e.g., 14:30)</li>
              <li>hh:mm:ss a: 12-hour format with seconds (e.g., 02:30:45 PM)</li>
              <li>hh:mm a: 12-hour format without seconds (e.g., 02:30 PM)</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TimeGenerator;
