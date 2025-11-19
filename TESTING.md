# 🔒 Security Testing Guide

## Overview

Your Student Reclamation Portal now has **10 layers of security protection**:

1. ✅ **Rate Limiting** - 3 requests per minute per IP
2. ✅ **Student Validation** - Only real students from students.json
3. ✅ **Category Validation** - Only predefined categories allowed
4. ✅ **Spam Detection** - Blocks spam keywords and patterns
5. ✅ **XSS Protection** - Detects and blocks malicious scripts
6. ✅ **Duplicate Prevention** - Same student can't submit twice in 1 minute
7. ✅ **Input Sanitization** - All inputs are escaped
8. ✅ **CORS Protection** - Only allowed origins can access API
9. ✅ **Audit Logging** - All submissions are logged
10. ✅ **Length Validation** - 10-1000 character limit

---

## Quick Testing

### Option 1: Automated Test Script

```bash
# Start your dev server
npm run dev

# In a new terminal, run the test script
./test-security.sh
```

The script will automatically test all security features and show you the results with color-coded output:
- 🟢 Green = Test passed
- 🔴 Red = Test failed
- 🟡 Yellow = Warning

### Option 2: Manual Testing

#### Test 1: Valid Submission ✅
```bash
curl -X POST http://localhost:3000/api/submit-reclamation \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "ABED ACHRAF",
    "category": "Academic Issues",
    "reclamation": "This is a valid test reclamation message.",
    "email": "test@example.com"
  }'
```
**Expected:** Success response, message sent to Telegram

---

#### Test 2: Rate Limiting ⏱️
```bash
# Run this command 4 times quickly
for i in {1..4}; do
  curl -X POST http://localhost:3000/api/submit-reclamation \
    -H "Content-Type: application/json" \
    -d '{
      "studentName": "ALIM LINA YASMINE",
      "category": "Other",
      "reclamation": "Rate limit test message."
    }'
  echo ""
  sleep 0.5
done
```
**Expected:** First 3 succeed, 4th returns `429 Too Many Requests`

---

#### Test 3: Invalid Student Name 👤
```bash
curl -X POST http://localhost:3000/api/submit-reclamation \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "FAKE STUDENT",
    "category": "Academic Issues",
    "reclamation": "This should be rejected."
  }'
```
**Expected:** Error: "Invalid student name"

---

#### Test 4: Spam Detection 🚫
```bash
curl -X POST http://localhost:3000/api/submit-reclamation \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "ABED ACHRAF",
    "category": "Other",
    "reclamation": "BUY VIAGRA NOW!!! CLICK HERE!!!"
  }'
```
**Expected:** Error: "Suspicious content detected"

---

#### Test 5: XSS Attack 🛡️
```bash
curl -X POST http://localhost:3000/api/submit-reclamation \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "ABED ACHRAF",
    "category": "Technical Support",
    "reclamation": "<script>alert(\"XSS\")</script>"
  }'
```
**Expected:** Error: "Suspicious content detected"

---

#### Test 6: Too Short Message 📏
```bash
curl -X POST http://localhost:3000/api/submit-reclamation \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "ABED ACHRAF",
    "category": "Other",
    "reclamation": "Short"
  }'
```
**Expected:** Error: "Reclamation must be at least 10 characters"

---

#### Test 7: Invalid Email 📧
```bash
curl -X POST http://localhost:3000/api/submit-reclamation \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "ABED ACHRAF",
    "category": "Academic Issues",
    "reclamation": "This is a test message.",
    "email": "not-an-email"
  }'
```
**Expected:** Error: "Invalid email format"

---

#### Test 8: Duplicate Submission 🔁
```bash
# Run twice within 1 minute
curl -X POST http://localhost:3000/api/submit-reclamation \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "ABED ACHRAF",
    "category": "Administrative Request",
    "reclamation": "This is a duplicate test."
  }'

# Wait 2 seconds
sleep 2

# Run again
curl -X POST http://localhost:3000/api/submit-reclamation \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "ABED ACHRAF",
    "category": "Administrative Request",
    "reclamation": "This is a duplicate test."
  }'
```
**Expected:** First succeeds, second returns "Duplicate submission detected"

---

## Monitoring

### Check Server Logs

When running `npm run dev`, you'll see audit logs for each submission:

```
[AUDIT] Submission - IP: 127.0.0.1, Student: ABED ACHRAF, Category: Academic Issues, Time: 2024-01-15T10:30:00.000Z
```

### What to Monitor:

1. **Repeated 429 errors** → Potential DOS attack
2. **Many validation errors** → Attack attempts
3. **Spam detection triggers** → Fake submissions
4. **Duplicate submissions** → Spam bots
5. **XSS pattern detection** → Security breach attempts

---

## Before Deployment Checklist

### 1. Update CORS Origins
After deploying to Vercel, update `app/api/submit-reclamation/route.ts`:

```typescript
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://your-actual-domain.vercel.app' // ← Update this
];
```

### 2. Environment Variables on Vercel
Make sure these are set:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

### 3. Optional: Add reCAPTCHA
For extra protection, follow the reCAPTCHA guide in `SECURITY.md`

---

## Attack Response

If you detect an attack:

1. **Check logs** - Look for patterns (IP addresses, timing)
2. **Adjust rate limits** - Lower from 3 to 2 or 1 per minute
3. **Block IPs** - Add IP blocking in `rateLimit.ts`
4. **Enable reCAPTCHA** - Add human verification
5. **Monitor Telegram** - Check if fake messages are getting through

---

## Security Best Practices

✅ **DO:**
- Monitor your Telegram bot regularly
- Check Vercel logs weekly
- Update dependencies monthly
- Keep TELEGRAM_BOT_TOKEN secret
- Adjust rate limits based on usage

❌ **DON'T:**
- Share your bot token publicly
- Commit `.env.local` to Git
- Disable security features
- Ignore repeated failed requests
- Allow unlimited submissions

---

## Need Help?

📖 Read the full documentation:
- `SECURITY.md` - Complete security guide
- `VERCEL-DEPLOYMENT.md` - Deployment instructions
- `README-NEXTJS.md` - Project overview

🚀 Ready to deploy? Follow `VERCEL-DEPLOYMENT.md`

---

**Security Status: 🟢 PROTECTED**

Your website is now secured against:
- ✅ DOS/DDOS attacks
- ✅ Spam submissions
- ✅ Fake student reports
- ✅ XSS attacks
- ✅ SQL injection (no database used)
- ✅ CSRF (API design prevents it)
- ✅ Brute force attacks
- ✅ Data tampering
