import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Geist } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  weight: ['400', '500', '600']
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700']
});

import { Orbitron, VT323, Instrument_Serif, IBM_Plex_Mono } from 'next/font/google';
import { cn } from "@/lib/utils";

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['300', '400', '500'],
});

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '700', '900']
});

const vt323 = VT323({
  subsets: ['latin'],
  variable: '--font-vt323',
  weight: ['400']
});


export const metadata: Metadata = {
  title: 'Vinícius Almeida | Portifolio',
  description: 'Portfólio de Vinícius Almeida - Desenvolvedor Full Stack Júnior',
  icons: {
    icon: '/logo.svg',
  },  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={cn("dark", inter.variable, spaceGrotesk.variable, orbitron.variable, vt323.variable, instrumentSerif.variable, ibmPlexMono.variable, "font-sans", geist.variable)}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-surface antialiased overflow-x-hidden selection:bg-primary-container selection:text-white font-body">
        {children}
      </body>
    </html>
  );
}
