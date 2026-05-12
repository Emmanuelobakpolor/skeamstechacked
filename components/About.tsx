'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SkeamTitle from '@/components/SkeamTitle';

const highlights = [
  'Certified gate automation specialists',
  'Professional CCTV installation & maintenance',
  'Complete solar energy solutions',
  'Reliable inverter systems & support',
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function About() {
  return (
    <section id="about" className="section-container relative overflow-hidden z-10">
      {/* Static background blob — no animation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="section-inner relative z-10">
        {/* Header */}
        <motion.div
          className="max-w-3xl mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-5xl md:text-5xl font-bold leading-tight text-white mb-6">About <SkeamTitle /> <span className="gradient-text">Technologies</span></h2>
          <p className="text-lg leading-relaxed text-blue-200">
            A trusted provider of integrated security and power solutions across Nigeria. We specialize in gate automation systems, CCTV surveillance, solar energy installations, and inverter solutions with over 10 years of proven expertise.
          </p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Left Visual */}
          <motion.div
            className="relative h-[400px] rounded-2xl overflow-hidden group shadow-2xl"
            variants={item}
          >
            <Image
              src="/images/Copilot_20260502_160241.png"
              alt="SKEAM Technologies Team"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
          </motion.div>

          {/* Right Content */}
          <motion.div className="flex flex-col gap-10" variants={item}>
            {/* Why Choose Us Section */}
            <div>
              <motion.h3
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Why Choose Us?
              </motion.h3>
              <p className="text-base leading-relaxed text-blue-100 mb-6">
                We combine technical expertise with quality products to deliver reliable, professional services for both residential and commercial properties. Our commitment to excellence ensures your satisfaction every step of the way.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 gap-4">
              {highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-800/40 to-cyan-800/20 border border-blue-600/40 hover:border-blue-400/70 hover:bg-blue-800/50 transition-all duration-200 group backdrop-blur-sm"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.3 }}
                >
                  <div className="flex-shrink-0 mt-1 p-2 bg-gradient-to-br from-blue-500/40 to-cyan-500/20 rounded-lg border border-blue-400/30">
                    <Check className="w-5 h-5 text-blue-200 group-hover:text-blue-100 transition-colors duration-150" />
                  </div>
                  <p className="text-base font-medium leading-relaxed text-blue-100 group-hover:text-white transition-colors duration-150">
                    {highlight}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4 pt-4" variants={item}>
              <button className="px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 hover:shadow-lg transition-all duration-200">
                Our Services
              </button>
              <button className="px-8 py-3 bg-blue-800/50 text-white font-semibold rounded-lg border-2 border-blue-400 hover:bg-blue-700/50 hover:border-blue-300 transition-all duration-200 backdrop-blur-sm">
                Get in Touch
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
