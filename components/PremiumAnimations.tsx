/**
 * Premium Animation Components & Utilities
 *
 * A collection of reusable animated components and effects
 * that match the hero section's premium aesthetic.
 *
 * Usage:
 * import { AnimatedButton, GlassCard, FloatingBadge } from '@/components/PremiumAnimations';
 */

'use client';

import { motion, MotionProps } from 'framer-motion';
import React from 'react';

// ============================================================================
// ANIMATED BUTTONS
// ============================================================================

interface AnimatedButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 relative overflow-hidden';

  const variants = {
    primary:
      'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 text-white shadow-lg hover:shadow-2xl',
    secondary:
      'bg-gradient-to-r from-blue-900/40 via-cyan-900/30 to-blue-900/40 text-white border-2 border-blue-400/50 hover:border-cyan-400/70 backdrop-blur-xl',
    ghost: 'text-blue-300 hover:text-blue-100 hover:bg-blue-900/20',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// ============================================================================
// GLASS CARDS
// ============================================================================

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = true,
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      className={`glass-morphism-dark p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// FLOATING BADGE
// ============================================================================

interface FloatingBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning';
  className?: string;
}

export const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  children,
  icon,
  variant = 'primary',
  className = '',
}) => {
  const variants = {
    primary: 'from-blue-500/20 via-cyan-500/15 to-blue-500/10 border-blue-400/40 text-blue-100',
    success:
      'from-emerald-500/20 via-green-500/15 to-emerald-500/10 border-emerald-400/40 text-emerald-100',
    warning:
      'from-amber-500/20 via-yellow-500/15 to-amber-500/10 border-amber-400/40 text-amber-100',
  };

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      className={`inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r ${variants[variant]} rounded-full border backdrop-blur-xl ${className}`}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <span className="text-sm font-semibold">{children}</span>
    </motion.div>
  );
};

// ============================================================================
// ANIMATED GRADIENT TEXT
// ============================================================================

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  from?: string;
  to?: string;
  className?: string;
}

export const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  children,
  from = 'from-blue-300',
  to = 'to-cyan-400',
  className = '',
}) => {
  return (
    <span
      className={`bg-gradient-to-r ${from} via-cyan-300 ${to} bg-clip-text text-transparent animate-text-gradient ${className}`}
    >
      {children}
    </span>
  );
};

// ============================================================================
// PREMIUM SECTION DIVIDER
// ============================================================================

interface PremiumDividerProps {
  variant?: 'gradient' | 'glow' | 'simple';
  className?: string;
}

export const PremiumDivider: React.FC<PremiumDividerProps> = ({
  variant = 'gradient',
  className = '',
}) => {
  if (variant === 'glow') {
    return (
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className={`h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent ${className}`}
      />
    );
  }

  if (variant === 'simple') {
    return <div className={`h-px bg-blue-600/20 ${className}`} />;
  }

  return (
    <div
      className={`h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent ${className}`}
    />
  );
};

// ============================================================================
// FLOATING ELEMENT
// ============================================================================

interface FloatingElementProps extends MotionProps {
  children: React.ReactNode;
  duration?: number;
  distance?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  duration = 6,
  distance = 10,
  ...motionProps
}) => {
  return (
    <motion.div
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration, repeat: Infinity, repeatType: 'reverse' }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// GLOW CONTAINER
// ============================================================================

interface GlowContainerProps {
  children: React.ReactNode;
  color?: 'blue' | 'cyan' | 'green';
  className?: string;
}

export const GlowContainer: React.FC<GlowContainerProps> = ({
  children,
  color = 'blue',
  className = '',
}) => {
  const colors = {
    blue: 'from-blue-600/30 via-cyan-600/20 to-blue-600/30',
    cyan: 'from-cyan-600/30 via-blue-600/20 to-cyan-600/30',
    green: 'from-emerald-600/30 via-green-600/20 to-emerald-600/30',
  };

  return (
    <motion.div
      className={`absolute inset-0 bg-gradient-to-br ${colors[color]} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${className}`}
      animate={{
        boxShadow: [
          '0 0 20px rgba(59, 130, 246, 0.3)',
          '0 0 40px rgba(34, 211, 238, 0.4)',
          '0 0 20px rgba(59, 130, 246, 0.3)',
        ],
      }}
      transition={{ duration: 4, repeat: Infinity }}
    />
  );
};

// ============================================================================
// SHIMMER EFFECT
// ============================================================================

interface ShimmerProps {
  children: React.ReactNode;
  className?: string;
}

export const ShimmerEffect: React.FC<ShimmerProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <div className="shimmer absolute inset-0 pointer-events-none" />
    </div>
  );
};

// ============================================================================
// PULSING DOT
// ============================================================================

interface PulsingDotProps {
  color?: 'blue' | 'cyan' | 'green' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PulsingDot: React.FC<PulsingDotProps> = ({
  color = 'cyan',
  size = 'md',
  className = '',
}) => {
  const colors = {
    blue: 'bg-blue-500',
    cyan: 'bg-cyan-500',
    green: 'bg-green-500',
    white: 'bg-white',
  };

  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <motion.div
      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className={`${colors[color]} ${sizes[size]} rounded-full ${className}`}
    />
  );
};

// ============================================================================
// STAGGER CONTAINER (for list animations)
// ============================================================================

interface StaggerContainerProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  delay = 0.05,
  className = '',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className={className}>
      {children}
    </motion.div>
  );
};

// ============================================================================
// STAGGER ITEM (for use inside StaggerContainer)
// ============================================================================

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({ children, className = '' }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
