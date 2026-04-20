# Android Build Fix - Steps to Rebuild

## What Was Fixed (Updated)

### First Fix:
1. **Disabled New Architecture** - Removed `"newArchEnabled": true` which can cause Gradle build failures
2. **Downgraded React** - Changed from React 19.1.0 to 18.3.1 (stable version compatible with React Native)
3. **Updated Expo SDK** - Changed to Expo SDK 52 (more stable)
4. **Fixed Firebase version** - Downgraded to Firebase 10.13.0 (more compatible)
5. **Removed edgeToEdgeEnabled** - This can cause build issues on some Android versions

### Second Fix (JavaScript Bundling):
6. **Removed `gap` property** - The `gap` CSS property is not supported in React Native StyleSheet (causes bundling errors)
7. **Replaced with margin** - Used `marginRight` instead of `gap` for spacing
8. **Added Babel config** - Created proper babel.config.js for JavaScript transpilation
9. **Added Metro config** - Created metro.config.js for proper bundling
10. **Added dev dependencies** - Added @babel/core and babel-preset-expo

### Third Fix (Missing Expo Packages):
11. **Added expo-asset** - Required for asset management
12. **Added expo-constants** - Required for app configuration
13. **Added expo-font** - Required for font loading
14. **Added expo-splash-screen** - Required for splash screen handling

## Steps to Rebuild

### Clean Build (Recommended)

```bash
cd staff-app-expo
rm -rf node_modules package-lock.json
npm install
eas build --platform android --clear-cache
```

### Alternative: If the above doesn't work

```bash
cd staff-app-expo
rm -rf node_modules package-lock.json .expo
npm install
npx expo prebuild --clean
eas build --platform android --clear-cache
```

## What Changed in the Code

### Removed unsupported `gap` property:
- ❌ `gap: 10` (not supported in React Native)
- ✅ `marginRight: 10` (proper React Native spacing)

### Files Modified:
- `App.js` - Removed all `gap` properties, replaced with margins
- `package.json` - Added babel dependencies
- `babel.config.js` - Created (new file)
- `metro.config.js` - Created (new file)

## What to Expect

- JavaScript bundling should now complete successfully
- All functionality remains the same
- The app will work on Android 5.0+ devices
- UI spacing will look identical to before

## If Build Still Fails

1. Check the "Bundle JavaScript" phase logs in EAS
2. Look for any syntax errors or import issues
3. Verify all dependencies installed correctly
4. Try clearing all caches: `npm cache clean --force`

## Testing After Build

1. Install the APK on a test device
2. Test login with PIN: 1234
3. Test menu selection and Firebase sync
4. Test logout functionality
5. Verify UI spacing looks correct

---

**Build Command:**
```bash
eas build --platform android --clear-cache
```

**Check Build Status:**
Visit: https://expo.dev/accounts/sayedhysam/projects/alqaysar-staff/builds

