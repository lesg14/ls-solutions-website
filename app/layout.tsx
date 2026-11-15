import { Analytics } from '@vercel/analytics/next'
import { SitePreferencesProvider } from '@/components/site-preferences'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ls-solutions-website.vercel.app'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LS Solutions | Soporte técnico, software y desarrollo web',
  description:
    'LS Solutions ofrece mantenimiento de computadores, instalación de sistemas operativos y Office, venta de componentes, repotenciación de equipos, desarrollo web y automatización de procesos en Colombia.',
  applicationName: 'LS Solutions',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    title: 'LS Solutions | Soporte técnico, software y desarrollo web',
    description:
      'Soporte técnico, componentes, desarrollo web y automatización de procesos para hogares y empresas.',
    siteName: 'LS Solutions',
    images: [
      {
        url: '/images/ls-solutions-logo.png',
        width: 512,
        height: 164,
        alt: 'Logo de LS Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LS Solutions | Soporte técnico, software y desarrollo web',
    description:
      'Soporte técnico, componentes, desarrollo web y automatización de procesos para hogares y empresas.',
    images: ['/images/ls-solutions-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    'mantenimiento de computadores',
    'soporte técnico',
    'instalación Windows Linux',
    'Microsoft Office',
    'venta de componentes',
    'desarrollo web',
    'automatización de procesos',
    'LS Solutions',
  ],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`bg-background ${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <SitePreferencesProvider>{children}</SitePreferencesProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
