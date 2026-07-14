import Terminal from './terminal.js';
import CursorTrail from './cursor.js';
import ScrollReveal from './animations.js';
import Particles from './particles.js';
import Navigation from './navigation.js';

const init = () => {
  const terminal = new Terminal(document.getElementById('terminal-body'));
  terminal.init();

  const cursor = new CursorTrail();
  cursor.init();

  const reveal = new ScrollReveal();
  reveal.init();

  const particles = new Particles(document.querySelector('.hero-panel'));
  particles.init();

  const navigation = new Navigation();
  navigation.init();
};

window.addEventListener('DOMContentLoaded', init);
