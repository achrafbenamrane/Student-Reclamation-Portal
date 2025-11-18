# 🚀 Vercel Deployment Guide

## Quick Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Student Reclamation Portal"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to Vercel**:
   - Visit: https://vercel.com
   - Sign in with GitHub
   - Click "New Project"

3. **Import your repository**:
   - Select your repository from the list
   - Click "Import"

4. **Configure Environment Variables**:
   Before deploying, add these environment variables:
   
   - Go to "Environment Variables" section
   - Add:
     - Name: `TELEGRAM_BOT_TOKEN`
     - Value: `7208219245:AAEYFj0VPBMWVRuJOVthM3BafivljpR2aGY`
   
   - Add:
     - Name: `TELEGRAM_CHAT_ID`
     - Value: `5183767305`

5. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your site is live! 🎉

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd /home/achraf/Desktop/RSIform
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No**
   - What's your project's name? **student-reclamation-portal** (or any name)
   - In which directory is your code located? **./
   - Want to override settings? **No**

5. **Add Environment Variables** (after first deployment):
   ```bash
   vercel env add TELEGRAM_BOT_TOKEN
   # Paste: 7208219245:AAEYFj0VPBMWVRuJOVthM3BafivljpR2aGY
   # Select: Production, Preview, Development (all)

   vercel env add TELEGRAM_CHAT_ID
   # Paste: 5183767305
   # Select: Production, Preview, Development (all)
   ```

6. **Redeploy with environment variables**:
   ```bash
   vercel --prod
   ```

## 📋 Pre-Deployment Checklist

- ✅ All code is committed
- ✅ Environment variables documented
- ✅ `.env.local` is in `.gitignore` (already done)
- ✅ `package.json` has correct scripts
- ✅ No hardcoded secrets in code
- ✅ Tested locally

## 🔐 Important Security Notes

1. **Never commit `.env.local`** - Already in .gitignore ✅
2. **Use Vercel's Environment Variables** - Keeps secrets safe
3. **Environment variables are**:
   - `TELEGRAM_BOT_TOKEN=7208219245:AAEYFj0VPBMWVRuJOVthM3BafivljpR2aGY`
   - `TELEGRAM_CHAT_ID=5183767305`

## 🌐 After Deployment

Once deployed, you'll get a URL like:
- `https://student-reclamation-portal.vercel.app`
- Or your custom domain

### Test Your Deployment:

1. Visit your Vercel URL
2. Fill out the reclamation form
3. Submit
4. Check your Telegram for the message! 📱

## 🔄 Automatic Deployments

Once connected to GitHub:
- Every push to `main` branch → Auto-deploy to production
- Every pull request → Auto-deploy preview
- Instant rollbacks available

## 🎨 Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 📊 Monitoring

After deployment, monitor your app:
- **Analytics**: Vercel Dashboard → Analytics
- **Logs**: Vercel Dashboard → Logs
- **Performance**: Built-in monitoring

## 🐛 Troubleshooting

### Build Fails?
```bash
# Test build locally first
npm run build
```

### Environment Variables Not Working?
1. Check they're added in Vercel Dashboard
2. Redeploy after adding variables
3. Check variable names match exactly

### Telegram Not Sending?
1. Verify environment variables in Vercel
2. Check API route logs in Vercel Dashboard
3. Test bot token with: 
   ```
   https://api.telegram.org/bot7208219245:AAEYFj0VPBMWVRuJOVthM3BafivljpR2aGY/getMe
   ```

## 📱 Quick Deploy Commands

```bash
# First time setup
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
# Add GitHub remote and push

# Or use Vercel CLI
vercel
vercel --prod
```

## ✅ Deployment Complete!

Your Student Reclamation Portal will be live on Vercel!

**Benefits of Vercel Hosting:**
- ⚡ Lightning-fast CDN
- 🔄 Automatic HTTPS
- 🚀 Global edge network
- 📊 Built-in analytics
- 🔄 Zero-downtime deployments
- 🌍 99.99% uptime

---

**Need help?** Check Vercel's documentation: https://vercel.com/docs
