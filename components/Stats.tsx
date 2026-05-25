'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ShieldCheck, Zap, Users, Clock } from 'lucide-react';

const stats = [
  {
    value: 500,
    suffix: '+',
    label: 'Projects Completed',
    description: 'Homes & businesses secured across Nigeria',
    icon: ShieldCheck,
    color: '#2563eb',
  },
  {
    value: 10,
    suffix: '+',
    label: 'Years Experience',
    description: 'Trusted expertise since day one',
    icon: Clock,
    color: '#16a34a',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Trained Technicians',
    description: 'Certified professionals on our team',
    icon: Users,
    color: '#7c3aed',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Customer Support',
    description: 'Always available when you need us',
    icon: Zap,
    color: '#d97706',
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

  return (
    <section className="py-16 px-5 bg-gray-50">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors duration-200"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${stat.color}10`, border: `1px solid ${stat.color}30` }}
                >
                  <Icon size={20} color={stat.color} strokeWidth={2} />
                </div>

                <p className="text-3xl font-semibold text-gray-900 mb-1">
                  {inView && (
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                  )}
                </p>

                <p className="text-sm font-medium text-gray-900 mb-1">
                  {stat.label}
                </p>

                <p className="text-xs text-gray-500">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
