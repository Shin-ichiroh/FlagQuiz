
class SoundEffectManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  // 正解音: 明るいピロリン♪
  public playCorrect() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";

    // 2音（ド -> ソ）
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.setValueAtTime(783.99, now + 0.12); // G5

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.35);
  }

  // 不正解・時間切れ音: ブブー
  public playWrong() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.setValueAtTime(130, now + 0.15);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // カウントダウン警告音: コッ
  public playTick() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(880, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // タップ音: ポッ
  public playTap() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(400, now);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }
}

export const soundEffect = new SoundEffectManager();
