/**
 * Utils - Utility functions
 */

export function withBreaks(text) {
  return (text || "").replace(/\n/g, "<br>");
}

export function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

export function findParticipantById(id) {
  // Aguarda PARTICIPANTS estar disponível globalmente
  if (typeof PARTICIPANTS !== 'undefined') {
    return PARTICIPANTS.find((p) => p.id === id);
  }
  return null;
}
