# 📱 Rebuild APK with Food Images

## ✅ What's Been Done

1. **Food images copied to www folder** ✅
   - All 115+ images are now in `www/food-images/`
   - Ready to be included in the APK

2. **Android project synced** ✅
   - Images copied to Android assets folder
   - Ready for building

## 🔧 Build the New APK

You have **2 options** to rebuild the APK with images:

---

### Option 1: Using Android Studio (Recommended - Easiest)

1. **Open Android Studio**
   - Launch Android Studio on your Mac

2. **Open the Project**
   - Click "Open" or "Open an Existing Project"
   - Navigate to: `/Users/hysam/Downloads/alqaysr menu/android`
   - Click "Open"

3. **Wait for Gradle Sync**
   - Android Studio will automatically sync the project
   - Wait for "Gradle sync finished" message (bottom right)

4. **Build the APK**
   - Click **Build** menu → **Build Bundle(s) / APK(s)** → **Build APK(s)**
   - Wait for build to complete (~2-3 minutes)
   - You'll see a notification: "APK(s) generated successfully"

5. **Locate the APK**
   - Click "locate" in the notification
   - Or find it at: `android/app/build/outputs/apk/debug/app-debug.apk`

6. **Copy to Main Folder**
   ```bash
   cp android/app/build/outputs/apk/debug/app-debug.apk "AlQaysar-Staff-App-v2.apk"
   ```

---

### Option 2: Using Command Line (Requires Java Setup)

If Java is not working, you need to reinstall it first:

#### Step 1: Install Java 21
```bash
brew install openjdk@21
```

#### Step 2: Set JAVA_HOME
```bash
export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
```

#### Step 3: Build APK
```bash
cd android
./gradlew assembleDebug
```

#### Step 4: Copy APK
```bash
cp app/build/outputs/apk/debug/app-debug.apk ../AlQaysar-Staff-App-v2.apk
```

---

## 📊 What's Included in the New APK

The new APK will include:
- ✅ Staff management interface (same as before)
- ✅ All 115+ food images embedded in the app
- ✅ Updated menu.html with image support
- ✅ Offline access to images (no internet needed for images)

---

## 📱 APK Size

- **Old APK**: ~3.9 MB
- **New APK**: ~900 MB (includes all food images)

**Note**: The APK is large because it includes all high-quality food images. This is normal for apps with many images.

---

## 🚀 After Building

1. **Install on Tablet**
   - Transfer the new APK to your tablet
   - Install it (will replace the old version)
   - Open the app and enter PIN: 1234

2. **Link Images to Dishes**
   - The images are in the app, but still need to be linked to dishes
   - Open `link-local-images.html` on any device with internet
   - Enter PIN: 1234
   - Click "Update Database"
   - Now the app will show images for all dishes!

---

## 🔄 Quick Build Command (If Java Works)

If you already have Java 21 installed and configured:

```bash
# Sync and build in one go
npx cap sync android && cd android && ./gradlew assembleDebug && cd .. && cp android/app/build/outputs/apk/debug/app-debug.apk AlQaysar-Staff-App-v2.apk
```

---

## ⚠️ Current Status

- ✅ Images copied to www folder
- ✅ Android project synced
- ⚠️ Java needs to be configured
- ⏳ APK build pending

**Recommended**: Use Android Studio (Option 1) - it's the easiest and most reliable method!

---

## 🆘 Troubleshooting

### "Unable to locate a Java Runtime"
- Install Java 21: `brew install openjdk@21`
- Or use Android Studio (it has Java built-in)

### "Gradle sync failed"
- Open Android Studio
- Click "File" → "Sync Project with Gradle Files"
- Wait for sync to complete

### APK too large?
- This is normal with 115+ images
- If needed, you can reduce image quality or use Firebase Storage instead
- Firebase Storage keeps images in the cloud (smaller APK)

---

## 📝 Summary

**Easiest Method**: 
1. Open Android Studio
2. Open the `android` folder
3. Build → Build APK(s)
4. Done! ✨

The new APK will have all food images embedded and ready to display once you run the image linking tool!
