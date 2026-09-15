export type SignalMood = "calm" | "engaged";
export const SAMPLE_RATE = 128;

// Deterministic synthetic waveform, never derived from the visitor or hardware.
export function signalSample(channel: number, seconds: number, mood: SignalMood = "calm") {
  const phase = channel * 0.71;
  const alpha = mood === "calm" ? 15 : 7;
  const beta = mood === "calm" ? 3 : 10;
  return alpha * Math.sin(seconds * Math.PI * 20 + phase)
    + beta * Math.sin(seconds * Math.PI * 38 + phase * 2)
    + 4 * Math.sin(seconds * Math.PI * 7 + phase)
    + 2 * Math.sin(seconds * Math.PI * 1.2 + phase);
}

export function createSessionCsv(deviceId: string, elapsed: number, mood: SignalMood) {
  const duration = Math.max(0, Math.min(elapsed, 10));
  const start = Math.max(0, elapsed - duration);
  const rows = ["source,device,scenario,time_seconds,ch_1_uv,ch_2_uv,ch_3_uv,ch_4_uv"];
  for (let i = 0; i < Math.floor(duration * SAMPLE_RATE); i++) {
    const t = start + i / SAMPLE_RATE;
    rows.push(["synthetic", deviceId, mood, t.toFixed(4), ...Array.from({ length: 4 }, (_, ch) => signalSample(ch, t, mood).toFixed(4))].join(","));
  }
  return rows.join("\n") + "\n";
}
