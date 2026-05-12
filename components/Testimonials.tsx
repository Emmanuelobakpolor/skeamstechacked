'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    quote: 'Skream Technologies transformed our entire infrastructure. Their solutions are reliable, scalable, and innovative.',
    author: 'BR TECHNOLOGIES',
    rating: 5,
    image: '/images/WhatsApp Image 2026-05-05 at 07.59.33.jpeg',
  },
  {
    id: 2,
    quote: 'Outstanding support and cutting-edge technology. They helped us reduce costs by 40% while improving security.',
    author: 'NSPMC ',
    rating: 5,
    image: '/images/WhatsApp Image 2026-05-05 at 07.59.34 (1).jpeg',
  },
  {
    id: 3,
    quote: 'A game-changer for our business. The automation systems alone saved us thousands of hours annually.',
    author: 'CENTURION',
    rating: 5,
    image: '/images/WhatsApp Image 2026-05-05 at 07.59.34 (2).jpeg',
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Testimonials() {
  return (
    <section className="section-container relative z-10">
      <div className="section-inner">
        {/* Section Header */}
        <motion.div
          className="max-w-2xl mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl font-bold leading-snug text-white mb-6">What Our Clients Say</h2>
          <p className="text-lg leading-relaxed text-blue-200">
            Trusted by industry leaders who depend on our expertise and commitment to excellence.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="group relative p-8 md:p-10 flex flex-col gap-6 bg-blue-800/40 rounded-xl border border-blue-600/50 hover:border-blue-400 hover:bg-blue-800/70 transition-all duration-200 shadow-lg overflow-hidden"
              variants={item}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              />

              {/* Profile Image */}
              <div className="relative z-10 flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400/50 group-hover:border-cyan-400 transition-colors duration-300">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-base leading-relaxed text-blue-100 italic group-hover:text-blue-50 transition-colors duration-150 line-clamp-3">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>

              {/* Author */}
              <div className="relative z-10 border-t border-blue-600/30 pt-4 mt-4">
                <p className="font-semibold text-white group-hover:text-blue-100 transition-colors duration-150">
                  {testimonial.author}
                </p>
              
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
