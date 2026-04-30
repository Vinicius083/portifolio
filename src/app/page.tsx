'use client';

import React, { useState, useEffect } from 'react';
import BootScreen from '@/components/BootScreen';
import OSWindow from '@/components/OSWindow';
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
            <div className="text-sm font-black text-white italic">MISSION_CONTROL_v1.0</div>
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
            
            {/* Background space image */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <img className="w-full h-full object-cover mix-blend-screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe5GQOOs2Ch3TG-84UEpjiPR_g2Z6LVCFDUfQsm5QnDNLdNd7ljrE2BB49hptFDOZwbmhG5voufuCDronxmm0WT8VOHEAe23jAMw9F7-_xrxgRpUEoG74b_-UmSPc20Zrus58I68OKRS-xm2mVjEdivtPl9aw__U5Z3XMj8VS1LsWhjitS-k5RPutsIc_4zKJZ7pVq1XyqHdH4mvwh1EU2mvsaxdKLR2HjyORpDCL0q7AkQPbqj9LqEhLbbHVTFeqmrxFn0z-714h5" alt="Space" />
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
                <div className="p-container-padding flex flex-col md:flex-row gap-6 items-start h-full">
                  <div className="w-full md:w-1/3 border-2 border-outline-variant p-2 bg-black flex-shrink-0">
                    <img className="w-full aspect-square object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz4275Pb2tIos89RgTqpKpclOoLMmR0rch0PbY-AmYM5rx_z3luBN8RspnnxtSBL3cBbwdmw-ZcIpEjdBLDyINn_zYUqJFDuNvy5Wg4dNe8n8UG-4oSGV0HsAdng_88hv-l-3mA1pHlyrfqQIENfEK8c7C-EyDjQzu9zEDc7xadLdgQk-Sc-H2Tuoi2CzCeZz_-EFX6PnqFH1vDcQx4lBrLk5CTP8wA_XMXYtwNsWBCxkomDcKpSoyPOI75x1RjwFMqRhCawhP6ktS" alt="Profile" />
                    <div className="mt-2 text-center text-on-surface-variant text-sm font-label-caps">ID: V.ALMEIDA_77</div>
                  </div>
                  <div className="text-on-surface space-y-4">
                    <p className="text-secondary blinking-cursor">&gt; DECRYPTING DATA STREAM...</p>
                    <p>I am a Creative Developer specializing in bridging the gap between robust system architecture and immersive, high-fidelity user experiences. With a foundation built on full-stack technologies, I construct digital environments that are as functional as they are visually compelling.</p>
                    <p>Operating primarily within the React ecosystem, I engineer interfaces that evoke emotion while maintaining strict performance standards. My approach blends modern technical capabilities with distinct, narrative-driven aesthetics—often drawing inspiration from retro-computing, sci-fi interfaces, and industrial design.</p>
                    <div className="mt-4 p-4 border border-outline-variant bg-surface-dim">
                      <ul className="space-y-2 text-sm text-on-surface-variant">
                        <li><span className="text-primary-fixed">CLASS:</span> FRONTEND ENGINEER</li>
                        <li><span className="text-primary-fixed">SPECIALIZATION:</span> UI/UX ARCHITECTURE</li>
                        <li><span className="text-primary-fixed">STATUS:</span> ONLINE_AND_SEARCHING</li>
                      </ul>
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
                  <div className="z-10 text-center border-2 border-secondary-fixed p-4 bg-surface-container-lowest/90 backdrop-blur w-full">
                    <div className="text-secondary text-xl mb-2">SYSTEM: OPTIMAL</div>
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
                <div className="p-container-padding grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
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
                <div className="p-container-padding overflow-x-auto h-full">
                  <div className="flex gap-6 min-w-max pb-4 h-full">
                    {[
                      { title: 'BPet System', type: '.EXE', color: 'primary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEfRL3dKTLEPHLQOxClkM4vqE827PoNOl-P2KmaQDAAKcalGOO9G5kca9bTe5FPDNR8HfF4s0nzZyRmD3D8u6xUQyikBCM3qrrNb0TPKJ2-trwEE5_qkK1MY8f83plYIKIF5o-CBq7vpP8U98XcjbuMouPCK3uDGVtQEunXlyw-T_sknLWDdMLEnWb-n9XyxWR5m8zXFfMJQs4GQ05oQ4glg1aMSYCBQisW6j0EB4-iDScyEfAQMa6V9e07PLkXvvtDolzx-QcdTVR', desc: 'Comprehensive veterinary management platform built with React and Node.js.', size: '4.2GB' },
                      { title: 'ESP-PB', type: '.SYS', color: 'secondary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAByM7v6r6qRB6lXLYjpozMCIFtw2hUkpF-k0BG39RX89rN8aKGRfsBqJevptAmh7jb5aHUe8zkbD61HT6iBuF11zUvTwowDOA5JtwASUTXDBAJpWh5AMmNUJ06sZKPJkduQBcqqJqHNqbpBOiYJXVZTg8LUcDhmwXVsxT5F4a-QQjiPMfbCQL6js8l7vt6h0kBF8VakGjMTul_6TvQ9hLnlwqfFxjEHo2mqVug2Lh5qVlu6VAhQTu8oN7BwdxYjYDqJ-T4Jukra7ij', desc: 'IoT dashboard for real-time monitoring of ESP8266 devices.', size: '1.1GB' },
                      { title: 'PM-PB', type: '.BAT', color: 'tertiary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFPNKRoWbfSDeS0QGtf1Vblaf74rY0qIN1e-B4eTArve7SWUoYXA0DpFTIEmwG5TypJWxAnmvGphCyszNBYm3icYkvaXweWoUYH235TnRxC1wOM7DBYOeTryztnHpgDgx2Ch5T3cCNEiOQHObw-Jq51xNbAp1xupfgnZkkzMHSjxFt70mkOvk5wlE1q1VpiJZnn3PYkTWI3VLmK4CHtFxghTl9g8etYa7CHkGc5tTO4MMWUASiSWnT9zBAkfeWP_FBi5OCJsOspN0Y', desc: 'Project management tool designed for agile teams.', size: '2.8GB' }
                    ].map((proj) => (
                      <div key={proj.title} className="w-80 bg-surface border-2 border-outline-variant flex flex-col btn-bevel shrink-0">
                        <div className="h-40 border-b-2 border-outline-variant relative overflow-hidden bg-black group">
                          <img className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" src={proj.img} alt={proj.title} />
                          <div className={`absolute top-2 left-2 bg-black/80 px-2 py-1 text-xs border border-${proj.color}-fixed text-${proj.color}-fixed`}>{proj.type}</div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <h3 className={`font-display-header text-xl text-${proj.color} mb-2`}>{proj.title}</h3>
                          <p className="text-sm text-on-surface-variant flex-1 mb-4">{proj.desc}</p>
                          <div className="flex justify-between items-center mt-auto border-t border-outline-variant pt-4">
                            <span className="text-xs text-outline">SIZE: {proj.size}</span>
                            <button className={`${proj.color === 'secondary' ? 'bg-secondary-container text-on-secondary-fixed' : proj.color === 'tertiary' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-primary-container text-on-primary-container'} px-4 py-1 btn-bevel text-sm hover:brightness-125`}>RUN</button>
                          </div>
                        </div>
                      </div>
                    ))}
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
                defaultWidth="w-[600px]"
              >
                <div className="p-container-padding bg-black border-[8px] border-surface-container-lowest h-full">
                  <div className="text-secondary mb-6 border-b border-secondary-fixed/30 pb-2 font-terminal-md">
                    &gt; ESTABLISHING SECURE CONNECTION...<br/>
                    &gt; CONNECTION ESTABLISHED.<br/>
                    &gt; ENTER MESSAGE BELOW:
                  </div>
                  <form className="space-y-4">
                    <div className="flex flex-col">
                      <label className="text-primary-fixed text-sm mb-1">ID [NAME]:</label>
                      <input className="bg-black terminal-input text-secondary focus:ring-0 focus:border-secondary-fixed focus:outline-none p-2 font-terminal-md" placeholder="Enter identification..." type="text" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-primary-fixed text-sm mb-1">ROUTING [EMAIL]:</label>
                      <input className="bg-black terminal-input text-secondary focus:ring-0 focus:border-secondary-fixed focus:outline-none p-2 font-terminal-md" placeholder="Enter routing address..." type="email" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-primary-fixed text-sm mb-1">PAYLOAD [MESSAGE]:</label>
                      <textarea className="bg-black terminal-input text-secondary focus:ring-0 focus:border-secondary-fixed focus:outline-none p-2 font-terminal-md resize-none" placeholder="Transmit data..." rows={4}></textarea>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <button className="bg-black border border-secondary-fixed text-secondary-fixed px-8 py-2 hover:bg-secondary-fixed hover:text-black transition-colors blinking-cursor shadow-[0_0_10px_rgba(116,255,106,0.2)]" type="button">
                        TRANSMIT
                      </button>
                    </div>
                  </form>
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
              {windows.filter(w => w.isOpen).map(w => (
                <button 
                  key={w.id}
                  onClick={() => w.isMinimized ? openWindow(w.id) : minimizeWindow(w.id)}
                  className={`flex items-center gap-2 px-3 h-8 border shrink-0 font-label-caps text-xs
                    ${!w.isMinimized ? 'bg-surface-bright border-b-black border-r-black border-t-white/30 border-l-white/30 shadow-[inset_2px_2px_0_rgba(0,0,0,0.5)] text-primary-fixed' : 'bg-surface-container border-b-white/30 border-r-white/30 border-t-black border-l-black hover:bg-surface-bright text-on-surface'}
                  `}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {w.id === 'hero' ? 'terminal' : w.id === 'bio' ? 'account_circle' : w.id === 'projects' ? 'folder_open' : w.id === 'contact' ? 'chat' : w.id === 'skills' ? 'code' : 'memory'}
                  </span>
                  {w.title.split('\\').pop() || w.title}
                </button>
              ))}
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
