import type { Metadata } from 'next';
import { Poppins, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GAMA Voz - Audio Transcription',
  description: 'Real-time audio transcription with Groq Whisper API',
  keywords: ['transcription', 'audio', 'whisper', 'groq'],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  colorScheme: 'dark',
  themeColor: '#88CE11',
  authors: [{ name: 'Synkra' }],
  creator: 'Synkra',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://gama-voz.vercel.app',
    title: 'GAMA Voz - Audio Transcription',
    description: 'Real-time audio transcription with Groq Whisper API',
    siteName: 'GAMA Voz',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body>{children}</body>
    </html>
  );
}
