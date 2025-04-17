'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CookiesPage = () => {
  return (
    <div className="min-h-screen text-gray-800">
      <Navbar />
      
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
            <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
            
            <div className="prose prose-orange max-w-none">
              <p className="text-gray-600 mb-6">
                This Cookie Policy explains how Tools for Free uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">What are cookies?</h2>
              <p className="text-gray-600 mb-6">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why do we use cookies?</h2>
              <p className="text-gray-600 mb-6">
                We use cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our website.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Types of cookies we use</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                <li>
                  <strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our website and to use some of its features.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How can you control cookies?</h2>
              <p className="text-gray-600 mb-6">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to this Cookie Policy</h2>
              <p className="text-gray-600 mb-6">
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about our use of cookies or other technologies, please contact us at:
                <br />
                Email: support@toolsforfree.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CookiesPage; 