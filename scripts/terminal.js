export default class Terminal {
  constructor(root) {
    this.root = root;
    this.lines = root ? Array.from(root.querySelectorAll('.terminal-line')) : [];
    this.cursor = root ? root.querySelector('.terminal-cursor') : null;
    this.currentLine = 0;
  }

  init() {
    if (!this.root || !this.lines.length) return;
    this.lines.forEach(line => {
      const output = line.querySelector('.terminal-output');
      if (output) {
        output.dataset.text = output.dataset.text || output.textContent.trim();
        output.textContent = '';
      }
    });
    this.cursor?.classList.add('blink');
    this.typeNextLine();
  }

  typeNextLine() {
    if (this.currentLine >= this.lines.length) return;
    const line = this.lines[this.currentLine];
    const output = line.querySelector('.terminal-output');
    const value = output ? output.dataset.text : '';
    let index = 0;
    const interval = setInterval(() => {
      output.textContent += value[index] || '';
      index += 1;
      if (index > value.length) {
        clearInterval(interval);
        this.currentLine += 1;
        setTimeout(() => this.typeNextLine(), 200);
      }
    }, 20);
  }
}
