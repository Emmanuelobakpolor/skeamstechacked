'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShieldCheck, Zap, Users, Clock } from 'lucide-react';

const stats = [
  {
    value: 500,
    suffix: '+',
    label: 'Projects Completed',
    description: 'Homes & businesses secured across Nigeria',
    icon: ShieldCheck,
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
  },
  {
    value: 10,
    suffix: '+',
    label: 'Years Experience',
    description: 'Trusted expertise since day one',
    icon: Clock,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Trained Technicians',
    description: 'Certified professionals on our team',
    icon: Users,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Customer Support',
    description: 'Always available when you need us',
    icon: Zap,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
  },
];

function CountUp({ end, suffix, duration = 2 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '-80px',
  });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  return (
    <section
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '4rem 1.25rem',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '300px',
          background:
            'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}
        ref={ref}
      >
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                style={{
                  position: 'relative',
                  padding: '2rem 1.5rem',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '0.5px solid rgba(255,255,255,0.08)',
                  textAlign: 'center',
                  cursor: 'default',
                  transition: 'border-color 0.25s, background 0.25s, transform 0.25s',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${stat.color}50`;
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Glow ring behind icon */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${stat.color}12 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: `${stat.color}15`,
                    border: `1px solid ${stat.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    position: 'relative',
                  }}
                >
                  <Icon size={22} color={stat.color} strokeWidth={2} />
                </div>

                {/* Number */}
                <p
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                    fontWeight: 800,
                    lineHeight: 1,
                    background: stat.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    margin: '0 0 0.5rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {inView && (
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                  )}
                </p>

                {/* Label */}
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#fff',
                    margin: '0 0 0.35rem',
                    letterSpacing: '0.01em',
                  }}
                >
                  {stat.label}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: '12px',
                    lineHeight: 1.5,
                    color: '#7dd3fc',
                    margin: 0,
                  }}
                >
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
