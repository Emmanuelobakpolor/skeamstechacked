'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Content {
  id: string;
  name: string;
  type: 'banner' | 'discount-ad';
  url: string;
}

// HARDCODED BANNERS - WhatsApp videos
const HARDCODED_BANNERS: Content[] = [
  {
    id: 'video-1',
    name: 'WhatsApp Video 1',
    type: 'banner',
    url: '/images/WhatsApp Video 2026-05-18 at 21.03.52.mp4',
  },
  {
    id: 'video-2',
    name: 'WhatsApp Video 2',
    type: 'banner',
    url: '/images/WhatsApp Video 2026-05-18 at 21.03.53.mp4',
  },
  {
    id: 'video-3',
    name: 'WhatsApp Video 3',
    type: 'banner',
    url: '/images/WhatsApp Video 2026-05-18 at 21.03.54 (1).mp4',
  },
  {
    id: 'video-4',
    name: 'WhatsApp Video 4',
    type: 'banner',
    url: '/images/WhatsApp Video 2026-05-18 at 21.03.54.mp4',
  },
];

function Carousel({ items, interval = 4500 }: { items: Content[]; interval?: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrent(prev => (prev - 1 + items.length) % items.length);
  };

  if (items.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/1', minHeight: '350px' }}>
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="relative w-full h-full flex-shrink-0"
          >
            <video
              src={item.url}
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Left Gradient Overlay */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/25 to-transparent z-10 pointer-events-none" />

      {/* Right Gradient Overlay */}
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/25 to-transparent z-10 pointer-events-none" />

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Previous slide"
          >
            <span className="text-2xl">‹</span>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Next slide"
          >
            <span className="text-2xl">›</span>
          </button>
        </>
      )}

      {/* Indicator Dots */}
      {items.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === current
                  ? 'bg-white w-8 h-2.5'
                  : 'bg-white/50 w-2.5 h-2.5 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ContentDisplay() {
  return (
    <>
      {/* Banners Carousel Section */}
      {HARDCODED_BANNERS.length > 0 && (
        <section className="w-full bg-black">
          <Carousel items={HARDCODED_BANNERS} interval={4500} />
        </section>
      )}
    </>
  );
}
