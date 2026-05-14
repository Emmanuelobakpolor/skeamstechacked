'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Animate progress from 0 to 100
    const start = performance.now();
    const duration = 2200; // ms

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      // Ease-out cubic for a smooth deceleration
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(Math.round(eased * 100));

      if (pct < 1) {
        requestAnimationFrame(tick);
      } else {
        // Start exit animation
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => setVisible(false), 700);
        }, 300);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 transition-all duration-700 ${
        exiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] preloader-bg-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-[80px] preloader-bg-pulse-delay" />
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-8">

        {/* Logo container with rings */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">

          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full preloader-spin">
            <svg viewBox="0 0 160 160" className="w-full h-full">
              <defs>
                <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle
                cx="80"
                cy="80"
                r="74"
                fill="none"
                stroke="url(#ring-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="280 180"
              />
            </svg>
          </div>

          {/* Inner counter-spinning ring */}
          <div className="absolute inset-3 rounded-full preloader-spin-reverse">
            <svg viewBox="0 0 140 140" className="w-full h-full">
              <defs>
                <linearGradient id="ring-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle
                cx="70"
                cy="70"
                r="65"
                fill="none"
                stroke="url(#ring-grad-2)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="200 210"
              />
            </svg>
          </div>

          {/* Glow behind logo */}
          <div className="absolute inset-6 rounded-full bg-cyan-500/10 blur-xl preloader-glow" />

          {/* Logo image */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 preloader-float">
            <Image
              src="/images/SKEAM SYMBOL .png"
              alt="SKEAM"
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              priority
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-48 sm:w-56">
          <div className="h-[3px] w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-150 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #3b82f6, #22d3ee, #3b82f6)',
                backgroundSize: '200% 100%',
                animation: 'preloader-bar-shimmer 1.5s ease infinite',
              }}
            />
          </div>
          <p className="text-center text-xs text-blue-300/60 mt-3 font-medium tracking-widest uppercase">
            {progress < 100 ? 'Loading' : 'Ready'}
          </p>
        </div>
      </div>
    </div>
  );
}
