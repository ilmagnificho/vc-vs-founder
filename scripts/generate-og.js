/**
 * OG Image Generator - 1200x630px
 * Simple, provocative design
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

// Subtle grid
ctx.strokeStyle = 'rgba(108, 92, 231, 0.05)';
ctx.lineWidth = 1;
for (let x = 0; x < W; x += 60) {
  ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
}
for (let y = 0; y < H; y += 60) {
  ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
}

// Border
ctx.strokeStyle = '#6c5ce7';
ctx.lineWidth = 4;
ctx.strokeRect(12, 12, W - 24, H - 24);

// === CENTER: Provocative headline ===
ctx.textAlign = 'center';

// Small top label
ctx.fillStyle = '#666';
ctx.font = `16px ${FONT}`;
ctx.fillText('EP.1 - Pre-A 라운드', W / 2, 140);

// Main provocative title — BIG
ctx.fillStyle = '#fff';
ctx.font = `bold 72px ${FONT}`;
ctx.fillText('절대 투자 못 받는', W / 2, 250);
ctx.fillText('시뮬레이터', W / 2, 340);

// Accent line under title
ctx.fillStyle = '#6c5ce7';
ctx.fillRect(W / 2 - 200, 365, 400, 4);

// Provocative subtitle — pink, witty
ctx.fillStyle = '#fd79a8';
ctx.font = `bold 24px ${FONT}`;
ctx.fillText('VC가 "좋은 사업이시네요"라고 하면 투자 안 한다는 뜻이다', W / 2, 420);

// Difficulty / clear rate
ctx.fillStyle = '#e17055';
ctx.font = `bold 20px ${FONT}`;
ctx.fillText('극악 난이도  |  클리어율 3.4%  |  96.6% 사망', W / 2, 480);

// CTA
ctx.fillStyle = '#6c5ce7';
ctx.font = `bold 22px ${FONT}`;
ctx.fillText('나도 도전하기  >>', W / 2, 540);

// Tiny footer
ctx.fillStyle = '#444';
ctx.font = `14px ${FONT}`;
ctx.fillText('5-10분 플레이  |  모바일 최적화', W / 2, 585);

// === SAVE ===
const buffer = canvas.toBuffer('image/png');
const outPath = path.join(__dirname, '..', 'og-image.png');
fs.writeFileSync(outPath, buffer);
console.log(`OG image saved: ${outPath} (${buffer.length} bytes)`);
