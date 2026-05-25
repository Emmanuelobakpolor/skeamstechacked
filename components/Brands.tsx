'use client';

import Image from 'next/image';

const brands = [
  { id: 1, name: 'NSPM', logo: '/images/WhatsApp Image 2026-05-05 at 07.59.34 (1).jpeg' },
  { id: 2, name: 'Centurion', logo: '/images/WhatsApp Image 2026-05-05 at 07.59.34 (2).jpeg' },
  { id: 3, name: 'Lekki Lagos Free Zone', logo: '/images/WhatsApp Image 2026-05-05 at 07.59.34 (3).jpeg' },
  { id: 4, name: 'E&E Solutions', logo: '/images/WhatsApp Image 2026-05-05 at 07.59.34.jpeg' },
  { id: 5, name: 'Heroes For Christ', logo: '/images/WhatsApp Image 2026-05-05 at 07.59.35 (1).jpeg' },
  { id: 6, name: 'Torima Technology', logo: '/images/WhatsApp Image 2026-05-05 at 07.59.35.jpeg' },
];

export default function Brands() {
  const extendedBrands = [...brands, ...brands];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 text-center mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">Brands We've Worked With</h2>
          <p className="text-base text-gray-500">
            Trusted partnerships with industry leaders and innovative organizations.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-44 md:h-52 flex items-center overflow-hidden rounded-xl bg-gray-50 border border-gray-200">
          {/* Left fade overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />

          {/* Right fade overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          {/* Scrolling content */}
          <div className="flex gap-8 md:gap-12 whitespace-nowrap px-8 brand-scroll">
            {extendedBrands.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0 flex flex-col items-center justify-center min-w-max"
              >
                <div className="relative w-36 h-24 md:w-44 md:h-28 rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 768px) 144px, 176px"
                  />
                </div>

                <p className="mt-3 text-center text-gray-700 font-medium text-sm">
                  {brand.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
