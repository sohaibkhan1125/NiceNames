'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Logo = ({ className = '' }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="flex items-center">
        {isClient && (
          <Image
            src="/logo.png"
            alt="Tools for Free Logo"
            width={40}
            height={40}
            className="mr-2"
            priority
          />
        )}
        <span className="text-2xl font-bold text-white">Tools for Free</span>
      </div>
    </Link>
  );
};

export default Logo; 