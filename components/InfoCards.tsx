'use client'

import { motion } from 'framer-motion'
import { Info, ShieldCheck } from 'lucide-react'

export function InfoCards() {
  const cards = [
    {
      icon: Info,
      title: 'Important Notice',
      description: 'Your reclamation will be forwarded directly to the department administration via Telegram for prompt review.',
    },
    {
      icon: ShieldCheck,
      title: 'Privacy & Security',
      description: 'All submissions are encrypted and handled with strict confidentiality in accordance with university policies.',
    },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-12">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          className="glass-effect rounded-2xl p-6 hover:bg-card/80 transition-all hover-lift"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 + index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
            <card.icon className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-lg font-semibold mb-2">{card.title}</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {card.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
