document.querySelectorAll('a').forEach(link => {
  const href = link.getAttribute('href');

  // Skip external links, mailto, same-page anchors,
  // and anything that isn't an HTML page
  if (
    link.hostname !== window.location.hostname ||
    href?.startsWith('#') ||
    href?.startsWith('mailto:') ||
    !href?.endsWith('.html')
  ) return;

  link.addEventListener('click', e => {
    e.preventDefault();

    document.body.classList.add('is-leaving');

    setTimeout(() => {
      window.location.href = href;
    }, 100);
  });
});

// Set current year in footer
document.querySelectorAll('#year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
  
  // Animate project cards into view on scroll (index page)
  const cards = document.querySelectorAll('.project-card');
  if (cards.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger each card slightly
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 80 * Array.from(cards).indexOf(entry.target));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    cards.forEach(card => observer.observe(card));
  }
  
  // Smooth active nav highlighting based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
  
    lightboxImg.src = src;
    lightbox.classList.add("active");
  }
  
  function closeLightbox() {
    document.getElementById("lightbox").classList.remove("active");
  }