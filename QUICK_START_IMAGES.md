# 🚀 Quick Start: Add Images to Your Menu

## ✅ What's Done
- ✅ All 115+ food images copied to `food-images/` folder
- ✅ Automated image linking tool created
- ✅ Menu updated to display images
- ✅ Everything pushed to GitHub
- ✅ Vercel will auto-deploy in ~2 minutes

---

## 🎯 Next Steps (Do This Now!)

### Step 1: Link Images to Dishes (2 minutes)
1. Open this file in your browser: **`link-local-images.html`**
2. Enter PIN: **1234**
3. Review the automatic matches (should show ~50 dishes matched)
4. Click the big green button: **"✅ Update Database with Image Links"**
5. Wait for success message
6. Done! ✨

### Step 2: Check Your Menu
1. Open **`menu.html`** in your browser
   - OR visit your Vercel website (after deployment completes)
2. You should now see real food images for:
   - Starters (chicken wings, spring rolls, etc.)
   - Grills (kebabs, chicken thighs)
   - Rice dishes (biryani, bukhari, kabuli)
   - Seafood (fish, shrimp meals)
   - Karahi Station (all 4 types)
   - Salads, Eidam, Chinese, Saudi Food
3. Dishes without images will still show emoji placeholders

---

## 📊 What You'll See

After running `link-local-images.html`, you'll get:
- **~50 dishes** with real food photos ✅
- **~65 dishes** still with emoji placeholders (need manual mapping)

The dishes with emoji placeholders are mostly in these categories:
- BBQ (generic image filenames)
- Beverages (generic image filenames)
- Burgers & Sandwiches (generic image filenames)
- Naan & Roti (generic image filenames)
- Pakistani Food (generic image filenames)
- Afghani Food (generic image filenames)
- Sweets & Desserts (generic image filenames)

---

## 🔧 To Add More Images Later

### Option 1: Rename Files (Easiest)
1. Go to `food-images/` folder
2. Find the category (e.g., `beverages/`)
3. Rename image files to match dish names exactly
   - Example: Rename `Gemini_Generated_Image_xxx.png` to `fresh juice.png`
4. Run `link-local-images.html` again
5. Click "Update Database"

### Option 2: Manual Mapping Tool
1. Open `manual-image-mapper.html`
2. Enter PIN: 1234
3. Select a category
4. Click on a dish, then click on an image
5. Click "Assign"
6. Click "Save All Mappings"

### Option 3: Firebase Storage Upload
1. Open `upload-images.html`
2. Enter PIN: 1234
3. Select a dish from dropdown
4. Choose image file from your computer
5. Click "Upload"
6. Image is uploaded to cloud and linked automatically

---

## 📱 Files You Have Now

| File | Purpose |
|------|---------|
| `menu.html` | Guest menu (shows images) |
| `staff.html` | Staff management app |
| `link-local-images.html` | **Auto-link images (USE THIS FIRST!)** |
| `manual-image-mapper.html` | Manual image assignment |
| `upload-images.html` | Upload to Firebase Storage |
| `food-images/` | All your food photos (115+ images) |
| `LOCAL_IMAGES_SETUP.md` | Detailed documentation |

---

## 🌐 Live Website

Your Vercel website will automatically update in ~2 minutes with:
- ✅ All food images included
- ✅ Updated menu design
- ✅ Image support enabled

**Important**: After Vercel deploys, you still need to run `link-local-images.html` to actually link the images to dishes in the database!

---

## ⚡ TL;DR

1. Open `link-local-images.html`
2. Enter PIN: 1234
3. Click "Update Database"
4. Refresh `menu.html`
5. Enjoy your menu with real food photos! 🎉

---

## 🆘 Need Help?

- Images not showing? → Check browser console (F12)
- Some dishes missing images? → Use `manual-image-mapper.html`
- Want cloud hosting? → Use `upload-images.html` for Firebase Storage
- Read full guide → Open `LOCAL_IMAGES_SETUP.md`
