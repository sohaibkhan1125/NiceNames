'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
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
          <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
          <p className="text-lg mb-8 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-lg leading-relaxed">
                Welcome to our website. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our tools and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">2.1 Data You Provide</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Contact information when you use our contact form</li>
                  <li>Input data for our generation tools (processed locally in your browser)</li>
                  <li>Feedback and suggestions you submit</li>
                </ul>

                <h3 className="text-xl font-semibold">2.2 Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>IP address</li>
                  <li>Access times and dates</li>
                  <li>Pages visited</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>To provide and maintain our services</li>
                  <li>To improve user experience</li>
                  <li>To respond to your inquiries and support requests</li>
                  <li>To analyze website usage and performance</li>
                  <li>To detect and prevent technical issues</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  We implement appropriate security measures to protect your information:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>All data processing occurs locally in your browser</li>
                  <li>We use secure HTTPS connections</li>
                  <li>Regular security updates and monitoring</li>
                  <li>Limited access to personal information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  We use cookies and similar tracking technologies to:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Remember your preferences</li>
                  <li>Analyze website traffic</li>
                  <li>Improve our services</li>
                </ul>
                <p className="text-lg leading-relaxed">
                  You can control cookies through your browser settings.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
              <p className="text-lg leading-relaxed">
                We may use third-party services for analytics and performance monitoring. These services have their own privacy policies, and we encourage you to review them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Access your personal information</li>
                  <li>Request correction of your data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of communications</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
              <p className="text-lg leading-relaxed">
                Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
              <p className="text-lg leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p className="text-lg leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our <Link href="/contact" className="text-[#C7D3D4] hover:text-white underline">contact form</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
