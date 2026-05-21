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

        {/* Background slides */}
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
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-slate-950/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            className="w-full max-w-4xl mx-auto"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Glass panel */}
            <motion.div
              variants={item}
              className="w-full rounded-2xl sm:rounded-3xl px-5 py-8 sm:px-10 sm:py-12 md:px-14 md:py-14 backdrop-blur-xl bg-slate-900/45 border border-white/10 shadow-2xl flex flex-col items-center gap-6 sm:gap-8"
            >

              {/* Badge */}
              <motion.div variants={item} whileHover={{ scale: 1.05 }}>
                <span className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-blue-500/20 via-cyan-500/15 to-blue-500/10 text-blue-100 text-xs sm:text-sm font-semibold rounded-full border border-blue-400/40 backdrop-blur-xl">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </motion.div>
                  Advanced Smart Solutions
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div variants={item}>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white text-center">
                  Smart{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                    Automation
                  </span>
                  {' '}&amp;{' '}
                  <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-400 bg-clip-text text-transparent">
                    Solar Power
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={item}
                className="text-sm sm:text-base lg:text-lg leading-relaxed text-blue-100/90 max-w-2xl font-light text-center"
              >
                Experience the future of energy management and security. Premium gate automation,
                CCTV surveillance, solar energy systems, and inverter solutions engineered for excellence.
              </motion.p>

              {/* Per-slide label */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`label-${currentSlide}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                  className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-cyan-300/80 text-center px-2"
                >
                  {slides[currentSlide].label}
                </motion.p>
              </AnimatePresence>

              {/* Features */}
              <motion.div
                variants={item}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1 justify-center items-center sm:items-start w-full"
              >
                {[
                  { icon: Sun, text: 'Advanced Solar Technology' },
                  { icon: Zap, text: 'Smart Energy Management' },
                  { icon: Shield, text: '24/7 Security Monitoring' },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-blue-100/80"
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-400/30 flex-shrink-0">
                      <feature.icon className="w-3 h-3 text-cyan-400" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{feature.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={item}
                className="flex flex-col sm:flex-row gap-3 pt-1 justify-center w-full sm:w-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center gap-1.5">
                    Request a Quote
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-900/40 via-cyan-900/30 to-blue-900/40 text-white text-sm font-semibold rounded-lg border-2 border-blue-400/50 hover:border-cyan-400/70 hover:bg-blue-900/60 transition-all duration-300 backdrop-blur-xl"
                >
                  Explore Services
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={item}
                className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 w-full border-t border-blue-600/20"
              >
                {[
                  { value: '500+', label: 'Installations', icon: '⚡' },
                  { value: '10+', label: 'Years Experience', icon: '🏆' },
                  { value: '24/7', label: 'Support', icon: '🛡️' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    className="flex flex-col items-center"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-[10px] sm:text-xs text-blue-300/80 mt-0.5 text-center leading-tight">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

            </motion.div>
          </motion.div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-5 sm:bottom-8 left-0 right-0 flex justify-center items-center gap-2 sm:gap-3 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-500 ease-out rounded-full ${
                idx === currentSlide
                  ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/30 hover:bg-white/60'
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