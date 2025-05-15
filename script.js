// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Glitch effect
const glitchText = document.querySelector('.glitch');

function createGlitchEffect() {
    const glitchChar = Math.floor(Math.random() * glitchText.innerText.length);
    const newChar = Math.random() > 0.5 ? '1' : '0';
    const glitchedText = glitchText.innerText.slice(0, glitchChar) + newChar + glitchText.innerText.slice(glitchChar + 1);
    glitchText.dataset.text = glitchedText;
}

setInterval(createGlitchEffect, 50);

// Add this to your existing script.js

// Animate numbers in stat cards
const stats = document.querySelectorAll('.stat-number');

function animateStats() {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.round(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };

        updateCount();
    });
}

// Trigger animation when elements are in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stats-container').forEach((el) => observer.observe(el));

AOS.init({
    duration: 1000,
    once: true
});

// Add to your existing script.js

// Animate skill progress bars
const animateProgress = () => {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(progress => {
        progress.style.width = '0%';
        setTimeout(() => {
            progress.style.width = progress.parentElement.dataset.progress || '0%';
        }, 100);
    });
};

// Observe progress bars
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgress();
            progressObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.skills-grid').forEach(el => progressObserver.observe(el));

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add your form submission logic here
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Example: Console log the form data
    console.log('Form submitted:', formData);
    
    // Reset form
    contactForm.reset();
    
    // Show success message (you can customize this)
    alert('Message sent successfully!');
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
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Optional: Add loading animation to submit button
const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', function() {
    this.classList.add('loading');
    setTimeout(() => {
        this.classList.remove('loading');
    }, 2000);
});
