import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TREE_IMAGE_URL } from '../constants';
import { WishData } from '../types';

interface TreeLandingProps {
  onLightUp: (data: WishData) => void;
}

export const TreeLanding: React.FC<TreeLandingProps> = ({ onLightUp }) => {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [isLit, setIsLit] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleLightUp = () => {
    if (!name.trim() || !wish.trim()) {
      alert("Please enter your name and your wish!");
      return;
    }
    
    setIsLit(true);
    
    // Trigger the sequence
    setTimeout(() => {
      setShowMessage(true);
    }, 800);

    setTimeout(() => {
      onLightUp({ name, wish });
    }, 3500); // Wait for message to be read and fireworks to start
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden text-amber-950">
      
      {/* Title */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="font-['Great_Vibes'] text-5xl md:text-7xl mb-6 text-center text-[#8b0000] drop-shadow-md z-10"
      >
        Light up your Christmas Tree
      </motion.h1>

      {/* Tree Container */}
      <div className="relative w-full max-w-md aspect-[3/4] flex items-center justify-center z-10">
         <motion.img
           src={TREE_IMAGE_URL}
           alt="Christmas Tree"
           // Updated class: removed sepia/brightness filters to keep it "isolated" and clear.
           // Added 'drop-shadow-2xl' for depth without a box background.
           className={`w-full h-full object-contain transition-all duration-[2000ms] ${isLit ? 'christmas-glow drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]' : 'opacity-90 drop-shadow-xl'}`}
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 1.5 }}
         />
         
         {/* Success Message Overlay */}
         {showMessage && (
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="absolute inset-0 flex items-center justify-center pointer-events-none"
           >
             <h2 className="font-['Great_Vibes'] text-4xl md:text-6xl text-[#ffd700] text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] px-4 bg-black/10 backdrop-blur-[2px] rounded-xl py-4">
               Your wish will come true...
             </h2>
           </motion.div>
         )}
      </div>

      {/* Inputs Section - Only show if not yet lit */}
      {!isLit && (
        <motion.div 
          className="flex flex-col items-center gap-4 w-full max-w-sm mt-8 z-10 bg-[#f8f1e3]/90 p-6 rounded-lg border border-[#d4c5a9] shadow-xl backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-full">
            <label className="block font-['Playfair_Display'] text-lg mb-1 text-center font-bold text-[#5c4033]">Make a Wish</label>
            <textarea
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Write your wish here..."
              className="w-full p-3 rounded border border-[#c4b595] bg-[#fffbf0] font-['Lato'] text-[#4a3b2a] focus:outline-none focus:ring-2 focus:ring-[#8b0000] min-h-[80px] resize-none shadow-inner"
            />
          </div>
          
          <div className="w-full">
            <label className="block font-['Playfair_Display'] text-lg mb-1 text-center font-bold text-[#5c4033]">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full p-3 rounded border border-[#c4b595] bg-[#fffbf0] font-['Lato'] text-[#4a3b2a] focus:outline-none focus:ring-2 focus:ring-[#8b0000] shadow-inner"
            />
          </div>

          <button
            onClick={handleLightUp}
            className="mt-4 px-8 py-3 bg-[#8b0000] text-[#f8f1e3] font-['Playfair_Display'] text-xl font-bold rounded-full shadow-lg hover:bg-[#a50000] hover:scale-105 transition-all duration-300 w-full ring-2 ring-offset-2 ring-[#8b0000]/50"
          >
            Light Up
          </button>
        </motion.div>
      )}
    </div>
  );
};