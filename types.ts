export type AppPhase = 'landing' | 'transition' | 'letter' | 'card_creation' | 'card_display';

export interface WishData {
  name: string;
  wish: string;
}

export interface SantaTemplate {
  id: number;
  content: string;
  signature: string;
}

// Declaration for global libraries loaded via CDN
declare global {
  interface Window {
    confetti: any;
    html2canvas: any;
  }
}