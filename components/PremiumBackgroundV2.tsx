'use client';

export default function PremiumBackgroundV2() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950">
      {/* Static base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/5 to-blue-600/10" />

      {/* Static gradient mesh - NO ANIMATION for performance */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Static waves - NO ANIMATION */}
      <svg
        className="absolute top-0 left-0 w-full h-40 opacity-25 pointer-events-none"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="premiumWaveTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,60 Q300,30 600,60 T1200,60 L1200,160 L0,160 Z"
          fill="url(#premiumWaveTop)"
        />
      </svg>

      {/* Static waves - NO ANIMATION */}
      <svg
        className="absolute bottom-0 left-0 w-full h-40 opacity-20 pointer-events-none"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="premiumWaveBottom" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,100 Q300,60 600,100 T1200,100 L1200,0 L0,0 Z"
          fill="url(#premiumWaveBottom)"
        />
      </svg>

      {/* Static glassmorphism - NO ANIMATION */}
      <div className="absolute top-1/4 left-1/4 w-72 h-40 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl pointer-events-none" />

      <div className="absolute bottom-1/3 right-1/4 w-64 h-36 rounded-2xl backdrop-blur-lg bg-cyan-500/5 border border-cyan-400/10 shadow-xl pointer-events-none" />

      {/* Radial glow accents */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-blue-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(59,130,246,0.015)_1px,transparent_1px),linear-gradient(rgba(59,130,246,0.015)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />

      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-transparent to-slate-950/20 pointer-events-none" />
    </div>
  );
}