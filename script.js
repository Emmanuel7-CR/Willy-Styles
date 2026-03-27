// script.js - Willy Styles Mobile Barber

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // BOOKING FORM - WhatsApp Integration
    // ========================================
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 1. Get form values
            const name = document.getElementById('name').value.trim();
            const location = document.getElementById('location').value.trim();
            const service = document.getElementById('service').value;
            const timeInput = document.getElementById('time').value;
            
            // Validate required fields
            if (!name || !location || !timeInput) {
                alert('Please fill in all required fields');
                return;
            }
            
            // 2. Format time for better readability
            const timeObj = new Date(timeInput);
            const formattedTime = timeObj.toLocaleString('en-NG', {
                weekday: 'short',
                day: 'numeric',
                month: 'short', 
                hour: '2-digit',
                minute: '2-digit'
            });
            
            // 3. Build the WhatsApp message (clean, no manual encoding)
            const message = `🔹 *NEW BOOKING REQUEST* 🔹

*Client:* ${name}
*Location:* ${location}
*Service:* ${service}
*Preferred Time:* ${formattedTime}

Please confirm availability. Thank you!`;
            
            // 4. WhatsApp API Configuration
            // Phone: +234 814 369 0562 → 2348143690562 (no +, no spaces)
            const phoneNumber = "2348143690562";
            
            // CRITICAL: Use encodeURIComponent() for URL-safe message
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // 5. Open WhatsApp in new tab
            const whatsappWindow = window.open(whatsappURL, '_blank', 'noopener');
            
            // 6. Fallback if popup is blocked
            setTimeout(function() {
                if (!whatsappWindow || whatsappWindow.closed || typeof whatsappWindow.closed === 'undefined') {
                    alert('WhatsApp could not open automatically.\n\nPlease click the green WhatsApp button on this page to chat directly.');
                }
            }, 1000);
        });
    }
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            const isExpanded = navLinks.style.display === 'flex';
            
            if (isExpanded) {
                // Close menu
                navLinks.style.display = 'none';
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                // Open menu
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '60px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';
                navLinks.style.zIndex = '999';
                menuBtn.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
        
        // Close menu when clicking a link (mobile UX)
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    navLinks.style.display = 'none';
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
    
    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // STICKY HEADER EFFECT ON SCROLL
    // ========================================
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }
    
    // ========================================
    // FADE-IN ANIMATIONS ON SCROLL (Simple)
    // ========================================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature-item, .testimonial-card, .gallery-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize animation styles
    document.querySelectorAll('.service-card, .feature-item, .testimonial-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // ========================================
// FAQ / Q&A TOGGLE
// ========================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        
        // Toggle visibility
        const isVisible = answer.style.display === 'block';
        answer.style.display = isVisible ? 'none' : 'block';
        
        // Optional: Close other open answers
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.nextElementSibling.style.display = 'none';
            }
        });
    });
});
    
});