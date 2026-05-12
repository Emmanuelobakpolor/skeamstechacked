'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PremiumBackgroundV2 from './PremiumBackgroundV2';

const brands = [
  { id: 1, name: 'NSPM', logo: '/images/WhatsApp Image 2026-05-05 at 07.59.34 (1).jpeg' },
  { id: 2, name: 'Centurion', logo: '/images/WhatsApp Image 2026-05-05 at 07.59.34 (2).jpeg' },
  { id: 3, name: 'Lekki Lagos Free Zone', logo: '/images/WhatsApp Image 2026-05-05 at 07.59.34 (3).jpeg' },
  { id: 4, name: 'E&E Solutions', logo: '/images/WhatsApp Image 2026-05-05 at 07.59.34.jpeg' },
  { id: 5, name: 'Heroes For Christ', logo: '/images/WhatsApp Image 2026-05-05 at 07.59.35 (1).jpeg' },
  { id: 6, name: 'Torima Technology', logo: '/images/WhatsApp Image 2026-05-05 at 07.59.35.jpeg' },
];

export default function Brands() {
  // Duplicate brands for seamless loop
  const extendedBrands = [...brands, ...brands];

  return (
    <section className="section-container relative overflow-hidden">
      <PremiumBackgroundV2 />
      <div className="section-inner relative z-10">
        {/* Section Header */}
        <motion.div
          className="max-w-2xl mb-16 md:mb-20 text-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl font-bold leading-snug text-white mb-6">Brands We've Worked With</h2>
          <p className="text-lg leading-relaxed text-blue-200">
            Trusted partnerships with industry leaders and innovative organizations.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative h-52 md:h-60 flex items-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-900/20 via-slate-900/40 to-blue-900/20 border border-blue-600/20 backdrop-blur-sm">
          {/* Left gradient overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />

          {/* Right gradient overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

          {/* Scrolling content - using CSS animation for performance */}
          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .brand-scroll {
              animation: scroll 40s linear infinite;
              will-change: transform;
            }
          `}</style>
          <div className="flex gap-8 md:gap-12 whitespace-nowrap px-8 brand-scroll">
            {extendedBrands.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0 flex flex-col items-center justify-center min-w-max group cursor-pointer"
              >
                {/* Brand Logo Card */}
                <div className="relative w-36 h-24 md:w-44 md:h-28 rounded-2xl bg-white/90 border border-blue-500/30 shadow-lg overflow-hidden transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,_130,_246,_0.4)]">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 768px) 144px, 176px"
                  />
                </div>

                {/* Brand Name */}
                <p className="mt-4 text-center text-white font-semibold text-sm md:text-base group-hover:text-blue-300 transition-colors duration-150">
                  {brand.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="mt-12 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
      </div>
    </section>
  );
}
