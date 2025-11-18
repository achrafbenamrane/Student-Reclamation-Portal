#!/bin/bash

# Student Reclamation Portal - Vercel Deployment Script
# This script helps you deploy to Vercel quickly

echo "🚀 Student Reclamation Portal - Vercel Deployment"
echo "================================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Check if files are staged
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ No changes to commit"
else
    echo "📝 Staging all files..."
    git add .
    
    echo "💾 Committing changes..."
    read -p "Enter commit message (or press Enter for default): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Deploy to Vercel - $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    git commit -m "$commit_msg"
    echo "✅ Changes committed"
fi

echo ""
echo "🌐 Deployment Options:"
echo "1. Deploy via Vercel CLI (install if needed)"
echo "2. Push to GitHub (manual Vercel connection needed)"
echo "3. Exit"
echo ""
read -p "Choose option (1-3): " option

case $option in
    1)
        # Check if Vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            echo "📥 Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        echo "🚀 Deploying to Vercel..."
        vercel --prod
        
        echo ""
        echo "✅ Deployment complete!"
        echo ""
        echo "⚠️  Important: Add environment variables in Vercel Dashboard:"
        echo "   TELEGRAM_BOT_TOKEN=7208219245:AAEYFj0VPBMWVRuJOVthM3BafivljpR2aGY"
        echo "   TELEGRAM_CHAT_ID=5183767305"
        ;;
    2)
        echo ""
        read -p "Enter your GitHub repository URL: " repo_url
        if [ ! -z "$repo_url" ]; then
            git remote remove origin 2>/dev/null
            git remote add origin "$repo_url"
            echo "🔼 Pushing to GitHub..."
            git push -u origin main
            echo ""
            echo "✅ Pushed to GitHub!"
            echo ""
            echo "📝 Next steps:"
            echo "1. Go to https://vercel.com"
            echo "2. Click 'New Project'"
            echo "3. Import your GitHub repository"
            echo "4. Add environment variables:"
            echo "   TELEGRAM_BOT_TOKEN=7208219245:AAEYFj0VPBMWVRuJOVthM3BafivljpR2aGY"
            echo "   TELEGRAM_CHAT_ID=5183767305"
            echo "5. Click Deploy!"
        else
            echo "❌ No repository URL provided"
        fi
        ;;
    3)
        echo "👋 Exiting..."
        exit 0
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
echo "🎉 Done! Your Student Reclamation Portal should be live soon!"
