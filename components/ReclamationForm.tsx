'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Tag, MessageSquare, Mail, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'

interface FormData {
  studentName: string
  category: string
  reclamation: string
  email: string
}

const students = [
  'ACHEUK Achraf',
  'BENALI Mohammed',
  'CHERIF Amina',
  'DAOUDI Yasmine',
  'HAMIDI Karim',
  'KADDOUR Sarah',
  'MANSOURI Rania',
  'MEZIANE Bilal',
  'SAIDI Nour',
  'ZERROUKI Mehdi',
]

const categories = [
  'Academic Issues',
  'Examination & Grading',
  'Administrative Matters',
  'Technical Support',
  'Other',
]

export function ReclamationForm() {
  const [formData, setFormData] = useState<FormData>({
    studentName: '',
    category: '',
    reclamation: '',
    email: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    if (name === 'reclamation') {
      setCharCount(value.length)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.studentName || !formData.category || !formData.reclamation) {
      toast.error('Please fill in all required fields')
      return
    }

    if (formData.reclamation.length < 10) {
      toast.error('Reclamation must be at least 10 characters long')
      return
    }

    if (formData.email && !isValidEmail(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/submit-reclamation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit reclamation')
      }

      toast.success('Reclamation submitted successfully!')
      
      // Reset form
      setFormData({
        studentName: '',
        category: '',
        reclamation: '',
        email: '',
      })
      setCharCount(0)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to submit reclamation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return (
    <motion.div
      className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-primary/10 transition-shadow"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9 }}
    >
      {/* Form Header */}
      <div className="text-center mb-10">
        <motion.div
          className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/50"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Send className="w-8 h-8 text-white" />
        </motion.div>
        
        <h3 className="text-3xl font-bold mb-2">Submit Your Reclamation</h3>
        <p className="text-muted-foreground">Please fill in all required fields</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Student Name */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        >
          <label className="flex items-center gap-2 text-sm font-semibold mb-3">
            <User className="w-4 h-4 text-primary" />
            <span>Select Your Name</span>
            <span className="text-destructive">*</span>
          </label>
          <select
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            className={cn(
              "w-full px-4 py-3 bg-background/60 border-2 border-border rounded-xl",
              "focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none",
              "transition-all duration-300 cursor-pointer hover:border-primary/50"
            )}
            required
          >
            <option value="">-- Choose your name --</option>
            {students.map((student) => (
              <option key={student} value={student}>
                {student}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Category */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
        >
          <label className="flex items-center gap-2 text-sm font-semibold mb-3">
            <Tag className="w-4 h-4 text-primary" />
            <span>Reclamation Category</span>
            <span className="text-destructive">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={cn(
              "w-full px-4 py-3 bg-background/60 border-2 border-border rounded-xl",
              "focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none",
              "transition-all duration-300 cursor-pointer hover:border-primary/50"
            )}
            required
          >
            <option value="">-- Select category --</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Reclamation Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          <label className="flex items-center gap-2 text-sm font-semibold mb-3">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span>Your Reclamation</span>
            <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <textarea
              name="reclamation"
              value={formData.reclamation}
              onChange={handleInputChange}
              rows={6}
              maxLength={1000}
              placeholder="Please describe your reclamation in detail..."
              className={cn(
                "w-full px-4 py-3 bg-background/60 border-2 border-border rounded-xl resize-y",
                "focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none",
                "transition-all duration-300 hover:border-primary/50"
              )}
              required
            />
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground pointer-events-none">
              <span className={cn(
                "font-semibold",
                charCount > 900 && "text-destructive",
                charCount > 700 && charCount <= 900 && "text-warning"
              )}>
                {charCount}
              </span>
              {' / 1000'}
            </div>
          </div>
        </motion.div>

        {/* Email (Optional) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3 }}
        >
          <label className="flex items-center gap-2 text-sm font-semibold mb-3">
            <Mail className="w-4 h-4 text-primary" />
            <span>Email Address</span>
            <span className="text-muted-foreground text-xs font-normal">(Optional)</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your.email@example.com"
            className={cn(
              "w-full px-4 py-3 bg-background/60 border-2 border-border rounded-xl",
              "focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none",
              "transition-all duration-300 hover:border-primary/50"
            )}
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <motion.button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-4 px-6 bg-primary",
              "text-white font-bold rounded-xl shadow-lg shadow-primary/50",
              "hover:shadow-xl hover:shadow-primary/60 hover:-translate-y-1 hover:bg-primary/90",
              "transition-all duration-300 flex items-center justify-center gap-3",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            )}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Reclamation</span>
              </>
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  )
}
