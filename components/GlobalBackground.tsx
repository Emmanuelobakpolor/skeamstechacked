'use client';

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 -z-50">
      {/* Static base gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-cyan-600/3 to-blue-600/5" />

      {/* Static radial glow */}
      <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/12 rounded-full blur-2xl pointer-events-none" />

      {/* Static secondary glow */}
      <div className="absolute -bottom-1/4 -right-1/4 w-[550px] h-[550px] bg-cyan-500/8 rounded-full blur-2xl pointer-events-none" />

      {/* Simplified mesh/grid background - static */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-10 pointer-events-none" />

      {/* Top wave pattern - STATIC */}
      <svg
        className="absolute top-0 left-0 w-full h-32 opacity-20 pointer-events-none"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="topWaveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,50 Q300,20 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="url(#topWaveGradient)"
        />
      </svg>

      {/* Bottom wave pattern - STATIC */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32 opacity-15 pointer-events-none"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="bottomWaveGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,80 Q300,50 600,80 T1200,80 L1200,0 L0,0 Z"
          fill="url(#bottomWaveGradient)"
        />
      </svg>

      {/* Subtle radial vignette - static */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
        }}
      />

      {/* Dark vignette edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/15 via-transparent to-slate-950/30 pointer-events-none" />
    </div>
  );
}
