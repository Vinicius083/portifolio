'use client';

import { useEffect, useState } from 'react';

export default function BootScreen({ onBoot }: { onBoot: () => void }) {
  const [loadingText, setLoadingText] = useState('> INITIALIZING KERNEL...');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const sequence = [
      '> LOADING DRIVERS...',
      '> MOUNTING VFS...',
      '> ESTABLISHING UPLINK...',
      '> INITIATING SECURITY PROTOCOLS...',
      '> AUTHENTICATING VINÍCIUS ALMEIDA...',
      '> AUTHENTICATION SUCCESSFUL',
      '> SYSTEM READY.'
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setLoadingText(prev => prev + '\n' + sequence[i]);
        if (i === sequence.length - 1) {
          setIsReady(true);
        }
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-4 crt-overlay pointer-events-auto">
      <div className="max-w-2xl w-full border border-secondary-fixed/30 bg-surface-container-lowest/80 backdrop-blur-sm p-8 text-center window-bevel relative z-10 pointer-events-auto">
        <p className="text-secondary mb-6 blinking-cursor whitespace-pre-line text-left font-terminal-md h-32 md:h-auto overflow-hidden">
          {loadingText}
        </p>
        
        <div className={`flex justify-center gap-4 mt-8 transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button 
            onClick={onBoot}
            className="bg-surface btn-bevel px-6 py-2 text-primary font-label-caps text-label-caps uppercase hover:text-white hover:bg-primary-container transition-colors shadow-[0_0_15px_rgba(0,83,225,0.5)] cursor-pointer"
          >
            [ EXECUTE_PORTFOLIO ]
          </button>
        </div>
      </div>
      
      {/* Background decoration for the boot screen */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <img className="w-full h-full object-cover mix-blend-screen" src="/background.png" alt="Space Background" />
      </div>
    </div>
  );
}
