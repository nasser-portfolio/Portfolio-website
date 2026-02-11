/* ========= MENU SHOW/HIDE ========= */
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav__link");

if (navToggle) {
  navToggle.addEventListener("click", () => navMenu.classList.add("show-menu"));
}
if (navClose) {
  navClose.addEventListener("click", () => navMenu.classList.remove("show-menu"));
}
navLinks.forEach((link) =>
  link.addEventListener("click", () => navMenu.classList.remove("show-menu"))
);

/* ========= HEADER SHADOW ON SCROLL ========= */
const header = document.getElementById("header");
function onScrollHeader() {
  if (window.scrollY >= 50) header.classList.add("shadow-header");
  else header.classList.remove("shadow-header");
}
window.addEventListener("scroll", onScrollHeader);

/* ========= ACTIVE LINK ON SCROLL ========= */
const sections = document.querySelectorAll("section[id]");
function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 90;
    const sectionId = current.getAttribute("id");

    const link = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(".nav__link").forEach((l) => l.classList.remove("active-link"));
      link.classList.add("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/* ========= SCROLL UP BUTTON ========= */
const scrollUp = document.getElementById("scroll-up");
function showScrollUp() {
  if (window.scrollY >= 350) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", showScrollUp);

/* ========= DARK/LIGHT THEME (localStorage) ========= */
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "☀️";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

function getCurrentTheme() {
  return document.body.classList.contains(lightTheme) ? "light" : "dark";
}
function getCurrentIcon() {
  return themeButton.textContent === iconTheme ? "☀️" : "🌙";
}

if (selectedTheme) {
  document.body.classList[selectedTheme === "light" ? "add" : "remove"](lightTheme);
  themeButton.textContent = selectedIcon === "☀️" ? "☀️" : "🌙";
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(lightTheme);
  themeButton.textContent = document.body.classList.contains(lightTheme) ? "☀️" : "🌙";
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
const dot = document.getElementById("cursor-dot");
const ring = document.getElementById("cursor-ring");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;

// Follow mouse
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // dot is snappy
  dot.style.left = `${mouseX}px`;
  dot.style.top = `${mouseY}px`;
});

// ring is smooth (lerp)
function animate() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;

  ring.style.left = `${ringX}px`;
  ring.style.top = `${ringY}px`;

  requestAnimationFrame(animate);
}
animate();

// Hover enlarge on interactive elements
const hoverTargets = "a, button, .button, input, textarea, select, [role='button']";
document.addEventListener("mouseover", (e) => {
  if (e.target.closest(hoverTargets)) ring.classList.add("is-hover");
});
document.addEventListener("mouseout", (e) => {
  if (e.target.closest(hoverTargets)) ring.classList.remove("is-hover");
});

// Click squeeze
document.addEventListener("mousedown", () => ring.classList.add("is-down"));
document.addEventListener("mouseup", () => ring.classList.remove("is-down"));
