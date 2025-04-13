'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
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
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <p className="mb-6 text-lg">
                Have questions, suggestions, or feedback? We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📧</span>
                  <div>
                    <h3 className="text-lg font-semibold">Email</h3>
                    <p className="text-[#C7D3D4]/80">support@example.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-2xl mr-4">🌐</span>
                  <div>
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <div className="flex space-x-4 mt-2">
                      <a href="#" className="text-[#C7D3D4]/80 hover:text-white transition-colors duration-200">Twitter</a>
                      <a href="#" className="text-[#C7D3D4]/80 hover:text-white transition-colors duration-200">GitHub</a>
                      <a href="#" className="text-[#C7D3D4]/80 hover:text-white transition-colors duration-200">LinkedIn</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-2xl mr-4">📝</span>
                  <div>
                    <h3 className="text-lg font-semibold">Documentation</h3>
                    <p className="text-[#C7D3D4]/80">
                      Check out our <Link href="/docs" className="text-[#C7D3D4] hover:text-white underline">documentation</Link> for detailed information about our tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-lg font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-lg font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-white/5 border border-[#C7D3D4]/20 rounded-lg px-4 py-3 text-[#C7D3D4] focus:outline-none focus:border-[#C7D3D4]/40"
                    placeholder="Your message"
                  />
                </div>

                {status.message && (
                  <div className={`px-4 py-3 rounded-lg ${
                    status.type === 'success' 
                      ? 'bg-green-500/20 border border-green-500 text-green-500'
                      : status.type === 'error'
                      ? 'bg-red-500/20 border border-red-500 text-red-500'
                      : 'bg-blue-500/20 border border-blue-500 text-blue-500'
                  }`}>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#C7D3D4] text-[#603F83] py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
                  disabled={status.type === 'loading'}
                >
                  {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
