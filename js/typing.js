function initHeroRoleTyping() {
  const roleElement = document.getElementById('hero-role-text');
  if (!roleElement) {
    return;
  }

  const roles = ['Software Developer', 'DevOps Enthusiast', 'Problem Solver'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const tick = function () {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex -= 1;
    } else {
      charIndex += 1;
    }

    roleElement.textContent = currentRole.slice(0, charIndex);

    let delay = isDeleting ? 45 : 85;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 1400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 260;
    }

    window.setTimeout(tick, delay);
  };

  roleElement.textContent = '';
  window.setTimeout(tick, 500);
}
