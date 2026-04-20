# Al Qaysar Menu System - Visual Diagram

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         VERCEL HOSTING                          │
│                     (your-domain.vercel.app)                    │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
         ┌──────────▼──────────┐   ┌─────────▼──────────┐
         │   menu.html         │   │   staff.html       │
         │  (Customer Menu)    │   │  (Staff Editor)    │
         │                     │   │   Web Version      │
         └──────────┬──────────┘   └────────────────────┘
                    │
                    │
         ┌──────────▼──────────┐
         │   QR CODE           │
         │   Customers Scan    │
         └──────────┬──────────┘
                    │
                    │
         ┌──────────▼──────────────────────────────────┐
         │                                              │
         │         FIREBASE REALTIME DATABASE           │
         │                                              │
         │  menu/                                       │
         │  ├── available/                              │
         │  │   ├── dish_id_1: true                    │
         │  │   └── dish_id_2: true                    │
         │  ├── dishes/                                 │
         │  │   ├── dish_id_1: {en, ar, price, section}│
         │  │   └── dish_id_2: {en, ar, price, section}│
         │  └── updatedAt: "2026-04-20T10:30:00Z"      │
         │                                              │
         └──────────▲──────────────────────────────────┘
                    │
                    │
         ┌──────────┴──────────┐
         │                     │
         │   ANDROID APP       │
         │   (Staff Tablet)    │
         │                     │
         │   www/index.html    │
         │   (Copy of          │
         │    staff.html)      │
         │                     │
         └─────────────────────┘
```

---

## 🔄 Data Flow

### 1️⃣ Staff Updates Menu (Morning)

```
┌─────────────┐
│ Staff opens │
│ Android App │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Enter PIN   │
│   (1234)    │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Toggle dishes   │
│ ✓ Appetizers    │
│ ✓ Grills        │
│ ✗ Sea Food      │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Click "Update   │
│  guest menu"    │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│   FIREBASE      │
│   Saves data    │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Customer menu   │
│ updates LIVE    │
└─────────────────┘
```

### 2️⃣ Customer Views Menu

```
┌─────────────┐
│ Customer    │
│ scans QR    │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Opens Vercel    │
│ website         │
│ (menu.html)     │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Loads from      │
│ FIREBASE        │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Shows only      │
│ available       │
│ dishes          │
└─────────────────┘
```

---

## 📱 Android App Build Process

```
┌─────────────────┐
│  staff.html     │  ← Original web file
│  (Edit here)    │
└────────┬────────┘
         │
         │ Copy to www/
         ▼
┌─────────────────┐
│ www/index.html  │  ← Android app source
└────────┬────────┘
         │
         │ npm run sync
         ▼
┌─────────────────┐
│ android/        │  ← Capacitor wraps it
│ (Native code)   │
└────────┬────────┘
         │
         │ Build APK
         ▼
┌─────────────────┐
│ app-debug.apk   │  ← Install on tablet
└─────────────────┘
```

---

## 🗂️ File Relationships

```
PROJECT ROOT
│
├── menu.html ──────────────────┐
│   (Customer menu)             │
│                               │
├── staff.html ─────────┐       │
│   (Staff editor web)  │       │
│                       │       │
│                       │       │
│                    COPIED     │
│                       │       │
│                       ▼       │
├── www/                        │
│   ├── index.html ◄────┘       │
│   │   (Android app)           │
│   │                           │
│   ├── manifest.json           │
│   │   (PWA config)            │
│   │                           │
│   └── service-worker.js       │
│       (Offline cache)         │
│                               │
├── android/ ◄──────────────────┤
│   (Capacitor wrapper)         │
│                               │
│                               │
│         ALL CONNECT TO        │
│               ▼               │
│         ┌─────────────┐       │
│         │  FIREBASE   │◄──────┘
│         │  DATABASE   │
│         └─────────────┘
│
├── vercel.json
│   (Deployment routes)
│
└── capacitor.config.json
    (App settings)
```

---

## 🎯 User Journeys

### 👨‍🍳 Staff Journey

```
Morning:
1. Open Android app on tablet
2. Enter PIN: 1234
3. See full menu (300+ dishes)
4. Toggle ON today's available dishes
5. Click "Update guest menu"
6. Done! ✓

Throughout day:
- Can update anytime
- Changes appear instantly
- No need to restart anything
```

### 👥 Customer Journey

```
At restaurant:
1. See QR code on table
2. Scan with phone camera
3. Opens menu.html on Vercel
4. Browse available dishes
5. See prices in Saudi Riyals
6. Order from staff

Real-time:
- Menu updates automatically
- No refresh needed
- Always shows current dishes
```

---

## 🔥 Firebase Structure Explained

```json
{
  "menu": {
    
    // Which dishes are available today
    "available": {
      "veg_salad": true,
      "chicken_kebab_p": true,
      "fried_rice": true
      // Only IDs of selected dishes
    },
    
    // Full details of available dishes
    "dishes": {
      "veg_salad": {
        "en": "Vegetable Salad",
        "ar": "سلطة خضار",
        "price": "6.00",
        "section": "Appetizers"
      },
      "chicken_kebab_p": {
        "en": "Chicken Kebab (Person)",
        "ar": "نفر كباب دجاج",
        "price": "24.00",
        "section": "Grills"
      }
      // Full data for each available dish
    },
    
    // When last updated
    "updatedAt": "2026-04-20T10:30:00.000Z"
  }
}
```

---

## 🌐 Vercel Routes

```
your-domain.vercel.app/
│
├── /              → menu.html (Customer menu)
├── /menu          → menu.html (Customer menu)
└── /staff         → staff.html (Staff editor web)
```

---

## 📊 Menu Organization

```
17 SECTIONS
│
├── 1. Appetizers (13 items)
├── 2. Eidam/Stews (14 items)
├── 3. Grills (9 items)
├── 4. Chinese (5 items)
├── 5. Sea Food (6 items)
├── 6. Saudi Food (5 items)
├── 7. Meat (2 items)
├── 8. Rice (12 items)
├── 9. Karahi Station (11 items)
├── 10. BBQ (18 items)
├── 11. Pakistani Food (18 items)
├── 12. Afghani Food (15 items)
├── 13. Salads (4 items)
├── 14. Burgers & Sandwiches (7 items)
├── 15. Naan & Roti (8 items)
├── 16. Beverages (25 items)
└── 17. Sweets & Desserts (8 items)

TOTAL: 300+ dishes
```

---

## 🔐 Security Flow

```
┌─────────────────┐
│ Staff opens app │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ PIN required    │
│ (1234)          │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
 ✗ Wrong   ✓ Correct
    │         │
    │         ▼
    │    ┌─────────────────┐
    │    │ Access granted  │
    │    │ Can edit menu   │
    │    └─────────────────┘
    │
    ▼
┌─────────────────┐
│ Error message   │
│ Try again       │
└─────────────────┘
```

---

## 🎨 Design Themes

### Customer Menu (menu.html)
```
🌑 DARK THEME
- Background: #0f0f0f (almost black)
- Text: #f0ede8 (cream white)
- Accent: #c8a96e (gold)
- Cards: Dark with subtle borders
```

### Staff App (staff.html)
```
☀️ LIGHT THEME
- Background: #f5f4f0 (light beige)
- Text: #1a1a1a (dark gray)
- Accent: #27ae60 (green for success)
- Cards: White with shadows
```

---

## 🚀 Quick Commands

```bash
# Sync web files to Android
npm run sync

# Open Android Studio
npm run build:android

# Build APK (in Android Studio)
Build → Build APK(s)

# Or build via command line
cd android && ./gradlew assembleDebug
```

---

## ✅ System Status

```
✓ Customer menu (menu.html)     → Deployed to Vercel
✓ Staff web editor (staff.html) → Deployed to Vercel
✓ Android app source (www/)     → Ready to build
✓ Firebase database             → Connected
✓ Real-time sync                → Working
✓ Offline support (PWA)         → Enabled
✓ QR code ready                 → Generate from Vercel URL
```

---

## 🎯 Summary

**Your system is:**
- ✅ Simple (no complex frameworks)
- ✅ Fast (real-time updates)
- ✅ Reliable (Firebase backend)
- ✅ Mobile-friendly (responsive design)
- ✅ Offline-capable (service worker)
- ✅ Easy to update (just edit HTML)

**Perfect for:**
- Restaurant menu management
- QR code menu display
- Staff-controlled content
- Real-time updates
