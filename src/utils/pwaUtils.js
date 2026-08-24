/**
 * PWA utility helpers for PersonalOS (Sprint 7.8)
 */

export const isStandalone = () => {
  if (typeof window === 'undefined') return false;
  const isDisplayStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isNavigatorStandalone = window.navigator?.standalone === true;
  return isDisplayStandalone || isNavigatorStandalone;
};

export const isIOS = () => {
  if (typeof window === 'undefined' || !window.navigator) return false;
  const userAgent = window.navigator.userAgent || '';
  return /iPhone|iPad|iPod/i.test(userAgent);
};

export const requestPersistentStorage = async () => {
  if (typeof window === 'undefined' || !navigator.storage || !navigator.storage.persist) {
    return { supported: false, persisted: false };
  }

  try {
    const isAlreadyPersisted = await navigator.storage.persisted();
    if (isAlreadyPersisted) {
      return { supported: true, persisted: true };
    }

    const granted = await navigator.storage.persist();
    return { supported: true, persisted: granted };
  } catch {
    return { supported: true, persisted: false };
  }
};
