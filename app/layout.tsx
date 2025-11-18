import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Student Reclamation Portal - Badji Mokhtar University',
  description: 'Submit your academic reclamations - Department of Computer Science, Master in Network & Cybersecurity',
  keywords: ['Badji Mokhtar', 'University', 'Cybersecurity', 'Network', 'Reclamation', 'Student Portal'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'hsl(222 47% 15%)',
              color: 'hsl(210 40% 98%)',
              border: '1px solid hsl(217 33% 17%)',
            },
            success: {
              iconTheme: {
                primary: 'hsl(142 71% 45%)',
                secondary: 'hsl(210 40% 98%)',
              },
            },
            error: {
              iconTheme: {
                primary: 'hsl(0 84% 60%)',
                secondary: 'hsl(210 40% 98%)',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
