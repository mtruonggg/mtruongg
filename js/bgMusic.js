(() => {
  const music = new Audio('https://files.catbox.moe/42piuv.mp3'); // 🔴 đổi link catbox tại đây
  music.loop = true;
  music.volume = 0.5;

  let isPlaying = false;

  // Tự phát nhạc sau khi vào màn pháo hoa
  setTimeout(() => {
    const tryPlay = () => {
      music.play().then(() => {
        isPlaying = true;
      }).catch(() => {
        // Chờ user click lần đầu (fix autoplay mobile)
        document.addEventListener('click', () => {
          if (!isPlaying) {
            music.play();
            isPlaying = true;
          }
        }, { once: true });
      });
    };
    tryPlay();
  }, 2000);

  // Gắn vào nút sound có sẵn
  setTimeout(() => {
    const soundBtn = document.querySelector('.sound-btn');
    const icon = soundBtn?.querySelector('use');

    if (!soundBtn) return;

    soundBtn.addEventListener('click', () => {
      if (music.paused) {
        music.play();
        icon?.setAttribute('href', '#icon-sound-on');
      } else {
        music.pause();
        icon?.setAttribute('href', '#icon-sound-off');
      }
    });
  }, 1500);

})();