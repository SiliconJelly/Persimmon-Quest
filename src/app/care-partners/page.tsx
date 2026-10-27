import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { Reveal } from "../components/site/HomeMotion";

export const metadata: Metadata = {
  title: "Care Partners | Persimmon Quest",
  description: "Sage Duo, qPad One and sensing activewear for Korean silver towns: wellness programs residents love, and a clear view of who is thriving. Plan a pilot with our team."
};

// The page tells one story for silver town operators: why their residents need this, what a day with it looks like, how
// it works, and how a pilot starts. Pictures are real scenes from the shop, cropped to the person in each.
const DAY = [
  { time: "Morning", title: "Tai chi in the courtyard", line: "Sage Duo notices how calm each slow form feels, while sensing clothes follow balance and breath.", src: "tai-chi", pos: "50% 50%", alt: "A resident practising tai chi in a sunny courtyard, wearing a soft headband" },
  { time: "Late morning", title: "Aqua class", line: "qPad One sets the pace from the side of the pool, one big key at a time.", src: "water-rhythm", pos: "47% 50%", alt: "A resident in a warm pool following a water class, with qPad on the deck beside her" },
  { time: "Afternoon", title: "Piano in the lounge", line: "Focus is noticed during practice, so progress means more than turning up.", src: "melody", pos: "58% 50%", alt: "A resident practising the piano in a bright lounge, qPad on the stand" },
  { time: "Evening", title: "A look back, together", line: "The day becomes small quests completed, and families get a weekly note if residents choose.", src: "shared-rhythm", pos: "44% 50%", alt: "Two residents on a garden bench, looking back on the day on qPad" }
];

const LOOP = [
  { title: "Sage Duo listens", line: "Dry sensors in two soft forehead pods read the brain's electrical rhythm. No gel, nothing to fit." },
  { title: "qPad One answers", line: "When calm or focus rises, the session answers with gentle changes in picture and sound. Seeing the mind respond is the practice. Researchers call this neurofeedback." },
  { title: "Quest View remembers", line: "Week by week it learns what settles each resident and suggests the next small quest. Staff see the trend in plain words, never raw brainwaves." }
];

const SYSTEM = [
  { name: "Sage Duo", line: "The headband that reads focus and calm", href: "/shop/qband-sage-duo", src: "/media/shop/qband-sage-duo/sage-cut.webp" },
  { name: "qPad One", line: "Four big keys and Quest View, in every room", href: "/shop/qpad-one", src: "/media/shop/qpad-one/ivory-cut.webp" },
  { name: "Sensing activewear", line: "Heart, breath and posture, woven into clothes", href: "/shop?c=activewear", src: "/media/shop/quest-hood/pine-cut.webp" }
];

const TEAM_GETS = [
  "One key starts each session, so staff spend time with residents, not screens",
  "Participation, calm and focus for each resident, as trends in plain words",
  "A weekly family note, only with each resident's permission",
  "Quest View runs on qPad One inside your building",
  "Monarch, our facility software, keeps consent records and care workflows in one place"
];

const TRUST = [
  "Consent first, for every resident",
  "Onboarding run by your facility",
  "Research only with approval, and de-identified",
  "A wellness and engagement system, not a diagnostic or treatment device"
];

const PILOT = [
  { title: "A first call", line: "We learn your residents, programs, staff rhythm and safety requirements." },
  { title: "Setup and training", line: "We fit Sage Duo and qPad One to the classes you choose, and your team learns to run short sessions." },
  { title: "Guided sessions", line: "Residents join sessions inside the classes they already love." },
  { title: "Review together", line: "We go through participation and session findings with you and plan what comes next, including research with consent." }
];

const FAQS = [
  ["Is this a medical treatment?", "No. Persimmon Quest is a wellness and engagement system for supervised programs and research. It does not diagnose or treat anything, unless future regulatory clearance is obtained."],
  ["Do residents need to be good with technology?", "No. Residents wear Sage Duo and press one big key on qPad One. Staff start sessions and read the summaries."],
  ["What data is collected?", "Depending on consent and how your facility sets it up, a pilot may collect signals from Sage Duo and sensing clothes, session length, participation and progress summaries."],
  ["Can families take part?", "Yes, with each resident's permission. Families can receive a weekly note in Quest View, and some sessions can be shared by video."]
] as const;

export default function CarePartnersPage() {
  return (
    <main className="q-care">
      {/* ---------- Opening: the promise, and the way to a pilot ---------- */}
      <section className="q-shell q-care__hero">
        <div className="q-care__intro">
          <span className="q-mono q-mono--bronze">For silver towns and care partners</span>
          <h1 className="q-display-xl">Every resident<br /><em>still has a quest</em></h1>
          <p className="q-lead">Sage Duo, qPad One and sensing activewear bring brain and body science into the classes your residents already love, so your team can see who is thriving and who is quietly drifting.</p>
          <div className="q-care__actions">
            <Link className="q-btn q-btn--primary" href="/contact#contact-form">Plan a pilot <ArrowRight size={18} aria-hidden="true" /></Link>
            <a className="q-link" href="#how">How it works</a>
          </div>
          <p className="q-hint">A wellness and engagement system. Not a diagnostic or treatment device.</p>
        </div>
        <Reveal className="q-care__heroimg">
          <img src="/media/shop/scenes/tai-chi.webp" alt="A resident practising tai chi in a sunny courtyard, wearing a soft headband" width={1200} height={800} />
        </Reveal>
      </section>

      {/* ---------- Why silver towns ---------- */}
      <section className="q-shell q-care__why" aria-labelledby="why-title">
        <Reveal className="q-care__whyhead">
          <span className="q-mono q-mono--bronze">Why silver towns</span>
          <h2 id="why-title" className="q-display">They moved in to live well<br /><em>not to be looked after</em></h2>
        </Reveal>
        <Reveal className="q-care__fact">
          <b>1 in 5</b>
          <p>In December 2024, South Korea became a super-aged society, with one in five people aged 65 or older. More of them choose silver towns for community, classes and care close by.</p>
        </Reveal>
        <ul className="q-care__points">
          <li><h3>Full calendars, little insight</h3><p>Programs are busy, but an attendance sheet cannot tell who is thriving and who is quietly drifting.</p></li>
          <li><h3>Families want more than fine</h3><p>Children ask how their parents are really doing. A weekly note answers with something real.</p></li>
          <li><h3>Wellness is why they chose you</h3><p>Programs that show progress keep residents engaged, and set your community apart.</p></li>
        </ul>
      </section>

      {/* ---------- A day in a silver town ---------- */}
      <section className="q-care__day" aria-labelledby="day-title">
        <div className="q-shell">
          <Reveal className="q-care__dayhead">
            <span className="q-mono q-mono--bronze">A day with Persimmon Quest</span>
            <h2 id="day-title" className="q-display">Nothing new to learn<br /><em>just more of what they love</em></h2>
          </Reveal>
          <Reveal>
            <ol className="q-care__scenes">
              {DAY.map((d) => (
                <li key={d.src} className="q-scene">
                  <img src={`/media/shop/scenes/${d.src}.webp`} alt={d.alt} width={1200} height={800} loading="lazy" style={{ objectPosition: d.pos }} />
                  <span className="q-mono">{d.time}</span>
                  <h3>{d.title}</h3>
                  <p>{d.line}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------- How it works: neurofeedback, in plain words, with the way into each product ---------- */}
      <section id="how" className="q-shell q-care__how" aria-labelledby="how-title">
        <Reveal className="q-care__howimg">
          <img src="/media/shop/scenes/calm-reading.webp" alt="A resident reading The quiet garden on qPad, wearing a soft headband" width={1200} height={800} loading="lazy" />
        </Reveal>
        <div className="q-care__howcopy">
          <span className="q-mono q-mono--bronze">How it works</span>
          <h2 id="how-title" className="q-display">A mirror<br /><em>for the mind</em></h2>
          <ol className="q-care__loop">
            {LOOP.map((s) => <li key={s.title}><h3>{s.title}</h3><p>{s.line}</p></li>)}
          </ol>
          <div className="q-care__more">
            <Link className="q-link" href="/shop/qband-sage-duo#research">The research behind Sage Duo</Link>
            <Link className="q-link" href="/quest-view">What a session feels like</Link>
            <Link className="q-link" href="/research">Our research</Link>
          </div>
        </div>
      </section>

      <section className="q-shell q-care__system" aria-label="The system">
        {SYSTEM.map((s) => (
          <Link key={s.name} href={s.href} className="q-care__item">
            <span className="q-care__itemimg"><img src={s.src} alt="" loading="lazy" /></span>
            <span className="q-care__itemtext"><b>{s.name}</b><span>{s.line}</span></span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        ))}
      </section>

      {/* ---------- For the team, and the promises that come first ---------- */}
      <section className="q-shell q-care__value" aria-labelledby="value-title">
        <div>
          <span className="q-mono q-mono--bronze">For your team</span>
          <h2 id="value-title" className="q-display">Less guessing<br /><em>more time together</em></h2>
          <ul className="q-checks q-care__checks">
            {TEAM_GETS.map((t) => <li key={t}><Check size={18} aria-hidden="true" />{t}</li>)}
          </ul>
        </div>
        <div className="q-care__trust">
          <h3>Trust before scale</h3>
          <p>Brain data from older adults deserves the greatest care. These come first, from the first conversation.</p>
          <ul className="q-checks q-care__checks">
            {TRUST.map((t) => <li key={t}><Check size={18} aria-hidden="true" />{t}</li>)}
          </ul>
        </div>
      </section>

      {/* ---------- A pilot, step by step ---------- */}
      <section className="q-shell q-care__pilot" aria-labelledby="pilot-title">
        <span className="q-mono q-mono--bronze">A pilot, step by step</span>
        <h2 id="pilot-title" className="q-display">Start small<br /><em>with the classes you already run</em></h2>
        <ol className="q-care__steps">
          {PILOT.map((p, i) => (
            <li key={p.title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{p.title}</h3><p>{p.line}</p></li>
          ))}
        </ol>
      </section>

      <section className="q-shell q-care__faq" aria-labelledby="care-faq-title">
        <h2 id="care-faq-title" className="q-h2">Questions operators ask</h2>
        <div className="q-acc">
          {FAQS.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q} <Plus size={20} aria-hidden="true" /></summary>
              <div className="q-acc__body"><p>{a}</p></div>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- The way in: technical sales ---------- */}
      <section className="q-care__cta" aria-labelledby="care-cta-title">
        <div className="q-shell">
          <h2 id="care-cta-title" className="q-display">Bring a pilot<br /><em>to your silver town</em></h2>
          <p className="q-lead">Our technical sales team will walk through your residents, programs and safety needs, then shape a pilot that fits.</p>
          <Link className="q-btn q-btn--primary" href="/contact#contact-form">Talk to technical sales <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
