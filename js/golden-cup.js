/**
 * Peaceful Heart Coffee - SCA Golden Cup Control Chart & Flavor Engine
 */

export class GoldenCupCalculator {
  constructor(options = {}) {
    this.tdsInput = document.getElementById(options.tdsId || 'goldTds');
    this.doseInput = document.getElementById(options.doseId || 'goldDose');
    this.waterInput = document.getElementById(options.waterId || 'goldWater');
    this.liquidInput = document.getElementById(options.liquidId || 'goldLiquid');

    this.extResult = document.getElementById('extResult');
    this.ratioResult = document.getElementById('ratioResult');
    this.verdictTitle = document.getElementById('verdictTitle');
    this.verdictTarget = document.getElementById('verdictTarget');
    this.diagnosisNote = document.getElementById('diagnosisNote');
    this.cursorDot = document.getElementById('scaCursorDot');

    this.method = 'filter';
    this.init();
  }

  init() {
    if (!this.tdsInput || !this.doseInput || !this.waterInput || !this.liquidInput) return;

    // Method buttons
    document.querySelectorAll('.gold-method-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gold-method-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.method = btn.dataset.method;
        this.onMethodChange();
      });
    });

    // Listen to changes
    [this.tdsInput, this.doseInput, this.waterInput, this.liquidInput].forEach(el => {
      el.addEventListener('input', () => this.calculate());
    });

    this.calculate();
  }

  onMethodChange() {
    if (this.method === 'espresso') {
      if (parseFloat(this.tdsInput.value) < 5) this.tdsInput.value = '9.5';
      const dose = parseFloat(this.doseInput.value) || 18;
      this.waterInput.value = (dose * 2).toFixed(0);
      this.liquidInput.value = (dose * 2).toFixed(0);
    } else {
      if (parseFloat(this.tdsInput.value) > 5) this.tdsInput.value = '1.35';
      const dose = parseFloat(this.doseInput.value) || 15;
      const targetWater = dose * 16;
      this.waterInput.value = targetWater.toFixed(0);
      this.liquidInput.value = (targetWater - dose * 2).toFixed(0);
    }
    this.calculate();
  }

  calculate() {
    const tds = parseFloat(this.tdsInput.value) || 0;
    const dose = parseFloat(this.doseInput.value) || 0;
    const water = parseFloat(this.waterInput.value) || 0;
    const liquid = parseFloat(this.liquidInput.value) || 0;

    if (tds <= 0 || dose <= 0 || liquid <= 0) {
      if (this.extResult) this.extResult.innerHTML = '—<small>%</small>';
      if (this.ratioResult) this.ratioResult.textContent = '—';
      if (this.verdictTitle) this.verdictTitle.textContent = '等待输入完整数据';
      if (this.diagnosisNote) this.diagnosisNote.textContent = '请输入有效的浓度、粉重与萃取液重。';
      return;
    }

    // Extraction Yield formula: EXT% = (TDS% * LiquidYield) / Dose
    const ext = (tds * liquid) / dose;
    const ratio = water > 0 ? (water / dose) : 0;

    // Display values
    if (this.extResult) this.extResult.innerHTML = `${ext.toFixed(1)}<small>%</small>`;
    if (this.ratioResult) this.ratioResult.textContent = `1:${ratio.toFixed(1)}`;

    // Define target brackets based on method
    let tdsLow = 1.15;
    let tdsHigh = 1.35;
    let extLow = 18.0;
    let extHigh = 22.0;

    if (this.method === 'espresso') {
      tdsLow = 8.0;
      tdsHigh = 12.0;
    } else if (this.method === 'immersion') {
      tdsLow = 1.20;
      tdsHigh = 1.45;
    }

    if (this.verdictTarget) {
      this.verdictTarget.innerHTML = `目标 EXT: ${extLow}–${extHigh}%<br>目标 TDS: ${tdsLow.toFixed(this.method === 'espresso' ? 1 : 2)}–${tdsHigh.toFixed(this.method === 'espresso' ? 1 : 2)}%`;
    }

    // Cursor position calculation (14% - 26% maps to 0% - 100% on the rail)
    const normalized = Math.max(2, Math.min(98, ((ext - 14) / 12) * 100));
    if (this.cursorDot) {
      this.cursorDot.style.setProperty('--position', `${normalized}%`);
    }

    // Diagnostic logic
    const extState = ext < extLow ? 'under' : (ext > extHigh ? 'over' : 'ok');
    const tdsState = tds < tdsLow ? 'weak' : (tds > tdsHigh ? 'strong' : 'ok');

    if (this.verdictTitle) {
      this.verdictTitle.classList.remove('warning');
    }

    if (extState === 'ok' && tdsState === 'ok') {
      if (this.verdictTitle) {
        this.verdictTitle.textContent = '🎯 完美落在 SCA 黄金杯核心区间';
      }
      if (this.diagnosisNote) {
        this.diagnosisNote.textContent = '风味极其均衡！甜感、酸质与醇厚度达到黄金平衡点，杂味与干涩感极低。';
      }
    } else {
      if (this.verdictTitle) {
        this.verdictTitle.classList.add('warning');
      }

      const titleMap = {
        'under-weak': '偏淡 · 萃取不足 (Under & Weak)',
        'under-ok': '风味偏酸 · 萃取不足 (Under-extracted)',
        'under-strong': '浓烈尖锐 · 萃取不足 (Under & Strong)',
        'ok-weak': '浓度偏淡 · 萃取率均衡 (Weak Cup)',
        'ok-strong': '浓度偏高 · 萃取率均衡 (Strong Cup)',
        'over-weak': '水感杂苦 · 过度萃取 (Over & Weak)',
        'over-ok': '干涩发苦 · 过度萃取 (Over-extracted)',
        'over-strong': '极浓焦苦 · 过度萃取 (Over & Strong)'
      };

      const key = `${extState}-${tdsState}`;
      if (this.verdictTitle) {
        this.verdictTitle.textContent = titleMap[key] || '落点待调整';
      }

      // Barista adjustment advice
      const advice = [];
      if (extState === 'under') {
        advice.push('⚙️ 萃取率低于 18%：可调细研磨度（增加接触面积）、提高水温 1-2°C 或放慢注水速度');
      } else if (extState === 'over') {
        advice.push('⚙️ 萃取率高于 22%：可调粗研磨度、降低水温 1-2°C 或加快注水缩短接触时间');
      }

      if (tdsState === 'weak') {
        advice.push('💧 浓度偏低：可减少注水量或增加咖啡粉量（提升粉水比紧凑度）');
      } else if (tdsState === 'strong') {
        advice.push('💧 浓度偏高：可增加总水量或减少粉量，或在成品中注入适量温水进行 Bypass 稀释');
      }

      if (this.diagnosisNote) {
        this.diagnosisNote.innerHTML = advice.join('<br>');
      }
    }
  }
}
