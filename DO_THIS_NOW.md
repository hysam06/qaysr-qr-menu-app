# ✅ Step 1 Done! Now Do This:

## ✅ EAS CLI Installed!

Now follow these steps:

---

## Step 2: Login to Expo

Run this command:
```bash
eas login
```

**What will happen:**
- It will ask for email and password
- If you don't have account, go to: https://expo.dev/signup
- Create FREE account
- Come back and run `eas login` again
- Enter your email and password

---

## Step 3: Build APK

After login, run:
```bash
cd staff-app-expo
eas build -p android --profile preview
```

**What will happen:**
- First time: It will ask some questions → Just press ENTER for all
- It will upload your code to Expo servers
- Expo will build your APK (takes 5-10 minutes)
- You'll get a download link!

**Example output:**
```
✔ Build finished
Download: https://expo.dev/artifacts/eas/xxxxx.apk
```

---

## Step 4: Download APK

- Click the link
- Or go to: https://expo.dev → Builds
- Download the APK file (20-30 MB)

---

## Step 5: Send via WhatsApp

1. Open WhatsApp
2. Click 📎 (attachment)
3. Select "Document"
4. Choose the APK file
5. Send to staff

---

## Step 6: Staff Installs

1. Open APK from WhatsApp
2. Enable "Unknown Sources" if asked
3. Tap "Install"
4. Open app
5. Enter PIN: 1234
6. Done! ✅

---

## 🎯 Summary

**Run these commands NOW:**

```bash
# Login
eas login

# Build APK
cd staff-app-expo
eas build -p android --profile preview
```

**Then:**
- Download APK
- Send via WhatsApp
- Staff installs

**That's it!** 🎉
