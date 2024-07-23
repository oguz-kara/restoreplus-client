import { Toaster } from '@/components/ui/toaster'
import NextTopLoader from 'nextjs-toploader'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from '@/context/auth/auth-context'
import { ActiveOrderContextProvider } from '@/features/active-order/context/active-order-context'
import './globals.css'
import ReactQueryProvider from '@/providers/react-query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
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
            <ActiveOrderContextProvider>{children}</ActiveOrderContextProvider>
          </AuthContextProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
