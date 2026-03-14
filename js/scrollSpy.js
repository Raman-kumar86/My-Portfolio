function initActiveNavHighlight() {
  const sectionIds = ['about', 'skills', 'projects', 'certificates', 'achievements', 'education', 'contact'];
  const navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
  const sections = sectionIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  const navBar = document.querySelector('nav.nav-glass');

  if (!navLinks.length || !sections.length) {
    return;
  }

  const setActiveLink = function (sectionId) {
    navLinks.forEach(function (link) {
      const isActive = link.getAttribute('href') === '#' + sectionId;
      link.classList.toggle('active', isActive);
    });
  };

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      const sectionId = link.getAttribute('href').slice(1);
      setActiveLink(sectionId);
    });
  });

  let ticking = false;
  const updateActiveByScroll = function () {
    const navHeight = navBar ? navBar.offsetHeight : 0;
    const anchorY = window.scrollY + navHeight + 90;
    let activeId = sections[0].id;

    sections.forEach(function (section) {
      if (section.offsetTop <= anchorY) {
        activeId = section.id;
      }
    });

    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 8;
    if (atBottom) {
      activeId = sections[sections.length - 1].id;
    }

    setActiveLink(activeId);
    ticking = false;
  };

  const requestUpdate = function () {
    if (!ticking) {
      window.requestAnimationFrame(updateActiveByScroll);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  requestUpdate();
}
