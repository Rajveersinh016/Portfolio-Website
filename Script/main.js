/**
 * Ibrahim Memon Portfolio Website
 * Main JavaScript file for handling navigation and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScrolling();
    initActiveNavHighlighting();
    initParallaxEffects();
    initScrollAnimations();
    initNavbarTransparency();
});

/**
 * Mobile Menu Functionality
 * Toggles the mobile menu and handles closing when links are clicked
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && e.target !== mobileMenuBtn) {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
        }
    });
}

/**
 * Smooth Scrolling for Anchor Links
 * Provides smooth scrolling behavior when clicking navigation links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Active Navigation Highlighting
 * Highlights the current section in the navigation menu based on scroll position
 */
function initActiveNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let current = '';
        const scrollY = window.pageYOffset;
        
        // Find the current section by checking which section is in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            // Adjust the offset for better visual feedback when scrolling
            // This considers a section "active" when it's almost in view
            const offset = 250;
            
            if (scrollY >= (sectionTop - offset) && scrollY < (sectionTop + sectionHeight - offset)) {
                current = sectionId;
            }
        });
        
        // If we scrolled to the bottom of the page, highlight the last section
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50) {
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                current = lastSection.getAttribute('id');
            }
        }
        
        // Extra debugging to help troubleshoot
        console.log('Current section: ', current);
        
        // Update the active class on nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial update
    updateActiveLink();
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Update on resize (in case section positions change)
    window.addEventListener('resize', updateActiveLink);
}

/**
 * Parallax Effects
 * Adds subtle parallax movement to elements based on scroll position
 */
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Avatar parallax effect
        const avatarContainer = document.querySelector('.avatar-container');
        if (avatarContainer) {
            avatarContainer.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
        
        // Text content parallax effect
        const textSection = document.querySelector('.text-section');
        if (textSection) {
            textSection.style.transform = `translateY(${scrollY * 0.05}px)`;
        }
        
        // Parallax background elements
        const parallaxElements = document.querySelectorAll('.parallax-element');
        parallaxElements.forEach((element, index) => {
            const speed = index % 2 === 0 ? 0.08 : 0.05;
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

/**
 * Scroll-based animations
 * Triggers animations when elements enter the viewport
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Check if elements are in viewport
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTop = window.pageYOffset;
        const windowBottom = windowTop + windowHeight;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + windowTop;
            const elementHeight = element.offsetHeight;
            const elementBottom = elementTop + elementHeight;
            
            // Using a threshold to trigger animation before the element is fully in view
            const threshold = 100;
            
            // Element is considered in view when its top enters the bottom part of the viewport
            // minus the threshold, or when its bottom is above the top of the viewport plus threshold
            const isVisible = (elementTop <= windowBottom - threshold) && 
                             (elementBottom >= windowTop + threshold);
            
            if (isVisible) {
                element.classList.add('in-view');
            } else if (!element.classList.contains('always-visible')) {
                // Optional: Remove the class when element is out of view
                // Uncomment to create a repeated animation effect when scrolling up and down
                // element.classList.remove('in-view');
            }
        });
    }
    
    // Run on scroll with throttling for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                checkIfInView();
                scrollTimeout = null;
            }, 10); // 10ms throttle for smoother performance
        }
    });
    
    // Run on initial load with a slight delay to ensure everything is rendered
    setTimeout(checkIfInView, 100);
    
    // Run on resize
    window.addEventListener('resize', checkIfInView);
}

/**
 * Navbar Transparency Control
 * Makes navbar more transparent at top and more solid when scrolling
 */
function initNavbarTransparency() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
} 