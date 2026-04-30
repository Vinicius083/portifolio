'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CODE_SNIPPETS = [
  "import { useState, useEffect } from 'react';",
  "function initializeKernel() {",
  "  const buffer = allocateMemory(1024 * 1024);",
  "  if (!buffer) throw new Error('OOM');",
  "  return buffer;",
  "}",
  "// Decrypting data stream...",
  "const sys = await System.boot();",
  "sys.connect('192.168.1.104');",
  "console.log('Uplink established.');",
  "export default function App() {",
  "  return <KernelProvider>...</KernelProvider>;",
  "}",
  "type UserContext = { role: string; id: number };",
  "interface Process { pid: number; state: string; }",
  "const processes: Process[] = [];",
  "processes.push({ pid: 1, state: 'RUNNING' });",
  "await fetch('/api/telemetry', { method: 'POST' });",
  "function drawFrame() {",
  "  requestAnimationFrame(drawFrame);",
  "  renderer.render(scene, camera);",
  "}",
  "const geometry = new THREE.BoxGeometry();",
  "const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });",
  "const cube = new THREE.Mesh(geometry, material);",
  "scene.add(cube);",
  "camera.position.z = 5;",
];

export default function CodeStreamBackground() {
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate columns scrolling up at different speeds
    if (column1Ref.current) {
      gsap.to(column1Ref.current, { yPercent: -50, ease: "none", duration: 35, repeat: -1 });
    }
    if (column2Ref.current) {
      gsap.to(column2Ref.current, { yPercent: -50, ease: "none", duration: 45, repeat: -1 });
    }
    if (column3Ref.current) {
      gsap.to(column3Ref.current, { yPercent: -50, ease: "none", duration: 25, repeat: -1 });
    }
  }, []);

  // Generate a long list of lines by repeating the snippets
  const generateLines = (count: number) => {
    const lines = [];
    for (let i = 0; i < count; i++) {
      lines.push(CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]);
    }
    // Duplicate to allow seamless looping when yPercent goes to -50
    return [...lines, ...lines];
  };

  const col1Lines = generateLines(30);
  const col2Lines = generateLines(30);
  const col3Lines = generateLines(30);

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-40"
      style={{ 
        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' 
      }}
    >
      <div className="flex justify-center h-full gap-4 max-w-3xl mx-auto">
        {/* Column 1 */}
        <div className="w-64 overflow-hidden relative">
          <div ref={column1Ref} className="absolute top-0 w-full font-terminal-md text-xs md:text-sm text-secondary-fixed/60 whitespace-pre leading-loose blur-[0.5px]">
            {col1Lines.map((line, i) => <div key={i}>{line}</div>)}
          </div>
        </div>

        {/* Column 2 */}
        <div className="w-64 overflow-hidden relative">
          <div ref={column2Ref} className="absolute top-0 w-full font-terminal-md text-sm text-secondary-fixed/50 whitespace-pre leading-loose blur-[1px]">
            {col2Lines.map((line, i) => <div key={i}>{line}</div>)}
          </div>
        </div>

        {/* Column 3 */}
        <div className="w-64 overflow-hidden relative">
          <div ref={column3Ref} className="absolute top-0 w-full font-terminal-md text-xs md:text-sm text-secondary-fixed/40 whitespace-pre leading-loose blur-[0.5px]">
            {col3Lines.map((line, i) => <div key={i}>{line}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
