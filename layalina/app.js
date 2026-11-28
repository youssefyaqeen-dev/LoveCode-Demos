/**
 * ============================================================================
 * Layalina Café | ليالينا كافيه — Application Logic & Procedural 3D Scenes
 * ============================================================================
 */

import * as THREE from "three";

const CONFIG = window.SITE_CONFIG;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

/* ==================== 2. PROCEDURAL 3D HELPERS ==================== */
function createSoftParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255, 240, 215, 1)");
  grad.addColorStop(0.35, "rgba(212, 162, 78, 0.78)");
  grad.addColorStop(1, "rgba(212, 162, 78, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function createCoffeeBeanMesh(beanMat, seamMat, scale = 1) {
  const group = new THREE.Group();

  // Main roasted bean body (sculpted ellipsoid)
  const beanGeo = new THREE.SphereGeometry(0.18 * scale, 22, 18);
  beanGeo.scale(1.0, 1.42, 0.76);
  const beanBody = new THREE.Mesh(beanGeo, beanMat);
  group.add(beanBody);

  // Characteristic center crease
  const seamGeo = new THREE.CapsuleGeometry(0.02 * scale, 0.34 * scale, 4, 10);
  const seam = new THREE.Mesh(seamGeo, seamMat);
  seam.position.z = 0.125 * scale;
  seam.rotation.z = 0.08;
  group.add(seam);

  return group;
}

/* ==================== 3. HERO 3D SCENE (ICED COFFEE + BEANS + SPLASH) ==================== */
function initHero3D() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    return; // Graceful fallback to CSS radial backgrounds
  }

  const isSmall = window.innerWidth < 768;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 60);
  camera.position.set(0, 0.45, 7.2);

  // Cinematic Lighting
  const ambientLight = new THREE.AmbientLight(0xffead1, 0.9);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xffe0b2, 0x26140c, 1.1);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xffd79a, 2.6);
  keyLight.position.set(4.5, 6.0, 5.0);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0xd4a24e, 14, 18);
  rimLight.position.set(-4.2, 2.8, -2.2);
  scene.add(rimLight);

  const warmFillLight = new THREE.PointLight(0xc98a4b, 8, 14);
  warmFillLight.position.set(2.5, -1.8, 3.8);
  scene.add(warmFillLight);

  // Master group for cup + surrounding elements
  const heroGroup = new THREE.Group();
  scene.add(heroGroup);

  const cupGroup = new THREE.Group();
  heroGroup.add(cupGroup);

  // 3A. Outer Glass Cup (LatheGeometry + MeshPhysicalMaterial transmission)
  const glassProfile = [
    new THREE.Vector2(0.0, -1.55),
    new THREE.Vector2(0.74, -1.55),
    new THREE.Vector2(0.8, -1.46),
    new THREE.Vector2(1.12, 1.38),
    new THREE.Vector2(1.17, 1.48),
    new THREE.Vector2(1.11, 1.48),
    new THREE.Vector2(1.04, 1.34),
    new THREE.Vector2(0.72, -1.35),
    new THREE.Vector2(0.0, -1.35),
  ];
  const glassGeo = new THREE.LatheGeometry(glassProfile, 56);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xfff8ee,
    transmission: 0.92,
    opacity: 1,
    transparent: true,
    roughness: 0.08,
    metalness: 0.02,
    ior: 1.5,
    thickness: 0.45,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glassCup = new THREE.Mesh(glassGeo, glassMat);
  glassCup.renderOrder = 3;
  cupGroup.add(glassCup);

  // Gold Rim Accent around glass lip
  const rimGeo = new THREE.TorusGeometry(1.14, 0.022, 16, 64);
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4a24e,
    metalness: 0.88,
    roughness: 0.22,
  });
  const rimMesh = new THREE.Mesh(rimGeo, goldMat);
  rimMesh.rotation.x = Math.PI / 2;
  rimMesh.position.y = 1.47;
  cupGroup.add(rimMesh);

  // 3B. Iced Coffee Layers inside the Glass (opaque so they render cleanly inside transmissive glass)
  // Layer 1: Rich Dark Espresso Base
  const espressoGeo = new THREE.CylinderGeometry(0.84, 0.71, 0.9, 44);
  const espressoMat = new THREE.MeshPhysicalMaterial({
    color: 0x291107,
    roughness: 0.22,
    metalness: 0.04,
    clearcoat: 0.55,
  });
  const espressoLayer = new THREE.Mesh(espressoGeo, espressoMat);
  espressoLayer.position.y = -0.88;
  cupGroup.add(espressoLayer);

  // Layer 2: Caramel & Milk Swirl Middle Layer
  const caramelGeo = new THREE.CylinderGeometry(0.95, 0.84, 0.92, 44);
  const caramelMat = new THREE.MeshPhysicalMaterial({
    color: 0xb7733a,
    roughness: 0.28,
    metalness: 0.02,
    clearcoat: 0.4,
  });
  const caramelLayer = new THREE.Mesh(caramelGeo, caramelMat);
  caramelLayer.position.y = 0.02;
  cupGroup.add(caramelLayer);

  // Layer 3: Velvety Cream Foam Top Layer
  const foamGeo = new THREE.CylinderGeometry(1.03, 0.95, 0.56, 44);
  const foamMat = new THREE.MeshStandardMaterial({
    color: 0xf1dec5,
    roughness: 0.62,
    metalness: 0.02,
  });
  const foamLayer = new THREE.Mesh(foamGeo, foamMat);
  foamLayer.position.y = 0.75;
  cupGroup.add(foamLayer);

  // Caramel Drizzle Ring on top
  const drizzleGeo = new THREE.TorusGeometry(0.55, 0.035, 12, 48);
  const drizzleMat = new THREE.MeshStandardMaterial({
    color: 0xc98a4b,
    roughness: 0.25,
    metalness: 0.15,
  });
  const drizzleRing = new THREE.Mesh(drizzleGeo, drizzleMat);
  drizzleRing.rotation.x = Math.PI / 2;
  drizzleRing.position.y = 1.04;
  cupGroup.add(drizzleRing);

  // Sleek Metallic Gold Straw
  const strawGeo = new THREE.CylinderGeometry(0.052, 0.052, 2.9, 20);
  const straw = new THREE.Mesh(strawGeo, goldMat);
  straw.position.set(0.32, 0.68, 0.1);
  straw.rotation.z = -0.22;
  straw.rotation.x = 0.08;
  cupGroup.add(straw);

  // 3C. Ice Cubes with MeshPhysicalMaterial Transmission
  const iceMat = new THREE.MeshPhysicalMaterial({
    color: 0xeef7ff,
    transmission: 0.9,
    opacity: 1,
    transparent: true,
    roughness: 0.1,
    ior: 1.31,
    thickness: 0.55,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
  });

  const iceCubes = [];
  const iceConfigs = [
    { pos: [-0.32, 1.18, 0.14], rot: [0.4, 0.5, 0.2], size: 0.42 },
    { pos: [0.24, 1.08, -0.22], rot: [-0.3, 0.8, 0.5], size: 0.39 },
    { pos: [-0.04, 1.24, -0.02], rot: [0.7, 0.2, -0.4], size: 0.36 },
    { pos: [0.38, 0.96, 0.26], rot: [0.2, -0.6, 0.3], size: 0.34 },
    // Floating external accent ice cubes
    { pos: [-1.45, 1.25, 0.45], rot: [0.5, 0.7, 0.2], size: 0.3, external: true },
    { pos: [1.35, -0.65, 0.65], rot: [-0.4, 0.3, 0.7], size: 0.28, external: true },
  ];

  iceConfigs.forEach((cfg, idx) => {
    const geo = new THREE.BoxGeometry(cfg.size, cfg.size, cfg.size);
    const mesh = new THREE.Mesh(geo, iceMat);
    mesh.position.set(...cfg.pos);
    mesh.rotation.set(...cfg.rot);
    mesh.renderOrder = 2;
    mesh.userData = {
      baseY: cfg.pos[1],
      phase: idx * 1.15,
      speed: 0.8 + idx * 0.12,
      external: !!cfg.external,
    };
    cupGroup.add(mesh);
    iceCubes.push(mesh);
  });

  // 3D. Floating Roasted Coffee Beans
  const beanMat = new THREE.MeshStandardMaterial({
    color: 0x3b1b0c,
    roughness: 0.38,
    metalness: 0.08,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x160903,
    roughness: 0.7,
  });

  const beanCount = isSmall ? 10 : 18;
  const beans = [];
  for (let i = 0; i < beanCount; i++) {
    const angle = (i / beanCount) * Math.PI * 2;
    const radius = 1.65 + (i % 3) * 0.52;
    const y = ((i % 5) - 2) * 0.68;
    const bean = createCoffeeBeanMesh(beanMat, seamMat, 0.85 + (i % 3) * 0.2);
    bean.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius * 0.7);
    bean.rotation.set(i * 0.7, i * 1.1, i * 0.4);
    bean.userData = {
      angle,
      radius,
      baseY: y,
      orbitSpeed: 0.14 + (i % 4) * 0.04,
      bobSpeed: 0.9 + (i % 3) * 0.25,
      spinX: (i % 2 === 0 ? 1 : -1) * 0.45,
      spinY: 0.55,
    };
    heroGroup.add(bean);
    beans.push(bean);
  }

  // 3E. Particle Coffee-Splash & Golden Aroma Dust
  const particleCount = isSmall ? 140 : 320;
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);

  const splashGold = new THREE.Color(0xd4a24e);
  const splashCoffee = new THREE.Color(0x9c5a2b);
  const splashCream = new THREE.Color(0xf5ead9);

  for (let i = 0; i < particleCount; i++) {
    const t = Math.random() * Math.PI * 2;
    const r = 1.15 + Math.pow(Math.random(), 0.7) * 2.4;
    const heightSpread = (Math.random() - 0.38) * 3.8;

    particlePositions[i * 3] = Math.cos(t) * r;
    particlePositions[i * 3 + 1] = heightSpread;
    particlePositions[i * 3 + 2] = Math.sin(t) * r * 0.85;

    const palettePick = i % 3 === 0 ? splashGold : i % 3 === 1 ? splashCoffee : splashCream;
    particleColors[i * 3] = palettePick.r;
    particleColors[i * 3 + 1] = palettePick.g;
    particleColors[i * 3 + 2] = palettePick.b;
  }

  const particlesGeo = new THREE.BufferGeometry();
  particlesGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  particlesGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: isSmall ? 0.11 : 0.13,
    map: createSoftParticleTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const splashParticles = new THREE.Points(particlesGeo, particlesMat);
  heroGroup.add(splashParticles);

  // Responsive layout positioning (in RTL, spacer column is on the left => x < 0)
  function updateHeroPlacement() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);

    if (w >= 960) {
      heroGroup.position.set(-1.68, -0.05, 0);
      heroGroup.scale.setScalar(1.02);
    } else {
      heroGroup.position.set(0, -0.2, -0.9);
      heroGroup.scale.setScalar(0.8);
    }
  }
  updateHeroPlacement();

  // Mouse-Parallax & Scroll-Linked Camera State
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let scrollProgress = 0;

  window.addEventListener(
    "pointermove",
    (e) => {
      if (prefersReducedMotion) return;
      pointer.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  window.addEventListener(
    "scroll",
    () => {
      const heroEl = document.getElementById("hero");
      const heroH = heroEl ? heroEl.offsetHeight : window.innerHeight;
      scrollProgress = Math.min(Math.max(window.scrollY / Math.max(heroH, 1), 0), 1.4);
    },
    { passive: true }
  );

  window.addEventListener("resize", updateHeroPlacement, { passive: true });

  // Pause rendering when hero is scrolled out of view
  let isHeroVisible = true;
  const heroObserver = new IntersectionObserver(
    (entries) => {
      isHeroVisible = entries[0]?.isIntersecting ?? true;
    },
    { threshold: 0.02 }
  );
  const heroSection = document.getElementById("hero");
  if (heroSection) heroObserver.observe(heroSection);

  // Render Loop
  const clock = new THREE.Clock();

  function renderHeroFrame() {
    requestAnimationFrame(renderHeroFrame);
    if (!isHeroVisible) return;

    const elapsed = clock.getElapsedTime();

    // Smooth pointer damping
    pointer.x += (pointer.targetX - pointer.x) * 0.06;
    pointer.y += (pointer.targetY - pointer.y) * 0.06;

    // Cup gentle floating & tilt
    cupGroup.position.y = Math.sin(elapsed * 1.1) * 0.08;
    cupGroup.rotation.y = elapsed * 0.25 + pointer.x * 0.42 + scrollProgress * 1.15;
    cupGroup.rotation.x = 0.1 + pointer.y * 0.16 - scrollProgress * 0.22;
    cupGroup.rotation.z = -0.06 + pointer.x * 0.08;

    // Ice cubes subtle bobbing
    iceCubes.forEach((cube) => {
      const d = cube.userData;
      cube.position.y = d.baseY + Math.sin(elapsed * d.speed + d.phase) * (d.external ? 0.12 : 0.035);
      if (d.external) {
        cube.rotation.x += 0.004;
        cube.rotation.y += 0.006;
      }
    });

    // Orbiting coffee beans
    beans.forEach((bean) => {
      const d = bean.userData;
      const a = d.angle + elapsed * d.orbitSpeed;
      bean.position.x = Math.cos(a) * d.radius;
      bean.position.z = Math.sin(a) * d.radius * 0.72;
      bean.position.y = d.baseY + Math.sin(elapsed * d.bobSpeed + d.angle) * 0.18;
      bean.rotation.x += 0.008 * d.spinX;
      bean.rotation.y += 0.01 * d.spinY;
    });

    // Coffee splash particles swirl
    splashParticles.rotation.y = elapsed * 0.11;
    splashParticles.rotation.z = Math.sin(elapsed * 0.35) * 0.08;

    // Scroll-linked + parallax camera motion
    camera.position.x = pointer.x * 0.42;
    camera.position.y = 0.45 - pointer.y * 0.28 - scrollProgress * 1.25;
    camera.position.z = 7.2 + scrollProgress * 1.85;
    camera.lookAt(heroGroup.position.x * 0.35, heroGroup.position.y, 0);

    renderer.render(scene, camera);
  }

  if (prefersReducedMotion) {
    cupGroup.rotation.set(0.12, 0.4, -0.06);
    renderer.render(scene, camera);
  } else {
    renderHeroFrame();
  }
}

/* ==================== 4. ABOUT SECTION 3D ACCENT SCENE ==================== */
function initAbout3D() {
  const canvas = document.getElementById("about-canvas");
  if (!canvas) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return;
  }

  const updateSize = () => {
    const rect = canvas.parentElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
  camera.position.set(0, 0.2, 5.2);
  updateSize();

  const ambient = new THREE.AmbientLight(0xffe7c7, 1.0);
  const key = new THREE.DirectionalLight(0xffd28d, 2.4);
  key.position.set(3, 4, 4);
  const rim = new THREE.PointLight(0xd4a24e, 12, 14);
  rim.position.set(-3, -2, 2);
  scene.add(ambient, key, rim);

  const sculptureGroup = new THREE.Group();
  scene.add(sculptureGroup);

  const goldRingMat = new THREE.MeshStandardMaterial({
    color: 0xd4a24e,
    metalness: 0.86,
    roughness: 0.22,
  });

  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.032, 20, 80), goldRingMat);
  ring1.rotation.x = 0.65;
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.024, 18, 72), goldRingMat);
  ring2.rotation.y = 0.85;
  sculptureGroup.add(ring1, ring2);

  // Center hero coffee bean cluster
  const beanMat = new THREE.MeshStandardMaterial({ color: 0x3b1b0c, roughness: 0.34, metalness: 0.1 });
  const seamMat = new THREE.MeshStandardMaterial({ color: 0x160903, roughness: 0.7 });

  const centerBean = createCoffeeBeanMesh(beanMat, seamMat, 2.3);
  centerBean.rotation.set(0.25, -0.35, 0.2);
  sculptureGroup.add(centerBean);

  const satellites = [];
  const satCount = window.innerWidth < 768 ? 5 : 8;
  for (let i = 0; i < satCount; i++) {
    const b = createCoffeeBeanMesh(beanMat, seamMat, 0.8);
    const a = (i / satCount) * Math.PI * 2;
    b.position.set(Math.cos(a) * 1.5, Math.sin(a * 2) * 0.45, Math.sin(a) * 1.5);
    b.userData = { angle: a, speed: 0.35 };
    sculptureGroup.add(b);
    satellites.push(b);
  }

  window.addEventListener("resize", updateSize, { passive: true });

  let isAboutVisible = false;
  const observer = new IntersectionObserver(
    (entries) => {
      isAboutVisible = entries[0]?.isIntersecting ?? false;
    },
    { threshold: 0.05 }
  );
  observer.observe(canvas);

  const clock = new THREE.Clock();
  function animateAbout() {
    requestAnimationFrame(animateAbout);
    if (!isAboutVisible) return;

    const t = clock.getElapsedTime();
    centerBean.rotation.y = t * 0.55;
    centerBean.position.y = Math.sin(t * 1.3) * 0.09;
    ring1.rotation.z = t * 0.28;
    ring2.rotation.x = -t * 0.22;

    satellites.forEach((sat) => {
      const a = sat.userData.angle + t * sat.userData.speed;
      sat.position.x = Math.cos(a) * 1.55;
      sat.position.z = Math.sin(a) * 1.25;
      sat.rotation.x += 0.01;
      sat.rotation.y += 0.015;
    });

    renderer.render(scene, camera);
  }

  if (prefersReducedMotion) {
    renderer.render(scene, camera);
  } else {
    animateAbout();
  }
}

/* ==================== 5. SVG DRINK / FOOD ILLUSTRATIONS ==================== */
function getItemVisualSVG(visualType, color) {
  const c = color || "#c98a4b";
  const uid = `${visualType}-${c.replace("#", "")}`;

  switch (visualType) {
    case "hot-coffee":
    case "signature":
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="g-${uid}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f5ead9"/>
              <stop offset="45%" stop-color="${c}"/>
              <stop offset="100%" stop-color="#1e0e06"/>
            </linearGradient>
          </defs>
          <path d="M24 12c0-3 3-4 3-7M32 13c0-3 3-4 3-7M40 12c0-3 3-4 3-7" stroke="#d4a24e" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
          <path d="M16 23h28v16c0 9-6.2 15-14 15s-14-6-14-15V23z" fill="url(#g-${uid})" stroke="#f5ead9" stroke-width="1.8"/>
          <ellipse cx="30" cy="23" rx="14" ry="3.5" fill="#f3dfc4" stroke="#d4a24e" stroke-width="1.2"/>
          <path d="M26 23c2-1.5 6-1.5 8 0" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M44 26h4.5a4.5 4.5 0 0 1 0 9H44" stroke="#f5ead9" stroke-width="2" stroke-linecap="round"/>
          <ellipse cx="30" cy="56" rx="18" ry="2.6" fill="#d4a24e" opacity="0.35"/>
        </svg>`;

    case "iced-coffee":
    case "iced-drink":
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="g-${uid}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f5ead9" stop-opacity="0.92"/>
              <stop offset="35%" stop-color="${c}"/>
              <stop offset="100%" stop-color="#211007"/>
            </linearGradient>
          </defs>
          <path d="M37 7l-4 14" stroke="#d4a24e" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M20 19h24l-3.2 35a3 3 0 0 1-3 2.7H26.2a3 3 0 0 1-3-2.7L20 19z" fill="url(#g-${uid})" stroke="#f5ead9" stroke-width="1.7" stroke-opacity="0.85"/>
          <rect x="24" y="23" width="7" height="7" rx="1.5" transform="rotate(14 27 26)" fill="#ffffff" fill-opacity="0.45"/>
          <rect x="33" y="25" width="7" height="7" rx="1.5" transform="rotate(-12 36 28)" fill="#ffffff" fill-opacity="0.38"/>
          <ellipse cx="32" cy="19" rx="12" ry="2.8" fill="#f5ead9" fill-opacity="0.5"/>
        </svg>`;

    case "hot-drink":
    case "tea":
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="g-${uid}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${c}" stop-opacity="0.7"/>
              <stop offset="100%" stop-color="${c}"/>
            </linearGradient>
          </defs>
          <path d="M26 11c0-3 2.5-3.5 2.5-6M34 11c0-3 2.5-3.5 2.5-6" stroke="#d4a24e" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M18 22h24v18a12 12 0 0 1-24 0V22z" fill="url(#g-${uid})" stroke="#f5ead9" stroke-width="1.8"/>
          <path d="M42 26h4a4 4 0 0 1 0 8h-4" stroke="#f5ead9" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M28 22l4 9" stroke="#d4a24e" stroke-width="1.4"/>
          <rect x="30" y="31" width="5" height="6" rx="1" fill="#f5ead9" opacity="0.85"/>
          <ellipse cx="30" cy="55" rx="16" ry="2.2" fill="#d4a24e" opacity="0.3"/>
        </svg>`;

    case "mojito":
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="g-${uid}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${c}" stop-opacity="0.5"/>
              <stop offset="100%" stop-color="${c}"/>
            </linearGradient>
          </defs>
          <path d="M39 7l-4 13" stroke="#f5ead9" stroke-width="2.2" stroke-linecap="round"/>
          <circle cx="43" cy="18" r="6" fill="#d4e157" stroke="#f5ead9" stroke-width="1.4"/>
          <path d="M20 18h24l-2.5 36a2.5 2.5 0 0 1-2.5 2.3H25a2.5 2.5 0 0 1-2.5-2.3L20 18z" fill="url(#g-${uid})" stroke="#f5ead9" stroke-width="1.7"/>
          <ellipse cx="28" cy="27" rx="4.5" ry="2.4" transform="rotate(-24 28 27)" fill="#4caf50"/>
          <circle cx="35" cy="39" r="2" fill="#fff" opacity="0.65"/>
          <circle cx="28" cy="45" r="1.5" fill="#fff" opacity="0.65"/>
          <circle cx="34" cy="49" r="1.8" fill="#fff" opacity="0.5"/>
        </svg>`;

    case "juice":
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="g-${uid}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${c}" stop-opacity="0.78"/>
              <stop offset="100%" stop-color="${c}"/>
            </linearGradient>
          </defs>
          <path d="M36 8l-3 12" stroke="#f5ead9" stroke-width="2" stroke-linecap="round"/>
          <path d="M21 20h22l-2.5 25a8.5 8.5 0 0 1-8.5 7.6 8.5 8.5 0 0 1-8.5-7.6L21 20z" fill="url(#g-${uid})" stroke="#f5ead9" stroke-width="1.8"/>
          <path d="M32 52v5M24 57h16" stroke="#d4a24e" stroke-width="2" stroke-linecap="round"/>
          <circle cx="43" cy="20" r="5" fill="#f7b731" stroke="#f5ead9" stroke-width="1.3"/>
        </svg>`;

    case "milkshake":
    case "frappe":
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="g-${uid}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f5ead9"/>
              <stop offset="35%" stop-color="${c}"/>
              <stop offset="100%" stop-color="#261309"/>
            </linearGradient>
          </defs>
          <path d="M35 6l-2.5 11" stroke="#d4a24e" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M21 24c0-6 4.9-10 11-10s11 4 11 10" fill="#fff3e2" stroke="#d4a24e" stroke-width="1.5"/>
          <path d="M20 24h24l-3.4 31a2.6 2.6 0 0 1-2.6 2.3H26a2.6 2.6 0 0 1-2.6-2.3L20 24z" fill="url(#g-${uid})" stroke="#f5ead9" stroke-width="1.7"/>
          <path d="M24 27c2 3 5 3 7 0s5-3 9 0" stroke="#f5ead9" stroke-width="1.6" stroke-linecap="round" opacity="0.7"/>
        </svg>`;

    case "dessert":
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M14 44l36-11v13H14V44z" fill="${c}" stroke="#f5ead9" stroke-width="1.6" stroke-linejoin="round"/>
          <path d="M14 44l18-17 18 6-36 11z" fill="#f5ead9" fill-opacity="0.88" stroke="#d4a24e" stroke-width="1.5" stroke-linejoin="round"/>
          <circle cx="32" cy="24" r="3.5" fill="#d63b4b"/>
          <ellipse cx="32" cy="49" rx="22" ry="3.5" stroke="#d4a24e" stroke-width="1.6"/>
        </svg>`;

    case "snack":
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M14 38c0-9 8-16 18-16s18 7 18 16H14z" fill="${c}" stroke="#f5ead9" stroke-width="1.7"/>
          <path d="M12 40h40" stroke="#76b852" stroke-width="3" stroke-linecap="round"/>
          <rect x="14" y="42" width="36" height="6" rx="3" fill="#d4a24e" stroke="#f5ead9" stroke-width="1.4"/>
          <ellipse cx="32" cy="52" rx="22" ry="3" fill="#d4a24e" opacity="0.32"/>
        </svg>`;

    case "addon":
    default:
      return `
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <rect x="24" y="20" width="16" height="32" rx="4" fill="${c}" stroke="#f5ead9" stroke-width="1.7"/>
          <rect x="28" y="12" width="8" height="8" rx="1.5" fill="#d4a24e"/>
          <path d="M32 12V8h6" stroke="#f5ead9" stroke-width="2" stroke-linecap="round"/>
          <circle cx="32" cy="36" r="4.5" fill="#f5ead9" fill-opacity="0.85"/>
        </svg>`;
  }
}

/* ==================== 6. MENU & CART STATE ==================== */
const STORAGE_CART_KEY = "layalina_cart_v1";
const STORAGE_NOTES_KEY = "layalina_notes_v1";

const state = {
  activeCategory: "all",
  searchQuery: "",
  cart: loadCart(),
  notes: localStorage.getItem(STORAGE_NOTES_KEY) || "",
};

// Flat lookup map for all menu items
const itemMap = new Map();
if (CONFIG && Array.isArray(CONFIG.MENU_CATEGORIES)) {
  CONFIG.MENU_CATEGORIES.forEach((cat) => {
    cat.items.forEach((item) => {
      itemMap.set(item.id, { ...item, categoryId: cat.id, visual: cat.visual });
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

/* ==================== 7. MENU RENDERING & FILTERING ==================== */
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
    .map(
      (cat) => `
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
              return `
              <article class="menu-card" style="--drink-color: ${item.color || "#c98a4b"}">
                <div class="menu-card-visual">
                  ${getItemVisualSVG(cat.visual, item.color)}
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
    `
    )
    .join("");
}

/* ==================== 8. CART DRAWER & WHATSAPP CHECKOUT ==================== */
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

/* ==================== 9. EVENT LISTENERS & NAVIGATION ==================== */
function bindEvents() {
  // Sticky navbar scroll style + active nav link
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = ["hero", "about", "menu", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  window.addEventListener(
    "scroll",
    () => {
      if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 36);
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

  // Hero "اطلب الآن" button -> opens cart if items exist, otherwise scrolls to menu
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

  // Menu Add to Cart Delegation
  const menuContainer = document.getElementById("menu-container");
  if (menuContainer) {
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

  // Cart Item Quantity / Remove Delegation
  const cartList = document.getElementById("cart-items-list");
  if (cartList) {
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

/* ==================== 10. GSAP SCROLL REVEALS ==================== */
function initAnimations() {
  if (prefersReducedMotion || typeof window.gsap === "undefined") return;

  const gsap = window.gsap;
  if (window.ScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
  }

  // Hero Entrance
  gsap.from(".hero-text-block > *", {
    y: 26,
    opacity: 0,
    duration: 0.85,
    stagger: 0.1,
    ease: "power3.out",
    clearProps: "transform",
  });

  // Section Scroll Reveals
  if (window.ScrollTrigger) {
    document.querySelectorAll(".reveal-up").forEach((el) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    });
  }
}

/* ==================== BOOTSTRAP ==================== */
function init() {
  hydrateSiteConfig();
  renderCategoryChips();
  renderMenu();
  updateCartUI();
  bindEvents();
  initHero3D();
  initAbout3D();
  initAnimations();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
