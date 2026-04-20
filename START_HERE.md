# 🚀 START HERE - Super Simple Guide

## 📱 Install App on Android Phone

### Quick Test (2 minutes):

1. **Install Expo Go on your phone:**
   - https://play.google.com/store/apps/details?id=host.exp.exponent

2. **On your computer, run:**
   ```bash
   cd staff-app-expo
   npm start
   ```

3. **Scan QR code with Expo Go app**
   - App opens on your phone!
   - Enter PIN: **1234**
   - Test it!

---

### Build Real APK (10 minutes):

1. **Install EAS:**
   ```bash
   npm install -g eas-cli
   ```

2. **Login:**
   ```bash
   eas login
   ```
   (Create free account at expo.dev)

3. **Build APK:**
   ```bash
   cd staff-app-expo
   eas build -p android --profile preview
   ```

4. **Download & Install:**
   - You'll get a download link
   - Download APK
   - Send to phone (WhatsApp/Email)
   - Install on phone
   - Done! ✅

---

## 🔗 Your Website Links

**Customer Menu (for QR code):**
```
https://qaysr-qr-menu-app.vercel.app/menu
```

**Staff Web Editor:**
```
https://qaysr-qr-menu-app.vercel.app/staff
```

**Create QR Code:**
- Go to: https://www.qr-code-generator.com/
- Enter: `https://qaysr-qr-menu-app.vercel.app/menu`
- Download & print

---

## 🎯 How It Works

**Simple:**
1. Staff opens app → Selects dishes
2. Clicks "Update menu"
3. Customer menu updates instantly

**That's it!**

---

## 🔧 Change PIN

Edit `staff-app-expo/App.js` line 30:
```javascript
const STAFF_PIN = "your-new-pin";
```

---

## 📋 What You Have

✅ Customer website (Vercel)
✅ Staff Android app (React Native)
✅ Firebase database (connects them)
✅ Real-time updates

---

## 🆘 Help

**App won't start?**
```bash
cd staff-app-expo
npm install
npm start
```

**Can't build?**
```bash
npm install -g eas-cli
eas login
cd staff-app-expo
eas build -p android --profile preview
```

---

## ✨ Summary

**Your System:**
- Customers scan QR → See menu
- Staff use app → Update menu
- Changes appear instantly

**Test Now:**
```bash
cd staff-app-expo
npm start
```

Scan QR with Expo Go app! 📱
