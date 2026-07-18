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

// Theme & RTL Logic
document.addEventListener('DOMContentLoaded', function() {
    // Scroll to Top Button Injection
    injectScrollToTop();

    // Apply saved preferences early so pages without buttons still get the theme
    const savedTheme = localStorage.getItem('theme');
    const savedDir = localStorage.getItem('dir');

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }

    if (savedDir === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
        const bsCss = document.getElementById('bootstrap-css');
        if(bsCss) bsCss.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css';
    }

    // Theme Button
    const themeBtn = document.createElement('button');
    themeBtn.className = 'btn-theme-toggle';
    themeBtn.innerHTML = savedTheme === 'dark' ? 'Light' : 'Dark';
    
    // RTL Button
    const rtlBtn = document.createElement('button');
    rtlBtn.className = 'btn-rtl-toggle';
    rtlBtn.innerHTML = savedDir === 'rtl' ? 'LTR' : 'RTL';

    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarNav) {
        // Create container for buttons in navbar
        const btnContainer = document.createElement('li');
        btnContainer.className = 'nav-item ms-lg-3 d-flex align-items-center mt-3 mt-lg-0';
        btnContainer.appendChild(themeBtn);
        btnContainer.appendChild(rtlBtn);
        const signUpLink = navbarNav.querySelector('a.btn-primary-custom') || navbarNav.querySelector('a[href="signup.html"]');
        if (signUpLink && signUpLink.parentElement && signUpLink.parentElement.tagName === 'LI') {
            navbarNav.insertBefore(btnContainer, signUpLink.parentElement);
        } else {
            navbarNav.appendChild(btnContainer);
        }
    } else {
        // Create floating container for pages without navbar
        const floatingContainer = document.createElement('div');
        floatingContainer.className = 'position-absolute top-0 end-0 p-3 p-md-4 d-flex align-items-center';
        floatingContainer.style.zIndex = '1050';
        floatingContainer.appendChild(themeBtn);
        floatingContainer.appendChild(rtlBtn);
        document.body.appendChild(floatingContainer);
    }

    // Theme Toggle Event
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-bs-theme');
            themeBtn.innerHTML = 'Dark';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            themeBtn.innerHTML = 'Light';
            localStorage.setItem('theme', 'dark');
        }
    });

    // RTL Toggle Event
    rtlBtn.addEventListener('click', () => {
        const currentDir = document.documentElement.getAttribute('dir');
        const bsCss = document.getElementById('bootstrap-css');
        if (currentDir === 'rtl') {
            document.documentElement.removeAttribute('dir');
            rtlBtn.innerHTML = 'RTL';
            localStorage.setItem('dir', 'ltr');
            if(bsCss) bsCss.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        } else {
            document.documentElement.setAttribute('dir', 'rtl');
            rtlBtn.innerHTML = 'LTR';
            localStorage.setItem('dir', 'rtl');
            if(bsCss) bsCss.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css';
        }
    });

});

function injectScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-to-top';
    scrollTopBtn.className = 'btn-scroll-top';
    scrollTopBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: auto;"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
    scrollTopBtn.setAttribute('title', 'Go to Top');
    document.body.appendChild(scrollTopBtn);


    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrolled > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
        
        // Navbar scrolled state
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrolled > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    });


    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
