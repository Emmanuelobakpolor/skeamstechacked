'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Cog,
  PhoneCall,
  LucideIcon,
} from 'lucide-react';
import DiscountDisplay from './DiscountDisplay';

interface Service {
  id: number;
  title: string;
  description: string;
  image?: string;
  icon?: LucideIcon;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Gate Automation Systems',
    description: 'Professional installation and maintenance of automated gate systems for residential and commercial properties. Reliable, secure, and convenient access control.',
    image: '/images/Gate .PNG',
  },
  {
    id: 2,
    title: 'CCTV Surveillance',
    description: 'Complete CCTV camera installation, configuration, and monitoring solutions. Keep your property secure with professional surveillance systems.',
    image: '/images/CCTV .PNG',
  },
  {
    id: 3,
    title: 'Solar Energy Solutions',
    description: 'Full-service solar panel installation and maintenance. Harness renewable energy to power your home or business with clean, sustainable electricity.',
    image: '/images/solarrr.jpeg',
  },
  {
    id: 4,
    title: 'Inverter Systems',
    description: 'Quality inverter sales, installation, and support. Ensure uninterrupted power supply for your critical equipment and appliances.',
    image: '/images/Inverter .PNG',
  },
  {
    id: 5,
    title: 'System Integration',
    description: 'Comprehensive integration of security and power systems. We design solutions that work together seamlessly for maximum efficiency.',
    image: '/images/Inverter .PNG',
  },
  {
    id: 6,
    title: 'Maintenance & Support',
    description: 'Ongoing maintenance, repairs, and 24/7 technical support. We ensure your systems continue to perform at their best long after installation.',
    image: '/images/File black man .PNG',
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function Services() {
  return (
    <section id="services" className="section-container relative z-10">
      <div className="section-inner">
        {/* Section Header */}
        <motion.div
          className="max-w-2xl mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl font-bold leading-snug text-white mb-6">Our Services</h2>
          <p className="text-lg leading-relaxed text-blue-200">
            Professional installation and maintenance services for gate automation, CCTV surveillance, solar energy, and inverter systems across Nigeria.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const hasImage = 'image' in service;
            return (
              <motion.div
                key={service.id}
                className="group relative bg-blue-800/40 rounded-2xl border border-blue-600/50 hover:border-blue-400 hover:bg-blue-800/70 transition-all duration-200 shadow-lg overflow-hidden flex flex-col h-full min-h-[600px]"
                variants={item}
              >
                {/* Image for services with images */}
                {hasImage && service.image && (
                  <div className="relative w-full h-60 overflow-hidden bg-gradient-to-br from-blue-600/20 to-cyan-600/10 flex-shrink-0">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    {/* Discount badge overlay */}
                    <div className="absolute top-3 right-3">
                      <DiscountDisplay
                        serviceType={service.title}
                        showBadge={true}
                      />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 p-10 md:p-10 flex flex-col flex-grow">
                  {/* Icon for services without images */}
                  {!hasImage && Icon && (
                    <div className="mb-6 w-14 h-14 bg-gradient-to-br from-blue-600/40 to-cyan-600/20 rounded-xl flex items-center justify-center border border-blue-500/50 group-hover:border-blue-400 group-hover:shadow-lg transition-all duration-200">
                      <Icon className="w-7 h-7 text-blue-300 group-hover:text-blue-200 transition-colors duration-150" />
                    </div>
                  )}

                  {/* Title & Description */}
                  <div className="flex-grow">
                    <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-blue-100 transition-colors duration-150">
                      {service.title}
                    </h3>
                    <p className="text-base leading-relaxed text-blue-100 group-hover:text-blue-50 transition-colors duration-150">
                      {service.description}
                    </p>
                  </div>

                  {/* Link */}
                  <div className="mt-6 pt-6 border-t border-blue-600/30">
                    <a
                      href="/shop"
                      className="inline-flex items-center text-blue-300 font-semibold hover:text-blue-100 hover:translate-x-1 transition-all duration-200 gap-2"
                    >
                      Learn More
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
