import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getClientIp } from '@/lib/rateLimit'
import { validateReclamationData, detectSpam, checkDuplicateSubmission } from '@/lib/validation'

// Replace with your actual Telegram bot credentials
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE'
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID_HERE'

// Security: Add your domain to verify origin
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://your-domain.vercel.app', // Add your Vercel domain here
]

export async function POST(request: NextRequest) {
  try {
    // 1. CORS Check - Verify origin
    const origin = request.headers.get('origin')
    if (origin && !ALLOWED_ORIGINS.some(allowed => origin.includes('localhost') || origin.includes('vercel.app'))) {
      return NextResponse.json(
        { error: 'Forbidden: Invalid origin' },
        { status: 403 }
      )
    }

    // 2. Rate Limiting - Prevent spam
    const clientIp = getClientIp(request)
    const rateLimitResult = rateLimit(clientIp, {
      interval: 60 * 1000, // 1 minute
      maxRequests: 3, // 3 requests per minute
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.retryAfter 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter),
          }
        }
      )
    }

    // 3. Parse and validate request body
    const body = await request.json()
    
    // 4. Validate input data
    const validationResult = validateReclamationData(body)
    if (!validationResult.isValid) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.errors 
        },
        { status: 400 }
      )
    }

    const { sanitizedData } = validationResult
    if (!sanitizedData) {
      return NextResponse.json(
        { error: 'Invalid data' },
        { status: 400 }
      )
    }

    // 5. Spam detection
    if (detectSpam(sanitizedData.reclamation)) {
      console.warn('Spam detected:', {
        ip: clientIp,
        student: sanitizedData.studentName,
        timestamp: new Date().toISOString(),
      })
      return NextResponse.json(
        { error: 'Suspicious content detected. Please review your message.' },
        { status: 400 }
      )
    }

    // 6. Duplicate submission check
    if (checkDuplicateSubmission(sanitizedData.studentName)) {
      return NextResponse.json(
        { error: 'Please wait at least 1 minute between submissions.' },
        { status: 429 }
      )
    }

    // 7. Format message for Telegram
    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    })

    const message = `
🎓 <b>NEW STUDENT RECLAMATION</b>

👤 <b>Student:</b> ${sanitizedData.studentName}
📁 <b>Category:</b> ${sanitizedData.category}
📧 <b>Email:</b> ${sanitizedData.email || 'Not provided'}
⏰ <b>Submitted:</b> ${timestamp}
🌐 <b>IP:</b> ${clientIp}

━━━━━━━━━━━━━━━━━━━━

💬 <b>Reclamation:</b>
${sanitizedData.reclamation}

━━━━━━━━━━━━━━━━━━━━

🏛️ Badji Mokhtar University
Faculty of Technology - Computer Science
Master in Network & Cybersecurity
    `.trim()

    // 8. Check if bot is configured
    if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || 
        TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
      console.log('Telegram bot not configured. Message would be:', message)
      
      // Log submission for audit
      console.log('Submission logged:', {
        ip: clientIp,
        student: sanitizedData.studentName,
        category: sanitizedData.category,
        timestamp: new Date().toISOString(),
      })
      
      // Return success for development/testing
      return NextResponse.json({ 
        success: true, 
        message: 'Demo mode: Telegram not configured' 
      })
    }

    // 9. Send message to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    )

    if (!telegramResponse.ok) {
      const error = await telegramResponse.json()
      console.error('Telegram API error:', error)
      throw new Error(error.description || 'Failed to send message to Telegram')
    }

    const data = await telegramResponse.json()

    // 10. Log successful submission
    console.log('Reclamation submitted successfully:', {
      ip: clientIp,
      student: sanitizedData.studentName,
      category: sanitizedData.category,
      timestamp: new Date().toISOString(),
      telegramMessageId: data.result?.message_id,
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Reclamation submitted successfully',
    })

  } catch (error) {
    console.error('Error submitting reclamation:', error)
    return NextResponse.json(
      { 
        error: 'Failed to submit reclamation', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
