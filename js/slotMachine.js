/**
 * Slot Machine Animation Module - Multi-attempt system
 */

const SLOT_LOOPS = 150;
let currentAttempt = 0;
let targetReceiverId = null;

export function setupSlotReels() {
  const slotEl = document.getElementById("slotMachine");
  if (!slotEl) return;

  const reelInners = slotEl.querySelectorAll(".reel-inner");
  if (!reelInners.length) return;

  const faces = (typeof PARTICIPANTS !== 'undefined' ? PARTICIPANTS : []).filter((p) => p.avatar);

  reelInners.forEach((reel) => {
    reel.innerHTML = "";
    for (let loop = 0; loop < SLOT_LOOPS; loop++) {
      faces.forEach((p) => {
        const img = document.createElement("img");
        img.src = p.avatar;
        img.alt = p.name;
        img.dataset.participantId = p.id;
        img.className = "slot-face";
        reel.appendChild(img);
      });
    }
  });
}

export function resetSlotMachine() {
  currentAttempt = 0;
  targetReceiverId = null;
}

export function startSlotMachine(receiverId) {
  if (currentAttempt === 0) {
    targetReceiverId = receiverId;
  }

  const slotEl = document.getElementById("slotMachine");
  const revealEl = document.getElementById("slotReveal");
  const retryBtn = document.getElementById("slotRetryBtn");
  
  if (!slotEl) return;

  if (revealEl) {
    revealEl.classList.add("hidden");
    revealEl.classList.remove("show-photo");
  }
  
  if (retryBtn) {
    retryBtn.style.display = "none";
  }

  const reelInners = slotEl.querySelectorAll(".reel-inner");
  if (!reelInners.length) return;

  const firstImg = reelInners[0].querySelector(".slot-face");
  if (!firstImg) return;

  const iconHeight = firstImg.clientHeight || 80;
  const totalImages = reelInners[0].children.length;

  const allFaces = Array.from(reelInners[0].children);
  const faces = (typeof PARTICIPANTS !== 'undefined' ? PARTICIPANTS : []).filter((p) => p.avatar);
  const facesCount = faces.length;

  const visibleOffset = 1;

  // Tentativa 1: 3 pessoas diferentes
  // Tentativa 2: 2 iguais, 1 diferente
  // Tentativa 3: 3 iguais (correto)
  
  currentAttempt++;
  
  reelInners.forEach((reel, reelIndex) => {
    reel.style.transition = "none";
    reel.style.transform = "translateY(0px)";
    void reel.offsetHeight;

    let targetId;
    
    if (currentAttempt === 1) {
      // Primeira tentativa: 3 pessoas diferentes
      const otherParticipants = faces.filter(p => p.id !== targetReceiverId);
      if (otherParticipants.length >= 3) {
        targetId = otherParticipants[reelIndex % otherParticipants.length].id;
      } else {
        targetId = faces[reelIndex % faces.length].id;
      }
    } else if (currentAttempt === 2) {
      // Segunda tentativa: 2 da pessoa certa, 1 errada
      if (reelIndex === 1) {
        // Reel do meio mostra pessoa errada
        const otherParticipants = faces.filter(p => p.id !== targetReceiverId);
        targetId = otherParticipants[0]?.id || faces[0].id;
      } else {
        // Reels das pontas mostram pessoa certa
        targetId = targetReceiverId;
      }
    } else {
      // Terceira tentativa: todos corretos
      targetId = targetReceiverId;
    }

    const baseIndexInFirstCycle = allFaces.findIndex(
      (img) => img.dataset.participantId === targetId
    );
    
    if (baseIndexInFirstCycle === -1) return;

    const extraLoops = 3 + reelIndex;
    const indexInDom = baseIndexInFirstCycle + extraLoops * facesCount;

    const maxIndexForCenter = totalImages - 2;
    const safeIndex = Math.min(indexInDom, maxIndexForCenter);

    const offset = -(safeIndex - visibleOffset) * iconHeight;

    const imagesToMove = Math.max(1, Math.abs(safeIndex - visibleOffset));
    const perImageMs = 120;
    const baseMs = 2000;
    const duration = Math.min(40000, baseMs + imagesToMove * perImageMs + reelIndex * 900);

    reel.style.transition = `transform ${duration}ms cubic-bezier(.41,-0.01,.63,1.09)`;
    setTimeout(() => {
      reel.style.transform = `translateY(${offset}px)`;
    }, reelIndex * 200);
  });

  const maxDuration = 5000 + (reelInners.length - 1) * 1000 + 1500;
  
  return maxDuration;
}

export function getCurrentAttempt() {
  return currentAttempt;
}
