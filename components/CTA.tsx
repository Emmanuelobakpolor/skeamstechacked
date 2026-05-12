'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="section-container relative z-10">
      <div className="section-inner relative">
        {/* Static ambient blobs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          className="relative z-10 bg-gradient-to-r from-blue-800 to-blue-700 rounded-3xl p-12 md:p-20 text-center text-white border border-blue-600 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 relative z-20"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Ready to Transform Your <span className="gradient-text-white">Enterprise?</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto relative z-20"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            Join hundreds of leading companies that trust Skream Technologies for their mission-critical operations.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-20"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200 gap-2">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-200">
              Schedule Demo
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-16 pt-12 border-t border-white/20 relative z-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {[
              { value: '98%', label: 'Uptime SLA' },
              { value: '24/7', label: 'Support' },
              { value: '500+', label: 'Trusted Clients' },
            ].map((badge, idx) => (
              <div key={idx} className="group">
                <p className="text-3xl font-bold group-hover:text-blue-200 transition-colors duration-150">{badge.value}</p>
                <p className="text-sm opacity-75 mt-1">{badge.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
