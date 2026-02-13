// Navbar JavaScript with Custom Class Names

document.addEventListener('DOMContentLoaded', function() {
    
    // Select DOM elements
    const mobileToggleButton = document.querySelector('.mobile-menu-toggle-btn');
    const mobileDropdownMenu = document.querySelector('.mobile-dropdown-menu');
    const navigationHeader = document.querySelector('.primary-navigation-header');
    const navLinks = document.querySelectorAll('.nav-link-element');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Mobile Menu Toggle Function
    function toggleMobileMenu() {
        mobileToggleButton.classList.toggle('menu-active');
        mobileDropdownMenu.classList.toggle('menu-open');
        
        // Prevent body scroll when menu is open
        if (mobileDropdownMenu.classList.contains('menu-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Add click event to mobile toggle button
    if (mobileToggleButton) {
        mobileToggleButton.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileDropdownMenu.classList.contains('menu-open')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Active Link Management
    function setActiveLink() {
        const currentPath = window.location.hash || '#home';
        
        // Desktop menu
        navLinks.forEach(link => {
            link.classList.remove('active-nav-link');
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active-nav-link');
            }
        });
        
        // Mobile menu
        mobileNavLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.style.color = '#2c5282';
            } else {
                link.style.color = '';
            }
        });
    }
    
    // Update active link on page load
    setActiveLink();
    
    // Update active link on hash change
    window.addEventListener('hashchange', setActiveLink);
    
    // Add click event to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active-nav-link'));
            this.classList.add('active-nav-link');
        });
    });
    
    // Navbar Scroll Effect
    let lastScrollPosition = 0;
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow on scroll
        if (currentScrollPosition > scrollThreshold) {
            navigationHeader.classList.add('scrolled-navbar');
        } else {
            navigationHeader.classList.remove('scrolled-navbar');
        }
        
        lastScrollPosition = currentScrollPosition;
    });
    
    // Smooth Scroll for Anchor Links
    function smoothScrollToTarget(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = navigationHeader.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Add smooth scroll to all navigation links
    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollToTarget(href);
                window.history.pushState(null, null, href);
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navigationHeader.contains(event.target);
        const isMenuOpen = mobileDropdownMenu.classList.contains('menu-open');
        
        if (!isClickInsideNav && isMenuOpen) {
            toggleMobileMenu();
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close mobile menu on resize to desktop view
            if (window.innerWidth > 768 && mobileDropdownMenu.classList.contains('menu-open')) {
                toggleMobileMenu();
            }
        }, 250);
    });
    
    // Donate Button Click Handlers
    const donateBtns = document.querySelectorAll('.primary-donate-cta-btn, .mobile-donate-btn');
    donateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add your donate button functionality here
            console.log('Donate button clicked');
            // Example: window.location.href = '/donate';
        });
    });
    
    // Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && mobileDropdownMenu.classList.contains('menu-open')) {
            toggleMobileMenu();
        }
    });
    
});

// Optional: Add scroll spy functionality to highlight active section
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-element');
    
    window.addEventListener('scroll', function() {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-nav-link');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active-nav-link');
            }
        });
    });
}

// Call scroll spy if you have sections with IDs
// initScrollSpy();