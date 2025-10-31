# Faith Tabernacle Website

A premium, world-class church website for Faith Tabernacle - a faith assembly under Living Faith Church Worldwide. Built with modern web technologies, featuring a complete content management system (CMS) with Firebase backend and Cloudinary media storage.

## 🌟 Features

### Public Website
- **Responsive Design**: Fully mobile-first, tablet, and desktop responsive
- **Modern UI/UX**: Clean, elegant design with smooth animations and transitions
- **Hero Slider**: Dynamic homepage slider with multiple slides
- **Service Times**: Clear display of all service schedules
- **Events Management**: Upcoming events with date displays
- **Media Center**: Photos and videos from church events
- **Ministries**: Overview of all church ministries
- **Contact Forms**: Contact, prayer request, and visit planning forms
- **Newsletter Subscription**: Email subscription functionality
- **Live Streaming**: Embedded YouTube/Vimeo sermon videos
- **Word for Today**: Daily scripture and devotional
- **SEO Optimized**: Meta tags, Open Graph data for social sharing
- **Performance**: Lazy loading images, optimized assets

### Pages
1. **Home** - Hero slider, services, events, media, ministries
2. **About Us** - Church history, mission, vision, values, leadership
3. **The Mandate** - Church's mandate and calling
4. **Media Center** - Sermons, photos, videos gallery
5. **WOFBI** - Word of Faith Bible Institute information
6. **Christian Family** - Family ministry resources
7. **Downloads** - Downloadable resources and materials
8. **Education** - Educational programs and initiatives
9. **Events** - Upcoming and past events
10. **Contact Us** - Contact forms, prayer requests, map
11. **Give Online** - Online giving with Paystack/Flutterwave integration

### Admin Dashboard
- **Secure Authentication**: Firebase Auth with email/password and Google Sign-in
- **Events Management**: Create, edit, delete events
- **Sermons Management**: Upload and manage sermon videos
- **Media Gallery**: Image and video uploads via Cloudinary
- **News/Announcements**: Publish church news and updates
- **Ministries Management**: Manage ministry information
- **Word for Today**: Update daily devotional content
- **Real-time Updates**: Firestore real-time sync
- **Toast Notifications**: User-friendly feedback system
- **Responsive Interface**: Works on all devices

### Technical Features
- **Firebase Integration**: Authentication, Firestore database, real-time sync
- **Cloudinary Integration**: Image and video hosting
- **Reusable Components**: Header, footer, navigation, modals, toasts
- **Scroll Animations**: Intersection Observer for reveal effects
- **Sticky Header**: Fixed navigation on scroll
- **Mobile Navigation**: Hamburger menu for mobile devices
- **WhatsApp Integration**: Floating WhatsApp button
- **Scroll to Top**: Smooth scroll-to-top functionality
- **Preloader**: Elegant loading animation
- **Form Validation**: Client-side form validation
- **Error Handling**: Graceful error handling and user feedback

## 🎨 Design System

### Colors
- **Primary Blue**: `#1e3a8a` - Main brand color
- **Primary Red**: `#dc2626` - Accent color
- **Primary Gold**: `#f59e0b` - Highlight color
- **Primary White**: `#ffffff` - Background
- **Neutral Grays**: Various shades for text and backgrounds

### Typography
- **Headings**: Poppins (Google Fonts)
- **Body Text**: Inter (Google Fonts)
- **Font Sizes**: Responsive, using CSS clamp()

### Icons
- **Remix Icons**: Modern, clean icon set
- Used throughout the website for UI elements

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase account
- Cloudinary account
- Text editor (VS Code recommended)
- Local web server (optional: Live Server extension for VS Code)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sulaymaanabubakr/faithterbanacle.git
   cd faithterbanacle
   ```

2. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Copy `config/firebase-config.example.js` to `config/firebase-config.js`
   - Add your Firebase configuration:
     ```javascript
     const firebaseConfig = {
         apiKey: "YOUR_API_KEY",
         authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
         projectId: "YOUR_PROJECT_ID",
         storageBucket: "YOUR_PROJECT_ID.appspot.com",
         messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
         appId: "YOUR_APP_ID"
     };
     ```

3. **Set up Cloudinary**
   - Create a Cloudinary account at [Cloudinary](https://cloudinary.com/)
   - Create an unsigned upload preset in Settings > Upload
   - Copy `config/cloudinary-config.example.js` to `config/cloudinary-config.js`
   - Add your Cloudinary configuration:
     ```javascript
     const cloudinaryConfig = {
         cloudName: "YOUR_CLOUD_NAME",
         uploadPreset: "YOUR_UPLOAD_PRESET"
     };
     ```

4. **Configure Firestore Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Public read, authenticated write
       match /events/{document=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /media/{document=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /wordForToday/{document=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       // Submissions - public write, authenticated read
       match /contacts/{document=**} {
         allow read: if request.auth != null;
         allow create: if true;
       }
       match /prayerRequests/{document=**} {
         allow read: if request.auth != null;
         allow create: if true;
       }
       match /newsletter/{document=**} {
         allow read: if request.auth != null;
         allow create: if true;
       }
     }
   }
   ```

5. **Launch the website**
   - Open `index.html` in a web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     
     # Using VS Code Live Server extension
     Right-click index.html > Open with Live Server
     ```

### Admin Access

1. Navigate to `/admin/admin-login.html`
2. Create an admin account or sign in with Google
3. Access the admin dashboard to manage content

## 📁 Project Structure

```
faithterbanacle/
├── index.html              # Homepage
├── README.md              # Project documentation
├── .gitignore            # Git ignore rules
├── assets/
│   ├── css/
│   │   ├── global.css    # Global styles and design system
│   │   ├── header.css    # Header and navigation styles
│   │   ├── footer.css    # Footer styles
│   │   ├── components.css # Reusable component styles
│   │   └── home.css      # Homepage specific styles
│   ├── js/
│   │   ├── components.js # Reusable JavaScript components
│   │   └── home.js       # Homepage specific scripts
│   ├── images/           # Image assets
│   └── icons/            # Icon assets
├── pages/
│   ├── about.html        # About Us page
│   ├── mandate.html      # The Mandate page
│   ├── media.html        # Media Center page
│   ├── wofbi.html        # WOFBI page
│   ├── family.html       # Christian Family page
│   ├── downloads.html    # Downloads page
│   ├── education.html    # Education page
│   ├── events.html       # Events page
│   ├── contact.html      # Contact Us page
│   └── give.html         # Give Online page
├── admin/
│   ├── admin-login.html  # Admin login page
│   └── admin-dashboard.html # Admin CMS dashboard
└── config/
    ├── firebase-config.example.js    # Firebase config template
    ├── firebase-config.js            # Firebase config (gitignored)
    ├── cloudinary-config.example.js  # Cloudinary config template
    └── cloudinary-config.js          # Cloudinary config (gitignored)
```

## 🔒 Security

- **Firebase Authentication**: Secure user authentication
- **Firestore Rules**: Proper database security rules
- **Environment Variables**: Sensitive data in gitignored files
- **Admin Protection**: Admin pages require authentication
- **Input Validation**: Client-side and server-side validation
- **HTTPS**: Use HTTPS in production
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Form tokens (implement in production)

## 🌐 Deployment

### Firebase Hosting (Recommended)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

4. **Deploy**
   ```bash
   firebase deploy
   ```

### Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
3. Add environment variables in Netlify dashboard
4. Deploy

### Vercel

1. Import your GitHub repository in Vercel
2. Configure project settings
3. Deploy

## 📊 Firestore Collections

### events
```javascript
{
  title: string,
  description: string,
  date: timestamp,
  time: string,
  location: string,
  image: string (URL),
  createdAt: timestamp
}
```

### media
```javascript
{
  title: string,
  description: string,
  url: string (Cloudinary URL),
  thumbnail: string (URL),
  type: string ('image' | 'video'),
  createdAt: timestamp
}
```

### wordForToday
```javascript
{
  verse: string,
  reference: string,
  date: timestamp
}
```

### contacts
```javascript
{
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
  createdAt: timestamp
}
```

### prayerRequests
```javascript
{
  name: string,
  email: string,
  phone: string,
  request: string,
  status: string ('pending' | 'prayed'),
  createdAt: timestamp
}
```

### newsletter
```javascript
{
  email: string,
  subscribedAt: timestamp,
  status: string ('active' | 'unsubscribed')
}
```

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **JavaScript (ES6+)**: Modern JavaScript features
- **Firebase**: Backend as a Service
  - Authentication
  - Firestore Database
  - Hosting
- **Cloudinary**: Media management and CDN
- **Google Fonts**: Poppins and Inter
- **Remix Icons**: Icon library

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance Optimization

- **Lazy Loading**: Images load as they enter viewport
- **Minification**: Minify CSS and JS in production
- **Compression**: Enable Gzip/Brotli compression
- **Caching**: Leverage browser caching
- **CDN**: Use Cloudinary CDN for media
- **Code Splitting**: Modular JavaScript files
- **Async Loading**: Non-critical scripts load asynchronously

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of Faith Tabernacle - Living Faith Church Worldwide.

## 👥 Support

For support and inquiries:
- Email: info@faithtabernacle.org
- Phone: +234 801 234 5678
- WhatsApp: [Click to chat](https://wa.me/2348012345678)

## 🙏 Acknowledgments

- Living Faith Church Worldwide
- Faith Tabernacle Leadership Team
- All contributors and volunteers

---

**Built with ❤️ for the Kingdom of God**

*Making an Impact for Jesus Christ*