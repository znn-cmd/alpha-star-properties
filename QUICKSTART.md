# ⚡ Quick Start Guide

Get the Alpha Star Properties landing page running in **under 5 minutes**.

## Prerequisites

- Node.js 18+ installed ([Download](https://nodejs.org/))
- A code editor (VS Code recommended)

Check your Node version:
```bash
node --version  # Should be 18.x or higher
```

## 🚀 Launch in 3 Steps

### 1. Install Dependencies

```bash
npm install
```

This will take 2-3 minutes to download all packages.

### 2. Set Up Environment

```bash
# Copy example environment file
cp .env.example .env.local
```

**Minimum required:** Open `.env.local` and set:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=971501234567
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> 💡 Other variables (analytics, CRM) are optional for local development

### 3. Start Development Server

```bash
npm run dev
```

**Open your browser:** [http://localhost:3000](http://localhost:3000)

✅ **Done!** You should see the landing page in English.

---

## 🌍 Test Multi-Language

- English: [http://localhost:3000/en](http://localhost:3000/en)
- Arabic: [http://localhost:3000/ar](http://localhost:3000/ar)
- Russian: [http://localhost:3000/ru](http://localhost:3000/ru)

## 🧪 Test Features

### Test Form Submission

1. Click "Book a Viewing" button
2. Fill in the form:
   - Name: Your Name
   - Phone: +971 50 123 4567
   - Select purpose: Buy
   - Check GDPR consent
3. Click "Send"
4. You should see success message

> ⚠️ Note: Without webhook/CRM configured, data won't be sent anywhere (check browser console)

### Test WhatsApp Button

Click the floating WhatsApp button (bottom-right)
- Opens WhatsApp with pre-filled message
- Uses number from `NEXT_PUBLIC_WHATSAPP_NUMBER`

### Test Language Switching

Click language buttons (EN/AR/RU) in header
- Content changes instantly
- Arabic switches to RTL layout
- URL updates to reflect language

## 📝 Next Steps

### Add Real Content

**1. Add Images:**
```bash
# Add your images to:
public/assets/hero.jpg
public/assets/property-1.jpg
```

See [scripts/generate-images.md](scripts/generate-images.md) for image requirements.

**2. Update Translations:**

Edit text in:
- `src/locales/en.json` (English)
- `src/locales/ar.json` (Arabic)
- `src/locales/ru.json` (Russian)

**3. Configure Analytics:**

Add to `.env.local`:
```env
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789
```

**4. Connect CRM:**

Add to `.env.local`:
```env
HUBSPOT_API_KEY=pat-na1-xxxxx
WEBHOOK_URL=https://your-webhook-url.com/endpoint
```

## 🔧 Common Issues

### Port 3000 Already in Use

```bash
# Use different port
PORT=3001 npm run dev
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### TypeScript Errors

```bash
# Rebuild TypeScript
npm run build
```

## 📚 Full Documentation

- **Complete Setup:** See [README.md](README.md)
- **Deployment Guide:** See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Image Guidelines:** See [scripts/generate-images.md](scripts/generate-images.md)

## 🎯 Production Checklist

Before deploying to production:

- [ ] Replace all placeholder images
- [ ] Configure all environment variables
- [ ] Update contact information (phone, email)
- [ ] Test all forms
- [ ] Test on mobile devices
- [ ] Run `npm run build` successfully
- [ ] Set up analytics accounts
- [ ] Configure CRM integration
- [ ] Test WhatsApp integration
- [ ] Add your domain to `NEXT_PUBLIC_SITE_URL`

## 🆘 Need Help?

- Check [README.md](README.md) for detailed documentation
- Review component files in `src/components/`
- Check console logs for errors (F12 in browser)

## 📊 Useful Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start           # Run production build

# Testing
npm test            # Run unit tests
npm run cypress:open # Open Cypress E2E tests

# Code Quality
npm run lint        # Check for code issues
```

---

**You're all set!** 🎉

The landing page is now running locally. Make your customizations and deploy when ready.

For deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).
