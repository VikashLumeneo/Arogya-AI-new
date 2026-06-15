/**
 * SPA page routing and browser history
 */
let currentPage = 'home';

const pages = [
  'home',
  'scribe',
  'radiology',
  'rx',
  'pricing',
  'resources',
  'about',
  'privacy',
  'terms',
  'contact-support'
];

function navigate(page, pushHistory = true) {
  closeMobileNav();

  pages.forEach((p) => {
    const el = document.getElementById('page-' + p);
    const link = document.getElementById('nav-' + p);

    if (el) el.classList.toggle('active', p === page);
    if (link) link.classList.toggle('active', p === page);
  });

  ['scribe', 'radiology'].forEach((p) => {
    const link = document.getElementById('nav-' + p);
    if (link) link.classList.toggle('active', p === page);
  });

  currentPage = page;

  if (pushHistory) {
    const url = page === 'home'
      ? '/'
      : '/#' + page;

    history.pushState({ page }, '', url);
  }

  window.scrollTo(0, 0);
}

window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const page = location.hash.replace('#', '') || 'home';

  if (pages.includes(page)) {
    navigate(page, false);
  } else {
    navigate('home', false);
  }
});

window.addEventListener('popstate', () => {
  const page = location.hash.replace('#', '') || 'home';

  if (pages.includes(page)) {
    navigate(page, false);
  } else {
    navigate('home', false);
  }
});