# Al Qaysar Menu System - Simple Guide

## 📱 What You Have

### 1. **Customer Menu Website**
Customers scan QR code → See menu

### 2. **Staff Android App**
Staff use app → Select dishes → Customers see updates

---

## 🔗 Your Website Links

Replace `your-domain` with your actual Vercel domain:

**Customer Menu (for QR code):**
```
https://your-domain.vercel.app/menu
```

**Staff Web Editor:**
```
https://your-domain.vercel.app/staff
```

---

## 📱 Install App on Android Phone

### Method 1: Test with Expo Go (Quick Test)

**Step 1:** Install Expo Go app
- Download: https://play.google.com/store/apps/details?id=host.exp.exponent

**Step 2:** Start the app on your computer
```bash
cd staff-app-expo
npm start
```

**Step 3:** Scan QR code with Expo Go app
- App opens on your phone!
- Enter PIN: 1234
- Test it!

---

### Method 2: Build APK (For Real Use)

**Step 1:** Install EAS CLI
```bash
npm install -g eas-cli
```

**Step 2:** Login to Expo
```bash
eas login
```
(Create free account if needed)

**Step 3:** Build APK
```bash
cd staff-app-expo
eas build -p android --profile preview
```

**Step 4:** Download APK
- You'll get a download link
- Download APK file
- Send to your phone (WhatsApp, email, etc.)

**Step 5:** Install on phone
- Open APK file on phone
- Allow "Install from unknown sources"
- Install app
- Done! ✅

---

## 🎯 How It Works

```
Staff opens app
    ↓
Selects dishes available today
    ↓
Clicks "Update menu"
    ↓
Saves to Firebase
    ↓
Customer menu updates instantly
```

---

## 🔧 Change PIN

Edit `staff-app-expo/App.js` line 30:
```javascript
const STAFF_PIN = "1234"; // Change to your PIN
```

Then rebuild the app.

---

## 📋 Daily Use

**Morning (Staff):**
1. Open app
2. Enter PIN
3. Select today's dishes
4. Click "Update guest menu"

**Customers:**
1. Scan QR code on table
2. See menu
3. Order

---

## 🆘 Problems?

**App won't start?**
```bash
cd staff-app-expo
npm install
npm start
```

**Can't build APK?**
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

**Menu not updating?**
- Check internet connection
- Check Firebase config in `staff-app-expo/App.js`

---

## 📁 Project Files

```
├── menu.html              # Customer website
├── staff.html             # Staff web version
├── staff-app-expo/        # Android app (React Native)
│   ├── App.js            # Main app code
│   └── README.md         # Detailed docs
├── vercel.json           # Website deployment
└── README.md             # This file
```

---

## ✅ Checklist

- [ ] Test app with Expo Go
- [ ] Change PIN
- [ ] Build APK
- [ ] Install on staff phones
- [ ] Create QR code for tables
- [ ] Test end-to-end
- [ ] Go live!

---

## 🎉 That's It!

Simple system:
- Website for customers
- App for staff
- Firebase connects them
- Real-time updates

**Start testing:**
```bash
cd staff-app-expo
npm start
```
