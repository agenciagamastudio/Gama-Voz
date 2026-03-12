import type { Metadata } from 'next'
import { SideNav } from '@/components/platform/SideNav'
import './globals.css'

export const metadata: Metadata = {
  title: 'GAMA Design System',
  description: 'Design System + BrandBook Platform for Grupo Gama',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('gama-theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <div className="flex min-h-screen">
          <SideNav />
          <main className="ml-16 flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
