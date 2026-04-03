import type { Metadata } from 'next'
import { SideNav } from '@/components/platform/SideNav'
import { DrawerNav } from '@/components/platform/DrawerNav'
import { MainWrapper } from '@/components/platform/MainWrapper'
import { PageLoadingIndicator } from '@/components/platform/PageLoadingIndicator'
import { SidenavProvider } from '@/components/platform/SidenavContext'
import { BrandProvider } from '@/context/BrandContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'GAMA Design System',
  description: 'Design System + BrandBook Platform for Grupo Gama',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
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
        <BrandProvider>
          <SidenavProvider>
            <PageLoadingIndicator />
            <DrawerNav />
            <div className="flex min-h-screen w-full">
              <SideNav />
              <MainWrapper>{children}</MainWrapper>
            </div>
          </SidenavProvider>
        </BrandProvider>
      </body>
    </html>
  )
}
