'use client';

import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="bg-blue-600 rounded-2xl p-12 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Ready to Transform Your Enterprise?
          </h2>
          <p className="text-base md:text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join hundreds of leading companies that trust SKEAM Technologies for their mission-critical operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200 gap-2"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
            {[
              { value: '98%', label: 'Uptime SLA' },
              { value: '24/7', label: 'Support' },
              { value: '500+', label: 'Trusted Clients' },
            ].map((badge, idx) => (
              <div key={idx}>
                <p className="text-2xl font-semibold">{badge.value}</p>
                <p className="text-sm opacity-75 mt-1">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
