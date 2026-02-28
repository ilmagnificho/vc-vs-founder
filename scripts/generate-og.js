/**
 * OG Image Generator - 1200x630px
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

// === BACKGROUND ===
ctx.fillStyle = '#0a0a1a';
ctx.fillRect(0, 0, W, H);

// Subtle grid pattern
ctx.strokeStyle = 'rgba(108, 92, 231, 0.06)';
ctx.lineWidth = 1;
for (let x = 0; x < W; x += 40) {
  ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
}
for (let y = 0; y < H; y += 40) {
  ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
}

// Border
ctx.strokeStyle = '#6c5ce7';
ctx.lineWidth = 4;
ctx.strokeRect(12, 12, W - 24, H - 24);

// Inner glow
ctx.strokeStyle = 'rgba(108, 92, 231, 0.2)';
ctx.lineWidth = 1;
ctx.strokeRect(20, 20, W - 40, H - 40);

// === LEFT SIDE: Title & Info ===
const leftX = 80;

// EP label
ctx.fillStyle = '#888';
ctx.font = `18px ${FONT}`;
ctx.textAlign = 'left';
ctx.fillText('EP.1 - Pre-A 라운드', leftX, 80);

// Main title
ctx.fillStyle = '#fff';
ctx.font = `bold 52px ${FONT}`;
ctx.fillText('투자 못 받는', leftX, 150);
ctx.fillText('시뮬레이터', leftX, 212);

// Accent underline
ctx.fillStyle = '#6c5ce7';
ctx.fillRect(leftX, 225, 280, 4);

// Subtitle
ctx.fillStyle = '#aaa';
ctx.font = `20px ${FONT}`;
ctx.fillText('극악 난이도  |  클리어율 3.4%', leftX, 268);

// Warning
ctx.fillStyle = '#e17055';
ctx.font = `16px ${FONT}`;
ctx.fillText('>> 대부분 챕터 2에서 사망합니다', leftX, 308);

// Quote box
const qBoxY = 350;
const qBoxW = 520;
const qBoxH = 90;
ctx.fillStyle = '#16132b';
ctx.fillRect(leftX - 10, qBoxY, qBoxW, qBoxH);
ctx.fillStyle = '#fd79a8';
ctx.fillRect(leftX - 10, qBoxY, 4, qBoxH);

// Big quote mark
ctx.fillStyle = 'rgba(253, 121, 168, 0.2)';
ctx.font = `bold 50px serif`;
ctx.fillText('\u201C', leftX + 4, qBoxY + 42);

// Quote text
ctx.fillStyle = '#fd79a8';
ctx.font = `bold 18px ${FONT}`;
ctx.fillText('VC가 "좋은 사업이시네요"라고 하면', leftX + 40, qBoxY + 36);
ctx.fillText('투자 안 한다는 뜻이다', leftX + 40, qBoxY + 62);

// Tags
ctx.font = `15px ${FONT}`;
const tags = ['#창업시뮬레이터', '#VC', '#Pre-A', '#스타트업'];
let tagX = leftX;
ctx.fillStyle = 'rgba(108, 92, 231, 0.3)';
tags.forEach(tag => {
  const tw = ctx.measureText(tag).width + 20;
  // tag background
  ctx.fillStyle = 'rgba(108, 92, 231, 0.15)';
  ctx.fillRect(tagX, 470, tw, 28);
  // tag border
  ctx.strokeStyle = 'rgba(108, 92, 231, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(tagX, 470, tw, 28);
  // tag text
  ctx.fillStyle = '#a29bfe';
  ctx.font = `15px ${FONT}`;
  ctx.fillText(tag, tagX + 10, 489);
  tagX += tw + 8;
});

// CTA
ctx.fillStyle = '#6c5ce7';
ctx.font = `bold 22px ${FONT}`;
ctx.fillText('나도 도전하기 →', leftX, 548);

// 5-10분 플레이
ctx.fillStyle = '#666';
ctx.font = `14px ${FONT}`;
ctx.fillText('5-10분 플레이  |  모바일 최적화', leftX, 580);

// === RIGHT SIDE: VS Characters (text-based, no emoji) ===
const rightCenterX = 900;

// Founder box
const fBoxX = rightCenterX - 170;
const vBoxX = rightCenterX + 30;
const boxW = 140;
const boxH = 170;

// Founder card
ctx.fillStyle = '#16132b';
ctx.strokeStyle = '#6c5ce7';
ctx.lineWidth = 2;
ctx.fillRect(fBoxX, 90, boxW, boxH);
ctx.strokeRect(fBoxX, 90, boxW, boxH);

ctx.fillStyle = '#fff';
ctx.font = `bold 28px ${FONT}`;
ctx.textAlign = 'center';
ctx.fillText('창업자', fBoxX + boxW / 2, 150);
ctx.fillStyle = '#aaa';
ctx.font = `14px ${FONT}`;
ctx.fillText('난이도', fBoxX + boxW / 2, 185);
ctx.fillStyle = '#fdcb6e';
ctx.font = `18px ${FONT}`;
ctx.fillText('★★★★★', fBoxX + boxW / 2, 210);
ctx.fillStyle = '#e17055';
ctx.font = `bold 13px ${FONT}`;
ctx.fillText('극악', fBoxX + boxW / 2, 240);

// VS
ctx.fillStyle = '#e17055';
ctx.font = `bold 40px ${FONT}`;
ctx.textAlign = 'center';
ctx.fillText('VS', rightCenterX, 185);

// VC card
ctx.fillStyle = '#16132b';
ctx.strokeStyle = '#00b894';
ctx.lineWidth = 2;
ctx.fillRect(vBoxX, 90, boxW, boxH);
ctx.strokeRect(vBoxX, 90, boxW, boxH);

ctx.fillStyle = '#fff';
ctx.font = `bold 28px ${FONT}`;
ctx.textAlign = 'center';
ctx.fillText('VC', vBoxX + boxW / 2, 150);
ctx.fillStyle = '#aaa';
ctx.font = `14px ${FONT}`;
ctx.fillText('난이도', vBoxX + boxW / 2, 185);
ctx.fillStyle = '#fdcb6e';
ctx.font = `18px ${FONT}`;
ctx.fillText('★★★☆☆', vBoxX + boxW / 2, 210);
ctx.fillStyle = '#fdcb6e';
ctx.font = `bold 13px ${FONT}`;
ctx.fillText('어려움', vBoxX + boxW / 2, 240);

// Decorative stat bars (right side, below characters)
const barX = rightCenterX - 170;
const barW = 340;
const bars = [
  { label: '런웨이', pct: 0.25, color: '#e17055', warn: '(위험!)' },
  { label: '멘탈', pct: 0.15, color: '#ff3838', warn: '(위험!)' },
  { label: '설득력', pct: 0.45, color: '#fdcb6e', warn: '' },
];

bars.forEach((bar, i) => {
  const by = 310 + i * 54;
  // Bar label
  ctx.fillStyle = '#888';
  ctx.font = `15px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.fillText(bar.label, barX, by);
  // Bar bg
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(barX + 60, by - 12, barW - 60, 18);
  // Bar fill
  ctx.fillStyle = bar.color;
  ctx.fillRect(barX + 60, by - 12, (barW - 60) * bar.pct, 18);
  // Warning label
  if (bar.warn) {
    ctx.fillStyle = bar.color;
    ctx.font = `bold 12px ${FONT}`;
    ctx.textAlign = 'right';
    ctx.fillText(bar.warn, barX + barW, by);
    ctx.textAlign = 'left';
  }
});

// Failure message at bottom right
ctx.fillStyle = '#e17055';
ctx.font = `15px ${FONT}`;
ctx.textAlign = 'center';
// Dashed line above
ctx.strokeStyle = 'rgba(225, 112, 85, 0.4)';
ctx.lineWidth = 1;
ctx.setLineDash([6, 4]);
ctx.beginPath();
ctx.moveTo(rightCenterX - 170, 500);
ctx.lineTo(rightCenterX + 170, 500);
ctx.stroke();
ctx.setLineDash([]);
ctx.fillText('96.6%의 창업자가 여기서 쓰러졌습니다', rightCenterX, 530);

// === SAVE ===
const buffer = canvas.toBuffer('image/png');
const outPath = path.join(__dirname, '..', 'og-image.png');
fs.writeFileSync(outPath, buffer);
console.log(`OG image saved: ${outPath} (${buffer.length} bytes)`);
