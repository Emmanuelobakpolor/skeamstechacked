'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    <section className="relative w-full min-h-screen overflow-hidden bg-gray-900">

      {/* Background slides */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{
              backgroundImage: `url('${slides[currentSlide].image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl mx-auto text-center">

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white mb-4">
            Smart Automation &amp; Solar Power
          </h1>

          {/* Subtitle */}
          <p className="text-base lg:text-lg leading-relaxed text-white/80 max-w-2xl mx-auto mb-6">
            Premium gate automation, CCTV surveillance, solar energy systems, and inverter solutions engineered for excellence.
          </p>

          {/* Per-slide label */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`label-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs sm:text-sm font-medium tracking-wide uppercase text-white/60 mb-8"
            >
              {slides[currentSlide].label}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/50 text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              Explore Services
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/20 max-w-md mx-auto">
            {[
              { value: '500+', label: 'Installations' },
              { value: '10+', label: 'Years Experience' },
              { value: '24/7', label: 'Support' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-xl sm:text-2xl font-semibold text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-white/60 mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center items-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? 'w-6 h-2 bg-blue-600'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
