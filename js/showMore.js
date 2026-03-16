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

const emailConfig = {
  publicKey: 'v5w6aGa_ZDHq8ZzSI',
  serviceId: 'service_hgjt7iq',
  templateId: 'template_sbotun2'
};

emailjs.init({ publicKey: emailConfig.publicKey });

function setFormStatus(statusElement, message, isSuccess) {
  if (!statusElement) {
    return;
  }

  statusElement.textContent = message;
  statusElement.classList.remove('hidden');
  statusElement.style.color = isSuccess ? 'var(--green)' : '#f87171';
}

async function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const statusElement = document.getElementById('form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  const submitText = submitButton ? submitButton.querySelector('span') : null;

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add('opacity-70', 'cursor-not-allowed');
  }

  if (submitText) submitText.textContent = 'Sending...';
  if (statusElement) statusElement.classList.add('hidden');

  try {

    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      formData
    );

    form.reset();

    setFormStatus(statusElement,
      "Message sent successfully. I'll get back to you soon.",
      true
    );

  } catch (error) {
    console.error('Email send failed:', error);
    setFormStatus(statusElement,
      'Failed to send message. Please try again.',
      false
    );
  }

  finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.classList.remove('opacity-70', 'cursor-not-allowed');
    }
    if (submitText) submitText.textContent = 'Send Message';
  }
}