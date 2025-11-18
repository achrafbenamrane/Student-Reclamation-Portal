# 🚀 Quick Setup Guide - Student Reclamation Portal (Next.js)

## 📋 Prerequisites Checklist

- [ ] Node.js 18 or higher installed
- [ ] npm or yarn package manager
- [ ] Telegram account
- [ ] Text editor or IDE (VS Code recommended)

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Dependencies (2 minutes)

Open terminal in the project directory and run:

```bash
npm install
```

Wait for all packages to install. This includes:
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- TypeScript
- Lucide Icons
- React Hot Toast
- And more...

### Step 2: Create Telegram Bot (2 minutes)

1. Open Telegram
2. Search for **@BotFather**
3. Send `/newbot`
4. Follow instructions:
   - Choose a name: "UMAB Reclamation Bot"
   - Choose username: "umab_reclamation_bot" (or similar)
5. **Copy the token** (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 3: Get Your Chat ID (1 minute)

1. Search for **@userinfobot** on Telegram
2. Start conversation
3. **Copy your Chat ID** (a number like: `123456789`)

### Step 4: Configure Environment (30 seconds)

Create `.env.local` file with your credentials:

```bash
TELEGRAM_BOT_TOKEN=paste_your_bot_token_here
TELEGRAM_CHAT_ID=paste_your_chat_id_here
```

### Step 5: Run the Application (30 seconds)

```bash
npm run dev
```

Open browser: **http://localhost:3000**

## 🎉 Done! Your Application is Running

## 🧪 Testing

1. Open http://localhost:3000
2. Fill out the form:
   - Select your name
   - Choose a category
   - Write a test reclamation
   - (Optional) Add email
3. Click "Submit Reclamation"
4. Check your Telegram for the message!

## 📝 Configuration Details

### Environment Variables Explained

```bash
# Your Telegram Bot Token from @BotFather
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz

# Your Telegram Chat ID from @userinfobot
# For personal: positive number (123456789)
# For groups: negative number (-123456789)
TELEGRAM_CHAT_ID=123456789
```

### Using a Telegram Group Instead

1. Create a Telegram group
2. Add your bot to the group:
   - Group settings → Add members
   - Search for your bot username
3. Send a message in the group
4. Visit: `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
5. Find the `"chat":{"id":-123456789}` (negative number)
6. Use this negative ID as your TELEGRAM_CHAT_ID

## 🛠️ Customization Quick Guide

### Add More Students

Edit `components/ReclamationForm.tsx`:

```typescript
const students = [
  'ACHEUK Achraf',
  'YOUR NAME HERE',  // Add your name
  // Add more students...
]
```

### Change Colors

Edit `app/globals.css` (around line 7-20):

```css
:root {
  --primary: 243 75% 59%;      /* Blue-purple */
  --secondary: 262 52% 47%;    /* Purple */
  --accent: 330 81% 60%;       /* Pink */
}
```

### Modify Categories

Edit `components/ReclamationForm.tsx`:

```typescript
const categories = [
  'Academic Issues',
  'YOUR CATEGORY HERE',  // Add your category
  // Add more...
]
```

## 🔧 Common Issues & Solutions

### Issue: Module not found errors

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Telegram messages not sending

**Solutions:**
1. Check `.env.local` exists and has correct values
2. Restart dev server: `Ctrl+C` then `npm run dev`
3. Verify bot token is correct (no extra spaces)
4. Verify chat ID is correct
5. Check console for error messages

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001
```

Or kill the process using port 3000:
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Issue: Styling not working

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue: TypeScript errors

**Solution:**
```bash
# Check for errors
npx tsc --noEmit

# If errors persist, clear and rebuild
rm -rf .next node_modules
npm install
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Test production build locally
npm start

# Access at http://localhost:3000
```

## 🌐 Deployment Options

### Option 1: Vercel (Easiest - Recommended)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Option 2: Netlify

```bash
npm run build
# Upload .next folder via Netlify dashboard
```

### Option 3: VPS/Server

```bash
# Install Node.js on server
# Clone repository
# Run:
npm install
npm run build
npm start
```

## 📚 Project Structure Overview

```
RSIform/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (Telegram endpoint)
│   ├── globals.css        # Global styles + Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── BackgroundAnimation.tsx
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── ReclamationForm.tsx   ← Main form
│   ├── InfoCards.tsx
│   └── Footer.tsx
├── lib/                   # Utilities
│   └── utils.ts          # Helper functions
├── .env.local            # Your secrets (NOT committed)
├── .env.example          # Example env file
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind setup
└── tsconfig.json         # TypeScript config
```

## 🎨 Key Technologies

- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Lucide React**: Icons
- **React Hot Toast**: Notifications

## 💡 Pro Tips

1. **Development Mode**: Changes auto-reload, no need to restart
2. **Hot Reload**: Save files to see instant updates
3. **Console Logs**: Check browser console (F12) for debugging
4. **Telegram Bot**: Test with @BotFather's `/mybots` command
5. **Git**: Don't commit `.env.local` (already in .gitignore)

## 📞 Need Help?

- Check `README-NEXTJS.md` for detailed documentation
- Review component files for inline comments
- Check browser console for errors (F12)
- Verify Telegram bot settings
- Ensure all dependencies installed correctly

## ✅ Verification Checklist

- [ ] Dependencies installed without errors
- [ ] `.env.local` file created with correct values
- [ ] Dev server starts successfully
- [ ] Website opens in browser
- [ ] Form displays correctly
- [ ] Test submission successful
- [ ] Telegram message received

## 🎓 You're All Set!

Your Student Reclamation Portal is now ready to use!

**Next Steps:**
1. Customize student names and categories
2. Adjust colors to match your branding
3. Test thoroughly with different scenarios
4. Deploy to production when ready
5. Share with your classmates!

---

**Need more info?** Read `README-NEXTJS.md` for comprehensive documentation.

**Happy coding! 🚀**
