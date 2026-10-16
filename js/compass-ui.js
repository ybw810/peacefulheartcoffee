/**
 * The Coffee Compass UI Component
 * Renders interactive SVG Compass Wheel and Diagnostic Guidance
 * Mindful Drip Lab
 */

import { CoffeeCompassEngine, COMPASS_VECTORS, FLAVOR_DATABASE } from '../plugins/coffee-compass/compass-engine.js';

export class CompassUI {
  constructor() {
    this.engine = new CoffeeCompassEngine();
    this.currentFlavorId = 'balanced';
    this.currentAngle = 0;
    this.init();
  }

  init() {
    this.renderCompassWheel();
    this.bindEvents();
    this.selectFlavor('balanced', true);
  }

  renderCompassWheel() {
    const wheelContainer = document.getElementById('compassWheelContainer');
    if (!wheelContainer) return;

    const cx = 200;
    const cy = 200;

    // Build SVG structure
    let svgHtml = `
      <svg class="compass-svg-dial" viewBox="0 0 400 400" id="compassSvgDial">
        <defs>
          <!-- Center Balanced Gradient -->
          <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.9" />
            <stop offset="70%" stop-color="#059669" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#047857" stop-opacity="0.2" />
          </radialGradient>

          <!-- Needle Gradient -->
          <linearGradient id="needleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffedd5" />
            <stop offset="50%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#b45309" />
          </linearGradient>

          <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- Outer Boundary and Rings -->
        <circle cx="${cx}" cy="${cy}" r="195" class="compass-ring-outer" />
        <circle cx="${cx}" cy="${cy}" r="175" class="compass-ring-grid" />
        <circle cx="${cx}" cy="${cy}" r="130" class="compass-ring-grid" />
        <circle cx="${cx}" cy="${cy}" r="82" class="compass-ring-grid" />
    `;

    // Outer Ticks (every 15 degrees)
    for (let deg = 0; deg < 360; deg += 15) {
      const rad = (deg - 90) * (Math.PI / 180);
      const isMajor = deg % 45 === 0;
      const r1 = isMajor ? 183 : 188;
      const r2 = 194;
      const x1 = cx + r1 * Math.cos(rad);
      const y1 = cy + r1 * Math.sin(rad);
      const x2 = cx + r2 * Math.cos(rad);
      const y2 = cy + r2 * Math.sin(rad);
      svgHtml += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="${isMajor ? 'compass-tick-major' : 'compass-tick-minor'}" />`;
    }

    // 8 Cardinal Sector Labels
    const cardinalLabels = [
      { text: 'OVER EXTRACTED', angle: 335, r: 162 },
      { text: 'OE / W', angle: 25, r: 162 },
      { text: 'WEAK', angle: 70, r: 162 },
      { text: 'UE / W', angle: 115, r: 162 },
      { text: 'UNDER EXTRACTED', angle: 180, r: 162 },
      { text: 'UE / S', angle: 245, r: 162 },
      { text: 'STRONG', angle: 280, r: 162 },
      { text: 'OE / S', angle: 305, r: 162 }
    ];

    cardinalLabels.forEach(lbl => {
      const rad = (lbl.angle - 90) * (Math.PI / 180);
      const x = cx + lbl.r * Math.cos(rad);
      const y = cy + lbl.r * Math.sin(rad);
      svgHtml += `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" class="compass-cardinal-label" transform="rotate(${lbl.angle - 90}, ${x.toFixed(1)}, ${y.toFixed(1)})">${lbl.text}</text>`;
    });

    // Sector divider spokes
    const sectorAngles = [0, 45, 90, 135, 180, 225, 270, 315];
    sectorAngles.forEach(deg => {
      const rad = (deg - 90) * (Math.PI / 180);
      const x2 = cx + 175 * Math.cos(rad);
      const y2 = cy + 175 * Math.sin(rad);
      svgHtml += `<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="compass-spoke-line" />`;
    });

    // Center Balanced Disc
    svgHtml += `
      <g class="compass-node-center" data-flavor-id="balanced">
        <circle cx="${cx}" cy="${cy}" r="46" fill="url(#centerGrad)" class="compass-center-disc" />
        <circle cx="${cx}" cy="${cy}" r="46" class="compass-center-border" />
        <text x="${cx}" y="${cy - 7}" class="compass-center-title">BALANCED</text>
        <text x="${cx}" y="${cy + 13}" class="compass-center-sub">黄金平衡</text>
      </g>
    `;

    // Dynamic Magnetic Needle
    svgHtml += `
      <g id="compassNeedleGroup" class="compass-needle-group" style="transform-origin: ${cx}px ${cy}px; transform: rotate(0deg);">
        <!-- Needle Pointer -->
        <polygon points="${cx - 4},${cy - 12} ${cx},${cy - 142} ${cx + 4},${cy - 12}" fill="url(#needleGrad)" class="needle-pointer" filter="url(#glowFilter)" />
        <polygon points="${cx - 3},${cy + 8} ${cx},${cy + 35} ${cx + 3},${cy + 8}" fill="#78350f" class="needle-tail" />
        <circle cx="${cx}" cy="${cy}" r="9" class="needle-pivot" />
        <circle cx="${cx}" cy="${cy}" r="3.5" class="needle-center-gem" />
      </g>
    `;

    svgHtml += `</svg>`;
    wheelContainer.innerHTML = svgHtml;

    // Render interactive quick selector pills
    this.renderInteractiveNodes();
  }

  renderInteractiveNodes() {
    const listWrap = document.getElementById('compassFlavorListWrap');
    if (!listWrap) return;

    // Group flavors by category
    const categories = [
      { key: 'balanced', title: '🎯 核心平衡 (Balanced)', color: 'var(--emerald)' },
      { key: 'over_extracted', title: '🔴 过度萃取 (Over Extracted)', color: '#ef4444' },
      { key: 'under_extracted', title: '🔵 欠萃不足 (Under Extracted)', color: '#06b6d4' },
      { key: 'weak', title: '🟣 水感过淡 (Weak)', color: '#a855f7' },
      { key: 'strong', title: '🟠 浓度发沉 (Strong)', color: '#f97316' },
      { key: 'oe_w', title: '⚠️ 过萃偏淡 (OE / W)', color: '#f43f5e' },
      { key: 'ue_w', title: '⚠️ 欠萃偏淡 (UE / W)', color: '#38bdf8' },
      { key: 'ue_s', title: '⚠️ 欠萃过浓 (UE / S)', color: '#eab308' },
      { key: 'oe_s', title: '⚠️ 过萃过浓 (OE / S)', color: '#dc2626' }
    ];

    let html = '';
    categories.forEach(cat => {
      const flavors = this.engine.getFlavorsByVector(cat.key);
      if (flavors.length === 0) return;
      html += `
        <div class="flavor-category-group">
          <div class="flavor-category-title" style="color: ${cat.color};">${cat.title}</div>
          <div class="flavor-chips-grid">
            ${flavors.map(f => `
              <button type="button" class="flavor-chip ${f.id === this.currentFlavorId ? 'active' : ''}" data-flavor-id="${f.id}" title="${f.nameEn} · ${f.nameZh}">
                <span class="chip-en">${f.nameEn}</span>
                <span class="chip-zh">${f.nameZh}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    });

    listWrap.innerHTML = html;
  }

  bindEvents() {
    // 1. Center Disc click
    const centerBtn = document.querySelector('.compass-node-center');
    if (centerBtn) {
      centerBtn.addEventListener('click', () => this.selectFlavor('balanced'));
    }

    // 2. Quick Tags Chips
    const quickBar = document.getElementById('compassQuickChips');
    if (quickBar) {
      quickBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.compass-quick-btn');
        if (btn && btn.dataset.flavor) {
          quickBar.querySelectorAll('.compass-quick-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.selectFlavor(btn.dataset.flavor);
        }
      });
    }

    // 3. Flavor Pills Grid
    const listWrap = document.getElementById('compassFlavorListWrap');
    if (listWrap) {
      listWrap.addEventListener('click', (e) => {
        const chip = e.target.closest('.flavor-chip');
        if (chip && chip.dataset.flavorId) {
          this.selectFlavor(chip.dataset.flavorId);
        }
      });
    }

    // 4. Sub-tab switching (Compass vs SCA)
    const btnCompass = document.getElementById('subtabCompass');
    const btnSca = document.getElementById('subtabSca');
    const viewCompass = document.getElementById('viewCompass');
    const viewSca = document.getElementById('viewSca');

    if (btnCompass && btnSca && viewCompass && viewSca) {
      btnCompass.addEventListener('click', () => {
        btnCompass.classList.add('active');
        btnCompass.setAttribute('aria-selected', 'true');
        btnSca.classList.remove('active');
        btnSca.setAttribute('aria-selected', 'false');
        viewCompass.classList.add('active');
        viewSca.classList.remove('active');
        localStorage.setItem('ph_taste_view', 'compass');
      });

      btnSca.addEventListener('click', () => {
        btnSca.classList.add('active');
        btnSca.setAttribute('aria-selected', 'true');
        btnCompass.classList.remove('active');
        btnCompass.setAttribute('aria-selected', 'false');
        viewSca.classList.add('active');
        viewCompass.classList.remove('active');
        localStorage.setItem('ph_taste_view', 'sca');
      });

      // Restore stored view if present
      const storedView = localStorage.getItem('ph_taste_view');
      if (storedView === 'sca') {
        btnSca.click();
      }
    }
  }

  selectFlavor(flavorId, immediate = false) {
    const diagnosis = this.engine.diagnose(flavorId);
    if (!diagnosis) return;

    this.currentFlavorId = flavorId;
    const { flavor, vector } = diagnosis;

    // 1. Rotate Needle to vector angle
    const targetAngle = vector.angle || 0;
    const needle = document.getElementById('compassNeedleGroup');
    if (needle) {
      if (immediate) {
        needle.style.transition = 'none';
        needle.style.transform = `rotate(${targetAngle}deg)`;
        setTimeout(() => needle.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', 50);
      } else {
        needle.style.transform = `rotate(${targetAngle}deg)`;
      }
    }

    // 2. Highlight active chip
    document.querySelectorAll('.flavor-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.flavorId === flavorId);
    });

    // 3. Render Prescription Card
    this.renderDiagnosisCard(flavor, vector);
  }

  renderDiagnosisCard(flavor, vector) {
    const card = document.getElementById('compassDiagnosisCard');
    if (!card) return;

    const isBalanced = vector.id === 'balanced';

    card.innerHTML = `
      <div class="diag-header">
        <div class="diag-flavor-badge">
          <span class="diag-en">${flavor.nameEn}</span>
          <span class="diag-zh">${flavor.nameZh}</span>
        </div>
        <div class="diag-vector-pill" style="border-color: ${vector.color}; color: ${vector.color};">
          <span>🧭 ${vector.nameZh} · ${vector.nameEn}</span>
        </div>
      </div>

      <div class="diag-action-banner ${isBalanced ? 'balanced' : ''}">
        <div class="diag-action-icon">${isBalanced ? '✨' : '⚡'}</div>
        <div class="diag-action-text">
          <div class="action-main">${vector.actionZh}</div>
          <div class="action-desc">${vector.guidanceZh}</div>
        </div>
      </div>

      <div class="diag-adjustments-grid">
        <div class="adj-box">
          <div class="adj-label">🔧 研磨度 (Grind)</div>
          <div class="adj-val ${vector.adjustments.grind.includes('调') ? 'highlight' : ''}">${vector.adjustments.grind}</div>
        </div>
        <div class="adj-box">
          <div class="adj-label">⏱️ 注水耗时 (Time)</div>
          <div class="adj-val ${vector.adjustments.time.includes('缩') || vector.adjustments.time.includes('增') ? 'highlight' : ''}">${vector.adjustments.time}</div>
        </div>
        <div class="adj-box">
          <div class="adj-label">🌡️ 冲煮水温 (Temp)</div>
          <div class="adj-val ${vector.adjustments.temp.includes('降') || vector.adjustments.temp.includes('升') ? 'highlight' : ''}">${vector.adjustments.temp}</div>
        </div>
        <div class="adj-box">
          <div class="adj-label">💧 建议粉水比 (Ratio)</div>
          <div class="adj-val ${vector.adjustments.ratio.includes('减') || vector.adjustments.ratio.includes('增') ? 'highlight' : ''}">${vector.adjustments.ratio}</div>
        </div>
      </div>
    `;
  }
}
