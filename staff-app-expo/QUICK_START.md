# ⚡ Quick Start - Test in 2 Minutes!

## 🚀 Run the App NOW

### Step 1: Start Server (30 seconds)

```bash
cd staff-app-expo
npm start
```

You'll see a QR code in the terminal.

---

### Step 2: Test on Your Phone (1 minute)

**Download Expo Go:**
- Android: https://play.google.com/store/apps/details?id=host.exp.exponent
- iOS: https://apps.apple.com/app/expo-go/id982107779

**Scan QR Code:**
- Android: Use Expo Go app to scan
- iOS: Use Camera app to scan

**App opens on your phone!** 🎉

---

### Step 3: Test Features (30 seconds)

1. Enter PIN: `1234`
2. Toggle some dishes on/off
3. Click "Update guest menu"
4. Open your website → See changes!

---

## 🎯 That's It!

Your React Native app is working!

---

## 📱 Build APK (When Ready)

```bash
# Install EAS
npm install -g eas-cli

# Login
eas login

# Build
cd staff-app-expo
eas build -p android --profile preview
```

You'll get a download link for the APK!

---

## 🔧 Change PIN

Edit `App.js` line 30:
```javascript
const STAFF_PIN = "your-new-pin";
```

---

## 🆘 Problems?

### QR code not working?
Press `w` to open in web browser

### App crashes?
Check Firebase config in `App.js`

### Need help?
Read `README.md` in this folder

---

## ✨ Next Steps

1. ✅ Test app (you just did!)
2. Change PIN
3. Build APK
4. Install on tablets
5. Go live!

---

## 📚 More Info

- `README.md` - Full documentation
- `../REACT_NATIVE_SETUP.md` - Setup guide
- `../HOW_IT_WORKS.md` - System overview
