// Simple interactions: smooth scroll and small behaviors
document.addEventListener('DOMContentLoaded',()=>{
  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href=a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Split first name into spans for per-char reveal while keeping semantic H1
  const firstNameEl = document.getElementById('hero-first');
  if(firstNameEl){
    const text = firstNameEl.textContent.trim();
    firstNameEl.textContent = '';
    const frag = document.createDocumentFragment();
    Array.from(text).forEach((ch,i)=>{
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.animationDelay = `${i * 45}ms`;
      frag.appendChild(span);
    });
    firstNameEl.appendChild(frag);
  }

  // reveal characters after a small delay
  setTimeout(()=>{
    document.querySelectorAll('#hero-first .char').forEach((el)=> el.classList.add('revealed'));
  },220);

  // rotating subtitles
  const subs = Array.from(document.querySelectorAll('.subtitle-rotator .subtitle'));
  let subIndex = 0;
  if(subs.length>0){
    setInterval(()=>{
      subs[subIndex].classList.remove('current');
      subIndex = (subIndex+1) % subs.length;
      subs[subIndex].classList.add('current');
    },2800);
  }

  // Simple particle canvas in hero-right for subtle motion
  const heroRight = document.querySelector('.hero-right');
  if(heroRight){
    const canvas = document.createElement('canvas');
    canvas.className = 'hero-particles';
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    heroRight.style.position = 'relative';
    heroRight.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let w,h,particles;
    function resize(){
      w = canvas.width = heroRight.clientWidth;
      h = canvas.height = heroRight.clientHeight;
      particles = Array.from({length:12}).map(()=>({
        x: Math.random()*w,
        y: Math.random()*h,
        r: 0.6+Math.random()*1.6,
        vx: (Math.random()-0.5)*0.2,
        vy: (Math.random()-0.5)*0.2,
        alpha: 0.06+Math.random()*0.08
      }));
    }
    function tick(){
      ctx.clearRect(0,0,w,h);
      for(const p of particles){
        p.x += p.vx; p.y += p.vy;
        if(p.x<0) p.x = w; if(p.x> w) p.x = 0;
        if(p.y<0) p.y = h; if(p.y> h) p.y = 0;
        ctx.beginPath(); ctx.fillStyle = `rgba(255,255,255,${p.alpha})`; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    window.addEventListener('resize',resize);
    resize(); tick();
  }

  // Terminal typing animation: progressively reveal .term-line .out text
  const termLines = Array.from(document.querySelectorAll('.term-line'));
  if(termLines.length){
    // capture original texts and clear
    termLines.forEach(l=>{
      const out = l.querySelector('.out');
      if(out){ out.dataset.full = out.textContent.trim(); out.textContent = ''; }
    });

    // type each line sequentially
    let ti = 0;
    function typeLine(){
      if(ti>=termLines.length) return;
      const out = termLines[ti].querySelector('.out');
      const full = out?.dataset.full || '';
      let i=0;
      const speed = 18 + Math.random()*8;
      const t = setInterval(()=>{
        out.textContent += full.charAt(i);
        i++;
        if(i>full.length){ clearInterval(t); ti++; setTimeout(typeLine,220); }
      },speed);
    }
    setTimeout(typeLine,600);
  }
});
