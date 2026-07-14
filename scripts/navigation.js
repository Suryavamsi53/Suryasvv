export default class Navigation {
  constructor() {
    this.toggle = document.querySelector('.nav-toggle');
    this.nav = document.querySelector('.nav');
  }

  init() {
    if (!this.toggle || !this.nav) return;
    this.toggle.addEventListener('click', () => this.toggleMenu());
    document.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  }

  toggleMenu() {
    this.nav.classList.toggle('nav-open');
  }

  closeMenu() {
    this.nav.classList.remove('nav-open');
  }
}
