# Deployment Guide - Alpha Star Properties

## Quick Deployment Checklist

- [ ] Configure all environment variables
- [ ] Test locally with `npm run build` and `npm start`
- [ ] Replace placeholder images in `/public/assets/`
- [ ] Update contact information (phone, email)
- [ ] Configure CRM webhooks/API keys
- [ ] Set up analytics accounts (GA4, GTM, Meta Pixel)
- [ ] Configure WhatsApp Business number
- [ ] Test all forms and integrations
- [ ] Run Lighthouse audit
- [ ] Set up domain and SSL

## Vercel Deployment (Recommended)

### Step 1: Prepare Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/alpha-star-properties.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Configure Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789
HUBSPOT_API_KEY=pat-na1-xxxxx
WEBHOOK_URL=https://your-webhook-url.com/endpoint
NEXT_PUBLIC_WHATSAPP_NUMBER=971501234567
NEXT_PUBLIC_SITE_URL=https://alphastardubai.ae
```

### Step 4: Deploy

Click "Deploy" and wait for build to complete (2-3 minutes).

### Step 5: Configure Custom Domain

1. Go to Project Settings → Domains
2. Add your domain: `alphastardubai.ae`
3. Configure DNS records as instructed
4. Wait for SSL certificate provisioning (automatic)

## Alternative Deployment Options

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod
```

Environment variables: Configure in Netlify Dashboard → Site Settings → Environment

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t alpha-star-properties .
docker run -p 3000:3000 --env-file .env.local alpha-star-properties
```

### AWS Amplify

1. Connect your GitHub repository
2. Choose branch to deploy
3. Configure build settings (auto-detected for Next.js)
4. Add environment variables in Amplify Console
5. Deploy

## Post-Deployment

### 1. Test All Functionality

- [ ] Test all language versions (EN, AR, RU)
- [ ] Submit test leads through all forms
- [ ] Click WhatsApp button (mobile and desktop)
- [ ] Verify analytics tracking in real-time reports
- [ ] Test on multiple devices and browsers

### 2. Configure Analytics

**Google Analytics 4:**
1. Create property at analytics.google.com
2. Copy Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables
4. Verify tracking in GA4 real-time view

**Google Tag Manager:**
1. Create container at tagmanager.google.com
2. Copy Container ID (GTM-XXXXXXX)
3. Add to environment variables
4. Preview mode to test events

**Meta Pixel:**
1. Create pixel at business.facebook.com
2. Copy Pixel ID
3. Add to environment variables
4. Test with Meta Pixel Helper extension

### 3. CRM Setup

**HubSpot:**
```bash
# Generate Private App Token
1. HubSpot → Settings → Integrations → Private Apps
2. Create app with scope: crm.objects.contacts.write
3. Copy token and add to HUBSPOT_API_KEY
```

**Custom Webhook:**
- Set WEBHOOK_URL to your endpoint
- Webhook should accept POST with JSON body
- Test with curl:

```bash
curl -X POST https://your-webhook-url.com/endpoint \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","phone":"+971501234567","purpose":"buy"}'
```

### 4. Performance Optimization

Run Lighthouse audit:

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://alphastardubai.ae --view
```

Target scores:
- Performance: > 90 (desktop), > 70 (mobile)
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

### 5. Monitoring Setup

**Vercel Analytics (if using Vercel):**
- Automatically enabled
- View in Vercel Dashboard → Analytics

**Sentry Error Tracking (Optional):**

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

**Uptime Monitoring:**
- Use Vercel's built-in monitoring
- Or external: UptimeRobot, Pingdom, StatusCake

## Domain Configuration

### DNS Records

Configure these DNS records at your domain registrar:

```
Type    Name    Value                           TTL
A       @       76.76.21.21                    3600
CNAME   www     cname.vercel-dns.com.          3600
```

(Values will differ based on hosting provider)

### SSL Certificate

- Vercel: Automatic (Let's Encrypt)
- Netlify: Automatic (Let's Encrypt)
- CloudFlare: Can proxy through CloudFlare for free SSL

## Backup & Recovery

### Database Backup (if using CMS later)

```bash
# Regular backups of CMS data
# Set up automated daily backups
```

### Code Repository

- Keep main branch protected
- Require pull request reviews
- Tag releases: `git tag v1.0.0`

### Environment Variables Backup

Store securely in password manager or encrypted file.

## Scaling Considerations

For high traffic:

1. **Enable ISR (Incremental Static Regeneration)**
   - Already configured in Next.js setup
   - Pages regenerate on-demand

2. **CDN Configuration**
   - Vercel includes global CDN
   - Consider CloudFlare for additional layer

3. **Rate Limiting**
   - Implement for form submissions
   - Use Vercel's edge middleware

4. **Database**
   - When adding CMS, use managed service (PlanetScale, Supabase)
   - Enable connection pooling

## Maintenance

### Regular Updates

```bash
# Update dependencies monthly
npm update
npm audit fix

# Test after updates
npm run build
npm test
npm run cypress:run
```

### Content Updates

Translation updates:
1. Edit files in `src/locales/`
2. Commit changes
3. Deploy updates

### Monitoring

- Check analytics weekly
- Review form submissions daily
- Monitor error logs (Sentry/Vercel)
- Check Lighthouse scores monthly

## Rollback Procedure

If issues after deployment:

### Vercel
1. Go to Deployments
2. Find last working deployment
3. Click "..." → Promote to Production

### Git
```bash
git revert HEAD
git push origin main
```

## Support Contacts

- **Hosting Issues:** support@vercel.com
- **Domain Issues:** Your registrar support
- **Analytics Issues:** GA4/GTM support forums
- **Technical Issues:** dev@alphastardubai.ae

---

**Last Updated:** September 2025
