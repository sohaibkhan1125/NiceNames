import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tools4Freee - Free Online Tools for Developers',
  description: 'Free online tools for developers and professionals. Generate random numbers, passwords, dates, and more.',
  keywords: 'free tools, developer tools, random generator, password generator, date generator, number generator',
  openGraph: {
    title: 'Tools4Freee - Free Online Tools for Developers',
    description: 'Free online tools for developers and professionals. Generate random numbers, passwords, dates, and more.',
    url: 'https://tools4freee.com',
    siteName: 'Tools4Freee',
    images: [
      {
        url: 'https://tools4freee.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tools4Freee - Free Online Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tools4Freee - Free Online Tools for Developers',
    description: 'Free online tools for developers and professionals. Generate random numbers, passwords, dates, and more.',
    images: ['https://tools4freee.com/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://tools4freee.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3301775238471240"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* ✅ Google Search Console Verification Meta Tag */}
        <meta name="google-site-verification" content="jr4eU1ogEc0_suESOFQv8TVyaV6gpAmMIp8GuYiLwws" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
