/**
 * Background Music Module
 */

let backgroundMusic = null;

export function initBackgroundMusic() {
  try {
    backgroundMusic = new Audio('../assets/audio/chungusmassong.ogg');
    backgroundMusic.loop = true;
    backgroundMusic.preload = 'auto';
    backgroundMusic.volume = 0.6;
  } catch (e) {
    console.warn('Não foi possível inicializar backgroundMusic:', e);
    backgroundMusic = null;
  }
}

export function playBackgroundMusic() {
  if (!backgroundMusic) return;

  try {
    const p = backgroundMusic.play();
    if (p && typeof p.catch === 'function') {
      p.catch((err) => {
        console.warn('Playback prevented:', err);
      });
    }
  } catch (e) {
    console.error('Erro ao tocar backgroundMusic:', e);
  }
}

export function pauseBackgroundMusic() {
  if (!backgroundMusic) return;

  try {
    if (!backgroundMusic.paused) {
      backgroundMusic.pause();
    }
    backgroundMusic.currentTime = 0;
  } catch (e) {
    console.error('Erro ao pausar backgroundMusic:', e);
  }
}
