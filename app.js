const WA_NUMBER = "62812XXXXXXX"; // ganti
const WA_TEXT = encodeURIComponent("Halo Xedulab, saya mau tanya rekomendasi track kelas yang cocok buat saya.");
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

document.addEventListener("DOMContentLoaded", () => {
  // Set year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // WA links (semua tombol yang ada)
  const waIds = ["waNav", "waMobile", "waCta", "waCta2", "waCurr", "waPricing", "waFinal", "waFloat"];
  waIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = WA_LINK;
  });

  // Theme toggle
  const themeBtn = document.getElementById("themeBtn");
  const setIcon = () => {
    if (!themeBtn) return;
    themeBtn.textContent = document.documentElement.classList.contains("dark") ? "☀️" : "🌙";
  };
  setIcon();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      setIcon();
    });
  }

  // Sticky shadow
  const header = document.getElementById("siteHeader");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("shadow-soft", window.scrollY > 8);
    });
  }

  // Mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      menuBtn.textContent = mobileMenu.classList.contains("hidden") ? "☰" : "✕";
    });

    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuBtn.textContent = "☰";
      });
    });
  }

  // Course filter
  const filterBtns = document.querySelectorAll(".filterBtn[data-filter]");
  const courseCards = document.querySelectorAll("[data-course]");
  const norm = s => (s || "").trim().toLowerCase();

  function setActive(btn) {
    filterBtns.forEach(b => b.classList.remove("ring-2", "ring-indigo-500", "dark:ring-cyan-300"));
    btn.classList.add("ring-2", "ring-indigo-500", "dark:ring-cyan-300");
  }

  const btnAll = Array.from(filterBtns).find(b => norm(b.getAttribute("data-filter")) === "all");
  if (btnAll) setActive(btnAll);

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const f = norm(btn.getAttribute("data-filter"));
      setActive(btn);

      courseCards.forEach(card => {
        const c = norm(card.getAttribute("data-course"));
        const show = (f === "all") || (c === f);
        card.classList.toggle("hidden", !show);
      });
    });
  });

  // FAQ accordion
  document.querySelectorAll(".faqItem").forEach(item => {
    item.addEventListener("click", () => {
      const body = item.querySelector(".faqBody");
      const icon = item.querySelector(".faqIcon");
      const isOpen = body && !body.classList.contains("hidden");

      document.querySelectorAll(".faqItem").forEach(x => {
        const b = x.querySelector(".faqBody");
        const i = x.querySelector(".faqIcon");
        if (b) b.classList.add("hidden");
        if (i) i.textContent = "+";
      });

      if (body && icon && !isOpen) {
        body.classList.remove("hidden");
        icon.textContent = "–";
      }
    });
  });
});
