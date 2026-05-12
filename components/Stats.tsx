'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  {
    value: 25,
    suffix: '+',
    label: 'Years of Innovation',
    description: 'Pioneering technology solutions',
  },
  {
    value: 500,
    suffix: '+',
    label: 'Enterprise Clients',
    description: 'Trusted worldwide',
  },
  {
    value: 75,
    suffix: '+',
    label: 'Team Members',
    description: 'Expert professionals',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Uptime %',
    description: 'Reliable infrastructure',
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
    rootMargin: '-100px',
  });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <section className="section-container relative z-10">
      <div className="section-inner" ref={ref}>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="group relative p-8 md:p-10 text-center bg-blue-800/40 rounded-xl border border-blue-600/50 hover:border-blue-400 hover:bg-blue-800/70 transition-shadow duration-200 shadow-lg overflow-hidden"
              variants={item}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              <div className="relative z-10">
                <motion.p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-4">
                  {inView && <CountUp end={stat.value} suffix={stat.suffix} duration={2} />}
                </motion.p>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-100 transition-colors duration-150">
                  {stat.label}
                </h3>
                <p className="text-sm leading-relaxed text-blue-200 group-hover:text-blue-100 transition-colors duration-150">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
