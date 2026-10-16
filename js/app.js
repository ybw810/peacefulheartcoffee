/**
 * Peaceful Heart Coffee - Main Application Coordinator
 */

import { BrewCalculator } from './brew-calc.js';
import { BrewTimer } from './timer.js';
import { GoldenCupCalculator } from './golden-cup.js';
import { CommunityQRModal } from './qr-modal.js';
import { registerPWA } from './pwa-register.js';
import { CoffeeCompassModal } from './compass-bh.js';

document.addEventListener('DOMContentLoaded', () => {
  // 0. Initialize BH Coffee Compass Modal
  const compassModal = new CoffeeCompassModal();
  // 1. Theme Switcher (Dark / Light)
  const btnThemeToggle = document.getElementById('btnThemeToggle');
  const storedTheme = localStorage.getItem('ph_theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', storedTheme);

  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ph_theme', next);
    });
  }

  // 2. View Tab Navigation (Brew vs Golden Cup)
  const tabs = document.querySelectorAll('.view-tab');
  const cards = document.querySelectorAll('.tool-card');

  function switchTab(viewId) {
    tabs.forEach(tab => {
      const active = tab.dataset.view === viewId;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    cards.forEach(card => {
      const active = card.dataset.tool === viewId;
      card.classList.toggle('active', active);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.view);
    });
  });

  // 3. Initialize Brewing Calculator
  let timerInstance = null;
  const brewCalc = new BrewCalculator({
    doseId: 'inputDose',
    waterId: 'inputWater',
    ratioId: 'inputRatio',
    schemeSelectId: 'selectScheme',
    methodDescId: 'methodDesc',
    stagesListId: 'stagesList',
    onUpdate: (stages) => {
      if (timerInstance) {
        timerInstance.render();
      }
    }
  });

  // 4. Initialize Brewing Timer
  timerInstance = new BrewTimer({
    displayId: 'timerTimeDisplay',
    containerId: 'timerContainer',
    rectRainbowId: 'timerRectRainbow',
    rectTrackId: 'timerRectTrack',
    rectSvgId: 'timerRectSvg',
    dialBarId: 'timerDialBar',
    stageBadgeId: 'timerStageBadge',
    btnToggleId: 'btnStartPause',
    btnResetId: 'btnResetTimer',
    btnMuteId: 'btnMuteAudio',
    btnWakeLockId: 'btnToggleWakeLock',
    getStages: () => brewCalc.getStages()
  });

  // 5. Initialize SCA Golden Cup Calculator
  const goldenCup = new GoldenCupCalculator({
    tdsId: 'goldTds',
    doseId: 'goldDose',
    waterId: 'goldWater',
    liquidId: 'goldLiquid'
  });

  // 6. Initialize Geek Console Accordion
  const geekToggle = document.getElementById('geekConsoleToggle');
  const geekConsole = document.getElementById('geekConsole');
  if (geekToggle && geekConsole) {
    geekToggle.addEventListener('click', () => {
      geekConsole.classList.toggle('expanded');
    });
  }

  // 7. Initialize Community QR Modal
  const qrModal = new CommunityQRModal();

  // 8. Register Service Worker & PWA Install
  registerPWA();

  // 9. iOS Safari Anti-Double-Tap Zoom & Pinch Gesture Guard
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      const tag = e.target.tagName;
      if (tag !== 'INPUT' && tag !== 'SELECT' && tag !== 'TEXTAREA') {
        e.preventDefault();
      }
    }
    lastTouchEnd = now;
  }, { passive: false });

  document.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('gesturechange', (e) => e.preventDefault());
  document.addEventListener('gestureend', (e) => e.preventDefault());

  console.log('⚡ Peaceful Heart Coffee Lab initialized. Powered by Gemini × Cloudflare Edge.');
});
