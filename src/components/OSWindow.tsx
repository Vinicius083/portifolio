'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

interface OSWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  initialX?: number;
  initialY?: number;
  defaultWidth?: string;
}

export default function OSWindow({
  title,
  children,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  initialX = 50,
  initialY = 50,
  defaultWidth = 'w-[800px]'
}: OSWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const dragInstance = useRef<Draggable[] | null>(null);

  const onFocusRef = useRef(onFocus);
  useEffect(() => {
    onFocusRef.current = onFocus;
  }, [onFocus]);

  useEffect(() => {
    if (isOpen && windowRef.current && handleRef.current && !dragInstance.current) {
      // Initialize GSAP Draggable
      dragInstance.current = Draggable.create(windowRef.current, {
        type: 'x,y',
        bounds: 'body',
        handle: handleRef.current,
        onPress: () => onFocusRef.current(),
      });
      
      // Set initial position
      gsap.set(windowRef.current, { x: initialX, y: initialY });
    }

    return () => {
      if (!isOpen && dragInstance.current) {
        dragInstance.current[0].kill();
        dragInstance.current = null;
      }
    };
  }, [isOpen, initialX, initialY]);

  // Handle Maximize toggle
  useEffect(() => {
    if (!windowRef.current) return;
    if (isMaximized) {
      gsap.to(windowRef.current, {
        x: 0,
        y: 32, // Below TopNav
        width: '100vw',
        height: 'calc(100vh - 72px)', // minus TopNav and Taskbar
        duration: 0.3,
        ease: 'power2.inOut'
      });
      if (dragInstance.current) dragInstance.current[0].disable();
    } else {
      gsap.to(windowRef.current, {
        width: 'auto',
        height: 'auto',
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
           // Small hack to ensure layout doesn't break
           gsap.set(windowRef.current, { width: '', height: '' });
        }
      });
      if (dragInstance.current) dragInstance.current[0].enable();
    }
  }, [isMaximized]);

  // Entrance animation
  useEffect(() => {
    if (isOpen && windowRef.current && !isMinimized) {
      gsap.fromTo(windowRef.current, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.2, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      onMouseDown={onFocus}
      className={`absolute top-0 left-0 flex flex-col bg-surface-container window-bevel rounded-DEFAULT overflow-hidden shadow-2xl ${isMinimized ? 'hidden' : 'flex'} ${isMaximized ? '' : `max-w-[100vw] max-h-[100vh] ${defaultWidth}`}`}
      style={{ zIndex }}
    >
      {/* Title Bar (Drag Handle) */}
      <div 
        ref={handleRef}
        className="window-title-bg h-8 flex justify-between items-center px-2 border-b-2 border-black window-drag-handle cursor-move select-none"
        onDoubleClick={onMaximize}
      >
        <span className="font-window-title text-window-title text-white drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">
          {title}
        </span>
        <div className="flex gap-1" onMouseDown={(e) => e.stopPropagation()}>
          <button onClick={onMinimize} className="w-6 h-6 bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 flex items-center justify-center text-black text-sm font-bold shadow-[1px_1px_0_black] hover:bg-gray-300 hover:border-t-gray-400 hover:border-l-gray-400 hover:border-b-white hover:border-r-white transition-none">_</button>
          <button onClick={onMaximize} className="w-6 h-6 bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 flex items-center justify-center text-black text-sm font-bold shadow-[1px_1px_0_black] hover:bg-gray-300 hover:border-t-gray-400 hover:border-l-gray-400 hover:border-b-white hover:border-r-white transition-none">□</button>
          <button onClick={onClose} className="w-6 h-6 bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 flex items-center justify-center text-black text-sm font-bold shadow-[1px_1px_0_black] hover:bg-red-500 hover:text-white transition-none">X</button>
        </div>
      </div>
      
      {/* Content */}
      <div className={`flex-1 overflow-auto bg-surface-container-lowest ${isMaximized ? 'h-full' : 'max-h-[80vh]'}`}>
        {children}
      </div>
    </div>
  );
}
