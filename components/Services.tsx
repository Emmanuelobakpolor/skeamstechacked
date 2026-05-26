'use client';

import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    id: 1,
    title: 'Gate Automation',
    description: 'Professional installation and maintenance of automated gate systems for residential and commercial properties.',
    image: '/images/6CFD9663-D800-4C1C-904B-D189DE4CCA1C.PNG',
    tag: 'Residential',
    color: 'blue',
  },
  {
    id: 2,
    title: 'CCTV Surveillance',
    description: 'Complete camera installation, configuration, and monitoring solutions for professional surveillance.',
    image: '/images/C9FABEAC-B7A0-42E6-B0EB-E9600FB8F61D.PNG',
    tag: 'Security',
    color: 'blue',
  },
  {
    id: 3,
    title: 'Solar Energy',
    description: 'Full-service solar panel installation and maintenance. Harness clean, renewable energy for your home or business.',
    image: '/images/solarrr.jpeg',
    tag: 'Renewable',
    color: 'green',
  },
  {
    id: 4,
    title: 'Inverter Systems',
    description: 'Quality inverter sales, installation, and support for uninterrupted power supply to critical equipment.',
    image: '/images/Inverter .PNG',
    tag: 'Power',
    color: 'amber',
  },
  {
    id: 5,
    title: 'System Integration',
    description: 'Comprehensive integration of security and power systems designed to work together seamlessly.',
    image: '/images/CE9C4598-F444-4204-B43D-7BEBBD6FDA4D.PNG',
    tag: 'Smart',
    color: 'purple',
  },
  {
    id: 6,
    title: 'Maintenance & Support',
    description: 'Ongoing maintenance, repairs, and 24/7 technical support to keep your systems performing at their best.',
    image: '/images/File black man .PNG',
    tag: '24/7',
    color: 'blue',
  },
];

const colorMap = {
  blue: {
    accent: 'bg-blue-600',
    tag: 'bg-blue-50 text-blue-700 border border-blue-200',
    link: 'text-blue-600',
  },
  green: {
    accent: 'bg-green-600',
    tag: 'bg-green-50 text-green-700 border border-green-200',
    link: 'text-green-600',
  },
  amber: {
    accent: 'bg-amber-600',
    tag: 'bg-amber-50 text-amber-700 border border-amber-200',
    link: 'text-amber-600',
  },
  purple: {
    accent: 'bg-purple-600',
    tag: 'bg-purple-50 text-purple-700 border border-purple-200',
    link: 'text-purple-600',
  },
};

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 bg-white">

      {/* Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
          What we do
        </span>
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Our Services</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          Professional installation and maintenance for gate automation, CCTV, solar energy, and inverter systems across Nigeria.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {services.map((service, index) => {
          const c = colorMap[service.color as keyof typeof colorMap];
          return (
            <div
              key={service.id}
              className="group relative bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md rounded-xl flex flex-col overflow-hidden transition-all duration-200"
            >
              {/* Accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 z-10 ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />

              {/* Image */}
              <div className="relative w-full h-60 overflow-hidden bg-gradient-to-br from-blue-600/20 to-cyan-600/10 flex-shrink-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 p-6 flex-1">
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900 mb-1.5">{service.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  <span className={`text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full ${c.tag}`}>
                    {service.tag}
                  </span>
                  <Link
                    href="/shop"
                    className={`text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all duration-150 ${c.link}`}
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
