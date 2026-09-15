"use client";

import { ArrowDownToLine, ArrowRight, Bluetooth, Check, CircleDot, Code2, Github, Leaf, LoaderCircle, ShieldCheck, Sparkles, Wind } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { bluetoothErrorMessage, checkBluetooth, requestBluetoothAccess, type BluetoothAdapter, type BluetoothAvailability, type BluetoothDeviceAccess } from "./bluetooth";
import { connectDevices, type ConnectDevice } from "./devices";
import SessionDashboard from "./SessionDashboard";

function browserBluetooth() {
  return (navigator as Navigator & { bluetooth?: BluetoothAdapter }).bluetooth;
}

const availabilityCopy: Record<BluetoothAvailability, { title: string; detail: string }> = {
  checking: { title: "Checking Bluetooth support", detail: "Device access is always your choice" },
  ready: { title: "Browser Bluetooth ready", detail: "Turn on Bluetooth and put your device in pairing mode" },
  unknown: { title: "Bluetooth status unconfirmed", detail: "Choose a device to check availability" },
  unsupported: { title: "Try Bluetooth in Chrome or Edge", detail: "This browser doesn’t offer device access. Simulation works here" },
  unavailable: { title: "Bluetooth currently unavailable", detail: "Check your Bluetooth settings and browser permissions" },
  insecure: { title: "Bluetooth needs a secure page", detail: "Open this site over HTTPS, or explore the simulation" }
};

export default function ConnectExperience() {
  const [selected, setSelected] = useState<ConnectDevice>(connectDevices[0]);
  const [session, setSession] = useState(false);
  const [availability, setAvailability] = useState<BluetoothAvailability>("checking");
  const [access, setAccess] = useState<BluetoothDeviceAccess | null>(null);
  const [requesting, setRequesting] = useState(false);
  const [message, setMessage] = useState("");
  const [bridgeRequested, setBridgeRequested] = useState(false);
  const pending = useRef(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const adapter = browserBluetooth();
    let cancelled = false;
    const refresh = () => {
      checkBluetooth(adapter, window.isSecureContext).then(result => { if (!cancelled) setAvailability(result); });
    };
    const route = () => {
      if (window.location.hash === "#session") setSession(true);
      else if (!window.location.hash) setSession(false);
      // In-page accessibility anchors should not end an active session.
    };
    refresh();
    route();
    adapter?.addEventListener?.("availabilitychanged", refresh);
    window.addEventListener("hashchange", route);
    window.addEventListener("focus", refresh);
    return () => {
      cancelled = true;
      mounted.current = false;
      adapter?.removeEventListener?.("availabilitychanged", refresh);
      window.removeEventListener("hashchange", route);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  useEffect(() => {
    if (session) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("session-title")?.focus({ preventScroll: true });
    }
  }, [session]);

  async function requestAccess() {
    const adapter = browserBluetooth();
    if (!adapter || pending.current) return;
    pending.current = true;
    setRequesting(true);
    setMessage("");
    try {
      const device = await requestBluetoothAccess(adapter);
      if (mounted.current) {
        setAccess(device);
        setMessage("Device access granted. The experience still uses simulated signals; live hardware streaming is not enabled.");
      }
    } catch (error) {
      if (mounted.current) setMessage(bluetoothErrorMessage(error));
    } finally {
      pending.current = false;
      if (mounted.current) setRequesting(false);
    }
  }

  function startSession() { setSession(true); window.location.hash = "session"; }
  function leaveSession() {
    setSession(false);
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  if (session) return <SessionDashboard device={selected} onDeviceChange={setSelected} onLeave={leaveSession} authorizedDevice={access?.name || (access ? "Unnamed device" : undefined)} />;

  const status = availabilityCopy[availability];
  const canRequest = ["ready", "unknown", "unavailable"].includes(availability);

  return (
    <main id="main-content" className="connect-page pq-shell">
      <header className="connect-heading">
        <div>
          <p className="pq-eyebrow"><span className="pq-dot" /> Persimmon Connect</p>
          <h1>A closer connection</h1>
          <p>Choose your device and explore everyday brain health</p>
        </div>
        <span className="connect-status"><span /> Open experience <span className="connect-status-divider">/</span> No sign-in</span>
      </header>

      <section className="connect-catalog" aria-labelledby="choose-device-title">
        <div className="connect-section-heading"><h2 id="choose-device-title">Find your everyday companion</h2><span>Five styles · One ecosystem</span></div>
        <div className="connect-device-grid" role="group" aria-label="Choose a device style">
          {connectDevices.map(device => (
            <button type="button" key={device.id} className={`connect-device ${selected.id === device.id ? "is-selected" : ""}`} aria-pressed={selected.id === device.id} aria-label={`${device.family} — ${device.style}`} onClick={() => setSelected(device)}>
              <span className="connect-device-top"><span>{device.family}</span>{device.kind === "band" ? <Wind size={17} strokeWidth={1.5} aria-hidden="true" /> : <CircleDot size={17} strokeWidth={1.5} aria-hidden="true" />}</span>
              <img src={device.image} width="1536" height="1024" alt={`${device.family}, ${device.style} style in ivory`} />
              <span className="connect-device-bottom"><span><strong>{device.style}</strong><small>{device.feature} / ivory</small></span><span className="connect-selection" aria-hidden="true">{selected.id === device.id && <Check size={13} />}</span></span>
            </button>
          ))}
        </div>
      </section>

      <section className="connect-options" aria-label="Ways to connect">
        <div className="connect-preview">
          <div className="connect-preview-copy">
            <p className="pq-eyebrow"><Sparkles size={14} /> Your first connection</p>
            <h2>Find your rhythm</h2>
            <p>Breathe, play, and see how everyday moments could become signals for better care</p>
            <button type="button" className="pq-button pq-button--orange" onClick={startSession}>Explore simulation <ArrowRight size={17} /></button>
            <span className="connect-preview-note">No hardware needed · Synthetic signals only</span>
          </div>
          <div className="connect-preview-art" aria-hidden="true">
            <span className="connect-orbit connect-orbit--one" /><span className="connect-orbit connect-orbit--two" />
            <span className="connect-art-core"><Leaf size={32} strokeWidth={1} /></span>
            <svg viewBox="0 0 300 140"><path d="M0 70 C30 70 28 55 45 68 S65 85 77 52 S92 105 105 70 S120 30 135 68 S150 110 166 66 S179 45 194 71 S218 76 225 68 S260 70 300 70" /></svg>
          </div>
        </div>
        <div className="connect-bluetooth">
          <div className="connect-option-icon"><Bluetooth size={21} strokeWidth={1.6} /></div>
          <h2>Bring your own device</h2>
          <p className="connect-bt-status" role="status"><i className={access || availability === "ready" ? "is-ready" : ""} />{access ? "Device access granted" : status.title}</p>
          <p>{access ? `${access.name || "Your device"} is selected for this visit` : status.detail}</p>
          <button type="button" className="connect-outline-button" onClick={requestAccess} disabled={!canRequest || requesting}>
            {requesting ? <LoaderCircle className="connect-spinner" size={16} /> : <Bluetooth size={16} />}{requesting ? "Waiting for device selection" : access ? "Choose another device" : "Choose Bluetooth device"}
          </button>
          <p className="connect-small">Your browser asks before granting access. It can’t reliably tell whether Bluetooth is switched on</p>
          {message && <div className="connect-feedback" role="status">{message}{access && <button type="button" onClick={startSession}>Open simulated session <ArrowRight size={14} /></button>}</div>}
        </div>
      </section>

      <section className="connect-resources" aria-label="Developer resources">
        <div className="connect-resource">
          <Code2 size={22} strokeWidth={1.5} />
          <div><div className="connect-resource-title"><h2>Local bridge</h2><span>Developer preview</span></div><p>Explore synthetic session data locally with Python</p>
            <a href="/downloads/persimmon-replay-bridge.zip" download onClick={() => setBridgeRequested(true)}>Download starter <ArrowDownToLine size={15} /></a>
            {bridgeRequested && <p className="connect-resource-feedback" role="status">Download requested · Generates sample data only <button type="button" onClick={startSession}>Try it in the browser <ArrowRight size={13} /></button></p>}
          </div>
        </div>
        <div className="connect-resource">
          <Github size={22} strokeWidth={1.5} />
          <div><div className="connect-resource-title"><h2>Persimmon Replay</h2><span>In development</span></div><p>Open tools for reproducible brain-health research</p></div>
        </div>
      </section>
      <p className="connect-privacy"><ShieldCheck size={16} /> This preview runs in your browser · No personal health data is collected</p>
    </main>
  );
}
