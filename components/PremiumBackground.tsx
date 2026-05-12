'use client';

export default function PremiumBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950">
      {/* Static base gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/8 via-cyan-600/4 to-blue-600/8" />

      {/* Static primary glow */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Static secondary glow */}
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Simplified wave pattern - top - STATIC */}
      <svg
        className="absolute top-0 left-0 w-full h-24 opacity-25 pointer-events-none"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,50 Q300,15 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="url(#waveGradient1)"
        />
      </svg>

      {/* Simplified wave pattern - bottom - STATIC */}
      <svg
        className="absolute bottom-0 left-0 w-full h-24 opacity-20 pointer-events-none"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,70 Q300,35 600,70 T1200,70 L1200,0 L0,0 Z"
          fill="url(#waveGradient2)"
        />
      </svg>

      {/* Reduced grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:80px_80px] opacity-10 pointer-events-none" />

      {/* Subtle static vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 65%)',
        }}
      />

      {/* Inner glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/20 pointer-events-none" />
    </div>
  );
}
