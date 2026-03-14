function toggleCerts() {
  const extra = document.getElementById('extra-certs');
  const btn = document.getElementById('cert-toggle-btn');
  const icon = document.getElementById('cert-toggle-icon');

  if (!extra || !btn || !icon) {
    return;
  }

  const isHidden = extra.style.display === 'none';
  extra.style.display = isHidden ? 'flex' : 'none';
  extra.style.flexDirection = 'column';
  extra.style.gap = '1rem';
  btn.childNodes[0].textContent = isHidden ? 'Show Less ' : 'Show More ';
  icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';

  if (isHidden) {
    observeFadeInElements(extra);
  }
}

function toggleSkills() {
  const extraCards = document.querySelectorAll('.skill-glow-card.extra-skill');
  const btn = document.getElementById('skills-toggle-btn');
  const icon = document.getElementById('skills-toggle-icon');

  if (!extraCards.length || !btn || !icon) {
    return;
  }

  const isRevealed = extraCards[0].classList.contains('revealed');

  extraCards.forEach(function (card) {
    if (isRevealed) {
      card.classList.remove('revealed');
    } else {
      card.classList.add('revealed');
      initSkillTiltEffects(card);
      observeFadeInElements(card);
      if (card.classList.contains('fade-in') && window.fadeInObserver) {
        window.fadeInObserver.observe(card);
      }
    }
  });

  btn.childNodes[0].textContent = isRevealed ? 'Show More ' : 'Show Less ';
  icon.style.transform = isRevealed ? 'rotate(0deg)' : 'rotate(180deg)';
}

function handleSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('form-success');
  e.target.reset();
  success.classList.remove('hidden');
  setTimeout(function () {
    success.classList.add('hidden');
  }, 4000);
}

window.toggleCerts = toggleCerts;
window.toggleSkills = toggleSkills;
window.handleSubmit = handleSubmit;
