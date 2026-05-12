'use client';

import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { ArrowRight, Sparkles, Sun, Zap, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80',
    label: 'Advanced Solar Technology for a Sustainable Future',
  },
  {
    image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1920&q=80',
    label: 'Precision Solar Installations Engineered for Maximum Yield',
  },
  {
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&q=80',
    label: 'Clean Energy Solutions Built to Last',
  },
  {
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=80',
    label: 'Powering Tomorrow with Renewable Energy Today',
  },
  {
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1920&q=80',
    label: 'Smart Automation & Security for the Modern Home',
  },
  {
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&q=80',
    label: 'Intelligent Energy Management at Your Fingertips',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  // Auto-advance every 5.5s; resetKey restarts countdown on manual nav
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [resetKey]);

  function goToSlide(idx: number) {
    setCurrentSlide(idx);
    setResetKey((k) => k + 1);
  }

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative w-full min-h-screen overflow-hidden bg-slate-950">

        {/* ── LAYER 0: Crossfading background slides ── */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              style={{
                backgroundImage: `url('${slides[currentSlide].image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </AnimatePresence>

          {/* Dark vignette overlays — deepen edges so text pops on any image */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/25 to-slate-950/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-transparent to-slate-950/40" />
        </div>

        {/* ── LAYER 1: Text content ── */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
          <div className="section-inner w-full">
            <motion.div
              className="flex flex-col items-center text-center max-w-4xl mx-auto py-24 gap-0"
              variants={container}
              initial="hidden"
              animate="visible"
            >

              {/* ── FROSTED GLASS PANEL ── */}
              <motion.div
                variants={item}
                className="w-full rounded-3xl px-8 py-10 md:px-14 md:py-14 backdrop-blur-xl bg-slate-900/45 border border-white/10 shadow-2xl flex flex-col items-center gap-8"
              >
                {/* Badge */}
                <motion.div variants={item} whileHover={{ scale: 1.05 }}>
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500/20 via-cyan-500/15 to-blue-500/10 text-blue-100 text-sm font-semibold rounded-full border border-blue-400/40 backdrop-blur-xl hover:border-blue-300/60 transition-all duration-300 group">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                    Advanced Smart Solutions
                  </span>
                </motion.div>

                {/* Main Headline */}
                <motion.div variants={item} className="space-y-4">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
                    Smart{' '}
                    <span className="gradient-text">Automation</span>
                    {' '}&amp;{' '}
                    <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-400 bg-clip-text text-transparent">
                      Solar Power
                    </span>
                  </h1>
                </motion.div>

                {/* Static subtitle */}
                <motion.p
                  variants={item}
                  className="text-lg md:text-xl leading-relaxed text-blue-100/90 max-w-2xl font-light"
                >
                  Experience the future of energy management and security. Premium gate automation,
                  CCTV surveillance, solar energy systems, and inverter solutions engineered for excellence.
                </motion.p>

                {/* Per-slide transitioning label */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`label-${currentSlide}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5 }}
                    className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-300/80"
                  >
                    {slides[currentSlide].label}
                  </motion.p>
                </AnimatePresence>

                {/* Features List */}
                <motion.div variants={item} className="flex flex-col sm:flex-row gap-6 pt-2 justify-center">
                  {[
                    { icon: Sun, text: 'Advanced Solar Technology' },
                    { icon: Zap, text: 'Smart Energy Management' },
                    { icon: Shield, text: '24/7 Security Monitoring' },
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-3 text-blue-100/80"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/15 border border-cyan-400/30 flex-shrink-0">
                        <feature.icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-sm md:text-base font-medium">{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  variants={item}
                  className="flex flex-col sm:flex-row gap-4 pt-2 justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center gap-2">
                      Request a Quote
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group px-8 py-4 bg-gradient-to-r from-blue-900/40 via-cyan-900/30 to-blue-900/40 text-white font-semibold rounded-lg border-2 border-blue-400/50 hover:border-cyan-400/70 hover:bg-blue-900/60 transition-all duration-300 backdrop-blur-xl"
                  >
                    Explore Services
                  </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  variants={item}
                  className="grid grid-cols-3 gap-6 pt-6 w-full border-t border-blue-600/20"
                >
                  {[
                    { value: '500+', label: 'Installations', icon: '⚡' },
                    { value: '10+', label: 'Years Experience', icon: '🏆' },
                    { value: '24/7', label: 'Support', icon: '🛡️' },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      className="group flex flex-col items-center"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-300">
                        {stat.value}
                      </p>
                      <p className="text-xs md:text-sm text-blue-300/80 mt-1 group-hover:text-blue-300 transition-colors duration-300">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

            </motion.div>
          </div>
        </div>

        {/* ── LAYER 2: Slide dot indicators ── */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-3 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-500 ease-out rounded-full ${
                idx === currentSlide
                  ? 'w-8 h-2.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                  : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </section>
    </MotionConfig>
  );
}
