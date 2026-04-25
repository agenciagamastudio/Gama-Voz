'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import NavDropdown from './NavDropdown';

interface BrandbookLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function BrandbookLayout({ children, title = 'GAMA VOZ', description }: BrandbookLayoutProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'lime' | 'gold'>('lime');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modes = {
    lime: {
      canvas: '#161616',
      surface: '#272727',
      surfaceOverlay: 'rgba(39, 39, 39, 0.8)',
      border: 'rgba(255, 255, 255, 0.1)',
      text: '#FFFFFF',
      textSecondary: '#A1A1AA',
      dim: '#666666',
      primary: '#88CE11',
    },
    gold: {
      canvas: '#161616',
      surface: '#272727',
      surfaceOverlay: 'rgba(39, 39, 39, 0.8)',
      border: 'rgba(255, 255, 255, 0.1)',
      text: '#FFFFFF',
      textSecondary: '#A1A1AA',
      dim: '#666666',
      primary: '#DAA520',
    },
  };

  const sidebarItems = [
    // FUNDAMENTOS
    { label: 'Manifesto', href: '/movimento#manifesto', group: 'Fundamentos' },
    { label: 'Propósito', href: '/movimento#proposito', group: 'Fundamentos' },
    { label: 'Valores', href: '/movimento#valores', group: 'Fundamentos' },
    { label: 'Arquétipo', href: '/movimento#arquetipo', group: 'Fundamentos' },
    // ESTRATÉGIA
    { label: 'Posicionamento', href: '/movimento#posicionamento', group: 'Estratégia' },
    { label: 'Contraste', href: '/movimento#contraste', group: 'Estratégia' },
    { label: 'BrandScript', href: '/movimento#brandscript', group: 'Estratégia' },
    // IDENTIDADE VERBAL
    { label: 'Truelines', href: '/movimento#truelines', group: 'Identidade Verbal' },
    { label: 'Voz & Tom', href: '/movimento#voz-tom', group: 'Identidade Verbal' },
    { label: 'Naming', href: '/movimento#naming', group: 'Identidade Verbal' },
    { label: 'Vocabulário', href: '/movimento#vocabulario', group: 'Identidade Verbal' },
  ];

  const modeConfig = modes[mode];

  return (
    <>
      <Head>
        <title>{`${title || 'GAMA VOZ'} — GAMA VOZ Brandbook`}</title>
        <meta name="description" content={description || 'GAMA VOZ Brand Book Interativo'} />
      </Head>

      <style suppressHydrationWarning>{`
        :root {
          --bb-primary: ${modeConfig.primary};
          --bb-secondary: #7C3AED;
          --bb-accent: #10B981;
          --bb-dark: ${modeConfig.canvas};
          --bb-surface: ${modeConfig.surface};
          --bb-surface-overlay: ${modeConfig.surfaceOverlay};
          --bb-border: ${modeConfig.border};
          --bb-text: ${modeConfig.text};
          --bb-text-secondary: ${modeConfig.textSecondary};
          --bb-canvas: ${modeConfig.canvas};
          --bb-lime: #88CE11;
          --bb-gold: #DAA520;
          --bb-dim: ${modeConfig.dim};
          --bb-accent-20: rgba(136, 206, 17, 0.2);
        }

        .neon-glow {
          box-shadow: 0 0 15px rgba(136, 206, 17, 0.4);
        }

        .cockpit-grid {
          background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0);
          background-size: 40px 40px;
        }
      `}</style>

      <div className="brandbook-root" suppressHydrationWarning data-bb-mode={mode} style={{ backgroundColor: 'var(--bb-canvas)', minHeight: '100vh', color: 'var(--bb-text)' }}>
        {/* Sidebar Navigation */}
        {router.pathname === '/movimento' && (
          <Sidebar items={sidebarItems} currentPath={router.pathname} />
        )}

        {/* Top Navigation */}
        <nav className="bb-site-nav fixed top-0 left-0 right-0 z-50 border-b border-[var(--bb-border)] bg-[var(--bb-canvas)]/80 backdrop-blur" style={{ backgroundColor: 'rgba(22, 22, 22, 0.8)' }}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="bb-nav-logo flex items-center gap-2">
              <span className="text-2xl font-black text-[var(--bb-primary)]">🎤</span>
              <span className="font-black" style={{ color: modeConfig.text }}>GAMA VOZ</span>
            </Link>

            {/* Links */}
            <div className="hidden md:flex items-center gap-8 flex-1 ml-12">
              <NavDropdown
                label="Brandbook"
                items={[
                  { label: 'Guidelines', href: '/guidelines' },
                  { label: 'Movimento', href: '/movimento' },
                ]}
                textColor={modeConfig.text}
              />

              <NavDropdown
                label="Design System"
                items={[
                  { label: 'Logo System', href: '/logo' },
                  { label: 'Components', href: '/components' },
                  { label: 'Effects', href: '/effects' },
                ]}
                textColor={modeConfig.text}
              />

              <NavDropdown
                label="Showcase"
                items={[
                  { label: 'Mockups', href: '/mockups' },
                  { label: 'Apparel', href: '/apparel' },
                  { label: 'Slides', href: '/slides' },
                ]}
                textColor={modeConfig.text}
              />
            </div>

            {/* Mode Switcher — Lime/Gold (Stitch Style) */}
            <div className="hidden md:flex items-center gap-2 bg-zinc-900 rounded-full p-1 border border-white/10">
              <button
                onClick={() => setMode('lime')}
                className={`px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider transition-all ${
                  mode === 'lime'
                    ? 'bg-[#88CE11] text-black neon-glow'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                LIME
              </button>
              <button
                onClick={() => setMode('gold')}
                className={`px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider transition-all ${
                  mode === 'gold'
                    ? 'bg-[#DAA520] text-black neon-glow'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                GOLD
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-20 px-6" style={{ marginLeft: router.pathname === '/movimento' ? 'var(--sidebar-width, 256px)' : '0' }}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[var(--bb-border)] mt-24 py-12">
          <div className="max-w-7xl mx-auto px-6 text-center text-[var(--bb-text-secondary)] text-sm">
            <p>Made with ❤️ for GAMA VOZ</p>
            <p>Keep it simple. Keep it fast. Keep it green. #88CE11</p>
          </div>
        </footer>
      </div>
    </>
  );
}
