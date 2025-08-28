import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced Animated Emoji Component with larger sizes
export const AnimatedEmoji = ({ 
  emoji, 
  className = "", 
  animation = "float",
  delay = 0,
  size = "medium"
}: { 
  emoji: string; 
  className?: string; 
  animation?: "float" | "bounce" | "rotate" | "pulse" | "swing" | "shake" | "spin" | "wiggle";
  delay?: number;
  size?: "small" | "medium" | "large";
}) => {
  // Increased emoji sizes for better visibility
  const sizeClasses = {
    small: "text-[9px] sm:text-xl",
    medium: "text-xs sm:text-2xl",
    large: "text-sm sm:text-3xl"
  };

  // Simplified, less resource-intensive animations
  const animations = {
    float: {
      y: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }
    },
    bounce: {
      y: [0, -4, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeOut",
        delay
      }
    },
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear",
        delay
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }
    },
    swing: {
      rotate: [-4, 4, -4],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }
    },
    shake: {
      x: [-1, 1, -1, 1, 0],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 5,
        delay
      }
    },
    spin: {
      rotate: [0, 360],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear",
        delay
      }
    },
    wiggle: {
      rotate: [-3, 3, -3, 3, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 4,
        delay
      }
    }
  };

  return (
    <motion.span
      className={`inline-block select-none leading-none align-middle ${sizeClasses[size]} ${className}`}
      animate={animations[animation]}
      whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
      style={{
        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
        willChange: "transform"
      }}
    >
      {emoji}
    </motion.span>
  );
};

// Optimized Typewriter Effect Component
export const TypewriterText = ({ 
  text, 
  className = "", 
  delay = 0 
}: { 
  text: string; 
  className?: string; 
  delay?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (displayText.length < text.length) {
      timeoutId = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, delay + displayText.length * 100);
    } else {
      timeoutId = setTimeout(() => setShowCursor(false), 1500);
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, text, delay]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="inline-block w-0.5 h-6 bg-current ml-1"
        />
      )}
    </span>
  );
};

export interface TextRotatorProps {
  words: string[];
  className?: string;
  interval?: number;
  textGradient?: boolean;
  letterAnimation?: boolean;
}

// Optimized TextRotator with reduced complexity
export const TextRotator = ({
  words,
  className = "",
  interval = 3500,
  textGradient = true,
  letterAnimation = true
}: TextRotatorProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 6,
      scale: 0.98
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.02,
        duration: 0.2,
        ease: "easeOut"
      }
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: -6,
      scale: 0.98,
      transition: {
        delay: i * 0.01,
        duration: 0.15,
        ease: "easeIn"
      }
    })
  };

  const getGradientColors = (index: number, total: number) => {
    const hueStart = (currentIndex * 30) % 360;
    const hue = hueStart + (index / total * 60);
    return `hsl(${hue}, 70%, 55%)`;
  };

  return (
    <div className={`relative inline-block w-full text-center ${className}`} style={{ willChange: "transform" }}>
      <AnimatePresence mode="wait">
        {letterAnimation && textGradient ? (
          <motion.div
            key={currentIndex}
            className="flex justify-center items-center w-full"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {words[currentIndex].split('').map((letter, i, array) => (
              <motion.span
                key={`${currentIndex}-${i}`}
                custom={i}
                variants={letterVariants}
                style={textGradient ? {
                  color: getGradientColors(i, array.length),
                  display: 'inline-block',
                  fontWeight: 'inherit',
                  willChange: "transform"
                } : {}}
                className={letter === ' ' ? 'ml-2' : ''}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={currentIndex}
            className="flex justify-center items-center w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {words[currentIndex]}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="opacity-0 pointer-events-none absolute">{words[0]}</div>
    </div>
  );
};
