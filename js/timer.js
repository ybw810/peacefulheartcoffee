/**
 * Peaceful Heart Coffee - Precision Extraction Timer & Audio/Sensory Engine
 */

export class BrewTimer {
  constructor(options = {}) {
    this.display = document.getElementById(options.displayId || 'timerTimeDisplay');
    this.container = document.getElementById(options.containerId || 'timerContainer');
    this.rectRainbow = document.getElementById(options.rectRainbowId || 'timerRectRainbow');
    this.rectTrack = document.getElementById(options.rectTrackId || 'timerRectTrack');
    this.rectSvg = document.getElementById(options.rectSvgId || 'timerRectSvg');
    this.dialBar = document.getElementById(options.dialBarId || 'timerDialBar');
    this.stageBadge = document.getElementById(options.stageBadgeId || 'timerStageBadge');
    this.btnToggle = document.getElementById(options.btnToggleId || 'btnStartPause');
    this.btnReset = document.getElementById(options.btnResetId || 'btnResetTimer');
    this.btnMute = document.getElementById(options.btnMuteId || 'btnMuteAudio');
    this.btnWakeLock = document.getElementById(options.btnWakeLockId || 'btnToggleWakeLock');

    this.getStages = options.getStages || (() => []);
    
    // Timer State
    this.elapsed = 0;
    this.startedAt = 0;
    this.timerId = null;
    this.lastStageIdx = -1;
    this.isMuted = false;
    this.isWakeLockEnabled = true;
    this.wakeLock = null;

    // Web Audio Synthesizer Context
    this.audioCtx = null;

    this.init();
  }

  init() {
    if (!this.display || !this.btnToggle || !this.btnReset) return;

    this.btnToggle.addEventListener('click', () => this.toggle());
    this.btnReset.addEventListener('click', () => this.reset());

    // Auto-fit rainbow perimeter to container
    if (this.container && this.rectRainbow && this.rectTrack) {
      const updateRectSize = () => {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        if (w > 0 && h > 0) {
          const rw = Math.max(0, w - 4);
          const rh = Math.max(0, h - 4);
          this.rectTrack.setAttribute('width', rw);
          this.rectTrack.setAttribute('height', rh);
          this.rectRainbow.setAttribute('width', rw);
          this.rectRainbow.setAttribute('height', rh);
        }
      };

      if (window.ResizeObserver) {
        this.resizeObserver = new ResizeObserver(updateRectSize);
        this.resizeObserver.observe(this.container);
      }
      updateRectSize();
      window.addEventListener('resize', updateRectSize);
    }

    if (this.btnMute) {
      this.btnMute.addEventListener('click', () => {
        this.isMuted = !this.isMuted;
        this.btnMute.classList.toggle('active', !this.isMuted);
        this.btnMute.title = this.isMuted ? '提示音已静音' : '提示音已开启';
      });
    }

    if (this.btnWakeLock) {
      this.btnWakeLock.addEventListener('click', () => {
        this.isWakeLockEnabled = !this.isWakeLockEnabled;
        this.btnWakeLock.classList.toggle('active', this.isWakeLockEnabled);
        if (!this.isWakeLockEnabled && this.wakeLock) {
          this.releaseWakeLock();
        } else if (this.isWakeLockEnabled && this.timerId) {
          this.requestWakeLock();
        }
      });
    }

    // Support visibility change to restore wake lock if user switches apps and comes back
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.timerId && this.isWakeLockEnabled) {
        this.requestWakeLock();
      }
    });

    this.render();
  }

  initAudio() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  async requestWakeLock() {
    if ('wakeLock' in navigator && this.isWakeLockEnabled) {
      try {
        this.wakeLock = await navigator.wakeLock.request('screen');
      } catch (err) {
        console.warn('Screen WakeLock request failed:', err);
      }
    }
  }

  async releaseWakeLock() {
    if (this.wakeLock) {
      try {
        await this.wakeLock.release();
        this.wakeLock = null;
      } catch (err) {
        console.warn('Screen WakeLock release failed:', err);
      }
    }
  }

  playChime() {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.audioCtx) return;

    // Artisan Dual-Harmonic Chime (880Hz A5 + 1320Hz E6)
    const now = this.audioCtx.currentTime;
    const notes = [
      { freq: 659.25, time: 0, dur: 0.22 },     // E5
      { freq: 987.77, time: 0.12, dur: 0.35 }   // B5
    ];

    notes.forEach(n => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.freq, now + n.time);

      gain.gain.setValueAtTime(0.0001, now + n.time);
      gain.gain.exponentialRampToValueAtTime(0.22, now + n.time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + n.time + n.dur);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + n.time);
      osc.stop(now + n.time + n.dur + 0.05);
    });

    // Mobile Haptic Vibration
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([60, 40, 90]);
      } catch (e) {
        // Ignored on unsupported platforms
      }
    }
  }

  toggle() {
    this.initAudio();
    if (this.timerId) {
      this.pause();
    } else {
      this.start();
    }
  }

  start() {
    this.startedAt = performance.now() - (this.elapsed * 1000);
    this.timerId = setInterval(() => this.tick(), 40);
    this.btnToggle.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1.5"/><rect x="14" y="4" width="4" height="16" rx="1.5"/></svg>
      <span>暂停注水</span>
    `;
    this.requestWakeLock();
    this.tick();
  }

  pause() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.btnToggle.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>
      <span>继续注水</span>
    `;
    this.stageBadge.textContent = '已暂停 · 点击继续';
    this.releaseWakeLock();
  }

  reset() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.elapsed = 0;
    this.lastStageIdx = -1;
    this.btnToggle.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>
      <span>开始冲煮计时</span>
    `;
    this.stageBadge.textContent = '准备注水 · 点击开始';
    if (this.rectRainbow) {
      this.rectRainbow.style.strokeDashoffset = '100';
    }
    this.render();
    this.releaseWakeLock();

    // Reset stage items highlight if any exist
    document.querySelectorAll('.stage-item').forEach(el => {
      el.classList.remove('active', 'done');
    });
  }

  tick() {
    this.elapsed = (performance.now() - this.startedAt) / 1000;
    this.render();
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const tenths = Math.floor((seconds % 1) * 10);
    return `${mins}:${String(secs).padStart(2, '0')}.${tenths}`;
  }

  render() {
    this.display.textContent = this.formatTime(this.elapsed);
    const stages = this.getStages();
    if (!stages || stages.length === 0) return;

    // Find current stage
    let currentIdx = 0;
    for (let i = stages.length - 1; i >= 0; i--) {
      if (this.elapsed >= stages[i].time) {
        currentIdx = i;
        break;
      }
    }

    // Trigger chime on new stage entering
    if (this.timerId && this.lastStageIdx !== -1 && currentIdx !== this.lastStageIdx) {
      this.playChime();
    }
    this.lastStageIdx = currentIdx;

    const curStage = stages[currentIdx];
    if (this.elapsed === 0 && !this.timerId) {
      if (curStage && curStage.note && curStage.note.includes('冰块')) {
        this.stageBadge.textContent = '准备：' + curStage.note + ' · 点击开始';
      } else {
        this.stageBadge.textContent = '准备注水 · 点击开始';
      }
    } else {
      this.stageBadge.textContent = `${curStage.name} · ${curStage.note}`;
    }

    // Highlight active stage in DOM list (if present)
    const stageNodes = document.querySelectorAll('.stage-item');
    if (stageNodes.length > 0) {
      stageNodes.forEach((node, i) => {
        node.classList.toggle('active', i === currentIdx);
        node.classList.toggle('done', i < currentIdx);
      });
    }

    // Calculate progress for perimeter rainbow beam and optional circular fallback
    const maxTime = stages[stages.length - 1].time + 30; // total duration
    const progress = Math.min(1, Math.max(0, this.elapsed / maxTime));

    if (this.rectRainbow) {
      const dashoffset = (100 - (progress * 100)).toFixed(2);
      this.rectRainbow.style.strokeDashoffset = dashoffset;
    }

    if (this.dialBar) {
      const circumference = 603.18;
      const offset = circumference - (progress * circumference);
      this.dialBar.style.strokeDashoffset = offset.toFixed(1);
    }
  }
}
