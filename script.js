// Progressive enhancements only: all content and links work without JavaScript.
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const navigationLinks = [...document.querySelectorAll('.main-nav a')];
const sections = navigationLinks.map(link => document.querySelector(link.hash));

function updateNavigation() {
  const header = document.querySelector('.site-header');
  const threshold = (header?.offsetHeight || 0) + 100;
  let activeId = sections[0]?.id;
  for (const section of sections) {
    if (section && section.getBoundingClientRect().top <= threshold) activeId = section.id;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    activeId = sections.at(-1)?.id;
  }
  for (const link of navigationLinks) {
    if (link.hash === `#${activeId}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

let scrollPending = false;
window.addEventListener('scroll', () => {
  if (scrollPending) return;
  scrollPending = true;
  requestAnimationFrame(() => {
    updateNavigation();
    scrollPending = false;
  });
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
