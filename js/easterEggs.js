/**
 * Easter Eggs Module
 */

export function initEasterEggs() {
  initBannerEasterEggs();
  initHeaderEasterEggs();
  initAmazingEasterEggs();
}

function initHeaderEasterEggs() {
  const thumbs = document.querySelectorAll('.easter-thumb');
  const modal = document.createElement('div');
  modal.id = 'easter-modal';
  modal.className = 'easter-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div id="easter-backdrop" class="easter-modal-backdrop"></div>
    <div class="easter-modal-content" role="dialog" aria-modal="true">
      <button id="easter-close" class="easter-close" aria-label="Close">×</button>
      <img id="easter-image" src="" alt="Easter image">
    </div>
  `;
  document.body.appendChild(modal);

  const easterModal = document.getElementById('easter-modal');
  const easterImage = document.getElementById('easter-image');
  const easterClose = document.getElementById('easter-close');
  const easterBackdrop = document.getElementById('easter-backdrop');

  thumbs.forEach(function (t) {
    t.style.cursor = 'pointer';
    t.addEventListener('click', function () {
      const src = t.dataset.popup;
      if (!src) return;
      easterImage.src = src;
      easterModal.style.display = 'block';
      easterModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    easterModal.style.display = 'none';
    easterImage.src = '';
    easterModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  easterClose.addEventListener('click', closeModal);
  easterBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) { 
    if (e.key === 'Escape') closeModal(); 
  });
}

function initAmazingEasterEggs() {
  const amazingImgs = document.querySelectorAll('.amazingsec img');
  const bannerPopupEl = document.getElementById('bannerPopup');
  const bannerPopupImageEl = document.getElementById('bannerPopupImage');
  
  if (!amazingImgs || !amazingImgs.length || !bannerPopupEl || !bannerPopupImageEl) return;

  if (amazingImgs[0]) {
    amazingImgs[0].style.cursor = 'pointer';
    amazingImgs[0].addEventListener('click', (e) => {
      e.stopPropagation();
      bannerPopupImageEl.src = '../assets/images/easter-eggs/Sans_overworld.png';
      bannerPopupEl.classList.remove('hidden');
    });
  }

  if (amazingImgs[1]) {
    amazingImgs[1].style.cursor = 'pointer';
    amazingImgs[1].addEventListener('click', (e) => {
      e.stopPropagation();
      bannerPopupImageEl.src = '../assets/images/easter-eggs/fucking dog.png';
      bannerPopupEl.classList.remove('hidden');
    });
  }
}

function initBannerEasterEggs() {
  const banner = document.querySelector('.chungusBanner');
  const bannerPopup = document.getElementById('bannerPopup');
  const bannerPopupImage = document.getElementById('bannerPopupImage');
  const bannerPopupClose = document.getElementById('bannerPopupClose');

  if (!banner || !bannerPopup || !bannerPopupImage || !bannerPopupClose) {
    return;
  }

  const bannerImages = [
    '../assets/images/easter-eggs/emoji wave.png',
    '../assets/images/easter-eggs/another slice of pizza.png',
    '../assets/images/easter-eggs/fish_PNG25137.png'
  ];

  let bannerClickCount = 0;

  function openBannerPopup() {
    if (bannerClickCount >= bannerImages.length) {
      return;
    }

    bannerPopupImage.src = bannerImages[bannerClickCount];
    bannerPopup.classList.remove('hidden');
    bannerClickCount += 1;
  }

  function closeBannerPopup() {
    bannerPopup.classList.add('hidden');
  }

  banner.addEventListener('click', openBannerPopup);
  bannerPopupClose.addEventListener('click', closeBannerPopup);

  bannerPopup.addEventListener('click', function (e) {
    if (e.target === bannerPopup) {
      closeBannerPopup();
    }
  });
}

export function createSnowflakes() {
  const numFlakes = 50;
  const colors = ['#ffffff', '#d4f1f9', '#e8f8ff'];

  for (let i = 0; i < numFlakes; i++) {
    const flake = document.createElement('div');
    flake.classList.add('snowflake');
    flake.innerHTML = '❄';
    document.body.appendChild(flake);

    const size = Math.random() * 10 + 10 + 'px';
    flake.style.left = Math.random() * 100 + 'vw';
    flake.style.fontSize = size;
    flake.style.color = colors[Math.floor(Math.random() * colors.length)];
    flake.style.animationDuration = Math.random() * 3 + 2 + 's';
    flake.style.animationDelay = Math.random() * 5 + 's';
  }
}
