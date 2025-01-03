import { Toaster } from '@/components/ui/toaster'
import NextTopLoader from 'nextjs-toploader'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import { AuthContextProvider } from '@/context/auth/auth-context'
import ReactQueryProvider from '@/providers/react-query-provider'
import { CartContextProvider } from '@/features/active-order/context/use-cart-view'
import { ActiveOrderContextProvider } from '@/features/active-order/context/use-active-order'
import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

const barlow = Barlow({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow',
})

const barlowConsended = Barlow_Condensed({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
})

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
    <html
      lang="en"
      className={`${barlow.variable} ${barlowConsended.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className="font-barlow">
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
      <GoogleAnalytics gaId="G-GKBPFRZMRT" />
    </html>
  )
}
