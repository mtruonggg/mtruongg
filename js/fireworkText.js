(() => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  Object.assign(canvas.style, {
    position: 'fixed',
    inset: 0,
    zIndex: 20,
    pointerEvents: 'none'
  });

  document.body.appendChild(canvas);

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const texts = [
    'Happy New Year 2026',
    'Chúc Mừng Năm Mới',
    'Xuân Bính Ngọ 2026',
    'An Khang Thịnh Vượng',
    'Vạn Sự Như Ý',
    'Sức Khỏe Dồi Dào',
    'Bình An May Mắn',
    'Niềm Vui Trọn Vẹn',
    'Gia Đình Hạnh Phúc',
    'Nhà Nhà Sung Túc',
    'Sum Vầy Đầm Ấm',
    'Tràn Ngập Yêu Thương',
    'Tấn Tài Tấn Lộc',
    'Tiền Vào Như Nước',
    'Làm Ăn Phát Đạt',
    'Sự Nghiệp Thăng Hoa',
    'Công Danh Rực Rỡ',
    'Phúc Khí Viên Mãn',
    'Lộc Xuân Đầy Nhà',
    'Thọ Khang Trường Tồn',
    'Phúc – Lộc – Thọ',
    'Năm Mới – Khởi Đầu Mới',
    'Mọi Điều Như Ý',
    'Thành Công Viên Mãn',
    'Hạnh Phúc Ngập Tràn',
    'Chào Xuân 2026',
    'Đón Lộc Đón Xuân',
    'Năm Mới Bình An',
    'Xuân Về Phú Quý'
  ];

  let index = 0;
  let startTime = performance.now();
  const DURATION = 5200;
  const FADE = 900;

  const particles = [];
  const PARTICLE_COUNT = 140;

  function resetParticle(p) {
    p.angle = Math.random() * Math.PI * 2;
    p.radius = 40 + Math.random() * 80;
    p.speed = 0.002 + Math.random() * 0.003;
    p.size = 1 + Math.random() * 1.5;
    p.alpha = 0.4 + Math.random() * 0.6;
    p.hue = Math.random() * 360;
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = {};
    resetParticle(p);
    particles.push(p);
  }

  function neonGradient(time) {
    const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    for (let i = 0; i <= 1; i += 0.12) {
      const h = (time * 0.03 + i * 360) % 360;
      g.addColorStop(i, `hsl(${h},100%,65%)`);
    }
    return g;
  }

  function fitTextWidth(text, maxWidth, maxFontSize) {
    let fontSize = maxFontSize;
    ctx.font = `${fontSize}px Arial, Helvetica, sans-serif`;
    while (ctx.measureText(text).width > maxWidth && fontSize > 10) {
      fontSize -= 1;
      ctx.font = `${fontSize}px Arial, Helvetica, sans-serif`;
    }
    return fontSize;
  }

  function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const elapsed = time - startTime;
    if (elapsed > DURATION) {
      startTime = time;
      index = (index + 1) % texts.length;
    }

    let alpha = 1;
    let offsetY = 0;

    if (elapsed < FADE) {
      const p = elapsed / FADE;
      alpha = p;
      offsetY = (1 - p) * 30;
    } else if (elapsed > DURATION - FADE) {
      const p = (elapsed - (DURATION - FADE)) / FADE;
      alpha = 1 - p;
      offsetY = p * 30;
    }

    const padding = canvas.width * 0.08; // khoảng cách 2 bên
    const maxFontSize = Math.min(canvas.width * 0.085, canvas.height * 0.14, 76);
    const fontSize = fitTextWidth(texts[index], canvas.width - padding * 2, maxFontSize);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2 + offsetY;

    particles.forEach(p => {
      p.angle += p.speed;
      const x = cx + Math.cos(p.angle) * p.radius;
      const y = cy + Math.sin(p.angle) * p.radius * 0.6;

      ctx.fillStyle = `hsla(${p.hue},100%,70%,${p.alpha * alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${fontSize}px Arial, Helvetica, sans-serif`;
    ctx.globalAlpha = alpha;

    ctx.shadowColor = 'rgba(255,255,255,0.35)';
    ctx.shadowBlur = 25;
    ctx.fillStyle = neonGradient(time);
    ctx.fillText(texts[index], cx, cy);

    ctx.shadowBlur = 10;
    ctx.fillText(texts[index], cx, cy);

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();