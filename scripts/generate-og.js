/**
 * OG Image Generator - 1200x630px
 * Ultra-minimal: VC vs 창업자 confrontation
 * Run: node scripts/generate-og.js
 */
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const W = 1200;
const H = 630;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

const FONT = '"WenQuanYi Zen Hei", "IPAPGothic", sans-serif';

// === DARK BACKGROUND ===
ctx.fillStyle = '#0a0a1a';
ctx.fillRect(0, 0, W, H);

// Subtle grid pattern
ctx.strokeStyle = 'rgba(108, 92, 231, 0.04)';
ctx.lineWidth = 1;
for (let x = 0; x < W; x += 60) {
  ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
}
for (let y = 0; y < H; y += 60) {
  ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
}

// Thin purple border
ctx.strokeStyle = '#6c5ce7';
ctx.lineWidth = 3;
ctx.strokeRect(10, 10, W - 20, H - 20);

ctx.textAlign = 'center';

// === "VC vs 창업자" — THE dominant visual ===
const vsY = 270;

// "VC" on left
ctx.fillStyle = '#6c5ce7';
ctx.font = `bold 120px ${FONT}`;
ctx.fillText('VC', W / 2 - 200, vsY);

// "vs" small in the middle
ctx.fillStyle = '#555';
ctx.font = `bold 40px ${FONT}`;
ctx.fillText('vs', W / 2, vsY - 10);

// "창업자" on right
ctx.fillStyle = '#fd79a8';
ctx.font = `bold 100px ${FONT}`;
ctx.fillText('창업자', W / 2 + 240, vsY);

// Accent line
ctx.fillStyle = '#6c5ce7';
ctx.fillRect(W / 2 - 350, vsY + 30, 700, 3);

// === Main tagline ===
ctx.fillStyle = '#fff';
ctx.font = `bold 48px ${FONT}`;
ctx.fillText('절대 투자 못 받는 시뮬레이터', W / 2, vsY + 100);

// Tiny bottom label
ctx.fillStyle = '#444';
ctx.font = `18px ${FONT}`;
ctx.fillText('EP.1  Pre-A 라운드', W / 2, H - 50);

// === SAVE ===
const buffer = canvas.toBuffer('image/png');
const outPath = path.join(__dirname, '..', 'og-image.png');
fs.writeFileSync(outPath, buffer);
console.log(`OG image saved: ${outPath} (${buffer.length} bytes)`);
