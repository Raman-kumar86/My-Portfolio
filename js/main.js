(function () {
  const sectionLoadOrder = [
    { placeholderId: 'navbar', file: 'sections/navbar.html' },
    { placeholderId: 'hero', file: 'sections/hero.html' },
    { placeholderId: 'about', file: 'sections/about.html' },
    { placeholderId: 'skills', file: 'sections/skills.html' },
    { placeholderId: 'projects', file: 'sections/projects.html' },
    { placeholderId: 'certifications', file: 'sections/certifications.html' },
    { placeholderId: 'achievements', file: 'sections/achievements.html' },
    { placeholderId: 'education', file: 'sections/education.html' },
    { placeholderId: 'contact', file: 'sections/contact.html' }
  ];

  const projectsData = [
    {
      title: 'Student Management Platform',
      category: 'Backend',
      image: 'assets/images/project_student_management.png',
      imageAlt: 'Student Management Platform preview',
      description: 'A modern student management platform built to streamline academic operations while showcasing production-minded engineering. The project focuses on dependable backend workflows, clean data handling, and DevOps practices that make deployment and maintenance easier as the system scales.',
      stack: ['Java', 'SQL', 'Backend', 'CI/CD', 'Docker'],
      features: [
        'Centralized student, course, and administrative workflow management.',
        'DevOps-oriented delivery pipeline with automation and containerization in mind.',
        'Cloud-ready architecture that supports smoother deployment and operational consistency.'
      ],
      github: 'https://github.com/Raman-kumar86/student-management-devops',
      demo: ''
    },
    {
      title: 'Feedback System',
      category: 'Full Stack',
      image: 'assets/images/project_feedback_system.png',
      imageAlt: 'Feedback System preview',
      description: 'An interactive feedback platform designed for collecting, managing, and analyzing user responses efficiently. It combines a simple submission experience with structured reporting so the system is useful both for contributors and for administrators reviewing trends.',
      stack: ['Python', 'Web Dev', 'SQL', 'Analytics'],
      features: [
        'Feedback submission and management flow with an accessible interface.',
        'Reporting support for reviewing trends and aggregated response quality.',
        'Structured backend logic for storing, filtering, and retrieving response data.'
      ],
      github: 'https://github.com/Raman-kumar86/GridSense',
      demo: ''
    },
    {
      title: 'Labour Guard',
      category: 'Web Dev',
      image: 'assets/images/project_labour_guard.png',
      imageAlt: 'Labour Guard preview',
      description: 'A web platform centered on labour-law awareness, ethical workplace practices, and user privacy. The experience is designed to present rights-related information clearly so workers and organizations can understand compliance responsibilities without friction.',
      stack: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      features: [
        'Clear educational presentation of worker rights and workplace responsibilities.',
        'Privacy-conscious experience tailored to sensitive labour and compliance topics.',
        'Practical web interface focused on accessibility and straightforward navigation.'
      ],
      github: 'https://github.com/Raman-kumar86/Labour_Guard',
      demo: ''
    },
    {
      title: 'Driver Sentiment Engine',
      category: 'Backend',
      image: 'assets/images/project_driver_sentiment.png',
      imageAlt: 'Driver Sentiment Engine preview',
      description: 'A scalable asynchronous analytics system for processing driver and service feedback with queue-based workflows. It emphasizes reliable background processing, real-time operational visibility, and a backend structure suited for higher-throughput review analysis.',
      stack: ['Node.js', 'TypeScript', 'Express.js', 'Redis', 'BullMQ'],
      features: [
        'Queue-driven sentiment analysis pipeline for high-volume review processing.',
        'Redis and BullMQ integration for background job orchestration and resilience.',
        'Operational insight into service quality through structured analytics output.'
      ],
      github: 'https://github.com/Raman-kumar86/driver-sentiment-engine',
      demo: ''
    }
  ];

  async function loadSection(placeholderId, file) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) {
      return;
    }

    const response = await fetch(file);
    if (!response.ok) {
      throw new Error('Failed to load section: ' + file);
    }

    const html = await response.text();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim();
    const firstElement = wrapper.firstElementChild;

    if (!firstElement) {
      return;
    }

    placeholder.replaceWith(firstElement);
  }

  function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuBtn || !mobileMenu) {
      return;
    }

    menuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
      });
    });
  }

  function initFadeInObserver() {
    const fadeInObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    window.fadeInObserver = fadeInObserver;
    observeFadeInElements(document);
  }

  function observeFadeInElements(root) {
    if (!window.fadeInObserver) {
      return;
    }

    (root || document).querySelectorAll('.fade-in').forEach(function (el) {
      window.fadeInObserver.observe(el);
    });
  }

  function initSkillTiltEffects(root) {
    (root || document).querySelectorAll('.skill-tilt-zone').forEach(function (zone) {
      if (zone.dataset.tiltInitialized === 'true') {
        return;
      }

      zone.addEventListener('mouseenter', function () {
        zone.style.transition = 'transform 0.1s ease';
      });

      zone.addEventListener('mousemove', function (e) {
        const rect = zone.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -18;
        const rotY = ((x - cx) / cx) * 18;
        zone.style.transform =
          'perspective(1000px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(1.04)';
      });

      zone.addEventListener('mouseleave', function () {
        zone.style.transition = 'transform 0.6s ease';
        zone.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      });

      zone.dataset.tiltInitialized = 'true';
    });
  }

  function initProjectExplorer() {
    const viewer = document.getElementById('project-viewer');
    const panel = document.getElementById('project-viewer-panel');
    const closeButton = document.getElementById('project-viewer-close');
    const sidebar = document.getElementById('project-sidebar');
    const detailStage = document.getElementById('project-detail-stage');
    const detailTitle = document.getElementById('project-detail-title');
    const detailImage = document.getElementById('project-detail-image');
    const detailDescription = document.getElementById('project-detail-description');
    const detailStack = document.getElementById('project-detail-stack');
    const detailFeatures = document.getElementById('project-detail-features');
    const detailGithub = document.getElementById('project-detail-github');
    const detailDemo = document.getElementById('project-detail-demo');
    const projectCards = document.querySelectorAll('[data-project-card]');

    if (!viewer || !panel || !closeButton || !sidebar || !detailStage || !detailTitle || !detailImage || !detailDescription || !detailStack || !detailFeatures || !detailGithub || !detailDemo || !projectCards.length) {
      return;
    }

    let activeProjectIndex = 0;
    let switchTimer;

    const renderSidebar = function () {
      sidebar.innerHTML = projectsData
        .map(function (project, index) {
          return `
          <button type="button" class="project-sidebar-tab ${index === activeProjectIndex ? 'active' : ''}" data-project-nav="${index}">
            <span class="block text-sm font-semibold text-white">${project.title}</span>
            <span class="mono text-[0.68rem]" style="color:var(--muted)">${project.category}</span>
          </button>
        `;
        })
        .join('');

      sidebar.querySelectorAll('[data-project-nav]').forEach(function (button) {
        button.addEventListener('click', function () {
          setActiveProject(Number(button.dataset.projectNav));
        });
      });
    };

    const renderProjectDetails = function (index) {
      const project = projectsData[index];
      activeProjectIndex = index;
      detailTitle.textContent = project.title;
      detailImage.src = project.image;
      detailImage.alt = project.imageAlt;
      detailDescription.textContent = project.description;
      detailStack.innerHTML = project.stack
        .map(function (item) {
          return '<span class="mono text-xs px-2 py-1 rounded" style="background:rgba(255,255,255,0.05);color:var(--muted)">' + item + '</span>';
        })
        .join('');
      detailFeatures.innerHTML = project.features
        .map(function (item) {
          return '<li class="flex items-start gap-3 text-sm text-slate-300 leading-relaxed"><span class="project-feature-dot">&#8226;</span><span>' + item + '</span></li>';
        })
        .join('');
      detailGithub.href = project.github;

      if (project.demo) {
        detailDemo.href = project.demo;
        detailDemo.classList.remove('hidden');
      } else {
        detailDemo.classList.add('hidden');
        detailDemo.removeAttribute('href');
      }

      renderSidebar();
    };

    const setActiveProject = function (index) {
      clearTimeout(switchTimer);
      detailStage.classList.add('is-switching');
      switchTimer = setTimeout(function () {
        renderProjectDetails(index);
        detailStage.classList.remove('is-switching');
      }, 140);
    };

    const openViewer = function (index) {
      renderProjectDetails(index);
      viewer.classList.remove('opacity-0', 'pointer-events-none');
      panel.classList.remove('translate-x-full');
      document.body.classList.add('project-viewer-open');
    };

    const closeViewer = function () {
      viewer.classList.add('opacity-0', 'pointer-events-none');
      panel.classList.add('translate-x-full');
      document.body.classList.remove('project-viewer-open');
    };

    projectCards.forEach(function (card) {
      card.addEventListener('click', function () {
        openViewer(Number(card.dataset.projectCard));
      });
    });

    closeButton.addEventListener('click', closeViewer);

    viewer.addEventListener('click', function (event) {
      if (event.target === viewer || event.target.classList.contains('project-viewer-backdrop')) {
        closeViewer();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !viewer.classList.contains('pointer-events-none')) {
        closeViewer();
      }
    });

    renderProjectDetails(0);
  }

  window.observeFadeInElements = observeFadeInElements;
  window.initSkillTiltEffects = initSkillTiltEffects;

  async function bootstrap() {
    try {
      for (const section of sectionLoadOrder) {
        // Preserve deterministic order so nav and scroll behaviors stay stable.
        await loadSection(section.placeholderId, section.file);
      }

      initMobileMenu();
      initFadeInObserver();
      if (typeof initActiveNavHighlight === 'function') {
        initActiveNavHighlight();
      }
      if (typeof initHeroRoleTyping === 'function') {
        initHeroRoleTyping();
      }
      if (typeof initCertsToggle === 'function') {
        initCertsToggle();
      }
      initProjectExplorer();
      initSkillTiltEffects();
    } catch (error) {
      console.error(error);
    }
  }

  window.addEventListener('DOMContentLoaded', bootstrap);
})();
