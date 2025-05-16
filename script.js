// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  const icon = themeToggle.querySelector('i');
  
  if (body.classList.contains('dark-theme')) {
    icon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// Glitch effect on name text
const glitchText = document.querySelector('.glitch');
function createGlitchEffect() {
  const text = glitchText.innerText;
  const glitchCharIndex = Math.floor(Math.random() * text.length);
  const newChar = Math.random() > 0.5 ? '1' : '0';
  const glitched = text.slice(0, glitchCharIndex) + newChar + text.slice(glitchCharIndex + 1);
  glitchText.dataset.text = glitched;
}
setInterval(createGlitchEffect, 200); // subtle glitch every 200ms

// Animate numbers in stat cards when visible
const stats = document.querySelectorAll('.stat-number');

function animateStats() {
  stats.forEach(stat => {
    const target = parseInt(stat.dataset.target, 10);
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    function update() {
      current += increment;
      if (current < target) {
        stat.textContent = Math.round(current);
        requestAnimationFrame(update);
      } else {
        stat.textContent = target;
      }
    }
    update();
  });
}

// IntersectionObserver to trigger stats animation once when stats container is visible
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      statsObserver.unobserve(entry.target);
    }
  });
});
document.querySelectorAll('.stats-container').forEach(el => statsObserver.observe(el));

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true
});

// Animate skill progress bars on scroll
const progressBars = document.querySelectorAll('.progress');

function animateProgressBars() {
  progressBars.forEach(progress => {
    // Get target width from parent data attribute or default to 0%
    const targetWidth = progress.parentElement.dataset.progress || '0%';
    progress.style.width = targetWidth;
  });
}

const progressObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateProgressBars();
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.skills-grid').forEach(grid => progressObserver.observe(grid));


// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name')?.value || '',
    email: document.getElementById('email')?.value || '',
    message: document.getElementById('message')?.value || ''
  };

  // For demo, just log the data
  console.log('Form submitted:', formData);

  // Simulate async submission & reset form
  setTimeout(() => {
    contactForm.reset();
    alert('Message sent successfully!');
  }, 1000);
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Timeline items animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
};

const timelineObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, timelineObserverOptions);

timelineItems.forEach(item => timelineObserver.observe(item));


// Animate individual skill cards' progress bars when visible (more precise)
document.addEventListener('DOMContentLoaded', () => {
  const skillCards = document.querySelectorAll('.skill-card');
  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.querySelector('.progress');
        const targetWidth = progress.parentElement.dataset.progress || '0%';
        progress.style.width = targetWidth;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillCards.forEach(card => cardObserver.observe(card));
});


// Submit button loading animation
const submitBtn = document.querySelector('.submit-btn');
if (submitBtn) {
  submitBtn.addEventListener('click', function() {
    this.classList.add('loading');
    setTimeout(() => {
      this.classList.remove('loading');
    }, 2000);
  });
}
