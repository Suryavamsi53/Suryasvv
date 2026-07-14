export default class Particles {
  constructor(root) {
    this.root = root;
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.width = 0;
    this.height = 0;
  }

  init() {
    if (!this.root) return;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'particles-canvas';
    this.root.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
    this.tick();
  }

  resize() {
    this.width = this.canvas.width = this.root.clientWidth;
    this.height = this.canvas.height = this.root.clientHeight;
    this.particles = Array.from({ length: 14 }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      r: 0.8 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: 0.04 + Math.random() * 0.06,
    }));
  }

  tick() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fill();
    });
    requestAnimationFrame(this.tick.bind(this));
  }
}
