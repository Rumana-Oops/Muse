const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const img = new Image();
img.src = "https://raw.githubusercontent.com/Rumana-Oops/Muse/main/portrait.png";

let particles = [];
const density = 4; // lower = more dots

img.onload = () => {
  const tempCanvas = document.createElement("canvas");
  const tctx = tempCanvas.getContext("2d");

  const w = 300;
  const h = (img.height / img.width) * 300;

  tempCanvas.width = w;
  tempCanvas.height = h;

  tctx.drawImage(img, 0, 0, w, h);
  const data = tctx.getImageData(0, 0, w, h).data;

  for (let y = 0; y < h; y += density) {
    for (let x = 0; x < w; x += density) {
      const index = (y * w + x) * 4;
      const brightness = data[index];

      if (brightness < 200) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          tx: x + canvas.width / 2 - w / 2,
          ty: y + canvas.height / 2 - h / 2,
          size: 2,
          speed: 0.05 + Math.random() * 0.03
        });
      }
    }
  }

  animateParticles();
};

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += (p.tx - p.x) * p.speed;
    p.y += (p.ty - p.y) * p.speed;

    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

// After 5 seconds, fade out particles and show scene
setTimeout(() => {
  canvas.style.transition = "opacity 2s";
  canvas.style.opacity = 0;

  setTimeout(() => {
    canvas.style.display = "none";
    document.getElementById("scene").classList.remove("hidden");
    startTypewriter();
  }, 2000);
}, 5000);

// Typewriter dua
const text = "May Allah bless you";
let index = 0;

function startTypewriter() {
  const el = document.getElementById("message");
  const speed = 120;

  function type() {
    if (index <= text.length) {
      el.textContent = text.slice(0, index);
      index++;
      setTimeout(type, speed);
    }
  }

  type();
}

