/**
 * ============================================================================
 * ملف الإعدادات الرئيسي لموقع كافيه ليالينا (Layalina Café)
 * ============================================================================
 * يمكن تعديل جميع بيانات الكافيه، أرقام التواصل، العنوان، الصور، وأسعار المنيو
 * من خلال هذا الملف فقط دون الحاجة لتعديل الكود البرمجي.
 */

const UNSPLASH_BASE = "https://images.unsplash.com";
const photo = (id, width = 400, quality = 60) =>
  `${UNSPLASH_BASE}/${id}?w=${width}&q=${quality}&auto=format&fit=crop`;

const PHOTOS = {
  espresso: photo("photo-1510591509098-f4fdc6d0ff04"),
  americano: photo("photo-1509042239860-f550ce710b93"),
  cappuccino: photo("photo-1572442388796-11668a67e53d"),
  latte: photo("photo-1561047029-3000c68339ca"),
  mocha: photo("photo-1578314675249-a6910f80cc4e"),
  turkishCoffee: photo("photo-1541167760496-1628856ab772"),
  nescafe: photo("photo-1524350876685-274059332603"),
  icedCoffee: photo("photo-1517701604599-bb29b565090c"),
  icedLatte: photo("photo-1461023058943-07fcbe16d735"),
  frappe: photo("photo-1572490122747-3968b75cc699"),
  mojito: photo("photo-1551538827-9c037cb4f32a"),
  lemonade: photo("photo-1523677011781-c91d1bbe2f9e"),
  orangeJuice: photo("photo-1600271886742-f049cd451bba"),
  mango: photo("photo-1546173159-315724a31696"),
  strawberry: photo("photo-1553530666-ba11a7da3888"),
  milkshake: photo("photo-1577805947697-89e18249d767"),
  tea: photo("photo-1544787219-7f47ccb76574"),
  hotChocolate: photo("photo-1542990253-a781e04c0082"),
  matcha: photo("photo-1536256263959-770b48d82b0a"),
  sahlab: photo("photo-1512058564366-18510be2db19"),
  cheesecake: photo("photo-1533134242443-d4fd215305ad"),
  chocolateCake: photo("photo-1578985545062-69928b1d9587"),
  croissant: photo("photo-1555507036-ab1f4038808a"),
  cookies: photo("photo-1499636136210-6f4ee915583e"),
  globalDefault: photo("photo-1445116572660-236099ec97a0"),
  heroBackdrop: photo("photo-1495474472287-4d71bcdd2085", 1600, 70),
  aboutCafe: photo("photo-1445116572660-236099ec97a0", 900, 75),
};

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
    heroImg: PHOTOS.heroBackdrop,
    aboutImg: PHOTOS.aboutCafe,
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

  // إعدادات المنيو والعملة والصور الافتراضية
  MENU_META: {
    currencyAr: "ج.م",
    currencyEn: "EGP",
    priceNoteAr: "أسعار استرشادية قابلة للتعديل",
    defaultImg: PHOTOS.globalDefault,
  },

  // أقسام المنيو والأصناف الكاملة (13 قسماً - 73 صنفاً)
  // كل قسم له صورة افتراضية (img) وكل صنف له صورته الخاصة (img)
  MENU_CATEGORIES: [
    {
      id: "hot-coffee",
      nameAr: "القهوة الساخنة",
      nameEn: "Hot Coffee",
      visual: "hot-coffee",
      img: PHOTOS.americano,
      items: [
        { id: "hc-espresso", nameAr: "إسبريسو", nameEn: "Espresso", price: 30, color: "#3d1e0d", img: PHOTOS.espresso },
        { id: "hc-double-espresso", nameAr: "دبل إسبريسو", nameEn: "Double Espresso", price: 40, color: "#2b1307", img: PHOTOS.espresso },
        { id: "hc-americano", nameAr: "أمريكانو", nameEn: "Americano", price: 40, color: "#4a2511", img: PHOTOS.americano },
        { id: "hc-cappuccino", nameAr: "كابتشينو", nameEn: "Cappuccino", price: 50, color: "#a46b3e", img: PHOTOS.cappuccino },
        { id: "hc-latte", nameAr: "لاتيه", nameEn: "Latte", price: 55, color: "#c58f5c", img: PHOTOS.latte },
        { id: "hc-mocha", nameAr: "موكا", nameEn: "Mocha", price: 60, color: "#5c331c", img: PHOTOS.mocha },
        { id: "hc-turkish", nameAr: "قهوة تركي", nameEn: "Turkish Coffee", price: 30, color: "#361a0c", img: PHOTOS.turkishCoffee },
        { id: "hc-nescafe", nameAr: "نسكافيه", nameEn: "Nescafé", price: 35, color: "#9c683e", img: PHOTOS.nescafe },
      ],
    },
    {
      id: "iced-coffee",
      nameAr: "القهوة المثلجة",
      nameEn: "Iced Coffee",
      visual: "iced-coffee",
      img: PHOTOS.icedCoffee,
      items: [
        { id: "ic-americano", nameAr: "آيس أمريكانو", nameEn: "Iced Americano", price: 45, color: "#3b1c0c", img: PHOTOS.icedCoffee },
        { id: "ic-latte", nameAr: "آيس لاتيه", nameEn: "Iced Latte", price: 50, color: "#b98454", img: PHOTOS.icedLatte },
        { id: "ic-spanish", nameAr: "آيس سبانش لاتيه", nameEn: "Iced Spanish Latte", price: 65, color: "#d49b63", img: PHOTOS.icedLatte },
        { id: "ic-mocha", nameAr: "آيس موكا", nameEn: "Iced Mocha", price: 60, color: "#5e321a", img: PHOTOS.icedCoffee },
        { id: "ic-caramel", nameAr: "آيس كراميل ماكياتو", nameEn: "Iced Caramel Macchiato", price: 65, color: "#c97e38", img: PHOTOS.icedLatte },
        { id: "ic-vanilla", nameAr: "آيس فانيليا لاتيه", nameEn: "Iced Vanilla Latte", price: 60, color: "#d6ad7c", img: PHOTOS.icedLatte },
        { id: "ic-cold-brew", nameAr: "كولد برو", nameEn: "Cold Brew", price: 55, color: "#2b1409", img: PHOTOS.icedCoffee },
      ],
    },
    {
      id: "hot-drinks",
      nameAr: "المشروبات الساخنة",
      nameEn: "Hot Drinks",
      visual: "hot-drink",
      img: PHOTOS.tea,
      items: [
        { id: "hd-egyptian-tea", nameAr: "شاي مصري", nameEn: "Egyptian Tea", price: 20, color: "#8c2b12", img: PHOTOS.tea },
        { id: "hd-green-tea", nameAr: "شاي أخضر", nameEn: "Green Tea", price: 25, color: "#6a8a3e", img: PHOTOS.tea },
        { id: "hd-anise", nameAr: "يانسون", nameEn: "Anise", price: 25, color: "#c89b3c", img: PHOTOS.tea },
        { id: "hd-mint", nameAr: "نعناع", nameEn: "Mint", price: 25, color: "#4c8c4a", img: PHOTOS.tea },
        { id: "hd-hot-choc", nameAr: "هوت شوكليت", nameEn: "Hot Chocolate", price: 45, color: "#4a2314", img: PHOTOS.hotChocolate },
        { id: "hd-cinnamon", nameAr: "قرفة", nameEn: "Cinnamon", price: 25, color: "#914521", img: PHOTOS.sahlab },
        { id: "hd-ginger", nameAr: "جنزبيل", nameEn: "Ginger", price: 25, color: "#d29d3a", img: PHOTOS.tea },
      ],
    },
    {
      id: "iced-drinks",
      nameAr: "المشروبات المثلجة",
      nameEn: "Iced Drinks",
      visual: "iced-drink",
      img: PHOTOS.icedCoffee,
      items: [
        { id: "id-peach-tea", nameAr: "آيس تي خوخ", nameEn: "Iced Tea Peach", price: 35, color: "#d97a41", img: PHOTOS.icedCoffee },
        { id: "id-lemon-tea", nameAr: "آيس تي ليمون", nameEn: "Iced Tea Lemon", price: 35, color: "#c99a32", img: PHOTOS.lemonade },
        { id: "id-iced-choc", nameAr: "آيس شوكليت", nameEn: "Iced Chocolate", price: 50, color: "#522816", img: PHOTOS.icedCoffee },
        { id: "id-matcha", nameAr: "آيس ماتشا لاتيه", nameEn: "Iced Matcha Latte", price: 65, color: "#5c8d45", img: PHOTOS.matcha },
      ],
    },
    {
      id: "mojito",
      nameAr: "الموهيتو",
      nameEn: "Mojito",
      visual: "mojito",
      img: PHOTOS.mojito,
      items: [
        { id: "mj-classic", nameAr: "كلاسيك موهيتو", nameEn: "Classic Mojito", price: 50, color: "#65b368", img: PHOTOS.mojito },
        { id: "mj-blue", nameAr: "بلو موهيتو", nameEn: "Blue Mojito", price: 55, color: "#2d8fd5", img: PHOTOS.mojito },
        { id: "mj-strawberry", nameAr: "موهيتو فراولة", nameEn: "Strawberry Mojito", price: 55, color: "#cf3a4a", img: PHOTOS.strawberry },
        { id: "mj-passion", nameAr: "موهيتو باشن فروت", nameEn: "Passion Fruit Mojito", price: 60, color: "#e39c2b", img: PHOTOS.mango },
        { id: "mj-lemon-mint", nameAr: "موهيتو ليمون نعناع", nameEn: "Lemon Mint Mojito", price: 50, color: "#7cc255", img: PHOTOS.lemonade },
      ],
    },
    {
      id: "fresh-juices",
      nameAr: "العصائر الطازجة",
      nameEn: "Fresh Juices",
      visual: "juice",
      img: PHOTOS.orangeJuice,
      items: [
        { id: "fj-orange", nameAr: "عصير برتقال", nameEn: "Orange", price: 40, color: "#e67e22", img: PHOTOS.orangeJuice },
        { id: "fj-mango", nameAr: "عصير مانجو", nameEn: "Mango", price: 50, color: "#f39c12", img: PHOTOS.mango },
        { id: "fj-strawberry", nameAr: "عصير فراولة", nameEn: "Strawberry", price: 45, color: "#c0392b", img: PHOTOS.strawberry },
        { id: "fj-guava", nameAr: "عصير جوافة", nameEn: "Guava", price: 40, color: "#d8cfa8", img: PHOTOS.lemonade },
        { id: "fj-lemon-mint", nameAr: "عصير ليمون نعناع", nameEn: "Lemon Mint", price: 40, color: "#74b84a", img: PHOTOS.lemonade },
        { id: "fj-watermelon", nameAr: "عصير بطيخ", nameEn: "Watermelon", price: 40, color: "#e04856", img: PHOTOS.strawberry },
        { id: "fj-cocktail", nameAr: "كوكتيل فواكه", nameEn: "Cocktail", price: 55, color: "#d95b43", img: PHOTOS.mango },
      ],
    },
    {
      id: "milkshakes",
      nameAr: "الميلك شيك",
      nameEn: "Milkshakes",
      visual: "milkshake",
      img: PHOTOS.milkshake,
      items: [
        { id: "ms-chocolate", nameAr: "ميلك شيك شوكولاتة", nameEn: "Chocolate", price: 55, color: "#542a16", img: PHOTOS.milkshake },
        { id: "ms-vanilla", nameAr: "ميلك شيك فانيليا", nameEn: "Vanilla", price: 50, color: "#e3cfa6", img: PHOTOS.milkshake },
        { id: "ms-strawberry", nameAr: "ميلك شيك فراولة", nameEn: "Strawberry", price: 55, color: "#d45d72", img: PHOTOS.strawberry },
        { id: "ms-oreo", nameAr: "ميلك شيك أوريو", nameEn: "Oreo", price: 60, color: "#3d3633", img: PHOTOS.milkshake },
        { id: "ms-lotus", nameAr: "ميلك شيك لوتس", nameEn: "Lotus", price: 65, color: "#c4793b", img: PHOTOS.frappe },
        { id: "ms-nutella", nameAr: "ميلك شيك نوتيلا", nameEn: "Nutella", price: 70, color: "#4a2413", img: PHOTOS.milkshake },
      ],
    },
    {
      id: "frappe",
      nameAr: "الفراپيه",
      nameEn: "Frappe",
      visual: "frappe",
      img: PHOTOS.frappe,
      items: [
        { id: "fr-coffee", nameAr: "كوفي فرابيه", nameEn: "Coffee Frappe", price: 55, color: "#8f5b34", img: PHOTOS.frappe },
        { id: "fr-caramel", nameAr: "كراميل فرابيه", nameEn: "Caramel Frappe", price: 60, color: "#c9823c", img: PHOTOS.frappe },
        { id: "fr-mocha", nameAr: "موكا فرابيه", nameEn: "Mocha Frappe", price: 60, color: "#61361e", img: PHOTOS.mocha },
        { id: "fr-chocolate", nameAr: "شوكليت فرابيه", nameEn: "Chocolate Frappe", price: 60, color: "#4b2615", img: PHOTOS.frappe },
        { id: "fr-oreo", nameAr: "أوريو فرابيه", nameEn: "Oreo Frappe", price: 65, color: "#3e3531", img: PHOTOS.milkshake },
      ],
    },
    {
      id: "special-drinks",
      nameAr: "الشوكولاتة والمشروبات الخاصة",
      nameEn: "Signature & Chocolate",
      visual: "signature",
      img: PHOTOS.latte,
      items: [
        { id: "sp-spanish-hot", nameAr: "سبانش لاتيه ساخن", nameEn: "Spanish Latte Hot", price: 55, color: "#c78b52", img: PHOTOS.latte },
        { id: "sp-white-mocha", nameAr: "وايت موكا", nameEn: "White Mocha", price: 55, color: "#dfc6a2", img: PHOTOS.mocha },
        { id: "sp-pistachio", nameAr: "بستاشيو لاتيه", nameEn: "Pistachio Latte", price: 70, color: "#7ca15b", img: PHOTOS.matcha },
        { id: "sp-saffron", nameAr: "لاتيه زعفران", nameEn: "Saffron Latte", price: 65, color: "#d99e26", img: PHOTOS.sahlab },
      ],
    },
    {
      id: "tea-herbs",
      nameAr: "الشاي والأعشاب",
      nameEn: "Tea & Herbs",
      visual: "tea",
      img: PHOTOS.tea,
      items: [
        { id: "th-moroccan", nameAr: "شاي مغربي", nameEn: "Moroccan Tea", price: 30, color: "#7d9341", img: PHOTOS.tea },
        { id: "th-chamomile", nameAr: "بابونج", nameEn: "Chamomile", price: 25, color: "#d4a83b", img: PHOTOS.tea },
        { id: "th-hibiscus", nameAr: "كركديه", nameEn: "Hibiscus", price: 25, color: "#9e1c2b", img: PHOTOS.tea },
        { id: "th-sage", nameAr: "مرمرية", nameEn: "Sage", price: 25, color: "#7e8f58", img: PHOTOS.tea },
      ],
    },
    {
      id: "desserts",
      nameAr: "الحلويات",
      nameEn: "Desserts",
      visual: "dessert",
      img: PHOTOS.cheesecake,
      items: [
        { id: "ds-choc-cake", nameAr: "تشوكليت كيك", nameEn: "Chocolate Cake", price: 50, color: "#4a2414", img: PHOTOS.chocolateCake },
        { id: "ds-brownies", nameAr: "براونيز", nameEn: "Brownies", price: 45, color: "#3b1c0e", img: PHOTOS.chocolateCake },
        { id: "ds-cheesecake", nameAr: "تشيز كيك", nameEn: "Cheesecake", price: 65, color: "#e5c89b", img: PHOTOS.cheesecake },
        { id: "ds-cookies", nameAr: "كوكيز", nameEn: "Cookies", price: 30, color: "#a66d3b", img: PHOTOS.cookies },
        { id: "ds-croissant", nameAr: "كرواسون", nameEn: "Croissant", price: 35, color: "#c98b44", img: PHOTOS.croissant },
        { id: "ds-waffles", nameAr: "وافل", nameEn: "Waffles", price: 60, color: "#cfa05b", img: PHOTOS.croissant },
        { id: "ds-donuts", nameAr: "دوناتس", nameEn: "Donuts", price: 35, color: "#b56a3b", img: PHOTOS.cookies },
      ],
    },
    {
      id: "snacks",
      nameAr: "السناكس",
      nameEn: "Snacks",
      visual: "snack",
      img: PHOTOS.croissant,
      items: [
        { id: "sn-club", nameAr: "كلوب ساندوتش", nameEn: "Club Sandwich", price: 55, color: "#c78e46", img: PHOTOS.croissant },
        { id: "sn-toast", nameAr: "توست جبنة", nameEn: "Cheese Toast", price: 40, color: "#d6a449", img: PHOTOS.croissant },
        { id: "sn-pizza", nameAr: "ميني بيتزا", nameEn: "Mini Pizza", price: 50, color: "#c2492d", img: PHOTOS.croissant },
        { id: "sn-nachos", nameAr: "ناتشوز", nameEn: "Nachos", price: 45, color: "#d9922b", img: PHOTOS.cookies },
      ],
    },
    {
      id: "addons",
      nameAr: "إضافات المشروبات",
      nameEn: "Drink Add-ons",
      visual: "addon",
      img: PHOTOS.espresso,
      items: [
        { id: "ad-extra-shot", nameAr: "إكسترا شوت", nameEn: "Extra Shot", price: 15, color: "#381a0b", img: PHOTOS.espresso },
        { id: "ad-whipped", nameAr: "كريمة مخفوقة", nameEn: "Whipped Cream", price: 10, color: "#efe2cf", img: PHOTOS.cappuccino },
        { id: "ad-caramel", nameAr: "سيروب كراميل", nameEn: "Caramel Syrup", price: 10, color: "#c77d33", img: PHOTOS.latte },
        { id: "ad-vanilla", nameAr: "سيروب فانيليا", nameEn: "Vanilla Syrup", price: 10, color: "#d8b47c", img: PHOTOS.nescafe },
        { id: "ad-hazelnut", nameAr: "سيروب بندق", nameEn: "Hazelnut Syrup", price: 12, color: "#8c5327", img: PHOTOS.mocha },
      ],
    },
  ],
};

// إتاحة الإعدادات عالمياً للاستخدام في app.js
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
