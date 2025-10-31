# Image Assets

This directory contains all image assets for the Faith Tabernacle website.

## Required Images

### Homepage
- `hero-1.jpg` - Main hero slider image (1920x1080px recommended)
- `hero-2.jpg` - Second hero slider image (1920x1080px recommended)
- `hero-3.jpg` - Third hero slider image (1920x1080px recommended)

### About Page
- `about-hero.jpg` - About page hero image (1920x600px)
- `about-church.jpg` - Church building/congregation image (1200x800px)
- `pastor-1.jpg` - Senior Pastor photo (600x600px square)
- `pastor-2.jpg` - Assistant Pastor photo (600x600px square)
- `pastor-3.jpg` - Youth Pastor photo (600x600px square)

### Contact Page
- `contact-hero.jpg` - Contact page hero image (1920x600px)

### Events Page
- `events-hero.jpg` - Events page hero image (1920x600px)

### Media Center
- Various event photos and sermon thumbnails
- Recommended size: 800x600px for gallery images

### Other Pages
- Each page should have a hero image (1920x600px)
- Additional content images as needed

## Image Guidelines

### Optimization
- Use JPEG for photos (quality: 80-85%)
- Use PNG for graphics with transparency
- Use WebP format for better compression when possible
- Optimize all images before uploading (use tools like TinyPNG, ImageOptim)

### Naming Convention
- Use lowercase letters
- Use hyphens instead of spaces
- Be descriptive: `christmas-service-2023.jpg` not `img1.jpg`

### Accessibility
- Always add meaningful alt text in HTML
- Ensure good contrast for text overlays
- Avoid text-heavy images

### Responsive Images
- Provide multiple sizes when possible
- Use appropriate aspect ratios for different devices
- Consider using `<picture>` element for art direction

## Favicon
Place your favicon in `/assets/icons/` directory:
- `favicon.png` (32x32px or 64x64px)
- `favicon.ico` (optional, for older browsers)
- Consider creating additional sizes for mobile devices

## Logo
- Place church logo in this directory
- Recommended formats: PNG with transparency
- Multiple sizes: Small (120x120), Medium (240x240), Large (480x480)

## Where to Get Images

1. **Church Events**: Use photos from actual church services and events
2. **Stock Photos**: If needed, use high-quality stock images from:
   - Unsplash (https://unsplash.com)
   - Pexels (https://pexels.com)
   - Pixabay (https://pixabay.com)
3. **Custom Graphics**: Create custom graphics using:
   - Canva (https://canva.com)
   - Adobe Photoshop
   - GIMP (free alternative)

## Cloudinary Integration

For dynamic content (events, sermons, media gallery), images will be stored on Cloudinary:
- Configure Cloudinary settings in `/config/cloudinary-config.js`
- Images uploaded through admin dashboard will automatically be hosted on Cloudinary
- Cloudinary provides automatic optimization, resizing, and CDN delivery

## Copyright and Licensing

- Ensure you have rights to use all images
- Credit photographers when required
- Keep records of image sources and licenses
- Avoid copyrighted material without permission

## Next Steps

1. Add your church logo as `logo.png`
2. Add hero images for each page
3. Add pastor/leadership photos
4. Add event and service photos
5. Test all images on different devices and screen sizes
