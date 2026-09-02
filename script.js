const portfolioItems = [
  { file: "shot-1.jpg", href: "https://www.instagram.com/reel/DcE32CmyzFX/", alt: "Barber serving customers at Premium Looks" },
  { file: "shot-2.jpg", href: "https://www.instagram.com/p/Db9SDXQDyG7/", alt: "Back to school haircuts at Premium Looks" },
  { file: "shot-3.jpg", href: "https://www.instagram.com/p/DbzTnWAlDRd/", alt: "Back to school giveaway with the Premium Looks crew" },
  { file: "shot-4.jpg", href: "https://www.instagram.com/reel/DbwJ7_kyLsj/", alt: "Back to school giveaway announcement" },
  { file: "shot-5.jpg", href: "https://www.instagram.com/reel/DbmVmvwPo-K/", alt: "Kids haircut giveaway with school supplies" },
  { file: "shot-6.jpg", href: "https://www.instagram.com/reel/DbPAimAPTrx/", alt: "Barber at work in the shop" },
  { file: "shot-7.jpg", href: "https://www.instagram.com/reel/Da3ecfgy8Ta/", alt: "Kids cut styled at Premium Looks" },
  { file: "shot-8.jpg", href: "https://www.instagram.com/reel/Daygy3RSKNb/", alt: "Shop vibes — open 7 days a week" },
  { file: "shot-9.jpg", href: "https://www.instagram.com/reel/DabCyBYyfKa/", alt: "Fresh cut at Premium Looks Barbershop" },
  { file: "shot-10.jpg", href: "https://www.instagram.com/reel/DZ-qEv1vet5/", alt: "Grand opening local vendor spotlight" },
  { file: "shot-11.jpg", href: "https://www.instagram.com/reel/DZqN6e0Tir8/", alt: "Grand opening celebration details" },
  { file: "shot-12.jpg", href: "https://www.instagram.com/reel/DZlTpfIBmUg/", alt: "Thank you to everyone who stopped by" }
];

function renderPortfolio() {
  const grid = document.getElementById("portfolio-grid");
  if (!grid) return;

  grid.innerHTML = portfolioItems
    .map(
      (item) => `
      <a href="${item.href}" target="_blank" rel="noopener" aria-label="${item.alt}">
        <img src="assets/portfolio/${item.file}" alt="${item.alt}" loading="lazy" />
      </a>`
    )
    .join("");
}

function setupNav() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  const close = () => {
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };

  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
}

function setupHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  nodes.forEach((node) => observer.observe(node));
}

renderPortfolio();
setupNav();
setupHeader();
setupReveal();
