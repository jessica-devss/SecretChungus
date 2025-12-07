/**
 * YouTube Drum Roll Player Module
 */

let drumPlayer = null;
let drumPlayerReady = false;
let drumButtonTimerStarted = false;
let drumShouldPlayWhenReady = false;

export function initDrumPlayer() {
  // Load YouTube API
  const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
  if (existing) return;

  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Set up global callback
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
}

function onYouTubeIframeAPIReady() {
  const drumContainer = document.getElementById('drumVideo');
  if (!drumContainer) return;

  drumPlayer = new YT.Player('drumVideo', {
    videoId: 'Q0h751kT6zQ',
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      modestbranding: 1,
      fs: 0,
      disablekb: 1,
      playsinline: 1,
      iv_load_policy: 3
    },
    events: {
      'onReady': onDrumPlayerReady,
      'onStateChange': onDrumPlayerStateChange
    }
  });

  window.drumPlayer = drumPlayer;
}

function onDrumPlayerReady(event) {
  drumPlayerReady = true;

  if (drumShouldPlayWhenReady) {
    event.target.unMute();
    event.target.playVideo();
  }
}

function onDrumPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING && !drumButtonTimerStarted) {
    drumButtonTimerStarted = true;

    setTimeout(() => {
      const btn = document.getElementById('drumNextButton');
      if (btn) {
        btn.classList.remove('hidden');
      }
    }, 5000);
  }
}

export function playDrumVideo() {
  drumShouldPlayWhenReady = true;

  if (drumPlayerReady && drumPlayer && typeof drumPlayer.playVideo === 'function') {
    drumPlayer.unMute();
    drumPlayer.playVideo();
  }
}

export function stopDrumVideo() {
  if (window.drumPlayer && typeof window.drumPlayer.stopVideo === "function") {
    window.drumPlayer.stopVideo();
  }
}
