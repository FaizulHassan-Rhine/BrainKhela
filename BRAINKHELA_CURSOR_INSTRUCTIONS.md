# BrainKhela.com — Cursor AI Full Project Instructions

> এই file টা Cursor AI-কে দিন। Cursor এই instructions follow করে পুরো project বানাবে।

---

## Project Overview

**Website Name:** BrainKhela.com  
**Tech Stack:** Next.js 14 (App Router) + Tailwind CSS + JavaScript + Lucide React Icons  
**Hosting:** Vercel  
**Goal:** Bengali educational gaming website with Google AdSense monetization  
**Target Audience:** SSC/HSC students + general Bangladeshi users  
**Language:** Bangla (বাংলা) UI with English fallback  

---

## Tech Stack Details

```
Framework:     Next.js 14 (App Router)
Styling:       Tailwind CSS v3
Icons:         lucide-react
Font:          Hind Siliguri (Google Fonts) — Bangla support
Language:      JavaScript (no TypeScript)
Deploy:        Vercel (static + serverless)
Analytics:     Google Analytics 4
Monetization:  Google AdSense
```

---

## Folder Structure

```
brainkhela/
├── app/
│   ├── layout.js                  # Root layout — fonts, metadata, AdSense script
│   ├── page.js                    # Homepage
│   ├── globals.css                # Tailwind base styles
│   │
│   ├── typing/
│   │   ├── bangla/
│   │   │   └── page.js            # Bangla typing test
│   │   └── english/
│   │       └── page.js            # English typing speed test
│   │
│   ├── quiz/
│   │   ├── page.js                # Quiz hub (all categories)
│   │   ├── gk/
│   │   │   └── page.js            # General knowledge quiz (Bangla)
│   │   ├── ssc/
│   │   │   └── page.js            # SSC MCQ practice
│   │   └── hsc-accounting/
│   │       └── page.js            # HSC Accounting MCQ
│   │
│   ├── math/
│   │   └── page.js                # Math practice game
│   │
│   ├── iq-test/
│   │   └── page.js                # IQ test (Bangla)
│   │
│   ├── brain-game/
│   │   └── page.js                # Brain games hub
│   │
│   ├── mini-games/
│   │   └── page.js                # Short mini games
│   │
│   ├── about/
│   │   └── page.js                # About page
│   ├── contact/
│   │   └── page.js                # Contact page
│   └── privacy-policy/
│       └── page.js                # Privacy Policy (AdSense requirement)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.js              # Top navigation
│   │   └── Footer.js              # Footer with links
│   │
│   ├── ui/
│   │   ├── AdBanner.js            # Google AdSense banner component
│   │   ├── ScoreCard.js           # Score display component
│   │   ├── Timer.js               # Countdown timer component
│   │   ├── ProgressBar.js         # Quiz progress bar
│   │   └── ResultModal.js         # Result popup modal
│   │
│   ├── games/
│   │   ├── TypingTest.js          # Reusable typing test component
│   │   ├── QuizEngine.js          # Reusable quiz engine component
│   │   ├── MathGame.js            # Math practice game component
│   │   └── IQTest.js              # IQ test component
│   │
│   └── home/
│       ├── HeroSection.js         # Homepage hero
│       ├── FeatureGrid.js         # Feature cards grid
│       └── StatsBar.js            # Site statistics bar
│
├── data/
│   ├── bangla-typing-texts.js     # Bangla paragraphs for typing test
│   ├── english-typing-texts.js    # English paragraphs for typing test
│   ├── gk-questions.js            # General knowledge questions (বাংলা)
│   ├── ssc-questions.js           # SSC MCQ questions by subject
│   ├── hsc-accounting-questions.js # HSC Accounting MCQ questions
│   ├── math-problems.js           # Math problems by difficulty
│   ├── iq-questions.js            # IQ test questions
│   └── brain-games.js             # Brain game data
│
├── lib/
│   ├── utils.js                   # Helper functions (score calc, timer, etc.)
│   └── constants.js               # Site-wide constants
│
├── public/
│   ├── favicon.ico
│   ├── og-image.png               # Open Graph image (1200x630)
│   └── robots.txt
│
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## Page-by-Page Instructions

### 1. Root Layout (`app/layout.js`)

```
- Import Hind Siliguri font from Google Fonts (weights: 400, 500, 600, 700)
- Add metadata: title="BrainKhela - বাংলা কুইজ, টাইপিং টেস্ট ও ব্রেইন গেম", description in Bangla
- Add Open Graph tags for social sharing
- Include Google Analytics 4 script (use next/script with afterInteractive strategy)
- Include Google AdSense script (use next/script with afterInteractive strategy)
- Wrap children with <Navbar /> and <Footer />
- Add Bengali font class to <html> tag
```

### 2. Homepage (`app/page.js`)

```
Sections (top to bottom):
1. HeroSection — big headline "মাথা খাটাও, মজা করো!" + subtext + 2 CTA buttons
2. AdBanner — leaderboard ad (728x90) — centered
3. FeatureGrid — 9 feature cards in 3x3 grid:
   - বাংলা টাইপিং টেস্ট (Keyboard icon)
   - ইংরেজি টাইপিং টেস্ট (Type icon)
   - সাধারণ জ্ঞান কুইজ (BookOpen icon)
   - SSC MCQ প্র্যাকটিস (GraduationCap icon)
   - HSC অ্যাকাউন্টিং MCQ (Calculator icon)
   - গণিত প্র্যাকটিস গেম (Hash icon)
   - IQ টেস্ট বাংলা (Brain icon)
   - ব্রেইন গেম (Zap icon)
   - মিনি গেম (Gamepad2 icon)
4. StatsBar — "১০,০০০+ প্রশ্ন | ৫০,০০০+ ব্যবহারকারী | ৯টি ক্যাটাগরি"
5. AdBanner — rectangle ad (300x250)
```

### 3. Bangla Typing Test (`app/typing/bangla/page.js`)

```
Features:
- Random Bangla paragraph from data/bangla-typing-texts.js
- Live WPM (words per minute) counter
- Live accuracy % counter
- 60-second countdown timer (also options: 30s, 120s)
- Color coding: correct letters = green, wrong letters = red, current = blue highlight
- Results screen: WPM, Accuracy, Time, Correct words, Wrong words
- "আবার চেষ্টা করো" (retry) button
- Share score button
- AdBanner between timer and text area
- AdBanner below result

Layout:
- Top: Timer selector (30s | 60s | 120s)
- Middle: Bangla text display area (large font, line height 2)
- Below text: Textarea for user input
- Right sidebar: Live stats (WPM, Accuracy)
- AdSense: 1 banner above, 1 below result
```

### 4. English Typing Test (`app/typing/english/page.js`)

```
Same as Bangla typing test but:
- English paragraphs from data/english-typing-texts.js  
- WPM calculation same
- Show CPM (characters per minute) additionally
- Difficulty selector: Easy | Medium | Hard
```

### 5. Quiz Hub (`app/quiz/page.js`)

```
- Category cards: GK | SSC | HSC Accounting
- Each card shows: icon, title, question count, difficulty badge
- AdBanner at top and bottom
```

### 6. Quiz Engine — All Quiz Pages

```
All quiz pages use <QuizEngine /> component with these props:
- questions: array from data files
- title: quiz title in Bangla
- timePerQuestion: 30 seconds default

QuizEngine features:
- Show question number (প্রশ্ন ৩/২০)
- Progress bar (fills as questions answered)
- Question text (large, Bangla font)
- 4 MCQ options as clickable cards
- After selection: show correct/wrong with color (green/red)
- Timer per question (countdown)
- Skip button
- Score tracker (live: ৫ সঠিক / ১০ প্রশ্ন)
- End screen: total score, percentage, grade (A+/A/B/C/F), retry button
- AdBanner: between question 5 and 6 (mid-quiz)
- AdBanner: on result page

GK Quiz (`app/quiz/gk/page.js`):
- 20 questions per session (random from pool)
- Categories: বাংলাদেশ, বিজ্ঞান, ইতিহাস, ভূগোল, খেলাধুলা

SSC MCQ (`app/quiz/ssc/page.js`):
- Subject selector: বাংলা | ইংরেজি | গণিত | বিজ্ঞান | সাধারণ জ্ঞান
- 25 questions per session
- Show chapter/topic tag on each question

HSC Accounting (`app/quiz/hsc-accounting/page.js`):
- Chapter selector: হিসাববিজ্ঞান পরিচিতি | লেনদেন | জাবেদা | খতিয়ান | etc.
- 20 questions per session
- Formula hints toggle button
```

### 7. Math Game (`app/math/page.js`)

```
Features:
- Difficulty: সহজ (Easy) | মাঝারি (Medium) | কঠিন (Hard)
- Operations: যোগ (+) | বিয়োগ (-) | গুণ (×) | ভাগ (÷)
- 10 problems per round
- Timer: 60 seconds total
- Big number display in Bangla
- Number pad UI (touch friendly)
- Score: correct answers × difficulty multiplier
- Streak counter (consecutive correct)
- AdBanner below game area
```

### 8. IQ Test (`app/iq-test/page.js`)

```
Features:
- 15 questions total
- Question types: pattern recognition, logical sequence, number series
- No time limit (relaxed mode)
- Progress: "প্রশ্ন ৫/১৫"
- End result: IQ score range (e.g., "আপনার IQ স্কোর: ১১০-১২০")
- Result categories:
  - 130+: "অত্যন্ত মেধাবী"
  - 110-129: "উপরের গড়"
  - 90-109: "গড় বুদ্ধিমত্তা"
  - Below 90: "আরও চেষ্টা করো"
- Share result button
- AdBanner: after question 7, on result page
```

### 9. Brain Game (`app/brain-game/page.js`)

```
Mini brain games hub with 3 games:
1. মেমোরি কার্ড — card flip matching game (6 pairs)
2. সংখ্যা মনে রাখো — number memory (show 4-digit number for 3s, then recall)
3. রঙ চেনো — show color name in different color ink (Stroop effect)

Each game:
- 3 difficulty levels
- High score saved to localStorage
- Play again button
- AdBanner below each game
```

### 10. Mini Games (`app/mini-games/page.js`)

```
3 quick games:
1. দ্রুত ক্লিক — click the target as many times as possible in 10 seconds
2. শব্দ খোঁজো — find the hidden Bangla word in a grid
3. ধাঁধা — simple Bangla riddles with reveal button

AdBanner between games
```

### 11. Static Pages

```
About (`app/about/page.js`):
- Site description in Bangla
- Mission: "বাংলাদেশের শিক্ষার্থীদের জন্য বিনামূল্যে শিক্ষামূলক গেম"
- Contact email

Contact (`app/contact/page.js`):
- Simple contact form (name, email, message)
- Submit shows success message (no backend needed — use mailto: link)

Privacy Policy (`app/privacy-policy/page.js`):
- REQUIRED for AdSense approval
- Include: data collection policy, cookies, AdSense disclosure, Google Analytics disclosure
- Write in both Bangla and English
```

---

## Components Details

### AdBanner (`components/ui/AdBanner.js`)

```javascript
// Props: size ("leaderboard" | "rectangle" | "responsive")
// leaderboard = 728x90 (desktop top/bottom)
// rectangle = 300x250 (sidebar/mid-content)
// responsive = auto-size

// During development: show placeholder div with gray background
// Production: render <ins class="adsbygoogle"> tag
// Use useEffect to push ads after component mount
```

### Navbar (`components/layout/Navbar.js`)

```
- Logo: "🧠 BrainKhela" (text logo, bold)
- Desktop nav links: হোম | টাইপিং | কুইজ | গণিত | IQ টেস্ট | ব্রেইন গেম
- Mobile: hamburger menu (Menu icon from lucide-react)
- Sticky top, white background, subtle border-bottom
- Active link highlight
```

### Footer (`components/layout/Footer.js`)

```
- Logo + tagline: "মাথা খাটাও, মজা করো"
- Links: About | Contact | Privacy Policy
- Copyright: © ২০২৪ BrainKhela.com
- Social links (optional): Facebook, YouTube
```

---

## Data Files Format

### `data/bangla-typing-texts.js`
```javascript
export const banglaTexts = [
  {
    id: 1,
    difficulty: "easy",
    text: "বাংলাদেশ একটি সুন্দর দেশ। এখানে অনেক নদী আছে। পদ্মা, মেঘনা, যমুনা এখানকার প্রধান নদী।"
  },
  // minimum 20 texts
]
```

### `data/gk-questions.js`
```javascript
export const gkQuestions = [
  {
    id: 1,
    category: "বাংলাদেশ",
    question: "বাংলাদেশের রাজধানীর নাম কী?",
    options: ["চট্টগ্রাম", "ঢাকা", "রাজশাহী", "খুলনা"],
    correct: 1, // index of correct answer
    explanation: "ঢাকা বাংলাদেশের রাজধানী এবং বৃহত্তম শহর।"
  },
  // minimum 50 questions
]
```

### `data/ssc-questions.js`
```javascript
export const sscQuestions = {
  bangla: [ /* 30+ questions */ ],
  english: [ /* 30+ questions */ ],
  math: [ /* 30+ questions */ ],
  science: [ /* 30+ questions */ ],
  gk: [ /* 30+ questions */ ],
}
```

---

## Styling Guidelines (Tailwind CSS)

```
Primary color:   purple (#7C3AED) — brain/intelligence theme
Secondary color: indigo (#4F46E5)
Accent:          amber (#F59E0B) — for highlights/scores
Success:         green (#10B981)
Error:           red (#EF4444)
Background:      gray-50 (#F9FAFB)
Card bg:         white with shadow-sm

Font sizes:
- Bangla text in typing test: text-2xl, line-height: 2
- Quiz questions: text-xl font-semibold
- Body text: text-base
- Labels/captions: text-sm text-gray-500

Border radius: rounded-xl for cards, rounded-lg for buttons
```

---

## SEO Instructions

### `app/layout.js` — Root Metadata
```javascript
export const metadata = {
  title: {
    default: "BrainKhela - বাংলা কুইজ, টাইপিং টেস্ট ও ব্রেইন গেম",
    template: "%s | BrainKhela"
  },
  description: "বাংলাদেশের সেরা শিক্ষামূলক গেমিং সাইট। SSC MCQ, HSC কুইজ, বাংলা টাইপিং টেস্ট, IQ টেস্ট এবং ব্রেইন গেম সম্পূর্ণ বিনামূল্যে।",
  keywords: ["বাংলা কুইজ", "SSC MCQ", "HSC quiz", "bangla typing test", "IQ test bangla", "brain game bangla"],
  openGraph: {
    title: "BrainKhela - মাথা খাটাও, মজা করো!",
    description: "বাংলাদেশের সেরা ফ্রি এডুকেশনাল গেমিং সাইট",
    url: "https://brainkhela.com",
    siteName: "BrainKhela",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "bn_BD",
    type: "website"
  }
}
```

### Each page should have:
```javascript
export const metadata = {
  title: "বাংলা টাইপিং টেস্ট",
  description: "বাংলা টাইপিং স্পিড টেস্ট করুন। WPM এবং accuracy দেখুন।"
}
```

### `public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://brainkhela.com/sitemap.xml
```

---

## Google AdSense Setup

### Step 1 — Add AdSense script in `app/layout.js`
```javascript
import Script from 'next/script'

// Inside <head> or before </body>:
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

### Step 2 — AdBanner component
```javascript
'use client'
import { useEffect } from 'react'

export default function AdBanner({ size = "responsive" }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {}
  }, [])

  return (
    <div className="flex justify-center my-4">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
```

### Ad Placement Strategy (maximize revenue):
```
Homepage:        1 leaderboard (top) + 1 rectangle (mid)
Typing test:     1 banner (above textarea) + 1 rectangle (result page)
Quiz pages:      1 banner (top) + 1 mid-quiz (after Q5) + 1 result page
Math game:       1 banner (below game)
IQ test:         1 mid-test + 1 result page
Brain games:     1 per game section
```

---

## Vercel Deployment

### `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### Deployment Steps (tell Cursor to add README):
```
1. Push to GitHub
2. Connect repo to Vercel
3. Vercel auto-detects Next.js
4. Add environment variables if needed
5. Deploy — brainkhela.com এ custom domain add করুন
```

---

## package.json Dependencies

```json
{
  "dependencies": {
    "next": "14.2.0",
    "react": "^18",
    "react-dom": "^18",
    "lucide-react": "^0.383.0"
  },
  "devDependencies": {
    "tailwindcss": "^3",
    "autoprefixer": "^10",
    "postcss": "^8"
  }
}
```

---

## Priority Build Order (Cursor কে এই order-এ বলুন)

```
Step 1:  Project setup (next.js init + tailwind config + folder structure)
Step 2:  Root layout + Navbar + Footer
Step 3:  Homepage (HeroSection + FeatureGrid)
Step 4:  Bangla Typing Test (সবচেয়ে important feature)
Step 5:  English Typing Test
Step 6:  GK Quiz
Step 7:  SSC MCQ Quiz
Step 8:  HSC Accounting Quiz
Step 9:  Math Practice Game
Step 10: IQ Test
Step 11: Brain Game + Mini Games
Step 12: About + Contact + Privacy Policy pages
Step 13: AdBanner component integration (সব page-এ)
Step 14: SEO metadata (সব page-এ)
Step 15: Final review + Vercel deploy
```

---

## Important Notes for Cursor

1. **'use client'** — সব interactive component-এ (typing test, quiz, games) লাগবে
2. **localStorage** — high scores, user preferences save করতে ব্যবহার করুন
3. **No backend needed** — সব data static JS files থেকে
4. **Bangla font** — Hind Siliguri Google Font অবশ্যই add করুন
5. **Mobile first** — সব component responsive হতে হবে
6. **AdSense placeholder** — development-এ gray box দেখান, production-এ real ads
7. **Data files** — প্রতিটি quiz-এ minimum 50+ questions রাখুন
8. **Performance** — lazy load quiz questions, use React.memo where needed

---

## Cursor Prompt Template

Cursor-এ এই instruction file দেওয়ার পর এভাবে prompt করুন:

```
"Read the BRAINKHELA_CURSOR_INSTRUCTIONS.md file and build the complete 
BrainKhela.com project following all instructions. Start with Step 1 
(project setup) and proceed through all 15 steps. Use Next.js 14 App Router, 
Tailwind CSS, JavaScript, and lucide-react icons as specified."
```

---

*Last updated: BrainKhela.com Project Plan v1.0*
