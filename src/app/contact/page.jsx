'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = () => {
      try {
        setIsClient(true);
        setIsInitialized(true);
      } catch (err) {
        console.error('Error initializing contact form:', err);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isClient) return;

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Subject of your message"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isInitialized}
              className={`w-full bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isSubmitting || !isInitialized ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                There was an error sending your message. Please try again later.
              </div>
            )}
          </form>
        </div>

        {/* Additional Contact Information */}
        <div className="mt-12 prose prose-orange max-w-none">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Other Ways to Reach Us</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              If you prefer to contact us through other means, here are some additional options:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Email:</strong> asatechinfilimited@gmail.com
              </li>
              <li>
                <strong>Phone:</strong> +1 (555) 123-4567
              </li>
              <li>
                <strong>Address:</strong> 123 Developer Street, Tech City, TC 12345
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 prose prose-orange max-w-none">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">How long does it take to get a response?</h3>
              <p>We typically respond to all inquiries within 24-48 hours during business days.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700">What information should I include in my message?</h3>
              <p>Please include relevant details about your inquiry, any error messages you're seeing, and steps to reproduce the issue if applicable.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Do you offer technical support?</h3>
              <p>Yes, we provide technical support for all our tools and services. Please include your account information if you're an existing user.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
