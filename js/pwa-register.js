/**
 * Mindful Drip - PWA Registration & Version Control Engine (v2.5.6)
 */

export const APP_BUILD_VERSION = '2.5.6';

export function registerPWA() {
  let swRegistration = null;
  let latestFoundVersion = null;

  // 1. Service Worker Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' })
        .then(reg => {
          swRegistration = reg;
          console.log('[Mindful Drip PWA] Service Worker registered (v' + APP_BUILD_VERSION + ')');

          // Check if there is already a waiting worker waiting to activate
          if (reg.waiting) {
            console.log('[Mindful Drip PWA] A waiting Service Worker is ready');
            showUpdateToast('新版本就绪，点击生效');
          }

          // Trigger immediate remote update check on sw.js
          reg.update().catch(() => {});

          // Listen for new worker installing
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  showUpdateToast('新版本就绪，点击生效');
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

    // Re-check for SW update on tab visibility and window focus
    const triggerUpdateCheck = () => {
      if (swRegistration) {
        swRegistration.update().catch(() => {});
      }
      checkRemoteVersion(false);
    };

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') triggerUpdateCheck();
    });
    window.addEventListener('focus', triggerUpdateCheck);
  }

  // 2. Remote Version JSON Checker (Checks against version.json with anti-cache timestamp)
  async function checkRemoteVersion(isManual = false) {
    try {
      const res = await fetch('./version.json?_t=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.version) {
          latestFoundVersion = data.version;
          if (data.version !== APP_BUILD_VERSION) {
            const dismissedVer = sessionStorage.getItem('dismissed_version') || localStorage.getItem('dismissed_version');
            if (!isManual && dismissedVer === data.version) {
              return;
            }
            showUpdateToast(`发现新版本 v${data.version} · 点击刷新`);
            return;
          }
        }
        if (isManual) {
          showToastNotice(`当前已是最新版 (v${APP_BUILD_VERSION}) ✨`);
        }
      }
    } catch (e) {
      if (isManual) {
        showToastNotice('当前处于离线模式，已载入本地最新缓存');
      }
    }
  }

  // Initial checks: 800ms and 3500ms
  setTimeout(() => checkRemoteVersion(false), 800);
  setTimeout(() => checkRemoteVersion(false), 3500);

  // 3. UI Version Toast Management
  function showUpdateToast(msg) {
    const toast = document.getElementById('updateToast');
    const toastText = document.getElementById('updateToastText');
    if (toast && toastText) {
      toastText.textContent = msg;
      toast.classList.add('show');
    }
  }

  function showToastNotice(msg) {
    const toast = document.getElementById('updateToast');
    const toastText = document.getElementById('updateToastText');
    if (toast && toastText) {
      toastText.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        if (toast.classList.contains('show')) toast.classList.remove('show');
      }, 3000);
    }
  }

  const btnToastClose = document.getElementById('btnToastClose');
  if (btnToastClose) {
    btnToastClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const toast = document.getElementById('updateToast');
      if (toast) toast.classList.remove('show');
      if (latestFoundVersion) {
        try {
          sessionStorage.setItem('dismissed_version', latestFoundVersion);
          localStorage.setItem('dismissed_version', latestFoundVersion);
        } catch (err) {}
      }
    });
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
      await checkRemoteVersion(true);
      setTimeout(() => {
        if (btnCheckUpdate) btnCheckUpdate.classList.remove('spinning');
      }, 1200);
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
