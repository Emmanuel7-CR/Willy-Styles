/**
 * Willy Styles - Main JavaScript
 * Handles Animations, Interactions, and Booking Logic
 * Production-ready with iOS/iPhone compatibility
 */

(function() {
    'use strict';

    // =========================================
    // 1. UTILITY FUNCTIONS
    // =========================================
    
    const Utils = {
        // Check if device is iOS
        isIOS: () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
        
        // Check if device supports touch
        isTouch: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        
        // Get iOS version
        getIOSVersion: () => {
            const match = navigator.userAgent.match(/OS (\d+)_(\d+)?_?(\d+)?/);
            return match ? parseFloat(`${match[1]}.${match[2] || 0}`) : 0;
        },
        
        // Debounce function for performance
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Smooth scroll with offset
        scrollTo: (target, offset = 80) => {
            const element = document.querySelector(target);
            if (!element) return;
            
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // =========================================
    // 2. CONFIGURATION
    // =========================================
    
    const CONFIG = {
        whatsapp: {
            number: '+2348143690562', // REPLACE WITH YOUR NUMBER (no + or spaces)
            message: `Hello Willy Styles, I'd like to book a home service appointment.%0A%0AMy Name: %0AService Needed: %0APreferred Date: %0ALocation: `
        },
        animations: {
            duration: 1,
            ease: 'power3.out',
            stagger: 0.2
        },
        navbar: {
            scrollThreshold: 50,
            paddingSmall: '1rem 0',
            paddingLarge: '1.5rem 0',
            bgScrolled: 'rgba(10, 10, 10, 0.95)',
            bgDefault: 'rgba(10, 10, 10, 0.8)'
        }
    };

    // =========================================
    // 3. iOS COMPATIBILITY FIXES
    // =========================================
    
    function initiOSFixes() {
        if (!Utils.isIOS()) return;
        
        console.log('iOS detected - applying compatibility fixes');
        
        // Fix 1: Prevent double-tap zoom delay
        document.addEventListener('touchstart', function() {}, { passive: true });
        
        // Fix 2: Handle touch events on interactive elements
        const interactiveSelectors = 'a[href], button, .service-card, .portfolio-item, .tag, .nav-link, .btn-primary, .btn-outline';
        
        document.querySelectorAll(interactiveSelectors).forEach(element => {
            // Add touch-friendly cursor
            element.style.cursor = 'pointer';
            
            // Handle touchend for links
            if (element.tagName === 'A' && element.getAttribute('href') && element.getAttribute('href') !== '#') {
                element.addEventListener('touchend', function(e) {
                    const href = this.getAttribute('href');
                    const target = this.getAttribute('target');
                    
                    // Only handle external links or WhatsApp links
                    if (href.includes('wa.me') || target === '_blank' || href.startsWith('http')) {
                        e.preventDefault();
                        window.open(href, target || '_self');
                    }
                    // Let internal anchor links work normally for smooth scroll
                }, { passive: false });
            }
        });
        
        // Fix 3: Ensure viewport is properly set
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport && !viewport.content.includes('viewport-fit=cover')) {
            viewport.content += ', viewport-fit=cover';
        }
        
        // Fix 4: Disable complex animations on older iOS
        const iosVersion = Utils.getIOSVersion();
        if (iosVersion > 0 && iosVersion < 14) {
            document.documentElement.classList.add('ios-legacy');
            console.log(`iOS ${iosVersion} detected - using simplified animations`);
        }
    }

    // =========================================
    // 4. GSAP ANIMATIONS (with iOS fallbacks)
    // =========================================
    
    function initAnimations() {
        // Check if GSAP is loaded
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded - skipping animations');
            return;
        }
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Determine if we should use simplified animations
        const useSimpleAnimations = Utils.isIOS() && Utils.getIOSVersion() < 14;
        
        // Helper: Create animation with iOS fallback
        const animate = (targets, vars, fallbackVars = {}) => {
            if (useSimpleAnimations) {
                // Simple fade-in for older iOS
                gsap.set(targets, { opacity: 1, y: 0, scale: 1, ...fallbackVars });
            } else {
                // Full animation for modern devices
                gsap.to(targets, { ...vars });
            }
        };
        
        // Hero Text Reveal
        const titleSpans = document.querySelectorAll('.display-title span');
        if (titleSpans.length) {
            animate(titleSpans, {
                y: 0,
                opacity: 1,
                duration: CONFIG.animations.duration,
                stagger: CONFIG.animations.stagger,
                ease: CONFIG.animations.ease,
                delay: 0.5
            }, { opacity: 1 });
        }
        
        animate(['.hero-desc', '.hero-btns'], {
            y: 0,
            opacity: 1,
            duration: CONFIG.animations.duration,
            stagger: CONFIG.animations.stagger,
            ease: CONFIG.animations.ease,
            delay: 1
        }, { opacity: 1 });
        
        // Parallax Effect (disabled on iOS for performance)
        if (!Utils.isIOS()) {
            gsap.to(".parallax-bg", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
        
        // Section Headers Fade Up
        gsap.utils.toArray('.section-subtitle, .section-title').forEach(element => {
            animate(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, { opacity: 1, y: 0 });
        });
        
        // Service Cards Stagger
        animate(".service-card", {
            scrollTrigger: {
                trigger: ".services-grid",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, { opacity: 1, y: 0 });
        
        // Portfolio & Image Reveals
        gsap.utils.toArray('.reveal-img').forEach(element => {
            animate(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                },
                scale: 0.95,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            }, { opacity: 1, scale: 1 });
        });
        
        // Experience Cards Animation
        animate(".experience-card", {
            scrollTrigger: {
                trigger: ".experience-grid",
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out"
        }, { opacity: 1, y: 0 });
    }

    // =========================================
    // 5. MOBILE MENU TOGGLE
    // =========================================
    
    function initMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-links a');
        
        if (!mobileToggle || !mobileMenu) return;
        
        // Toggle menu
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // =========================================
    // 6. WHATSAPP BOOKING LOGIC
    // =========================================
    
    function initWhatsAppBooking() {
        // Build WhatsApp URL (fixed: no spaces)
        const waURL = `https://wa.me/${CONFIG.whatsapp.number}?text=${CONFIG.whatsapp.message}`;
        
        // Update modal link if exists
        const modalLink = document.getElementById('whatsappLink');
        if (modalLink) {
            modalLink.href = waURL;
        }
        
        // Handle all booking buttons
        const bookingButtons = document.querySelectorAll('a[href*="wa.me"], .btn-primary[href], .btn-book, .sticky-cta, .mobile-cta, .service-link');
        
        bookingButtons.forEach(btn => {
            // Skip if already has WhatsApp URL
            if (btn.href && btn.href.includes('wa.me')) return;
            
            btn.addEventListener('click', function(e) {
                // Allow external links to open normally
                if (this.getAttribute('target') === '_blank' && this.href && !this.href.startsWith('#')) {
                    return;
                }
                
                // Handle internal anchor links
                if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                    return;
                }
                
                // Open WhatsApp for booking
                e.preventDefault();
                
                // Try to open in same tab on mobile, new tab on desktop
                if (Utils.isTouch()) {
                    window.location.href = waURL;
                } else {
                    window.open(waURL, '_blank');
                }
                
                // Track conversion (optional)
                console.log('Booking initiated via WhatsApp');
            });
        });
    }

    // =========================================
    // 7. NAVBAR SCROLL EFFECT
    // =========================================
    
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        // Initial check
        handleScroll();
        
        // Debounced scroll handler for performance
        window.addEventListener('scroll', Utils.debounce(handleScroll, 100));
        
        function handleScroll() {
            if (window.scrollY > CONFIG.navbar.scrollThreshold) {
                navbar.style.padding = CONFIG.navbar.paddingSmall;
                navbar.style.background = CONFIG.navbar.bgScrolled;
                navbar.classList.add('scrolled');
            } else {
                navbar.style.padding = CONFIG.navbar.paddingLarge;
                navbar.style.background = CONFIG.navbar.bgDefault;
                navbar.classList.remove('scrolled');
            }
        }
    }

    // =========================================
    // 8. SMOOTH SCROLL FOR ANCHOR LINKS
    // =========================================
    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if not a valid anchor
                if (!href || href === '#' || href.length < 2) return;
                
                // Skip if it's a WhatsApp link or external
                if (href.includes('wa.me') || href.startsWith('http')) return;
                
                e.preventDefault();
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Smooth scroll to target
                Utils.scrollTo(href);
            });
        });
    }

    // =========================================
    // 9. PERFORMANCE: LAZY LOAD IMAGES
    // =========================================
    
    function initLazyLoad() {
        if (!('IntersectionObserver' in window)) return;
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // =========================================
    // 10. PORTFOLIO HOVER EFFECTS (Touch-Friendly)
    // =========================================
    
    function initPortfolioEffects() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (Utils.isTouch()) {
            // On touch devices, use tap to toggle overlay
            portfolioItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    // Don't trigger if clicking a link inside
                    if (e.target.closest('a')) return;
                    
                    this.classList.toggle('active');
                });
            });
        }
        // Hover effects are handled by CSS for desktop
    }

    // =========================================
    // 11. SERVICE CARD INTERACTIONS
    // =========================================
    
    function initServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            // Add subtle scale effect on touch start for feedback
            if (Utils.isTouch()) {
                card.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.98)';
                });
                
                card.addEventListener('touchend', function() {
                    this.style.transform = '';
                });
            }
        });
    }

    // =========================================
    // 12. ERROR HANDLING & FALLBACKS
    // =========================================
    
    function initErrorHandling() {
        // Handle GSAP loading errors
        if (typeof gsap === 'undefined') {
            console.warn('GSAP failed to load - animations disabled');
            // Fallback: show content immediately
            document.querySelectorAll('.display-title span, .hero-desc, .hero-btns').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        }
        
        // Handle image load errors
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                console.warn(`Failed to load image: ${this.src}`);
                this.style.display = 'none';
                // Could add placeholder here
            });
        });
        
        // Global error handler
        window.addEventListener('error', function(e) {
            console.error('Global error:', e.error);
            // Don't break the site - log and continue
        });
    }

    // =========================================
    // 13. MAIN INITIALIZATION
    // =========================================
    
    function init() {
        console.log('Willy Styles - Initializing...');
        
        // Apply iOS fixes first
        initiOSFixes();
        
        // Initialize all features
        initAnimations();
        initMobileMenu();
        initWhatsAppBooking();
        initNavbarScroll();
        initSmoothScroll();
        initLazyLoad();
        initPortfolioEffects();
        initServiceCards();
        initErrorHandling();
        
        // Mark as initialized
        document.documentElement.classList.add('js-loaded');
        
        console.log('Willy Styles - Ready ✂️');
    }

    // =========================================
    // 14. START APPLICATION
    // =========================================
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM already ready
        init();
    }
    
    // Also handle page show (for back/forward navigation)
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // Page was restored from bfcache - re-initialize if needed
            console.log('Page restored from cache');
        }
    });

})();