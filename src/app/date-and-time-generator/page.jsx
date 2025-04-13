'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DateTimeGenerator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD');
  const [timeFormat, setTimeFormat] = useState('HH:mm:ss');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const generateDateTime = () => {
    try {
      if (!startDate || !endDate || !startTime || !endTime) {
        throw new Error('Please select all date and time ranges');
      }

      const startDateTime = new Date(startDate + 'T' + startTime);
      const endDateTime = new Date(endDate + 'T' + endTime);

      if (startDateTime > endDateTime) {
        throw new Error('Start date/time must be before end date/time');
      }

      const randomTimestamp = startDateTime.getTime() + Math.random() * (endDateTime.getTime() - startDateTime.getTime());
      const randomDate = new Date(randomTimestamp);

      const year = randomDate.getFullYear();
      const month = String(randomDate.getMonth() + 1).padStart(2, '0');
      const day = String(randomDate.getDate()).padStart(2, '0');
      const hours = String(randomDate.getHours()).padStart(2, '0');
      const minutes = String(randomDate.getMinutes()).padStart(2, '0');
      const seconds = String(randomDate.getSeconds()).padStart(2, '0');

      let formattedDate;
      switch (dateFormat) {
        case 'YYYY-MM-DD':
          formattedDate = `${year}-${month}-${day}`;
          break;
        case 'DD/MM/YYYY':
          formattedDate = `${day}/${month}/${year}`;
          break;
        case 'MM/DD/YYYY':
          formattedDate = `${month}/${day}/${year}`;
          break;
        case 'DD-MM-YYYY':
          formattedDate = `${day}-${month}-${year}`;
          break;
        default:
          throw new Error('Invalid date format');
      }

      let formattedTime;
      switch (timeFormat) {
        case 'HH:mm:ss':
          formattedTime = `${hours}:${minutes}:${seconds}`;
          break;
        case 'HH:mm':
          formattedTime = `${hours}:${minutes}`;
          break;
        case 'hh:mm:ss a':
          const period = parseInt(hours) >= 12 ? 'PM' : 'AM';
          const hour12 = parseInt(hours) % 12 || 12;
          formattedTime = `${String(hour12).padStart(2, '0')}:${minutes}:${seconds} ${period}`;
          break;
        case 'hh:mm a':
          const period2 = parseInt(hours) >= 12 ? 'PM' : 'AM';
          const hour12_2 = parseInt(hours) % 12 || 12;
          formattedTime = `${String(hour12_2).padStart(2, '0')}:${minutes} ${period2}`;
          break;
        default:
          throw new Error('Invalid time format');
      }

      setResult(`${formattedDate} ${formattedTime}`);
      setError('');
    } catch (err) {
      setError('Error generating date/time: ' + err.message);
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
          <h1 className="text-3xl font-bold mb-6">Date and Time Generator</h1>
          <p className="mb-8 text-[#C7D3D4]/80">
            Generate random dates and times within specified ranges. Choose your preferred formats and click Generate.
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="dateFormat" className="block text-lg font-semibold mb-2">
                  Date Format
                </label>
                <select
                  id="dateFormat"
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
                >
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                </select>
              </div>
              <div>
                <label htmlFor="timeFormat" className="block text-lg font-semibold mb-2">
                  Time Format
                </label>
                <select
                  id="timeFormat"
                  value={timeFormat}
                  onChange={(e) => setTimeFormat(e.target.value)}
                  className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
                >
                  <option value="HH:mm:ss">24-hour with seconds (HH:mm:ss)</option>
                  <option value="HH:mm">24-hour without seconds (HH:mm)</option>
                  <option value="hh:mm:ss a">12-hour with seconds (hh:mm:ss AM/PM)</option>
                  <option value="hh:mm a">12-hour without seconds (hh:mm AM/PM)</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateDateTime}
              className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
            >
              Generate Date and Time
            </button>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Generated Date and Time</h3>
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
            <p className="mb-2">About Formats:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Date Formats: YYYY-MM-DD, DD/MM/YYYY, MM/DD/YYYY, DD-MM-YYYY</li>
              <li>Time Formats: 24-hour with/without seconds, 12-hour with/without seconds</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DateTimeGenerator;
