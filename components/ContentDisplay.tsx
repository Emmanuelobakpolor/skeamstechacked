'use client';

import { useState, useEffect, useRef } from 'react';

interface Content {
  id: string;
  name: string;
  type: 'banner' | 'discount-ad';
  url: string;
}

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

function Carousel({ items, interval = 7000 }: { items: Content[]; interval?: number }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === current) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [current]);

  const goTo = (index: number) => setCurrent(index);
  const next = () => setCurrent(prev => (prev + 1) % items.length);
  const prev = () => setCurrent(prev => (prev - 1 + items.length) % items.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (items.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden bg-white"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative flex-shrink-0"
            style={{ width: '100%' }}
          >
            <video
              ref={el => { videoRefs.current[index] = el; }}
              src={item.url}
              autoPlay={index === 0}
              muted
              loop
              playsInline
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>


      {/* Arrows — desktop only */}
      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full items-center justify-center transition-colors duration-200"
            aria-label="Previous slide"
          >
            <span className="text-xl leading-none">‹</span>
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full items-center justify-center transition-colors duration-200"
            aria-label="Next slide"
          >
            <span className="text-xl leading-none">›</span>
          </button>
        </>
      )}

      {/* Dots */}
      {items.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`rounded-full transition-all duration-300 ${
                index === current
                  ? 'bg-white w-5 h-1.5'
                  : 'bg-white/50 w-1.5 h-1.5 hover:bg-white/80'
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
      {HARDCODED_BANNERS.length > 0 && (
        <section className="w-full bg-white">
          <Carousel items={HARDCODED_BANNERS} interval={2500} />
        </section>
      )}
    </>
  );
}