function initHeroSection() {
  const hero = document.getElementById("hero-trigger");
  const canvas = document.getElementById("hero-blizzard");
  if (!hero || !canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  const COUNT = 140;
  const mouse = { x: null, y: null, radius: 120 };

  function resize() {
    const rect = hero.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.6;
      this.vx = Math.random() * 0.6 - 0.3;
      this.vy = Math.random() * 1 + 0.4;
      this.alpha = Math.random() * 0.5 + 0.25;
      this.color = Math.random() > 0.85
        ? "rgba(255,0,0,"
        : "rgba(255,255,255,";
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d < mouse.radius) {
          const f = (mouse.radius - d) / mouse.radius;
          this.x += (dx / d) * f * 12;
          this.y += (dy / d) * f * 12;
        }
      }

      if (this.y > canvas.height) {
        this.y = -10;
        this.x = Math.random() * canvas.width;
      }
    }
    draw() {
      ctx.fillStyle = this.color + this.alpha + ")";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < COUNT; i++) particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  hero.addEventListener("mousemove", e => {
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });

  hero.addEventListener("mouseleave", () => {
    mouse.x = mouse.y = null;
  });

  window.addEventListener("resize", init);

  init();
  animate();
}
