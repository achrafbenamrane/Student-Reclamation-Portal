# 🎓 Student Reclamation Portal - Next.js Version

A modern, attractive Next.js application for students to submit their reclamations to university administration via Telegram bot integration. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🏛️ University Information

- **University:** Badji Mokhtar University
- **Faculty:** Faculty of Technology
- **Department:** Computer Science
- **Speciality:** Master in Cybersecurity

## ✨ Features

- ⚡ **Next.js 14** - Latest features with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎭 **Framer Motion** - Smooth, professional animations
- 📱 **Fully Responsive** - Mobile-first design
- 🎯 **TypeScript** - Type-safe code
- 🤖 **Telegram Integration** - Automatic bot submission
- 🌈 **Modern UI/UX** - Glassmorphism, gradients, and micro-interactions
- 🔥 **React Hot Toast** - Beautiful notifications
- 🎪 **Lucide Icons** - Modern icon library
- ⚡ **Fast Performance** - Optimized and lightweight

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Telegram account
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Configure environment variables**
   
   Copy the example env file:
   ```bash
   cp .env.example .env.local
   ```

3. **Set up Telegram Bot** (see section below)

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🤖 Telegram Bot Configuration

### Step 1: Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Start a conversation and send `/newbot`
3. Follow the instructions to create your bot
4. Save the **Bot Token** (format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: Get Your Chat ID

**For Personal Chat:**
1. Search for `@userinfobot` on Telegram
2. Start a conversation
3. Copy your **Chat ID** (format: `123456789`)

**For Group Chat:**
1. Add your bot to the group
2. Send a test message in the group
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Find the `chat` object and copy the `id` (might be negative for groups)

### Step 3: Configure Environment Variables

Edit `.env.local`:

```bash
TELEGRAM_BOT_TOKEN=your_actual_bot_token_here
TELEGRAM_CHAT_ID=your_actual_chat_id_here
```

### Step 4: Test the Integration

1. Restart the dev server if running
2. Fill out the form on the website
3. Submit a test reclamation
4. Check your Telegram for the message

## 📁 Project Structure

```
RSIform/
├── app/
│   ├── api/
│   │   └── submit-reclamation/
│   │       └── route.ts          # API endpoint for form submission
│   ├── globals.css               # Global styles and Tailwind config
│   ├── layout.tsx                # Root layout with fonts and metadata
│   └── page.tsx                  # Main page component
├── components/
│   ├── BackgroundAnimation.tsx   # Animated background shapes
│   ├── Header.tsx                # Header with logo and branding
│   ├── HeroSection.tsx           # Hero section with title and stats
│   ├── ReclamationForm.tsx       # Main form component
│   ├── InfoCards.tsx             # Information cards
│   └── Footer.tsx                # Footer component
├── lib/
│   └── utils.ts                  # Utility functions (cn helper)
├── public/                       # Static assets
├── .env.local                    # Environment variables (not committed)
├── .env.example                  # Example environment file
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
└── README-NEXTJS.md              # This file
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🎨 Customization

### Adding More Students

Edit `components/ReclamationForm.tsx`:

```typescript
const students = [
  'Your Name',
  'Another Student',
  // Add more students here
]
```

### Changing Colors

Edit `app/globals.css` - modify the CSS variables:

```css
:root {
  --primary: 243 75% 59%;      /* Main color */
  --secondary: 262 52% 47%;    /* Secondary color */
  --accent: 330 81% 60%;       /* Accent color */
  /* ... */
}
```

Or use Tailwind's color system in `tailwind.config.js`.

### Modifying Categories

Edit `components/ReclamationForm.tsx`:

```typescript
const categories = [
  'Your Category',
  'Another Category',
  // Add more categories
]
```

### Adding Custom Animations

Use Framer Motion in any component:

```typescript
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Your content
</motion.div>
```

## 🔧 Technology Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety

### Styling
- **Tailwind CSS** - Utility-first CSS
- **PostCSS** - CSS processing
- **CSS Custom Properties** - Dynamic theming

### UI/UX Libraries
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications
- **Radix UI** - Headless UI components
- **clsx & tailwind-merge** - Class name utilities

### API & Integration
- **Next.js API Routes** - Backend endpoints
- **Telegram Bot API** - Message delivery

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px - 1440px
- **Large Desktop:** > 1440px

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Other Platforms

**Netlify:**
```bash
npm run build
# Deploy the .next folder
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔐 Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use `.env.example` for documentation
   - Store secrets in deployment platform

2. **API Security**
   - Validate all inputs server-side
   - Rate limit API endpoints
   - Use HTTPS in production

3. **Bot Token**
   - Keep token secure
   - Rotate if compromised
   - Use environment variables only

## 🐛 Troubleshooting

### TypeScript Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Telegram Not Sending

1. Check `.env.local` configuration
2. Verify bot token is correct
3. Ensure chat ID is correct (negative for groups)
4. Check server logs for errors
5. Test bot with Telegram API directly

### Styling Issues

```bash
# Rebuild Tailwind
npm run dev

# Clear browser cache
# Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
```

### Build Errors

```bash
# Type check
npx tsc --noEmit

# Check ESLint
npm run lint
```

## 📈 Performance Optimization

- ✅ Server-side rendering (SSR)
- ✅ Automatic code splitting
- ✅ Image optimization with Next.js Image
- ✅ Font optimization
- ✅ CSS purging with Tailwind
- ✅ Lazy loading components
- ✅ API route caching

## 🎯 Future Enhancements

- [ ] File upload support
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] reCAPTCHA integration
- [ ] Multi-language support (i18n)
- [ ] Dark/Light theme toggle
- [ ] Export to PDF
- [ ] Analytics dashboard
- [ ] Search and filter reclamations
- [ ] User authentication

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For questions or support:
- Department of Computer Science
- Faculty of Technology  
- Badji Mokhtar University

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

🎓 Made for students by students | 🚀 Powered by modern web technologies
