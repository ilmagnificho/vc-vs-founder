/**
 * Share System - Result card canvas generation + SNS sharing
 */
const ShareSystem = (() => {
  let lastEnding = null;

  function generateCard(ending) {
    lastEnding = ending;
    const canvas = document.getElementById('share-canvas');
    const ctx = canvas.getContext('2d');

    const W = 600;
    const H = 800;
    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, W, H);

    // Border
    ctx.strokeStyle = '#6c5ce7';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, W - 20, H - 20);

    // Inner glow border
    ctx.strokeStyle = 'rgba(108, 92, 231, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(16, 16, W - 32, H - 32);

    // Title
    ctx.fillStyle = '#6c5ce7';
    ctx.font = 'bold 22px "Noto Sans KR", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('스타트업 서바이벌 RPG', W / 2, 60);

    ctx.fillStyle = '#888';
    ctx.font = '14px "Noto Sans KR", sans-serif';
    ctx.fillText('EP.1 - Pre-A 라운드', W / 2, 85);

    // Divider
    drawDivider(ctx, 100, W);

    // Role
    const roleLabel = ending.role === 'founder' ? '창업자 루트' : 'VC 루트';
    ctx.fillStyle = '#aaa';
    ctx.font = '16px "Noto Sans KR", sans-serif';
    ctx.fillText(roleLabel, W / 2, 130);

    // Ending emoji (large)
    ctx.font = '72px serif';
    ctx.fillText(ending.emoji, W / 2, 210);

    // Ending title
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 28px "Noto Sans KR", sans-serif';
    ctx.fillText(ending.title, W / 2, 260);

    // Subtitle
    ctx.fillStyle = '#6c5ce7';
    ctx.font = '18px "Noto Sans KR", sans-serif';
    ctx.fillText(`"${ending.subtitle}"`, W / 2, 295);

    // Divider
    drawDivider(ctx, 320, W);

    // Stats
    let y = 360;
    ctx.textAlign = 'left';
    const stats = ending.stats;
    for (const key in stats) {
      const s = stats[key];
      const displayValue = s.unit === '개월' ? `${s.value}${s.unit}`
        : s.unit === '억' ? `${s.value}${s.unit}`
        : `${s.value}${s.unit || ''}`;

      // Stat bar background
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(80, y - 15, 440, 30);

      // Stat bar fill
      const pct = s.value / s.max;
      let barColor = '#00b894';
      if (pct <= 0.25) barColor = '#e17055';
      else if (pct <= 0.5) barColor = '#fdcb6e';
      ctx.fillStyle = barColor;
      ctx.fillRect(80, y - 15, 440 * pct, 30);

      // Stat text
      ctx.fillStyle = '#fff';
      ctx.font = '16px "Noto Sans KR", sans-serif';
      ctx.fillText(`${s.icon} ${s.label}: ${displayValue}`, 90, y + 5);

      // Danger/warning labels
      if (pct <= 0.25) {
        ctx.fillStyle = '#e17055';
        ctx.textAlign = 'right';
        ctx.font = '12px "Noto Sans KR", sans-serif';
        ctx.fillText('(위험)', 510, y + 5);
        ctx.textAlign = 'left';
      } else if (pct <= 0.5) {
        ctx.fillStyle = '#fdcb6e';
        ctx.textAlign = 'right';
        ctx.font = '12px "Noto Sans KR", sans-serif';
        ctx.fillText('(주의)', 510, y + 5);
        ctx.textAlign = 'left';
      }

      y += 50;
    }

    // Divider
    drawDivider(ctx, y + 20, W);

    // Quote
    ctx.textAlign = 'center';
    ctx.fillStyle = '#a29bfe';
    ctx.font = 'italic 14px "Noto Sans KR", sans-serif';
    wrapText(ctx, `"${ending.quote}"`, W / 2, y + 60, W - 100, 20);

    // CTA
    ctx.fillStyle = '#6c5ce7';
    ctx.font = 'bold 16px "Noto Sans KR", sans-serif';
    ctx.fillText('나도 도전하기', W / 2, H - 50);

    // Download
    downloadCanvas(canvas);
  }

  function drawDivider(ctx, y, W) {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(W - 50, y);
    ctx.stroke();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split('');
    let line = '';
    let lines = [];

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line.length > 0) {
        lines.push(line);
        line = words[i];
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const totalHeight = lines.length * lineHeight;
    const startY = y - totalHeight / 2 + lineHeight / 2;

    lines.forEach((l, idx) => {
      ctx.fillText(l, x, startY + idx * lineHeight);
    });
  }

  function downloadCanvas(canvas) {
    const link = document.createElement('a');
    link.download = 'startup-survival-result.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  function getShareText() {
    if (!lastEnding) return '';
    const roleLabel = lastEnding.role === 'founder' ? '창업자' : 'VC';
    return `${lastEnding.emoji} 스타트업 서바이벌 RPG - ${roleLabel} 루트\n결과: ${lastEnding.title}\n"${lastEnding.subtitle}"\n\n나도 도전하기 →`;
  }

  function shareToX() {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(window.location.href);
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  }

  function shareToKakao() {
    // Fallback: copy to clipboard for Kakao share
    const text = getShareText() + '\n' + window.location.href;
    navigator.clipboard.writeText(text).then(() => {
      alert('클립보드에 복사되었습니다! 카카오톡에 붙여넣기 해주세요.');
    }).catch(() => {
      prompt('아래 텍스트를 복사해주세요:', text);
    });
  }

  function shareToLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('링크가 복사되었습니다!');
    }).catch(() => {
      prompt('아래 링크를 복사해주세요:', window.location.href);
    });
  }

  return {
    generateCard,
    shareToX,
    shareToKakao,
    shareToLinkedIn,
    copyLink,
  };
})();
