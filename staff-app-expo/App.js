import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxvxgkzALj5Mip7GHAJBK9SYnNm9qO0KI",
  authDomain: "alqaysar-menu.firebaseapp.com",
  databaseURL: "https://alqaysar-menu-default-rtdb.firebaseio.com",
  projectId: "alqaysar-menu",
  storageBucket: "alqaysar-menu.firebasestorage.app",
  messagingSenderId: "181160036262",
  appId: "1:181160036262:web:d26f2d2504b880807bb167",
  measurementId: "G-3ZTYG4EHMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Staff PIN
const STAFF_PIN = "1234"; // Change this to your secure PIN

function getPublicImagePath(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return path
    .replace(/^\/+/, "")
    .replace(/^food \//, "food-images/")
    .replace(/^food\//, "food-images/")
    .replace(/^food_compressed\//, "food-images/")
    .replace(/\.png$/i, ".jpg");
}

// Menu Data
const MENU = [
  { section: "Appetizers", items: [
    { id: "veg_salad", en: "Vegetable Salad", ar: "سلطة خضار", price: "6.00", image: "" },
    { id: "milk_cucumber", en: "Milk Cucumber", ar: "خيار لبن", price: "4.00", image: "" },
    { id: "hot_pepper", en: "Hot Pepper", ar: "شطة حار", price: "3.00", image: "" },
    { id: "green_chili", en: "Hot Green Chili Pepper", ar: "شطة أخضر حار", price: "3.00", image: "" },
    { id: "tahini", en: "Tahini", ar: "طحينة", price: "3.00", image: "" },
    { id: "rana_pepper", en: "Rana Hot Pepper", ar: "شطة رنا", price: "2.00", image: "" },
    { id: "chicken_wings", en: "Chicken Wings", ar: "أجنحة دجاج", price: "20.00", image: "food/starters/chicken wings.png" },
    { id: "chicken_spring", en: "Chicken Spring Roll", ar: "سبرينغ رول دجاج", price: "12.00", image: "food/starters/chciken spring roll.png" },
    { id: "veg_spring", en: "Vegetable Spring Roll", ar: "سبرينغ رول خضاروات", price: "8.00", image: "food/starters/vegetable spring roll.png" },
    { id: "prawn_spring", en: "Prawn Spring Roll", ar: "سبرينغ رول روبيان", price: "12.00", image: "food/starters/prawn spring roll.png" },
    { id: "fish_finger", en: "Fish Finger with Tartar Sauce", ar: "أصابع سمك مع صلصة", price: "12.00", image: "food/starters/fish finger .png" },
    { id: "butterfly_prawn", en: "Butterfly Tail Prawn", ar: "روبيان زيل الفراشة", price: "20.00", image: "food/starters/prawn tail.png" },
    { id: "french_fries", en: "French Fries", ar: "بطاطس مقلية", price: "5.00", image: "" },
  ]},
  { section: "Eidam (Stews)", items: [
    { id: "meat_stew", en: "Meat Stew", ar: "إيدام لحم", price: "", image: "food/eidam/meat stew.png" },
    { id: "musakhan_stew", en: "Musakhan Stew", ar: "إيدام مصقعة", price: "", image: "food/eidam/moshakan stew.png" },
    { id: "mixed_stew", en: "Mixed Stew", ar: "إيدام مشكل فرن", price: "", image: "food/eidam/mixed  stew.png" },
    { id: "mixed_veg_stew", en: "Mixed Vegetable Stew", ar: "إيدام مشكل خضار", price: "", image: "food/eidam/mixed veg stew.png" },
    { id: "potato_stew", en: "Potato Stew", ar: "إيدام بطاطس", price: "", image: "food/eidam/potato stew.png" },
    { id: "okra_stew", en: "Okra Stew", ar: "إيدام بامية", price: "", image: "food/eidam/okra stew.png" },
    { id: "pasta_stew", en: "Pasta Stew", ar: "إيدام مكرونة كبير", price: "8.00", image: "food/eidam/pasta stew.png" },
    { id: "molokhia_stew", en: "Molokhia Stew", ar: "إيدام ملوخية", price: "", image: "food/eidam/molokhia stew.png" },
    { id: "spicy_chicken_stew", en: "Spicy Chicken Stew", ar: "إيدام دجاج حار", price: "", image: "" },
    { id: "lentil_stew", en: "Lentil Stew", ar: "إيدام عدس", price: "", image: "" },
    { id: "bean_stew", en: "Bean Stew", ar: "إيدام فاصوليا", price: "", image: "" },
    { id: "cauliflower_stew", en: "Cauliflower Stew", ar: "إيدام زهرة", price: "", image: "" },
    { id: "spinach_stew", en: "Spinach Stew", ar: "إيدام سبانخ", price: "", image: "" },
    { id: "minced_meat", en: "Minced Meat", ar: "إيدام مفروم", price: "", image: "" },
  ]},
  { section: "Grills", items: [
    { id: "chicken_kebab_p", en: "Chicken Kebab (Person)", ar: "نفر كباب دجاج", price: "24.00", image: "food/grills/chicken kebab.png" },
    { id: "meat_kebab_p", en: "Meat Kebab (Person)", ar: "نفر كباب لحم", price: "27.00", image: "food/grills/meat kebab.png" },
    { id: "chicken_thighs", en: "Chicken Thighs", ar: "نفر أوصال دجاج", price: "27.00", image: "food/grills/chicken thighs.png" },
    { id: "shish_kebab", en: "Chicken Shish Kebab", ar: "نفر شيش طاووق", price: "27.00", image: "food/grills/chicken shish kebab.png" },
    { id: "chicken_kebab_sw", en: "Chicken Kebab Sandwich", ar: "ساندوتش كباب دجاج", price: "10.00", image: "food/grills/chicken kebab sandwich.png" },
    { id: "meat_kebab_sw", en: "Meat Kebab Sandwich", ar: "ساندوتش كباب لحم", price: "10.00", image: "food/grills/meat kebab sandwich.png" },
    { id: "platter_3", en: "Mixed Platter (3 Person)", ar: "طبق مشكل 3 أشخاص", price: "100.00", image: "food/grills/kebab plater.png" },
    { id: "platter_5", en: "Mixed Platter (5 Person)", ar: "طبق مشكل 5 أشخاص", price: "140.00", image: "food/grills/kebab plater.png" },
    { id: "platter_7", en: "Mixed Platter (7 Person)", ar: "طبق مشكل 7 أشخاص", price: "190.00", image: "food/grills/kebab plater.png" },
  ]},
  { section: "Chinese", items: [
    { id: "fried_rice", en: "Fried Rice", ar: "رز مقلي", price: "18.00", image: "food/chinease items/fried rice.png" },
    { id: "manchurian", en: "Chicken Manchurian", ar: "دجاج منشوريان", price: "20.00", image: "food/chinease items/chicken manchurian.png" },
    { id: "chow_mein", en: "Chow Mein / Noodles", ar: "نودلز تشاو مين", price: "18.00", image: "food/chinease items/noodles .png" },
    { id: "spring_rolls_cn", en: "Spring Rolls", ar: "سبرينغ رول", price: "8.00", image: "food/starters/chciken spring roll.png" },
    { id: "sweet_sour", en: "Sweet and Sour Chicken", ar: "دجاج حلو وحامض", price: "22.00", image: "food/chinease items/sweetand sour chicken.png" },
  ]},
  { section: "Sea Food", items: [
    { id: "fried_shrimp", en: "Fried Shrimp Meal", ar: "وجبة روبيان مقلي", price: "35.00", image: "food/seafood/fried shrimp meal.png" },
    { id: "grilled_shrimp", en: "Grilled Shrimp Meal", ar: "وجبة روبيان مشوي", price: "37.00", image: "food/seafood/grilled shrimp meal.png" },
    { id: "tandoori_prawn", en: "Tandoori Masala Prawn", ar: "روبيان تندوري ماسالا", price: "38.00", image: "food/seafood/tandoori masala prawn.png" },
    { id: "fried_fish", en: "Fried Fish Meal", ar: "وجبة سمك مقلي", price: "30.00", image: "food/seafood/fried fish meal.png" },
    { id: "grilled_fish", en: "Grilled Fish Meal", ar: "وجبة سمك مشوي", price: "32.00", image: "food/seafood/grilled fish meal.png" },
    { id: "tandoori_fish", en: "Tandoori Masala Fish", ar: "سمك تندوري ماسالا", price: "34.00", image: "food/seafood/tandoori masala fish.png" },
  ]},
  { section: "Saudi Food", items: [
    { id: "grilled_chicken_plain", en: "Grilled Chicken Plain", ar: "حبة دجاج شواية سادة", price: "", image: "food/saudi food/grilled chicken plain.png" },
    { id: "charcoal_chicken", en: "Chicken on Charcoal Plain", ar: "حبة دجاج على الفحم سادة", price: "", image: "food/saudi food/charcoal plain rice .png" },
    { id: "fried_chicken_plain", en: "Fried Chicken Plain", ar: "حبة دجاج مقلي سادة", price: "", image: "food/saudi food/fried chicken with rice .png" },
    { id: "half_grilled_chicken", en: "Half Grilled Chicken", ar: "نصف دجاخ شواية سادة", price: "", image: "food/saudi food/grilled chicken plain.png" },
    { id: "half_charcoal_chicken", en: "Half Chicken on Charcoal", ar: "نصف دجاخ على الفحم سادة", price: "", image: "food/saudi food/charcoal plain rice .png" },
  ]},
  { section: "Meat", items: [
    { id: "kabsa_half", en: "Meat Kabsa Half Person", ar: "نصف نفر كبسة لحم", price: "32.00", image: "food/meat/Kabsa.png" },
    { id: "kabsa_full", en: "Meat Kabsa Full Person", ar: "نفر كبسة لحم مع أرز", price: "64.00", image: "food/meat/Kabsa.png" },
  ]},
  { section: "Rice", items: [
    { id: "bukhari_rice", en: "Bukhari Rice (Person)", ar: "نفر أرز بخاري", price: "7.00", image: "food/Rice/bukhari rice .png" },
    { id: "peshawari_rice", en: "Peshawari Rice (Person)", ar: "نفر أرز بشاوري", price: "7.00", image: "food/Rice/peshawari rice.png" },
    { id: "kabuli_rice", en: "Kabuli Rice", ar: "نفر أرز كابلي", price: "8.00", image: "food/Rice/kabuli rice.png" },
    { id: "half_rice", en: "Half Person Rice", ar: "نص نفر أرز", price: "4.00", image: "food/Rice/plain rice.png" },
    { id: "chicken_biryani", en: "Chicken Biryani", ar: "برياني دجاج", price: "", image: "food/Rice/chicken biriyani.png" },
    { id: "chicken_fried_rice", en: "Chicken Fried Rice", ar: "أرز مقلي بالدجاج", price: "", image: "food/Rice/fried rice .png" },
    { id: "veg_rice", en: "Vegetable Rice", ar: "أرز بالخضار", price: "", image: "food/Rice/vegetable rice .png" },
    { id: "chinese_rice", en: "Chinese Rice", ar: "أرز صيني", price: "", image: "food/Rice/chinease rice .png" },
    { id: "beef_chilli_rice", en: "Beef Chilli Rice", ar: "أرز بالفلفل الحار واللحم", price: "", image: "" },
    { id: "steamed_rice_chicken", en: "Steamed Rice with Chicken", ar: "أرز على البخار مع أرز بالدجاج", price: "", image: "" },
    { id: "singaporean_rice", en: "Singaporean Rice", ar: "أرز سنغافوري", price: "", image: "" },
    { id: "steamed_rice", en: "Steamed Rice", ar: "أرز على البخار", price: "7.00", image: "food/Rice/plain rice.png" },
  ]},
  { section: "Karahi Station", items: [
    { id: "chicken_karahi_half", en: "Chicken Karahi Half", ar: "دجاج ساج نصف", price: "30.00", image: "food/karahi station/chicken karahi .png" },
    { id: "chicken_karahi_full", en: "Chicken Karahi Full", ar: "دجاج ساج كامل", price: "60.00", image: "food/karahi station/chicken karahi .png" },
    { id: "chicken_white_karahi", en: "Chicken White Karahi", ar: "دجاج ساج أبيض", price: "", image: "food/karahi station/chicken white karahi.png" },
    { id: "chicken_makhani", en: "Chicken Makhani Karahi", ar: "دجاج ساج بلزبدة", price: "", image: "food/karahi station/chicken marahi karahi.png" },
    { id: "chicken_namkeen", en: "Chicken Namkeen Karahi", ar: "دجاج ساج مملح", price: "", image: "food/karahi station/chicken namkeen karahi.png" },
    { id: "sulemani_karahi", en: "Sulemani Karahi", ar: "ساج سليماني", price: "", image: "food/karahi station/chicken karahi .png" },
    { id: "lamb_karahi", en: "Lamb Karahi", ar: "ساج لحم الضأن", price: "", image: "food/karahi station/chicken karahi .png" },
    { id: "achar_gosht", en: "Achar Gosht Karahi", ar: "ساج لحم بالأجار", price: "", image: "food/karahi station/chicken karahi .png" },
    { id: "peshawari_karahi", en: "Peshawari Karahi", ar: "ساج بشاوري", price: "", image: "food/karahi station/chicken karahi .png" },
    { id: "haleem_large", en: "Pakistani Haleem Large", ar: "حليم باكستاني كبير", price: "20.00", image: "" },
    { id: "haleem_small", en: "Pakistani Haleem Small", ar: "حليم باكستاني صغير", price: "12.00", image: "" },
  ]},
  { section: "BBQ", items: [
    { id: "chicken_tikka", en: "Chicken Tikka", ar: "چکن تكه", price: "", image: "food/bbq/Gemini_Generated_Image_nwkh72nwkh72nwkh.png" },
    { id: "seekh_beef_full", en: "Seekh Kabab Beef Full", ar: "سيخ كباب بيف", price: "", image: "food/bbq/Gemini_Generated_Image_rwkqocrwkqocrwkq.png" },
    { id: "chapli_beef", en: "Chapal Kabab Beef", ar: "چپل کباب بيف", price: "", image: "food/bbq/Gemini_Generated_Image_sdgs2bsdgs2bsdgs.png" },
    { id: "behari_boti", en: "Behari Boti", ar: "بہاری بوٹی", price: "", image: "food/bbq/Gemini_Generated_Image_stu7d7stu7d7stu7.png" },
    { id: "malai_boti", en: "Malai Boti", ar: "ملائی بوٹی", price: "", image: "food/bbq/Gemini_Generated_Image_vi185jvi185jvi18.png" },
    { id: "tikka_seekh", en: "Tikka Seekh Kabab", ar: "تکہ سیخ کباب", price: "", image: "food/bbq/Gemini_Generated_Image_ycpctwycpctwycpc.png" },
    { id: "mutton_seekh", en: "Mutton Seekh Kabab", ar: "مٹن سیخ کباب", price: "", image: "food/bbq/Gemini_Generated_Image_ygq8dfygq8dfygq8.png" },
    { id: "chicken_seekh", en: "Chicken Seekh Kabab", ar: "چکن سیخ کباب", price: "", image: "food/bbq/Gemini_Generated_Image_yp1w12yp1w12yp1w.png" },
    { id: "reshmi_kabab", en: "Reshmi Kabab", ar: "ریشمی کباب", price: "", image: "food/bbq/Gemini_Generated_Image_nwkh72nwkh72nwkh.png" },
    { id: "seekh_beef_half", en: "Seekh Kabab Beef Half", ar: "سيخ كباب بيف نصف", price: "", image: "food/bbq/Gemini_Generated_Image_rwkqocrwkqocrwkq.png" },
    { id: "shashlik_dry", en: "Chicken Shashlik Dry", ar: "شيش طاووق دجاج جاف", price: "", image: "food/bbq/Gemini_Generated_Image_stu7d7stu7d7stu7.png" },
    { id: "cheese_steak", en: "Cheese Steak", ar: "ستيك جبن", price: "22.00", image: "food/bbq/cheese steak.png" },
    { id: "onion_steak", en: "Onion Steak", ar: "ستيك بصل", price: "6.00", image: "food/bbq/onion steal.png" },
    { id: "pepper_steak", en: "Pepper Steak", ar: "ستيك فلفل", price: "6.00", image: "food/bbq/Gemini_Generated_Image_sdgs2bsdgs2bsdgs.png" },
    { id: "grilled_steak", en: "Grilled Steak", ar: "ستيك مشوي", price: "6.00", image: "food/bbq/Gemini_Generated_Image_vi185jvi185jvi18.png" },
    { id: "chicken_steak", en: "Chicken Steak", ar: "ستيك دجاج", price: "20.00", image: "food/bbq/Gemini_Generated_Image_ycpctwycpctwycpc.png" },
    { id: "chicken_italian", en: "Chicken Italian", ar: "دجاج إيطالي", price: "40.00", image: "food/bbq/Gemini_Generated_Image_ygq8dfygq8dfygq8.png" },
    { id: "mix_kabab_kg", en: "Mix Kabab (Kilo)", ar: "كيلو كباب مشكل", price: "", image: "food/bbq/Gemini_Generated_Image_yp1w12yp1w12yp1w.png" },
  ]},
  { section: "Pakistani Food", items: [
    { id: "shanwari_full", en: "Shanwari Karahi Full", ar: "شنواري ساج", price: "", image: "food/pakistani food/Gemini_Generated_Image_9o5es19o5es19o5e.png" },
    { id: "shanwari_namkeen", en: "Shanwari Namkeen Karahi", ar: "شنواري نمكين ساج", price: "", image: "food/pakistani food/Gemini_Generated_Image_ciso8uciso8uciso.png" },
    { id: "shanwari_special", en: "Shanwari Special Karahi", ar: "شنواري ساج خاص", price: "", image: "food/pakistani food/Gemini_Generated_Image_gsz6hcgsz6hcgsz6.png" },
    { id: "pk_chicken_namkeen", en: "Chicken Namkeen Karahi", ar: "دجاج نمكين ساج", price: "", image: "food/pakistani food/Gemini_Generated_Image_haqo4zhaqo4zhaqo.png" },
    { id: "pk_white_karahi", en: "Chicken White Karahi", ar: "قِشطه ساج", price: "", image: "food/pakistani food/Gemini_Generated_Image_hto25khto25khto2.png" },
    { id: "pk_chicken_seekh", en: "Chicken Seekh Kabab", ar: "ساج سيخ كباب", price: "", image: "food/pakistani food/Gemini_Generated_Image_lwuo7xlwuo7xlwuo.png" },
    { id: "daal_mash", en: "Daal Mash", ar: "دال ماش", price: "10.00", image: "food/pakistani food/Gemini_Generated_Image_px1vtzpx1vtzpx1v.png" },
    { id: "daal_chana", en: "Daal Chana", ar: "دال شنة", price: "10.00", image: "food/pakistani food/Gemini_Generated_Image_wo4bgswo4bgswo4b.png" },
    { id: "aloo_keema", en: "Aloo Keema", ar: "آلو قيمة", price: "", image: "food/pakistani food/Gemini_Generated_Image_zbumrazbumrazbum.png" },
    { id: "aloo_palak", en: "Aloo Palak", ar: "أرز بالخضار", price: "10.00", image: "food/pakistani food/Gemini_Generated_Image_9o5es19o5es19o5e.png" },
    { id: "mix_veg_pk", en: "Mix Vegetable", ar: "أرز صيني", price: "10.00", image: "food/pakistani food/Gemini_Generated_Image_ciso8uciso8uciso.png" },
    { id: "mutka_biryani_full", en: "Mutka Biryani Full", ar: "متكه برياني كامل", price: "64.00", image: "food/Rice/chicken biriyani.png" },
    { id: "mutka_biryani_quarter", en: "Mutka Biryani Quarter", ar: "متكه برياني ربع", price: "16.00", image: "food/Rice/chicken biriyani.png" },
    { id: "beef_biryani_kg", en: "Beef Biryani (Kilo)", ar: "بيف برياني كيلو", price: "74.00", image: "food/Rice/chicken biriyani.png" },
    { id: "beef_biryani_half", en: "Beef Biryani (Half Kilo)", ar: "بيف برياني نص كيلو", price: "37.00", image: "food/Rice/chicken biriyani.png" },
    { id: "beef_pulao_kg", en: "Beef Pulao (Kilo)", ar: "بيف پلو كيلو", price: "70.00", image: "food/Rice/kabuli rice.png" },
    { id: "beef_pulao_half", en: "Beef Pulao (Half Kilo)", ar: "بيف پلو نص كيلو", price: "35.00", image: "food/Rice/kabuli rice.png" },
    { id: "mutka_biryani_half", en: "Mutka Biryani Half", ar: "متكه برياني نص", price: "32.00", image: "food/Rice/chicken biriyani.png" },
  ]},
  { section: "Salads", items: [
    { id: "fresh_salad", en: "Fresh Salad", ar: "سلطة طازجة", price: "7.00", image: "food/salad/fresh salad.png" },
    { id: "russian_salad", en: "Russian Salad", ar: "سلطة روسية", price: "12.00", image: "food/salad/russain salad.png" },
    { id: "raita", en: "Raita", ar: "رايتا", price: "5.00", image: "food/salad/raita.png" },
    { id: "veg_basket", en: "Vegetable Basket", ar: "سلة خضار", price: "7.00", image: "food/salad/fresh salad.png" },
  ]},
  { section: "Burgers & Sandwiches", items: [
    { id: "cheese_sandwich", en: "Cheese Sandwich", ar: "ساندويتش جبنة", price: "4.00", image: "food/burger and sanwiches/Gemini_Generated_Image_sqewmhsqewmhsqew.png" },
    { id: "club_sandwich", en: "Club Sandwich", ar: "ساندويتش كلوب", price: "4.00", image: "food/burger and sanwiches/Gemini_Generated_Image_tmxkrhtmxkrhtmxk.png" },
    { id: "chicken_sandwich", en: "Chicken Sandwich", ar: "ساندويتش دجاج", price: "4.00", image: "food/burger and sanwiches/Gemini_Generated_Image_uzza9xuzza9xuzza.png" },
    { id: "cheese_burger", en: "Cheese Burger", ar: "تشيز برجر", price: "8.00", image: "food/burger and sanwiches/Gemini_Generated_Image_2814382814382814.png" },
    { id: "chicken_burger", en: "Chicken Burger", ar: "برجر دجاج", price: "7.00", image: "food/burger and sanwiches/Gemini_Generated_Image_4yb87g4yb87g4yb8.png" },
    { id: "beef_burger", en: "Beef Burger", ar: "برجر لحم", price: "8.00", image: "food/burger and sanwiches/Gemini_Generated_Image_vir5ivir5ivir5iv.png" },
    { id: "shami_kabab_sw", en: "Shami Kabab", ar: "شامي كباب", price: "10.00", image: "food/burger and sanwiches/Gemini_Generated_Image_vkjxdovkjxdovkjx.png" },
  ]},
  { section: "Afghani Food", items: [
    { id: "kabuli_pulao", en: "Kabuli Pulao Simple", ar: "كابلي پالؤ ساده", price: "", image: "food/afghani food/Gemini_Generated_Image_1wvlmf1wvlmf1wvl.png" },
    { id: "afghani_kabab", en: "Afghani Kabab Boti", ar: "كباب بوتي أفغاني", price: "", image: "food/afghani food/Gemini_Generated_Image_1yq8kg1yq8kg1yq8.png" },
    { id: "afghani_achar", en: "Afghani Achar Karahi", ar: "كراهي آچار أفغاني", price: "", image: "food/afghani food/Gemini_Generated_Image_4iocpe4iocpe4ioc.png" },
    { id: "mantu", en: "Mantu", ar: "منتو", price: "", image: "food/afghani food/Gemini_Generated_Image_c2kw85c2kw85c2kw.png" },
    { id: "uzbek_pulao", en: "Uzbek Pulao", ar: "اوزبكي پلاؤ", price: "", image: "food/afghani food/Gemini_Generated_Image_fj95j0fj95j0fj95.png" },
    { id: "rosht_pulao", en: "Rosht Namkeen Pulao", ar: "روشت نمکین پلاو", price: "", image: "food/afghani food/Gemini_Generated_Image_qrwyxiqrwyxiqrwy.png" },
    { id: "kofta_kabab", en: "Kofta Kabab", ar: "کوفته کباب", price: "", image: "food/afghani food/Gemini_Generated_Image_u5ldpru5ldpru5ld.png" },
    { id: "raishmi_kabab", en: "Raishmi Kabab", ar: "ریشمی کباب", price: "", image: "food/afghani food/Gemini_Generated_Image_1yq8kg1yq8kg1yq8.png" },
    { id: "shami_kabab_af", en: "Shami Kabab", ar: "شامی کباب", price: "", image: "food/afghani food/Gemini_Generated_Image_4iocpe4iocpe4ioc.png" },
    { id: "chicken_kabab_af", en: "Chicken Kabab", ar: "كباب دجاج", price: "", image: "food/afghani food/Gemini_Generated_Image_c2kw85c2kw85c2kw.png" },
    { id: "awsal_chicken", en: "Awsal Chicken", ar: "دجاج اوصال", price: "", image: "food/afghani food/Gemini_Generated_Image_fj95j0fj95j0fj95.png" },
    { id: "chapli_kabab_af", en: "Chapli Kabab", ar: "چپلی کباب", price: "", image: "food/afghani food/Gemini_Generated_Image_qrwyxiqrwyxiqrwy.png" },
    { id: "ash_soup", en: "Ash Soup", ar: "آش سوپ", price: "", image: "food/afghani food/Gemini_Generated_Image_u5ldpru5ldpru5ld.png" },
    { id: "karahi_shinwari", en: "Karahi Shinwari", ar: "كراهي شنواري", price: "", image: "food/afghani food/Gemini_Generated_Image_1wvlmf1wvlmf1wvl.png" },
    { id: "afghani_chaat", en: "Afghani Chaat", ar: "افغانی چاٹ", price: "", image: "food/afghani food/Gemini_Generated_Image_1yq8kg1yq8kg1yq8.png" },
  ]},
  { section: "Naan & Roti", items: [
    { id: "roghni_naan", en: "Roghni Naan", ar: "رغنى نان", price: "3.00", image: "food/naan roti/Gemini_Generated_Image_33kpmi33kpmi33kp.png" },
    { id: "kulcha_naan", en: "Kulcha Naan", ar: "کلچہ نان", price: "3.00", image: "food/naan roti/Gemini_Generated_Image_4gn6x44gn6x44gn6.png" },
    { id: "garlic_naan", en: "Garlic Naan", ar: "گارلك نان", price: "3.00", image: "food/naan roti/Gemini_Generated_Image_6yl82b6yl82b6yl8.png" },
    { id: "tandoori_paratha", en: "Tandoori Paratha", ar: "تندوری پراٹھا", price: "2.00", image: "food/naan roti/Gemini_Generated_Image_9lms9d9lms9d9lms.png" },
    { id: "afghani_naan", en: "Afghani Naan", ar: "افغانی نان", price: "2.00", image: "food/naan roti/Gemini_Generated_Image_mfbj7ymfbj7ymfbj.png" },
    { id: "sadaa_naan", en: "Sadaa Naan (Plain)", ar: "ساده نان", price: "1.00", image: "food/naan roti/Gemini_Generated_Image_t626sot626sot626.png" },
    { id: "khameeri_roti", en: "Khameeri Roti", ar: "خمیری روٹی", price: "1.00", image: "food/naan roti/Gemini_Generated_Image_veqbf2veqbf2veqb.png" },
    { id: "chicken_cheese_naan", en: "Chicken Cheese Naan", ar: "نان دجاج بالجبن", price: "7.00", image: "food/naan roti/Gemini_Generated_Image_w80oorw80oorw80o.png" },
  ]},
  { section: "Beverages", items: [
    { id: "sweet_lassi", en: "Sweet & Saltish Lassi", ar: "لاسي حلو ومالح", price: "8.00", image: "food/beverages/Gemini_Generated_Image_6vsf1z6vsf1z6vsf.png" },
    { id: "mango_lassi", en: "Mango Lassi", ar: "لاسي مانجو", price: "8.00", image: "food/beverages/Gemini_Generated_Image_7f9nmo7f9nmo7f9n.png" },
    { id: "lemonade", en: "Lemonade", ar: "عصير ليمون", price: "6.00", image: "food/beverages/Gemini_Generated_Image_83pn1183pn1183pn.png" },
    { id: "fresh_lime", en: "Fresh Lime Juice", ar: "عصير ليمون طازج", price: "6.00", image: "food/beverages/Gemini_Generated_Image_eof1fdeof1fdeof1.png" },
    { id: "seasonal_juice", en: "Fresh Seasonal Juice", ar: "عصير موسمية طازج", price: "7.00", image: "food/beverages/Gemini_Generated_Image_eukgc3eukgc3eukg.png" },
    { id: "pink_tea", en: "Pink Tea (Kashmiri)", ar: "شاي كشميري", price: "3.00", image: "food/beverages/Gemini_Generated_Image_iyonxjiyonxjiyon.png" },
    { id: "peach_ice_tea", en: "Peach Ice Tea", ar: "شاي مثلج بالخوخ", price: "3.00", image: "food/beverages/Gemini_Generated_Image_k16v7kk16v7kk16v.png" },
    { id: "doodh_pati", en: "Doodh Pati", ar: "دود باتي", price: "3.00", image: "food/beverages/Gemini_Generated_Image_mv6czlmv6czlmv6c.png" },
    { id: "mango_juice", en: "Mango Juice", ar: "مانجو", price: "", image: "food/beverages/Gemini_Generated_Image_nro2t3nro2t3nro2.png" },
    { id: "strawberry_juice", en: "Strawberry Juice", ar: "فراولة", price: "13.00", image: "food/beverages/Gemini_Generated_Image_pfo93mpfo93mpfo9.png" },
    { id: "guava_juice", en: "Guava Juice", ar: "جوافة", price: "", image: "food/beverages/Gemini_Generated_Image_qef6f3qef6f3qef6.png" },
    { id: "orange_juice", en: "Orange Juice", ar: "برتقال", price: "12.00", image: "food/beverages/Gemini_Generated_Image_qktmeoqktmeoqktm.png" },
    { id: "banana_juice", en: "Banana Juice", ar: "موز", price: "13.00", image: "food/beverages/Gemini_Generated_Image_rceb8crceb8crceb.png" },
    { id: "kiwi_juice", en: "Kiwi Juice", ar: "كيوي", price: "14.00", image: "food/beverages/Gemini_Generated_Image_tplzlztplzlztplz.png" },
    { id: "avocado_honey", en: "Avocado (Honey-Nuts)", ar: "أفوكادو (عسل-مكسرات)", price: "14.00", image: "food/beverages/Gemini_Generated_Image_ueok1cueok1cueok.png" },
    { id: "watermelon_juice", en: "Watermelon Juice", ar: "بطيخ", price: "14.00", image: "food/beverages/Gemini_Generated_Image_xd57fpxd57fpxd57.png" },
    { id: "pineapple_juice", en: "Pineapple Juice", ar: "أناناس", price: "14.00", image: "food/beverages/Gemini_Generated_Image_6vsf1z6vsf1z6vsf.png" },
    { id: "lemon_mint", en: "Lemon Mint", ar: "ليمون نعناع", price: "10.00", image: "food/beverages/Gemini_Generated_Image_83pn1183pn1183pn.png" },
    { id: "pinky_rose", en: "Pinky Rose", ar: "بينكي روز", price: "18.00", image: "food/beverages/Gemini_Generated_Image_iyonxjiyonxjiyon.png" },
    { id: "banana_nuts", en: "Banana with Nuts", ar: "موز بالمكسرات", price: "18.00", image: "food/beverages/Gemini_Generated_Image_rceb8crceb8crceb.png" },
    { id: "power_gal", en: "Power Gal", ar: "باور الجال", price: "18.00", image: "food/beverages/Gemini_Generated_Image_eukgc3eukgc3eukg.png" },
    { id: "avocado_mango", en: "Avocado with Mango", ar: "أفوكادو المانجو", price: "16.00", image: "food/beverages/Gemini_Generated_Image_ueok1cueok1cueok.png" },
    { id: "lavender_lemon", en: "Lavender Lemon", ar: "لافندر ليمون", price: "16.00", image: "food/beverages/Gemini_Generated_Image_tplzlztplzlztplz.png" },
    { id: "simple_chai", en: "Simple Chai", ar: "سادہ چائے", price: "2.00", image: "food/beverages/Gemini_Generated_Image_mv6czlmv6czlmv6c.png" },
    { id: "sparkling_water", en: "Sparkling Water", ar: "مياه غازية", price: "3.00", image: "food/beverages/Gemini_Generated_Image_7f9nmo7f9nmo7f9n.png" },
    { id: "water", en: "Water", ar: "ماء", price: "1.00", image: "food/beverages/Gemini_Generated_Image_7f9nmo7f9nmo7f9n.png" },
  ]},
  { section: "Sweets & Desserts", items: [
    { id: "kulfa", en: "Kulfa Ice Cream", ar: "كلفي", price: "", image: "food/sweets/Gemini_Generated_Image_3v3uvg3v3uvg3v3u.png" },
    { id: "choc_icecream", en: "Chocolate Ice Cream", ar: "شوكولاتة", price: "", image: "food/sweets/Gemini_Generated_Image_4ub64q4ub64q4ub6.png" },
    { id: "strawberry_icecream", en: "Strawberry Ice Cream", ar: "فراولة", price: "", image: "food/sweets/Gemini_Generated_Image_7ecx2j7ecx2j7ecx.png" },
    { id: "vanilla_icecream", en: "Vanilla Ice Cream", ar: "فانيليا", price: "", image: "food/sweets/Gemini_Generated_Image_dbyi8adbyi8adbyi.png" },
    { id: "tutti_frutti", en: "Tutti Frutti Ice Cream", ar: "فواكه مشكلة", price: "12.00", image: "food/sweets/Gemini_Generated_Image_hbwxu7hbwxu7hbwx.png" },
    { id: "pineapple_sundae", en: "Pineapple Sundae", ar: "صنداي أناناس", price: "14.00", image: "food/sweets/Gemini_Generated_Image_o95q9wo95q9wo95q.png" },
    { id: "pistachio_icecream", en: "Pistachio Ice Cream", ar: "فستق", price: "", image: "food/sweets/Gemini_Generated_Image_trc8atrc8atrc8at.png" },
    { id: "custard", en: "Custard", ar: "كاسترد", price: "6.00", image: "food/sweets/Gemini_Generated_Image_lxx0xplxx0xplxx0 (1).png" },
  ]},
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [selected, setSelected] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Check if already logged in
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Load menu from Firebase
  useEffect(() => {
    if (isLoggedIn) {
      loadFromFirebase();
    }
  }, [isLoggedIn]);

  const checkLoginStatus = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (loggedIn === 'true') {
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.error('Error checking login status:', e);
    }
  };

  const loadFromFirebase = () => {
    setLoading(true);
    const menuRef = ref(database, 'menu/available');
    onValue(menuRef, (snapshot) => {
      const data = snapshot.val() || {};
      setSelected(data);
      setLoading(false);
    });
  };

  const handleLogin = async () => {
    if (pin === STAFF_PIN) {
      setIsLoggedIn(true);
      setError('');
      await AsyncStorage.setItem('isLoggedIn', 'true');
    } else {
      setError('Incorrect PIN. Try again.');
    }
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setPin('');
    await AsyncStorage.removeItem('isLoggedIn');
  };

  const toggleDish = (dishId) => {
    setSelected(prev => {
      const newSelected = { ...prev };
      if (newSelected[dishId]) {
        delete newSelected[dishId];
      } else {
        newSelected[dishId] = true;
      }
      return newSelected;
    });
  };

  const selectAllInSection = (section) => {
    setSelected(prev => {
      const newSelected = { ...prev };
      section.items.forEach(item => {
        newSelected[item.id] = true;
      });
      return newSelected;
    });
  };

  const deselectAllInSection = (section) => {
    setSelected(prev => {
      const newSelected = { ...prev };
      section.items.forEach(item => {
        delete newSelected[item.id];
      });
      return newSelected;
    });
  };

  const saveMenu = async () => {
    setSaving(true);
    
    // Build full dish data
    const menuData = {};
    MENU.forEach(section => {
      section.items.forEach(item => {
        if (selected[item.id]) {
          menuData[item.id] = {
            en: item.en,
            ar: item.ar,
            price: item.price,
            section: section.section,
            imageUrl: getPublicImagePath(item.image)
          };
        }
      });
    });

    try {
      const menuRef = ref(database, 'menu');
      await set(menuRef, {
        available: selected,
        dishes: menuData,
        updatedAt: new Date().toISOString()
      });
      
      Alert.alert('Success', 'Menu updated! Guests can see the changes now.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save menu. Please try again.');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const getSelectedCount = () => {
    return Object.keys(selected).length;
  };

  const filterDishes = (items) => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item => 
      item.en.toLowerCase().includes(query) || 
      item.ar.includes(query)
    );
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loginContainer}>
          <View style={styles.loginCard}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>AQ</Text>
            </View>
            <Text style={styles.loginTitle}>Al Qaysar</Text>
            <Text style={styles.loginSubtitle}>Staff access — menu manager</Text>
            
            <TextInput
              style={styles.pinInput}
              placeholder="Enter staff PIN"
              value={pin}
              onChangeText={setPin}
              secureTextEntry
              keyboardType="number-pad"
              maxLength={10}
              onSubmitEditing={handleLogin}
            />
            
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Sign in</Text>
            </TouchableOpacity>
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Main App Screen
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.topBarTitle}>Menu Manager</Text>
          <Text style={styles.topBarDate}>
            {new Date().toLocaleDateString('en-SA', { weekday:'long', day:'numeric', month:'long' })}
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Save Bar */}
      <View style={styles.saveBar}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <TouchableOpacity 
            style={[styles.saveButton, saving && styles.saveButtonDisabled]} 
            onPress={saveMenu}
            disabled={saving}
          >
            <Text style={styles.saveButtonText}>
              {saving ? 'Saving...' : 'Update guest menu'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.countPill}>
          <Text style={styles.countPillText}>
            {getSelectedCount()} dish{getSelectedCount() !== 1 ? 'es' : ''} on
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search dishes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Menu List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1a1a1a" />
          <Text style={styles.loadingText}>Loading menu...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {MENU.map((section, sectionIndex) => {
            const filteredItems = filterDishes(section.items);
            if (filteredItems.length === 0) return null;

            return (
              <View key={sectionIndex}>
                <Text style={styles.sectionHeader}>{section.section}</Text>
                
                <View style={styles.selectAllRow}>
                  <TouchableOpacity 
                    style={[styles.miniButton, { marginRight: 8 }]}
                    onPress={() => selectAllInSection(section)}
                  >
                    <Text style={styles.miniButtonText}>All on</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.miniButton}
                    onPress={() => deselectAllInSection(section)}
                  >
                    <Text style={styles.miniButtonText}>All off</Text>
                  </TouchableOpacity>
                </View>

                {filteredItems.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.dishRow,
                      selected[item.id] && styles.dishRowSelected
                    ]}
                    onPress={() => toggleDish(item.id)}
                  >
                    <View style={[
                      styles.checkbox,
                      selected[item.id] && styles.checkboxSelected,
                      { marginRight: 12 }
                    ]}>
                      {selected[item.id] && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                    
                    <View style={styles.dishInfo}>
                      <Text style={styles.dishName}>{item.en}</Text>
                      <Text style={styles.dishNameAr}>{item.ar}</Text>
                    </View>
                    
                    {item.price && (
                      <Text style={styles.dishPrice}>{item.price} ر.س</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            );
          })}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f4f0',
  },
  
  // Login Styles
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loginCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e3dc',
    padding: 36,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#c8a96e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f0f0f',
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  loginSubtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 24,
  },
  pinInput: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 15,
    marginBottom: 12,
  },
  loginButton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  errorText: {
    color: '#c0392b',
    fontSize: 13,
    marginTop: 8,
  },

  // Top Bar
  topBar: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e3dc',
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  topBarDate: {
    fontSize: 12,
    color: '#888',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  logoutButtonText: {
    fontSize: 12,
    color: '#888',
  },

  // Save Bar
  saveBar: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e3dc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    padding: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  countPill: {
    backgroundColor: '#f0ede8',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  countPillText: {
    fontSize: 12,
    color: '#555',
  },

  // Search Bar
  searchBar: {
    padding: 10,
    backgroundColor: '#f5f4f0',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 14,
  },

  // Menu List
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    padding: 14,
    fontSize: 11,
    fontWeight: '600',
    color: '#888',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    backgroundColor: '#f5f4f0',
  },
  selectAllRow: {
    flexDirection: 'row',
    padding: 6,
    paddingHorizontal: 16,
    backgroundColor: '#f5f4f0',
  },
  miniButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  miniButtonText: {
    fontSize: 11,
    color: '#555',
  },
  dishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0ede8',
  },
  dishRowSelected: {
    backgroundColor: '#f0faf5',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#27ae60',
    borderColor: '#27ae60',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  dishNameAr: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  dishPrice: {
    fontSize: 13,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#555',
  },
});
