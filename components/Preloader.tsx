'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => setVisible(false), 600);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-blue-600 transition-opacity duration-600 ${
        exiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Spinner ring */}
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="absolute w-28 h-28 rounded-full border-[3px] border-white/10 border-t-white animate-spin" />

        {/* Inner subtle ring */}
        <div className="absolute w-20 h-20 rounded-full border-[2px] border-white/5 border-b-white/30 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />

        {/* Logo */}
        <div className="relative w-12 h-12">
          <Image
            src="/images/SKEAM SYMBOL .png"
            alt=""
            fill
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
}
