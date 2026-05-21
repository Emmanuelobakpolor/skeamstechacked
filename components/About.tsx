'use client';

import { motion } from 'framer-motion';
import { Check, Target, Eye, Zap, Shield, Sun } from 'lucide-react';
import SkeamTitle from '@/components/SkeamTitle';

const highlights = [
  'Certified gate automation specialists',
  'Professional CCTV installation & maintenance',
  'Complete solar energy solutions',
  'Reliable inverter systems & support',
];

const stats = [
  { value: '500+', label: 'Installations', icon: '⚡' },
  { value: '10+', label: 'Years Active', icon: '📅' },
  { value: '24/7', label: 'Support', icon: '🛡️' },
  { value: '100%', label: 'Satisfaction', icon: '✅' },
];

const pillars = [
  {
    icon: Target,
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.1)',
    border: 'rgba(59,130,246,0.22)',
    label: 'Our Mission',
    text: 'To provide innovative, dependable, and cost-effective technology solutions that enhance security, convenience, automation, and sustainable energy for homes, businesses, and commercial environments.',
  },
  {
    icon: Eye,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.2)',
    label: 'Our Vision',
    text: 'To become a leading technology solutions brand in Nigeria and beyond, recognized for excellence in smart security, renewable energy, automation, and integrated technology systems that empower safer, smarter living.',
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function About() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '3.5rem 1.25rem',
        zIndex: 10,
      }}
    >
      {/* Glow blobs */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '250px',
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* ── HEADER ── */}
        <motion.div
          style={{ marginBottom: '2rem' }}
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: '1rem' }}>
            <span style={{
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.13em',
              textTransform: 'uppercase', color: '#60a5fa',
              background: 'rgba(59,130,246,0.1)',
              border: '0.5px solid rgba(96,165,250,0.3)',
              padding: '4px 13px', borderRadius: '99px',
            }}>
              Who We Are
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              alignItems: 'end',
            }}
          >
            <div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                fontWeight: 700, lineHeight: 1.15,
                color: '#fff', margin: 0,
              }}>
                About <SkeamTitle />{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Technologies
                </span>
              </h2>
            </div>

            <div style={{
              borderLeft: '2px solid rgba(96,165,250,0.2)',
              paddingLeft: '1.25rem',
            }}>
              <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#93c5fd', margin: 0 }}>
                Your trusted partner for{' '}
                <strong style={{ color: '#60a5fa' }}>smart security</strong>,{' '}
                <strong style={{ color: '#34d399' }}>reliable power</strong>, and{' '}
                <strong style={{ color: '#22d3ee' }}>innovative automation</strong>{' '}
                solutions for homes, businesses, and industries across Nigeria.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{
              marginTop: '1.5rem', height: '1px',
              background: 'linear-gradient(90deg, rgba(59,130,246,0.4), rgba(6,182,212,0.15), transparent)',
            }}
          />
        </motion.div>

        {/* ── STATS ── */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '0.75rem',
            marginBottom: '2rem',
          }}
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '1.1rem 1rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>{s.icon}</div>
              <p style={{
                fontSize: '1.4rem', fontWeight: 700, lineHeight: 1,
                background: 'linear-gradient(135deg, #fff, #bfdbfe)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                marginBottom: '3px',
              }}>{s.value}</p>
              <p style={{ fontSize: '11px', color: '#7dd3fc', letterSpacing: '0.04em' }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── MISSION + VISION ── */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  background: p.glow,
                  border: `0.5px solid ${p.border}`,
                  borderRadius: '20px',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.85rem' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '9px', flexShrink: 0,
                    background: `${p.color}22`,
                    border: `1px solid ${p.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={15} color={p.color} />
                  </div>
                  <h3 style={{
                    fontSize: '12px', fontWeight: 600,
                    letterSpacing: '0.09em', textTransform: 'uppercase',
                    color: p.color, margin: 0,
                  }}>
                    {p.label}
                  </h3>
                </div>
                <p style={{ fontSize: '13.5px', lineHeight: 1.8, color: '#bfdbfe', margin: 0 }}>
                  {p.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── HIGHLIGHTS + WHY CHOOSE US ── */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {/* Highlights */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#60a5fa', marginBottom: '0.4rem',
            }}>
              What We Do Best
            </p>
            {highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '0.5px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px',
                }}
              >
                <div style={{
                  width: '22px', height: '22px', borderRadius: '6px', flexShrink: 0,
                  background: 'rgba(59,130,246,0.15)',
                  border: '0.5px solid rgba(96,165,250,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Check size={12} color="#60a5fa" strokeWidth={2.5} />
                </div>
                <span style={{ fontSize: '13.5px', color: '#e0f2fe', fontWeight: 500 }}>{h}</span>
              </div>
            ))}
          </motion.div>

          {/* Why Choose Us + CTA */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '1.4rem',
            }}>
              <p style={{
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#60a5fa', marginBottom: '0.65rem',
              }}>
                Why Choose Us
              </p>
              <p style={{ fontSize: '13.5px', lineHeight: 1.8, color: '#bfdbfe', margin: 0 }}>
                We combine technical expertise with quality products to deliver reliable,
                professional services for residential and commercial properties.
                Our commitment to excellence ensures your satisfaction at every step.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                {[
                  { icon: Zap, label: 'Fast Install' },
                  { icon: Shield, label: 'Certified' },
                  { icon: Sun, label: 'Solar Ready' },
                ].map((f, i) => {
                  const FIcon = f.icon;
                  return (
                    <span key={i} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      fontSize: '11px', fontWeight: 500, color: '#93c5fd',
                      background: 'rgba(59,130,246,0.1)',
                      border: '0.5px solid rgba(96,165,250,0.25)',
                      padding: '4px 10px', borderRadius: '99px',
                    }}>
                      <FIcon size={11} color="#60a5fa" />
                      {f.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                style={{
                  flex: 1, minWidth: '130px',
                  padding: '0.75rem 1.25rem',
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  color: '#fff', fontWeight: 600, fontSize: '13.5px',
                  borderRadius: '10px', border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(59,130,246,0.3)',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Our Services
              </button>
              <button
                style={{
                  flex: 1, minWidth: '130px',
                  padding: '0.75rem 1.25rem',
                  background: 'transparent',
                  color: '#93c5fd', fontWeight: 600, fontSize: '13.5px',
                  borderRadius: '10px', cursor: 'pointer',
                  border: '1px solid rgba(96,165,250,0.35)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(59,130,246,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(96,165,250,0.7)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(96,165,250,0.35)';
                }}
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}