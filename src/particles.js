// HTML5 Canvas Particle Engine for AI Game Master RPG

let canvas = null;
let ctx = null;
let particles = [];
let animationFrameId = null;

class Particle {
  constructor(x, y, color, speedX, speedY, size, gravity, life) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
    this.size = size;
    this.gravity = gravity;
    this.life = life; // Max life in frames
    this.maxLife = life;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    this.life--;
  }

  draw() {
    const alpha = this.life / this.maxLife;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add neon glow for high energy particles
    if (this.color === '#ffb703' || this.color === '#00f5d4') {
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function initCanvas() {
  canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  
  // Resize handler
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function loop() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    } else {
      particles[i].draw();
    }
  }

  if (particles.length > 0) {
    animationFrameId = requestAnimationFrame(loop);
  } else {
    animationFrameId = null;
  }
}

function startLoop() {
  if (!animationFrameId) {
    loop();
  }
}

export const particleEngine = {
  init() {
    initCanvas();
  },

  spawnGoldExplosion(x, y, count = 25) {
    if (!canvas) initCanvas();
    const colors = ['#ffe3a8', '#ffb703', '#fb8500', '#fb5607'];
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const speedX = (Math.random() - 0.5) * 8;
      const speedY = (Math.random() - 0.7) * 12 - 2; // Upward initial velocity
      const size = Math.random() * 4 + 3;
      const gravity = 0.35;
      const life = Math.random() * 30 + 30; // 30-60 frames
      
      particles.push(new Particle(x, y, color, speedX, speedY, size, gravity, life));
    }
    startLoop();
  },

  spawnXpSparks(x, y, count = 20) {
    if (!canvas) initCanvas();
    const colors = ['#e0aaff', '#c77dff', '#9d4edd', '#00f5d4'];
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const speedX = (Math.random() - 0.5) * 4;
      const speedY = (Math.random() - 0.8) * 6 - 3; // Gently floating upward
      const size = Math.random() * 3 + 2;
      const gravity = -0.05; // Defies gravity, floats UP
      const life = Math.random() * 40 + 40;
      
      particles.push(new Particle(x, y, color, speedX, speedY, size, gravity, life));
    }
    startLoop();
  },

  spawnBloodSplash(x, y, count = 30) {
    if (!canvas) initCanvas();
    const colors = ['#ff0055', '#d90429', '#ef233c', '#7209b7'];
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const speedX = (Math.random() - 0.5) * 12; // Wider explosion
      const speedY = (Math.random() - 0.5) * 12 - 4; // Upward spray
      const size = Math.random() * 5 + 3;
      const gravity = 0.45; // Falls fast
      const life = Math.random() * 20 + 20;
      
      particles.push(new Particle(x, y, color, speedX, speedY, size, gravity, life));
    }
    startLoop();
  },

  spawnHealGlow(x, y, count = 20) {
    if (!canvas) initCanvas();
    const colors = ['#00f5d4', '#52b788', '#b5e2fa', '#ffffff'];
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const speedX = (Math.random() - 0.5) * 3;
      const speedY = (Math.random() - 0.5) * 4 - 2; // slow upward drift
      const size = Math.random() * 4 + 3;
      const gravity = -0.02; // slow rise
      const life = Math.random() * 50 + 35;
      
      particles.push(new Particle(x, y, color, speedX, speedY, size, gravity, life));
    }
    startLoop();
  }
};
