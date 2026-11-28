/**
 * ============================================================================
 * ملف الإعدادات الرئيسي لموقع كافيه ليالينا (Layalina Café)
 * ============================================================================
 * يمكن تعديل جميع بيانات الكافيه، أرقام التواصل، العنوان، وأسعار المنيو
 * من خلال هذا الملف فقط دون الحاجة لتعديل الكود البرمجي.
 */

const SITE_CONFIG = {
  // بيانات العلامة التجارية والمالك
  BRAND: {
    nameAr: "ليالينا",
    fullNameAr: "ليالينا كافيه",
    nameEn: "LAYALINA",
    fullNameEn: "Layalina Café",
    taglineAr: "حيث يلتقي عبق القهوة بسحر الليالي",
    taglineEn: "Artisanal Coffee & Timeless Nights",
    ownerAr: "أحمد ريان",
    ownerEn: "Ahmed Rayan",
    year: 2026,
  },

  // بيانات التواصل والموقع
  CONTACT: {
    // رقم الهاتف المحلي للعرض والاتصال المباشر
    PHONE: "01200706533",
    PHONE_LINK: "tel:+201200706533",

    // رقم الواتساب بالصيغة الدولية (بدون + أو أصفار بادئة)
    WHATSAPP: "201200706533",

    // العنوان (مؤكد من العميل 2026-11-28)
    ADDRESS: "قليوب أمام المركز الطبي",

    // استعلام خرائط جوجل
    GOOGLE_MAPS_QUERY: "قليوب أمام المركز الطبي",
    GOOGLE_MAPS_EMBED: "https://www.google.com/maps?q=%D9%82%D9%84%D9%8A%D9%88%D8%A8+%D8%A7%D9%85%D8%A7%D9%85+%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2+%D8%A7%D9%84%D8%B7%D8%A8%D9%8A&output=embed",

    // مواعيد العمل (قابلة للتعديل)
    HOURS_SHORT: "9ص - 2ص",
    HOURS_FULL: "يومياً من 9:00 صباحاً حتى 2:00 بعد منتصف الليل",

    // روابط التواصل الاجتماعي (روابط استرشادية قابلة للتعديل)
    SOCIAL: {
      instagram: "#contact",
      facebook: "#contact",
      tiktok: "#contact",
    },
  },

  // إعدادات المنيو والعملة
  MENU_META: {
    currencyAr: "ج.م",
    currencyEn: "EGP",
    priceNoteAr: "أسعار استرشادية قابلة للتعديل",
  },

  // أقسام المنيو والأصناف الكاملة
  // كل صنف يحتوي على: id, nameAr, nameEn, price, visualType, color (لون تعبيري للرسم)
  MENU_CATEGORIES: [
    {
      id: "hot-coffee",
      nameAr: "القهوة الساخنة",
      nameEn: "Hot Coffee",
      visual: "hot-coffee",
      items: [
        { id: "hc-espresso", nameAr: "إسبريسو", nameEn: "Espresso", price: 30, color: "#3d1e0d" },
        { id: "hc-double-espresso", nameAr: "دبل إسبريسو", nameEn: "Double Espresso", price: 40, color: "#2b1307" },
        { id: "hc-americano", nameAr: "أمريكانو", nameEn: "Americano", price: 40, color: "#4a2511" },
        { id: "hc-cappuccino", nameAr: "كابتشينو", nameEn: "Cappuccino", price: 50, color: "#a46b3e" },
        { id: "hc-latte", nameAr: "لاتيه", nameEn: "Latte", price: 55, color: "#c58f5c" },
        { id: "hc-mocha", nameAr: "موكا", nameEn: "Mocha", price: 60, color: "#5c331c" },
        { id: "hc-turkish", nameAr: "قهوة تركي", nameEn: "Turkish Coffee", price: 30, color: "#361a0c" },
        { id: "hc-nescafe", nameAr: "نسكافيه", nameEn: "Nescafé", price: 35, color: "#9c683e" },
      ],
    },
    {
      id: "iced-coffee",
      nameAr: "القهوة المثلجة",
      nameEn: "Iced Coffee",
      visual: "iced-coffee",
      items: [
        { id: "ic-americano", nameAr: "آيس أمريكانو", nameEn: "Iced Americano", price: 45, color: "#3b1c0c" },
        { id: "ic-latte", nameAr: "آيس لاتيه", nameEn: "Iced Latte", price: 50, color: "#b98454" },
        { id: "ic-spanish", nameAr: "آيس سبانش لاتيه", nameEn: "Iced Spanish Latte", price: 65, color: "#d49b63" },
        { id: "ic-mocha", nameAr: "آيس موكا", nameEn: "Iced Mocha", price: 60, color: "#5e321a" },
        { id: "ic-caramel", nameAr: "آيس كراميل ماكياتو", nameEn: "Iced Caramel Macchiato", price: 65, color: "#c97e38" },
        { id: "ic-vanilla", nameAr: "آيس فانيليا لاتيه", nameEn: "Iced Vanilla Latte", price: 60, color: "#d6ad7c" },
        { id: "ic-cold-brew", nameAr: "كولد برو", nameEn: "Cold Brew", price: 55, color: "#2b1409" },
      ],
    },
    {
      id: "hot-drinks",
      nameAr: "المشروبات الساخنة",
      nameEn: "Hot Drinks",
      visual: "hot-drink",
      items: [
        { id: "hd-egyptian-tea", nameAr: "شاي مصري", nameEn: "Egyptian Tea", price: 20, color: "#8c2b12" },
        { id: "hd-green-tea", nameAr: "شاي أخضر", nameEn: "Green Tea", price: 25, color: "#6a8a3e" },
        { id: "hd-anise", nameAr: "يانسون", nameEn: "Anise", price: 25, color: "#c89b3c" },
        { id: "hd-mint", nameAr: "نعناع", nameEn: "Mint", price: 25, color: "#4c8c4a" },
        { id: "hd-hot-choc", nameAr: "هوت شوكليت", nameEn: "Hot Chocolate", price: 45, color: "#4a2314" },
        { id: "hd-cinnamon", nameAr: "قرفة", nameEn: "Cinnamon", price: 25, color: "#914521" },
        { id: "hd-ginger", nameAr: "جنزبيل", nameEn: "Ginger", price: 25, color: "#d29d3a" },
      ],
    },
    {
      id: "iced-drinks",
      nameAr: "المشروبات المثلجة",
      nameEn: "Iced Drinks",
      visual: "iced-drink",
      items: [
        { id: "id-peach-tea", nameAr: "آيس تي خوخ", nameEn: "Iced Tea Peach", price: 35, color: "#d97a41" },
        { id: "id-lemon-tea", nameAr: "آيس تي ليمون", nameEn: "Iced Tea Lemon", price: 35, color: "#c99a32" },
        { id: "id-iced-choc", nameAr: "آيس شوكليت", nameEn: "Iced Chocolate", price: 50, color: "#522816" },
        { id: "id-matcha", nameAr: "آيس ماتشا لاتيه", nameEn: "Iced Matcha Latte", price: 65, color: "#5c8d45" },
      ],
    },
    {
      id: "mojito",
      nameAr: "الموهيتو",
      nameEn: "Mojito",
      visual: "mojito",
      items: [
        { id: "mj-classic", nameAr: "كلاسيك موهيتو", nameEn: "Classic Mojito", price: 50, color: "#65b368" },
        { id: "mj-blue", nameAr: "بلو موهيتو", nameEn: "Blue Mojito", price: 55, color: "#2d8fd5" },
        { id: "mj-strawberry", nameAr: "موهيتو فراولة", nameEn: "Strawberry Mojito", price: 55, color: "#cf3a4a" },
        { id: "mj-passion", nameAr: "موهيتو باشن فروت", nameEn: "Passion Fruit Mojito", price: 60, color: "#e39c2b" },
        { id: "mj-lemon-mint", nameAr: "موهيتو ليمون نعناع", nameEn: "Lemon Mint Mojito", price: 50, color: "#7cc255" },
      ],
    },
    {
      id: "fresh-juices",
      nameAr: "العصائر الطازجة",
      nameEn: "Fresh Juices",
      visual: "juice",
      items: [
        { id: "fj-orange", nameAr: "عصير برتقال", nameEn: "Orange", price: 40, color: "#e67e22" },
        { id: "fj-mango", nameAr: "عصير مانجو", nameEn: "Mango", price: 50, color: "#f39c12" },
        { id: "fj-strawberry", nameAr: "عصير فراولة", nameEn: "Strawberry", price: 45, color: "#c0392b" },
        { id: "fj-guava", nameAr: "عصير جوافة", nameEn: "Guava", price: 40, color: "#d8cfa8" },
        { id: "fj-lemon-mint", nameAr: "عصير ليمون نعناع", nameEn: "Lemon Mint", price: 40, color: "#74b84a" },
        { id: "fj-watermelon", nameAr: "عصير بطيخ", nameEn: "Watermelon", price: 40, color: "#e04856" },
        { id: "fj-cocktail", nameAr: "كوكتيل فواكه", nameEn: "Cocktail", price: 55, color: "#d95b43" },
      ],
    },
    {
      id: "milkshakes",
      nameAr: "الميلك شيك",
      nameEn: "Milkshakes",
      visual: "milkshake",
      items: [
        { id: "ms-chocolate", nameAr: "ميلك شيك شوكولاتة", nameEn: "Chocolate", price: 55, color: "#542a16" },
        { id: "ms-vanilla", nameAr: "ميلك شيك فانيليا", nameEn: "Vanilla", price: 50, color: "#e3cfa6" },
        { id: "ms-strawberry", nameAr: "ميلك شيك فراولة", nameEn: "Strawberry", price: 55, color: "#d45d72" },
        { id: "ms-oreo", nameAr: "ميلك شيك أوريو", nameEn: "Oreo", price: 60, color: "#3d3633" },
        { id: "ms-lotus", nameAr: "ميلك شيك لوتس", nameEn: "Lotus", price: 65, color: "#c4793b" },
        { id: "ms-nutella", nameAr: "ميلك شيك نوتيلا", nameEn: "Nutella", price: 70, color: "#4a2413" },
      ],
    },
    {
      id: "frappe",
      nameAr: "الفراپيه",
      nameEn: "Frappe",
      visual: "frappe",
      items: [
        { id: "fr-coffee", nameAr: "كوفي فرابيه", nameEn: "Coffee Frappe", price: 55, color: "#8f5b34" },
        { id: "fr-caramel", nameAr: "كراميل فرابيه", nameEn: "Caramel Frappe", price: 60, color: "#c9823c" },
        { id: "fr-mocha", nameAr: "موكا فرابيه", nameEn: "Mocha Frappe", price: 60, color: "#61361e" },
        { id: "fr-chocolate", nameAr: "شوكليت فرابيه", nameEn: "Chocolate Frappe", price: 60, color: "#4b2615" },
        { id: "fr-oreo", nameAr: "أوريو فرابيه", nameEn: "Oreo Frappe", price: 65, color: "#3e3531" },
      ],
    },
    {
      id: "special-drinks",
      nameAr: "الشوكولاتة والمشروبات الخاصة",
      nameEn: "Signature & Chocolate",
      visual: "signature",
      items: [
        { id: "sp-spanish-hot", nameAr: "سبانش لاتيه ساخن", nameEn: "Spanish Latte Hot", price: 55, color: "#c78b52" },
        { id: "sp-white-mocha", nameAr: "وايت موكا", nameEn: "White Mocha", price: 55, color: "#dfc6a2" },
        { id: "sp-pistachio", nameAr: "بستاشيو لاتيه", nameEn: "Pistachio Latte", price: 70, color: "#7ca15b" },
        { id: "sp-saffron", nameAr: "لاتيه زعفران", nameEn: "Saffron Latte", price: 65, color: "#d99e26" },
      ],
    },
    {
      id: "tea-herbs",
      nameAr: "الشاي والأعشاب",
      nameEn: "Tea & Herbs",
      visual: "tea",
      items: [
        { id: "th-moroccan", nameAr: "شاي مغربي", nameEn: "Moroccan Tea", price: 30, color: "#7d9341" },
        { id: "th-chamomile", nameAr: "بابونج", nameEn: "Chamomile", price: 25, color: "#d4a83b" },
        { id: "th-hibiscus", nameAr: "كركديه", nameEn: "Hibiscus", price: 25, color: "#9e1c2b" },
        { id: "th-sage", nameAr: "مرمرية", nameEn: "Sage", price: 25, color: "#7e8f58" },
      ],
    },
    {
      id: "desserts",
      nameAr: "الحلويات",
      nameEn: "Desserts",
      visual: "dessert",
      items: [
        { id: "ds-choc-cake", nameAr: "تشوكليت كيك", nameEn: "Chocolate Cake", price: 50, color: "#4a2414" },
        { id: "ds-brownies", nameAr: "براونيز", nameEn: "Brownies", price: 45, color: "#3b1c0e" },
        { id: "ds-cheesecake", nameAr: "تشيز كيك", nameEn: "Cheesecake", price: 65, color: "#e5c89b" },
        { id: "ds-cookies", nameAr: "كوكيز", nameEn: "Cookies", price: 30, color: "#a66d3b" },
        { id: "ds-croissant", nameAr: "كرواسون", nameEn: "Croissant", price: 35, color: "#c98b44" },
        { id: "ds-waffles", nameAr: "وافل", nameEn: "Waffles", price: 60, color: "#cfa05b" },
        { id: "ds-donuts", nameAr: "دوناتس", nameEn: "Donuts", price: 35, color: "#b56a3b" },
      ],
    },
    {
      id: "snacks",
      nameAr: "السناكس",
      nameEn: "Snacks",
      visual: "snack",
      items: [
        { id: "sn-club", nameAr: "كلوب ساندوتش", nameEn: "Club Sandwich", price: 55, color: "#c78e46" },
        { id: "sn-toast", nameAr: "توست جبنة", nameEn: "Cheese Toast", price: 40, color: "#d6a449" },
        { id: "sn-pizza", nameAr: "ميني بيتزا", nameEn: "Mini Pizza", price: 50, color: "#c2492d" },
        { id: "sn-nachos", nameAr: "ناتشوز", nameEn: "Nachos", price: 45, color: "#d9922b" },
      ],
    },
    {
      id: "addons",
      nameAr: "إضافات المشروبات",
      nameEn: "Drink Add-ons",
      visual: "addon",
      items: [
        { id: "ad-extra-shot", nameAr: "إكسترا شوت", nameEn: "Extra Shot", price: 15, color: "#381a0b" },
        { id: "ad-whipped", nameAr: "كريمة مخفوقة", nameEn: "Whipped Cream", price: 10, color: "#efe2cf" },
        { id: "ad-caramel", nameAr: "سيروب كراميل", nameEn: "Caramel Syrup", price: 10, color: "#c77d33" },
        { id: "ad-vanilla", nameAr: "سيروب فانيليا", nameEn: "Vanilla Syrup", price: 10, color: "#d8b47c" },
        { id: "ad-hazelnut", nameAr: "سيروب بندق", nameEn: "Hazelnut Syrup", price: 12, color: "#8c5327" },
      ],
    },
  ],
};

// إتاحة الإعدادات عالمياً للاستخدام في app.js
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
