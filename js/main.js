/* ============================================
   Contta Business AI - Modern JavaScript
   Premium Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Add page transition class
  document.body.classList.add('page-transition');
  
  initNavbarScroll();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initCounterAnimations();
  initParallaxEffects();
  initMagneticButtons();
  initTiltCards();
});

/**
 * Navbar scroll effect - glassmorphism on scroll
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    
    // Hide/show navbar on scroll direction
    if (currentScroll > lastScroll && currentScroll > 500) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

/**
 * Mobile menu toggle with smooth animation
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (!mobileMenuBtn || !mobileMenu || !menuIcon) return;

  mobileMenuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.style.opacity = '0';
      mobileMenu.style.transform = 'translateY(-10px)';
      
      requestAnimationFrame(() => {
        mobileMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        mobileMenu.style.opacity = '1';
        mobileMenu.style.transform = 'translateY(0)';
      });
      
      menuIcon.classList.remove('fa-bars');
      menuIcon.classList.add('fa-xmark');
    } else {
      mobileMenu.style.opacity = '0';
      mobileMenu.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
      
      menuIcon.classList.remove('fa-xmark');
      menuIcon.classList.add('fa-bars');
    }
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.style.opacity = '0';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
      menuIcon.classList.remove('fa-xmark');
      menuIcon.classList.add('fa-bars');
    });
  });
}

/**
 * Smooth scroll with easing
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
}

/**
 * Intersection Observer for scroll animations
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale');
  
  if (animatedElements.length === 0) return;
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Animated number counters
 */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter');
  
  if (counters.length === 0) return;
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const start = performance.now();
        
        const updateCounter = (currentTime) => {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function (ease-out-expo)
          const easeOutExpo = 1 - Math.pow(2, -10 * progress);
          const current = Math.floor(target * easeOutExpo);
          
          counter.textContent = current + '%';
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + '%';
          }
        };
        
        requestAnimationFrame(updateCounter);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

/**
 * Subtle parallax effect for blobs
 */
function initParallaxEffects() {
  const blobs = document.querySelectorAll('.blob');
  
  if (blobs.length === 0) return;
  
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        blobs.forEach((blob, index) => {
          const speed = 0.05 + (index * 0.02);
          const yPos = scrollY * speed;
          blob.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Magnetic button effect
 */
function initMagneticButtons() {
  const magneticElements = document.querySelectorAll('.magnetic, .btn-primary');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}

/**
 * 3D tilt effect for cards
 */
function initTiltCards() {
  const tiltCards = document.querySelectorAll('.tilt-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}
