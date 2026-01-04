(() => {
  let tick = 0;

  function animateText() {
    if (!window.textParticles) return;

    tick += 0.05;

    window.textParticles.forEach(p => {
      p.y += Math.sin(tick + p.x * 0.02) * 0.15;
      p.alpha = 0.6 + Math.sin(tick + p.y * 0.01) * 0.4;
    });

    requestAnimationFrame(animateText);
  }

  setTimeout(animateText, 1000);
})();