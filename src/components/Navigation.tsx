'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    // Body overflow toggle
    if (isSidebarOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    const sections = document.querySelectorAll('header, section');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (id) {
                   if (id === 'home') {
                      setActiveSection('');
                   } else {
                      setActiveSection(id);
                   }
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
          if (section.id) observer.unobserve(section);
      });
    };
  }, []);

  const handleLinkClick = (targetId: string) => {
    setActiveSection(targetId);
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  const menuLinks = [
    { label: 'Resume', href: '#about' },
    { label: 'Stack', href: '#stack' },
    { label: 'Journey', href: '#journey' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('');
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div 
        id="sidebar-overlay" 
        className={isSidebarOpen ? 'visible' : ''}
        onClick={toggleSidebar}
      ></div>

      {/* Mobile Sidebar Panel */}
      <aside id="mobile-sidebar" className={isSidebarOpen ? 'open' : ''}>
          <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-black text-white font-headline uppercase tracking-widest">Menu</div>
              <button onClick={toggleSidebar} className="text-white hover:text-[#FF0000] p-2 focus:outline-none">
                  <span className="material-symbols-outlined scale-150">close</span>
              </button>
          </div>
          <div className="flex flex-col gap-10 font-headline tracking-tight uppercase text-xl font-extrabold">
              {menuLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={() => handleLinkClick(link.href.replace('#', ''))}
                  className={`nav-link w-fit ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
          </div>
      </aside>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 md:px-12 bg-[#131313]/80 backdrop-blur-md border-b border-white/5">
          <Link href="#" onClick={handleLogoClick} className="logo-link text-2xl font-black tracking-tighter text-white font-headline uppercase">
            V.ALMEIDA
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-headline tracking-tight uppercase text-sm font-bold nav-container">
              {menuLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={() => handleLinkClick(link.href.replace('#', ''))}
                  className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
              <button onClick={toggleSidebar} className="text-white flex items-center">
                  <span className="material-symbols-outlined">menu</span>
              </button>
          </div>
      </nav>
    </>
  );
}
