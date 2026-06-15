/**
 * SPA page routing and browser history
 */
let currentPage = 'home';
const pages = [
  'home', 'scribe', 'radiology', 'rx', 'pricing',
  'resources', 'about', 'privacy', 'terms', 'contact-support'
 
];

function navigate(page, pushHistory = true) {
  // localStorage.setItem('activePage', page);
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

  const previousPage = currentPage;
  currentPage = page;

 if (pushHistory) {
  if (page !== previousPage) {
    const url = page === 'home'
      ? '/'
      : '/' + page;

    history.pushState({ page }, '', url);
  }
 else if (page === 'home' && location.hash) {
      // Already on home — strip leftover #home without adding a history entry
      history.replaceState({ page: 'home' }, '', window.location.pathname + window.location.search);
    }
  }

  window.scrollTo(0, 0);
}

window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 20);
});

document.addEventListener('DOMContentLoaded', () => {
  const page = location.pathname.replace('/', '') || 'home';

  if (pages.includes(page)) {
    navigate(page, false);
  } else {
    navigate('home', false);
  }
});

window.addEventListener('popstate', () => {
  const page = location.pathname.replace('/', '') || 'home';
  navigate(page, false);
});
