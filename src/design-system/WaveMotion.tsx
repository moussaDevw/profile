import React from 'react';
import { motion, Variants } from 'framer-motion';

export const waveContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.05,
    },
  },
};

export const waveItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 38,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 16,
      mass: 0.8,
    },
  },
};

export interface WaveRevealProps {
  children: React.ReactNode;
  index?: number;
  delay?: number;
  yOffset?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Révélation en vague au scroll (effet sinusoïdal progressif)
 */
export const WaveReveal: React.FC<WaveRevealProps> = ({
  children,
  index = 0,
  delay = 0,
  yOffset = 40,
  className = '',
  style,
}) => {
  // Calcul d'un délai en vague sinusoïdale basé sur l'index
  const waveDelay = delay + index * 0.12;

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: yOffset, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15, margin: '-40px' }}
      transition={{
        type: 'spring',
        stiffness: 85,
        damping: 16,
        mass: 0.85,
        delay: waveDelay,
      }}
    >
      {children}
    </motion.div>
  );
};
