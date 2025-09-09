// Defensive DOM helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const header = $('header');
const menu = $('#menu-icon');
const navbar = $('.navbar');
const topBtn = document.createElement('a');
topBtn.className = 'top';
topBtn.href = '#';
topBtn.innerHTML = "<i class='bx bx-up-arrow-alt'></i>";
document.body.appendChild(topBtn);

// Sticky header on scroll
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('sticky', window.scrollY > 0);
    });
}

// Mobile menu toggle
if (menu && navbar) {
    menu.addEventListener('click', () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    // close menu when clicking a nav link or on scroll
    $$('.navbar a').forEach(a => a.addEventListener('click', () => {
        menu.classList.remove('bx-x');
        navbar.classList.remove('active');
    }));
}

// Highlight active section link while scrolling
const sections = $$('section, .inner');
const navLinks = $$('.navbar a');
function onScrollHighlight() {
    const y = window.scrollY + (window.innerHeight / 3);
    let currentId = null;
    for (const s of sections) {
        const rect = s.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        if (y >= top && y < top + rect.height) currentId = s.id || null;
    }
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
    });
}
window.addEventListener('scroll', onScrollHighlight);
window.addEventListener('load', onScrollHighlight);

// Scroll reveal with graceful fallback
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({ distance: '25px', duration: 350, reset: false });
    sr.reveal('.home-text', { delay: 150, origin: 'bottom' });
    sr.reveal('.about, .services, .portfolio, .contact, .experience, .skills', { delay: 180, origin: 'bottom' });
} else {
    // If ScrollReveal isn't available, add a simple fade-in class
    $$('.home-text, .about, .services, .portfolio, .contact, .experience, .skills').forEach(el => {
        el.style.opacity = 0;
        el.style.transition = 'opacity 500ms ease, transform 500ms ease';
        requestAnimationFrame(() => { el.style.opacity = 1; el.style.transform = 'translateY(0)'; });
    });
}

// Smooth scroll for anchor links
$$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href.length > 1 && href.startsWith('#')) {
            const el = document.querySelector(href);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Expose a tiny helper for debugging
window.__portfolioHelpers = { onScrollHighlight };