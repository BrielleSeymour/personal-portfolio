document.querySelectorAll('a').forEach(link => {
    // Skip external links, mailto, and same-page anchors
    if (
      link.hostname !== window.location.hostname ||
      link.getAttribute('href')?.startsWith('#') ||
      link.getAttribute('href')?.startsWith('mailto')
    ) return;
  
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
  
      // Trigger fade out, then navigate once it's done
      document.body.classList.add('is-leaving');
      setTimeout(() => { window.location.href = href; }, 100);
    });
  });

// Smooth scroll to section on TOC link click
document.querySelectorAll('.toc-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Highlight the active TOC link as the user scrolls
  const sections = document.querySelectorAll('.case-study-section');
  const tocLinks = document.querySelectorAll('.toc-link');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active from all links, then set it on the matching one
        tocLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, {
    // Trigger when a section crosses the upper third of the viewport
    rootMargin: '-20% 0px -70% 0px'
  });
  
  sections.forEach(section => observer.observe(section));
