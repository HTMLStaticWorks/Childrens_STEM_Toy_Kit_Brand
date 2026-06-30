// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'slide',
        once: true,
        offset: 50
    });
});

// Close navbar on click (for mobile)
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('navbarNav');
if (menuToggle) {
    const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
    navLinks.forEach((l) => {
        l.addEventListener('click', () => {
            if (menuToggle.classList.contains('show')) {
                bsCollapse.toggle();
            }
        });
    });
}
