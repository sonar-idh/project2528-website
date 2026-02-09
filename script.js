const hamburger = document.querySelector(".hamburger");
const navLinksMenu = document.querySelector(".nav-links");

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth scroll with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navHeight = document.querySelector(".nav-bar").offsetHeight;
      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight -
        20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      navLinksMenu.classList.remove("active");
      hamburger.setAttribute(
        "aria-expanded",
        navLinksMenu.classList.contains("active")
      ); 
    }
  });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function highlightNavOnScroll() {
   if (window.scrollY < 100) {
    navLinks.forEach((link) => link.classList.remove("active"));
    return;
  }
 
  const scrollPosition = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", debounce(highlightNavOnScroll, 100));
window.addEventListener("load", highlightNavOnScroll);

// Hamburger menu toggle
hamburger.addEventListener("click", () => {
  navLinksMenu.classList.toggle("active");
  hamburger.setAttribute(
    "aria-expanded",
    navLinksMenu.classList.contains("active")
  );
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  const isClickInsideMenu = navLinksMenu.contains(e.target);
  const isClickOnHamburger = hamburger.contains(e.target);

  if (
    !isClickInsideMenu &&
    !isClickOnHamburger &&
    navLinksMenu.classList.contains("active")
  ) {
    navLinksMenu.classList.remove("active");
    hamburger.setAttribute(
      "aria-expanded",
      navLinksMenu.classList.contains("active")
    );
  }
});

// Smooth scroll to top when clicking logo
document.querySelector('.logo-link').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
