import { NextRequest, NextResponse } from 'next/server'

// Replace with your actual Telegram bot credentials
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE'
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID_HERE'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { studentName, category, reclamation, email } = body

    // Validate required fields
    if (!studentName || !category || !reclamation) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format message for Telegram
    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    })

    const message = `
🎓 <b>NEW STUDENT RECLAMATION</b>

👤 <b>Student:</b> ${studentName}
📁 <b>Category:</b> ${category}
📧 <b>Email:</b> ${email || 'Not provided'}
⏰ <b>Submitted:</b> ${timestamp}

━━━━━━━━━━━━━━━━━━━━

💬 <b>Reclamation:</b>
${reclamation}

━━━━━━━━━━━━━━━━━━━━

🏛️ Badji Mokhtar University
Faculty of Technology - Computer Science
Master in Network & Cybersecurity
    `.trim()

    // Check if bot is configured
    if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || 
        TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
      console.log('Telegram bot not configured. Message would be:', message)
      // Return success for development/testing
      return NextResponse.json({ 
        success: true, 
        message: 'Demo mode: Telegram not configured' 
      })
    }

    // Send message to Telegram
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

    return NextResponse.json({ 
      success: true, 
      message: 'Reclamation submitted successfully',
      data 
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
