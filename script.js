/**
 * Willy Styles - Main JavaScript
 * Handles Animations, Interactions, and Booking Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CONFIGURATION
    const CONFIG = {
        whatsappNumber: '1234567890', // REPLACE WITH YOUR NUMBER
        message: `Hello Willy Styles, I'd like to book a home service appointment.%0A%0AMy Name: %0AService Needed: %0APreferred Date: %0ALocation: `
    };

    // 2. GSAP ANIMATIONS
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Reveal
    const titleSpans = document.querySelectorAll('.display-title span');
    gsap.to(titleSpans, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
    });

    gsap.to(['.hero-desc', '.hero-btns'], {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1
    });

    // Parallax Effect for Hero Background
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

    // Section Headers Fade Up
    gsap.utils.toArray('.section-subtitle, .section-title').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Service Cards Stagger
    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    });

    // Portfolio & Image Reveals
    gsap.utils.toArray('.reveal-img').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
            },
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // 3. MOBILE MENU TOGGLE
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');
    
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const spans = mobileToggle.querySelectorAll('span');
        if(mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        });
    });

    // 4. WHATSAPP BOOKING LOGIC
    const whatsappLinks = document.querySelectorAll('.open-modal, #whatsappLink, .mobile-cta');
    const modalLink = document.getElementById('whatsappLink');
    
    const waURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${CONFIG.message}`;
    if(modalLink) modalLink.href = waURL;

    whatsappLinks.forEach(btn => {
        if(btn.classList.contains('open-modal')) {
            btn.addEventListener('click', (e) => {
                if(!btn.hasAttribute('data-bs-toggle')) {
                    e.preventDefault();
                    window.open(waURL, '_blank');
                }
            });
        }
    });

    // 5. NAVBAR SCROLL EFFECT
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 0';
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });

    // 6. SMOOTH SCROLL FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});