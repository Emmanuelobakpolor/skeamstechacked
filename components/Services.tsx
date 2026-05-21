'use client';

import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    id: 1,
    title: 'Gate Automation',
    description: 'Professional installation and maintenance of automated gate systems for residential and commercial properties.',
    image: '/images/6CFD9663-D800-4C1C-904B-D189DE4CCA1C.PNG',
    tag: '🏠 Residential',
    color: 'blue',
  },
  {
    id: 2,
    title: 'CCTV Surveillance',
    description: 'Complete camera installation, configuration, and monitoring solutions for professional surveillance.',
    image: '/images/C9FABEAC-B7A0-42E6-B0EB-E9600FB8F61D.PNG',
    tag: '🛡 Security',
    color: 'blue',
  },
  {
    id: 3,
    title: 'Solar Energy',
    description: 'Full-service solar panel installation and maintenance. Harness clean, renewable energy for your home or business.',
    image: '/images/solarrr.jpeg',
    tag: '🌿 Renewable',
    color: 'green',
  },
  {
    id: 4,
    title: 'Inverter Systems',
    description: 'Quality inverter sales, installation, and support for uninterrupted power supply to critical equipment.',
    image: '/images/Inverter .PNG',
    tag: '⚡ Power',
    color: 'amber',
  },
  {
    id: 5,
    title: 'System Integration',
    description: 'Comprehensive integration of security and power systems designed to work together seamlessly.',
    image: '/images/CE9C4598-F444-4204-B43D-7BEBBD6FDA4D.PNG',
    tag: '🔗 Smart',
    color: 'purple',
  },
  {
    id: 6,
    title: 'Maintenance & Support',
    description: 'Ongoing maintenance, repairs, and 24/7 technical support to keep your systems performing at their best.',
    image: '/images/File black man .PNG',
    tag: '📞 24/7',
    color: 'blue',
  },
];

const colorMap = {
  blue: {
    accent: 'bg-[#378ADD]',
    tag: 'bg-[#E6F1FB] text-[#185FA5] border border-[#85B7EB]',
    link: 'text-[#378ADD]',
  },
  green: {
    accent: 'bg-[#639922]',
    tag: 'bg-[#EAF3DE] text-[#3B6D11] border border-[#97C459]',
    link: 'text-[#639922]',
  },
  amber: {
    accent: 'bg-[#BA7517]',
    tag: 'bg-[#FAEEDA] text-[#854F0B] border border-[#EF9F27]',
    link: 'text-[#BA7517]',
  },
  purple: {
    accent: 'bg-[#534AB7]',
    tag: 'bg-[#EEEDFE] text-[#534AB7] border border-[#AFA9EC]',
    link: 'text-[#534AB7]',
  },
};

export default function Services() {
  return (
    <section id="services" className="py-20 px-4">

      {/* Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-widest uppercase text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
          ⚡ What we do
        </span>
        <h2 className="text-3xl font-medium text-white mb-2">Our Services</h2>
        <p className="text-sm text-blue-200 max-w-md mx-auto leading-relaxed">
          Professional installation and maintenance for gate automation, CCTV, solar energy, and inverter systems across Nigeria.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {services.map((service, index) => {
          const c = colorMap[service.color as keyof typeof colorMap];
          return (
            <div
              key={service.id}
              className="group relative bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 rounded-xl flex flex-col overflow-hidden transition-all duration-200 cursor-pointer"
            >
              {/* Accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 z-10 ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />

              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-white/5">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 p-8 flex-1">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-white mb-1.5">{service.title}</h3>
                  <p className="text-xs text-blue-200 leading-relaxed">{service.description}</p>
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                  <span className={`text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full ${c.tag}`}>
                    {service.tag}
                  </span>
                  <Link
                    href="/shop"
                    className={`text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-150 ${c.link}`}
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