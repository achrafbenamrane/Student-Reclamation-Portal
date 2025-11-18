'use client'

import { Mail, Send as TelegramIcon, Globe } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-24 glass-effect border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Info */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Badji Mokhtar University - Faculty of Technology
            </p>
            <p className="text-sm text-muted-foreground">
              Department of Computer Science - Master in Network & Cybersecurity
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:-translate-y-1"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:-translate-y-1"
              aria-label="Telegram"
            >
              <TelegramIcon className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:-translate-y-1"
              aria-label="Website"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
