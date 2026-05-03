# 🤖 AI Chatbot Widget - Quick Start Guide

## ⚡ 5-Minute Setup

### 1️⃣ Install Dependencies (2 min)

```bash
pip install -r requirements.txt
```

Or manually:
```bash
pip install google-generativeai python-dotenv
```

### 2️⃣ Get Gemini API Key (2 min)

1. Go to https://aistudio.google.com/
2. Sign in with your Google account
3. Click "Get API key"
4. Click "Create API key in new Google Cloud project"
5. Copy the key

### 3️⃣ Create `.env` File (1 min)

Create a new file named `.env` in your project root (same folder as `manage.py`):

```
GEMINI_API_KEY=paste_your_key_here
```

### 4️⃣ Run & Test!

```bash
python manage.py runserver
```

Visit: http://localhost:8000/

Look for the 🤖 robot icon at the **bottom-right corner** of the page!

---

## ✅ What's Already Configured

- ✓ Chat app created and added to Django
- ✓ Static files (CSS + JS) included
- ✓ Base template updated with chatbot widget
- ✓ API endpoint ready at `/api/chatbot/`
- ✓ Error handling implemented

---

## 🎯 Testing the Chatbot

1. Open your website
2. Click the **robot icon** 🤖
3. Type: "What products do you sell?"
4. Hit Send or press Enter
5. Wait for AI response (1-3 seconds)

**Expected Result**: AI responds with information about your e-commerce products.

---

## 🎨 How It Looks

```
┌─────────────────────────┐
│   AI Assistant      ✕   │
├─────────────────────────┤
│ 👤 Hi there!            │
│                         │
│            🤖 Hello! I'm │
│               here to    │
│               help...    │
│                         │
├─────────────────────────┤
│ What's your question... │ [Send]
└─────────────────────────┘
              🤖  ← Floating icon
```

---

## 🔧 Common Issues & Solutions

### ❌ "GEMINI_API_KEY not set"
**Fix**: Make sure `.env` file exists in project root and contains your API key

### ❌ Robot icon not visible
**Fix**: 
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)
- Verify files exist:
  - `s_card/static/css/chatbot.css`
  - `s_card/static/js/chatbot.js`

### ❌ "API endpoint not found"
**Fix**: Run `python manage.py runserver` again

### ❌ Chatbot doesn't respond
**Fix**:
- Check your API key is valid at https://aistudio.google.com/
- Check browser console (F12 → Network) for API errors
- Message must be less than 5000 characters

---

## 📂 File Locations

```
E-commerce/
├── .env                          ← ADD YOUR API KEY HERE!
├── chat/
│   ├── views.py                  ← Backend API logic
│   └── urls.py                   ← /api/chatbot/ endpoint
├── s_card/
│   ├── static/
│   │   ├── css/chatbot.css       ← Styling
│   │   └── js/chatbot.js         ← Frontend logic
│   └── templates/base.html       ← Updated with widget
└── shoping_cart/
    ├── settings.py               ← Chat app added
    └── urls.py                   ← Chat URLs included
```

---

## 🚀 Next Steps

1. ✅ Get it working locally
2. Customize colors/position (see CHATBOT_SETUP.md)
3. Deploy to production with proper environment vars
4. Monitor API usage at https://aistudio.google.com/

---

## 📚 Full Documentation

For advanced configuration, see: `CHATBOT_SETUP.md`

---

## 💡 Pro Tips

**Customize Widget Position:**
```css
/* In chatbot.css, change these values */
.chatbot-widget-icon {
    bottom: 30px;
    right: 30px;    ← Adjust distance from corner
}
```

**Change Widget Color:**
```css
:root {
    --chatbot-primary: #6366f1;    ← Change this hex color
}
```

**Clear Chat History (in browser console):**
```javascript
window.chatbotWidget.clearHistory();
```

**Test API with cURL:**
```bash
curl -X POST http://localhost:8000/api/chatbot/ \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

---

## 🆘 Need Help?

1. **Google Gemini Issues**: https://ai.google.dev/docs
2. **Django Help**: https://docs.djangoproject.com/
3. **Check logs**: `python manage.py runserver` output in terminal

---

## 📋 Checklist Before Deployment

- [ ] `.env` file created with real API key
- [ ] `.env` added to `.gitignore`
- [ ] Tested locally at http://localhost:8000/
- [ ] Chatbot responds to test messages
- [ ] No errors in browser console (F12)
- [ ] Mobile view tested
- [ ] `python manage.py collectstatic` run (if using production server)

---

**You're all set! Happy chatting! 🚀**
