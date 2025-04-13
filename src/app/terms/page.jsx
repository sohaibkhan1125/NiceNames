'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
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
          <h1 className="text-4xl font-bold mb-8 text-center">Terms and Conditions</h1>
          <p className="text-lg mb-8 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-lg leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-lg leading-relaxed">
                Our website provides various online tools and utilities for developers and users. These tools are provided "as is" and are intended for general use. We reserve the right to modify, suspend, or discontinue any tool or service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  When using our website, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Use the tools and services for lawful purposes only</li>
                  <li>Not engage in any activity that could harm the website or other users</li>
                  <li>Not attempt to access restricted areas of the website</li>
                  <li>Not use the website to distribute malicious software or spam</li>
                  <li>Not use automated tools to access or interact with the website</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  All content, tools, and services on this website are protected by intellectual property rights. You may not:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Copy, modify, or distribute our content without permission</li>
                  <li>Use our tools for commercial purposes without authorization</li>
                  <li>Reverse engineer or attempt to extract the source code of our tools</li>
                  <li>Use our brand or trademarks without explicit permission</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Disclaimer of Warranties</h2>
              <p className="text-lg leading-relaxed">
                The tools and services on this website are provided without any warranties, express or implied. We do not guarantee that the tools will be error-free, uninterrupted, or meet your specific requirements. Use of our tools is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="text-lg leading-relaxed">
                We shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our tools and services. This includes damages for loss of profits, data, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Data Processing</h2>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  Our tools process data locally in your browser. We do not store or transmit your input data to our servers. However, we may collect usage statistics and analytics to improve our services.
                </p>
                <p className="text-lg leading-relaxed">
                  For more information about how we handle your data, please refer to our <Link href="/privacy-policy" className="text-[#C7D3D4] hover:text-white underline">Privacy Policy</Link>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links</h2>
              <p className="text-lg leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the content or practices of these websites. Accessing third-party websites is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Modifications to Terms</h2>
              <p className="text-lg leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes are posted constitutes your acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
              <p className="text-lg leading-relaxed">
                These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
              <p className="text-lg leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us through our <Link href="/contact" className="text-[#C7D3D4] hover:text-white underline">contact form</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
