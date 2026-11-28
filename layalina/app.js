/**
 * ============================================================================
 * Layalina Café | ليالينا كافيه — Application Logic
 * ============================================================================
 */

const CONFIG = window.SITE_CONFIG;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const GLOBAL_FALLBACK_IMG =
  CONFIG?.MENU_META?.defaultImg ||
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&q=60&auto=format&fit=crop";

/* ==================== 1. CONFIG HYDRATION ==================== */
function hydrateSiteConfig() {
  if (!CONFIG) return;

  const textMap = {
    "brand-ar": CONFIG.BRAND.nameAr,
    "brand-en": CONFIG.BRAND.nameEn,
    "full-name-ar": CONFIG.BRAND.fullNameAr,
    "owner-ar": CONFIG.BRAND.ownerAr,
    "owner-en": CONFIG.BRAND.ownerEn,
    phone: CONFIG.CONTACT.PHONE,
    address: CONFIG.CONTACT.ADDRESS,
    "hours-short": CONFIG.CONTACT.HOURS_SHORT,
    "hours-full": CONFIG.CONTACT.HOURS_FULL,
    "maps-query": CONFIG.CONTACT.GOOGLE_MAPS_QUERY,
    "price-note": CONFIG.MENU_META.priceNoteAr,
  };

  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.getAttribute("data-config");
    if (textMap[key] !== undefined) {
      el.textContent = textMap[key];
    }
  });

  document.querySelectorAll('[data-config-link="phone"]').forEach((el) => {
    el.setAttribute("href", CONFIG.CONTACT.PHONE_LINK);
  });

  document.querySelectorAll('[data-config-link="whatsapp"]').forEach((el) => {
    el.setAttribute("href", `https://wa.me/${CONFIG.CONTACT.WHATSAPP}`);
  });

  const heroPhoto = document.getElementById("hero-bg-photo");
  if (heroPhoto && CONFIG.BRAND.heroImg) {
    heroPhoto.setAttribute("src", CONFIG.BRAND.heroImg);
  }

  const aboutPhoto = document.getElementById("about-photo");
  if (aboutPhoto && CONFIG.BRAND.aboutImg) {
    aboutPhoto.setAttribute("src", CONFIG.BRAND.aboutImg);
  }

  const mapIframe = document.getElementById("google-map-iframe");
  if (mapIframe && CONFIG.CONTACT.GOOGLE_MAPS_EMBED) {
    mapIframe.setAttribute("src", CONFIG.CONTACT.GOOGLE_MAPS_EMBED);
  }

  document.querySelectorAll("[data-social]").forEach((el) => {
    const net = el.getAttribute("data-social");
    if (CONFIG.CONTACT.SOCIAL && CONFIG.CONTACT.SOCIAL[net]) {
      el.setAttribute("href", CONFIG.CONTACT.SOCIAL[net]);
    }
  });
}

/* ==================== 2. ROBUST LIGHTWEIGHT HERO 3D (DESKTOP ONLY) ==================== */
async function initHero3D() {
  const canvas = document.getElementById("hero-canvas");
  const hint = document.getElementById("hero-3d-hint");
  if (!canvas) return;

  const hide3D = () => {
    canvas.hidden = true;
    if (hint) hint.hidden = true;
  };

  // Skip WebGL entirely on phones (<768px) or reduced-motion preference -> photo hero only
  const desktopQuery = window.matchMedia("(min-width: 768px)");
  if (!desktopQuery.matches || prefersReducedMotion) {
    hide3D();
    return;
  }

  // WebGL feature check before loading Three.js
  let gl = null;
  try {
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  } catch {
    gl = null;
  }
  if (!gl) {
    hide3D();
    return;
  }

  let THREE;
  let renderer;
  try {
    THREE = await import("three");
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
  } catch {
    hide3D();
    return;
  }

  try {
    // Performance cap: max DPR 1.5, low-poly geometry, max 48 particles
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      40
    );
    camera.position.set(0, 0.55, 6.8);

    // Warm Café Lighting
    const ambient = new THREE.AmbientLight(0xfff1dc, 1.15);
    const keyLight = new THREE.DirectionalLight(0xffe0b5, 2.0);
    keyLight.position.set(4, 5, 4);
    const rimLight = new THREE.DirectionalLight(0xc08552, 1.1);
    rimLight.position.set(-4, 2, -3);
    scene.add(ambient, keyLight, rimLight);

    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    const cupGroup = new THREE.Group();
    heroGroup.add(cupGroup);

    // Low-poly warm ivory ceramic cup (24 segments, matte ceramic finish)
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0xf7efe4,
      roughness: 0.35,
      metalness: 0.04,
    });
    const caramelMat = new THREE.MeshStandardMaterial({
      color: 0xc08552,
      roughness: 0.35,
      metalness: 0.35,
    });
    const espressoMat = new THREE.MeshStandardMaterial({
      color: 0x3b2214,
      roughness: 0.25,
      metalness: 0.05,
    });
    const cremaMat = new THREE.MeshStandardMaterial({
      color: 0xd9a473,
      roughness: 0.45,
      metalness: 0.02,
    });

    // Cup body (low-poly Lathe)
    const cupProfile = [
      new THREE.Vector2(0.0, -0.95),
      new THREE.Vector2(0.68, -0.95),
      new THREE.Vector2(0.95, 0.72),
      new THREE.Vector2(0.9, 0.76),
      new THREE.Vector2(0.63, -0.82),
      new THREE.Vector2(0.0, -0.82),
    ];
    const cupMesh = new THREE.Mesh(new THREE.LatheGeometry(cupProfile, 24), ceramicMat);
    cupGroup.add(cupMesh);

    // Caramel lip ring
    const lipMesh = new THREE.Mesh(new THREE.TorusGeometry(0.93, 0.025, 10, 28), caramelMat);
    lipMesh.rotation.x = Math.PI / 2;
    lipMesh.position.y = 0.74;
    cupGroup.add(lipMesh);

    // Cup handle
    const handleMesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.42, 0.075, 10, 20, Math.PI * 1.15),
      ceramicMat
    );
    handleMesh.position.set(0.92, -0.02, 0);
    handleMesh.rotation.z = -Math.PI * 0.55;
    cupGroup.add(handleMesh);

    // Espresso + crema disc
    const coffeeDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.84, 0.84, 0.08, 22), espressoMat);
    coffeeDisc.position.y = 0.52;
    cupGroup.add(coffeeDisc);

    const cremaDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.03, 20), cremaMat);
    cremaDisc.position.y = 0.565;
    cupGroup.add(cremaDisc);

    // Ceramic saucer
    const saucerProfile = [
      new THREE.Vector2(0.0, -1.04),
      new THREE.Vector2(1.25, -1.04),
      new THREE.Vector2(1.42, -0.94),
      new THREE.Vector2(1.36, -0.91),
      new THREE.Vector2(0.75, -0.98),
      new THREE.Vector2(0.0, -0.98),
    ];
    const saucerMesh = new THREE.Mesh(new THREE.LatheGeometry(saucerProfile, 24), ceramicMat);
    cupGroup.add(saucerMesh);

    // Max 48 subtle warm aroma particles
    const particleCount = 48;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 1.1 + (i % 5) * 0.32;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = ((i % 7) - 2.5) * 0.42;
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.75;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0xd9a473,
      size: 0.055,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const aromaPoints = new THREE.Points(particlesGeo, particlesMat);
    heroGroup.add(aromaPoints);

    function updatePlacement() {
      if (!desktopQuery.matches) {
        hide3D();
        return;
      }
      canvas.hidden = false;
      if (hint) hint.hidden = false;

      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(w, h, false);

      // Position cup cleanly in left visual spacer (RTL)
      heroGroup.position.set(w >= 960 ? -1.75 : -1.2, -0.05, 0);
      heroGroup.scale.setScalar(w >= 960 ? 1.05 : 0.85);
      camera.lookAt(heroGroup.position.x * 0.3, 0, 0);
    }
    updatePlacement();

    let isHeroVisible = true;
    let isTabVisible = !document.hidden;
    let rafId = 0;
    const clock = new THREE.Clock();

    function tick() {
      rafId = 0;
      if (!isHeroVisible || !isTabVisible || !desktopQuery.matches) return;

      const t = clock.getElapsedTime();
      // Single simple rotation + gentle float animation
      cupGroup.position.y = Math.sin(t * 1.15) * 0.08;
      cupGroup.rotation.y = t * 0.28;
      cupGroup.rotation.x = 0.18;
      aromaPoints.rotation.y = t * 0.1;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    }

    function syncLoop() {
      if (isHeroVisible && isTabVisible && desktopQuery.matches) {
        if (!rafId) {
          clock.getDelta();
          rafId = requestAnimationFrame(tick);
        }
      } else if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    document.addEventListener("visibilitychange", () => {
      isTabVisible = !document.hidden;
      syncLoop();
    });

    const heroObserver = new IntersectionObserver(
      (entries) => {
        isHeroVisible = entries[0]?.isIntersecting ?? true;
        syncLoop();
      },
      { threshold: 0.02 }
    );
    const heroSection = document.getElementById("hero");
    if (heroSection) heroObserver.observe(heroSection);

    window.addEventListener("resize", () => {
      updatePlacement();
      syncLoop();
    }, { passive: true });

    syncLoop();
  } catch {
    hide3D();
  }
}

/* ==================== 3. IMAGE FALLBACK CHAIN ==================== */
// Fallback order: item.img -> category.img -> global default (photo-1445116572660-236099ec97a0)
function handleImgError(event) {
  const img = event.target;
  if (!img || img.tagName !== "IMG") return;

  const step = img.dataset.fallbackStep || "0";
  const catImg = img.dataset.catImg || "";
  const defaultImg = img.dataset.defaultImg || GLOBAL_FALLBACK_IMG;

  if (step === "0") {
    img.dataset.fallbackStep = "1";
    if (catImg && img.src !== catImg) {
      img.src = catImg;
      return;
    }
  }

  if (step === "0" || step === "1") {
    img.dataset.fallbackStep = "2";
    if (defaultImg && img.src !== defaultImg) {
      img.src = defaultImg;
    }
  }
}

/* ==================== 4. MENU & CART STATE ==================== */
const STORAGE_CART_KEY = "layalina_cart_v1";
const STORAGE_NOTES_KEY = "layalina_notes_v1";

const state = {
  activeCategory: "all",
  searchQuery: "",
  cart: loadCart(),
  notes: localStorage.getItem(STORAGE_NOTES_KEY) || "",
};

const itemMap = new Map();
if (CONFIG && Array.isArray(CONFIG.MENU_CATEGORIES)) {
  CONFIG.MENU_CATEGORIES.forEach((cat) => {
    const catImg = cat.img || GLOBAL_FALLBACK_IMG;
    cat.items.forEach((item) => {
      itemMap.set(item.id, {
        ...item,
        categoryId: cat.id,
        categoryImg: catImg,
        img: item.img || catImg,
      });
    });
  });
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(state.cart));
  } catch {
    // Ignore storage quota errors
  }
}

function normalizeText(str) {
  return (str || "")
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .trim();
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

/* ==================== 5. MENU RENDERING & FILTERING ==================== */
function renderCategoryChips() {
  const chipsContainer = document.getElementById("category-chips");
  if (!chipsContainer || !CONFIG) return;

  const totalItems = CONFIG.MENU_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);
  const chips = [
    { id: "all", nameAr: "الكل", count: totalItems },
    ...CONFIG.MENU_CATEGORIES.map((c) => ({
      id: c.id,
      nameAr: c.nameAr,
      count: c.items.length,
    })),
  ];

  chipsContainer.innerHTML = chips
    .map(
      (chip) => `
      <button
        type="button"
        role="tab"
        aria-selected="${state.activeCategory === chip.id ? "true" : "false"}"
        class="category-chip ${state.activeCategory === chip.id ? "active" : ""}"
        data-category="${chip.id}"
      >
        <span>${chip.nameAr}</span>
        <span class="chip-count">(${chip.count})</span>
      </button>
    `
    )
    .join("");
}

function getCartQty(itemId) {
  const found = state.cart.find((c) => c.id === itemId);
  return found ? found.qty : 0;
}

function renderMenu() {
  const container = document.getElementById("menu-container");
  const emptyState = document.getElementById("menu-empty");
  const metaEl = document.getElementById("menu-results-meta");
  if (!container || !CONFIG) return;

  const query = normalizeText(state.searchQuery);
  const currency = CONFIG.MENU_META.currencyAr || "ج.م";

  const filteredCategories = CONFIG.MENU_CATEGORIES.filter(
    (cat) => state.activeCategory === "all" || cat.id === state.activeCategory
  )
    .map((cat) => {
      const items = cat.items.filter((item) => {
        if (!query) return true;
        return (
          normalizeText(item.nameAr).includes(query) ||
          normalizeText(item.nameEn).includes(query) ||
          normalizeText(cat.nameAr).includes(query)
        );
      });
      return { ...cat, items };
    })
    .filter((cat) => cat.items.length > 0);

  const visibleCount = filteredCategories.reduce((sum, c) => sum + c.items.length, 0);
  if (metaEl) {
    metaEl.textContent =
      visibleCount > 0 ? `عرض ${visibleCount} صنف` : "لا توجد نتائج مطابقة";
  }

  if (filteredCategories.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.hidden = false;
    return;
  }

  if (emptyState) emptyState.hidden = true;

  container.innerHTML = filteredCategories
    .map((cat) => {
      const catImg = cat.img || GLOBAL_FALLBACK_IMG;
      return `
      <section class="menu-category-block" id="cat-${cat.id}">
        <div class="category-heading-row">
          <div class="category-title-wrap">
            <h3 class="category-title-ar">${cat.nameAr}</h3>
            <span class="category-title-en">${cat.nameEn}</span>
          </div>
          <span class="category-count-badge">${cat.items.length} أصناف</span>
        </div>

        <div class="menu-cards-grid">
          ${cat.items
            .map((item) => {
              const qty = getCartQty(item.id);
              const itemImg = item.img || catImg;
              return `
              <article class="menu-card">
                <div class="menu-card-media">
                  <img
                    class="menu-card-img"
                    src="${itemImg}"
                    data-cat-img="${catImg}"
                    data-default-img="${GLOBAL_FALLBACK_IMG}"
                    data-fallback-step="0"
                    alt="${item.nameAr} - ${item.nameEn}"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div class="menu-card-body">
                  <div class="menu-card-names">
                    <h4 class="menu-card-title-ar">${item.nameAr}</h4>
                    <span class="menu-card-title-en">${item.nameEn}</span>
                  </div>
                  <div class="menu-card-footer">
                    <span class="menu-card-price">
                      ${item.price} <small>${currency}</small>
                    </span>
                    <button
                      type="button"
                      class="add-to-cart-btn ${qty > 0 ? "in-cart" : ""}"
                      data-add-id="${item.id}"
                      aria-label="أضف ${item.nameAr} إلى السلة"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" aria-hidden="true">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      <span>${qty > 0 ? `أضف (${qty})` : "أضف"}</span>
                    </button>
                  </div>
                </div>
              </article>
            `;
            })
            .join("")}
        </div>
      </section>
    `;
    })
    .join("");
}

/* ==================== 6. CART DRAWER & WHATSAPP CHECKOUT ==================== */
function updateCartUI() {
  const navCount = document.getElementById("nav-cart-count");
  const fabCount = document.getElementById("cart-fab-count");
  const subtitle = document.getElementById("cart-items-subtitle");
  const listEl = document.getElementById("cart-items-list");
  const totalEl = document.getElementById("cart-total-value");
  const checkoutBtn = document.getElementById("whatsapp-checkout-btn");

  const currency = CONFIG?.MENU_META?.currencyAr || "ج.م";
  const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = state.cart.reduce((sum, entry) => {
    const item = itemMap.get(entry.id);
    return sum + (item ? item.price * entry.qty : 0);
  }, 0);

  if (navCount) navCount.textContent = totalQty;
  if (fabCount) fabCount.textContent = totalQty;
  if (subtitle) subtitle.textContent = `${totalQty} ${totalQty === 1 ? "صنف" : "أصناف"}`;
  if (totalEl) totalEl.textContent = `${totalPrice} ${currency}`;
  if (checkoutBtn) checkoutBtn.disabled = state.cart.length === 0;

  if (!listEl) return;

  if (state.cart.length === 0) {
    listEl.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon" aria-hidden="true">☕</div>
        <h3>سلتك فارغة حالياً</h3>
        <p>أضف مشروباتك أو حلواك المفضلة من المنيو لتأكيد الطلب بسهولة عبر واتساب.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = state.cart
    .map((entry) => {
      const item = itemMap.get(entry.id);
      if (!item) return "";
      const lineTotal = item.price * entry.qty;
      return `
        <div class="cart-item-row">
          <img
            class="cart-item-thumb"
            src="${item.img}"
            data-cat-img="${item.categoryImg}"
            data-default-img="${GLOBAL_FALLBACK_IMG}"
            data-fallback-step="0"
            alt="${item.nameAr}"
            loading="lazy"
          />
          <div class="cart-item-info">
            <div class="cart-item-name">${item.nameAr}</div>
            <div class="cart-item-en">${item.nameEn}</div>
            <div class="cart-item-price">${lineTotal} ${currency} <small>(${item.price} × ${entry.qty})</small></div>
          </div>
          <div class="cart-item-controls">
            <button type="button" class="qty-btn" data-qty-delta="-1" data-item-id="${item.id}" aria-label="تقليل الكمية">−</button>
            <span class="qty-val">${entry.qty}</span>
            <button type="button" class="qty-btn" data-qty-delta="1" data-item-id="${item.id}" aria-label="زيادة الكمية">+</button>
            <button type="button" class="remove-item-btn" data-remove-id="${item.id}" aria-label="حذف ${item.nameAr}" title="حذف">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              </svg>
            </button>
          </div>
        </div>
      `;
    })
    .join("");
}

function addToCart(itemId) {
  const item = itemMap.get(itemId);
  if (!item) return;

  const existing = state.cart.find((c) => c.id === itemId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id: itemId, qty: 1 });
  }

  saveCart();
  updateCartUI();
  renderMenu();

  const fab = document.getElementById("cart-fab");
  if (fab) {
    fab.classList.remove("bump");
    void fab.offsetWidth;
    fab.classList.add("bump");
  }

  showToast(`تمت إضافة "${item.nameAr}" إلى السلة`);
}

function changeItemQty(itemId, delta) {
  const idx = state.cart.findIndex((c) => c.id === itemId);
  if (idx === -1) return;

  state.cart[idx].qty += delta;
  if (state.cart[idx].qty <= 0) {
    state.cart.splice(idx, 1);
  }

  saveCart();
  updateCartUI();
  renderMenu();
}

function removeFromCart(itemId) {
  state.cart = state.cart.filter((c) => c.id !== itemId);
  saveCart();
  updateCartUI();
  renderMenu();
}

function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  if (!drawer || !backdrop) return;
  drawer.classList.add("open");
  backdrop.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  if (!drawer || !backdrop) return;
  drawer.classList.remove("open");
  backdrop.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function sendWhatsAppOrder() {
  if (state.cart.length === 0) {
    showToast("السلة فارغة! أضف صنفاً أولاً.");
    return;
  }

  const currency = CONFIG?.MENU_META?.currencyAr || "ج.م";
  const brandName = CONFIG?.BRAND?.fullNameAr || "ليالينا كافيه";
  const waPhone = CONFIG?.CONTACT?.WHATSAPP || "201200706533";

  let total = 0;
  const lines = state.cart
    .map((entry, idx) => {
      const item = itemMap.get(entry.id);
      if (!item) return null;
      const subtotal = item.price * entry.qty;
      total += subtotal;
      return `${idx + 1}. ${item.nameAr} (${item.nameEn}) × ${entry.qty} = ${subtotal} ${currency}`;
    })
    .filter(Boolean);

  const notes = (document.getElementById("cart-notes")?.value || "").trim();

  const summaryParts = [
    `مرحباً *${brandName}* ☕`,
    "أود تأكيد الطلب التالي:",
    "",
    ...lines,
    "",
    `*الإجمالي التقديري:* ${total} ${currency}`,
    `_(${CONFIG?.MENU_META?.priceNoteAr || "أسعار استرشادية قابلة للتعديل"})_`,
  ];

  if (notes) {
    summaryParts.push("", `*ملاحظات خاصة:* ${notes}`);
  }

  const url = `https://wa.me/${waPhone}?text=${encodeURIComponent(summaryParts.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/* ==================== 7. EVENT LISTENERS & NAVIGATION ==================== */
function bindEvents() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = ["hero", "about", "menu", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  window.addEventListener(
    "scroll",
    () => {
      if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 24);
      }

      const scrollPos = window.scrollY + 140;
      let currentId = "hero";
      sections.forEach((sec) => {
        if (scrollPos >= sec.offsetTop) {
          currentId = sec.id;
        }
      });

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
      });
    },
    { passive: true }
  );

  // Mobile Menu Drawer
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      mobileToggle.classList.toggle("open", isOpen);
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
      mobileNav.setAttribute("aria-hidden", String(!isOpen));
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        mobileToggle.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("aria-hidden", "true");
      });
    });
  }

  // Hero "اطلب الآن" button
  const heroOrderBtn = document.getElementById("hero-order-btn");
  if (heroOrderBtn) {
    heroOrderBtn.addEventListener("click", () => {
      if (state.cart.length > 0) {
        openCartDrawer();
      } else {
        document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
        showToast("اختر مشروبك المفضل وأضفه للسلة");
      }
    });
  }

  // Category Chips Click
  const chipsContainer = document.getElementById("category-chips");
  if (chipsContainer) {
    chipsContainer.addEventListener("click", (e) => {
      const chip = e.target.closest(".category-chip");
      if (!chip) return;
      state.activeCategory = chip.dataset.category || "all";
      renderCategoryChips();
      renderMenu();
      chipsContainer
        .querySelector(`[data-category="${state.activeCategory}"]`)
        ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });
  }

  // Menu Search
  const searchInput = document.getElementById("menu-search");
  const clearBtn = document.getElementById("search-clear-btn");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (clearBtn) clearBtn.hidden = !state.searchQuery;
      renderMenu();
    });
  }
  if (clearBtn && searchInput) {
    clearBtn.addEventListener("click", () => {
      state.searchQuery = "";
      searchInput.value = "";
      clearBtn.hidden = true;
      renderMenu();
      searchInput.focus();
    });
  }

  // Reset Menu Filter
  const resetFilterBtn = document.getElementById("reset-menu-filter");
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener("click", () => {
      state.activeCategory = "all";
      state.searchQuery = "";
      if (searchInput) searchInput.value = "";
      if (clearBtn) clearBtn.hidden = true;
      renderCategoryChips();
      renderMenu();
    });
  }

  // Menu Add to Cart & Image Fallback Delegation
  const menuContainer = document.getElementById("menu-container");
  if (menuContainer) {
    menuContainer.addEventListener("error", handleImgError, true);
    menuContainer.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add-id]");
      if (!btn) return;
      addToCart(btn.dataset.addId);
    });
  }

  // Cart Drawer Triggers
  document.getElementById("nav-cart-btn")?.addEventListener("click", openCartDrawer);
  document.getElementById("cart-fab")?.addEventListener("click", openCartDrawer);
  document.getElementById("cart-close-btn")?.addEventListener("click", closeCartDrawer);
  document.getElementById("cart-backdrop")?.addEventListener("click", closeCartDrawer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCartDrawer();
  });

  // Cart Item Quantity / Remove & Thumbnail Fallback Delegation
  const cartList = document.getElementById("cart-items-list");
  if (cartList) {
    cartList.addEventListener("error", handleImgError, true);
    cartList.addEventListener("click", (e) => {
      const qtyBtn = e.target.closest("[data-qty-delta]");
      if (qtyBtn) {
        changeItemQty(qtyBtn.dataset.itemId, Number(qtyBtn.dataset.qtyDelta));
        return;
      }
      const removeBtn = e.target.closest("[data-remove-id]");
      if (removeBtn) {
        removeFromCart(removeBtn.dataset.removeId);
      }
    });
  }

  // Special Instructions Persistence
  const notesInput = document.getElementById("cart-notes");
  if (notesInput) {
    notesInput.value = state.notes;
    notesInput.addEventListener("input", (e) => {
      state.notes = e.target.value;
      try {
        localStorage.setItem(STORAGE_NOTES_KEY, state.notes);
      } catch {
        // Ignore storage error
      }
    });
  }

  // Clear Cart
  document.getElementById("cart-clear-btn")?.addEventListener("click", () => {
    if (state.cart.length === 0) return;
    state.cart = [];
    saveCart();
    updateCartUI();
    renderMenu();
    showToast("تم إفراغ السلة");
  });

  // WhatsApp Checkout
  document.getElementById("whatsapp-checkout-btn")?.addEventListener("click", sendWhatsAppOrder);
}

/* ==================== 8. SUBTLE ENTRANCE ANIMATIONS ==================== */
function initAnimations() {
  if (prefersReducedMotion || typeof window.gsap === "undefined") return;

  const gsap = window.gsap;
  gsap.from(".hero-text-block > *", {
    y: 16,
    opacity: 0,
    duration: 0.65,
    stagger: 0.08,
    ease: "power2.out",
    clearProps: "all",
  });
}

/* ==================== BOOTSTRAP ==================== */
function init() {
  hydrateSiteConfig();
  renderCategoryChips();
  renderMenu();
  updateCartUI();
  bindEvents();
  initHero3D();
  initAnimations();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
