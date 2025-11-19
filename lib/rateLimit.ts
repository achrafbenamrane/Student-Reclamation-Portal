// Rate Limiting Implementation for Next.js API Routes
// Prevents spam and DOS attacks

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const rateLimitStore: RateLimitStore = {}

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  Object.keys(rateLimitStore).forEach(key => {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key]
    }
  })
}, 10 * 60 * 1000)

interface RateLimitOptions {
  interval: number // Time window in milliseconds
  maxRequests: number // Maximum requests in the time window
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param options - Rate limit configuration
 * @returns Object with success status and remaining requests
 */
export function rateLimit(
  identifier: string,
  options: RateLimitOptions = {
    interval: 60 * 1000, // 1 minute default
    maxRequests: 3, // 3 requests per minute default
  }
) {
  const now = Date.now()
  const key = `${identifier}`

  if (!rateLimitStore[key] || rateLimitStore[key].resetTime < now) {
    // First request or expired window - reset
    rateLimitStore[key] = {
      count: 1,
      resetTime: now + options.interval,
    }
    return {
      success: true,
      remaining: options.maxRequests - 1,
      resetTime: rateLimitStore[key].resetTime,
    }
  }

  // Increment count
  rateLimitStore[key].count++

  if (rateLimitStore[key].count > options.maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      resetTime: rateLimitStore[key].resetTime,
      retryAfter: Math.ceil((rateLimitStore[key].resetTime - now) / 1000),
    }
  }

  // Within limits
  return {
    success: true,
    remaining: options.maxRequests - rateLimitStore[key].count,
    resetTime: rateLimitStore[key].resetTime,
  }
}

/**
 * Get IP address from Next.js request
 * @param request - Next.js request object
 * @returns IP address string
 */
export function getClientIp(request: Request): string {
  // Check various headers for IP address
  const headers = new Headers(request.headers)
  
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIp = headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  const cfConnectingIp = headers.get('cf-connecting-ip')
  if (cfConnectingIp) {
    return cfConnectingIp
  }

  return 'unknown'
}
