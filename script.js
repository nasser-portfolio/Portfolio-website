const menuToggle = document.getElementById("menu-toggle");
const menuLinks = document.querySelectorAll(".nav-links a");

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    menuToggle.checked = false;
  });
});

function typeWriter(textArray, elementId, speed = 100, pause = 1500) {
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const element = document.getElementById(elementId);

  function type() {
    const currentText = textArray[textIndex];

    if (!isDeleting) {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        setTimeout(() => (isDeleting = true), pause);
      }
    } else {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
      }
    }

    setTimeout(type, isDeleting ? speed / 2 : speed);
  }

  type();
}

// Hero title
typeWriter(
  ["Hi, I'm Nasser Jemal", "I am consitently learning"],
  "hero-text",
  90,
  1500
);

// Hero subtitle (starts slightly later)
setTimeout(() => {
  typeWriter(
    ["Welcome to my portfolio", "Scroll down to learn more"],
    "hero-subtext",
    70,
    1200
  );
}, 2000);


function buildRing(ringEl, text, sectors, radiusRem = 7) {
  for (let i = 0; i < sectors; i++) {
    const sector = document.createElement("div");
    sector.className = "preloader__sector";
    sector.textContent = text[i] || "";

    const angle = (360 / sectors) * i;
    sector.style.transform = `rotateY(${angle}deg) translateZ(${radiusRem}rem)`;

    ringEl.appendChild(sector);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const text = "Loading...";
  const sectors = 30;

  buildRing(document.getElementById("ring1"), text, sectors);
  buildRing(document.getElementById("ring2"), text, sectors);
});

const MIN_LOADING_TIME = 2000; // 4 seconds
const startTime = Date.now();

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  const elapsedTime = Date.now() - startTime;
  const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

  setTimeout(() => {
    preloader.classList.add("is-hidden");

    // Remove from DOM after fade-out
    setTimeout(() => {
      preloader.remove();
    }, 400);
  }, remainingTime);
});


