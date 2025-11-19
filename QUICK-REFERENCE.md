# 🚀 Quick Reference Card

## ⚡ Common Commands

```bash
# Development
npm run dev              # Start development server (http://localhost:3000)
npm run build           # Build for production
npm start               # Start production server

# Testing
./test-security.sh      # Run automated security tests
curl localhost:3000     # Quick health check

# Deployment
vercel                  # Deploy to Vercel
vercel logs             # View deployment logs
```

---

## 🔑 Important Files

| File | Purpose | Action Required |
|------|---------|----------------|
| `.env.local` | Telegram credentials | ✅ Already configured |
| `lib/students.json` | Valid student list | ✅ 41 students loaded |
| `app/api/submit-reclamation/route.ts` | API endpoint | ⚠️ Update CORS after deployment |

---

## 📊 Security Quick Stats

```
Rate Limit:        3 requests/minute per IP
Valid Students:    41 (from students.json)
Valid Categories:  5 predefined options
Message Length:    10-1000 characters
Duplicate Window:  1 minute cooldown
Security Layers:   10 active protections
```

---

## 🧪 Quick Test Commands

### Test Valid Submission
```bash
curl -X POST http://localhost:3000/api/submit-reclamation \
  -H "Content-Type: application/json" \
  -d '{"studentName":"ABED ACHRAF","category":"Academic Issues","reclamation":"Test message for validation purposes."}'
```

### Test Rate Limit
```bash
# Run 4 times quickly - 4th should fail
for i in {1..4}; do curl -X POST http://localhost:3000/api/submit-reclamation -H "Content-Type: application/json" -d '{"studentName":"ABED ACHRAF","category":"Other","reclamation":"Rate limit test message."}'; echo ""; done
```

### Test Invalid Student
```bash
curl -X POST http://localhost:3000/api/submit-reclamation \
  -H "Content-Type: application/json" \
  -d '{"studentName":"FAKE STUDENT","category":"Other","reclamation":"This should fail."}'
```

### Test Spam Detection
```bash
curl -X POST http://localhost:3000/api/submit-reclamation \
  -H "Content-Type: application/json" \
  -d '{"studentName":"ABED ACHRAF","category":"Other","reclamation":"BUY VIAGRA NOW!!!"}'
```

---

## 🎯 Valid Form Data

### Valid Student Names (Sample)
```
ABED ACHRAF
ALIM LINA YASMINE
BENAMRANE MOHAMED ACHRAF
BENMANSOUR FARAH
BENTOUMI AMINE
... (41 total in students.json)
```

### Valid Categories
```
1. Academic Issues
2. Administrative Request
3. Technical Support
4. Grades Inquiry
5. Other
```

---

## 🔒 Security Response Codes

| Code | Meaning | Reason |
|------|---------|--------|
| 200 | ✅ Success | Valid submission accepted |
| 400 | ❌ Bad Request | Validation failed |
| 429 | ⏱️ Too Many Requests | Rate limit exceeded |
| 403 | 🚫 Forbidden | CORS violation |
| 500 | 💥 Server Error | Internal error |

---

## 📝 Error Messages Reference

| Error | Cause | Solution |
|-------|-------|----------|
| "Invalid student name" | Student not in students.json | Use exact name from list |
| "Too many requests" | More than 3 req/min | Wait 1 minute |
| "Suspicious content detected" | Spam/XSS pattern found | Remove spam words/scripts |
| "Duplicate submission detected" | Same student < 1 min | Wait before resubmitting |
| "Reclamation must be at least 10 characters" | Message too short | Write longer message |
| "Invalid email format" | Malformed email | Fix email or leave empty |

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] Test locally: `npm run dev`
- [ ] Run security tests: `./test-security.sh`
- [ ] Build succeeds: `npm run build`
- [ ] Verify Telegram bot works

### Deployment
- [ ] Push to GitHub
- [ ] Import to Vercel
- [ ] Add environment variables:
  - `TELEGRAM_BOT_TOKEN`
  - `TELEGRAM_CHAT_ID`
- [ ] Deploy

### Post-Deployment
- [ ] Update CORS origins in `route.ts`
- [ ] Test live site
- [ ] Verify Telegram integration
- [ ] Monitor logs for 24 hours

---

## 📱 Telegram Bot Info

```
Bot Token: 7208219245:AAEYFj0VPBMWVRuJOVthM3BafivljpR2aGY
Chat ID:   5183767305
Status:    ✅ Configured
Format:    Rich text with emojis
```

---

## 🎨 UI Components

- **Header**: Logo + university info
- **Hero Section**: Animated title and icon
- **Form**: Student select, category, message, optional email
- **Info Cards**: Quick information display
- **Footer**: Contact and program information
- **Background**: Floating animated shapes

---

## 🔧 Troubleshooting

### Dev server won't start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port 3000 already in use
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Telegram not sending
1. Check `.env.local` has correct credentials
2. Verify bot token is active on Telegram
3. Check API response in browser console
4. Review server logs for errors

### Security tests failing
1. Make sure dev server is running
2. Wait 1 minute if rate limited
3. Check if you're using valid student names
4. Verify test script is executable: `chmod +x test-security.sh`

---

## 📚 Documentation Map

```
📖 README-NEXTJS.md          → Full project overview
🔒 SECURITY.md               → Complete security guide
🧪 TESTING.md                → Testing procedures
🚀 VERCEL-DEPLOYMENT.md      → Deployment steps
⚙️ SETUP.md                  → Quick setup guide
📊 PROJECT-SUMMARY.md        → Feature summary
⚡ QUICK-REFERENCE.md        → This file
```

---

## 🎯 Key URLs

| Environment | URL |
|-------------|-----|
| Local Dev | http://localhost:3000 |
| API Route | http://localhost:3000/api/submit-reclamation |
| Production | https://your-domain.vercel.app |

---

## 💡 Pro Tips

1. **Always wait 1 minute** between running security tests to avoid rate limiting
2. **Check Telegram immediately** after submitting to verify messages arrive
3. **Monitor Vercel logs** regularly for security alerts
4. **Update student list** in `lib/students.json` when new students enroll
5. **Keep dependencies updated** monthly for security patches
6. **Never commit** `.env.local` to Git
7. **Use test script** instead of manual testing for efficiency
8. **Check console logs** in browser DevTools for client-side errors

---

## 🌟 Best Practices

✅ **DO:**
- Test security features regularly
- Monitor Telegram for fake submissions
- Keep bot token secret
- Update CORS after deployment
- Review logs weekly

❌ **DON'T:**
- Share bot token publicly
- Disable security features
- Skip testing before deployment
- Ignore repeated errors
- Allow unlimited requests

---

## 📞 Quick Help

**Can't find a student?**
→ Check exact spelling in `lib/students.json`

**Rate limited?**
→ Wait 60 seconds before next submission

**Telegram not working?**
→ Verify bot token in `.env.local`

**Build errors?**
→ Run `npm install` and try again

**Deployment issues?**
→ Follow `VERCEL-DEPLOYMENT.md` step-by-step

---

## ✅ Status Indicators

🟢 **READY** - All systems operational  
🟡 **WARNING** - Needs attention  
🔴 **ERROR** - Immediate action required  

**Current Status: 🟢 READY FOR DEPLOYMENT**

---

## 📊 Project Stats

- **Files:** 20+ components and configs
- **Lines of Code:** ~2000+
- **Documentation:** 5 comprehensive guides
- **Security Features:** 10 layers
- **Students:** 41 validated
- **Categories:** 5 predefined
- **Dependencies:** 546 packages
- **Build Time:** ~30 seconds

---

**Last Updated:** 2024  
**Version:** 1.0.0  
**Status:** Production Ready  
**Security Level:** HIGH 🔒
