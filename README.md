# Alpha Star Properties - Premium Landing Page

A premium, conversion-optimized landing page for Alpha Star Properties (alphastardubai.ae) with full multilingual support (EN/AR/RU), CRM integrations, and comprehensive analytics tracking.

## 🚀 Features

### Core Functionality
- ✅ **Next.js 14** with TypeScript, SSR/ISR for optimal SEO
- ✅ **Multi-language Support** (EN, AR, RU) with automatic RTL for Arabic
- ✅ **Responsive Design** - Mobile-first, premium UI with brand colors
- ✅ **Lead Forms** - Validation, phone masking, UTM capture, GDPR compliance
- ✅ **WhatsApp Integration** - Floating button with prefilled messages
- ✅ **Analytics** - GA4, Meta Pixel, GTM with comprehensive event tracking
- ✅ **CRM Integration** - Webhook + HubSpot API support
- ✅ **SEO Optimized** - Meta tags, JSON-LD schema, hreflang tags
- ✅ **Performance** - Image optimization (AVIF/WEBP), lazy loading
- ✅ **Testing** - Jest unit tests + Cypress E2E tests

### Components
- Header with language switcher and contact buttons
- Hero section with dual CTAs
- Value Propositions (3 USPs)
- Path Chooser (Buy/Invest/Sell)
- Featured Properties slider
- Social Proof (testimonials + success cases)
- Lead capture modals
- Footer with social links
- Floating WhatsApp button

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## 🛠 Installation & Setup

### 1. Clone/Navigate to Project

```bash
cd alpha
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Analytics
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789

# CRM Integration
HUBSPOT_API_KEY=your_hubspot_api_key_here
WEBHOOK_URL=https://your-webhook-url.com/endpoint

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=971501234567

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://alphastardubai.ae
```

### 4. Start Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## 🌍 Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 Measurement ID | No | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager Container ID | No | `GTM-XXXXXXX` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Facebook/Meta Pixel ID | No | `123456789` |
| `HUBSPOT_API_KEY` | HubSpot API Private App Token | No | `pat-na1-xxxxx` |
| `WEBHOOK_URL` | Custom webhook endpoint URL | No | `https://hooks.zapier.com/...` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (international format, no +) | Yes | `971501234567` |
| `NEXT_PUBLIC_SITE_URL` | Your production website URL | Yes | `https://alphastardubai.ae` |

## 📁 Project Structure

```
alpha/
├── public/
│   └── assets/              # Images and static assets
├── src/
│   ├── app/
│   │   ├── [locale]/        # Locale-specific pages
│   │   │   ├── layout.tsx   # Locale layout with metadata
│   │   │   └── page.tsx     # Home page
│   │   ├── api/
│   │   │   └── hubspot/     # HubSpot CRM API route
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ValueProps.tsx
│   │   ├── PathChooser.tsx
│   │   ├── FeaturedProperties.tsx
│   │   ├── SocialProof.tsx
│   │   ├── LeadFormModal.tsx
│   │   ├── WhatsAppButton.tsx
│   │   ├── Footer.tsx
│   │   └── AnalyticsProviders.tsx
│   ├── locales/             # Translation files
│   │   ├── en.json
│   │   ├── ar.json
│   │   └── ru.json
│   ├── styles/
│   │   └── globals.css      # Global styles & theme
│   ├── utils/               # Utility functions
│   │   ├── analytics.ts     # Analytics tracking
│   │   ├── crm.ts          # CRM integrations
│   │   ├── utm.ts          # UTM parameter handling
│   │   └── whatsapp.ts     # WhatsApp utilities
│   ├── __tests__/          # Unit tests
│   ├── i18n.ts             # i18n configuration
│   └── middleware.ts       # Next.js middleware for i18n
├── cypress/
│   └── e2e/                # E2E tests
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🎨 Customization

### Theme Colors

Edit `src/styles/globals.css` to change brand colors:

```css
:root {
  --color-navy: #0A1628;
  --color-graphite: #2D3748;
  --color-gold: #D4AF37;
  /* ... more variables */
}
```

### Translations

Edit translation files in `src/locales/`:
- `en.json` - English
- `ar.json` - Arabic
- `ru.json` - Russian

All copy is organized by component/section for easy updates.

### Adding Images

Place your images in `public/assets/`:
- `hero.jpg` - Hero section background (1920x1080 recommended)
- `property-1.jpg`, `property-2.jpg`, etc. - Property images (800x600 recommended)
- `logo.png` - Company logo (transparent background)

## 🧪 Testing

### Run Unit Tests

```bash
npm test
```

### Run E2E Tests (Cypress)

```bash
# Interactive mode
npm run cypress:open

# Headless mode
npm run cypress:run
```

## 📊 Analytics & Tracking

The landing page tracks the following events:

| Event Name | Description | Triggers |
|------------|-------------|----------|
| `form_submit` | Lead form submission | When user submits any form |
| `whatsapp_click` | WhatsApp button click | Floating button or header button |
| `phone_click` | Phone number click | Header phone link |
| `view_property` | Property card view | Property detail modal opened |
| `cta_click` | CTA button click | Any primary CTA clicked |

Events are sent to:
- Google Analytics 4 (if configured)
- Meta Pixel (if configured)
- Google Tag Manager dataLayer (if configured)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables in Vercel
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker container

## 🔒 CRM Integration

### HubSpot Setup

1. Create a Private App in HubSpot:
   - Go to Settings → Integrations → Private Apps
   - Create new app with `crm.objects.contacts.write` scope
   - Copy the API token

2. Add token to `.env.local`:
   ```
   HUBSPOT_API_KEY=pat-na1-xxxxx
   ```

### Custom Webhook

To send leads to a custom webhook:

1. Set webhook URL in `.env.local`:
   ```
   WEBHOOK_URL=https://your-webhook-url.com/endpoint
   ```

2. Webhook receives POST requests with this structure:
   ```json
   {
     "name": "John Doe",
     "phone": "+971 50 123 4567",
     "purpose": "buy",
     "message": "Interested in properties",
     "propertyId": "palm-penthouse-1",
     "language": "en",
     "utm": {
       "utm_source": "google",
       "utm_medium": "cpc",
       "utm_campaign": "dubai-properties"
     },
     "pageUrl": "https://alphastardubai.ae",
     "timestamp": "2025-09-30T12:00:00Z"
   }
   ```

## 📱 WhatsApp Integration

The floating WhatsApp button:
- Opens WhatsApp app on mobile devices
- Opens WhatsApp Web on desktop
- Pre-fills message based on context (general inquiry or specific property)
- Tracks clicks in analytics

Configure your WhatsApp number (without + sign):
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=971501234567
```

## 🌐 Multi-language Support

### URL Structure

- English: `/` or `/en`
- Arabic: `/ar`
- Russian: `/ru`

### Adding a New Language

1. Add locale to `src/i18n.ts`:
   ```typescript
   export const locales = ['en', 'ar', 'ru', 'fr'] as const;
   ```

2. Create translation file: `src/locales/fr.json`

3. Copy structure from `en.json` and translate

4. Arabic (RTL) is automatically handled by middleware

## 🎯 SEO Features

- Server-side rendering for all pages
- Dynamic meta tags per language
- JSON-LD structured data (RealEstateAgent schema)
- hreflang tags for multilingual SEO
- Open Graph tags for social sharing
- Semantic HTML structure
- Optimized images with next/image

## ⚡ Performance Optimizations

- Image optimization (AVIF, WEBP formats)
- Lazy loading for below-fold content
- Code splitting by route
- CSS extraction and minification
- Font optimization with next/font
- Static generation where possible (ISR)

Target Lighthouse scores:
- Desktop: > 90
- Mobile: > 70

## 🐛 Troubleshooting

### Forms not submitting

1. Check that `WEBHOOK_URL` and/or `HUBSPOT_API_KEY` are set
2. Check browser console for errors
3. Verify API endpoints are reachable

### Analytics not tracking

1. Verify analytics IDs in `.env.local`
2. Check browser console for script load errors
3. Use browser extensions (GA Debugger, Meta Pixel Helper)

### Language switching not working

1. Clear browser cache
2. Check that locale files exist in `src/locales/`
3. Verify middleware is properly configured

## 📝 TODO / Enhancement Ideas

- [ ] Add CMS integration (Contentful, Sanity, or Strapi)
- [ ] Implement property search/filter functionality
- [ ] Add mortgage calculator
- [ ] Create property comparison feature
- [ ] Add virtual tour integration
- [ ] Implement live chat widget
- [ ] Add blog/news section
- [ ] Create agent profiles page

## 📄 License

Proprietary - Alpha Star Properties © 2025

## 🤝 Support

For technical support or questions:
- Email: dev@alphastardubai.ae
- Documentation: [Internal Confluence]

---

**Built with ❤️ for Alpha Star Properties**
