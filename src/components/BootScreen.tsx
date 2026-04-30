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
        <h1 className="font-display-header text-4xl md:text-5xl text-primary mb-4 drop-shadow-[0_0_10px_rgba(180,197,255,0.8)]">VINÍCIUS ALMEIDA</h1>
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
        <img className="w-full h-full object-cover mix-blend-screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe5GQOOs2Ch3TG-84UEpjiPR_g2Z6LVCFDUfQsm5QnDNLdNd7ljrE2BB49hptFDOZwbmhG5voufuCDronxmm0WT8VOHEAe23jAMw9F7-_xrxgRpUEoG74b_-UmSPc20Zrus58I68OKRS-xm2mVjEdivtPl9aw__U5Z3XMj8VS1LsWhjitS-k5RPutsIc_4zKJZ7pVq1XyqHdH4mvwh1EU2mvsaxdKLR2HjyORpDCL0q7AkQPbqj9LqEhLbbHVTFeqmrxFn0z-714h5" alt="Space Background" />
      </div>
    </div>
  );
}
