# 📦 Build APK to Send via WhatsApp

## 🎯 Goal
Build APK file → Send via WhatsApp → Staff installs directly (no Expo Go needed)

---

## 📱 Build APK (10 minutes)

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Login to Expo
```bash
eas login
```

**Don't have account?**
- Go to: https://expo.dev/signup
- Create free account
- Come back and run `eas login`

### Step 3: Go to app folder
```bash
cd staff-app-expo
```

### Step 4: Configure EAS (first time only)
```bash
eas build:configure
```
- Press Enter for all questions (use defaults)

### Step 5: Build APK
```bash
eas build -p android --profile preview
```

**What happens:**
- Expo builds your app in the cloud (free!)
- Takes 5-10 minutes
- You'll get a download link

### Step 6: Download APK
- Click the link in terminal
- Or go to: https://expo.dev/accounts/[your-username]/projects/alqaysar-staff/builds
- Download the APK file (about 20-30 MB)

---

## 📤 Send APK via WhatsApp

### Method 1: Direct WhatsApp
1. Open WhatsApp on computer
2. Click attachment (📎)
3. Select "Document"
4. Choose the APK file
5. Send to staff

### Method 2: Google Drive
1. Upload APK to Google Drive
2. Get shareable link
3. Send link via WhatsApp

### Method 3: Direct Transfer
1. Connect phone to computer via USB
2. Copy APK to phone
3. Open APK file on phone
4. Install

---

## 📲 Install on Android Phone

### Step 1: Enable Unknown Sources
- Go to: Settings → Security
- Enable "Install from Unknown Sources"
- Or: Settings → Apps → Special Access → Install Unknown Apps
- Allow WhatsApp/Chrome to install apps

### Step 2: Install APK
1. Open APK file from WhatsApp
2. Tap "Install"
3. Wait for installation
4. Tap "Open"
5. Enter PIN: 1234
6. Done! ✅

---

## 🔄 Update App Later

When you make changes:

1. **Update code** in `staff-app-expo/App.js`

2. **Build new APK:**
   ```bash
   cd staff-app-expo
   eas build -p android --profile preview
   ```

3. **Send new APK** via WhatsApp

4. **Staff installs** new version (overwrites old one)

---

## 💡 Tips

**APK file size:** About 20-30 MB
**Build time:** 5-10 minutes
**Cost:** FREE (Expo gives free builds)
**Limit:** 30 builds per month (more than enough!)

---

## 🆘 Problems?

### "eas: command not found"
```bash
npm install -g eas-cli
```

### "Not logged in"
```bash
eas login
```

### "Build failed"
```bash
cd staff-app-expo
npm install
eas build -p android --profile preview
```

### Can't install APK on phone?
- Enable "Unknown Sources" in phone settings
- Try different file transfer method

---

## ✅ Summary

**To send app via WhatsApp:**

1. Build APK:
   ```bash
   npm install -g eas-cli
   eas login
   cd staff-app-expo
   eas build -p android --profile preview
   ```

2. Download APK file

3. Send via WhatsApp

4. Staff installs directly (no Expo Go needed!)

**That's it!** 🎉
