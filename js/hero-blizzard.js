


function initHeroSection() {
  /* ================================
     BASIC ELEMENTS
     ================================ */
  const hero = document.getElementById("hero-trigger");
  const canvas = document.getElementById("hero-blizzard");
  if (!hero || !canvas) return;

  const ctx = canvas.getContext("2d");

  /* ================================
     CANVAS CONFIG
     ================================ */
  const COUNT = 140;
  let particles = [];
  const mouse = { x: null, y: null, radius: 120 };

  function resize() {
    const rect = hero.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  /* ================================
     PARTICLE CLASS
     ================================ */
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.6;
      this.vx = Math.random() * 0.6 - 0.3;
      this.vy = Math.random() * 1 + 0.4;
      this.alpha = Math.random() * 0.5 + 0.25;
      this.color =
        Math.random() > 0.85
          ? "rgba(255,0,0,"
          : "rgba(255,255,255,";
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 12;
          this.y += (dy / dist) * force * 12;
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

  /* ================================
     CANVAS INIT + LOOP
     ================================ */
  function initCanvas() {
    resize();
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateCanvas);
  }

  /* ================================
     INTERACTION
     ================================ */
  hero.addEventListener("mousemove", e => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  hero.addEventListener("mouseleave", () => {
    mouse.x = mouse.y = null;
  });

  window.addEventListener("resize", initCanvas);

  initCanvas();
  animateCanvas();

  /* ================================
     MASS WELCOME GSAP ANIMATION
     ================================ */
  if (window.__heroAnimated) return;
  window.__heroAnimated = true;

  if (typeof gsap === "undefined") return;

  gsap.set(
    [
      ".status-pill",
      ".main-title",
      ".hero-subtitle",
      ".countdown-wrapper",
      ".btn",
    ],
    {
      opacity: 0,
      y: 50,
    }
  );

  const tl = gsap.timeline({
    defaults: {
      ease: "power4.out",
      duration: 1,
    },
  });

  tl.to(".status-pill", {
    opacity: 1,
    y: 0,
    duration: 0.7,
  })
    .to(
      ".main-title",
      {
        opacity: 1,
        y: 0,
        scale: 1.08,
        duration: 1.2,
      },
      "-=0.2"
    )
    .to(
      ".main-title",
      {
        scale: 1,
        duration: 0.4,
      },
      "-=0.6"
    )
    .to(
      ".hero-subtitle",
      {
        opacity: 1,
        y: 0,
      },
      "-=0.4"
    )
    .to(
      ".countdown-wrapper",
      {
        opacity: 1,
        y: 0,
      },
      "-=0.3"
    )
    .to(
      ".btn",
      {
        opacity: 1,
        y: 0,
        scale: 1.05,
      },
      "-=0.2"
    )
    .to(".btn", {
      scale: 1,
      duration: 0.25,
    });

  /* ================================
     OPTIONAL STRANGER GLOW (SAFE)
     ================================ */
  gsap.fromTo(
    ".main-title",
    { textShadow: "0 0 0px rgba(255,0,0,0)" },
    {
      textShadow: "0 0 28px rgba(255,0,0,0.6)",
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    }
  );
}

