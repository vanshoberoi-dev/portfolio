/**
 * Animation variants for Framer Motion
 * These are reusable animation configurations that can be applied to components
 */

// Animation direction type
type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none';

/**
 * Fade in animation with optional direction
 * @param direction - Direction of the animation ('up', 'down', 'left', 'right', 'none')
 * @param delay - Delay before animation starts (in seconds)
 */
export const fadeIn = (direction: AnimationDirection = 'up', delay: number = 0) => {
  // Calculate offset based on direction
  const offset = 40; // Standard offset distance
  
  // Set x and y based on direction
  const x = direction === 'left' ? offset : direction === 'right' ? -offset : 0;
  const y = direction === 'up' ? offset : direction === 'down' ? -offset : 0;
  
  return {
    hidden: {
      opacity: 0,
      x,
      y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  };
};

/**
 * Staggered container animation for child elements
 * @param staggerChildren - Delay between each child animation (in seconds)
 * @param delayChildren - Initial delay before any children start animating (in seconds)
 */
export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0) => ({
  hidden: {}, // Empty initial state
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Scale animation
export const scaleIn = (delay: number = 0) => {
  return {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  };
};

// Slide in animation
export const slideIn = (direction: 'up' | 'down' | 'left' | 'right', type: 'tween' | 'spring' = 'tween', delay: number = 0, duration: number = 0.5) => {
  return {
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
    },
    visible: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

// Text animation (character by character)
export const textVariant = (delay: number = 0) => {
  return {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        delay,
      },
    },
  };
};

// Text container for letter animations - balanced timing
export const textContainer = {
  hidden: {
    opacity: 0,
  },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: i * 0.1,
      when: "beforeChildren",
    },
  }),
};

// Letter animation for text - balanced timing with better cross-browser support
export const textLetter = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 200,
      mass: 0.5,
      duration: 0.3,
    },
  },
};

// Zoom in animation
export const zoomIn = (delay: number = 0, duration: number = 0.5) => {
  return {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  };
};

// Float animation (continuous)
export const float = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// Pulse animation (continuous)
export const pulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};
