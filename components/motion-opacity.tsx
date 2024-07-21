'use client';

import { motion, MotionProps } from 'framer-motion';

interface MotionOpacityProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export default function MotionOpacity({
  children,
  delay = 0,
  duration = 0.5,
  ...restProps
}: MotionOpacityProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay,
        duration,
        ease: 'easeInOut',
      }}
      {...restProps}
    >
      {children}
    </motion.div>
  );
}
