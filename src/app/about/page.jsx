'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">About ToolsHub</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              ToolsHub is your go-to platform for all your data generation needs. We provide a comprehensive suite of tools designed to make your work easier and more efficient.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                Our mission is to provide high-quality, reliable data generation tools that help professionals, developers, and businesses streamline their workflows and achieve their goals more efficiently.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Our Vision</h2>
              <p className="text-gray-600">
                We envision a world where data generation is simple, accessible, and efficient for everyone. We strive to be the leading platform for all data generation needs.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose ToolsHub?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-200 rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-3">Easy to Use</h3>
                <p className="text-gray-600">
                  Our tools are designed with user-friendliness in mind, making data generation a breeze.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-3">Reliable</h3>
                <p className="text-gray-600">
                  We ensure the accuracy and reliability of our tools through continuous testing and updates.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-3">Free to Use</h3>
                <p className="text-gray-600">
                  All our tools are completely free to use, with no hidden charges or limitations.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block px-6 py-3 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
