export default class CursorTrail {
  constructor() {
    this.trail = [];
    this.nodes = [];
    this.max = 12;
    this.root = document.body;
  }

  init() {
    this.createNodes();
    this.root.addEventListener('mousemove', this.handleMouseMove.bind(this));
    requestAnimationFrame(this.renderTrail.bind(this));
  }

  createNodes() {
    for (let i = 0; i < this.max; i += 1) {
      const node = document.createElement('div');
      node.className = 'cursor-trail';
      node.style.opacity = '0';
      document.body.appendChild(node);
      this.nodes.push(node);
    }
  }

  handleMouseMove(event) {
    this.trail.unshift({ x: event.clientX, y: event.clientY });
    if (this.trail.length > this.max) this.trail.pop();
  }

  renderTrail() {
    this.trail.forEach((point, index) => {
      const node = this.nodes[index];
      if (!node) return;
      node.style.left = `${point.x}px`;
      node.style.top = `${point.y}px`;
      node.style.transform = `translate(-50%, -50%) scale(${0.5 + index / this.max})`;
      node.style.opacity = `${1 - index * 0.08}`;
    });
    requestAnimationFrame(this.renderTrail.bind(this));
  }
}
