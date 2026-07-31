# 12A2 - Ga Tàu Ký Ức (Memory Station Express)

> A nostalgic interactive web experience celebrating the journey of Class 12A2 through three unforgettable years of high school (2023-2026)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red)]()

## 📖 Project Overview

**Ga Tàu Ký Ức** (Memory Station Express) is a cinematic, interactive memorial website dedicated to capturing and celebrating the memories of Class 12A2 from **Chuyên Hùng Vương High School**. This project commemorates three incredible years of youth, friendship, and the journey through grades 10, 11, and 12.

The website presents class memories as a railway journey, with each school year representing a different station on the train. Through stunning animations, interactive elements, and a comprehensive teacher gallery, visitors can relive the most vibrant moments of the class's high school years.

### 📍 School Information
- **School:** THPT Chuyên Hùng Vương
- **Address:** 593 Đại lộ Bình Dương, Hiệp Thành, TP. Thủ Dầu Một, Bình Dương
- **Academic Period:** 2023-2026
- **Class:** 12A2

---

## ✨ Key Features

### 🎬 **Cinematic Introduction**
- Stunning intro video with vintage camcorder aesthetic
- Animated year counter (2026 → 2023)
- Smooth white flash transition into main content
- Automatic autoplay with user interaction fallback

### 🚂 **Railway Journey Navigation**
- **Sticky Navigation:** Smart navbar that shows/hides based on scroll direction
- **Map Modal:** Interactive station guide showing journey checkpoints
- **Four Main Stations:**
  - 🚩 Starting Station: Youth Awakening
  - 📍 Grade 10 Station: Confusion & Wonder
  - 📍 Grade 11 Station: Growth & Maturity
  - 📍 Grade 12 Station: Final Summer
  - 🏁 Final Station: Radiant Journey

### ⏱️ **Countdown Timer**
- Dynamic counter showing days/hours/minutes/seconds since graduation (June 11, 2026)
- Animated card flipping effects
- 3D magnetic hover interactions on time blocks
- Responsive card scaling on mouse movement

### 🎨 **Horizontal Scroll Gallery**
- Three-hall exhibit showcasing each grade level
- Smooth scrolling animations synchronized with page scroll
- Progress indicator dots for navigation
- Doodle animations for visual appeal
- Paper plane decorations for grade 12

### 👨‍🏫 **Interactive Teacher Gallery**
- **33+ Teachers** from all grades
- Naturally scattered card layout (polaroid-style with tape effects)
- Hover animations and transition effects
- Detailed individual teacher profile pages
- Teacher information includes:
  - Full name & subjects taught
  - Memorable quotes
  - Voice recordings (selected teachers)
  - Gallery photos with captions
  - Personal stories and memories

### 📝 **Guestbook (Firebase Integration)**
- Real-time message collection using Firebase Firestore
- Pinned notes on virtual board
- Colorful note paper designs
- Timestamp tracking for all messages
- Persistent storage across sessions

### 🎵 **Dynamic Audio System**
- **Smart Playlist:** Random background music (6+ OST tracks)
- Prevents consecutive song repeats
- Sound effects:
  - Click sounds for buttons
  - Photo shutter for teacher cards
  - Train whistle for major navigation
  - Close/transition sounds
- Autoplay with fallback for browser restrictions

### 🎭 **Page Transition Effects**
- Cinematic loader with steam cloud animations
- Ticket stub transition visualization
- Smooth exit animations between pages
- SessionStorage-based transition state management

### 🛡️ **Developer Protection**
- Right-click context menu disabled
- F12 developer tools blocked
- Inspect element shortcuts disabled
- View source prevention
- Console access restrictions

---

## 🛠️ Technical Stack

### Frontend Technologies
- **HTML5** - Semantic markup with Vietnamese language support
- **CSS3** - Advanced animations, transformations, and flexbox layouts
- **JavaScript (Vanilla)** - Event handling, DOM manipulation, timing logic
- **GSAP (GreenSock Animation Platform)** v3.12.5 - Professional animations
  - ScrollTrigger plugin for scroll-based animations
  - ScrollToPlugin for smooth scrolling
  - Timeline management
- **Lenis** v1.0.42 - Smooth scroll library
- **FontAwesome 6.5.0** - Icon library for UI elements

### Backend & Database
- **Firebase** - Real-time database and hosting
  - Firestore for guestbook messages
  - Server-side timestamps
  - Real-time data sync (onSnapshot)

### Fonts & Design
- Google Fonts:
  - **Dancing Script** (600, 700) - Decorative titles
  - **Nunito** (400, 600, 700, 800) - Primary font
  - **Patrick Hand** - Handwritten aesthetic

---

## 📁 Project Structure

```
/teachers
├── index.html                    # Main landing page
├── teacher-detail.html           # Individual teacher profile page
├── script.js                      # Main page logic (920+ lines)
├── teacher-detail.js             # Teacher detail page logic
├── script2.js                     # Additional utilities
├── style.css                      # Main styling (40KB+)
├── styles.css                     # Additional styles
├── teacher-detail.css             # Teacher profile styling (37KB+)
├── teacher-detail-style.css       # Detail page secondary styles
├── style-mobile.css               # Responsive mobile styles
├── README.md                      # This file
├── teachers.json                  # Teacher database (JSON)
├── test.html                      # Testing page
├── .gitattributes                 # Git configuration
├── assets/
│   ├── intro/
│   │   └── intro-memories.mp4    # Opening video
│   ├── logo.png & logo2.png      # Branding assets
│   ├── index/
│   │   └── main.jpg              # Hero section image
│   ├── ost.mp3 - ost6.mp3        # Background music tracks
│   ├── click.mp3, photo.mp3      # Sound effects
│   ├── train.mp3                 # Train sound effect
│   └── teachers/
│       ├── [grade]_[name]/
│       │   ├── avatar.jpg         # Profile photo
│       │   ├── anh_hero.[jpg/png] # Cover image
│       │   ├── voice.mp3          # Voice recording
│       │   ├── fig1-5.[jpg/mp4]   # Featured images
│       │   └── wipe_[1-11].[jpg]  # Gallery photos
│       └── [multi-grade_names]/   # Teachers across multiple grades
└── .github/
    └── workflows/                 # CI/CD configurations
```

---

## 🎯 Main Components & Features

### 1. **Cinematic Intro (`#cinematic-intro`)**
```javascript
// Auto-plays 5.5s intro video
// Year counter animates from 2026 to 2023
// Memory title flies in with text animation
// Skip button available via button click or Enter key
```

### 2. **Navigation System (`fixed-nav`)**
```javascript
// Smart show/hide based on scroll direction
// Sticky positioning with smooth transitions
// Links to:
  - Home (exteriorURL)
  - Class Members
  - Grade 10/11/12 Retrospectives
  - Interactive Map
```

### 3. **Interactive Map Modal (`#mapModal`)**
```javascript
// Station-based navigation
// Jump to specific sections via data attributes
// Calculate scroll positions for horizontal lane
// Smooth GSAP animations to target sections
```

### 4. **Countdown Section (`#countdown`)**
```javascript
// Real-time timer since graduation: June 11, 2026 07:00
// Flip card animations on value changes
// Entrance animations on scroll trigger
// Quote and ticket card with rotation effects
```

### 5. **Horizontal Scroll Lane (`#lane`)**
```javascript
// Three exhibit halls (Grades 10, 11, 12)
// Synchronized horizontal scroll with vertical scroll
// Teacher scatter cards with natural layout
// Progress indicator navigation
```

### 6. **Teacher Gallery System**
Each teacher has:
- **Scattered Pin Layout** - Polaroid-style cards with random rotation/positioning
- **Hover Preview** - Smooth animations on mouse over
- **Detail Page** - Full biography, gallery, audio, quotes
- **Data Source** - teachers.json (74KB+ with 30+ teachers)

### 7. **Guestbook Section (`#outro`)**
```javascript
// Firebase Firestore integration
// Real-time message updates
// Color-coded note paper backgrounds
// Timestamp formatting (HH:MM DD/MM/YY)
```

### 8. **Audio Management**
```javascript
// Smart playlist system (prevents repeat songs)
// Sound effect triggers on specific interactions
// Volume management (0.3 for background music)
// Browser autoplay handling
```

---

## 📊 Teacher Database

The `teachers.json` file contains comprehensive data for 30+ teachers organized by:

### Data Structure
```json
{
  "teacher-id": {
    "name": "Cô Lam",
    "fullName": "Đinh Thị Phương Lam",
    "subject": "Tiếng Pháp & Chủ nhiệm",
    "grade": [10],
    "avatar": "path/to/avatar.jpg",
    "role": "Chủ nhiệm & Giáo viên tiếng Pháp",
    "quote": "Memorable quote",
    "cover": "path/to/cover.png",
    "audio": "path/to/voice.mp3",
    "bigQuote": "Longer tribute quote",
    "bullets": ["Characteristic 1", "Characteristic 2"],
    "storyA": ["Narrative paragraph 1"],
    "storyB": ["Narrative paragraph 2"],
    "gallery": [
      {
        "src": "path/to/image.jpg",
        "cap": "Photo title",
        "desc": "Photo description"
      }
    ]
  }
}
```

### Teacher Categories
- **Administration & Homeroom Teachers** - 班主任 (3 teachers)
- **Mathematics Department** - 数学科 (4 teachers)
- **Literature & Vietnamese** - 文学科 (3 teachers)
- **English Department** - 英語科 (5 teachers)
- **Physics & Chemistry** - 理科 (5 teachers)
- **Geography & History** - 社会科 (5 teachers)
- **Technology & IT** - 技術科 (4 teachers)
- **Physical Education & Defense** - 体育・国防科 (4 teachers)
- **Economics & Law** - 経済法科 (3 teachers)

---

## 🎨 Animation Features

### GSAP Animations
- **Timeline sequencing** for intro
- **ScrollTrigger integration** for scroll-based reveals
- **3D transforms** (rotateX, rotateY) for interactive elements
- **Stagger effects** for sequential animations
- **Magnetic hover effects** on countdown blocks

### CSS Animations
- **Petal falling** animations in outro section
- **Gradient background** variations by section
- **Card scatter** with natural positioning using CSS variables
- **Tape decoration** rotation effects

### Scroll Animations
- **Parallax effect** on hero image
- **Horizontal scroll sync** with vertical scroll
- **Progressive reveal** of countdown elements
- **Sticky header** transitions

---

## 🔧 Configuration & Customization

### Firebase Setup
The project uses Firebase Firestore for the guestbook. Configuration can be found in `script.js`:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyCzOoObrdCHZ_EhId-eYYrcPiQmP0dB6xc",
    authDomain: "a2k28-memories.firebaseapp.com",
    projectId: "a2k28-memories",
    storageBucket: "a2k28-memories.firebasestorage.app",
    messagingSenderId: "537440353527",
    appId: "1:537440353527:web:77f8e8936a01d2d75727f2",
    measurementId: "G-X92M9L8QVK"
};
```

### Customize Countdown Date
Edit the `initCountdown()` function in `script.js`:
```javascript
const startDate = new Date("2026-06-11T07:00:00+07:00"); // Change this date
```

### Modify Background Music
Add/remove songs from the playlist array in `script.js`:
```javascript
const playlist = [
    "assets/ost.mp3",
    "assets/ost2.mp3",
    // Add more tracks here
];
```

---

## 📱 Responsive Design

The website is optimized for:
- **Desktop** (1920px+) - Full animations and interactions
- **Tablet** (768px - 1024px) - Scaled layouts
- **Mobile** (< 768px) - Touch-optimized with simplified animations

**Note:** The horizontal scroll lane is best experienced on desktop/tablet.

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Firebase, external fonts, CDN resources)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pgtomvn/teachers.git
   cd teachers
   ```

2. **Open locally:**
   ```bash
   # Option 1: Use Live Server (VS Code Extension)
   # Right-click index.html → Open with Live Server
   
   # Option 2: Use Python's built-in server
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

3. **Or access online:**
   - Visit: [GitHub Pages URL if deployed]
   - Or your custom hosting URL

### No build process required! 
This is a vanilla HTML/CSS/JavaScript project with no build tools or dependencies to install.

---

## 📚 How to Use

### For Visitors
1. **Skip or Watch Intro** - Click "Vào lớp ngay" or press Enter to skip the cinematic intro
2. **Explore the Timeline** - Scroll through the countdown and gallery sections
3. **View Teacher Profiles** - Click on any teacher card to see detailed information
4. **Leave a Message** - Scroll to the bottom and add your message to the guestbook
5. **Navigate Stations** - Use the map icon to jump to specific sections

### For Developers
1. **Modify Teachers** - Edit `teachers.json` with teacher information
2. **Add New Teachers** - Follow the JSON structure and add new entries
3. **Customize Styles** - Edit CSS files for visual changes
4. **Update Content** - Modify HTML sections for text/structure changes
5. **Add Assets** - Place images/videos in appropriate `assets/` subdirectories

---

## 🎬 Media Assets

### Required Directories
```
assets/
├── intro/intro-memories.mp4      # Opening video (~5.5s recommended)
├── ost[1-6].mp3                  # Background music tracks
├── click.mp3, photo.mp3, train.mp3 # Sound effects
├── logo.png, logo2.png           # Branding (recommended: 200x200px)
├── index/main.jpg                # Hero image (recommended: 1920x1080px)
└── teachers/[teacher-id]/        # Per-teacher assets
    ├── avatar.jpg                # Profile photo (200x200px)
    ├── anh_hero.jpg              # Cover image (1200x600px)
    ├── voice.mp3                 # Voice recording (optional)
    ├── fig[1-5].[jpg/mp4]        # Featured images
    └── wipe_[1-11].jpg           # Gallery photos
```

### Image Recommendations
- **Avatar:** 200×200px, square, JPG
- **Hero/Cover:** 1200×600px, JPG/PNG
- **Gallery:** 800×600px or wider, JPG
- **Logo:** 200×200px, PNG with transparency

---

## 🔐 Security & Privacy

### Features
- **Developer Tool Protection** - Prevents F12, Inspect, View Source
- **Right-Click Disabled** - Context menu blocked
- **Content Protection** - No unauthorized downloads/screenshots encouraged

### Firebase Security
- Guestbook accepts public read/write (moderated via Firestore rules)
- No sensitive personal data stored beyond messages

---

## 🤝 Contributing

### To Add/Update Information
1. Fork the repository
2. Make changes to relevant files (teachers.json, HTML, CSS)
3. Test locally
4. Submit a pull request with a clear description

### To Report Issues
- Create a GitHub Issue with:
  - Description of the problem
  - Browser & OS information
  - Screenshots if applicable

---

## 📄 License

This project is licensed under the MIT License - see details below.

**MIT License Summary:**
- ✅ Free to use, modify, and distribute
- ✅ Can be used for commercial purposes
- ⚠️ Must include license notice
- ⚠️ Comes without warranty

[Full MIT License Text](https://opensource.org/licenses/MIT)

---

## 👥 Team & Credits

### Development Team
- Phạm Đức Anh
- Nguyễn Ngọc Như Hiếu
- Thái Trần Bảo Châu
- Lê Nhã Thi
- Phạm Bảo Linh
- Hà Thị Ánh Dương

### Special Thanks
- **All Teachers** of THPT Chuyên Hùng Vương - for shaping Class 12A2
- **Class 12A2** - for the memories and laughter
- **Parents & Families** - for the support throughout the journey

---

## 📞 Contact & Support

### School Information
- **Name:** THPT Chuyên Hùng Vương
- **Address:** 593 Đại lộ Bình Dương, Hiệp Thành, TP. Thủ Dầu Một, Bình Dương, Vietnam
- **Facebook:** [Ối zồi ôi con tôi học A2](https://www.facebook.com/profile.php?id=61550802202398)

### Project Repository
- **GitHub:** [pgtomvn/teachers](https://github.com/pgtomvn/teachers)
- **Issues:** Report bugs via GitHub Issues
- **Discussions:** Share feedback and suggestions

---

## 🌟 Quotes & Inspiration

> "Thanh xuân không có giá như, chỉ có những điều đã qua là đẹp nhất."  
> *"Youth has no price, only what has passed is most beautiful."*

> "Ngày tháng ấy... chúng ta rực rỡ nhất."  
> *"Those days... we shined brightest."*

---

## 📖 Version History

### v1.0 - June 2026
- Initial launch of Ga Tàu Ký Ức website
- 30+ teacher profiles
- Guestbook integration
- Full animation suite
- Mobile responsiveness

---

**Last Updated:** July 31, 2026  
**Repository:** github.com/pgtomvn/teachers  
**Status:** Active & Maintained

---

*"Hành trình rực rỡ của 12A2 sẽ mãi còn trong tim tất cả chúng ta."*  
*"The radiant journey of 12A2 will forever remain in our hearts."*
