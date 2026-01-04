(() => {
  function autoLaunch() {
    if (!window.stage || !window.stage.fireworks) return;

    window.stage.paused = false;

    setInterval(() => {
      if (window.stage.paused) return;

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.5;

      window.stage.fireworks.launch(x, y);
    }, 900);
  }

  setTimeout(autoLaunch, 1500);
})();