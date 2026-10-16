/**
 * Mindful Drip - Barista Hustle Coffee Compass Module
 * Faithfully recreating Matt Perger's iconic Coffee Compass with:
 * 1. Interactive rotatable dial (touch & mouse drag rotation with momentum)
 * 2. Mobile half-wheel responsive mode (shifts center to right for maximum readability)
 * 3. Bilingual Chinese localization directly on every pill
 * 4. Focal indicator & instant diagnosis card
 */

export const BH_COMPASS_VECTORS = {
  UNDER_EXTRACTED: {
    id: 'under_extracted',
    nameEn: 'Under Extracted',
    nameZh: '萃取不足 · 欠萃 (Extract More)',
    actionEn: 'Extract More',
    actionZh: '增加萃取 · 激发成熟甜感',
    summaryZh: '调细研磨度 1~2 格 / 提高冲煮水温 1~2°C / 延长萃取耗时',
    descZh: '咖啡展现出生硬生酸、草本生青或涩咸，成熟果糖未及充分释放。水流穿透偏快，未能充分萃出咖啡豆中后段高沸点的成熟糖分与芳香物质。',
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
    nameZh: '过度萃取 · 过萃 (Extract Less)',
    actionEn: 'Extract Less',
    actionZh: '减少萃取 · 规避焦苦杂涩',
    summaryZh: '调粗研磨度 1~2 格 / 降低冲煮水温 1~2°C / 缩短冲煮耗时',
    descZh: '两颊与舌面明显紧缩干涩、苦涩滞喉。由于研磨过细、水温过高或浸润过久，深层难溶性苦多酚、焦木质素被过量溶出，掩盖了优质风味。',
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
    nameZh: '浓度过高 · 过浓 (More Water)',
    actionEn: 'More Water / Less Coffee',
    actionZh: '降低浓度 · 舒展风味层次',
    summaryZh: '放大粉水比 (如 1:15 调至 1:16) / 保持当前研磨不变',
    descZh: '口感滞重、浓浊压舌、风味拥挤发闷，但酸甜苦基本平衡。总溶解固体 (TDS) 偏高，只需增加注水量或减少 1~2g 咖啡粉即可让风味清晰展开。',
    color: '#ea580c',
    adjustments: {
      grind: '保持不变',
      time: '保持不变',
      temp: '保持不变',
      ratio: '增加水量或减少粉量'
    }
  },
  WEAK: {
    id: 'weak',
    nameEn: 'Weak',
    nameZh: '浓度不足 · 水淡 (Less Water)',
    actionEn: 'Less Water / More Coffee',
    actionZh: '提高浓度 · 充实体态骨架',
    summaryZh: '缩小粉水比 (如 1:16 调至 1:15) / 增加 1~2g 咖啡粉',
    descZh: '水感明显、体态单薄稀疏、淡薄如茶。萃取率虽可能达标，但杯中总溶解固体 (TDS) 过低，需减少总水量或增加咖啡粉量以支撑醇厚度。',
    color: '#7c3aed',
    adjustments: {
      grind: '保持或微细半格',
      time: '保持不变',
      temp: '保持不变',
      ratio: '减少水量或增加粉量'
    }
  },
  BALANCED: {
    id: 'balanced',
    nameEn: 'Balanced',
    nameZh: '黄金平衡 (Sweet Spot)',
    actionEn: 'Sweet Spot Nailed!',
    actionZh: '完美平衡 · 尽情享用当杯冲煮',
    summaryZh: '保持当前所有研磨与冲煮参数不变',
    descZh: '恭喜！多汁圆融的优质酸质、清甜甘冽的成熟糖感与温润顺滑的触感完美契合，已达手冲咖啡的黄金风味平衡带！请记录当前参数并享用。',
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
  { id: 'strong', nameEn: 'Strong', nameZh: '浓郁', vector: 'STRONG', ring: 'inner', angle: 0 },
  { id: 'heavy', nameEn: 'Heavy', nameZh: '厚重', vector: 'STRONG', ring: 'inner', angle: 17 },
  { id: 'hefty', nameEn: 'Hefty', nameZh: '沉实', vector: 'STRONG', ring: 'inner', angle: 34 },
  { id: 'robust', nameEn: 'Robust', nameZh: '醇厚', vector: 'STRONG', ring: 'inner', angle: 51 },
  { id: 'thick', nameEn: 'Thick', nameZh: '稠润', vector: 'STRONG', ring: 'inner', angle: 68 },
  { id: 'rich', nameEn: 'Rich', nameZh: '馥郁', vector: 'BALANCED', ring: 'inner', angle: 85 },
  { id: 'luscious', nameEn: 'Luscious', nameZh: '甜润', vector: 'BALANCED', ring: 'inner', angle: 102 },
  { id: 'sweet', nameEn: 'Sweet', nameZh: '清甜', vector: 'BALANCED', ring: 'inner', angle: 119 },
  { id: 'pleasing', nameEn: 'Pleasing', nameZh: '怡人', vector: 'BALANCED', ring: 'inner', angle: 136 },
  { id: 'aromatic', nameEn: 'Aromatic', nameZh: '芬芳', vector: 'BALANCED', ring: 'inner', angle: 153 },
  { id: 'delicate', nameEn: 'Delicate', nameZh: '轻灵', vector: 'WEAK', ring: 'inner', angle: 170 },
  { id: 'gentle', nameEn: 'Gentle', nameZh: '温润', vector: 'WEAK', ring: 'inner', angle: 187 },
  { id: 'thin', nameEn: 'Thin', nameZh: '轻薄', vector: 'WEAK', ring: 'inner', angle: 204 },
  { id: 'transparent', nameEn: 'Transparent', nameZh: '澄澈', vector: 'BALANCED', ring: 'inner', angle: 221 },
  { id: 'soft', nameEn: 'Soft', nameZh: '柔顺', vector: 'BALANCED', ring: 'inner', angle: 238 },
  { id: 'slender', nameEn: 'Slender', nameZh: '纤巧', vector: 'WEAK', ring: 'inner', angle: 255 },
  { id: 'nuanced', nameEn: 'Nuanced', nameZh: '层次细腻', vector: 'BALANCED', ring: 'inner', angle: 272 },
  { id: 'buttery', nameEn: 'Buttery', nameZh: '奶油脂感', vector: 'BALANCED', ring: 'inner', angle: 289 },
  { id: 'substantial', nameEn: 'Substantial', nameZh: '醇厚扎实', vector: 'BALANCED', ring: 'inner', angle: 306 },
  { id: 'plump', nameEn: 'Plump', nameZh: '圆润饱满', vector: 'BALANCED', ring: 'inner', angle: 323 },
  { id: 'sticky', nameEn: 'Sticky', nameZh: '胶质稠感', vector: 'BALANCED', ring: 'inner', angle: 340 },
  { id: 'big', nameEn: 'Big', nameZh: '宏厚', vector: 'STRONG', ring: 'inner', angle: 354 },

  // Outer Ring (Dusty Rose #b87a87): Clean spacing with zero overlap
  // Strong & Over-Concentrated (Top: 6° to 48°)
  { id: 'harsh', nameEn: 'Harsh', nameZh: '粗糙毛刺', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 6 },
  { id: 'overwhelming', nameEn: 'Overwhelming', nameZh: '浓重压舌', vector: 'STRONG', ring: 'outer', angle: 20 },
  { id: 'severe', nameEn: 'Severe', nameZh: '焦苦猛烈', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 34 },
  { id: 'intense', nameEn: 'Intense', nameZh: '燥烈刺喉', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 48 },

  // Over-Extracted side (Right: 64° to 138°)
  { id: 'dry', nameEn: 'Dry', nameZh: '舌面燥干', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 64 },
  { id: 'bitter', nameEn: 'Bitter', nameZh: '焦苦杂味', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 80 },
  { id: 'powdery', nameEn: 'Powdery', nameZh: '粉质沙感', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 96 },
  { id: 'empty', nameEn: 'Empty', nameZh: '中段空乏', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 110 },
  { id: 'dusty', nameEn: 'Dusty', nameZh: '尘土枯燥', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 124 },
  { id: 'astringent', nameEn: 'Astringent', nameZh: '紧缩干涩', vector: 'OVER_EXTRACTED', ring: 'outer', angle: 138 },

  // Weak / Watery side (Bottom: 150° to 238°)
  { id: 'scrawny', nameEn: 'Scrawny', nameZh: '干瘪瘦弱', vector: 'WEAK', ring: 'outer', angle: 150 },
  { id: 'limp', nameEn: 'Limp', nameZh: '软塌无神', vector: 'WEAK', ring: 'outer', angle: 158 },
  { id: 'dilute', nameEn: 'Dilute', nameZh: '水感稀释', vector: 'WEAK', ring: 'outer', angle: 166 },
  { id: 'fragile', nameEn: 'Fragile', nameZh: '脆弱松散', vector: 'WEAK', ring: 'outer', angle: 174 },
  { id: 'muted', nameEn: 'Muted', nameZh: '风味暗哑', vector: 'WEAK', ring: 'outer', angle: 182 },
  { id: 'faint', nameEn: 'Faint', nameZh: '微弱游离', vector: 'WEAK', ring: 'outer', angle: 190 },
  { id: 'sparse', nameEn: 'Sparse', nameZh: '稀疏空泛', vector: 'WEAK', ring: 'outer', angle: 198 },
  { id: 'tea_like', nameEn: 'Tea-Like', nameZh: '淡薄如茶', vector: 'WEAK', ring: 'outer', angle: 206 },
  { id: 'flimsy', nameEn: 'Flimsy', nameZh: '薄若水感', vector: 'WEAK', ring: 'outer', angle: 214 },
  { id: 'insipid', nameEn: 'Insipid', nameZh: '索然无味', vector: 'WEAK', ring: 'outer', angle: 222 },
  { id: 'watery', nameEn: 'Watery', nameZh: '水汽寡淡', vector: 'WEAK', ring: 'outer', angle: 230 },
  { id: 'bland', nameEn: 'Bland', nameZh: '清汤寡水', vector: 'WEAK', ring: 'outer', angle: 238 },

  // Under-Extracted side (Left: 254° to 310°)
  { id: 'vegetal', nameEn: 'Vegetal', nameZh: '草本生青', vector: 'UNDER_EXTRACTED', ring: 'outer', angle: 254 },
  { id: 'sour', nameEn: 'Sour', nameZh: '生硬尖酸', vector: 'UNDER_EXTRACTED', ring: 'outer', angle: 268 },
  { id: 'salty', nameEn: 'Salty', nameZh: '咸鲜无甘', vector: 'UNDER_EXTRACTED', ring: 'outer', angle: 282 },
  { id: 'quick_finish', nameEn: 'Quick Finish', nameZh: '余韵短促', vector: 'UNDER_EXTRACTED', ring: 'outer', angle: 296 },
  { id: 'dull', nameEn: 'Dull', nameZh: '平钝呆滞', vector: 'UNDER_EXTRACTED', ring: 'outer', angle: 310 },

  // Strong / Top-Left: 324° to 352°
  { id: 'savoury', nameEn: 'Savoury', nameZh: '咸鲜发腻', vector: 'STRONG', ring: 'outer', angle: 324 },
  { id: 'bulky', nameEn: 'Bulky', nameZh: '粗重笨拙', vector: 'STRONG', ring: 'outer', angle: 338 },
  { id: 'soupy', nameEn: 'Soupy', nameZh: '浑浊厚杂', vector: 'STRONG', ring: 'outer', angle: 352 }
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

    // Dial rotation state
    this.currentRotation = 0;
    this.velocity = 0;
    this.animFrameId = null;
    this.isDragging = false;
    this.hasMoved = false;

    this.init();
  }

  init() {
    if (!this.modal || !this.svg) return;

    // Render Wheel SVG
    this.renderWheel();

    // Setup interactive touch / drag rotation
    this.setupRotationEvents();

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
          this.rotateToPill(flavorId);
        }
      });
    }

    // Select initial flavor (rotate to 'sour')
    this.rotateToPill('sour', false);
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

    // 1. Defs & Filters
    const defs = document.createElementNS(svgNS, 'defs');
    defs.innerHTML = `
      <filter id="activeGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="pointerGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="4.5" flood-color="#f59e0b" flood-opacity="0.9"/>
      </filter>
    `;
    this.svg.appendChild(defs);

    // 2. Rotatable Wheel Container Group (Rotates smoothly when dragged or dialed)
    const rotatingGroup = document.createElementNS(svgNS, 'g');
    rotatingGroup.setAttribute('id', 'rotatingWheelGroup');
    rotatingGroup.setAttribute('class', 'rotating-wheel-group');

    // Outer Dial Track & Ticks (Semi-wheel Dial outer track)
    const trackGroup = document.createElementNS(svgNS, 'g');
    trackGroup.setAttribute('class', 'compass-track-layer');

    // Outer circle ring (radius 330)
    const outerRing = document.createElementNS(svgNS, 'circle');
    outerRing.setAttribute('cx', '0');
    outerRing.setAttribute('cy', '0');
    outerRing.setAttribute('r', '330');
    outerRing.setAttribute('fill', 'none');
    outerRing.setAttribute('stroke', 'currentColor');
    outerRing.setAttribute('stroke-opacity', '0.25');
    outerRing.setAttribute('stroke-width', '1.5');
    trackGroup.appendChild(outerRing);

    // Ticks around 360 degrees
    for (let deg = 0; deg < 360; deg += 4) {
      const isMajor = deg % 40 === 0;
      const isSemiMajor = deg % 20 === 0;
      const tickLen = isMajor ? 12 : (isSemiMajor ? 8 : 4.5);
      const rad = (deg - 90) * (Math.PI / 180);
      const x1 = Math.cos(rad) * 330;
      const y1 = Math.sin(rad) * 330;
      const x2 = Math.cos(rad) * (330 - tickLen);
      const y2 = Math.sin(rad) * (330 - tickLen);

      const tick = document.createElementNS(svgNS, 'line');
      tick.setAttribute('x1', x1.toFixed(1));
      tick.setAttribute('y1', y1.toFixed(1));
      tick.setAttribute('x2', x2.toFixed(1));
      tick.setAttribute('y2', y2.toFixed(1));
      tick.setAttribute('stroke', 'currentColor');
      tick.setAttribute('stroke-opacity', isMajor ? '0.75' : '0.35');
      tick.setAttribute('stroke-width', isMajor ? '2' : '1.2');
      trackGroup.appendChild(tick);
    }

    rotatingGroup.appendChild(trackGroup);

    // 3. Radial Flavor Pills Layer (Enlarged pills with large, readable fonts)
    const pillsGroup = document.createElementNS(svgNS, 'g');
    pillsGroup.setAttribute('class', 'compass-pills-layer');
    pillsGroup.setAttribute('id', 'pillsGroup');

    BH_FLAVORS.forEach(item => {
      if (item.ring === 'center') return;

      const isInner = item.ring === 'inner';
      const rInner = isInner ? 92 : 212;
      const rOuter = isInner ? 202 : 322;
      const pillWidth = isInner ? 28 : 31;
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
      rect.setAttribute('rx', isInner ? '6' : '6.5');
      rect.setAttribute('ry', isInner ? '6' : '6.5');
      rect.setAttribute('fill', pillColor);
      rect.setAttribute('class', 'flavor-pill-rect');
      rect.setAttribute('id', `pill-rect-${item.id}`);

      // Bilingual text along the pill length
      const midY = -((rInner + rOuter) / 2);
      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', '0');
      text.setAttribute('y', midY.toFixed(1));
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'central');
      text.setAttribute('class', 'flavor-pill-text');

      // Visible semicircle is the West hemisphere (175° to 360°/0°):
      // rotate(90) makes baseline left-to-right (baseGlobalX > 0) and head pointing up (headGlobalY < 0)!
      const isWest = (item.angle >= 175 && item.angle <= 360) || item.angle <= 5;
      const rotateDeg = isWest ? 90 : -90;
      text.setAttribute('transform', `rotate(${rotateDeg}, 0, ${midY.toFixed(1)})`);

      text.innerHTML = `
        <tspan font-weight="700" fill="#ffffff" font-size="${isInner ? '11.8' : '12.2'}">${item.nameEn}</tspan>
        <tspan font-weight="600" fill="rgba(255,255,255,0.92)" font-size="${isInner ? '10.2' : '10.6'}" dx="4">${item.nameZh}</tspan>
      `;

      item.textEl = text;
      item.midY = midY.toFixed(1);
      item.currentTextRot = rotateDeg;

      g.appendChild(rect);
      g.appendChild(text);

      // Click handling: rotates smoothly to focal pointer & selects
      g.addEventListener('click', (e) => {
        if (this.hasMoved) return; // Prevent triggering if it was a drag gesture
        e.stopPropagation();
        this.rotateToPill(item.id);
      });

      pillsGroup.appendChild(g);
    });

    rotatingGroup.appendChild(pillsGroup);
    this.svg.appendChild(rotatingGroup);

    // 4. Center Disc: Balanced Bullseye Hub (Static on right, texts always level and upright)
    const centerGroup = document.createElementNS(svgNS, 'g');
    centerGroup.setAttribute('class', 'compass-center-hub');
    centerGroup.style.cursor = 'pointer';
    centerGroup.addEventListener('click', (e) => {
      if (this.hasMoved) return;
      e.stopPropagation();
      this.selectFlavor('balanced');
    });

    // Center disc circle (radius 82)
    const centerCircle = document.createElementNS(svgNS, 'circle');
    centerCircle.setAttribute('cx', '0');
    centerCircle.setAttribute('cy', '0');
    centerCircle.setAttribute('r', '82');
    centerCircle.setAttribute('fill', '#567e6c');
    centerCircle.setAttribute('class', 'center-circle-hub');
    centerCircle.setAttribute('id', 'pill-rect-balanced');
    centerGroup.appendChild(centerCircle);

    // Center dashed boundary ring
    const centerDashedRing = document.createElementNS(svgNS, 'circle');
    centerDashedRing.setAttribute('cx', '0');
    centerDashedRing.setAttribute('cy', '0');
    centerDashedRing.setAttribute('r', '74');
    centerDashedRing.setAttribute('fill', 'none');
    centerDashedRing.setAttribute('stroke', 'rgba(255,255,255,0.45)');
    centerDashedRing.setAttribute('stroke-dasharray', '4 3.5');
    centerDashedRing.setAttribute('stroke-width', '1.5');
    centerGroup.appendChild(centerDashedRing);

    // Center texts (Positioned on the visible left half of the center hub)
    const centerTitle = document.createElementNS(svgNS, 'text');
    centerTitle.setAttribute('x', '-25');
    centerTitle.setAttribute('y', '-6');
    centerTitle.setAttribute('text-anchor', 'middle');
    centerTitle.setAttribute('fill', '#ffffff');
    centerTitle.setAttribute('font-size', '14');
    centerTitle.setAttribute('font-weight', '700');
    centerTitle.setAttribute('letter-spacing', '0.04em');
    centerTitle.textContent = 'Balanced';
    centerGroup.appendChild(centerTitle);

    const centerSub = document.createElementNS(svgNS, 'text');
    centerSub.setAttribute('x', '-25');
    centerSub.setAttribute('y', '15');
    centerSub.setAttribute('text-anchor', 'middle');
    centerSub.setAttribute('fill', 'rgba(255,255,255,0.95)');
    centerSub.setAttribute('font-size', '11');
    centerSub.setAttribute('font-weight', '600');
    centerSub.textContent = '黄金平衡';
    centerGroup.appendChild(centerSub);

    this.svg.appendChild(centerGroup);

    // 5. Fixed Indicator Pointer (Fixed at West 270° focal point)
    const fixedIndicator = document.createElementNS(svgNS, 'g');
    fixedIndicator.setAttribute('class', 'fixed-compass-pointer');
    fixedIndicator.setAttribute('id', 'fixedCompassPointer');
    fixedIndicator.innerHTML = `
      <!-- Pointer line & arrow pointing East towards center (0,0) -->
      <line x1="-362" y1="0" x2="-332" y2="0" stroke="var(--amber-gold)" stroke-width="3" stroke-linecap="round" filter="url(#pointerGlow)" />
      <polygon points="-334,-9 -334,9 -318,0" fill="var(--amber-gold)" filter="url(#pointerGlow)" />
      <circle cx="-334" cy="0" r="3" fill="#ffffff" />
      <text x="-345" y="-14" fill="var(--amber-gold)" font-size="9.5" font-weight="700" text-anchor="middle" letter-spacing="0.05em">当前对齐</text>
    `;
    this.svg.appendChild(fixedIndicator);
  }

  setupRotationEvents() {
    let isPointerDown = false;
    let lastAngle = 0;
    let pointerId = null;

    // Accurate pivot coordinate calculation:
    // viewBox is "-365 -195 390 390".
    // (0, 0) in SVG coordinate maps to:
    // x = (0 - (-365)) / 390 = 365 / 390 of the rendered element width
    // y = (0 - (-195)) / 390 = 195 / 390 = 0.5 of the rendered element height
    const getAngleFromEvent = (e) => {
      const rect = this.svg.getBoundingClientRect();
      const cx = rect.left + rect.width * (365 / 390);
      const cy = rect.top + rect.height * 0.5;
      return Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    };

    // 1. Pointer (Touch & Mouse Drag) Events
    this.svg.addEventListener('pointerdown', (e) => {
      isPointerDown = true;
      this.hasMoved = false;
      this.totalDragDistance = 0;
      pointerId = e.pointerId;
      try { this.svg.setPointerCapture(e.pointerId); } catch (_) {}

      lastAngle = getAngleFromEvent(e);
      this.velocity = 0;
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    });

    this.svg.addEventListener('pointermove', (e) => {
      if (!isPointerDown) return;
      const currAngle = getAngleFromEvent(e);
      let stepDiff = currAngle - lastAngle;
      while (stepDiff > 180) stepDiff -= 360;
      while (stepDiff < -180) stepDiff += 360;

      this.totalDragDistance += Math.abs(stepDiff);
      if (this.totalDragDistance > 2.5) this.hasMoved = true;

      this.velocity = stepDiff;
      lastAngle = currAngle;

      this.currentRotation += stepDiff;
      this.setWheelRotation(this.currentRotation, false);

      // Realtime diagnosis update as user dials
      this.updateClosestPill(false);
    });

    const onPointerUp = () => {
      if (!isPointerDown) return;
      isPointerDown = false;
      try { this.svg.releasePointerCapture(pointerId); } catch (_) {}

      if (this.hasMoved && Math.abs(this.velocity) > 0.3) {
        // Momentum flick
        const stepInertia = () => {
          this.velocity *= 0.92;
          this.currentRotation += this.velocity;
          this.setWheelRotation(this.currentRotation, false);
          this.updateClosestPill(false);
          if (Math.abs(this.velocity) > 0.08) {
            this.animFrameId = requestAnimationFrame(stepInertia);
          } else {
            this.updateClosestPill(true);
            this.snapToClosest();
          }
        };
        this.animFrameId = requestAnimationFrame(stepInertia);
      } else if (this.hasMoved) {
        this.updateClosestPill(true);
        this.snapToClosest();
      }
    };

    this.svg.addEventListener('pointerup', onPointerUp);
    this.svg.addEventListener('pointercancel', onPointerUp);

    // 2. Mouse Wheel Event on Dial Container (Smooth wheel rotation for desktop!)
    const wheelContainer = this.svg.parentElement || this.svg;
    let wheelDebounceTimer = null;
    wheelContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      // Step rotation
      const rotationStep = delta > 0 ? 5.5 : -5.5;
      this.currentRotation += rotationStep;
      this.setWheelRotation(this.currentRotation, false);
      this.updateClosestPill(false);

      if (wheelDebounceTimer) clearTimeout(wheelDebounceTimer);
      wheelDebounceTimer = setTimeout(() => {
        this.updateClosestPill(true);
        this.snapToClosest();
      }, 160);
    }, { passive: false });
  }

  setWheelRotation(deg, animate = false) {
    this.currentRotation = deg;
    const rotatingGroup = document.getElementById('rotatingWheelGroup');
    if (rotatingGroup) {
      if (animate) {
        rotatingGroup.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
      } else {
        rotatingGroup.style.transition = 'none';
      }
      rotatingGroup.setAttribute('transform', `rotate(${deg})`);
    }
    this.updateTextOrientations(deg);
  }

  updateTextOrientations(currentRotation) {
    BH_FLAVORS.forEach(item => {
      if (item.ring === 'center' || !item.textEl) return;
      let screenAngle = (item.angle + currentRotation) % 360;
      if (screenAngle < 0) screenAngle += 360;

      // Upright text orientation rule:
      // In the visible West semicircle (175° to 360°/0°):
      // rotate(90) makes baseline left-to-right (baseGlobalX > 0) and head pointing up (headGlobalY < 0)!
      // In the hidden East semicircle (5° to 175°): rotate(-90)
      const isWest = (screenAngle >= 175 && screenAngle <= 360) || screenAngle <= 5;
      const targetRot = isWest ? 90 : -90;
      if (item.currentTextRot !== targetRot) {
        item.currentTextRot = targetRot;
        item.textEl.setAttribute('transform', `rotate(${targetRot}, 0, ${item.midY})`);
      }
    });
  }

  rotateToPill(flavorId, animate = true) {
    const item = BH_FLAVORS.find(f => f.id === flavorId) || BH_FLAVORS[0];
    if (item.ring === 'center') {
      this.selectFlavor('balanced');
      return;
    }

    // Focal point is 270° (West - left edge on both mobile half-mode and desktop)
    const targetDeg = 270 - item.angle;
    let diff = (targetDeg - this.currentRotation) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    const newRotation = this.currentRotation + diff;
    this.setWheelRotation(newRotation, animate);
    this.selectFlavor(item.id);
  }

  snapToClosest() {
    let focusAngle = (270 - this.currentRotation) % 360;
    if (focusAngle < 0) focusAngle += 360;

    let closestItem = null;
    let minDiff = Infinity;

    BH_FLAVORS.forEach(item => {
      if (item.ring === 'center') return;
      let diff = Math.abs(item.angle - focusAngle);
      if (diff > 180) diff = 360 - diff;
      if (diff < minDiff) {
        minDiff = diff;
        closestItem = item;
      }
    });

    if (closestItem) {
      this.rotateToPill(closestItem.id, true);
    }
  }

  updateClosestPill(commit = true) {
    // Focal target angle is 270° (West)
    let focusAngle = (270 - this.currentRotation) % 360;
    if (focusAngle < 0) focusAngle += 360;

    let closestItem = null;
    let minDiff = Infinity;

    BH_FLAVORS.forEach(item => {
      if (item.ring === 'center') return;
      let diff = Math.abs(item.angle - focusAngle);
      if (diff > 180) diff = 360 - diff;
      if (diff < minDiff) {
        minDiff = diff;
        closestItem = item;
      }
    });

    if (closestItem) {
      if (commit || closestItem.id !== this.selectedFlavorId) {
        this.selectFlavor(closestItem.id);
      } else {
        this.previewFlavor(closestItem.id);
      }
    }
  }

  previewFlavor(flavorId) {
    const allPills = this.svg.querySelectorAll('.flavor-pill-node');
    allPills.forEach(p => p.classList.remove('active'));
    const activePill = this.svg.querySelector(`.flavor-pill-node[data-id="${flavorId}"]`);
    if (activePill) activePill.classList.add('active');
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
      this.rotateToPill(firstMatchedId);
    }
  }

  clearFilter() {
    const allPills = this.svg.querySelectorAll('.flavor-pill-node');
    allPills.forEach(p => p.classList.remove('dimmed'));
  }
}
