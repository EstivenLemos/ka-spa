/* =========================================================
   KATHERINE ASCENSIO — vanilla JS
   Edit ONLY the CONFIG object for the WhatsApp setup.
   ========================================================= */

const CONFIG = {
  // WhatsApp number: country code + number, WITHOUT +, spaces or hyphens.
  whatsappNumber: "573102939638",

  // Message opened automatically in WhatsApp.
  whatsappMessage: "Hola Katherine, vi la página web y me gustaría conocer los servicios disponibles para agendar una cita.",

  // Message used by each service "Agendar" button. {servicio} is replaced by the service name.
  serviceMessage: "Hola Katherine, vi la página web y me gustaría agendar una cita para {servicio}. ¿Qué disponibilidad tienes?",

  // Time in milliseconds before the greeting appears.
  greetingDelay: 2200
};

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const loader = document.querySelector(".page-loader");
  const welcomeBubble = document.getElementById("welcomeBubble");
  const welcomeClose = document.getElementById("welcomeClose");
  const year = document.getElementById("year");

  // -----------------------------
  // Page loader
  // -----------------------------
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hide"), 350);
  });
  // Safety net: never keep the loader forever.
  setTimeout(() => loader.classList.add("hide"), 3500);

  // -----------------------------
  // Header on scroll
  // -----------------------------
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // -----------------------------
  // Mobile navigation
  // -----------------------------
  const closeMenu = () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

  // -----------------------------
  // Scroll reveal
  // -----------------------------
  // Once an element has appeared, its reveal classes are removed so hover
  // effects don't inherit the reveal transition delay.
  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("is-visible");
      observer.unobserve(el);
      setTimeout(() => {
        el.classList.remove("reveal", "is-visible", "reveal-delay", "reveal-delay-2", "reveal-delay-3");
      }, 1400);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  revealItems.forEach(item => revealObserver.observe(item));

  // -----------------------------
  // Hero photography
  // -----------------------------
  // If an image exists in /assets with the filename in data-photo,
  // use it automatically and hide the placeholder text.
  document.querySelectorAll("[data-photo]").forEach(container => {
    const imagePath = `assets/${container.dataset.photo}`;
    const img = new Image();

    img.onload = () => {
      container.style.backgroundImage = `url("${imagePath}")`;
      container.style.backgroundSize = "cover";
      container.style.backgroundPosition = "center";
      const placeholder = container.querySelector(".photo-placeholder");
      if (placeholder) placeholder.style.display = "none";
    };

    img.src = imagePath;
  });

  // -----------------------------
  // WhatsApp links
  // -----------------------------
  const cleanNumber = CONFIG.whatsappNumber.replace(/\D/g, "");
  const whatsappLink = message => `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  const whatsappURL = whatsappLink(CONFIG.whatsappMessage);

  ["whatsappFloat", "contactWhatsapp", "footerWhatsapp"].forEach(id => {
    const link = document.getElementById(id);
    if (link) link.href = whatsappURL;
  });

  // Every "Agendar" button opens WhatsApp with the chosen service.
  document.querySelectorAll("[data-service]").forEach(link => {
    const service = link.dataset.service;
    link.href = service
      ? whatsappLink(CONFIG.serviceMessage.replace("{servicio}", service.toLowerCase()))
      : whatsappURL;
    link.target = "_blank";
    link.rel = "noopener";
  });

  // -----------------------------
  // Friendly greeting
  // -----------------------------
  let greetingSeen = false;
  try { greetingSeen = sessionStorage.getItem("kaGreetingSeen") === "true"; } catch (e) {}

  if (!greetingSeen) {
    setTimeout(() => welcomeBubble.classList.add("show"), CONFIG.greetingDelay);
  }

  welcomeClose.addEventListener("click", () => {
    welcomeBubble.classList.remove("show");
    try { sessionStorage.setItem("kaGreetingSeen", "true"); } catch (e) {}
  });

  // -----------------------------
  // Reviews slider
  // -----------------------------
  const reviews = [...document.querySelectorAll(".review")];
  const dotsContainer = document.getElementById("reviewDots");
  const prev = document.getElementById("reviewPrev");
  const next = document.getElementById("reviewNext");
  let reviewIndex = 0;
  let reviewTimer;

  reviews.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = `review-dot${index === 0 ? " active" : ""}`;
    dot.addEventListener("click", () => {
      showReview(index);
      restartReviewTimer();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = [...dotsContainer.children];

  function showReview(index) {
    reviewIndex = (index + reviews.length) % reviews.length;
    reviews.forEach((review, i) => review.classList.toggle("active", i === reviewIndex));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === reviewIndex));
  }

  function restartReviewTimer() {
    clearInterval(reviewTimer);
    reviewTimer = setInterval(() => showReview(reviewIndex + 1), 6000);
  }

  prev.addEventListener("click", () => {
    showReview(reviewIndex - 1);
    restartReviewTimer();
  });

  next.addEventListener("click", () => {
    showReview(reviewIndex + 1);
    restartReviewTimer();
  });

  restartReviewTimer();

  // -----------------------------
  // Gallery lightbox
  // -----------------------------
  const galleryItems = [...document.querySelectorAll(".gallery-item")];
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  let galleryIndex = 0;
  let lastFocus = null;

  function showImage(index) {
    galleryIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[galleryIndex];
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = item.dataset.caption || "";
  }

  function openLightbox(index) {
    lastFocus = document.activeElement;
    showImage(index);
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    document.getElementById("lightboxClose").focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    if (lastFocus) lastFocus.focus();
  }

  galleryItems.forEach((item, index) => item.addEventListener("click", () => openLightbox(index)));
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", () => showImage(galleryIndex - 1));
  document.getElementById("lightboxNext").addEventListener("click", () => showImage(galleryIndex + 1));
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(galleryIndex - 1);
    if (event.key === "ArrowRight") showImage(galleryIndex + 1);
  });

  // -----------------------------
  // Footer year
  // -----------------------------
  year.textContent = new Date().getFullYear();

  // -----------------------------
  // Smooth anchor fallback
  // -----------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
