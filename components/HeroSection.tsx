'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Clock, Lock, Zap } from 'lucide-react'

export function HeroSection() {
  const stats = [
    { icon: Clock, label: '24/7 Available' },
    { icon: Lock, label: 'Secure & Private' },
    { icon: Zap, label: 'Instant Delivery' },
  ]

  return (
    <motion.section
      className="text-center py-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Icon */}
      <motion.div
        className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <MessageCircle className="w-12 h-12 text-white" />
      </motion.div>

      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Student Reclamation Portal
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-xl text-muted-foreground mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Department of Computer Science
      </motion.p>

      {/* Description */}
      <motion.p
        className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Submit your academic concerns, requests, or feedback securely through our automated system.
        Your reclamation will be reviewed by the department administration.
      </motion.p>

      {/* Stats */}
      <motion.div
        className="flex flex-wrap justify-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="flex items-center gap-3 px-6 py-3 glass-effect rounded-2xl hover:bg-card/80 transition-all cursor-pointer hover-lift"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <stat.icon className="w-6 h-6 text-primary" />
            <span className="font-medium">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
