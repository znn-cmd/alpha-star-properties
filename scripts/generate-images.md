# Image Asset Guide

## Required Images

Place these images in `public/assets/`:

### Hero Section
- **hero.jpg**
  - Size: 1920 x 1080 px
  - Format: JPG (high quality) or PNG
  - Subject: Dubai skyline or luxury property exterior
  - File size: < 500 KB (compress with TinyPNG)

### Properties
- **property-1.jpg** (Palm Jumeirah Penthouse)
  - Size: 800 x 600 px minimum
  - Format: JPG
  - File size: < 200 KB each

Add more as needed: property-2.jpg, property-3.jpg, etc.

### Branding
- **logo.png**
  - Size: 500 x 200 px (or maintain aspect ratio)
  - Format: PNG with transparency
  - File size: < 50 KB

- **favicon.ico**
  - Size: 32 x 32 px
  - Format: ICO or PNG
  - Place in `public/` root

### Social Media
- **og-image.jpg** (Open Graph for social sharing)
  - Size: 1200 x 630 px
  - Format: JPG
  - Shows when sharing on Facebook, LinkedIn, etc.

## Image Optimization

### Automated Optimization

Next.js automatically optimizes images when using the `<Image>` component. To add images:

```typescript
import Image from 'next/image';

<Image
  src="/assets/hero.jpg"
  alt="Dubai skyline"
  width={1920}
  height={1080}
  priority
/>
```

### Manual Optimization Tools

**Online:**
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression
- [Squoosh](https://squoosh.app/) - Advanced image compression
- [AVIF Converter](https://avif.io/) - Convert to AVIF format

**CLI Tools:**

```bash
# Install Sharp CLI
npm install -g sharp-cli

# Convert and optimize
sharp -i hero.jpg -o hero.avif --avif
sharp -i hero.jpg -o hero.webp --webp

# Batch convert all JPGs
for file in *.jpg; do sharp -i "$file" -o "${file%.jpg}.avif" --avif; done
```

### Responsive Images Script

Create multiple sizes for responsive loading:

```bash
# Install ImageMagick
# macOS: brew install imagemagick
# Ubuntu: sudo apt-get install imagemagick

# Generate responsive sizes
convert hero.jpg -resize 640x hero-640.jpg
convert hero.jpg -resize 750x hero-750.jpg
convert hero.jpg -resize 828x hero-828.jpg
convert hero.jpg -resize 1080x hero-1080.jpg
convert hero.jpg -resize 1200x hero-1200.jpg
convert hero.jpg -resize 1920x hero-1920.jpg
```

## Recommended Image Sources

### Stock Photos (Premium)
- [Unsplash](https://unsplash.com/) - Free high-quality
- [Pexels](https://pexels.com/) - Free stock photos
- [Shutterstock](https://shutterstock.com/) - Paid, premium quality

### Dubai-Specific
- Search terms: "Dubai skyline", "Palm Jumeirah", "Dubai Marina", "luxury apartment Dubai"
- Ensure you have commercial usage rights

### Property Photos
- Professional photography recommended
- Hire local Dubai photographer
- Use drone shots for exterior/aerial views
- Golden hour lighting (sunset) works best

## Current Placeholder Behavior

The site currently uses CSS gradient placeholders. Replace with actual images:

1. Add images to `public/assets/`
2. Update image paths in components:
   - `src/components/Hero.tsx` (hero background)
   - `src/components/FeaturedProperties.tsx` (property images)

Example update in Hero.tsx:

```typescript
// Replace placeholder div with:
<Image
  src="/assets/hero.jpg"
  alt="Elite properties in Dubai"
  fill
  priority
  className={styles.heroImage}
/>
```

## Image Guidelines

### Do's
✅ Use high-resolution images
✅ Optimize file sizes (< 500 KB for hero, < 200 KB for others)
✅ Use descriptive alt text for accessibility
✅ Maintain consistent aspect ratios
✅ Use professional photography

### Don'ts
❌ Use images without proper licensing
❌ Upload unoptimized images (> 1 MB)
❌ Use low-resolution images that pixelate
❌ Forget alt text
❌ Use copyrighted content without permission

## Alt Text Examples

Good alt text is descriptive but concise:

```typescript
// Good
alt="Modern penthouse with panoramic view of Palm Jumeirah and Dubai Marina"

// Bad (too vague)
alt="Property"

// Bad (keyword stuffing)
alt="Dubai property real estate luxury apartment buy investment Palm Jumeirah"
```

## Quick Setup for Development

If you don't have images yet, download these free placeholders:

```bash
# Create assets directory
mkdir -p public/assets

# Download placeholder (requires curl)
curl -o public/assets/hero.jpg "https://source.unsplash.com/1920x1080/?dubai,luxury"
curl -o public/assets/property-1.jpg "https://source.unsplash.com/800x600/?apartment,luxury"
```

⚠️ **Note:** These are for development only. Replace with licensed images before production deployment.

---

For questions about image assets, contact: creative@alphastardubai.ae
