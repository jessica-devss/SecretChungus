/**
 * Main Participant Page Script
 * Coordinates all modules and handles page flow
 */

import { withBreaks, getQueryParam, findParticipantById } from './utils.js';
import { initConfetti, startConfetti } from './confetti.js';
import { initDrumPlayer, playDrumVideo, stopDrumVideo } from './drumPlayer.js';
import { setupSlotReels, startSlotMachine, resetSlotMachine, getCurrentAttempt } from './slotMachine.js';
import { setupScrollReveal } from './storyReveal.js';
import { initEasterEggs, createSnowflakes } from './easterEggs.js';
import { initBackgroundMusic, playBackgroundMusic, pauseBackgroundMusic } from './backgroundMusic.js';

let currentStep = 1;

function showStep(stepNumber) {
  const cards = document.querySelectorAll(".step-card");
  cards.forEach((card) => {
    const isThisStep = Number(card.dataset.step) === stepNumber;
    card.classList.toggle("active", isThisStep);
  });

  currentStep = stepNumber;

  if (stepNumber === 2) {
    playDrumVideo();
  }

  if (stepNumber === 3) {
    playBackgroundMusic();
  } else if (stepNumber < 3) {
    pauseBackgroundMusic();
  }
}

function initPageData() {
  const dataParam = getQueryParam("data");
  
  // Modo de desenvolvimento: usar primeiro participante se não houver data
  if (!dataParam) {
    console.warn("No 'data' parameter found in URL. Using development mode with first participant.");
    
    // Verifica se PARTICIPANTS está disponível e tem pelo menos 2 pessoas
    if (typeof PARTICIPANTS !== 'undefined' && PARTICIPANTS.length >= 2) {
      console.log("Development mode: Using first participant");
      return {
        giver: PARTICIPANTS[0],
        receiver: PARTICIPANTS[1]
      };
    }
    
    console.error("No 'data' parameter found in URL and no PARTICIPANTS available");
    alert("Invalid link. Ask the person who sent this to check the link.");
    return null;
  }

  let payload;

  function base64UrlToBase64(input) {
    try {
      input = decodeURIComponent(input);
    } catch (e) {
      // ignore
    }
    input = input.replace(/-/g, '+').replace(/_/g, '/');
    while (input.length % 4 !== 0) input += '=';
    return input;
  }

  try {
    const raw = dataParam;
    let decodedOnce;
    
    try {
      decodedOnce = decodeURIComponent(raw);
    } catch (e) {
      decodedOnce = raw;
    }

    const tryVariants = [decodedOnce, raw];

    if (decodedOnce !== raw && decodedOnce.includes('%')) {
      try {
        const doubleDecoded = decodeURIComponent(decodedOnce);
        tryVariants.push(doubleDecoded);
      } catch (e) {
        // ignore
      }
    }

    let lastError = null;
    for (const variant of tryVariants) {
      try {
        const b64 = base64UrlToBase64(variant);
        const jsonStr = atob(b64);
        payload = JSON.parse(jsonStr);
        break;
      } catch (e) {
        lastError = e;
      }
    }

    if (!payload) {
      try {
        const jsonStr = atob(decodeURIComponent(dataParam));
        payload = JSON.parse(jsonStr);
      } catch (e) {
        console.error('Error decoding data:', lastError, e);
        alert("Error reading your Secret Chungus data :(");
        return null;
      }
    }
  } catch (e) {
    console.error('Unexpected error decoding dataParam:', e);
    alert("Error reading your Secret Chungus data :(");
    return null;
  }

  const giver = findParticipantById(payload.giverId);
  const receiver = findParticipantById(payload.receiverId);

  console.log('Payload:', payload);
  console.log('Giver found:', giver);
  console.log('Receiver found:', receiver);

  if (!giver || !receiver) {
    console.error('Giver or receiver not found. GiverId:', payload.giverId, 'ReceiverId:', payload.receiverId);
    alert("Participant not found. Check with the person who sent you this link.");
    return null;
  }

  return { giver, receiver };
}

function populatePageContent(giver, receiver) {
  const containerName = document.getElementById("playerName");
  const namePlaceholders = document.querySelectorAll(".name-placeholder");
  const chungeeNameEl = document.getElementById("chungeeName");
  const wishMessageEl = document.getElementById("wishMessage");
  const favoriteChungusEl = document.getElementById("favoriteChungus");
  const storyTextEl = document.getElementById("storyText");
  const storyImageEl = document.getElementById("storyImage");
  const favoriteChungusImageEl = document.getElementById("favoriteChungusImage");
  const chungeeAvatarImg = document.getElementById("chungeeAvatar");

  if (containerName) containerName.textContent = giver.name;
  namePlaceholders.forEach((el) => (el.textContent = giver.name));

  if (storyTextEl) {
    const rawStory = giver.story || "";
    setupScrollReveal(storyTextEl, rawStory);
  }

  if (storyImageEl && giver.storyImage) {
    storyImageEl.src = giver.storyImage;
    storyImageEl.alt = giver.name + " story image";

    const storyImageOverlay = document.getElementById('storyImageOverlay');
    const revealStoryImageButton = document.getElementById('revealStoryImageButton');

    if (storyImageOverlay) {
      storyImageOverlay.classList.remove('hidden');
    }

    storyImageEl.addEventListener('load', () => {
      if (storyImageOverlay) storyImageOverlay.classList.remove('hidden');
    });

    if (revealStoryImageButton && storyImageOverlay) {
      revealStoryImageButton.addEventListener('click', (ev) => {
        ev.stopPropagation();
        storyImageOverlay.classList.add('hidden');
      });
    }
  }

  if (chungeeNameEl) chungeeNameEl.textContent = receiver.name;
  
  if (wishMessageEl) {
    wishMessageEl.innerHTML = withBreaks(receiver.message || "");
  }
  
  if (favoriteChungusEl) {
    favoriteChungusEl.textContent = receiver.favoriteChungus || "";
  }

  if (favoriteChungusImageEl && receiver.favoriteChungusImage) {
    favoriteChungusImageEl.src = receiver.favoriteChungusImage;
    favoriteChungusImageEl.alt = (receiver.favoriteChungus || "Favorite Chungus") + " image";
  }

  if (chungeeAvatarImg && receiver.avatar) {
    chungeeAvatarImg.src = receiver.avatar;
    chungeeAvatarImg.alt = receiver.name;
  }

  return receiver;
}

function runSlotAttempt(receiverId) {
  const duration = startSlotMachine(receiverId);
  const attempt = getCurrentAttempt();
  
  setTimeout(() => {
    if (attempt < 3) {
      // Mostrar botão para tentar novamente
      const retryBtn = document.getElementById("slotRetryBtn");
      const caption = document.querySelector(".slot-caption");
      
      if (retryBtn) {
        retryBtn.style.display = "block";
      }
      
      if (caption) {
        if (attempt === 1) {
          caption.textContent = "Hmmm, that doesn't look right... Try again!";
        } else if (attempt === 2) {
          caption.textContent = "Almost there! One more time!";
        }
      }
    } else {
      // Terceira tentativa: mostrar resultado
      const revealEl = document.getElementById("slotReveal");
      if (revealEl) {
        revealEl.classList.remove("hidden");
        revealEl.classList.add("show-photo");
        startConfetti();
      }
    }
  }, duration);
}

function initStepNavigation(receiver) {
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-next-step]");
    if (!btn) return;

    const nextStep = Number(btn.getAttribute("data-next-step"));

    stopDrumVideo();
    showStep(nextStep);

    if (nextStep === 4) {
      resetSlotMachine();
      runSlotAttempt(receiver.id);
    }
  });
  
  // Listener para o botão de retry do slot machine
  const retryBtn = document.getElementById("slotRetryBtn");
  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      runSlotAttempt(receiver.id);
    });
  }
}

function initMorbiusOverlay() {
  const notMeButton = document.getElementById("notMeButton");
  const morbiusOverlay = document.getElementById("morbiusOverlay");
  const morbiusImage = document.getElementById("morbiusImage");

  if (notMeButton && morbiusOverlay && morbiusImage) {
    notMeButton.addEventListener("click", () => {
      morbiusOverlay.classList.remove("hidden");

      if (!morbiusImage.classList.contains("woah")) {
        morbiusImage.classList.add("woah");
      }

      morbiusImage.classList.remove("simpleEntrance");
      void morbiusImage.offsetWidth;
      morbiusImage.classList.add("simpleEntrance");
    });

    morbiusOverlay.addEventListener("click", () => {
      morbiusOverlay.classList.add("hidden");
    });
  }
}

function initTrustPopup() {
  const yesButton = document.getElementById("yesImButton");
  const trustPopup = document.getElementById("trustPopup");
  let trustTimeoutId = null;

  if (yesButton && trustPopup) {
    yesButton.addEventListener("click", () => {
      trustPopup.classList.add("visible");
      showStep(1);

      trustTimeoutId = setTimeout(() => {
        trustPopup.classList.remove("visible");
        showStep(2);
      }, 2000);
    });

    trustPopup.addEventListener("click", () => {
      if (trustTimeoutId) {
        clearTimeout(trustTimeoutId);
        trustTimeoutId = null;
      }
      trustPopup.classList.remove("visible");
      showStep(2);
    });
  }
}

// Main initialization
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all modules
  initConfetti();
  initBackgroundMusic();
  initDrumPlayer();
  initEasterEggs();

  // Load and populate data
  const data = initPageData();
  if (!data) return;

  const receiver = populatePageContent(data.giver, data.receiver);

  // Setup interactions
  setupSlotReels();
  initStepNavigation(receiver);
  initMorbiusOverlay();
  initTrustPopup();
  
  // Show initial step
  showStep(1);
});

// Initialize snowflakes after page load
window.addEventListener('load', createSnowflakes);
