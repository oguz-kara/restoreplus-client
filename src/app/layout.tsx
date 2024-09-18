import { Toaster } from '@/components/ui/toaster'
import NextTopLoader from 'nextjs-toploader'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from '@/context/auth/auth-context'
import ReactQueryProvider from '@/providers/react-query-provider'
import './globals.css'
import { CartContextProvider } from '@/features/active-order/context/use-cart-view'
import { ActiveOrderContextProvider } from '@/features/active-order/context/use-active-order'
import { Metadata } from 'next'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Restoreplus High Tech Lubricants',
  description: 'Restoreplus High Tech Lubricants',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-GKBPFRZMRT`}
        />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GKBPFRZMRT');
        `}</Script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={inter.className}>
        <NextTopLoader
          color="#FFD500"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <ReactQueryProvider>
          <AuthContextProvider>
            <CartContextProvider>
              <ActiveOrderContextProvider>
                {children}
              </ActiveOrderContextProvider>
            </CartContextProvider>
          </AuthContextProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
