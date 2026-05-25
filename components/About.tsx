'use client';

import { Check, Target, Eye, Zap, Shield, Sun } from 'lucide-react';
import SkeamTitle from '@/components/SkeamTitle';

const highlights = [
  'Certified gate automation specialists',
  'Professional CCTV installation & maintenance',
  'Complete solar energy solutions',
  'Reliable inverter systems & support',
];

const stats = [
  { value: '500+', label: 'Installations' },
  { value: '10+', label: 'Years Active' },
  { value: '24/7', label: 'Support' },
  { value: '100%', label: 'Satisfaction' },
];

const pillars = [
  {
    icon: Target,
    color: '#2563eb',
    label: 'Our Mission',
    text: 'To provide innovative, dependable, and cost-effective technology solutions that enhance security, convenience, automation, and sustainable energy for homes, businesses, and commercial environments.',
  },
  {
    icon: Eye,
    color: '#16a34a',
    label: 'Our Vision',
    text: 'To become a leading technology solutions brand in Nigeria and beyond, recognized for excellence in smart security, renewable energy, automation, and integrated technology systems that empower safer, smarter living.',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-16 px-5 bg-white"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
            Who We Are
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                About <SkeamTitle />{' '}
                <span className="text-blue-600">Technologies</span>
              </h2>
            </div>

            <div className="border-l-2 border-gray-200 pl-5">
              <p className="text-sm leading-relaxed text-gray-600">
                Your trusted partner for{' '}
                <strong className="text-gray-900">smart security</strong>,{' '}
                <strong className="text-gray-900">reliable power</strong>, and{' '}
                <strong className="text-gray-900">innovative automation</strong>{' '}
                solutions for homes, businesses, and industries across Nigeria.
              </p>
            </div>
          </div>

          <div className="mt-6 h-px bg-gray-200" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center"
            >
              <p className="text-2xl font-semibold text-gray-900 mb-1">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mission + Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} color={p.color} />
                  </div>
                  <h3 className="text-xs font-semibold tracking-wide uppercase" style={{ color: p.color }}>
                    {p.label}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  {p.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlights + Why Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Highlights */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold tracking-wide uppercase text-blue-600 mb-2">
              What We Do Best
            </p>
            {highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div className="w-5 h-5 rounded bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-blue-600" strokeWidth={2.5} />
                </div>
                <span className="text-sm text-gray-700 font-medium">{h}</span>
              </div>
            ))}
          </div>

          {/* Why Choose Us + CTA */}
          <div className="flex flex-col gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <p className="text-xs font-semibold tracking-wide uppercase text-blue-600 mb-3">
                Why Choose Us
              </p>
              <p className="text-sm leading-relaxed text-gray-600 mb-4">
                We combine technical expertise with quality products to deliver reliable,
                professional services for residential and commercial properties.
                Our commitment to excellence ensures your satisfaction at every step.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Zap, label: 'Fast Install' },
                  { icon: Shield, label: 'Certified' },
                  { icon: Sun, label: 'Solar Ready' },
                ].map((f, i) => {
                  const FIcon = f.icon;
                  return (
                    <span key={i} className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                      <FIcon size={11} />
                      {f.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3 flex-wrap">
              <a
                href="#services"
                className="flex-1 min-w-[130px] text-center px-5 py-3 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Our Services
              </a>
              <a
                href="#contact"
                className="flex-1 min-w-[130px] text-center px-5 py-3 border border-gray-300 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
