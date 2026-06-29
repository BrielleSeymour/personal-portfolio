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