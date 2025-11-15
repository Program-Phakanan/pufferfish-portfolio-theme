// ===== Pufferfish Cursor =====
const pufferfish = document.querySelector('.cursor-pufferfish');
const bubbleCanvas = document.getElementById('bubbleTrail');
const ctx = bubbleCanvas ? bubbleCanvas.getContext('2d') : null;

if (bubbleCanvas) {
    bubbleCanvas.width = window.innerWidth;
    bubbleCanvas.height = window.innerHeight;
}

let mouseX = 0, mouseY = 0;
let pufferfishX = 0, pufferfishY = 0;
let bubbles = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create blue bubble trail (like soap bubbles)
    if (Math.random() > 0.85 && bubbles.length < 15) {
        bubbles.push({
            x: mouseX + (Math.random() - 0.5) * 10,
            y: mouseY + (Math.random() - 0.5) * 10,
            size: Math.random() * 6 + 4,
            life: 1,
            vx: (Math.random() - 0.5) * 1.5,
            vy: Math.random() * -2.5 - 0.5,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02
        });
    }
});

function animatePufferfish() {
    // Smooth pufferfish movement with easing
    pufferfishX += (mouseX - pufferfishX) * 0.15;
    pufferfishY += (mouseY - pufferfishY) * 0.15;

    if (pufferfish) {
        pufferfish.style.left = pufferfishX + 'px';
        pufferfish.style.top = pufferfishY + 'px';
    }
    
    // Draw blue soap bubbles
    if (ctx && bubbleCanvas) {
        ctx.clearRect(0, 0, bubbleCanvas.width, bubbleCanvas.height);
        
        bubbles = bubbles.filter(bubble => {
            bubble.x += bubble.vx;
            bubble.y += bubble.vy;
            bubble.life -= 0.008;
            bubble.size *= 0.995;
            bubble.rotation += bubble.rotationSpeed;
            
            if (bubble.life > 0) {
                // Main bubble (light blue)
                ctx.save();
                ctx.translate(bubble.x, bubble.y);
                ctx.rotate(bubble.rotation);
                
                // Outer glow
                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, bubble.size);
                gradient.addColorStop(0, `rgba(135, 206, 250, ${bubble.life * 0.6})`); // Light sky blue
                gradient.addColorStop(0.5, `rgba(100, 181, 246, ${bubble.life * 0.4})`); // Blue
                gradient.addColorStop(1, `rgba(66, 165, 245, ${bubble.life * 0.1})`); // Darker blue
                
                ctx.beginPath();
                ctx.arc(0, 0, bubble.size, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Bubble rim (cyan)
                ctx.beginPath();
                ctx.arc(0, 0, bubble.size, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(0, 191, 255, ${bubble.life * 0.5})`; // Deep sky blue
                ctx.lineWidth = 1.5;
                ctx.stroke();
                
                // Highlight spots (white)
                ctx.beginPath();
                ctx.arc(-bubble.size * 0.3, -bubble.size * 0.3, bubble.size * 0.25, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${bubble.life * 0.9})`;
                ctx.fill();
                
                ctx.beginPath();
                ctx.arc(bubble.size * 0.4, bubble.size * 0.2, bubble.size * 0.15, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${bubble.life * 0.7})`;
                ctx.fill();
                
                ctx.restore();
                
                return true;
            }
            return false;
        });
    }

    requestAnimationFrame(animatePufferfish);
}

// Show pufferfish cursor on desktop (but keep normal cursor visible)
if (window.innerWidth > 768) {
    animatePufferfish();
    // Don't hide the default cursor
} else {
    if (pufferfish) pufferfish.style.display = 'none';
    if (bubbleCanvas) bubbleCanvas.style.display = 'none';
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
    if (bubbleCanvas) {
        bubbleCanvas.width = window.innerWidth;
        bubbleCanvas.height = window.innerHeight;
    }
});

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    // Navbar always stays visible
}, { passive: true });

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, { passive: true });

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ===== Typing Effect for Hero Section =====
const heroTagline = document.querySelector('.hero-tagline');
if (heroTagline) {
    const text = heroTagline.textContent;
    heroTagline.textContent = '';
    let charIndex = 0;

    function typeText() {
        if (charIndex < text.length) {
            heroTagline.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        }
    }

    // Start typing after page load
    setTimeout(typeText, 800);
}

// ===== Parallax Effect =====
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-content');
            
            parallaxElements.forEach(element => {
                const speed = 0.3;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ===== Project Image Hover Effect =====
const projectCards = document.querySelectorAll('.project.featured');
projectCards.forEach(card => {
    const projectImage = card.querySelector('.project-img-wrapper');
    const projectContent = card.querySelector('.project-content');

    if (projectImage && projectContent) {
        card.addEventListener('mouseenter', () => {
            projectImage.style.transform = 'scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            projectImage.style.transform = 'scale(1)';
        });
    }
});

// ===== Cursor Interaction with Links =====
const interactiveElements = document.querySelectorAll('a, button, .btn');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (pufferfish) {
            pufferfish.style.transform = 'translate(-50%, -50%) scale(1.3)';
        }
    });

    element.addEventListener('mouseleave', () => {
        if (pufferfish) {
            pufferfish.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
});

// ===== Scroll to Top on Logo Click =====
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
    navLogo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Email Obfuscation =====
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Email tracking or analytics can be added here
        console.log('Email link clicked');
    });
});

// ===== Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== Code Block Animation =====
const codeBlock = document.querySelector('.code-block');
if (codeBlock) {
    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'float 8s ease-in-out infinite';
            }
        });
    }, { threshold: 0.5 });

    codeObserver.observe(codeBlock);
}

// ===== Project Cards Stagger Animation =====
const otherProjectCards = document.querySelectorAll('.other-project-card');
otherProjectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cardObserver.observe(card);
});

// ===== Tech List Animation =====
const techListItems = document.querySelectorAll('.tech-list li');
techListItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.5 });

    techObserver.observe(item);
});

// ===== Contact Info Animation =====
const contactInfoItems = document.querySelectorAll('.contact-info-item');
contactInfoItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    contactObserver.observe(item);
});

// ===== Button Ripple Effect =====
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===== Console Easter Egg =====
console.log('%c🚀 Welcome to my portfolio!', 'color: #64ffda; font-size: 20px; font-weight: bold; font-family: monospace;');
console.log('%c👨‍💻 Like what you see? Let\'s build something together!', 'color: #8892b0; font-size: 14px; font-family: monospace;');
console.log('%c📧 program.phakanan@gmail.com', 'color: #a8b2d1; font-size: 12px; font-family: monospace;');

// ===== Performance Optimization =====
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events if needed
const debouncedScroll = debounce(() => {
    // Additional scroll-based animations can be added here
}, 10);

// ===== Accessibility Enhancements =====
// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#about';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--green);
    color: var(--navy);
    padding: 8px;
    text-decoration: none;
    z-index: 100;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.prepend(skipLink);

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===== Preload Critical Assets =====
const preloadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

preloadImages();

// ===== Smooth Scroll Performance =====
// Use passive event listeners for better scroll performance
const scrollOptions = {
    passive: true
};

// ===== Animation Performance =====
// Use CSS transforms and opacity for better animation performance
// Avoid animating properties like width, height, top, left

// ===== Resource Hints =====
// Prefetch next pages or resources
const prefetchLinks = document.querySelectorAll('link[rel="prefetch"]');
prefetchLinks.forEach(link => {
    // Prefetch logic here
});

// ===== Service Worker Registration (Optional) =====
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(registration => console.log('SW registered'))
//             .catch(err => console.log('SW registration failed'));
//     });
// }

// ===== Intersection Observer for Lazy Loading =====
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            // Lazy load logic
            lazyLoadObserver.unobserve(element);
        }
    });
}, {
    rootMargin: '50px'
});

// ===== Performance Monitoring =====
// Log page load performance
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});

// ===== Smooth Page Transitions =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
// ===== Simple Projects Slider =====
let currentSlide = 0;
const slides = document.querySelectorAll('.project-slide');
const dots = document.querySelectorAll('.slider-dots .dot');
const prevBtn = document.querySelector('.nav-arrow.prev');
const nextBtn = document.querySelector('.nav-arrow.next');

function showSlide(index) {
    // Wrap around
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    // Remove active class from all
    slides.forEach(slide => {
        slide.classList.remove('active', 'exiting');
    });
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Add active class to current
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentSlide = index;
}

function nextSlide() {
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('exiting');
    }
    showSlide(currentSlide + 1);
}

function prevSlide() {
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('exiting');
    }
    showSlide(currentSlide - 1);
}

// Event listeners
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index !== currentSlide) {
            if (slides[currentSlide]) {
                slides[currentSlide].classList.add('exiting');
            }
            showSlide(index);
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Touch/Swipe support
let touchStartX = 0;
let touchEndX = 0;

const sliderWrapper = document.querySelector('.slider-wrapper');
if (sliderWrapper) {
    sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Initialize
if (slides.length > 0) {
    showSlide(0);
}