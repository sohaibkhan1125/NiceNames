'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Terms() {
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using ToolsHub, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-gray-600">
              ToolsHub provides various data generation tools and utilities. All tools are provided "as is" without any warranties or guarantees.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="text-gray-600">
              Users are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Using the tools in compliance with applicable laws</li>
              <li>Not using the tools for malicious purposes</li>
              <li>Maintaining the confidentiality of their data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="text-gray-600">
              All content and tools on ToolsHub are protected by intellectual property rights. Users may not copy, modify, or distribute our content without permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Disclaimer of Warranties</h2>
            <p className="text-gray-600">
              We make no warranties about the accuracy, reliability, or availability of our tools. Use them at your own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600">
              ToolsHub shall not be liable for any damages arising from the use of our tools or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Modifications to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
            <p className="text-gray-600">
              For questions about these Terms and Conditions, please contact us at:
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
