import { useState, useEffect, useCallback } from 'react';
import { isStandalone, isIOS } from '../utils/pwaUtils';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useToast } from './useToast';

export const usePWA = () => {
  const { addToast } = useToast();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showIOSSheet, setShowIOSSheet] = useState(false);
  const [isOnline, setIsOnline] = useState(() => (typeof navigator !== 'undefined' ? navigator.onLine : true));

  // Service worker register hook with prompt update mode
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // Periodic update check every 60 minutes
      if (r) {
        setInterval(() => r.update(), 60 * 60 * 1000);
      }
    },
    onRegisterError(error) {
      console.warn('PersonalOS Service Worker registration failed:', error);
    },
  });

  // Capture beforeinstallprompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // Online / Offline status listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      addToast('Back online.', 'success', 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      addToast("You're offline. PersonalOS still works locally.", 'info', 3500);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [addToast]);

  // Trigger installation
  const promptInstall = useCallback(async () => {
    if (isIOS()) {
      setShowIOSSheet(true);
      return;
    }

    if (!deferredPrompt) {
      addToast('PersonalOS installation is not supported or already installed.', 'info');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      addToast('PersonalOS installed successfully.', 'success');
      setIsInstallable(false);
      setDeferredPrompt(null);
    }
  }, [deferredPrompt, addToast]);

  return {
    isStandalone: isStandalone(),
    isIOS: isIOS(),
    isInstallable: isInstallable || isIOS(),
    needRefresh,
    isOnline,
    showIOSSheet,
    setShowIOSSheet,
    promptInstall,
    updateServiceWorker: () => updateServiceWorker(true),
    dismissUpdate: () => setNeedRefresh(false),
  };
};
