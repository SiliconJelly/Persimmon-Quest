import { BarChart3, BatteryFull, Bell, Check, ChevronRight, Footprints, Heart, Home, Lock, Settings, Signal, Sparkles, Tablet, User, Wifi } from "lucide-react";
import { EMBLEM } from "./Monogram";
import LaunchSignup from "./LaunchSignup";

// Quest View on a personal phone: three coded screens (not images) in the brand's dark glass,
// so they stay crisp, readable and easy to update as the app takes shape.

function StatusBar() {
  return (
    <div className="qa-status" aria-hidden="true">
      <span>9:41</span>
      <span className="qa-status__icons"><Signal /><Wifi /><BatteryFull /></span>
    </div>
  );
}

function AppHeader() {
  return (
    <div className="qa-head">
      <span className="qa-brand">
        <svg viewBox={EMBLEM.viewBox} aria-hidden="true">
          {EMBLEM.petals.map((d, i) => <path key={i} d={d} fill="currentColor" />)}
          <path d={EMBLEM.star} fill="var(--qa-ember)" />
        </svg>
        <span>Quest View<small>by Persimmon Quest</small></span>
      </span>
      <span className="qa-head__tools">
        <span className="qa-iconbtn"><Bell /><i /></span>
        <span className="qa-avatar">M</span>
      </span>
    </div>
  );
}

function TabBar({ active }: { active: "home" | "rhythm" | "me" }) {
  return (
    <div className="qa-tabs" aria-hidden="true">
      <span className={active === "home" ? "is-on" : ""}><Home /></span>
      <span className={active === "rhythm" ? "is-on" : ""}><BarChart3 /></span>
      <span className="qa-tabs__go"><Sparkles /></span>
      <span className={active === "me" ? "is-on" : ""}><User /></span>
      <span><Settings /></span>
    </div>
  );
}

function Phone({ children, className, label }: { children: React.ReactNode; className?: string; label: string }) {
  return (
    <figure className={`qa-phone ${className ?? ""}`} role="img" aria-label={label}>
      <div className="qa-phone__screen"><div className="qa-ui">{children}</div></div>
      <span className="qa-phone__island" aria-hidden="true" />
    </figure>
  );
}

const devices = [
  { name: "Everyday Polo", img: "/media/site/sketch/polo.webp", battery: 92 },
  { name: "Brainwear", img: "/media/site/sketch/brainwear.webp", battery: 85 },
  { name: "Quest Stride", img: "/media/site/sketch/shoe.webp", battery: 88 }
];

function TodayScreen() {
  const ring = 2 * Math.PI * 34;
  return (
    <>
      <StatusBar />
      <AppHeader />
      <p className="qa-hello">Hello,<br />Monica</p>
      <p className="qa-sub">Another steady day on your quest</p>
      <div className="qa-devices">
        {devices.map((d) => (
          <div key={d.name} className="qa-glass qa-device">
            <img src={d.img} alt="" />
            <b>{d.name}</b>
            <span><i className="qa-dot" />Connected</span>
            <span className="qa-batt"><BatteryFull />{d.battery}%</span>
          </div>
        ))}
      </div>
      <div className="qa-pair">
        <div className="qa-glass qa-metric">
          <span className="qa-label"><Footprints />Steps today</span>
          <span className="qa-dots">6,040<small>/ 8,000</small></span>
          <span className="qa-bar"><i style={{ width: "75%" }} /></span>
        </div>
        <div className="qa-glass qa-metric">
          <span className="qa-label"><Sparkles />Active minutes</span>
          <span className="qa-ringrow">
            <span className="qa-dots">41<small>/ 45 min</small></span>
            <svg viewBox="0 0 80 80" className="qa-ring"><circle cx="40" cy="40" r="34" /><circle cx="40" cy="40" r="34" strokeDasharray={ring} strokeDashoffset={ring * (1 - 41 / 45)} /></svg>
          </span>
        </div>
      </div>
      <p className="qa-section">Today&rsquo;s plan</p>
      <div className="qa-plan">
        {[["Morning walk", true], ["Balance", false], ["Stretch", false], ["Calm", false]].map(([n, done]) => (
          <span key={n as string} className={`qa-glass ${done ? "is-done" : ""}`}>{done ? <Check /> : <i />}{n}</span>
        ))}
      </div>
      <div className="qa-glass qa-next">
        <span className="qa-next__icon"><Tablet /></span>
        <p><b>Balance with Brainwear, 4:00 PM</b>Up next on qPad, 10 minutes</p>
      </div>
      <span className="qa-cta">Start today&rsquo;s walk<ChevronRight /></span>
      <TabBar active="home" />
    </>
  );
}

// A gentle activity curve with its peak marked, like the daily rhythm view on qPad.
const CURVE = "M0 70 C20 66 30 58 46 60 C62 62 70 44 86 40 C100 36 108 22 122 18 C136 14 146 34 160 36 C176 38 186 52 200 48 C214 44 224 56 240 58";

function RhythmScreen() {
  return (
    <>
      <StatusBar />
      <AppHeader />
      <p className="qa-title">Daily rhythm</p>
      <p className="qa-sub">Move well. Recover fully.</p>
      <div className="qa-seg"><span className="is-on">Today</span><span>Week</span><span>Month</span></div>
      <div className="qa-glass qa-chart">
        <span className="qa-label">Active minutes through the day</span>
        <svg viewBox="0 0 240 80" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="qa-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--qa-ember)" stopOpacity="0.45" />
              <stop offset="1" stopColor="var(--qa-ember)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${CURVE} L240 80 L0 80 Z`} fill="url(#qa-fill)" />
          <path d={CURVE} fill="none" stroke="var(--qa-ember)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <line x1="122" x2="122" y1="18" y2="80" stroke="rgba(245,242,237,.35)" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="qa-peak">38 min<small>2:14 PM</small></span>
        <span className="qa-axis"><span>6 AM</span><span>12 PM</span><span>6 PM</span></span>
      </div>
      <div className="qa-glass qa-zone">
        <span className="qa-label"><Heart />Heart rate zone</span>
        <span className="qa-dots">92&ndash;118<small>bpm</small></span>
        <span className="qa-zonebar"><i /><i className="is-on" /><i /></span>
        <span className="qa-axis"><span>Light</span><span>Moderate</span><span>Vigorous</span></span>
      </div>
      <div className="qa-pair">
        <div className="qa-glass qa-metric">
          <span className="qa-label">Weekly goal</span>
          <span className="qa-dots">84<small>%</small></span>
          <span className="qa-bar"><i style={{ width: "84%" }} /></span>
        </div>
        <div className="qa-glass qa-metric">
          <span className="qa-label">Recovery</span>
          <span className="qa-dots">48<small>min</small></span>
          <span className="qa-spark">{[4, 6, 5, 8, 7, 9, 10].map((h, i) => <i key={i} style={{ height: `${h * 10}%` }} />)}</span>
        </div>
      </div>
      <TabBar active="rhythm" />
    </>
  );
}

function FamilyScreen() {
  return (
    <>
      <StatusBar />
      <AppHeader />
      <p className="qa-title">Weekly note</p>
      <p className="qa-sub">For Jiwoo, your daughter</p>
      <div className="qa-glass qa-note">
        <p className="qa-note__big">You walked <b>5 of 7 days</b> this week.</p>
        <p>Breathing was calmer after every Flow session.</p>
        <p>Your stride is steadier than last month.</p>
      </div>
      <p className="qa-section">What Jiwoo can see</p>
      <div className="qa-glass qa-share">
        {[["Steps and walks", true], ["Sessions completed", true], ["Heart rhythm", false], ["Sleep", false]].map(([n, on]) => (
          <span key={n as string} className="qa-share__row">
            {n}
            <i className={`qa-toggle ${on ? "is-on" : ""}`} />
          </span>
        ))}
      </div>
      <p className="qa-private"><Lock />Only what you switch on is shared</p>
      <span className="qa-cta">Send to Jiwoo<ChevronRight /></span>
      <TabBar active="me" />
    </>
  );
}

const points = [
  { title: "Large and simple", line: "Big type that follows your phone's text size, and one tap check ins." },
  { title: "Everything in one place", line: "Your clothes, Brainwear and qPad share one quest, wherever you are." },
  { title: "Yours to share", line: "Family sees a weekly note, and only the parts you switch on." }
];

export default function AppShowcase() {
  return (
    <section className="q-app" aria-labelledby="app-title">
      <div className="q-shell q-app__grid">
        <div className="q-app__copy">
          <h2 id="app-title" className="q-display">Your quest,<br /><em>on your own phone.</em></h2>
          <p className="q-lead">Quest View is coming to iPhone and Android. Check today&rsquo;s plan on a walk, see how your body is doing, and send family a gentle weekly note.</p>
          <ul className="q-app__points">
            {points.map((p) => (
              <li key={p.title}><b>{p.title}</b><span>{p.line}</span></li>
            ))}
          </ul>
        </div>
        <div className="q-app__stage">
          <Phone className="qa-phone--left" label="Quest View daily rhythm screen: active minutes through the day peaking at 38 minutes, heart rate zone 92 to 118, weekly goal 84 percent."><RhythmScreen /></Phone>
          <Phone className="qa-phone--right" label="Quest View weekly note for family: walked 5 of 7 days, with switches for exactly what family can see."><FamilyScreen /></Phone>
          <Phone className="qa-phone--front" label="Quest View home screen: polo, Brainwear and shoes connected, 6,040 steps of 8,000, 41 of 45 active minutes, and today's plan."><TodayScreen /></Phone>
        </div>
      </div>
      <div className="q-shell"><LaunchSignup /></div>
    </section>
  );
}
