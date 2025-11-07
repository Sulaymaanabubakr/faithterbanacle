# Faith Tabernacle Official Website

A complete rebuild of the Faith Tabernacle official website (faithtabernacle.org.ng) - Living Faith Church Worldwide. This project replicates the visual layout, structure, and functionality of the reference website using clean HTML, CSS, and JavaScript.

## 🌟 Overview

Faith Tabernacle is a Bible-believing church committed to the proclamation of the gospel of Jesus Christ and the word of faith to the nations of the world. This website serves as the digital presence for the church, providing information about services, ministries, events, and online resources.

## 🎯 Project Goals

- **Complete Structural Replication**: Rebuild the entire website structure from scratch
- **Visual Consistency**: Match the design, layout, and user experience of the reference site
- **Responsive Design**: Ensure full functionality across mobile, tablet, and desktop devices
- **Clean Code**: Use semantic HTML5, modern CSS3, and vanilla JavaScript (no frameworks)
- **SEO Optimized**: Implement proper meta tags, sitemap, and accessibility features

## 🛠️ Technologies Used

- **HTML5**: Semantic markup for content structure
- **CSS3**: Modern styling with Flexbox and Grid layouts
- **JavaScript (ES6)**: Interactive features and dynamic functionality
- **Google Fonts**: Oswald and Source Sans 3 typography
- **Remix Icons**: Icon library for UI elements
- **No Frameworks**: Pure vanilla code for maximum performance

## 📁 Project Structure

```
faithterbanacle/
├── index.html                 # Homepage
├── about.html                 # About Us page
├── mandate.html               # The Mandate page
├── media.html                 # Media Center page
├── wofbi.html                 # WOFBI page
├── family.html                # Christian Family page
├── downloads.html             # Downloads page
├── education.html             # Education page
├── contact.html               # Contact Us page
├── give.html                  # Give Online page
├── assets/
│   ├── css/
│   │   ├── global.css         # Global styles and variables
│   │   ├── header.css         # Header and navigation styles
│   │   ├── footer.css         # Footer styles
│   │   ├── home.css           # Homepage specific styles
│   │   └── pages.css          # Inner pages styles
│   ├── js/
│   │   ├── main.js            # Main JavaScript functionality
│   │   └── slider.js          # Hero slider functionality
│   └── images/                # Image assets directory
│       ├── hero/              # Hero section images
│       ├── about/             # About page images
│       ├── ministries/        # Ministry images
│       ├── events/            # Event images
│       └── icons/             # Icons and favicons
├── sitemap.xml                # XML sitemap for SEO
├── robots.txt                 # Robots.txt for search engines
└── README.md                  # This file
```

## 🎨 Design System

### Color Palette
- **Primary Red**: #8B0000 (Dark Red)
- **Primary Gold**: #FFD700 (Gold)
- **Primary White**: #FFFFFF (White)
- **Primary Grey**: #F5F5F5 (Light Grey)
- **Dark Grey**: #333333 (Text Dark)
- **Medium Grey**: #666666 (Text Light)

### Typography
- **Headings**: Oswald (weights: 400, 500, 600, 700)
- **Body Text**: Source Sans 3 (weights: 400, 500, 600)
- **Base Font Size**: 16px (responsive)

### Layout Principles
- **Container Max-Width**: 1200px
- **Grid System**: CSS Grid and Flexbox
- **Spacing Scale**: Based on rem units (0.5rem to 4rem)
- **Border Radius**: 4px to 16px for various elements
- **Shadows**: Three levels (sm, md, lg) for depth

## ✨ Key Features

### 1. Responsive Navigation
- Sticky header on scroll
- Mobile-friendly hamburger menu
- Dropdown menus for sub-pages
- Active link highlighting
- Smooth scroll behavior

### 2. Hero Slider
- Auto-rotating slides (5-second interval)
- Dot pagination indicators
- Pause on hover
- Smooth fade transitions
- Call-to-action buttons

### 3. Interactive Components
- Scroll-to-top button
- WhatsApp floating action button
- Fade-in animations on scroll
- Form validation
- Lazy loading images

### 4. Page Sections

#### Homepage
- Hero slider with multiple slides
- Welcome section with church introduction
- Service times display
- Ministries overview (8 ministry cards)
- Latest announcements
- Call-to-action section

#### About Us
- Church introduction and history
- Mission and vision statements
- Core values (6 values)
- Leadership team showcase
- Statistics section

#### The Mandate
- Divine mandate explanation
- Biblical foundation
- Core pillars of the mandate

#### Media Center
- Latest sermon video embed
- Sermon archive grid
- Photo gallery
- Subscribe CTA

#### WOFBI
- Bible Institute overview
- Programs offered
- Benefits and features

#### Christian Family
- Family ministry information
- Programs and resources
- Support groups

#### Downloads
- Categorized resources
- Audio sermons
- Video messages
- Study guides and PDFs

#### Education
- Educational programs
- Initiatives and partnerships
- Scholarship information

#### Contact Us
- Contact information cards
- Contact form
- Prayer request form
- Google Maps integration
- Office hours

#### Give Online
- Multiple giving types
- Quick amount selection
- Secure payment integration
- Bank transfer details

### 5. Footer
- Church information and description
- Social media links
- Quick navigation links
- Service times
- Contact information
- Copyright and legal links

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1024px
- **Mobile**: 320px to 768px

All pages are fully responsive and tested across different devices and screen sizes.

## 🚀 Deployment

### Local Development

1. Clone the repository
2. Open `index.html` in a web browser
3. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

### Production Deployment

The website can be deployed to any static hosting service:

1. **GitHub Pages**
   - Push to GitHub repository
   - Enable GitHub Pages in repository settings
   - Select main branch as source

2. **Netlify**
   - Connect GitHub repository
   - Set build command: (none)
   - Set publish directory: /

3. **Vercel**
   - Import GitHub repository
   - Deploy as static site

4. **Traditional Hosting**
   - Upload all files via FTP
   - Ensure directory structure is maintained
   - Point domain to hosting directory

## 🔍 SEO Features

- Semantic HTML5 markup
- Meta descriptions on all pages
- Open Graph tags for social sharing
- XML sitemap (sitemap.xml)
- Robots.txt file
- Alt attributes on images
- Proper heading hierarchy (H1-H6)
- Clean URL structure

## ♿ Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast color ratios
- Descriptive link text
- Form labels and validation
- Skip to content links (can be added)

## 🎯 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Performance Optimization

- Minimal CSS and JavaScript
- No external frameworks or libraries (except fonts and icons)
- Lazy loading for images
- Optimized animations
- Clean, efficient code

## 🔧 Customization

### Changing Colors
Edit CSS variables in `assets/css/global.css`:
```css
:root {
    --primary-red: #8B0000;
    --primary-gold: #FFD700;
    /* ... other variables */
}
```

### Modifying Content
- Edit HTML files directly
- Replace placeholder images in `assets/images/`
- Update contact information in all pages

### Adding New Pages
1. Create new HTML file
2. Copy header and footer from existing pages
3. Add page-specific content
4. Update navigation in all pages
5. Add to sitemap.xml

## 📝 License

This project is created for Faith Tabernacle - Living Faith Church Worldwide.

## 🤝 Contributing

This is a church website project. For updates or modifications, please contact the church administration.

## 📞 Contact

**Faith Tabernacle**
- **Address**: Km 10, Idiroko Road, Ota, Ogun State, Nigeria
- **Phone**: +234 801 234 5678
- **Email**: info@faithtabernacle.org.ng
- **Website**: https://faithtabernacle.org.ng

## 🙏 Acknowledgments

- Living Faith Church Worldwide (Winners' Chapel)
- Reference website: https://faithtabernacle.org.ng/
- Google Fonts for typography
- Remix Icon for icon library

---

**Built with faith, dedication, and excellence | © 2024 Faith Tabernacle. All rights reserved.**
