/**
 * Story Reveal with Scroll Animation Module
 */

export function setupScrollReveal(containerEl, rawText) {
  containerEl.innerHTML = "";

  const lines = rawText.split(/\r?\n/);

  lines.forEach((line) => {
    const span = document.createElement('span');
    span.className = 'reveal-line';

    if (line.trim() === '') {
      span.classList.add('empty-line');
      span.innerHTML = '&nbsp;';
    } else {
      span.textContent = line;
    }

    containerEl.appendChild(span);
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.05,
  });

  const toObserve = containerEl.querySelectorAll('.reveal-line');
  toObserve.forEach((el) => observer.observe(el));
}
