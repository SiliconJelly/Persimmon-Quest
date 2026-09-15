"use client";

import { Activity, ArrowLeft, ArrowRight, ArrowUpRight, Check, Download, Leaf, Pause, Play, RotateCcw, ShieldCheck, Sparkles, Wind } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { connectDevices, type ConnectDevice } from "./devices";
import MemoryGame from "./MemoryGame";
import SignalCanvas from "./SignalCanvas";
import { createSessionCsv, type SignalMood } from "./simulation";

type ActivityName = "breathe" | "recall" | "signals";
const activities = [
  { id: "breathe", label: "Find your rhythm", icon: Wind },
  { id: "recall", label: "Recall & play", icon: Sparkles },
  { id: "signals", label: "Explore signals", icon: Activity }
] as const;
const careCopy = {
  breathe: ["A guided pause", "A quiet moment before a care session, at a pace the resident can follow"],
  recall: ["A shared moment", "Simple activities that residents, families, and caregivers can enjoy together"],
  signals: ["A view for care teams", "Explore how session signals could accompany engagement notes in future care workflows"]
};

export default function SessionDashboard({ device, onDeviceChange, onLeave, authorizedDevice }: { device: ConnectDevice; onDeviceChange: (device: ConnectDevice) => void; onLeave: () => void; authorizedDevice?: string }) {
  const [activity, setActivity] = useState<ActivityName>("breathe");
  const [running, setRunning] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const [mood, setMood] = useState<SignalMood>("calm");
  const [resetKey, setResetKey] = useState(0);
  const [exportMessage, setExportMessage] = useState("");

  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      if (!document.hidden) setElapsed(value => value + Math.min((now - last) / 1000, .5));
      last = now;
    }, 200);
    return () => window.clearInterval(timer);
  }, [running]);

  function reset() { setElapsed(0); setInteractions(0); setResetKey(value => value + 1); setExportMessage(""); setRunning(true); }
  function selectActivity(id: ActivityName) { setActivity(id); if (id !== "signals") setMood(id === "recall" ? "engaged" : "calm"); }
  function exportSession() {
    const blob = new Blob([createSessionCsv(device.id, elapsed, mood)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "persimmon-replay-synthetic-session.csv";
    document.body.appendChild(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setExportMessage("Synthetic sample download requested · Last 10 seconds, 4 channels, 128 Hz");
  }

  const seconds = Math.floor(elapsed);
  const time = `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
  const breathPhase = elapsed % 10 < 4 ? "Breathe in" : "Breathe out";
  const breathProgress = elapsed % 10 < 4 ? (elapsed % 10) / 4 : 1 - ((elapsed % 10) - 4) / 6;
  const breathEase = .5 - .5 * Math.cos(Math.PI * breathProgress);
  const rhythms = mood === "calm" ? [14, 20, 46, 20] : [12, 16, 28, 44];

  return (
    <main id="main-content" className="connect-page session-page pq-shell">
      <div className="session-breadcrumb"><button type="button" onClick={onLeave}><ArrowLeft size={15} /> Back to devices</button><span><i /> Simulated experience</span></div>
      <header className="session-heading"><div><p className="pq-eyebrow">Persimmon Replay / Your session</p><h1 id="session-title" tabIndex={-1}>A little more in sync</h1></div><div className="session-toolbar"><span className="session-clock" aria-label={`Session time ${time}`}>{time}</span><button type="button" className="connect-outline-button" onClick={() => setRunning(value => !value)}>{running ? <Pause size={15} /> : <Play size={15} />}{running ? "Pause" : "Resume"}</button><button type="button" className="session-reset" aria-label="Reset session" onClick={reset}><RotateCcw size={17} /></button></div></header>

      <nav className="session-activities" aria-label="Session activities">{activities.map(({ id, label, icon: Icon }) => <button type="button" key={id} aria-pressed={activity === id} onClick={() => selectActivity(id)}><Icon size={17} strokeWidth={1.6} />{label}</button>)}</nav>

      <div className="session-grid">
        <div className="session-workspace">
          <section className={`session-stage ${running ? "" : "is-paused"}`} aria-label={activities.find(item => item.id === activity)?.label}>
            <div className="session-stage-top"><span><i className={running ? "" : "is-paused"} />{running ? "Simulation running" : "Simulation paused"}</span><span>{activity === "signals" ? "Illustrative EEG" : "A moment for you"}</span></div>
            {activity === "breathe" && <div className="session-breathing">
              <div className="breath-garden" aria-hidden="true" key={resetKey}>
                <svg className="breath-petals" style={{ transform: `scale(${.8 + .2 * breathEase}) rotate(${-5 + 10 * breathEase}deg)`, opacity: .65 + .35 * breathEase }} viewBox="0 0 400 400">{Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx="200" cy="140" rx="52" ry="95" transform={`rotate(${i * 30} 200 200)`} />)}<circle cx="200" cy="200" r="141" className="breath-circle" /><circle cx="200" cy="200" r="174" className="breath-circle" /></svg>
                <div className="breath-core"><Leaf size={30} strokeWidth={1} /></div>
              </div>
              <div className="breath-instruction"><p className="pq-eyebrow">Find your rhythm</p><h2>{running ? breathPhase : "Take your time"}</h2><p>In for 4 · Out for 6</p></div>
              <span className="session-stage-note">Follow at your own pace · A guided relaxation preview</span>
            </div>}
            {activity === "recall" && <MemoryGame key={resetKey} elapsed={elapsed} running={running} onInteraction={() => setInteractions(value => value + 1)} />}
            {activity === "signals" && <div className="session-signals-view"><p className="pq-eyebrow">From moments to patterns</p><h2>A window into the rhythm</h2><p>Switch the scenario to explore a different synthetic signal</p><div className="session-scenarios" role="group" aria-label="Signal scenario"><button type="button" aria-pressed={mood === "calm"} onClick={() => setMood("calm")}>Quiet moment</button><button type="button" aria-pressed={mood === "engaged"} onClick={() => setMood("engaged")}>Active play</button></div><SignalCanvas key={resetKey} running={running} mood={mood} expanded /><div className="session-signal-axis"><span>4-second window</span><span>Synthetic µV · 4 illustrative channels</span></div></div>}
          </section>
          {activity !== "signals" && <section className="session-stream" aria-labelledby="signal-title"><div className="session-stream-heading"><h2 id="signal-title"><Activity size={15} /> The signal behind the moment</h2><span>Synthetic EEG</span></div><SignalCanvas key={resetKey} running={running} mood={mood} /><div className="session-signal-axis"><span>4 illustrative channels</span><button type="button" onClick={() => selectActivity("signals")}>Explore the signal <ArrowUpRight size={13} /></button></div></section>}
          <div className="session-science-note"><ShieldCheck size={16} /><p>All waveforms and rhythm values are generated for this demo. They do not measure your brain or assess your health</p></div>
        </div>

        <aside className="session-sidebar" aria-label="Session details">
          <section className="session-device-panel"><div className="connect-section-heading"><h2>Your companion</h2><span>Ivory</span></div><img className="session-device-image" src={device.image} width="1536" height="1024" alt={`${device.family}, ${device.style} in ivory`} /><div className="session-device-name"><div><h3>{device.family}</h3><p>{device.style} / {device.feature}</p></div><Check size={17} /></div><div className="session-device-picker" role="group" aria-label="Session device style">{connectDevices.map(item => <button type="button" key={item.id} aria-label={`Use ${item.family} ${item.style}`} aria-pressed={item.id === device.id} onClick={() => onDeviceChange(item)}><img src={item.image} width="72" height="48" alt="" /></button>)}</div><p className="session-device-source">{authorizedDevice ? `Bluetooth permission: ${authorizedDevice}. Signal source: simulation` : "Virtual device · No hardware connected"}</p></section>
          <section className="session-rhythms"><div className="connect-section-heading"><h2>Rhythm mix</h2><span>Illustrative</span></div>{["Delta", "Theta", "Alpha", "Beta"].map((label, index) => <div className="session-rhythm" key={label}><span>{label}</span><div><i style={{ width: `${rhythms[index]}%` }} /></div><span>{rhythms[index]}%</span></div>)}<p>Example proportions for the {mood === "calm" ? "quiet moment" : "active play"} scenario</p></section>
          <section className="session-care-note"><p className="pq-eyebrow">Care, within reach</p><h2>{careCopy[activity][0]}</h2><p>{careCopy[activity][1]}</p><Link href="/for-clinicians">Care & research <ArrowUpRight size={14} /></Link></section>
        </aside>
      </div>

      <section className="session-summary" aria-label="Session summary"><div><p className="pq-eyebrow">A small step, made visible</p><h2>Your session, on your device</h2></div><div className="session-summary-metrics"><span><strong>{time}</strong>Time explored</span><span><strong>{interactions}</strong>Play interactions</span></div><button type="button" className="connect-outline-button" disabled={elapsed < 1} onClick={exportSession}><Download size={15} /> Export sample CSV</button></section>
      <div className="session-bottom"><p role="status">{exportMessage || "Local preview · No personal data or recordings are uploaded"}</p><button type="button" onClick={onLeave}>Choose another companion <ArrowRight size={14} /></button></div>
    </main>
  );
}
