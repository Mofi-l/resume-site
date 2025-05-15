lucide.createIcons();

function toggleMode() {
  document.body.classList.toggle('dark-mode');
  document.getElementById('sidebar').classList.toggle('dark-mode');
}

// Animate sections on scroll
const animateSections = () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight * 0.75) {
      section.classList.add('fade-in');
    }
  });
};

window.addEventListener('scroll', animateSections);
window.addEventListener('load', animateSections);

// Animate skill items
anime({
  targets: '.grid li',
  scale: [0.5, 1],
  opacity: [0, 1],
  delay: anime.stagger(100),
  easing: 'easeOutElastic(1, .5)'
});

// Animate nav items
anime({
  targets: '.nav-item',
  translateX: [-20, 0],
  opacity: [0, 1],
  delay: anime.stagger(100),
  easing: 'easeOutQuad'
});
