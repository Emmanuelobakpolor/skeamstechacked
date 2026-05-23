'use client';

import { motion } from 'framer-motion';
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
    role: 'Property Developer, usa',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function Testimonials() {
  return (
    <section
      className="relative z-10"
      style={{ padding: '5rem 1.25rem', overflow: 'hidden' }}
    >
      {/* Background accents */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background:
            'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: '350px',
          height: '350px',
          background:
            'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* Section Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#60a5fa',
              background: 'rgba(59,130,246,0.1)',
              border: '0.5px solid rgba(96,165,250,0.3)',
              padding: '5px 16px',
              borderRadius: '99px',
              marginBottom: '1rem',
            }}
          >
            Testimonials
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#fff',
              margin: '0 0 0.75rem',
            }}
          >
            What Our{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Clients
            </span>{' '}
            Say
          </h2>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: '#93c5fd',
              maxWidth: '550px',
              margin: '0 auto',
            }}
          >
            Trusted by homeowners and businesses across Nigeria for smart
            security, solar energy, and automation solutions.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.25rem',
          }}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={item}
              style={{
                position: 'relative',
                padding: '1.75rem',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                cursor: 'default',
                transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(96,165,250,0.35)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Quote icon */}
              <div
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  opacity: 0.08,
                }}
              >
                <Quote size={40} color="#fff" />
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px' }}>
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="#fbbf24"
                    color="#fbbf24"
                  />
                ))}
              </div>

              {/* Quote text */}
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.85,
                  color: '#d1e4f5',
                  margin: 0,
                  flex: 1,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderTop: '0.5px solid rgba(255,255,255,0.07)',
                  paddingTop: '1rem',
                }}
              >
                {/* Profile picture */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '2px solid rgba(96,165,250,0.4)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                    position: 'relative',
                  }}
                >
                  <Image
                    src={t.image}
                    alt={t.author}
                    fill
                    sizes="48px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#fff',
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {t.author}
                  </p>
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#7dd3fc',
                      margin: '2px 0 0',
                      lineHeight: 1.3,
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
