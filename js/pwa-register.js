/**
 * Mindful Drip - PWA Registration & Version Control Engine
 */

const CURRENT_VERSION = '2.3.0';

export function registerPWA() {
  let swRegistration = null;

  // 1. Service Worker Registration with updateViaCache: 'none'
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' })
        .then(reg => {
          swRegistration = reg;
          console.log('[Mindful Drip PWA] Service Worker active (v' + CURRENT_VERSION + ')');

          // Check for immediate update
          reg.update();

          // Listen for new worker installing
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  showUpdateToast('✨ 检测到新版本已就绪，点击立即生效');
                }
              });
            }
          });
        })
        .catch(err => {
          console.warn('[Mindful Drip PWA] SW registration failed:', err);
        });

      // Reload smoothly when new controller takes over
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    });

    // Re-check for SW update on tab visibility
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && swRegistration) {
        swRegistration.update();
        checkRemoteVersion();
      }
    });
  }

  // 2. Remote Version JSON Checker
  async function checkRemoteVersion() {
    try {
      const res = await fetch('./version.json?_t=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.version && data.version !== CURRENT_VERSION) {
          showUpdateToast(`⚡ 发现新版本 v${data.version} · 点击刷新载入`);
        }
      }
    } catch (e) {
      // Offline, ignore
    }
  }

  // Initial remote check after 3 seconds
  setTimeout(checkRemoteVersion, 3000);

  // 3. UI Version Toast Management
  function showUpdateToast(msg) {
    const toast = document.getElementById('updateToast');
    const toastText = document.getElementById('updateToastText');
    if (toast && toastText) {
      toastText.textContent = msg;
      toast.classList.add('show');
    }
  }

  const btnToastReload = document.getElementById('btnToastReload');
  if (btnToastReload) {
    btnToastReload.addEventListener('click', async () => {
      await forceCleanAndReload();
    });
  }

  // 4. Manual Update Trigger via Footer Badge
  const btnCheckUpdate = document.getElementById('btnCheckUpdate');
  const appVersionBadge = document.getElementById('appVersionBadge');
  if (btnCheckUpdate || appVersionBadge) {
    const trigger = btnCheckUpdate || appVersionBadge;
    trigger.addEventListener('click', async (e) => {
      e.preventDefault();
      if (btnCheckUpdate) btnCheckUpdate.classList.add('spinning');
      await forceCleanAndReload();
    });
  }

  // Force clean all caches and hard reload
  async function forceCleanAndReload() {
    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (let r of registrations) {
          await r.unregister();
        }
      }
    } catch (e) {
      console.warn('Cache purge error:', e);
    }
    window.location.href = window.location.origin + window.location.pathname + '?_v=' + Date.now();
  }

  // 5. PWA Install Prompt Banner
  let deferredPrompt = null;
  const pwaBanner = document.getElementById('pwaInstallBanner');
  const btnInstall = document.getElementById('btnInstallPWA');
  const btnDismiss = document.getElementById('btnDismissPWA');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (!sessionStorage.getItem('pwa_dismissed') && pwaBanner) {
      pwaBanner.classList.add('show');
    }
  });

  if (btnInstall) {
    btnInstall.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      pwaBanner.classList.remove('show');
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      console.log('[Mindful Drip PWA] User install choice:', choiceResult.outcome);
      deferredPrompt = null;
    });
  }

  if (btnDismiss) {
    btnDismiss.addEventListener('click', () => {
      if (pwaBanner) pwaBanner.classList.remove('show');
      sessionStorage.setItem('pwa_dismissed', 'true');
    });
  }

  window.addEventListener('appinstalled', () => {
    console.log('[Mindful Drip PWA] App successfully installed!');
    if (pwaBanner) pwaBanner.classList.remove('show');
    deferredPrompt = null;
  });
}
