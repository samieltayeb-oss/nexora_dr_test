// NEXORA DR TEST — Independent Countdown Timer
// Dedicated strictly for Timed Challenge Training Mode (Never used on Real Exam Simulation)

export class ExamTimer {
  constructor(options = {}) {
    this.durationSeconds = (options.durationMinutes || 30) * 60;
    this.remainingSeconds = this.durationSeconds;
    this.intervalId = null;
    this.isRunning = false;
    this.storageKey = options.storageKey || 'nexora_timed_challenge_timer';

    this.onTick = options.onTick || (() => {});
    this.onWarning = options.onWarning || (() => {});
    this.onExpire = options.onExpire || (() => {});

    this.warned5Min = false;
    this.warned1Min = false;
  }

  /**
   * Formats seconds into MM:SS
   */
  static formatTime(seconds) {
    const mins = Math.floor(Math.max(0, seconds) / 60);
    const secs = Math.floor(Math.max(0, seconds) % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  start(durationMinutes = null) {
    if (durationMinutes) {
      this.durationSeconds = durationMinutes * 60;
      this.remainingSeconds = this.durationSeconds;
    }

    this.stop();
    this.isRunning = true;
    this.warned5Min = false;
    this.warned1Min = false;
    this.saveState();

    this.tick();
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  tick() {
    if (!this.isRunning) return;

    this.onTick(this.remainingSeconds, ExamTimer.formatTime(this.remainingSeconds));

    // Warning triggers
    if (this.remainingSeconds <= 300 && !this.warned5Min && this.remainingSeconds > 60) {
      this.warned5Min = true;
      this.onWarning(5, '5 minutes remaining');
    }

    if (this.remainingSeconds <= 60 && !this.warned1Min && this.remainingSeconds > 0) {
      this.warned1Min = true;
      this.onWarning(1, '1 minute remaining');
    }

    if (this.remainingSeconds <= 0) {
      this.stop();
      this.clearState();
      this.onExpire();
      return;
    }

    this.remainingSeconds--;
    this.saveState();
  }

  pause() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.saveState();
  }

  resume() {
    if (!this.isRunning && this.remainingSeconds > 0) {
      this.isRunning = true;
      this.intervalId = setInterval(() => this.tick(), 1000);
    }
  }

  stop() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.clearState();
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({
        remainingSeconds: this.remainingSeconds,
        durationSeconds: this.durationSeconds,
        timestamp: Date.now(),
        isRunning: this.isRunning
      }));
    } catch (e) {
      // Storage unavailable / private mode
    }
  }

  restoreState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (!saved) return false;

      const data = JSON.parse(saved);
      const elapsed = Math.floor((Date.now() - data.timestamp) / 1000);
      const remaining = data.remainingSeconds - elapsed;

      if (remaining > 0) {
        this.durationSeconds = data.durationSeconds;
        this.remainingSeconds = remaining;
        return true;
      } else {
        this.clearState();
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  clearState() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (e) {}
  }
}
