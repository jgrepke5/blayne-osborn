// Blayne Osborn Campaign Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.issue-card, .about-image, .priorities-image, .endorsement-block');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Form validation enhancement
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const phone = document.getElementById('phone');

            // Basic phone validation
            if (phone && phone.value) {
                const phoneValue = phone.value.replace(/\D/g, '');
                if (phoneValue.length < 10) {
                    alert('Please enter a valid 10-digit phone number.');
                    phone.focus();
                    return;
                }
            }

            // Submit via fetch so we stay on page and show the popup after success
            var formData = new FormData(form);
            var submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending…';
            }

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' }
            })
            .then(function(response) {
                if (response.ok) {
                    var popup = document.getElementById('support-popup');
                    if (popup) {
                        popup.classList.add('support-popup-visible');
                        popup.setAttribute('aria-hidden', 'false');
                    }
                } else {
                    return response.json().then(function(data) {
                        if (data && data.error) alert(data.error);
                        else alert('Something went wrong. Please try again.');
                    });
                }
            })
            .catch(function() {
                alert('Something went wrong. Please try again.');
            })
            .finally(function() {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Join the Team';
                }
            });
        });

        // Support popup: close on overlay or close button
        const supportPopup = document.getElementById('support-popup');
        if (supportPopup) {
            const overlay = supportPopup.querySelector('.support-popup-overlay');
            const closeBtn = supportPopup.querySelector('.support-popup-close');
            function closeSupportPopup() {
                supportPopup.classList.remove('support-popup-visible');
                supportPopup.setAttribute('aria-hidden', 'true');
            }
            if (overlay) overlay.addEventListener('click', closeSupportPopup);
            if (closeBtn) closeBtn.addEventListener('click', closeSupportPopup);
        }
        
        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.length <= 3) {
                        value = '(' + value;
                    } else if (value.length <= 6) {
                        value = '(' + value.substring(0, 3) + ') ' + value.substring(3);
                    } else {
                        value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 10);
                    }
                }
                e.target.value = value;
            });
        }
    }
    
});
