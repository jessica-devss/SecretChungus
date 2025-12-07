/**
 * Confetti Animation Module
 */

let confettiCanvas = null;
let confettiCtx = null;
let confettiPieces = [];

export function initConfetti() {
  confettiCanvas = document.getElementById("confetti-canvas");
  if (!confettiCanvas) return;

  confettiCtx = confettiCanvas.getContext("2d");

  const resizeCanvas = () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  };
  
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

function createConfettiPieces() {
  if (!confettiCanvas) return [];
  
  const colors = ['#fde132', '#009bde', '#ff6b00', '#ff2d5d', '#7cff00'];
  const pieces = [];
  
  for (let i = 0; i < 100; i++) {
    pieces.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
      tiltAngle: 0
    });
  }
  
  return pieces;
}

function drawConfetti() {
  if (!confettiCtx || !confettiCanvas) return;
  
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
  confettiPieces.forEach((p) => {
    confettiCtx.beginPath();
    confettiCtx.lineWidth = p.r;
    confettiCtx.strokeStyle = p.color;
    confettiCtx.moveTo(p.x + p.tilt + (p.r / 2), p.y);
    confettiCtx.lineTo(p.x + p.tilt, p.y + p.tilt + (p.r / 2));
    confettiCtx.stroke();
  });
}

function updateConfetti() {
  if (!confettiCanvas) return;
  
  confettiPieces.forEach((p, index) => {
    p.tiltAngle += p.tiltAngleIncremental;
    p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
    p.x += Math.sin(p.d);
    p.tilt = Math.sin(p.tiltAngle) * 15;

    if (p.y > confettiCanvas.height) {
      confettiPieces[index] = {
        x: Math.random() * confettiCanvas.width,
        y: -20,
        r: p.r,
        d: p.d,
        color: p.color,
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: p.tiltAngleIncremental,
        tiltAngle: p.tiltAngle
      };
    }
  });
}

export function startConfetti() {
  if (!confettiCanvas || !confettiCtx) return;

  confettiPieces = createConfettiPieces();
  const duration = 3000;
  const end = Date.now() + duration;

  function runAnimation() {
    if (Date.now() < end) {
      drawConfetti();
      updateConfetti();
      requestAnimationFrame(runAnimation);
    } else {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  runAnimation();
}
