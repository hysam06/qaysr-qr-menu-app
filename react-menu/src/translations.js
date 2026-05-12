export const TRANSLATIONS = {
  en: {
    navName: 'Al Qaysar', navSub: 'Restaurant', navHours: '🕐 Open 24 Hours',
    heroWelcome: 'Welcome', heroTitle: 'Our Menu',
    heroSubtitle: 'Lovingly prepared dishes using the finest ingredients, crafted for your perfect dining experience.',
    searchPlaceholder: 'Search dishes...',
    decoHours: 'Hours Open', decoCats: 'Categories', decoDishes: 'Dishes', decoRating: 'Rating',
    barName: 'Al Qaysar Restaurant', barSub: 'Open 24 Hours · Duba, Saudi Arabia', barBtn: 'Call Us',
    loading: 'Loading menu...', noMenu: 'Menu not available yet', noMenuSub: 'Please check back shortly or ask our staff.',
    noResults: 'No dishes found', noResultsSub: 'Try a different category or search term.',
    askStaff: 'Ask staff', askStaffModal: 'Ask staff for price',
    catShort: {
      "All":"All","Appetizers":"Starters","Eidam (Stews)":"Stews","Grills":"Grills",
      "Chinese":"Chinese","Sea Food":"Sea Food","Saudi Food":"Saudi","Meat":"Meat",
      "Rice":"Rice","Karahi Station":"Karahi","BBQ":"BBQ","Pakistani Food":"Pakistani",
      "Afghani Food":"Afghani","Salads":"Salads","Burgers & Sandwiches":"Burgers",
      "Naan & Roti":"Naan","Beverages":"Drinks","Sweets & Desserts":"Sweets"
    },
    dishDesc: (name, section) => `Delicious ${name} from our ${section} menu. Ask our staff for more details.`
  },
  ar: {
    navName: 'القيصر', navSub: 'مطعم', navHours: '🕐 مفتوح ٢٤ ساعة',
    heroWelcome: 'أهلاً وسهلاً', heroTitle: 'قائمة الطعام',
    heroSubtitle: 'أطباق مُعدَّة بعناية من أجود المكونات، لتجربة طعام لا تُنسى.',
    searchPlaceholder: 'ابحث عن الأطباق...',
    decoHours: 'ساعة مفتوح', decoCats: 'تصنيف', decoDishes: 'طبق', decoRating: 'التقييم',
    barName: 'مطعم القيصر', barSub: 'مفتوح ٢٤ ساعة · ضبا، المملكة العربية السعودية', barBtn: 'اتصل بنا',
    loading: 'جارٍ تحميل القائمة...', noMenu: 'القائمة غير متاحة حالياً', noMenuSub: 'يرجى المراجعة لاحقاً أو سؤال الموظفين.',
    noResults: 'لا توجد أطباق', noResultsSub: 'جرّب تصنيفاً أو كلمة بحث مختلفة.',
    askStaff: 'اسأل الموظف', askStaffModal: 'اسأل الموظف عن السعر',
    catShort: {
      "All":"الكل","Appetizers":"المقبلات","Eidam (Stews)":"الإدام","Grills":"المشويات",
      "Chinese":"صيني","Sea Food":"مأكولات بحرية","Saudi Food":"سعودي","Meat":"لحوم",
      "Rice":"أرز","Karahi Station":"كراهي","BBQ":"باربيكيو","Pakistani Food":"باكستاني",
      "Afghani Food":"أفغاني","Salads":"سلطات","Burgers & Sandwiches":"برغر وسندويش",
      "Naan & Roti":"خبز","Beverages":"مشروبات","Sweets & Desserts":"حلويات"
    },
    dishDesc: (name, section) => `${name} من قسم ${section}. اسأل موظفينا لمزيد من التفاصيل.`
  }
};

export const CATEGORY_ICONS = {
  "All": "🍽️", "Appetizers": "🥗", "Eidam (Stews)": "🍲",
  "Grills": "🍖", "Chinese": "🥡", "Sea Food": "🦐",
  "Saudi Food": "🍛", "Meat": "🥩", "Rice": "🍚",
  "Karahi Station": "🍳", "BBQ": "🍢", "Pakistani Food": "🫕",
  "Afghani Food": "🫓", "Salads": "🥗", "Burgers & Sandwiches": "🍔",
  "Naan & Roti": "🫓", "Beverages": "🥤", "Sweets & Desserts": "🍰"
};

export const SECTION_ORDER = [
  "All","Appetizers","Eidam (Stews)","Grills","Chinese","Sea Food",
  "Saudi Food","Meat","Rice","Karahi Station","BBQ",
  "Pakistani Food","Afghani Food","Salads","Burgers & Sandwiches",
  "Naan & Roti","Beverages","Sweets & Desserts"
];
