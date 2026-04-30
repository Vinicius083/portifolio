'use client';

import React, { useState, useEffect } from 'react';
import BootScreen from '@/components/BootScreen';
import OSWindow from '@/components/OSWindow';
import CodeStreamBackground from '@/components/CodeStreamBackground';
import Image from 'next/image';

type WindowState = {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
};

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);
  
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'hero', title: 'C:\\SYS\\INITIALIZE.BAT', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    { id: 'bio', title: 'BIO_ENCRYPTED.EXE', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 11 },
    { id: 'skills', title: 'CORE_SYSTEM_SPECS.SYS', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 12 },
    { id: 'projects', title: 'PROJECT_VAULT.DIR', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 13 },
    { id: 'contact', title: 'COMM_UPLINK.NET', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 14 },
    { id: 'hardware', title: 'HARDWARE_MONITOR', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 15 },
  ]);

  const [highestZIndex, setHighestZIndex] = useState(20);

  // Focus a window
  const focusWindow = (id: string) => {
    setHighestZIndex(prev => prev + 1);
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: highestZIndex + 1, isMinimized: false } : w
    ));
  };

  // Open a window
  const openWindow = (id: string) => {
    setHighestZIndex(prev => prev + 1);
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: highestZIndex + 1 } : w
    ));
  };

  // Close a window
  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isOpen: false } : w
    ));
  };

  // Minimize a window
  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  // Toggle Maximize
  const toggleMaximize = (id: string) => {
    focusWindow(id);
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const handleBoot = () => {
    setIsBooted(true);
    // Open initial windows after boot
    setTimeout(() => {
      openWindow('hero');
      setTimeout(() => openWindow('bio'), 300);
      setTimeout(() => openWindow('hardware'), 600);
    }, 500);
  };

  const getWindow = (id: string) => windows.find(w => w.id === id);

  return (
    <>
      {/* Global CRT Overlay */}
      <div className="crt-overlay pointer-events-none"></div>

      {!isBooted && <BootScreen onBoot={handleBoot} />}

      {isBooted && (
        <div className="w-full h-screen overflow-hidden relative">
          
          {/* Top Navigation (MISSION_CONTROL_v1.0) */}
          <nav className="fixed top-0 left-0 w-full z-[9999] flex justify-between items-center px-2 bg-blue-700 dark:bg-blue-800 font-label-caps text-label-caps tracking-tighter uppercase h-8 border-b-2 border-black/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_2px_0_0_rgba(0,0,0,1)] text-white select-none">
            <div className="text-sm font-black text-white italic"><img src="/logo.svg" alt="Logo" width={40} height={40} /></div>
            <div className="hidden md:flex gap-4 h-full">
              <button onClick={() => openWindow('hero')} className="flex items-center h-full px-2 text-white/70 hover:bg-red-500 hover:text-white transition-colors cursor-pointer">HOME</button>
              <button onClick={() => openWindow('bio')} className="flex items-center h-full px-2 text-white/70 hover:bg-red-500 hover:text-white transition-colors cursor-pointer">BIO.EXE</button>
              <button onClick={() => openWindow('skills')} className="flex items-center h-full px-2 text-white/70 hover:bg-red-500 hover:text-white transition-colors cursor-pointer">SPECS.SYS</button>
              <button onClick={() => openWindow('projects')} className="flex items-center h-full px-2 text-white/70 hover:bg-red-500 hover:text-white transition-colors cursor-pointer">PROJECTS.DIR</button>
              <button onClick={() => openWindow('contact')} className="flex items-center h-full px-2 text-white/70 hover:bg-red-500 hover:text-white transition-colors cursor-pointer">UPLINK.NET</button>
            </div>
            <div className="flex gap-1">
              <div className="text-xs mr-2 flex items-center">CPU: OPTIMAL</div>
            </div>
          </nav>

          {/* Desktop Canvas (Windows container) */}
          <main className="w-full h-[calc(100vh-40px)] pt-8 relative z-10 overflow-hidden">
            
            {/* Background space image & Code Stream */}
            <div className="absolute inset-0 pointer-events-none">
                <img className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-40" src="/background.png" alt="Space" />
                <CodeStreamBackground />
            </div>

            {/* INITIALIZE.BAT (Hero) */}
            {getWindow('hero') && (
              <OSWindow
                {...getWindow('hero')!}
                onFocus={() => focusWindow('hero')}
                onMinimize={() => minimizeWindow('hero')}
                onMaximize={() => toggleMaximize('hero')}
                onClose={() => closeWindow('hero')}
                initialX={100}
                initialY={100}
                defaultWidth="w-[700px]"
              >
                <div className="p-8 border border-secondary-fixed/30 bg-surface-container-lowest/80 backdrop-blur-sm text-center h-full flex flex-col justify-center items-center min-h-[350px]">
                  <h1 className="font-display-header text-4xl md:text-5xl text-primary mb-4 drop-shadow-[0_0_10px_rgba(180,197,255,0.8)]">VINÍCIUS ALMEIDA</h1>
                  <p className="text-secondary mb-6 blinking-cursor">&gt; CREATIVE DEVELOPER _ SYSTEM ARCHITECT _ UI/UX EXPLORER</p>
                  <div className="flex justify-center gap-4 mt-8">
                    <button onClick={() => openWindow('projects')} className="bg-surface btn-bevel px-6 py-2 text-primary font-label-caps text-label-caps uppercase hover:text-white hover:bg-primary-container transition-colors shadow-[0_0_15px_rgba(0,83,225,0.5)]">
                      [ EXECUTE_PORTFOLIO ]
                    </button>
                    <button onClick={() => openWindow('contact')} className="bg-surface btn-bevel px-6 py-2 text-secondary font-label-caps text-label-caps uppercase hover:text-white hover:bg-secondary-container transition-colors">
                      [ INITIATE_COMMS ]
                    </button>
                  </div>
                </div>
              </OSWindow>
            )}

            {/* BIO_ENCRYPTED.EXE */}
            {getWindow('bio') && (
              <OSWindow
                {...getWindow('bio')!}
                onFocus={() => focusWindow('bio')}
                onMinimize={() => minimizeWindow('bio')}
                onMaximize={() => toggleMaximize('bio')}
                onClose={() => closeWindow('bio')}
                initialX={200}
                initialY={150}
                defaultWidth="w-[850px]"
              >
                <div className="flex flex-col h-full bg-[#c0c0c0] font-sans text-black">
                  {/* IE Toolbar */}
                  <div className="border-b border-[#808080] pb-1">
                    <div className="flex gap-4 px-2 py-1 text-sm bg-[#c0c0c0] shadow-[0_1px_0_white]">
                      <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">File</span>
                      <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">Edit</span>
                      <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">View</span>
                      <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">Favorites</span>
                      <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">Help</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 mt-1">
                      <span className="text-sm text-gray-700">Address</span>
                      <div className="flex-1 bg-white border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-2 py-0.5 text-sm flex items-center">
                        <Image src="/internet.svg" alt="IE" width={16} height={16} className="mr-2" />
                        http://valmeida.net/about-me.html
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="flex-1 overflow-auto bg-white border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white m-1 p-6 flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-1/3 border border-gray-300 p-2 bg-gray-50 flex-shrink-0 shadow-md">
                      <img className="w-full aspect-square object-cover opacity-90 transition-all duration-500 pointer-events-none" src="/myPicture.webp" alt="Profile" />
                      <div className="mt-2 text-center text-gray-700 text-sm font-bold">Vinícius Almeida</div>
                    </div>
                    <div className="text-gray-800 space-y-4 w-full text-sm leading-relaxed">
                      <h2 className="text-2xl text-[#000080] font-bold border-b border-gray-300 pb-2">About Me</h2>
                      <p>I am a Creative Developer specializing in bridging the gap between robust system architecture and immersive, high-fidelity user experiences. With a foundation built on full-stack technologies, I construct digital environments that are as functional as they are visually compelling.</p>
                      
                      {!getWindow('bio')?.isMaximized ? (
                        <>
                          <p>Operating primarily within the React ecosystem, I engineer interfaces that evoke emotion while maintaining strict performance standards.</p>
                          <div className="mt-4 p-4 border border-blue-200 bg-blue-50">
                            <ul className="space-y-2">
                              <li><strong>Role:</strong> Frontend Engineer</li>
                              <li><strong>Focus:</strong> UI/UX Architecture</li>
                              <li><strong>Status:</strong> Available for work</li>
                            </ul>
                          </div>
                        </>
                      ) : (
                        <div className="animate-in fade-in duration-500 space-y-6">
                          <p>My approach blends modern technical capabilities with distinct, narrative-driven aesthetics—often drawing inspiration from retro-computing, sci-fi interfaces, and industrial design.</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border border-gray-300 bg-gray-50 shadow-sm">
                              <h4 className="text-[#000080] mb-2 font-bold">Background</h4>
                              <p className="text-xs text-gray-600">Started journey in web development focusing on raw performance and logic. Evolved into full-stack architecture with a passion for visually striking user interfaces.</p>
                            </div>
                            <div className="p-4 border border-gray-300 bg-gray-50 shadow-sm">
                              <h4 className="text-[#000080] mb-2 font-bold">Objective</h4>
                              <p className="text-xs text-gray-600">To build scalable applications that do not compromise on the artistic and aesthetic experience. The web is a canvas, and code is the brush.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </OSWindow>
            )}

            {/* HARDWARE_MONITOR */}
            {getWindow('hardware') && (
              <OSWindow
                {...getWindow('hardware')!}
                onFocus={() => focusWindow('hardware')}
                onMinimize={() => minimizeWindow('hardware')}
                onMaximize={() => toggleMaximize('hardware')}
                onClose={() => closeWindow('hardware')}
                initialX={850}
                initialY={80}
                defaultWidth="w-[300px]"
              >
                <div className="p-4 bg-black h-full min-h-[200px] flex items-center justify-center relative">
                  <img className="w-full h-full object-cover opacity-50 absolute inset-0 mix-blend-screen pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu4ILfoFkS54jFQvxSKX_PsgJPpkTjBOn-pUQroxpj1ZpCNX4TuZu9J7UvUtsQyflUMTw5u44jqC7kzfiWBV3xV6nNVSGU8Zo3-kN0K3UYwVQXM61mZk6oP0EP_MQAmSZtfztHwfW_dqpdF_FJRjvdPYpZeeV0BRD2wu_TC42Ip0PebvTWNUnlCIIGQTmsqbct9QWJKjGUFL413ds-brlRUcbQQOs7jDmsHHU8vgaZB95K-R9_fsS1igw_CK_2LqQVuKkK1tbFrcfi" alt="Hardware" />
                  <div className={`z-10 text-center border-2 border-secondary-fixed p-4 bg-surface-container-lowest/90 backdrop-blur w-full ${getWindow('hardware')?.isMaximized ? 'grid grid-cols-2 gap-8 text-left' : ''}`}>
                    
                    <div>
                      <div className="text-secondary text-xl mb-2 text-center">SYSTEM: OPTIMAL</div>
                      <div className="w-full bg-surface-variant h-4 border border-outline-variant mt-2">
                        <div className="bg-secondary-container h-full w-[85%]"></div>
                      </div>
                      <div className="text-xs text-on-surface-variant mt-1 flex justify-between">
                        <span>CPU LOAD:</span> <span>85%</span>
                      </div>
                      <div className="w-full bg-surface-variant h-4 border border-outline-variant mt-2">
                        <div className="bg-primary-fixed h-full w-[40%]"></div>
                      </div>
                      <div className="text-xs text-on-surface-variant mt-1 flex justify-between">
                        <span>MEM USE:</span> <span>40%</span>
                      </div>
                    </div>

                    {getWindow('hardware')?.isMaximized && (
                      <div className="animate-in fade-in duration-500">
                        <div className="text-secondary text-xl mb-2 text-center">NETWORK_IO</div>
                        <div className="w-full bg-surface-variant h-4 border border-outline-variant mt-2">
                          <div className="bg-tertiary-container h-full w-[60%]"></div>
                        </div>
                        <div className="text-xs text-on-surface-variant mt-1 flex justify-between">
                          <span>UPLINK:</span> <span>1.2 Gbps</span>
                        </div>
                        <div className="w-full bg-surface-variant h-4 border border-outline-variant mt-2">
                          <div className="bg-tertiary-container h-full w-[90%]"></div>
                        </div>
                        <div className="text-xs text-on-surface-variant mt-1 flex justify-between">
                          <span>DOWNLINK:</span> <span>3.4 Gbps</span>
                        </div>
                        <div className="mt-6 border border-outline-variant p-2 bg-surface text-xs text-secondary blinking-cursor font-terminal-md">
                          &gt; PING: 12ms<br/>
                          &gt; PACKETS LOST: 0%<br/>
                          &gt; NODE: ACTIVE
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </OSWindow>
            )}

            {/* CORE_SYSTEM_SPECS.SYS (Skills) */}
            {getWindow('skills') && (
              <OSWindow
                {...getWindow('skills')!}
                onFocus={() => focusWindow('skills')}
                onMinimize={() => minimizeWindow('skills')}
                onMaximize={() => toggleMaximize('skills')}
                onClose={() => closeWindow('skills')}
                initialX={150}
                initialY={400}
                defaultWidth="w-[900px]"
              >
                <div className="p-container-padding flex flex-col gap-8 h-full overflow-y-auto">
                  
                  <div>
                    <h3 className="text-secondary font-label-caps text-sm mb-4 border-b border-outline-variant pb-2 uppercase tracking-widest">&gt; PRIMARY_DIRECTIVES</h3>
                    <div className={`grid grid-cols-1 ${getWindow('skills')?.isMaximized ? 'md:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-4'} gap-4`}>
                      {[
                        { name: 'JAVASCRIPT', icon: 'javascript', val: '90%', ver: 'v.ES6+', color: 'primary-fixed' },
                        { name: 'TYPESCRIPT', icon: 'code', val: '85%', ver: 'v.5.0+', color: 'primary-fixed' },
                        { name: 'REACT.JS', icon: 'api', val: '95%', ver: 'v.18.0', color: 'secondary-fixed' },
                        { name: 'NODE.JS', icon: 'dns', val: '75%', ver: 'v.20.0', color: 'secondary-fixed' },
                      ].map((skill) => (
                        <div key={skill.name} className={`border border-outline-variant bg-surface p-4 transition-colors group cursor-default`}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 bg-black border border-${skill.color} flex items-center justify-center text-${skill.color}`}>
                              <span className="material-symbols-outlined">{skill.icon}</span>
                            </div>
                            <div className={`font-label-caps text-label-caps text-${skill.color}`}>{skill.name}</div>
                          </div>
                          <div className="w-full bg-black terminal-input h-3">
                            <div 
                              className={`bg-${skill.color} h-full`} 
                              style={{ width: skill.val, boxShadow: skill.color.includes('primary') ? '0 0 8px rgba(219,225,255,0.8)' : '0 0 8px rgba(116,255,106,0.8)' }}
                            ></div>
                          </div>
                          <div className="text-right text-xs mt-1 text-on-surface-variant">{skill.ver} [{skill.val}]</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {getWindow('skills')?.isMaximized && (
                    <div className="animate-in fade-in duration-500 pb-4">
                      <h3 className="text-tertiary font-label-caps text-sm mb-4 border-b border-outline-variant pb-2 uppercase tracking-widest">&gt; SECONDARY_MODULES & PROTOCOLS</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { name: 'NEXT.JS', type: 'FRAMEWORK', lvl: 'ADVANCED' },
                          { name: 'TAILWIND CSS', type: 'STYLING', lvl: 'EXPERT' },
                          { name: 'PRISMA ORM', type: 'DATABASE', lvl: 'INTERMEDIATE' },
                          { name: 'POSTGRESQL', type: 'DATABASE', lvl: 'ADVANCED' },
                          { name: 'DOCKER', type: 'DEVOPS', lvl: 'INTERMEDIATE' },
                          { name: 'THREE.JS', type: '3D/WEBGL', lvl: 'EXPLORING' },
                          { name: 'GSAP', type: 'ANIMATION', lvl: 'ADVANCED' },
                          { name: 'GIT', type: 'VCS', lvl: 'EXPERT' },
                        ].map(tool => (
                          <div key={tool.name} className="border border-outline-variant bg-surface-dim p-3 flex flex-col justify-between h-24">
                            <span className="font-terminal-md text-white text-lg">{tool.name}</span>
                            <div className="flex justify-between items-end mt-auto">
                              <span className="text-[10px] text-primary">{tool.type}</span>
                              <span className="text-[10px] text-on-surface-variant border border-outline-variant px-1 bg-black">{tool.lvl}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </OSWindow>
            )}

            {/* PROJECT_VAULT.DIR */}
            {getWindow('projects') && (
              <OSWindow
                {...getWindow('projects')!}
                onFocus={() => focusWindow('projects')}
                onMinimize={() => minimizeWindow('projects')}
                onMaximize={() => toggleMaximize('projects')}
                onClose={() => closeWindow('projects')}
                initialX={250}
                initialY={300}
                defaultWidth="w-[960px]"
              >
                <div className="flex flex-col h-full bg-[#c0c0c0] font-sans text-black">
                  {/* File Explorer Toolbar */}
                  <div className="border-b border-[#808080] pb-1">
                    <div className="flex gap-4 px-2 py-1 text-sm bg-[#c0c0c0] shadow-[0_1px_0_white]">
                      <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">File</span>
                      <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">Edit</span>
                      <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">View</span>
                      <span className="hover:bg-[#000080] hover:text-white px-1 cursor-default">Help</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-1 overflow-hidden m-1 border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white">
                    {/* Sidebar */}
                    <div className="w-48 bg-white border-r border-[#808080] p-2 hidden md:block shrink-0">
                      <div className="flex items-center gap-2 mb-2 cursor-pointer bg-[#000080] text-white px-1">
                        <Image src="/file.svg" alt="Folder" width={16} height={16} />
                        <span className="text-sm">My Projects</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2 pl-4 cursor-pointer text-black hover:bg-[#000080] hover:text-white px-1">
                        <Image src="/file.svg" alt="Folder" width={16} height={16} />
                        <span className="text-sm">Client Work</span>
                      </div>
                      <div className="flex items-center gap-2 pl-4 cursor-pointer text-black hover:bg-[#000080] hover:text-white px-1">
                        <Image src="/file.svg" alt="Folder" width={16} height={16} />
                        <span className="text-sm">Experiments</span>
                      </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className={`bg-white p-4 flex-1 ${getWindow('projects')?.isMaximized ? 'overflow-y-auto' : 'overflow-x-auto'}`}>
                      <div className={`${getWindow('projects')?.isMaximized ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex gap-6 min-w-max pb-4 h-full'}`}>
                        {[
                          { title: 'BPet System', type: 'React/Node', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEfRL3dKTLEPHLQOxClkM4vqE827PoNOl-P2KmaQDAAKcalGOO9G5kca9bTe5FPDNR8HfF4s0nzZyRmD3D8u6xUQyikBCM3qrrNb0TPKJ2-trwEE5_qkK1MY8f83plYIKIF5o-CBq7vpP8U98XcjbuMouPCK3uDGVtQEunXlyw-T_sknLWDdMLEnWb-n9XyxWR5m8zXFfMJQs4GQ05oQ4glg1aMSYCBQisW6j0EB4-iDScyEfAQMa6V9e07PLkXvvtDolzx-QcdTVR', desc: 'Comprehensive veterinary management platform built with React and Node.js.', size: '4.2GB', extended: 'Includes complex state management for patient records, scheduling modules, and billing integration using Stripe. Built as a PWA for offline capabilities in rural veterinary clinics.' },
                          { title: 'ESP-PB', type: 'IoT Dashboard', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAByM7v6r6qRB6lXLYjpozMCIFtw2hUkpF-k0BG39RX89rN8aKGRfsBqJevptAmh7jb5aHUe8zkbD61HT6iBuF11zUvTwowDOA5JtwASUTXDBAJpWh5AMmNUJ06sZKPJkduQBcqqJqHNqbpBOiYJXVZTg8LUcDhmwXVsxT5F4a-QQjiPMfbCQL6js8l7vt6h0kBF8VakGjMTul_6TvQ9hLnlwqfFxjEHo2mqVug2Lh5qVlu6VAhQTu8oN7BwdxYjYDqJ-T4Jukra7ij', desc: 'IoT dashboard for real-time monitoring of ESP8266 devices.', size: '1.1GB', extended: 'Utilizes WebSockets for instant data visualization and telemetry. Handles thousands of events per second with optimized React rendering. Backend powered by Node.js and MQTT brokers.' },
                          { title: 'PM-PB', type: 'Next.js App', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFPNKRoWbfSDeS0QGtf1Vblaf74rY0qIN1e-B4eTArve7SWUoYXA0DpFTIEmwG5TypJWxAnmvGphCyszNBYm3icYkvaXweWoUYH235TnRxC1wOM7DBYOeTryztnHpgDgx2Ch5T3cCNEiOQHObw-Jq51xNbAp1xupfgnZkkzMHSjxFt70mkOvk5wlE1q1VpiJZnn3PYkTWI3VLmK4CHtFxghTl9g8etYa7CHkGc5tTO4MMWUASiSWnT9zBAkfeWP_FBi5OCJsOspN0Y', desc: 'Project management tool designed for agile teams.', size: '2.8GB', extended: 'Custom drag-and-drop interface prioritizing keyboard navigation. Integrates deeply with Git providers for automated commit tracking. Built with Next.js App Router and Prisma.' }
                        ].map((proj) => (
                          <div key={proj.title} className={`${getWindow('projects')?.isMaximized ? 'w-full' : 'w-64'} bg-[#f0f0f0] border border-[#a0a0a0] flex flex-col shrink-0 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group`}>
                            <div className={`${getWindow('projects')?.isMaximized ? 'h-48' : 'h-32'} border-b border-[#a0a0a0] relative overflow-hidden bg-white transition-all duration-300`}>
                              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={proj.img} alt={proj.title} />
                            </div>
                            <div className="p-3 flex-1 flex flex-col">
                              <div className="flex items-center gap-2 mb-1">
                                <Image src="/file.svg" alt="File" width={16} height={16} />
                                <h3 className={`font-bold text-gray-800 ${getWindow('projects')?.isMaximized ? 'text-lg' : 'text-md'}`}>{proj.title}</h3>
                              </div>
                              <div className="text-xs text-gray-500 mb-2">{proj.type} • {proj.size}</div>
                              <p className="text-sm text-gray-700 flex-1 mb-4">
                                {proj.desc}
                                {getWindow('projects')?.isMaximized && (
                                  <span className="block mt-2 text-gray-600 border-l-2 border-blue-500 pl-2 animate-in fade-in">{proj.extended}</span>
                                )}
                              </p>
                              <div className="mt-auto flex gap-2">
                                <button className="bg-gradient-to-b from-[#f9f9f9] to-[#dfdfdf] border border-[#8f8f8f] hover:border-[#3399ff] px-3 py-1 text-xs rounded text-black shadow-sm">Open</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </OSWindow>
            )}

            {/* COMM_UPLINK.NET */}
            {getWindow('contact') && (
              <OSWindow
                {...getWindow('contact')!}
                onFocus={() => focusWindow('contact')}
                onMinimize={() => minimizeWindow('contact')}
                onMaximize={() => toggleMaximize('contact')}
                onClose={() => closeWindow('contact')}
                initialX={400}
                initialY={200}
                defaultWidth="w-[450px]"
              >
                <div className="flex flex-col h-full bg-[#ece9d8] font-sans text-black">
                  {/* MSN Header */}
                  <div className="bg-gradient-to-r from-[#0055e5] to-[#2a80ff] p-2 flex items-center gap-2 text-white">
                    <Image src="/chat.svg" alt="Chat" width={24} height={24} />
                    <span className="font-bold text-sm shadow-[1px_1px_0_rgba(0,0,0,0.5)]">Vinícius - Instant Messenger</span>
                  </div>
                  
                  {/* Chat Area */}
                  <div className="flex-1 p-2 flex flex-col gap-2 bg-[#ece9d8]">
                    <div className="bg-white border border-[#7f9db9] flex-1 p-3 overflow-y-auto text-sm shadow-inner min-h-[150px]">
                      <div className="text-gray-500 mb-2 text-center text-xs">--- Vinícius is Online ---</div>
                      <div className="mb-2">
                        <span className="font-bold text-blue-700">Vinícius says:</span>
                        <div className="ml-2 text-gray-800">Hey! Looking to start a project? Or just want to connect? Send me a message below.</div>
                      </div>
                    </div>
                    
                    {/* Input Area */}
                    <form className="flex flex-col gap-2">
                      <textarea className="w-full border border-[#7f9db9] p-2 text-sm focus:outline-none focus:border-[#0055e5] resize-none shadow-inner" rows={3} placeholder="Type your message here..."></textarea>
                      <div className="flex justify-between items-center gap-2">
                        <input className="border border-[#7f9db9] p-1 text-sm flex-1 focus:outline-none focus:border-[#0055e5]" type="email" placeholder="Your email/contact" />
                        <button type="button" className="px-6 py-1 bg-gradient-to-b from-[#f9f9f9] to-[#dfdfdf] border border-[#8f8f8f] hover:from-[#e3f0ff] hover:to-[#c3e1ff] hover:border-[#3399ff] rounded text-sm shadow-sm font-bold text-gray-700">
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </OSWindow>
            )}

          </main>

          {/* Bottom Nav Bar / Taskbar */}
          <div className="fixed bottom-0 left-0 w-full z-[9999] flex items-center bg-gray-300 dark:bg-[#1a1b26] h-10 px-0 border-t-2 border-white/20 shadow-[inset_0_-2px_0_rgba(0,0,0,0.5),0_-4px_10px_rgba(0,83,225,0.3)] font-terminal-md text-lg uppercase text-black dark:text-white select-none">
            {/* Start/Launch Button */}
            <div 
              className="h-full flex items-center pr-4 pl-2 bg-gradient-to-r from-green-600 to-green-400 rounded-r-full shadow-[inset_2px_2px_0_rgba(255,255,255,0.5)] border-r-2 border-black mr-2 hover:brightness-110 cursor-pointer text-white font-black italic gap-1"
              onClick={() => openWindow('hero')}
            >
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              LAUNCH
            </div>
            
            <div className="flex h-full flex-1 overflow-x-auto no-scrollbar items-center gap-1 px-1">
              {[
                { id: 'hero', icon: '/terminal.svg' },
                { id: 'bio', icon: '/internet.svg' },
                { id: 'skills', icon: '/terminal.svg' },
                { id: 'projects', icon: '/file.svg' },
                { id: 'contact', icon: '/chat.svg' }
              ].map(app => {
                const w = getWindow(app.id);
                if (!w) return null;
                return (
                  <button 
                    key={app.id}
                    onClick={() => {
                      if (!w.isOpen) openWindow(w.id);
                      else if (w.isMinimized) focusWindow(w.id);
                      else minimizeWindow(w.id);
                    }}
                    className={`flex justify-center items-center w-12 h-10 border shrink-0 transition-all cursor-pointer
                      ${w.isOpen && !w.isMinimized ? 'bg-surface-bright border-b-black border-r-black border-t-white/30 border-l-white/30 shadow-[inset_2px_2px_0_rgba(0,0,0,0.5)]' : 'bg-surface-container border-b-white/30 border-r-white/30 border-t-black border-l-black hover:bg-surface-bright'}
                    `}
                    title={w.title}
                  >
                    <Image src={app.icon} alt={app.id} width={28} height={28} className={!w.isOpen ? 'opacity-80' : 'opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'} />
                  </button>
                );
              })}
            </div>
            <div className="px-4 border-l border-white/20 h-full flex items-center text-secondary text-sm font-label-caps bg-black/20">
               {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
