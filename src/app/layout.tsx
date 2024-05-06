import { Toaster } from '@/components/ui/toaster'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from '@/context/auth/auth-context'
import { ActiveOrderContextProvider } from '@/features/active-order/context/active-order-context'
import './globals.css'

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
      <body className={inter.className}>
        <AuthContextProvider>
          <ActiveOrderContextProvider>{children}</ActiveOrderContextProvider>
        </AuthContextProvider>
        <Toaster />
      </body>
    </html>
  )
}
