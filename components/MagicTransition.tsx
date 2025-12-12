import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const MagicTransition: React.FC = () => {
  useEffect(() => {
    // Fire fireworks during this transition
    const duration = 6000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 40 * (timeLeft / duration);
      
      if (window.confetti) {
          window.confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ffd700', '#ffffff', '#87ceeb'] });
          window.confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ffd700', '#ffffff', '#ffb6c1'] });
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        backgroundImage: 'url("https://tpy2jifytinfjc1o.public.blob.vercel-storage.com/magic.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
        {/* Floating Clouds / Fog - Adjusted blend mode for image bg */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-full h-64 bg-white/10 filter blur-3xl animate-pulse"></div>
        </div>

        {/* Stars */}
        {[...Array(30)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute bg-white rounded-full"
                initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: Math.random() * window.innerHeight,
                    scale: 0 
                }}
                animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                }}
                transition={{ 
                    duration: Math.random() * 2 + 1, 
                    repeat: Infinity,
                    delay: Math.random() * 2 
                }}
                style={{
                    width: Math.random() * 3 + 1 + 'px',
                    height: Math.random() * 3 + 1 + 'px',
                    boxShadow: '0 0 10px 2px white'
                }}
            />
        ))}

        {/* Shooting Star */}
        <motion.div
            className="absolute top-0 right-0 w-40 h-[2px] bg-gradient-to-l from-transparent via-white to-transparent"
            initial={{ x: 100, y: -100, rotate: 45, opacity: 0 }}
            animate={{ x: -1000, y: 1000, opacity: [0, 1, 0] }}
            transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 3 }}
            style={{ boxShadow: '0 0 20px 2px white' }}
        />

        {/* Central Text */}
        <div className="z-10 text-center px-4">
            <motion.h2 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
                // Reduced size from text-6xl md:text-8xl to text-3xl md:text-5xl (approx 3 sizes down)
                className="font-['Great_Vibes'] text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] to-[#b8860b] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] mb-4"
            >
                Believe in Magic
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="font-['Playfair_Display'] text-xl md:text-2xl text-blue-100 italic tracking-widest"
            >
                Your wish is journeying to the North Pole...
            </motion.p>
        </div>

        {/* Bottom Silhouette (optional hint of clouds/land) */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
    </motion.div>
  );
};