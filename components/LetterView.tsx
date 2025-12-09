import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Star } from 'lucide-react';
import { SANTA_TEMPLATES } from '../constants';
import { WishData, SantaTemplate } from '../types';

interface LetterViewProps {
  wishData: WishData;
  onOpenCardCreator: (template: SantaTemplate) => void;
}

export const LetterView: React.FC<LetterViewProps> = ({ wishData, onOpenCardCreator }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [template, setTemplate] = useState<SantaTemplate | null>(null);

  useEffect(() => {
    // Select a random template on mount
    const randomTemplate = SANTA_TEMPLATES[Math.floor(Math.random() * SANTA_TEMPLATES.length)];
    setTemplate(randomTemplate);
  }, []);

  if (!template) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, rotateX: 90, transition: { duration: 0.5 } }}
            className="cursor-pointer group flex flex-col items-center"
            onClick={() => setIsOpen(true)}
          >
            {/* 
              Envelope Container 
              Base Size: w-[500px] h-[320px] 
              Scaled down on mobile
            */}
            <div className="relative w-[340px] h-[220px] md:w-[500px] md:h-[320px] bg-[#8b0000] rounded-lg shadow-2xl flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
              
              {/* Envelope Flap Design - Responsive Borders */}
              {/* Mobile Flap: Width 340 -> Border L/R 170. Height ~120 */}
              {/* Desktop Flap: Width 500 -> Border L/R 250. Height ~180 */}
              <div className="absolute top-0 left-0 w-0 h-0 
                border-l-[170px] md:border-l-[250px] border-l-transparent 
                border-t-[120px] md:border-t-[180px] border-t-[#a50000] 
                border-r-[170px] md:border-r-[250px] border-r-transparent 
                rounded-t-lg z-10 drop-shadow-md origin-top">
              </div>
              
              {/* Bottom fold visual (optional, adds realism) */}
              <div className="absolute bottom-0 left-0 w-0 h-0 
                 border-l-[170px] md:border-l-[250px] border-l-transparent
                 border-b-[100px] md:border-b-[150px] border-b-[#7a0000]
                 border-r-[170px] md:border-r-[250px] border-r-transparent
                 opacity-30 pointer-events-none z-0">
              </div>

              {/* Wax Seal */}
              <div className="absolute z-20 w-16 h-16 md:w-20 md:h-20 bg-[#e6c200] rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.3)] flex items-center justify-center border-4 border-[#d4b000] top-[30%] md:top-[35%]">
                 <span className="font-['Great_Vibes'] text-3xl md:text-4xl text-[#8b0000] font-bold mt-1">S</span>
              </div>
              
              <div className="absolute bottom-6 md:bottom-8 text-[#f8f1e3] font-['Playfair_Display'] text-xl md:text-2xl z-20 opacity-90 drop-shadow-md">
                For {wishData.name}
              </div>
            </div>
            
            <p className="text-center mt-8 font-['Lato'] text-[#5c4033] animate-pulse text-lg tracking-wider">
              Click to open your letter from Santa
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
            className="max-w-3xl w-full bg-[#fffbf0] p-8 md:p-16 rounded-sm shadow-2xl relative border border-[#e2d5b5] my-8"
          >
             {/* Paper Texture Overlay */}
             <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] rounded-sm"></div>

             {/* Letter Header */}
             <div className="flex justify-between items-start mb-8 border-b-2 border-[#e2d5b5] pb-6">
                <div className="text-left">
                  <h2 className="font-['Great_Vibes'] text-5xl text-[#8b0000] drop-shadow-sm">Dear {wishData.name},</h2>
                </div>
                <div className="text-[#2f5a28] animate-spin-slow">
                  <Star size={40} fill="#ffd700" stroke="#b8860b" />
                </div>
             </div>

             {/* Content */}
             <div className="font-['Playfair_Display'] text-xl md:text-2xl leading-relaxed text-[#4a3b2a] space-y-6">
               {template.content.split('\n').map((paragraph, idx) => (
                 <p key={idx} className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#8b0000] first-letter:mr-1">
                   {paragraph}
                 </p>
               ))}
             </div>

             {/* Signature */}
             <div className="mt-12 pt-8 border-t border-[#e2d5b5] text-right">
                <div className="inline-block transform -rotate-2">
                    <pre className="font-['Great_Vibes'] text-4xl text-[#8b0000] whitespace-pre-wrap font-bold">
                    {template.signature}
                    </pre>
                </div>
             </div>

             {/* Action Button */}
             <div className="mt-12 flex justify-center">
               <button
                 onClick={() => onOpenCardCreator(template)}
                 className="group flex items-center gap-3 px-8 py-4 bg-[#2f5a28] text-white rounded-full font-['Lato'] text-lg hover:bg-[#23451e] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
               >
                 <MailOpen size={24} className="group-hover:animate-bounce" />
                 <span>Create Holiday Card</span>
               </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};