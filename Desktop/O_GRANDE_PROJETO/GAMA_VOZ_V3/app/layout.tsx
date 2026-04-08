import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GAMA VOZ V3 - Transcrição de Áudio com IA',
  description: 'Plataforma de transcrição de áudio em tempo real usando design system GAMA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
