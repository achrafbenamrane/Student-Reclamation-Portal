'use client'

import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import Image from 'next/image'

export function Header() {
  return (
    <motion.header 
      className="sticky top-0 z-50 glass-effect border-b"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative w-14 h-14 rounded-xl overflow-hidden shadow-lg shadow-primary/30 ring-2 ring-primary/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/logo.png"
                alt="Badji Mokhtar University Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </motion.div>
            
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">
                Badji Mokhtar University
              </h1>
              <p className="text-sm text-muted-foreground">
                Faculty of Technology
              </p>
            </div>
          </div>
          
          {/* Badge */}
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 glass-effect rounded-full hover:bg-primary/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Network & Cybersecurity Master
            </span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
