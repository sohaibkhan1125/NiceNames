'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PrivacyPolicy() {
  const [isClient, setIsClient] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setIsClient(true);
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-gray-600">
              At Tools4Freee, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <p className="text-gray-600">
              We collect minimal personal information to provide and improve our services. This may include:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Basic usage data</li>
              <li>Browser information</li>
              <li>IP addresses</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Provide and maintain our services</li>
              <li>Improve user experience</li>
              <li>Analyze usage patterns</li>
              <li>Ensure security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-gray-600">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <p className="text-gray-600">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Access your personal information</li>
              <li>Request correction of your data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of data collection</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-600">
              Email: asatechinfilimited@gmail.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 
