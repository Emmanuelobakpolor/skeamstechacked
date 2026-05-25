'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

const teamMembers = [
  {
    id: 1,
    name: 'CEO',
    role: 'Chief Executive Officer',
    image: '/images/CEO.PNG',
    bio: 'Visionary leader driving innovation and strategic growth',
  },
  {
    id: 2,
    name: 'Project Manager',
    role: 'Project Manager',
    image: '/images/EMMYK.PNG',
    bio: 'Dedicated to delivering projects on time and on budget',
  },
  {
    id: 3,
    name: 'Technical Specialist',
    role: 'Technical Specialist',
    image: '/images/New Emma web.PNG',
    bio: 'Expert in technical implementation and solutions',
  },
  {
    id: 4,
    name: 'Head Administrator',
    role: 'Head Administrator',
    image: '/images/Delighted .PNG',
    bio: 'Ensures smooth operations and team coordination',
  },
];

const cardTransition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
  mass: 1,
};

function getCardAnimate(distance: number) {
  if (distance === 0) {
    return {
      width: 384,
      height: 580,
      opacity: 1,
      scale: 1,
    };
  }
  if (distance === 1) {
    return {
      width: 256,
      height: 440,
      opacity: 0.6,
      scale: 0.95,
    };
  }
  return {
    width: 210,
    height: 360,
    opacity: 0.35,
    scale: 0.88,
  };
}

export default function Teams() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !isHydrated) return;

    const scrollToCenter = () => {
      const firstCard = cardRefs.current[0];
      if (!container || !firstCard) return;
      setTimeout(() => {
        const cardLeft = firstCard.offsetLeft;
        const cardWidth = firstCard.offsetWidth;
        const containerWidth = container.offsetWidth;
        container.scrollLeft = cardLeft - containerWidth / 2 + cardWidth / 2;
      }, 100);
    };

    scrollToCenter();
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll, isHydrated]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    const card = cardRefs.current[index];
    if (card && scrollRef.current) {
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      const containerWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollLeft = cardLeft - containerWidth / 2 + cardWidth / 2;
    }
  };

  return (
    <section className="relative overflow-hidden py-20 bg-gray-50">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-600 font-medium">
            Meet Our Professionals
          </span>

          <h2 className="mt-6 text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            Our Expert{' '}
            <span className="text-blue-600">Team</span>
          </h2>

          <p className="mt-4 text-base text-gray-500 leading-relaxed">
            Talented professionals dedicated to delivering excellence,
            innovation, and scalable technology solutions.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="space-y-8">
          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll gap-8 pb-6 scroll-smooth snap-x snap-mandatory items-end justify-start
                       [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{
              cursor: 'grab',
              scrollPaddingLeft: '50%',
              scrollPaddingRight: '50%',
            }}
          >
            {/* Left Spacer */}
            <div
              className="flex-shrink-0"
              style={{ width: 'calc(50% - 192px)' }}
              aria-hidden="true"
            />

            {/* Team Cards */}
            {teamMembers.map((member, index) => {
              const distance = Math.abs(index - activeIndex);
              const animateProps = getCardAnimate(distance);
              const initialAnimate = isHydrated ? animateProps : getCardAnimate(Math.abs(index - 0));

              return (
                <motion.div
                  key={member.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="flex-shrink-0 snap-center group relative overflow-hidden rounded-xl border border-gray-200"
                  initial={initialAnimate}
                  animate={animateProps}
                  transition={cardTransition}
                  style={{ originY: 1 }}
                  onClick={() => handleDotClick(index)}
                >
                  {/* Image */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           25vw"
                    className="w-full h-full object-contain"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Social Icons */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href="#"
                      className="p-3 rounded-full bg-white hover:bg-blue-600 hover:text-white text-gray-700 transition-colors duration-200"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-5 h-5" />
                    </a>

                    <a
                      href="#"
                      className="p-3 rounded-full bg-white hover:bg-blue-600 hover:text-white text-gray-700 transition-colors duration-200"
                      aria-label={`Call ${member.name}`}
                    >
                      <Phone className="w-5 h-5" />
                    </a>

                    <a
                      href="#"
                      className="p-3 rounded-full bg-white hover:bg-blue-600 hover:text-white text-gray-700 transition-colors duration-200"
                      aria-label={`LinkedIn ${member.name}`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Active Card Name/Role Overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-5 text-center bg-gradient-to-t from-black/80 to-transparent"
                    animate={{
                      opacity: distance === 0 ? 1 : 0,
                      y: distance === 0 ? 0 : 12,
                      pointerEvents: distance === 0 ? 'auto' : 'none',
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <p className="text-white font-semibold text-lg">
                      {member.name}
                    </p>
                    <p className="text-white/70 text-sm">
                      {member.role}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Right Spacer */}
            <div
              className="flex-shrink-0"
              style={{ width: 'calc(50% - 192px)' }}
              aria-hidden="true"
            />
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2">
            {teamMembers.map((_, i) => (
              <motion.button
                key={i}
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                animate={{
                  width: i === activeIndex ? 28 : 8,
                  height: 8,
                  backgroundColor: i === activeIndex ? '#2563eb' : '#d1d5db',
                }}
                transition={cardTransition}
                onClick={() => handleDotClick(i)}
                aria-label={`Go to ${teamMembers[i].name}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
