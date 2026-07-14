export default class ScrollReveal {
  constructor() {
    this.roles = Array.from(document.querySelectorAll('.role'));
    this.observer = null;
  }

  init() {
    this.rotateRoles();
    this.setupObserver();
  }

  rotateRoles() {
    let active = 0;
    setInterval(() => {
      this.roles[active]?.classList.remove('active');
      active = (active + 1) % this.roles.length;
      this.roles[active]?.classList.add('active');
    }, 2800);
  }

  setupObserver() {
    const options = { threshold: 0.14 };
    this.observer = new IntersectionObserver(this.reveal.bind(this), options);
    document.querySelectorAll('.fade-in, .section-header, .stat-card, .project-card, .arch-card, .skill-group, .timeline-item, .github-card, .blog-card, .contact-card').forEach(el => {
      this.observer.observe(el);
    });
  }

  reveal(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        this.observer.unobserve(entry.target);
      }
    });
  }
}
