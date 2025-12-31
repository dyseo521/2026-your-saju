const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Image dimensions (OG standard)
const WIDTH = 1200;
const HEIGHT = 630;

// Colors
const COLORS = {
  background: '#0c0a09',
  crimson: '#dc2626',
  gold: '#f59e0b',
  purple: '#7c3aed',
  darkPurple: '#4c1d95',
  white: '#fafaf9',
  stone: '#78716c'
};

// Create canvas
const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

// Helper: Draw gradient background
function drawBackground() {
  // Dark base
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Radial purple glow (center)
  const centerGradient = ctx.createRadialGradient(WIDTH/2, HEIGHT/2, 0, WIDTH/2, HEIGHT/2, 400);
  centerGradient.addColorStop(0, 'rgba(124, 58, 237, 0.2)');
  centerGradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.1)');
  centerGradient.addColorStop(1, 'transparent');
  ctx.fillStyle = centerGradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Fire glow (bottom)
  const fireGradient = ctx.createRadialGradient(WIDTH/2, HEIGHT + 100, 0, WIDTH/2, HEIGHT + 100, 400);
  fireGradient.addColorStop(0, 'rgba(220, 38, 38, 0.3)');
  fireGradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.15)');
  fireGradient.addColorStop(1, 'transparent');
  ctx.fillStyle = fireGradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

// Helper: Draw stars
function drawStars() {
  const starCount = 80;
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * WIDTH;
    const y = Math.random() * HEIGHT * 0.7;
    const radius = Math.random() * 1.5 + 0.5;
    const opacity = Math.random() * 0.6 + 0.2;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(250, 250, 249, ${opacity})`;
    ctx.fill();
  }
}

// Helper: Draw Bagua symbols in circle
function drawBaguaCircle() {
  const bagua = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷'];
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2 - 20;
  const radius = 240;

  ctx.font = '24px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  bagua.forEach((symbol, i) => {
    const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    const opacity = 0.3 + (i % 2) * 0.2;
    ctx.fillStyle = i % 2 === 0 ? `rgba(245, 158, 11, ${opacity})` : `rgba(220, 38, 38, ${opacity})`;
    ctx.fillText(symbol, x, y);
  });
}

// Helper: Draw decorative circles
function drawDecorativeCircles() {
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2 - 20;

  // Outer ring
  ctx.beginPath();
  ctx.arc(centerX, centerY, 260, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.15)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Middle ring
  ctx.beginPath();
  ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(220, 38, 38, 0.2)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Inner glow ring
  ctx.beginPath();
  ctx.arc(centerX, centerY, 140, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(124, 58, 237, 0.25)';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Helper: Draw fire/ember particles
function drawEmbers() {
  const centerX = WIDTH / 2;

  for (let i = 0; i < 40; i++) {
    const x = centerX + (Math.random() - 0.5) * 300;
    const y = HEIGHT - Math.random() * 200;
    const size = Math.random() * 3 + 1;
    const opacity = Math.random() * 0.5 + 0.2;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
    gradient.addColorStop(0, `rgba(245, 158, 11, ${opacity})`);
    gradient.addColorStop(0.5, `rgba(220, 38, 38, ${opacity * 0.5})`);
    gradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(x, y, size * 2, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

// Helper: Draw stylized horse silhouette
function drawHorseSilhouette() {
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2 + 50;

  // Horse silhouette using simplified path (abstract flame-like horse)
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(0.8, 0.8);

  // Create gradient for horse
  const horseGradient = ctx.createLinearGradient(0, 60, 0, -60);
  horseGradient.addColorStop(0, 'rgba(124, 58, 237, 0.4)');
  horseGradient.addColorStop(0.3, 'rgba(220, 38, 38, 0.5)');
  horseGradient.addColorStop(0.7, 'rgba(245, 158, 11, 0.5)');
  horseGradient.addColorStop(1, 'rgba(254, 243, 199, 0.3)');

  // Abstract horse head shape
  ctx.beginPath();
  ctx.moveTo(0, -80);
  ctx.bezierCurveTo(40, -70, 60, -40, 50, 0);
  ctx.bezierCurveTo(55, 30, 40, 60, 20, 70);
  ctx.bezierCurveTo(0, 75, -20, 70, -20, 70);
  ctx.bezierCurveTo(-40, 60, -55, 30, -50, 0);
  ctx.bezierCurveTo(-60, -40, -40, -70, 0, -80);
  ctx.closePath();

  ctx.fillStyle = horseGradient;
  ctx.fill();

  // 馬 character
  ctx.font = 'bold 36px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(12, 10, 9, 0.6)';
  ctx.fillText('馬', 0, 5);

  ctx.restore();
}

// Helper: Draw main text
function drawText() {
  const centerX = WIDTH / 2;

  // Year badge
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = COLORS.gold;
  ctx.fillText('丙午年 2026', centerX, 100);

  // Main title
  ctx.font = 'bold 72px sans-serif';

  // Text shadow/glow
  ctx.shadowColor = 'rgba(220, 38, 38, 0.5)';
  ctx.shadowBlur = 30;
  ctx.fillStyle = COLORS.white;
  ctx.fillText('2026 신년 사주', centerX, 180);
  ctx.shadowBlur = 0;

  // Subtitle
  ctx.font = '28px sans-serif';
  ctx.fillStyle = COLORS.stone;
  ctx.fillText('병오년 무료 사주풀이', centerX, 230);

  // Bottom tagline
  ctx.font = '20px sans-serif';
  ctx.fillStyle = 'rgba(250, 250, 249, 0.5)';
  ctx.fillText('나의 사주팔자와 2026년 운세를 확인하세요', centerX, HEIGHT - 50);
}

// Helper: Draw decorative line
function drawDecorativeLine() {
  const centerX = WIDTH / 2;
  const y = 260;
  const lineWidth = 120;

  // Left line
  const leftGradient = ctx.createLinearGradient(centerX - lineWidth, y, centerX - 20, y);
  leftGradient.addColorStop(0, 'transparent');
  leftGradient.addColorStop(1, COLORS.gold);
  ctx.beginPath();
  ctx.moveTo(centerX - lineWidth, y);
  ctx.lineTo(centerX - 20, y);
  ctx.strokeStyle = leftGradient;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Center diamond
  ctx.beginPath();
  ctx.moveTo(centerX, y - 6);
  ctx.lineTo(centerX + 6, y);
  ctx.lineTo(centerX, y + 6);
  ctx.lineTo(centerX - 6, y);
  ctx.closePath();
  ctx.fillStyle = COLORS.gold;
  ctx.fill();

  // Right line
  const rightGradient = ctx.createLinearGradient(centerX + 20, y, centerX + lineWidth, y);
  rightGradient.addColorStop(0, COLORS.gold);
  rightGradient.addColorStop(1, 'transparent');
  ctx.beginPath();
  ctx.moveTo(centerX + 20, y);
  ctx.lineTo(centerX + lineWidth, y);
  ctx.strokeStyle = rightGradient;
  ctx.stroke();
}

// Main render function
function render() {
  drawBackground();
  drawStars();
  drawDecorativeCircles();
  drawBaguaCircle();
  drawEmbers();
  drawHorseSilhouette();
  drawDecorativeLine();
  drawText();

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`OG image saved to: ${outputPath}`);
}

render();
