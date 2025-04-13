'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
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
          <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg leading-relaxed">
                We are dedicated to providing developers, IT professionals, and anyone in need with a comprehensive suite of professional generation tools. Our platform offers a wide range of utilities designed to simplify your workflow and enhance productivity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Number Tools</h3>
                  <p className="text-[#C7D3D4]/80">
                    Generate various types of numbers including random numbers, PINs, ISBNs, IMEIs, and more with customizable options.
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Address Tools</h3>
                  <p className="text-[#C7D3D4]/80">
                    Create different types of addresses including physical addresses, IP addresses, MAC addresses, and cryptocurrency addresses.
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Developer Tools</h3>
                  <p className="text-[#C7D3D4]/80">
                    Essential tools for developers including password generators, Base64 encoders, UUID generators, and cryptographic utilities.
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Date & Time Tools</h3>
                  <p className="text-[#C7D3D4]/80">
                    Generate and format dates and times with various options and formats to suit your needs.
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Hexadecimal Tools</h3>
                  <p className="text-[#C7D3D4]/80">
                    Convert between text and hexadecimal, generate secure keys, and work with different encoding formats.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🔒</span>
                  <div>
                    <h3 className="text-lg font-semibold">Secure & Reliable</h3>
                    <p className="text-[#C7D3D4]/80">All our tools are built with security in mind, ensuring your data remains private and secure.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">⚡</span>
                  <div>
                    <h3 className="text-lg font-semibold">Fast & Efficient</h3>
                    <p className="text-[#C7D3D4]/80">Quick generation and conversion tools that save you time and effort.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🔄</span>
                  <div>
                    <h3 className="text-lg font-semibold">Regular Updates</h3>
                    <p className="text-[#C7D3D4]/80">We continuously improve and add new tools to meet your evolving needs.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🎯</span>
                  <div>
                    <h3 className="text-lg font-semibold">User-Friendly</h3>
                    <p className="text-[#C7D3D4]/80">Intuitive interface designed for both beginners and professionals.</p>
                  </div>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
              <p className="text-lg leading-relaxed">
                We are committed to providing high-quality, reliable tools that help you work more efficiently. Our platform is constantly evolving, with new features and tools being added regularly to meet the needs of our users. We value your feedback and strive to make our tools as useful and user-friendly as possible.
              </p>
            </section>

            <section className="text-center">
              <Link
                href="/"
                className="inline-block bg-[#C7D3D4] text-[#603F83] py-3 px-8 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
              >
                Explore Our Tools
              </Link>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
