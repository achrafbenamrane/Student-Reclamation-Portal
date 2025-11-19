# 🎓 Student Reclamation Portal

A secure, modern web application for **Badji Mokhtar University** students (Master in Network & Cybersecurity) to submit reclamations directly to faculty administration via Telegram.

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run security tests
./test-security.sh
```

Visit: http://localhost:3000

---

## 🌟 Key Features

- ✅ **Modern UI/UX** - Glassmorphism design with smooth animations
- ✅ **Telegram Integration** - Real-time notifications to administrators
- ✅ **Searchable Student Select** - 41 students from validated list
- ✅ **10 Security Layers** - Rate limiting, spam detection, XSS protection
- ✅ **Form Validation** - Client and server-side validation
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Type-Safe** - Full TypeScript coverage
- ✅ **Production Ready** - Optimized for Vercel deployment

---

## 🔒 Security Status: HIGH

**Protected Against:**
- DOS/DDOS attacks (rate limiting)
- Spam submissions (keyword detection)
- Fake student reports (validation)
- XSS attacks (pattern detection)
- CSRF attacks (same-origin policy)
- Brute force (rate limiting)

---

## 📚 Complete Documentation

| Document | Description | When to Read |
|----------|-------------|--------------|
| **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)** | Commands & quick tips | Start here! |
| **[PROJECT-SUMMARY.md](PROJECT-SUMMARY.md)** | Complete feature overview | Understand the project |
| **[SETUP.md](SETUP.md)** | Installation guide | First-time setup |
| **[SECURITY.md](SECURITY.md)** | Security implementation | Understanding protection |
| **[TESTING.md](TESTING.md)** | Testing procedures | Before deployment |
| **[VERCEL-DEPLOYMENT.md](VERCEL-DEPLOYMENT.md)** | Deployment steps | Ready to deploy |
| **[README-NEXTJS.md](README-NEXTJS.md)** | Full technical docs | Deep dive |

---

## 🚀 Deployment Status

- [x] Development complete
- [x] Security implemented
- [x] Documentation complete
- [x] Test scripts ready
- [ ] **Deploy to Vercel** ← Next step!

**Ready for production deployment** 🎉

---

## 🔑 Environment Variables

Required in `.env.local`:
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

✅ Already configured for this project

---

## � Testing

Run the automated security test suite:

```bash
./test-security.sh
```

**Tests 8 security features:**
1. Valid submission
2. Rate limiting
3. Invalid student name
4. Spam detection
5. XSS prevention
6. Short message rejection
7. Invalid email format
8. Missing fields

See [TESTING.md](TESTING.md) for manual testing procedures.

---

## 🎯 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Security:** Custom rate limiting + validation

---

## 🏛️ University Information

**Institution:** Badji Mokhtar University  
**Faculty:** Faculty of Technology  
**Department:** Computer Science  
**Program:** Master in Network & Cybersecurity
- 🎭 **Interactive Elements** - Hover effects, loading states, and animations

## 🚀 Getting Started

### Prerequisites

- A web browser (Chrome, Firefox, Safari, Edge)
- A Telegram account
- A text editor (VS Code, Sublime Text, etc.)

### Installation

1. **Clone or download this repository**
   ```bash
   cd /home/achraf/Desktop/RSIform
   ```

2. **Open the project**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js
     npx http-server
     ```

3. **Access the website**
   - If using a local server: `http://localhost:8000`
   - Or just double-click `index.html`

## 🤖 Telegram Bot Configuration

To enable automatic submission to Telegram, follow these steps:

### Step 1: Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Start a conversation and send `/newbot`
3. Follow the instructions to create your bot
4. Save the **Bot Token** provided (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: Get Your Chat ID

1. Search for `@userinfobot` on Telegram
2. Start a conversation
3. The bot will send you your **Chat ID** (looks like: `123456789`)

**For Group Chat:**
- Add your bot to the group
- Send a message in the group
- Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
- Find the `chat` object and copy the `id` (might be negative for groups)

### Step 3: Configure the Website

1. Open `script.js` in a text editor
2. Find the `CONFIG` object at the top:
   ```javascript
   const CONFIG = {
       TELEGRAM_BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE',
       TELEGRAM_CHAT_ID: 'YOUR_CHAT_ID_HERE',
       TELEGRAM_API_URL: 'https://api.telegram.org/bot'
   };
   ```

3. Replace the values:
   ```javascript
   const CONFIG = {
       TELEGRAM_BOT_TOKEN: '123456789:ABCdefGHIjklMNOpqrsTUVwxyz',
       TELEGRAM_CHAT_ID: '123456789',
       TELEGRAM_API_URL: 'https://api.telegram.org/bot'
   };
   ```

4. Save the file

### Step 4: Test the Integration

1. Open the website in your browser
2. Fill out the form with test data
3. Submit the reclamation
4. Check your Telegram bot/chat for the message

## 📁 Project Structure

```
RSIform/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript functionality and Telegram integration
└── README.md           # This file
```

## 🎨 Customization

### Adding More Students

Edit `index.html` and add more options in the student name dropdown:

```html
<select id="studentName" name="studentName" class="form-input form-select" required>
    <option value="">-- Choose your name --</option>
    <option value="Your Name">Your Name</option>
    <!-- Add more students here -->
</select>
```

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #8b5cf6;    /* Secondary color */
    --accent-color: #ec4899;       /* Accent color */
    /* ... */
}
```

### Modifying Categories

Edit the category dropdown in `index.html`:

```html
<select id="category" name="category" class="form-input form-select" required>
    <option value="">-- Select category --</option>
    <option value="Your Category">Your Category</option>
    <!-- Add or modify categories -->
</select>
```

## 🔧 Technical Details

### Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties, animations, and glassmorphism
- **JavaScript (ES6+)** - Vanilla JS with async/await
- **Telegram Bot API** - For message delivery
- **Font Awesome** - Icons
- **Google Fonts** - Poppins and Inter fonts

### Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

### Features Breakdown

#### CSS Features:
- CSS Custom Properties (Variables)
- Flexbox & Grid Layout
- Backdrop Filter (Glassmorphism)
- CSS Animations & Transitions
- Media Queries (Responsive Design)
- Custom Scrollbar Styling

#### JavaScript Features:
- Form Validation
- Fetch API for Telegram Integration
- Intersection Observer for Scroll Animations
- Event Delegation
- Async/Await
- Error Handling

## 📱 Mobile Optimization

The website is fully responsive and optimized for:
- 📱 Phones (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)
- 🖥️ Large screens (1440px and up)

## 🐛 Troubleshooting

### Telegram Messages Not Sending

1. **Check Console Errors**
   - Open browser DevTools (F12)
   - Look for errors in the Console tab

2. **Verify Bot Token**
   - Make sure the token is correct
   - No extra spaces or quotes

3. **Verify Chat ID**
   - Use `@userinfobot` to get the correct ID
   - For groups, the ID might be negative

4. **CORS Issues**
   - Telegram API should work from browsers
   - If issues persist, consider using a proxy or backend

### Animations Not Working

1. Check if JavaScript is enabled
2. Try a different browser
3. Clear browser cache

### Styling Issues

1. Make sure all files are in the same directory
2. Check that `styles.css` is properly linked
3. Clear browser cache and reload

## 🔐 Security Considerations

1. **Bot Token Security**
   - ⚠️ Never commit your bot token to public repositories
   - Consider using environment variables or a backend
   - For production, use a server-side solution

2. **Input Validation**
   - Client-side validation is implemented
   - For production, add server-side validation

3. **Rate Limiting**
   - Consider adding rate limiting for form submissions
   - Implement CAPTCHA for public deployments

## 🚀 Deployment

### GitHub Pages

1. Create a GitHub repository
2. Push your files (without exposing bot token)
3. Go to Settings > Pages
4. Select branch and save

### Netlify

1. Drag and drop your folder to Netlify
2. Your site is live!

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 📝 To-Do / Future Enhancements

- [ ] Add file upload capability
- [ ] Implement backend API for secure token storage
- [ ] Add email notifications
- [ ] Create admin dashboard
- [ ] Add reCAPTCHA
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Export reclamations to PDF

## 👨‍💻 Development

### Running Locally

```bash
# Clone the repository
cd /home/achraf/Desktop/RSIform

# Start a local server
python -m http.server 8000

# Open browser
# Navigate to http://localhost:8000
```

### Making Changes

1. Edit files in your text editor
2. Refresh browser to see changes
3. Test on different devices/browsers

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support regarding this system:
- Department of Computer Science
- Faculty of Technology
- Badji Mokhtar University

## 🙏 Acknowledgments

- Badji Mokhtar University
- Faculty of Technology
- Department of Computer Science
- Master Cybersecurity Program

---

**Made with ❤️ for students by students**

🎓 Happy Learning! 🚀
