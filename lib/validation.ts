import validator from 'validator'
import studentsData from './students.json'

interface Student {
  no: number
  last_name: string
  first_name: string
}

const students: Student[] = studentsData as Student[]
const validStudentNames = students.map(s => `${s.last_name} ${s.first_name}`)

/**
 * Validate and sanitize form input
 */
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  sanitizedData?: {
    studentName: string
    category: string
    reclamation: string
    email?: string
  }
}

const validCategories = [
  'Academic Issues',
  'Examination & Grading',
  'Administrative Matters',
  'Technical Support',
  'Other',
]

/**
 * Validate reclamation form data
 */
export function validateReclamationData(data: any): ValidationResult {
  const errors: string[] = []

  // Check if data exists
  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      errors: ['Invalid request data'],
    }
  }

  // Validate student name
  if (!data.studentName || typeof data.studentName !== 'string') {
    errors.push('Student name is required')
  } else {
    const trimmedName = data.studentName.trim()
    if (!validStudentNames.includes(trimmedName)) {
      errors.push('Invalid student name selected')
    }
  }

  // Validate category
  if (!data.category || typeof data.category !== 'string') {
    errors.push('Category is required')
  } else if (!validCategories.includes(data.category.trim())) {
    errors.push('Invalid category selected')
  }

  // Validate reclamation text
  if (!data.reclamation || typeof data.reclamation !== 'string') {
    errors.push('Reclamation message is required')
  } else {
    const trimmedReclamation = data.reclamation.trim()
    if (trimmedReclamation.length < 10) {
      errors.push('Reclamation must be at least 10 characters long')
    }
    if (trimmedReclamation.length > 1000) {
      errors.push('Reclamation must not exceed 1000 characters')
    }
  }

  // Validate email (optional)
  if (data.email && typeof data.email === 'string') {
    const trimmedEmail = data.email.trim()
    if (trimmedEmail && !validator.isEmail(trimmedEmail)) {
      errors.push('Invalid email address format')
    }
  }

  // Check for suspicious patterns
  if (data.reclamation && typeof data.reclamation === 'string') {
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i, // Event handlers like onclick=
      /<iframe/i,
      /eval\(/i,
    ]

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(data.reclamation)) {
        errors.push('Suspicious content detected in reclamation')
        break
      }
    }
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
    }
  }

  // Sanitize data
  const sanitizedData = {
    studentName: validator.escape(data.studentName.trim()),
    category: validator.escape(data.category.trim()),
    reclamation: validator.escape(data.reclamation.trim()),
    email: data.email ? validator.normalizeEmail(data.email.trim()) || undefined : undefined,
  }

  return {
    isValid: true,
    errors: [],
    sanitizedData,
  }
}

/**
 * Detect spam patterns in text
 */
export function detectSpam(text: string): boolean {
  const spamPatterns = [
    /\b(viagra|cialis|casino|lottery|winner|congratulations|claim.*prize)\b/i,
    /\b(click here|buy now|limited time|act now)\b/i,
    /\$\$\$+/,
    /https?:\/\/[^\s]+/gi, // Multiple URLs
    /(.)\1{10,}/, // Repeated characters (aaaaaaaaaa)
  ]

  let urlCount = 0
  const urlPattern = /https?:\/\/[^\s]+/gi
  const urls = text.match(urlPattern)
  if (urls) {
    urlCount = urls.length
    if (urlCount > 2) return true // More than 2 URLs is suspicious
  }

  return spamPatterns.some(pattern => pattern.test(text))
}

/**
 * Check if submission is too frequent from same student
 */
const submissionHistory: { [key: string]: number[] } = {}

export function checkDuplicateSubmission(studentName: string, timeWindow: number = 5 * 60 * 1000): boolean {
  const now = Date.now()
  
  if (!submissionHistory[studentName]) {
    submissionHistory[studentName] = [now]
    return false
  }

  // Clean old submissions
  submissionHistory[studentName] = submissionHistory[studentName].filter(
    timestamp => now - timestamp < timeWindow
  )

  // Check if submitted recently (within 5 minutes by default)
  const recentSubmissions = submissionHistory[studentName].filter(
    timestamp => now - timestamp < 60 * 1000 // Within 1 minute
  )

  if (recentSubmissions.length > 0) {
    return true // Duplicate submission detected
  }

  submissionHistory[studentName].push(now)
  return false
}
