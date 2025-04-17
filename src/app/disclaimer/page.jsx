'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const DisclaimerPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold mb-6">Disclaimer</h1>
          
          <div className="prose prose-orange max-w-none">
            <p className="text-gray-600 mb-6">
              The information provided on Tools for Free is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Liability</h2>
            <p className="text-gray-600 mb-6">
              Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">External Links</h2>
            <p className="text-gray-600 mb-6">
              The site may contain links to external websites that are not provided or maintained by or in any way affiliated with us. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tools and Services</h2>
            <p className="text-gray-600 mb-6">
              While we strive to provide accurate and reliable tools and services, we cannot guarantee that all tools will be error-free or available at all times. The tools provided are for general use and should not be considered as professional advice.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to Disclaimer</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to make changes to this disclaimer at any time. We encourage you to review this disclaimer periodically to stay informed about how we are protecting the information we collect.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Disclaimer, please contact us at:
              <br />
              Email: asatechinfilimited@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage; 