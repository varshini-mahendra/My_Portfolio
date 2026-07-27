import { motion } from "motion/react";

const stars = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 2,
}));

const shootingStars = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 60}%`,
  left: `${Math.random() * 60 + 10}%`,
  delay: i * 7 + Math.random() * 4,
}));

export default function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0, 1, 0.3, 1, 0],
            scale: [1, 1.3, 0.8, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute w-[2px] h-[2px] bg-white rounded-full"
          style={{ top: s.top, left: s.left }}
          animate={{
            x: [0, -300],
            y: [0, 300],
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: s.delay,
            ease: "linear",
          }}
        >
          <div
            className="absolute top-0 right-0 w-[80px] h-[1px]"
            style={{
              background: "linear-gradient(to left, transparent, rgba(255,255,255,0.8))",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

