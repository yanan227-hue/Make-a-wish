import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, CreditCard, RefreshCcw } from 'lucide-react';
import { WishData, SantaTemplate } from '../types';

interface CardCreatorProps {
  wishData: WishData;
  template: SantaTemplate;
}

export const CardCreator: React.FC<CardCreatorProps> = ({ wishData, template }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleDownload = async () => {
    if (!selectedImage) return;
    if (!confirm("Proceed to pay $0.99 for the high-quality download? (Mock Payment)")) return;

    setIsProcessing(true);
    
    // Using html2canvas from window global (loaded via CDN)
    if (window.html2canvas && cardRef.current) {
        try {
            const canvas = await window.html2canvas(cardRef.current, {
                scale: 2, // Higher quality
                useCORS: true,
                backgroundColor: '#f8f1e3'
            });
            
            const link = document.createElement('a');
            link.download = `Christmas_Card_${wishData.name}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            alert("Payment successful! Your card is downloading.");
        } catch (err) {
            console.error(err);
            alert("Something went wrong generating the card. Please try again.");
        }
    }
    setIsProcessing(false);
  };

  if (!selectedImage) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
      >
        <h2 className="font-['Great_Vibes'] text-5xl text-[#8b0000] mb-8">One Last Touch...</h2>
        <p className="font-['Playfair_Display'] text-xl mb-8 max-w-md">
          Upload a photo to create a magical keepsake with Santa's letter. We'll add a touch of Christmas sparkle to it.
        </p>
        
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full max-w-md aspect-video border-2 border-dashed border-[#8b0000] bg-[#fffbf0] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#fff5e0] transition-colors p-8"
        >
          <Upload size={48} className="text-[#8b0000] mb-4" />
          <span className="font-['Lato'] text-[#5c4033]">Click to upload a photo</span>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
       initial={{ opacity: 0 }} animate={{ opacity: 1 }}
       className="min-h-screen py-12 px-4 flex flex-col items-center"
    >
      <div className="flex justify-between items-center w-full max-w-6xl mb-8">
          <h2 className="font-['Great_Vibes'] text-4xl text-[#8b0000]">Your Christmas Card</h2>
          <button 
            onClick={() => setSelectedImage(null)}
            className="flex items-center gap-2 text-[#5c4033] hover:text-[#8b0000]"
          >
            <RefreshCcw size={18} /> Try different photo
          </button>
      </div>

      {/* The Card Container to be captured */}
      <div 
        ref={cardRef}
        className="bg-[#f8f1e3] p-8 shadow-2xl rounded-sm w-full max-w-6xl flex flex-col md:flex-row gap-8 items-stretch border-[12px] border-[#2f5a28] relative"
      >
        {/* Festive Corner Decorations (CSS Only) */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#ffd700] m-2"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#ffd700] m-2"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#ffd700] m-2"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#ffd700] m-2"></div>

        {/* Left: Letter */}
        <div className="flex-1 bg-[#fffbf0] p-8 rounded border border-[#e2d5b5] flex flex-col justify-center">
            <h3 className="font-['Great_Vibes'] text-3xl text-[#8b0000] mb-4">Dear {wishData.name},</h3>
            <div className="font-['Playfair_Display'] text-base text-[#4a3b2a] space-y-3 flex-grow overflow-y-auto max-h-[400px]">
               {template.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <pre className="font-['Great_Vibes'] text-2xl text-[#8b0000] mt-6 text-right font-bold whitespace-pre-wrap">
              {template.signature}
            </pre>
        </div>

        {/* Right: Photo with Overlay */}
        <div className="flex-1 relative group overflow-hidden rounded border-4 border-[#8b0000] shadow-inner bg-black flex items-center justify-center min-h-[400px]">
           <img 
             src={selectedImage} 
             alt="User Upload" 
             className="w-full h-full object-cover opacity-90"
           />
           {/* Christmas Overlay Effect */}
           <div className="absolute inset-0 bg-gradient-to-t from-[#8b0000]/30 to-transparent pointer-events-none mix-blend-overlay"></div>
           <div className="absolute inset-0 pointer-events-none border-[1px] border-[#ffd700]/50 m-2 rounded-sm"></div>
           
           {/* Sparkles Overlay */}
            <div className="absolute top-4 right-8 text-[#ffd700] text-4xl animate-pulse">✨</div>
            <div className="absolute bottom-8 left-4 text-[#ffd700] text-2xl animate-pulse delay-700">✨</div>
            
            <div className="absolute bottom-4 right-4 text-white font-['Great_Vibes'] text-3xl drop-shadow-lg opacity-90">
                Merry Christmas
            </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <button
          onClick={handleDownload}
          disabled={isProcessing}
          className="flex items-center gap-3 px-8 py-4 bg-[#b22222] text-white rounded-full font-['Playfair_Display'] text-xl font-bold shadow-lg hover:bg-[#8b0000] hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <span>Processing...</span>
          ) : (
            <>
              <Download size={24} />
              <span>Download & Keep ($0.99)</span>
            </>
          )}
        </button>
        <p className="text-[#5c4033] text-sm font-['Lato'] flex items-center gap-1">
          <CreditCard size={14} /> Secure mock payment gateway
        </p>
      </div>

    </motion.div>
  );
};