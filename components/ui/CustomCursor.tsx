'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const CustomCursor = () => {
  const { theme } = useTheme();
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use MotionValues to prevent React re-renders on every mouse movement
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Optimized mouse movement handling
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);

      // Throttled/Debounced check for clickable elements to save CPU
      const target = e.target as HTMLElement;
      if (target) {
        const isClickable = target.closest('a, button, [role="button"], input[type="button"], select, label') || 
                            window.getComputedStyle(target).cursor === 'pointer';
        
        // Only update state if it actually changed
        setIsPointer((prev) => {
          const next = !!isClickable;
          return prev === next ? prev : next;
        });
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Disable on mobile/touch devices for better performance
  if (typeof window === 'undefined') return null;
  const isTouchDevice = 'ontouchstart' in window || (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);
  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: mouseX, // Directly use MotionValue for 0-lag movement
        y: mouseY, // Directly use MotionValue for 0-lag movement
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
      }}
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          fill: isPointer 
            ? (theme === 'dark' ? '#ffffff' : '#805fe3') 
            : (theme === 'dark' ? '#805fe3' : '#ffffff'),
          stroke: isPointer 
            ? (theme === 'dark' ? '#805fe3' : '#ffffff') 
            : (theme === 'dark' ? '#ffffff' : '#805fe3'),
          scale: isPointer ? 1.2 : 1,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          scale: { duration: 0.1 } 
        }}
      >
        <path 
          d="M2 2L24 9L9 24L2 2Z" 
          strokeWidth="2.5" 
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
};

export default CustomCursor;
