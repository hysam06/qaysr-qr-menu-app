# Building Al Qaysar Staff App APK

This guide will help you build an Android APK from the staff.html web app.

## Prerequisites

1. **Install Android Studio**
   - Download from: https://developer.android.com/studio
   - Install and complete the setup wizard
   - Make sure Android SDK is installed

2. **Install Java JDK** (if not already installed)
   - Download JDK 11 or higher from: https://www.oracle.com/java/technologies/downloads/

## Build Steps

### Option 1: Using Android Studio (Recommended)

1. **Open the project in Android Studio:**
   ```bash
   npm run build:android
   ```
   This will open Android Studio with the Android project.

2. **Wait for Gradle sync to complete** (first time may take several minutes)

3. **Build the APK:**
   - Click `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
   - Wait for the build to complete
   - Click "locate" in the notification to find your APK

4. **APK Location:**
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

### Option 2: Using Command Line

1. **Sync the web assets:**
   ```bash
   npm run sync
   ```

2. **Build the APK using Gradle:**
   ```bash
   cd android
   ./gradlew assembleDebug
   ```

3. **Find your APK at:**
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

## Installing the APK

### On Android Device/Tablet:

1. **Enable Unknown Sources:**
   - Go to Settings → Security
   - Enable "Install from Unknown Sources" or "Install Unknown Apps"

2. **Transfer the APK:**
   - Email it to yourself
   - Use USB cable and copy to device
   - Upload to Google Drive and download on device

3. **Install:**
   - Tap the APK file
   - Follow the installation prompts

## Building a Release APK (For Production)

1. **Generate a signing key:**
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure signing in Android Studio:**
   - Build → Generate Signed Bundle / APK
   - Follow the wizard to create a release APK

3. **Or use Gradle:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

## Updating the App

When you make changes to `staff.html`:

1. Copy the updated file:
   ```bash
   cp staff.html www/index.html
   ```

2. Sync and rebuild:
   ```bash
   npm run sync
   npm run build:android
   ```

3. Rebuild the APK in Android Studio

## Troubleshooting

### Gradle build fails:
- Make sure Android SDK is properly installed
- Check that ANDROID_HOME environment variable is set
- Try: `cd android && ./gradlew clean`

### App crashes on launch:
- Check Firebase configuration in staff.html
- Ensure internet permission is granted
- Check Android Studio Logcat for errors

### Changes not appearing:
- Make sure you copied staff.html to www/index.html
- Run `npm run sync` before building
- Clear app data on device and reinstall

## App Details

- **App Name:** Al Qaysar Staff
- **Package Name:** com.alqaysar.staff
- **Main File:** www/index.html (copy of staff.html)

## Notes

- The debug APK is for testing only
- For Google Play Store, you need a release APK with proper signing
- The app requires internet connection to sync with Firebase
- Default staff PIN is "1234" (change in staff.html before building)
