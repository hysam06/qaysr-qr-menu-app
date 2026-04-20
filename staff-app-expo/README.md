# Al Qaysar Staff App - React Native Expo

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd staff-app-expo
npm install
```

### 2. Run the App

**On Android:**
```bash
npm run android
```

**On iOS:**
```bash
npm run ios
```

**On Web (for testing):**
```bash
npm run web
```

---

## 📱 Build APK for Android

### Method 1: Using EAS Build (Recommended)

**Install EAS CLI:**
```bash
npm install -g eas-cli
```

**Login to Expo:**
```bash
eas login
```

**Configure EAS:**
```bash
eas build:configure
```

**Build APK:**
```bash
eas build -p android --profile preview
```

This will build an APK and give you a download link!

---

### Method 2: Local Build

**Install Expo CLI:**
```bash
npm install -g expo-cli
```

**Build locally:**
```bash
npx expo run:android
```

---

## 🔧 Configuration

### Change Staff PIN

Edit `App.js` line 30:
```javascript
const STAFF_PIN = "1234"; // Change to your secure PIN
```

### Update Firebase Config

Edit `App.js` lines 16-25 with your Firebase credentials.

---

## 📦 Features

✅ PIN-protected login
✅ Real-time Firebase sync
✅ Search dishes
✅ Toggle dishes on/off
✅ Select/deselect all per section
✅ Save to Firebase
✅ Offline login persistence
✅ Native mobile experience
✅ Smooth animations
✅ Arabic & English support

---

## 🎨 App Structure

```
App.js
├── Login Screen
│   ├── PIN input
│   └── Login button
│
└── Main Screen
    ├── Top Bar (title, date, logout)
    ├── Save Bar (update button, count)
    ├── Search Bar
    └── Menu List
        ├── Section headers
        ├── Select all/none buttons
        └── Dish rows (checkbox, name, price)
```

---

## 🔥 Firebase Structure

The app reads/writes to:
```
menu/
├── available/
│   └── { dish_id: true, ... }
├── dishes/
│   └── { dish_id: { en, ar, price, section }, ... }
└── updatedAt: "ISO timestamp"
```

---

## 📱 Testing

### Test on Physical Device

**Using Expo Go:**
1. Install "Expo Go" app from Play Store/App Store
2. Run `npm start`
3. Scan QR code with Expo Go app

**Using Development Build:**
1. Run `npm run android` (with device connected)
2. App installs directly on device

---

## 🏗️ Build for Production

### Android APK

**Using EAS (Cloud Build):**
```bash
eas build -p android --profile production
```

**Local Build:**
```bash
npx expo run:android --variant release
```

### iOS IPA

```bash
eas build -p ios --profile production
```

---

## 📝 Menu Data

The menu is hardcoded in `App.js` (MENU constant).

To add/edit dishes:
1. Edit the `MENU` array in `App.js`
2. Follow the structure:
```javascript
{
  section: "Section Name",
  items: [
    {
      id: "unique_id",
      en: "English Name",
      ar: "Arabic Name",
      price: "10.00"
    }
  ]
}
```

---

## 🔐 Security

**Current:**
- PIN: 1234 (hardcoded)
- Firebase: Public access

**Recommendations:**
1. Change PIN before deployment
2. Add Firebase security rules
3. Consider adding user authentication
4. Use environment variables for sensitive data

---

## 🐛 Troubleshooting

### App won't start?
```bash
npm install
npx expo start --clear
```

### Firebase not connecting?
- Check internet connection
- Verify Firebase config
- Check Firebase console for errors

### Build fails?
```bash
npm install -g eas-cli
eas build:configure
eas build -p android --profile preview
```

---

## 📚 Documentation

- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Firebase Docs](https://firebase.google.com/docs)
- [EAS Build](https://docs.expo.dev/build/introduction/)

---

## 🎯 Next Steps

1. ✅ Test app on your device
2. ✅ Change PIN
3. ✅ Build APK
4. ✅ Install on staff tablets
5. ✅ Train staff
6. ✅ Go live!

---

## 💡 Tips

- Use `npm start` for development
- Use `eas build` for production APK
- Test on real device, not just emulator
- Keep Firebase rules secure
- Backup your data regularly

---

## 🆘 Need Help?

Check the main project documentation:
- `../HOW_IT_WORKS.md`
- `../NEXT_STEPS.md`
- `../QUICK_START.md`
