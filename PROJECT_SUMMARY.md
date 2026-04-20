# Al Qaysar Restaurant - Menu Management System

## 🎯 Project Overview

A complete restaurant menu management system with:
- **Staff Android App** - For managing daily menu availability
- **Guest Website** - Real-time menu display for customers
- **Firebase Backend** - Real-time synchronization

---

## 📱 Components

### 1. Staff App (Android APK)
**File:** `AlQaysar-Staff-App.apk` (3.9 MB)

**Features:**
- PIN-protected access (Default: 1234)
- Toggle dishes ON/OFF
- Real-time sync with Firebase
- Works offline after first load
- Native Android app built with Capacitor

**Installation:**
- Transfer APK to Android device
- Enable "Install from Unknown Sources"
- Install and open
- Login with PIN: 1234

### 2. Guest Menu Website
**File:** `menu.html`

**Features:**
- Real-time menu updates
- Dark theme design
- Bilingual (English/Arabic)
- Section-based navigation
- Shows prices and availability
- Updates automatically when staff makes changes

**Access:**
- Open `menu.html` in any browser
- Or deploy to Vercel/Netlify for public URL

### 3. Firebase Database
**Configuration:**
```javascript
Project: alqaysar-menu
Database: https://alqaysar-menu-default-rtdb.firebaseio.com
```

**Data Structure:**
```
/menu
  /available      → { dish_id: true/false }
  /dishes         → { dish_id: { en, ar, price, section } }
  /updatedAt      → ISO timestamp
```

---

## 🔄 How It Works

```
Staff App (Tablet)
    ↓
    Toggle dishes ON/OFF
    ↓
    Click "Update guest menu"
    ↓
Firebase Realtime Database
    ↓
    Syncs instantly
    ↓
Guest Website (Customers)
    ↓
    See updated menu in real-time
```

---

## 🚀 Quick Start

### For Staff:
1. Install `AlQaysar-Staff-App.apk` on tablet
2. Open app and login with PIN: 1234
3. Toggle dishes that are available today
4. Click "Update guest menu"
5. Done! Customers see changes instantly

### For Customers:
1. Open menu.html in browser
2. Browse available dishes by section
3. Menu updates automatically

---

## 🛠️ Technical Stack

- **Frontend:** HTML, CSS, JavaScript
- **Mobile:** Capacitor (Native Android wrapper)
- **Backend:** Firebase Realtime Database
- **Build Tools:** Gradle, Java 21, Android SDK

---

## 📂 Project Structure

```
qaysr-qr-menu-app/
├── AlQaysar-Staff-App.apk    # Ready-to-install Android app
├── staff.html                 # Staff app source (web version)
├── menu.html                  # Guest menu website
├── www/
│   └── index.html            # Staff app (for APK build)
├── android/                   # Android project (Capacitor)
├── capacitor.config.json     # Capacitor configuration
└── package.json              # Node dependencies
```

---

## 🔧 Building the APK

If you need to rebuild the APK after changes:

```bash
# 1. Update the source
cp staff.html www/index.html

# 2. Sync to Android
npx cap sync android

# 3. Build APK
export JAVA_HOME=/opt/homebrew/opt/openjdk@21
export ANDROID_HOME=/opt/homebrew/share/android-commandlinetools
cd android && ./gradlew assembleDebug

# 4. Get APK
cp android/app/build/outputs/apk/debug/app-debug.apk AlQaysar-Staff-App.apk
```

---

## 🔐 Security

- **Staff PIN:** Change in `staff.html` line 142: `const STAFF_PIN = "1234";`
- **Firebase Rules:** Configure in Firebase Console for production
- **APK Signing:** Use release build with keystore for production

---

## 🌐 Deployment Options

### Guest Menu Website:
1. **Vercel** (Recommended)
   - Connect GitHub repo
   - Deploy `menu.html`
   - Get public URL

2. **Firebase Hosting**
   ```bash
   firebase init hosting
   firebase deploy
   ```

3. **Netlify**
   - Drag and drop `menu.html`
   - Get instant URL

---

## 📊 Menu Data

**Total Items:** 200+ dishes across 17 sections
- Appetizers
- Eidam (Stews)
- Grills
- Chinese
- Sea Food
- Saudi Food
- Meat
- Rice
- Karahi Station
- BBQ
- Pakistani Food
- Afghani Food
- Salads
- Burgers & Sandwiches
- Naan & Roti
- Beverages
- Sweets & Desserts

---

## 🎨 Customization

### Change Staff PIN:
Edit `staff.html` and `www/index.html`:
```javascript
const STAFF_PIN = "YOUR_NEW_PIN";
```

### Update Restaurant Info:
Edit `menu.html` footer section:
```html
<p>
  Your Address<br>
  <a href="tel:+966XXXXXXXXX">+966 XXX XXX XXX</a>
</p>
```

### Modify Menu Items:
Edit the `MENU` array in both `staff.html` and `www/index.html`

---

## 📱 System Requirements

### Staff App:
- Android 7.0 or higher
- Internet connection (for Firebase sync)
- ~4 MB storage space

### Guest Website:
- Any modern web browser
- Internet connection (for real-time updates)

---

## 🐛 Troubleshooting

### App won't install:
- Enable "Install from Unknown Sources" in Android settings
- Check if you have enough storage space

### Menu not updating:
- Check internet connection
- Verify Firebase configuration
- Check browser console for errors

### Build fails:
- Ensure Java 21 is installed
- Verify Android SDK is properly configured
- Check `android/local.properties` has correct SDK path

---

## 📞 Support

**Restaurant Contact:**
- Phone: +966 565 041 261
- Email: alqaysarcatering@gmail.com
- Location: King Abdullah, Duba 49315

**GitHub Repository:**
https://github.com/hysam06/qaysr-qr-menu-app

---

## 📝 License

Private project for Al Qaysar Restaurant

---

## ✅ Status

- ✅ Staff Android App - Built and ready
- ✅ Guest Menu Website - Complete
- ✅ Firebase Integration - Connected
- ✅ Real-time Sync - Working
- ⏳ Public Deployment - Pending
- ⏳ Production APK Signing - Pending

---

**Last Updated:** April 20, 2026
**Version:** 1.0.0
**Built with:** Capacitor + Firebase + HTML/CSS/JS
