'use client';

import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    quote:
      'Skeam Technologies installed our automated gate and CCTV system. The quality is top-notch and the team was very professional. I feel much safer in my home now.',
    author: 'Adebayo Ogunlade',
    role: 'Homeowner, Lekki, Lagos',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 2,
    quote:
      'We switched to solar with Skeam and our electricity bills dropped by over 70%. Their inverter setup is reliable and we haven\'t had downtime since installation.',
    author: 'Chidinma Nwosu',
    role: 'Business Owner, Abuja',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 3,
    quote:
      'They handled our entire office security — access control, CCTV, and alarm systems. Very knowledgeable team. I recommend them to every business owner I know.',
    author: 'Emeka Afolabi',
    role: 'MD, Afolabi & Sons Ltd, Port Harcourt',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 4,
    quote:
      'From consultation to installation, Skeam Technologies delivered beyond expectations. Our gate automation works flawlessly and customer support is always available.',
    author: 'Fatima Ibrahim',
    role: 'Estate Manager, Kano',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 5,
    quote:
      'I\'ve worked with several tech companies in Nigeria but Skeam stands out. They installed solar panels for our warehouse and the system has been running perfectly for over a year.',
    author: 'Oluwaseun Bakare',
    role: 'Logistics Manager',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 6,
    quote:
      'Professional, affordable, and reliable. They upgraded our old security cameras to a modern HD system with remote monitoring. Now I can check my property from anywhere.',
    author: 'Ngozi Eze',
    role: 'Property Developer, USA',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-5 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
            Testimonials
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
            What Our <span className="text-blue-600">Clients</span> Say
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Trusted by homeowners and businesses across Nigeria for smart
            security, solar energy, and automation solutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative p-6 rounded-xl bg-white border border-gray-200 flex flex-col gap-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 opacity-5">
                <Quote size={36} className="text-gray-900" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-sm leading-relaxed text-gray-600 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                  <Image
                    src={t.image}
                    alt={t.author}
                    fill
                    sizes="40px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {t.author}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
