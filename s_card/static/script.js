// Mobile menu functionality
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
const overlay = document.getElementById('mobile-nav-overlay');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
        if (overlay) overlay.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    });
}

if (overlay) {
    overlay.addEventListener('click', () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
    });
}

// Close menu when clicking on links
const navLinks = document.querySelectorAll('#navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    });
});
