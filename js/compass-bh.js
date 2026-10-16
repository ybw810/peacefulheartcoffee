/**
 * Mindful Drip - Barista Hustle Coffee Compass Module
 * Faithfully recreating Matt Perger's iconic Coffee Compass with bilingual Chinese localization.
 */

export const BH_COMPASS_VECTORS = {
  UNDER_EXTRACTED: {
    id: 'under_extracted',
    nameEn: 'Under Extracted',
    nameZh: '萃取不足 (欠萃)',
    actionEn: 'Extract More',
    actionZh: '增加萃取 (Extract More)',
    summaryZh: '调细研磨度 1~2 格 / 提高冲煮水温 1~2°C / 延长萃取耗时',
    descZh: '咖啡展现出生硬尖酸、青草生味或咸涩，甜感未能充分释放。水流通过过快或未能提取出中后段高沸点成熟糖分与芳香物质。',
    color: '#0d9488',
    adjustments: {
      grind: '调细 1~2 格',
      time: '延长 15~20s',
      temp: '提升 1~2°C',
      ratio: '保持现有比例'
    }
  },
  OVER_EXTRACTED: {
    id: 'over_extracted',
    nameEn: 'Over Extracted',
    nameZh: '过度萃取 (过萃)',
    actionEn: 'Extract Less',
    actionZh: '减少萃取 (Extract Less)',
    summaryZh: '调粗研磨度 1~2 格 / 降低冲煮水温 1~2°C / 缩短冲煮耗时',
    descZh: '舌面感到明显干涩、焦苦、粗糙刺喉。由于研磨过细或浸润时间过长，咖啡豆深层的难溶性多酚及木质素被过量溶出。',
    color: '#e11d48',
    adjustments: {
      grind: '调粗 1~2 格',
      time: '缩短 15~25s',
      temp: '降低 1~2°C',
      ratio: '保持现有比例'
    }
  },
  STRONG: {
    id: 'strong',
    nameEn: 'Strong',
    nameZh: '浓度过高 (过浓)',
    actionEn: 'More Water / Less Coffee',
    actionZh: '降低浓度 (More Water / Less Coffee)',
    summaryZh: '放大粉水比 (如 1:15 调至 1:16) / 保持当前研磨不变',
    descZh: '口感沉重、发闷浑浊、压舌感强，但酸甜苦风味平衡度尚可。只需增加注水量或减少 1~2g 咖啡粉即可使风味清晰舒展。',
    color: '#ea580c',
    adjustments: {
      grind: '保持不变',
      time: '保持不变',
      temp: '保持不变',
      ratio: '增加水量或减少咖啡粉'
    }
  },
  WEAK: {
    id: 'weak',
    nameEn: 'Weak',
    nameZh: '浓度不足 (水感偏淡)',
    actionEn: 'Less Water / More Coffee',
    actionZh: '提高浓度 (Less Water / More Coffee)',
    summaryZh: '缩小粉水比 (如 1:16 调至 1:15) / 增加 1~2g 咖啡粉',
    descZh: '水感过重、体感单薄稀疏、风味像被稀释的茶汤。萃取率本身可能合格，但杯中总溶解固体 (TDS) 过低，需增加咖啡粉量。',
    color: '#7c3aed',
    adjustments: {
      grind: '保持或微细半格',
      time: '保持不变',
      temp: '保持不变',
      ratio: '减少水量或增加咖啡粉'
    }
  },
  BALANCED: {
    id: 'balanced',
    nameEn: 'Balanced',
    nameZh: '黄金平衡 (Sweet Spot)',
    actionEn: 'Sweet Spot Nailed!',
    actionZh: '完美平衡 · 享受当杯冲煮',
    summaryZh: '保持当前所有研磨与冲煮手法不变',
    descZh: '恭喜！酸质多汁圆润、甜感清澈饱满、顺滑无杂涩，已达手冲咖啡的黄金风味平衡带！请记录当前参数并尽情享用。',
    color: '#10b981',
    adjustments: {
      grind: '保持最佳',
      time: '保持最佳',
      temp: '保持最佳',
      ratio: '保持最佳'
    }
  }
};

export const BH_FLAVORS = [
  // Center Disc: Balanced
  { id: 'balanced', nameEn: 'Balanced', nameZh: '黄金平衡', vector: 'BALANCED', ring: 'center', angle: 0 },

  // Inner Ring (Sage Green #749685): Symmetrically spaced ~17° apart
  { id: 'strong', nameEn: 'Strong', nameZh: '风味深浓', vector: 'STRONG', ring: 'inner', angle: 0 },
  { id: 'heavy', nameEn: 'Heavy', nameZh: '沉实厚重', vector: 'STRONG', ring: 'inner', angle: 17 },
  { id: 'hefty', nameEn: 'Hefty', nameZh: '饱满压舌', vector: 'STRONG', ring: 'inner', angle: 34 },
  { id: 'robust', nameEn: 'Robust', nameZh: '醇厚坚实', vector: 'STRONG', ring: 'inner', angle: 51 },
  { id: 'thick', nameEn: 'Thick', nameZh: '浓稠难咽', vector: 'STRONG', ring: 'inner', angle: 68 },
  { id: 'rich', nameEn: 'Rich', nameZh: '丰富深邃', vector: 'BALANCED', ring: 'inner', angle: 85 },
  { id: 'luscious', nameEn: 'Luscious', nameZh: '多汁甜美', vector: 'BALANCED', ring: 'inner', angle: 102 },
  { id: 'sweet', nameEn: 'Sweet', nameZh: '清甜甘冽', vector: 'BALANCED', ring: 'inner', angle: 119 },
  { id: 'pleasing', nameEn: 'Pleasing', nameZh: '怡人舒适', vector: 'BALANCED', ring: 'inner', angle: 136 },
  { id: 'aromatic', nameEn: 'Aromatic', nameZh: '芬芳馥郁', vector: 'BALANCED', ring: 'inner', angle: 153 },
  { id: 'delicate', nameEn: 'Delicate', nameZh: '细腻雅致', vector: 'WEAK', ring: 'inner', angle: 170 },
  { id: 'gentle', nameEn: 'Gentle', nameZh: '温润轻柔', vector: 'WEAK', ring: 'inner', angle: 187 },
  { id: 'thin', nameEn: 'Thin', nameZh: '质感偏薄', vector: 'WEAK', ring: 'inner', angle: 204 },
  { id: 'transparent', nameEn: 'Transparent', nameZh: '纯净通透', vector: 'BALANCED', ring: 'inner', angle: 221 },
  { id: 'soft', nameEn: 'Soft', nameZh: '柔和轻缓', vector: 'BALANCED', ring: 'inner', angle: 238 },
  { id: 'slender', nameEn: 'Slender', nameZh: '纤瘦细巧', vector: 'WEAK', ring: 'inner', angle: 255 },
  { id: 'nuanced', nameEn: 'Nuanced', nameZh: '层析细致', vector: 'BALANCED', ring: 'inner', angle: 272 },
  { id: 'buttery', nameEn: 'Buttery', nameZh: '黄油醇滑', vector: 'BALANCED', ring: 'inner', angle: 289 },
  { id: 'substantial', nameEn: 'Substantial', nameZh: '醇实质感', vector: 'BALANCED', ring: 'inner', angle: 306 },
  { id: 'plump', nameEn: 'Plump', nameZh: '圆润丰满', vector: 'BALANCED', ring: 'inner', angle: 323 },
  { id: 'sticky', nameEn: 'Sticky', nameZh: '浓郁黏附', vector: 'BALANCED', ring: 'inner', angle: 340 },
  { id: 'big', nameEn: 'Big', nameZh: '宏大厚实', vector: 'STRONG', ring: 'inner', angle: 354 },

  // Outer Ring (Dusty Rose #b87a87): Clean spacing with zero overlap
  // Strong & Over-Concentrated (Top: 6° to 48°)
  { id: 'harsh', nameEn: 'Harsh', nameZh: '粗糙毛刺', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 6 },
  { id: 'overwhelming', nameEn: 'Overwhelming', nameZh: '压舌窒息', vector: 'STRONG', ring: 'outer', angle: 20 },
  { id: 'severe', nameEn: 'Severe', nameZh: '焦辣苦烈', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 34 },
  { id: 'intense', nameEn: 'Intense', nameZh: '刺喉燥苦', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 48 },

  // Over-Extracted side (Right: 64° to 138°)
  { id: 'dry', nameEn: 'Dry', nameZh: '舌面发干', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 64 },
  { id: 'bitter', nameEn: 'Bitter', nameZh: '焦苦杂味', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 80 },
  { id: 'powdery', nameEn: 'Powdery', nameZh: '细粉沙感', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 96 },
  { id: 'empty', nameEn: 'Empty', nameZh: '中段空洞', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 110 },
  { id: 'dusty', nameEn: 'Dusty', nameZh: '尘土干燥感', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 124 },
  { id: 'astringent', nameEn: 'Astringent', nameZh: '收敛干涩', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 138 },

  // Weak / Watery side (Bottom: 150° to 238°)
  { id: 'scrawny', nameEn: 'Scrawny', nameZh: '干瘪刺瘦', vector: 'WEAK', ring: 'outer', angle: 150 },
  { id: 'limp', nameEn: 'Limp', nameZh: '软塌无力', vector: 'WEAK', ring: 'outer', angle: 158 },
  { id: 'dilute', nameEn: 'Dilute', nameZh: '过度稀释', vector: 'WEAK', ring: 'outer', angle: 166 },
  { id: 'fragile', nameEn: 'Fragile', nameZh: '脆弱松散', vector: 'WEAK', ring: 'outer', angle: 174 },
  { id: 'muted', nameEn: 'Muted', nameZh: '风味闭塞', vector: 'WEAK', ring: 'outer', angle: 182 },
  { id: 'faint', nameEn: 'Faint', nameZh: '微弱游离', vector: 'WEAK', ring: 'outer', angle: 190 },
  { id: 'sparse', nameEn: 'Sparse', nameZh: '稀疏空乏', vector: 'WEAK', ring: 'outer', angle: 198 },
  { id: 'tea_like', nameEn: 'Tea-Like', nameZh: '茶样寡淡', vector: 'WEAK', ring: 'outer', angle: 206 },
  { id: 'flimsy', nameEn: 'Flimsy', nameZh: '薄弱寡淡', vector: 'WEAK', ring: 'outer', angle: 214 },
  { id: 'insipid', nameEn: 'Insipid', nameZh: '平淡无奇', vector: 'WEAK', ring: 'outer', angle: 222 },
  { id: 'watery', nameEn: 'Watery', nameZh: '水感寡淡', vector: 'WEAK', ring: 'outer', angle: 230 },
  { id: 'bland', nameEn: 'Bland', nameZh: '寡淡清汤', vector: 'WEAK', ring: 'outer', angle: 238 },

  // Under-Extracted side (Left: 254° to 310°)
  { id: 'vegetal', nameEn: 'Vegetal', nameZh: '青草蔬菜生味', vector: 'UNDER_EXTRACTED', ring: 'outer', angle: 254 },
  { id: 'sour', nameEn: 'Sour', nameZh: '尖酸刺舌', vector: 'UNDER_EXTRACTED', ring: 'outer', angle: 268 },
  { id: 'salty', nameEn: 'Salty', nameZh: '咸酸无糖感', vector: 'UNDER_EXTRACTED', ring: 'outer', angle: 282 },
  { id: 'quick_finish', nameEn: 'Quick Finish', nameZh: '尾韵瞬间断层', vector: 'UNDER_EXTRACTED', ring: 'outer', angle: 296 },
  { id: 'dull', nameEn: 'Dull', nameZh: '沉闷平钝', vector: 'UNDER_EXTRACTED', ring: 'outer', angle: 310 },

  // Strong / Top-Left: 324° to 352°
  { id: 'savoury', nameEn: 'Savoury', nameZh: '咸醇沉重', vector: 'STRONG', ring: 'outer', angle: 324 },
  { id: 'bulky', nameEn: 'Bulky', nameZh: '粗重臃肿', vector: 'STRONG', ring: 'outer', angle: 338 },
  { id: 'soupy', nameEn: 'Soupy', nameZh: '混浊如泥汤', vector: 'STRONG', ring: 'outer', angle: 352 }
];

export class CoffeeCompassModal {
  constructor() {
    this.modal = document.getElementById('compassModal');
    this.openBtn = document.getElementById('btnCompassModal');
    this.closeBtn = document.getElementById('btnCloseCompass');
    this.svg = document.getElementById('compassSvg');

    // UI elements
    this.searchInput = document.getElementById('compassSearchInput');
    this.searchClear = document.getElementById('compassSearchClear');
    this.quickTags = document.getElementById('compassQuickTags');

    // Diagnosis elements
    this.dotEl = document.getElementById('diagnosisDot');
    this.nameEnEl = document.getElementById('diagnosisNameEn');
    this.nameZhEl = document.getElementById('diagnosisNameZh');
    this.badgeEl = document.getElementById('diagnosisBadge');
    this.actionEl = document.getElementById('guidanceAction');
    this.descEl = document.getElementById('guidanceDesc');
    this.grindEl = document.getElementById('diagGrindVal');
    this.timeEl = document.getElementById('diagTimeVal');
    this.tempEl = document.getElementById('diagTempVal');
    this.ratioEl = document.getElementById('diagRatioVal');

    this.selectedFlavorId = 'sour';
    this.init();
  }

  init() {
    if (!this.modal || !this.svg) return;

    // Render Wheel
    this.renderWheel();

    // Event listeners
    if (this.openBtn) {
      this.openBtn.addEventListener('click', () => this.open());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });

    // Search input
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        const val = e.target.value.trim().toLowerCase();
        if (this.searchClear) {
          this.searchClear.style.display = val ? 'block' : 'none';
        }
        this.handleSearch(val);
      });
    }

    if (this.searchClear) {
      this.searchClear.addEventListener('click', () => {
        if (this.searchInput) {
          this.searchInput.value = '';
          this.searchInput.focus();
        }
        this.searchClear.style.display = 'none';
        this.clearFilter();
      });
    }

    // Quick tags
    if (this.quickTags) {
      this.quickTags.addEventListener('click', (e) => {
        const tag = e.target.closest('.quick-tag');
        if (!tag) return;
        const flavorId = tag.getAttribute('data-flavor');
        if (flavorId) {
          this.selectFlavor(flavorId);
        }
      });
    }

    // Select initial flavor
    this.selectFlavor('sour');
  }

  open() {
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  renderWheel() {
    const svgNS = 'http://www.w3.org/2000/svg';
    this.svg.innerHTML = '';

    // 1. Defs & Filters (Subtle glow)
    const defs = document.createElementNS(svgNS, 'defs');
    defs.innerHTML = `
      <filter id="activeGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    `;
    this.svg.appendChild(defs);

    // 2. Outer Dial Track & Ticks
    const trackGroup = document.createElementNS(svgNS, 'g');
    trackGroup.setAttribute('class', 'compass-track-layer');

    // Outer circle ring (radius 245)
    const outerRing = document.createElementNS(svgNS, 'circle');
    outerRing.setAttribute('cx', '0');
    outerRing.setAttribute('cy', '0');
    outerRing.setAttribute('r', '245');
    outerRing.setAttribute('fill', 'none');
    outerRing.setAttribute('stroke', 'currentColor');
    outerRing.setAttribute('stroke-opacity', '0.22');
    outerRing.setAttribute('stroke-width', '1.2');
    trackGroup.appendChild(outerRing);

    // Ticks around 360 degrees
    for (let deg = 0; deg < 360; deg += 5) {
      const isMajor = deg % 45 === 0;
      const isSemiMajor = deg % 15 === 0;
      const tickLen = isMajor ? 9 : (isSemiMajor ? 6 : 3.5);
      const rad = (deg - 90) * (Math.PI / 180);
      const x1 = Math.cos(rad) * 245;
      const y1 = Math.sin(rad) * 245;
      const x2 = Math.cos(rad) * (245 - tickLen);
      const y2 = Math.sin(rad) * (245 - tickLen);

      const tick = document.createElementNS(svgNS, 'line');
      tick.setAttribute('x1', x1.toFixed(1));
      tick.setAttribute('y1', y1.toFixed(1));
      tick.setAttribute('x2', x2.toFixed(1));
      tick.setAttribute('y2', y2.toFixed(1));
      tick.setAttribute('stroke', 'currentColor');
      tick.setAttribute('stroke-opacity', isMajor ? '0.7' : '0.3');
      tick.setAttribute('stroke-width', isMajor ? '1.5' : '1');
      trackGroup.appendChild(tick);
    }

    // Cardinal Labels on Ring
    const cardinalLabels = [
      { deg: 0, textEn: 'Strong', textZh: '过浓', arrow: '▲', r: 260 },
      { deg: 45, textEn: 'OE / S', textZh: '过萃过浓', arrow: '△', r: 260 },
      { deg: 90, textEn: 'Over Extracted', textZh: '过度萃取', arrow: '▶', r: 260 },
      { deg: 135, textEn: 'OE / W', textZh: '过萃偏淡', arrow: '△', r: 260 },
      { deg: 180, textEn: 'Weak', textZh: '水感偏淡', arrow: '▼', r: 260 },
      { deg: 225, textEn: 'UE / W', textZh: '欠萃偏淡', arrow: '△', r: 260 },
      { deg: 270, textEn: 'Under Extracted', textZh: '萃取不足', arrow: '◀', r: 260 },
      { deg: 315, textEn: 'UE / S', textZh: '欠萃过浓', arrow: '△', r: 260 }
    ];

    cardinalLabels.forEach(c => {
      const g = document.createElementNS(svgNS, 'g');
      g.setAttribute('transform', `rotate(${c.deg}) translate(0, -${c.r})`);

      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', '0');
      text.setAttribute('y', '0');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('class', 'cardinal-label');

      // Keep text upright relative to screen if in bottom half
      const isBottom = c.deg > 90 && c.deg < 270;
      if (isBottom) {
        text.setAttribute('transform', 'rotate(180)');
      }

      text.innerHTML = `<tspan font-weight="700" fill="currentColor">${c.arrow} ${c.textEn}</tspan> <tspan font-size="9" fill="currentColor" fill-opacity="0.7">(${c.textZh})</tspan>`;
      g.appendChild(text);
      trackGroup.appendChild(g);
    });

    this.svg.appendChild(trackGroup);

    // 3. Radial Flavor Pills Layer
    const pillsGroup = document.createElementNS(svgNS, 'g');
    pillsGroup.setAttribute('class', 'compass-pills-layer');
    pillsGroup.setAttribute('id', 'pillsGroup');

    BH_FLAVORS.forEach(item => {
      if (item.ring === 'center') return;

      const isInner = item.ring === 'inner';
      const rInner = isInner ? 68 : 142;
      const rOuter = isInner ? 134 : 228;
      const pillWidth = isInner ? 17.5 : 19;
      const pillHeight = rOuter - rInner;
      const pillColor = isInner ? '#749685' : '#b87a87';

      const g = document.createElementNS(svgNS, 'g');
      g.setAttribute('transform', `rotate(${item.angle})`);
      g.setAttribute('class', `flavor-pill-node ${isInner ? 'ring-inner' : 'ring-outer'}`);
      g.setAttribute('data-id', item.id);
      g.setAttribute('data-name-en', item.nameEn.toLowerCase());
      g.setAttribute('data-name-zh', item.nameZh);
      g.style.cursor = 'pointer';

      // Rect
      const rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('x', (-pillWidth / 2).toFixed(1));
      rect.setAttribute('y', (-rOuter).toFixed(1));
      rect.setAttribute('width', pillWidth);
      rect.setAttribute('height', pillHeight);
      rect.setAttribute('rx', '4.5');
      rect.setAttribute('ry', '4.5');
      rect.setAttribute('fill', pillColor);
      rect.setAttribute('class', 'flavor-pill-rect');
      rect.setAttribute('id', `pill-rect-${item.id}`);

      // Text along the pill length
      const midY = -((rInner + rOuter) / 2);
      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', '0');
      text.setAttribute('y', midY.toFixed(1));
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'central');
      text.setAttribute('class', 'flavor-pill-text');

      // Radial rotation for readability
      const rotateDeg = (item.angle >= 90 && item.angle <= 270) ? 90 : -90;
      text.setAttribute('transform', `rotate(${rotateDeg}, 0, ${midY.toFixed(1)})`);

      text.textContent = item.nameEn;
      text.setAttribute('fill', '#ffffff');
      text.setAttribute('font-size', isInner ? '9' : '8.5');
      text.setAttribute('font-weight', '600');
      text.setAttribute('letter-spacing', '0.01em');

      g.appendChild(rect);
      g.appendChild(text);

      // Click handling
      g.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectFlavor(item.id);
      });

      pillsGroup.appendChild(g);
    });

    this.svg.appendChild(pillsGroup);

    // 4. Center Disc: Balanced Bullseye
    const centerGroup = document.createElementNS(svgNS, 'g');
    centerGroup.setAttribute('class', 'compass-center-hub');
    centerGroup.style.cursor = 'pointer';
    centerGroup.addEventListener('click', (e) => {
      e.stopPropagation();
      this.selectFlavor('balanced');
    });

    // Center disc circle
    const centerCircle = document.createElementNS(svgNS, 'circle');
    centerCircle.setAttribute('cx', '0');
    centerCircle.setAttribute('cy', '0');
    centerCircle.setAttribute('r', '60');
    centerCircle.setAttribute('fill', '#6d8e7d');
    centerCircle.setAttribute('class', 'center-circle-hub');
    centerCircle.setAttribute('id', 'pill-rect-balanced');
    centerGroup.appendChild(centerCircle);

    // Center dashed boundary ring
    const centerDashedRing = document.createElementNS(svgNS, 'circle');
    centerDashedRing.setAttribute('cx', '0');
    centerDashedRing.setAttribute('cy', '0');
    centerDashedRing.setAttribute('r', '53');
    centerDashedRing.setAttribute('fill', 'none');
    centerDashedRing.setAttribute('stroke', 'rgba(255,255,255,0.4)');
    centerDashedRing.setAttribute('stroke-dasharray', '3.5 3');
    centerDashedRing.setAttribute('stroke-width', '1');
    centerGroup.appendChild(centerDashedRing);

    // Center texts
    const centerTitle = document.createElementNS(svgNS, 'text');
    centerTitle.setAttribute('x', '0');
    centerTitle.setAttribute('y', '-2');
    centerTitle.setAttribute('text-anchor', 'middle');
    centerTitle.setAttribute('fill', '#ffffff');
    centerTitle.setAttribute('font-size', '13.5');
    centerTitle.setAttribute('font-weight', '700');
    centerTitle.setAttribute('letter-spacing', '0.04em');
    centerTitle.textContent = 'Balanced';
    centerGroup.appendChild(centerTitle);

    const centerSub = document.createElementNS(svgNS, 'text');
    centerSub.setAttribute('x', '0');
    centerSub.setAttribute('y', '15');
    centerSub.setAttribute('text-anchor', 'middle');
    centerSub.setAttribute('fill', 'rgba(255,255,255,0.92)');
    centerSub.setAttribute('font-size', '9.5');
    centerSub.setAttribute('font-weight', '500');
    centerSub.textContent = '黄金平衡';
    centerGroup.appendChild(centerSub);

    this.svg.appendChild(centerGroup);
  }

  selectFlavor(flavorId) {
    const item = BH_FLAVORS.find(f => f.id === flavorId) || BH_FLAVORS[0];
    this.selectedFlavorId = item.id;

    const vector = BH_COMPASS_VECTORS[item.vector] || BH_COMPASS_VECTORS.BALANCED;

    // Update active highlight classes on SVG pills
    const allPills = this.svg.querySelectorAll('.flavor-pill-node');
    allPills.forEach(p => p.classList.remove('active', 'dimmed'));

    const activePill = this.svg.querySelector(`.flavor-pill-node[data-id="${item.id}"]`);
    if (activePill) {
      activePill.classList.add('active');
    }

    const centerHub = this.svg.querySelector('.center-circle-hub');
    if (centerHub) {
      if (item.id === 'balanced') {
        centerHub.classList.add('active-center');
      } else {
        centerHub.classList.remove('active-center');
      }
    }

    // Update Bottom Diagnosis Card
    if (this.dotEl) this.dotEl.style.backgroundColor = vector.color;
    if (this.nameEnEl) this.nameEnEl.textContent = item.nameEn;
    if (this.nameZhEl) this.nameZhEl.textContent = item.nameZh;
    if (this.badgeEl) {
      this.badgeEl.textContent = vector.actionZh;
      this.badgeEl.style.borderColor = vector.color;
      this.badgeEl.style.color = vector.color;
      this.badgeEl.style.backgroundColor = `${vector.color}18`;
    }

    if (this.actionEl) this.actionEl.textContent = vector.summaryZh;
    if (this.descEl) this.descEl.textContent = vector.descZh;

    if (this.grindEl) this.grindEl.textContent = vector.adjustments.grind;
    if (this.timeEl) this.timeEl.textContent = vector.adjustments.time;
    if (this.tempEl) this.tempEl.textContent = vector.adjustments.temp;
    if (this.ratioEl) this.ratioEl.textContent = vector.adjustments.ratio;
  }

  handleSearch(query) {
    if (!query) {
      this.clearFilter();
      return;
    }

    const allPills = this.svg.querySelectorAll('.flavor-pill-node');
    let firstMatchedId = null;

    allPills.forEach(p => {
      const nameEn = p.getAttribute('data-name-en') || '';
      const nameZh = p.getAttribute('data-name-zh') || '';
      const id = p.getAttribute('data-id');

      const matches = nameEn.includes(query) || nameZh.includes(query);
      if (matches) {
        p.classList.remove('dimmed');
        if (!firstMatchedId) firstMatchedId = id;
      } else {
        p.classList.add('dimmed');
      }
    });

    if (firstMatchedId) {
      this.selectFlavor(firstMatchedId);
    }
  }

  clearFilter() {
    const allPills = this.svg.querySelectorAll('.flavor-pill-node');
    allPills.forEach(p => p.classList.remove('dimmed'));
  }
}
