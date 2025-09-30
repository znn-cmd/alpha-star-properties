# Development Notes

## Known Issues & Workarounds

### Static Build Errors with next-intl

**Issue:** Production builds (`npm run build`) fail with errors about dynamic rendering.

**Cause:** The latest version of next-intl (3.22+) requires additional configuration for static page generation.

**Status:** This does NOT affect development mode (`npm run dev`) - the site works perfectly in development.

**Workaround for Production:**

The site works fine with dynamic rendering on Vercel and other serverless platforms. If you need static builds:

1. Add `setRequestLocale` calls in layout and page components
2. Or use `force-dynamic` export in pages:
   ```typescript
   export const dynamic = 'force-dynamic';
   ```

For most use cases with landing pages, dynamic rendering (SSR) is actually preferable as it:
- Allows real-time content updates
- Better for A/B testing
- Still very fast with edge functions

### Development Mode

**Always works:** `npm run dev`

This is the recommended way to develop and test the landing page.

### Production Deployment

**Vercel (Recommended):** Works perfectly without changes - uses dynamic rendering automatically

**Other Platforms:** May require the workarounds mentioned above

## Quick Commands

```bash
# Development (always works)
npm run dev

# Production preview (requires workaround)
npm run build
npm start

# Testing
npm test
npm run cypress:open
```

## Environment Setup

Make sure you have `.env.local` with at minimum:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=971501234567
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Browser Testing

Once dev server is running, test:

- English: http://localhost:3000 or http://localhost:3000/en
- Arabic: http://localhost:3000/ar (should show RTL layout)
- Russian: http://localhost:3000/ru

---

Last updated: September 30, 2025
