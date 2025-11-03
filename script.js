// Loading Screen - 和風アニメーション
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1500);
});

// Custom Cursor - 和風スタイル
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        followerX += (mouseX - followerX) * 0.08;
        followerY += (mouseY - followerY) * 0.08;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const links = document.querySelectorAll('a, button, input, textarea, select, .clickable');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        link.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

// Header Scroll Effect - 和風
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 30) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // 和風パララックス効果
    const scrolled = currentScroll * 0.5;
    if (document.querySelector('.hero')) {
        document.querySelector('.hero').style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    lastScroll = currentScroll;
});

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Active link update
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Active section detection
const sections = document.querySelectorAll('section[id]');
const navHighlighter = () => {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight && navLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
};

window.addEventListener('scroll', navHighlighter);

// Form Handling - Netlify Formsに対応
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Netlify Formsが処理するため、JavaScriptでの送信処理は削除
    // フォームは通常通りPOSTされ、Netlifyが処理します
}

// Notification System - 和風スタイル
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">×</button>
        </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 20px 25px;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
            z-index: 2000;
            min-width: 320px;
            max-width: 420px;
            animation: slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            border: 1px solid rgba(111, 187, 211, 0.2);
        }

        .notification-success {
            border-left: 3px solid #6fbbd3;
            background: linear-gradient(135deg, #fff 0%, #f0f9ff 100%);
        }

        .notification-error {
            border-left: 3px solid #e6b8a2;
            background: linear-gradient(135deg, #fff 0%, #fff5f2 100%);
        }

        .notification-info {
            border-left: 3px solid #4a9fb5;
            background: linear-gradient(135deg, #fff 0%, #f7fbfd 100%);
        }

        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
        }

        .notification-message {
            flex: 1;
            font-size: 14px;
            color: #2c4f5d;
            line-height: 1.6;
            font-family: 'Noto Sans JP', sans-serif;
        }

        .notification-close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #8b8b8b;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            border-radius: 4px;
        }

        .notification-close:hover {
            color: #4a4a4a;
            background: rgba(0,0,0,0.05);
        }

        @keyframes slideInRight {
            from {
                transform: translateX(120%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(120%);
                opacity: 0;
            }
        }
    `;

    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for Scroll Animations - 和風
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');

            // Stagger animation for child elements
            const children = entry.target.querySelectorAll('.animate-child');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animated');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all elements with animation class
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// 和風パーティクルエフェクト（桜の花びら風）
function createSakuraEffect() {
    const sakuraContainer = document.createElement('div');
    sakuraContainer.className = 'sakura-container';
    sakuraContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;

    // 控えめな桜の花びらを生成
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'sakura-petal';
            petal.style.cssText = `
                position: absolute;
                width: ${Math.random() * 15 + 10}px;
                height: ${Math.random() * 15 + 10}px;
                background: linear-gradient(135deg, rgba(164, 212, 225, 0.3), rgba(111, 187, 211, 0.2));
                border-radius: 0 100% 0 100%;
                left: ${Math.random() * 100}%;
                top: -20px;
                animation: sakuraFall ${Math.random() * 10 + 15}s linear;
                opacity: ${Math.random() * 0.5 + 0.3};
                transform: rotate(${Math.random() * 360}deg);
            `;
            sakuraContainer.appendChild(petal);

            // Remove petal after animation
            petal.addEventListener('animationend', () => {
                petal.remove();
            });
        }, Math.random() * 8000);
    }

    document.body.appendChild(sakuraContainer);

    // Add animation
    const sakuraStyle = document.createElement('style');
    sakuraStyle.textContent = `
        @keyframes sakuraFall {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(calc(100vh + 20px)) translateX(${Math.random() * 200 - 100}px) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(sakuraStyle);
}

// デスクトップのみで桜エフェクトを有効化
if (window.innerWidth > 1024) {
    setInterval(createSakuraEffect, 10000);
    createSakuraEffect(); // 初回実行
}

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(start).toLocaleString();
    }, 16);
}

// Observe stat numbers
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const target = parseInt(entry.target.getAttribute('data-target') || entry.target.textContent);
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(number => {
    statObserver.observe(number);
});

// Performance optimization - Debounce & Throttle
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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events
const throttledScroll = throttle(() => {
    navHighlighter();
}, 100);

window.addEventListener('scroll', throttledScroll);

// Initialize on page load
window.addEventListener('load', () => {
    // Remove loading screen
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        loadingScreen.classList.add('hidden');
    }

    // Initialize animations
    document.body.classList.add('loaded');

    // Set initial active nav
    navHighlighter();
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}