/**
 * Peaceful Heart Coffee - Brewing Calculator & Scheme Engine
 */

export const BrewPresets = {
  v60: {
    id: 'v60',
    name: 'V60 手冲',
    ratio: 16.0,
    dose: 15.0,
    temp: '91-93°C',
    grind: '中细研磨 (650-800μm)',
    scheme: 'classic3',
    notes: '明亮酸质，层次分明'
  },
  kalita: {
    id: 'kalita',
    name: 'Kalita 蛋糕滤杯',
    ratio: 15.5,
    dose: 16.0,
    temp: '90-92°C',
    grind: '中等研磨 (750-850μm)',
    scheme: 'classic3',
    notes: '甜感饱满，萃取均匀'
  },
  aeropress: {
    id: 'aeropress',
    name: '爱乐压 AeroPress',
    ratio: 12.0,
    dose: 16.0,
    temp: '85-88°C',
    grind: '中细偏细 (500-650μm)',
    scheme: 'aeropress',
    notes: '浓郁醇厚，风味纯净'
  },
  frenchpress: {
    id: 'frenchpress',
    name: '法压壶 French Press',
    ratio: 14.0,
    dose: 20.0,
    temp: '92-95°C',
    grind: '粗研磨 (900-1100μm)',
    scheme: 'immersion',
    notes: '油脂丰富，质感厚重'
  },
  coldbrew: {
    id: 'coldbrew',
    name: '冷萃 / 冰滴 Cold Brew',
    ratio: 10.0,
    dose: 30.0,
    temp: '冷水 / 冰块',
    grind: '粗研磨 (1000-1200μm)',
    scheme: 'coldbrew',
    notes: '柔和低酸，焦糖甜感'
  },
  kasuya: {
    id: 'kasuya',
    name: '粕谷哲 4:6 法',
    ratio: 15.0,
    dose: 20.0,
    temp: '92°C',
    grind: '中粗研磨 (850-1000μm)',
    scheme: 'kasuya46',
    notes: '前段定酸甜，后段定浓度'
  },
  espresso: {
    id: 'espresso',
    name: 'Espresso 意式浓缩',
    ratio: 2.0,
    dose: 18.0,
    temp: '93°C',
    grind: '极细研磨 (200-300μm)',
    scheme: 'espresso',
    notes: '极高浓度，丰富 Crema'
  }
};

export class BrewCalculator {
  constructor(options = {}) {
    this.doseInput = document.getElementById(options.doseId || 'inputDose');
    this.waterInput = document.getElementById(options.waterId || 'inputWater');
    this.ratioInput = document.getElementById(options.ratioId || 'inputRatio');
    this.schemeSelect = document.getElementById(options.schemeSelectId || 'selectScheme');
    this.methodDesc = document.getElementById(options.methodDescId || 'methodDesc');
    this.stagesList = document.getElementById(options.stagesListId || 'stagesList');
    
    // Physics output stats
    this.physicsFlow = document.getElementById('physicsFlow');
    this.physicsYield = document.getElementById('physicsYield');
    this.physicsRetention = document.getElementById('physicsRetention');

    this.currentPreset = 'v60';
    this.currentScheme = 'classic3';
    this.recentKeys = ['dose', 'water'];
    this.onUpdateCallback = options.onUpdate || null;

    this.init();
  }

  init() {
    if (!this.doseInput || !this.waterInput || !this.ratioInput) return;

    // Listen to direct inputs
    this.doseInput.addEventListener('input', () => this.recalculate('dose'));
    this.waterInput.addEventListener('input', () => this.recalculate('water'));
    this.ratioInput.addEventListener('input', () => this.recalculate('ratio'));

    // Stepper buttons
    document.querySelectorAll('.btn-step').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = btn.dataset.target;
        const delta = parseFloat(btn.dataset.delta);
        this.step(target, delta);
      });
    });

    // Preset chips
    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const presetId = chip.dataset.preset;
        this.applyPreset(presetId);
      });
    });

    // Scheme select change
    if (this.schemeSelect) {
      this.schemeSelect.addEventListener('change', () => {
        this.currentScheme = this.schemeSelect.value;
        this.updateSchemeDisplay();
        this.updateStages();
      });
      this.updateSchemeDisplay();
    }

    // Initial calculation
    this.recalculate('water');
  }

  updateSchemeDisplay() {
    const schemeMethodName = document.getElementById('schemeMethodName');
    const schemeMethodDesc = document.getElementById('schemeMethodDesc');
    if (!this.schemeSelect) return;
    const selectedOption = this.schemeSelect.options[this.schemeSelect.selectedIndex];
    if (selectedOption) {
      const name = selectedOption.getAttribute('data-name');
      const desc = selectedOption.getAttribute('data-desc');
      if (schemeMethodName && name) schemeMethodName.textContent = name;
      if (schemeMethodDesc && desc) schemeMethodDesc.textContent = desc;
    }
  }

  parse(el) {
    const val = parseFloat(el.value);
    return Number.isFinite(val) ? val : 0;
  }

  format(val, decimals = 1) {
    if (!Number.isFinite(val) || val <= 0) return '';
    return Number(val.toFixed(decimals)).toString();
  }

  remember(key) {
    this.recentKeys = this.recentKeys.filter(k => k !== key);
    this.recentKeys.push(key);
    if (this.recentKeys.length > 2) this.recentKeys.shift();
  }

  step(target, delta) {
    const map = { dose: this.doseInput, water: this.waterInput, ratio: this.ratioInput };
    const el = map[target];
    if (!el) return;

    const cur = this.parse(el);
    const min = parseFloat(el.min) || 1;
    const max = parseFloat(el.max) || 9999;
    const next = Math.min(max, Math.max(min, cur + delta));
    el.value = this.format(next, target === 'water' ? 0 : 1);
    this.recalculate(target);
  }

  applyPreset(presetId) {
    const preset = BrewPresets[presetId];
    if (!preset) return;

    this.currentPreset = presetId;
    this.currentScheme = preset.scheme;

    // Highlight active preset chip
    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.preset === presetId);
    });

    // Update scheme selector if present
    if (this.schemeSelect && this.schemeSelect.querySelector(`option[value="${preset.scheme}"]`)) {
      this.schemeSelect.value = preset.scheme;
      this.updateSchemeDisplay();
    }

    // Set values
    this.doseInput.value = this.format(preset.dose, 1);
    this.ratioInput.value = this.format(preset.ratio, 1);
    this.recentKeys = ['dose', 'ratio'];
    this.recalculate('ratio');

    // Update equipment description
    if (this.methodDesc) {
      this.methodDesc.textContent = `${preset.temp} · ${preset.grind}`;
    }
  }

  recalculate(changed) {
    this.remember(changed);
    const d = this.parse(this.doseInput);
    const w = this.parse(this.waterInput);
    const r = this.parse(this.ratioInput);

    // Identify which 3rd field to solve
    const all = ['dose', 'water', 'ratio'];
    const missing = all.find(k => !this.recentKeys.includes(k));

    if (missing === 'ratio' && d > 0 && w > 0) {
      this.ratioInput.value = this.format(w / d, 1);
    } else if (missing === 'water' && d > 0 && r > 0) {
      this.waterInput.value = this.format(d * r, 0);
    } else if (missing === 'dose' && w > 0 && r > 0) {
      this.doseInput.value = this.format(w / r, 1);
    }

    this.updatePhysics();
    this.updateStages();
  }

  updatePhysics() {
    const dose = this.parse(this.doseInput);
    const water = this.parse(this.waterInput);
    const absorptionRate = 2.0; // standard grounds retention is ~2.0x
    const retained = Math.round(dose * absorptionRate);
    const yieldLiquid = Math.max(0, Math.round(water - retained));

    if (this.physicsYield) this.physicsYield.textContent = `${yieldLiquid} g`;
    if (this.physicsRetention) this.physicsRetention.textContent = `${retained} g`;
    if (this.physicsFlow) {
      // Estimated flow rate for pour-over target time (~150s)
      const flow = (water / 150).toFixed(2);
      this.physicsFlow.textContent = `${flow} g/s`;
    }
  }

  getStages() {
    const totalWater = this.parse(this.waterInput) || 240;
    const dose = this.parse(this.doseInput) || 15;

    if (this.currentScheme === 'kasuya46') {
      // 4:6 Method: 5 equal pours of totalWater / 5
      const p = Math.round(totalWater / 5);
      return [
        { time: 0, timeLabel: '0:00', name: '第 1 段 (酸质定型)', target: p, note: '注水至 ' + p + 'g' },
        { time: 45, timeLabel: '0:45', name: '第 2 段 (甜感平衡)', target: p * 2, note: '注水至 ' + (p * 2) + 'g' },
        { time: 90, timeLabel: '1:30', name: '第 3 段 (浓度萃取 1)', target: p * 3, note: '注水至 ' + (p * 3) + 'g' },
        { time: 135, timeLabel: '2:15', name: '第 4 段 (浓度萃取 2)', target: p * 4, note: '注水至 ' + (p * 4) + 'g' },
        { time: 180, timeLabel: '3:00', name: '第 5 段 (尾段定型)', target: totalWater, note: '注水至 ' + totalWater + 'g' },
        { time: 215, timeLabel: '3:35', name: '滴滤结束', target: totalWater, note: '移开滤杯' }
      ];
    } else if (this.currentScheme === 'aeropress') {
      return [
        { time: 0, timeLabel: '0:00', name: '注水与搅拌', target: totalWater, note: '注水至 ' + totalWater + 'g 并搅拌 10 秒' },
        { time: 45, timeLabel: '0:45', name: '浸泡萃取', target: totalWater, note: '压杆归位，静置' },
        { time: 75, timeLabel: '1:15', name: '缓慢下压', target: totalWater, note: '匀速下压 30 秒至嘶嘶声' },
        { time: 105, timeLabel: '1:45', name: '萃取完成', target: totalWater, note: '即可享用' }
      ];
    } else if (this.currentScheme === 'immersion') {
      return [
        { time: 0, timeLabel: '0:00', name: '注水', target: totalWater, note: '注入全部热水 ' + totalWater + 'g' },
        { time: 60, timeLabel: '1:00', name: '破渣搅拌', target: totalWater, note: '轻轻搅拌表层咖啡浮渣' },
        { time: 240, timeLabel: '4:00', name: '下压滤网', target: totalWater, note: '慢速下压至底部' }
      ];
    } else {
      // Classic 3-Stage: 20% Bloom, 60% Body, 100% Finish
      const bloom = Math.round(totalWater * 0.20);
      const stage1 = Math.round(totalWater * 0.60);
      return [
        { time: 0, timeLabel: '0:00', name: '闷蒸阶段 (Bloom)', target: bloom, note: '注水至 ' + bloom + 'g' },
        { time: 30, timeLabel: '0:30', name: '第一段注水 (Body)', target: stage1, note: '注水至 ' + stage1 + 'g' },
        { time: 75, timeLabel: '1:15', name: '第二段注水 (Finish)', target: totalWater, note: '注水至 ' + totalWater + 'g' },
        { time: 120, timeLabel: '2:00', name: '等待滴滤完成', target: totalWater, note: '预计 2:15-2:30 滴滤完成' }
      ];
    }
  }

  updateStages() {
    const stages = this.getStages();
    if (this.stagesList) {
      this.stagesList.innerHTML = stages.map((s, idx) => `
        <li class="stage-item" data-index="${idx}" data-time="${s.time}">
          <span class="stage-time">${s.timeLabel}</span>
          <span class="stage-name">${s.name}</span>
          <span class="stage-target">${s.note}</span>
        </li>
      `).join('');
    }

    if (this.onUpdateCallback) {
      this.onUpdateCallback(stages);
    }
  }
}
