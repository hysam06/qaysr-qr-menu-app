# 📤 Send App via WhatsApp - Simple Guide

## ❌ QR Code = Only for Testing
- QR code only works with Expo Go app
- Not for real use
- Can't send via WhatsApp

## ✅ APK File = Real App
- Build APK file
- Send via WhatsApp
- Staff installs directly
- No Expo Go needed!

---

## 🚀 Build APK (Copy & Paste These Commands)

```bash
# 1. Install EAS
npm install -g eas-cli

# 2. Login (create free account at expo.dev if needed)
eas login

# 3. Go to app folder
cd staff-app-expo

# 4. Build APK
eas build -p android --profile preview
```

**Wait 5-10 minutes** → You'll get a download link!

---

## 📥 Download APK

**Option 1:** Click the link in terminal

**Option 2:** Go to https://expo.dev
- Login
- Go to "Builds"
- Download APK

**File size:** About 20-30 MB

---

## 📤 Send via WhatsApp

### On Computer:
1. Open WhatsApp Web
2. Click 📎 (attachment)
3. Select "Document"
4. Choose APK file
5. Send to staff

### On Phone:
1. Open WhatsApp
2. Click 📎 (attachment)
3. Select "Document"
4. Choose APK file
5. Send to staff

---

## 📲 Staff Installs App

### Step 1: Enable Installation
- Settings → Security
- Enable "Install from Unknown Sources"

### Step 2: Install
1. Open APK from WhatsApp
2. Tap "Install"
3. Tap "Open"
4. Enter PIN: 1234
5. Done! ✅

---

## 🔄 Update App Later

Make changes → Build new APK → Send via WhatsApp → Staff installs

```bash
cd staff-app-expo
eas build -p android --profile preview
```

---

## ✨ Summary

**To send app via WhatsApp:**

1. **Build APK:**
   ```bash
   npm install -g eas-cli
   eas login
   cd staff-app-expo
   eas build -p android --profile preview
   ```

2. **Download APK file** (20-30 MB)

3. **Send via WhatsApp** (as document)

4. **Staff installs** (no Expo Go needed!)

**That's it!** 🎉

---

## 💡 Important

- ❌ QR code = Testing only (needs Expo Go)
- ✅ APK file = Real app (send via WhatsApp)
- 🆓 Building APK is FREE
- ⏱️ Takes 5-10 minutes to build
- 📦 30 free builds per month
