'use client'

import { motion } from 'framer-motion'

export function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Animated shapes */}
      <motion.div
        className="absolute w-[300px] h-[300px] bg-primary/30 rounded-full blur-3xl"
        style={{ top: '10%', left: '10%' }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[400px] bg-secondary/30 rounded-full blur-3xl"
        style={{ top: '50%', right: '10%' }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 30, -20, 0],
          rotate: [360, 270, 180, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />
      
      <motion.div
        className="absolute w-[250px] h-[250px] bg-accent/30 rounded-full blur-3xl"
        style={{ bottom: '10%', left: '50%' }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -20, 30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 10,
        }}
      />
      
      <motion.div
        className="absolute w-[350px] h-[350px] bg-cyan-500/20 rounded-full blur-3xl"
        style={{ top: '70%', right: '40%' }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 20, -30, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 15,
        }}
      />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  )
}
