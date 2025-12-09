import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TreeLanding } from './components/TreeLanding';
import { LetterView } from './components/LetterView';
import { CardCreator } from './components/CardCreator';
import { MagicTransition } from './components/MagicTransition';
import { AppPhase, WishData, SantaTemplate } from './types';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('landing');
  const [wishData, setWishData] = useState<WishData>({ name: '', wish: '' });
  const [selectedTemplate, setSelectedTemplate] = useState<SantaTemplate | null>(null);

  const handleLightUp = (data: WishData) => {
    setWishData(data);
    // Switch immediately to the magic transition page
    setPhase('transition');

    // After the magic transition duration, move to the letter
    setTimeout(() => {
        setPhase('letter');
    }, 6000); // 6 seconds of magic transition
  };

  const handleOpenCardCreator = (template: SantaTemplate) => {
      setSelectedTemplate(template);
      setPhase('card_creation');
  };

  return (
    <div className="w-full min-h-screen">
      <AnimatePresence mode="wait">
        {phase === 'landing' && (
           <TreeLanding key="landing" onLightUp={handleLightUp} />
        )}

        {phase === 'transition' && (
           <MagicTransition key="transition" />
        )}

        {phase === 'letter' && (
          <LetterView key="letter" wishData={wishData} onOpenCardCreator={handleOpenCardCreator} />
        )}

        {phase === 'card_creation' && selectedTemplate && (
          <CardCreator key="card" wishData={wishData} template={selectedTemplate} />
        )}
      </AnimatePresence>
      
      {/* Footer / Credits */}
      {phase !== 'transition' && (
        <div className="fixed bottom-2 w-full text-center text-[10px] text-[#5c4033] opacity-50 pointer-events-none z-0">
          Christmas Wish & Magic © 2025
        </div>
      )}
    </div>
  );
};

export default App;