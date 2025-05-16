// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
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


// Load saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Glitch effect
const glitchText = document.querySelector('.glitch');

function createGlitchEffect() {
    const glitchChar = Math.floor(Math.random() * glitchText.innerText.length);
    const newChar = Math.random() > 0.5 ? '1' : '0';
    const glitchedText = glitchText.innerText.slice(0, glitchChar) + newChar + glitchText.innerText.slice(glitchChar + 1);
    glitchText.dataset.text = glitchedText;
}

setInterval(createGlitchEffect, 200); // Increased interval for a more subtle effect

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

// Intersection Observer setup
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stats-container').forEach((el) => observer.observe(el));

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

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
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Example: Console log the form data
    console.log('Form submitted:', formData);
    
    // Here you would typically send the data to a server
    // For now, we'll just simulate a successful submission
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
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add loading animation to submit button
const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', function() {
    this.classList.add('loading');
    setTimeout(() => {
        this.classList.remove('loading');
    }, 2000);
});

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

/* JavaScript for Progress Bars */
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.progress');
                const targetWidth = progress.parentElement.dataset.progress || '0%';
                progress.style.width = targetWidth;
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });
});