import { useEffect, useState } from 'react';
import { useMotionValue, animate, motion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, prefix = '₹', duration = 1.2, className }: AnimatedCounterProps) {
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplay(Math.round(latest).toLocaleString('en-IN'));
      },
    });
    return () => controls.stop();
  }, [value, motionVal, duration]);

  return (
    <motion.span className={className}>
      {prefix}{display}
    </motion.span>
  );
}
