# 🖼️ Local Food Images Setup Guide

## ✅ What Has Been Done

### 1. Images Copied to Web-Accessible Folder
- All images from `"food "` folder have been copied to `food-images/` folder
- This folder is now web-accessible and can be used by your menu website
- Folder structure preserved (organized by category)

### 2. Image Linking Tool Created
- Created `link-local-images.html` - an automated tool to link images to dishes
- PIN protected (PIN: 1234)
- Automatically matches image filenames to dish names
- Shows preview of all matches before updating database

### 3. Menu Updated
- `menu.html` now supports both local image paths and Firebase Storage URLs
- Falls back to emoji placeholders if no image is found

---

## 🚀 How to Link Images to Your Menu

### Step 1: Open the Image Linking Tool
1. Open `link-local-images.html` in your web browser
2. Enter PIN: **1234**

### Step 2: Review the Matches
- The tool will show you:
  - **Total Dishes**: How many dishes are in your menu
  - **Images Matched**: How many dishes have matching images
  - **No Image Found**: How many dishes don't have images yet
- Scroll down to see a preview of each dish with its matched image

### Step 3: Update Database
1. Click the green **"✅ Update Database with Image Links"** button
2. Confirm the action
3. Wait for success message
4. Done! Your menu will now show the images

### Step 4: View Your Menu
1. Open `menu.html` in your browser (or visit your Vercel website)
2. All dishes with matched images will now display their photos
3. Dishes without images will show emoji placeholders

---

## 📁 Folder Structure

```
alqaysr menu/
├── menu.html                    (Guest menu website)
├── staff.html                   (Staff management)
├── link-local-images.html       (Image linking tool - NEW!)
├── food-images/                 (Web-accessible images - NEW!)
│   ├── starters/
│   │   ├── chicken wings.png
│   │   ├── prawn tail.png
│   │   └── ...
│   ├── grills/
│   │   ├── chicken kebab.png
│   │   └── ...
│   ├── Rice/
│   │   ├── chicken biriyani.png
│   │   └── ...
│   └── ... (all other categories)
└── "food "                      (Original images - can be deleted after setup)
```

---

## 🎯 Current Image Mappings

The tool automatically maps images for these categories:

### ✅ Fully Mapped Categories:
- **Starters/Appetizers**: chicken wings, spring rolls, prawn tail, fish finger
- **Eidam (Stews)**: meat stew, mixed stew, molokhia, okra, potato, pasta stews
- **Grills**: chicken kebab, meat kebab, chicken thighs, kebab platter
- **Chinese**: chicken manchurian, fried rice, noodles, sweet & sour chicken
- **Seafood**: fried/grilled fish & shrimp, tandoori masala fish & prawn
- **Saudi Food**: charcoal rice, fried chicken with rice, grilled chicken
- **Rice**: biryani, bukhari, kabuli, peshawari, plain, vegetable rice
- **Karahi Station**: chicken karahi (regular, marahi, namkeen, white)
- **Salads**: fresh salad, raita, russian salad
- **Meat**: kabsa

### ⚠️ Categories with Generic Images:
Some categories (BBQ, Pakistani Food, Afghani Food, Beverages, Sweets, Naan & Roti, Burgers & Sandwiches) have images with generic filenames like "Gemini_Generated_Image_xxx.png". These will need manual mapping.

---

## 🔧 For Categories Not Auto-Mapped

If some dishes don't have images automatically matched, you have two options:

### Option 1: Rename Image Files (Recommended)
1. Go to the `food-images/` folder
2. Find the category subfolder (e.g., `bbq/`, `beverages/`)
3. Rename the image files to match your dish names exactly
   - Example: Rename `Gemini_Generated_Image_xxx.png` to `beef steak.png`
4. Run `link-local-images.html` again to re-map

### Option 2: Use Firebase Storage Upload Tool
1. Open `upload-images.html` (the tool we created earlier)
2. Upload images directly to Firebase Storage
3. This gives you full control over which image goes to which dish

---

## 🌐 Deploying to Vercel

To make the images visible on your live website:

### Method 1: Push to GitHub (Recommended)
```bash
git add food-images/
git add link-local-images.html
git add menu.html
git commit -m "Add local food images"
git push
```
Vercel will automatically deploy the updated site with images.

### Method 2: Use Firebase Storage Instead
If you prefer cloud hosting for images:
1. Use `upload-images.html` to upload all images to Firebase Storage
2. This way images are hosted in the cloud, not in your repository
3. Better for large image collections

---

## 📊 Image Statistics

Based on your `food-images/` folder:

- **Starters**: 6 images
- **Eidam**: 8 images
- **Grills**: 7 images
- **Chinese**: 4 images
- **Seafood**: 6 images
- **Saudi Food**: 3 images
- **Rice**: 8 images
- **Karahi Station**: 4 images
- **Salad**: 3 images
- **BBQ**: 10 images (generic names)
- **Beverages**: 17 images (generic names)
- **Burger & Sandwiches**: 7 images (generic names)
- **Naan & Roti**: 8 images (generic names)
- **Pakistani Food**: 9 images (generic names)
- **Afghani Food**: 7 images (generic names)
- **Sweets**: 8 images (generic names)

**Total**: ~115 images

---

## ✨ Next Steps

1. **Run the linking tool** (`link-local-images.html`) to automatically link ~50 dishes
2. **Review unmatched dishes** and either:
   - Rename image files to match dish names
   - Or manually upload using `upload-images.html`
3. **Push to GitHub** to deploy images to your live website
4. **Test the menu** on both desktop and mobile

---

## 🆘 Troubleshooting

### Images not showing on menu?
- Make sure you clicked "Update Database" in `link-local-images.html`
- Check browser console for errors (F12 → Console tab)
- Verify image paths are correct (should start with `food-images/`)

### Some dishes still show emoji placeholders?
- These dishes don't have matched images yet
- Check the "No Image Found" count in the linking tool
- Rename image files to match dish names exactly

### Images not showing on Vercel?
- Make sure you pushed the `food-images/` folder to GitHub
- Check that the folder is not in `.gitignore`
- Vercel auto-deploys from GitHub, so push = deploy

---

## 📝 Summary

You now have:
- ✅ All food images copied to `food-images/` folder
- ✅ Automated image linking tool (`link-local-images.html`)
- ✅ Updated menu that displays local images
- ✅ ~50 dishes automatically mapped to images
- ✅ Ready to push to GitHub and deploy

**Next Action**: Open `link-local-images.html` and click "Update Database"!
