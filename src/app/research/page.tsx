import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import AutoVideo from "../components/site/AutoVideo";
import { Reveal } from "../components/site/HomeMotion";
import { AGEING_STUDIES, CASES, CaseVisual, HEADBAND_STUDIES, type Study } from "../components/site/ResearchCases";

export const metadata: Metadata = {
  title: "Research | Persimmon Quest",
  description: "Cyborg fashion, the gentle kind. How Persimmon AI turns what you wear into everyday habits for brain, body and mind, and the published research each direction starts from."
};

// How Persimmon AI works, as one loop people can follow
const LOOP = [
  { title: "Sense", line: "Sage Duo hears focus and calm. Your clothes and shoes feel how you move." },
  { title: "Learn", line: "qPad learns your rhythm right there in your home. Nothing personal has to leave the house." },
  { title: "Suggest", line: "One small quest for today, offered at a moment that suits you." },
  { title: "You choose", line: "Take it, change it or skip it. Every choice teaches it a little more about you." }
];

// What it notices and what it offers, for brain, body and mind. The colours match the day strip on the Duet page.
const PILLARS: { title: string; from: "band" | "body" | "view"; notices: string[]; offers: string }[] = [
  { title: "Brain", from: "band", notices: ["Focus", "Calm"], offers: "A word game when you are sharpest, a breathing session when you are not." },
  { title: "Body", from: "body", notices: ["Gait rhythm", "Balance", "Posture"], offers: "A walk at your own pace, and a balance drill when your steps get shorter." },
  { title: "Mind", from: "view", notices: ["Sleep", "Rest", "Time together"], offers: "A gentle day after a busy one, and a call or a walk with someone you love." }
];

function Cite({ s }: { s: Study }) {
  return (
    <a className="q-cite" href={s.href} target="_blank" rel="noopener noreferrer">
      {s.cite} <ArrowUpRight size={14} aria-hidden="true" /><span className="q-sr"> (opens in a new tab)</span>
    </a>
  );
}

function StudyGroup({ title, line, studies }: { title: string; line: string; studies: Study[] }) {
  return (
    <div className="q-proof__group">
      <div className="q-proof__grouphead">
        <h3 className="q-h3">{title}</h3>
        <p>{line}</p>
      </div>
      <ul className="q-proof__list">
        {studies.map((s) => (
          <li key={s.cite}>
            <p className="q-proof__where"><b>{s.place}</b> {s.who}</p>
            <p>{s.found}</p>
            <Cite s={s} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResearchPage() {
  return (
    <main className="q-research">
      <header className="q-shell q-pagehead q-research__head">
        <span className="q-mono q-mono--bronze">Our research</span>
        <h1 className="q-display-xl">Cyborg fashion<br /><em>the gentle kind</em></h1>
        <p className="q-lead">Clothes, a headband and a home screen that sense the body and the mind, with nothing under the skin. Every direction below starts from published research you can read for yourself, and is shaped with the older adults who will wear it.</p>
        <nav className="q-research__toc" aria-label="On this page">
          <a href="#persimmon-ai">Persimmon AI</a>
          {CASES.map((c) => <a key={c.id} href={`#${c.id}`}>{c.title}</a>)}
          <a href="#evidence">Research you can check</a>
        </nav>
      </header>

      {/* The Persimmon AI film, always shown whole: its title sits in the middle of the frame, so it is never cropped
          on wide screens. Phones get a closer square-ish cut around the title. */}
      <section className="q-research__film" aria-label="Persimmon AI film">
        <AutoVideo className="q-research__video" src="/media/film/persimmon-ai.mp4" phone="/media/film/persimmon-ai-phone.mp4" phoneMedia="(max-width: 599px)" poster="/media/film/persimmon-ai.webp" label="Persimmon AI: the brain's white matter pathways, lit in persimmon, turning slowly" toggleClassName="q-media-toggle q-research__toggle" />
        <span className="q-grain" aria-hidden="true" />
      </section>

      {/* How the intelligence works: one loop, then what it does for brain, body and mind */}
      <section id="persimmon-ai" className="q-ai" aria-labelledby="ai-title">
        <div className="q-shell">
          <div className="q-ai__head">
            <h2 id="ai-title" className="q-display">Persimmon AI<br /><em>personal intelligence for everyday habits</em></h2>
            <p className="q-lead">It is being built to learn from what you wear and what you do, on qPad in your home, and turn it into one small next step each day. Kept up over months, those steps become the habits research ties to healthy ageing, for the brain, the body and the mind.</p>
          </div>
          <ol className="q-ai__loop">
            {LOOP.map((l, i) => (
              <li key={l.title}>
                <span className="q-ai__step" aria-hidden="true">{i + 1}</span>
                <h3>{l.title}</h3>
                <p>{l.line}</p>
              </li>
            ))}
          </ol>
          <ul className="q-ai__pillars">
            {PILLARS.map((p) => (
              <li key={p.title} className={`q-ai__pillar q-ai__pillar--${p.from}`}>
                <h3 className="q-h3">{p.title}</h3>
                <p className="q-ai__label">It notices</p>
                <p className="q-ai__sigs">{p.notices.map((n) => <span key={n} className={`q-sig q-sig--${p.from}`}><i />{n}</span>)}</p>
                <p className="q-ai__label">It offers</p>
                <p className="q-ai__offer">{p.offers}</p>
              </li>
            ))}
          </ul>
          <p className="q-ai__note">Persimmon AI suggests, you decide. General wellness, not medical advice.</p>
        </div>
      </section>

      <div className="q-shell q-research__list">
        {CASES.map((c) => (
          <article key={c.id} id={c.id} className="q-rcase" aria-labelledby={`${c.id}-title`}>
            <Reveal className={`q-rcase__visual ${c.photo ? "is-photo" : ""}`}>
              {c.photo ? (
                <img src={c.photo.src} alt={c.photo.alt} loading="lazy" />
              ) : c.visual === "touch" ? (
                <div className="q-casevid">
                  <AutoVideo src="/media/film/hands-free-reply.mp4" poster="/media/film/hands-free-reply.webp" label="A wheelchair user replying to family messages without using her hands" toggleClassName="q-media-toggle q-casevid__toggle" />
                </div>
              ) : c.visual ? (
                <CaseVisual kind={c.visual} />
              ) : null}
            </Reveal>
            <Reveal delay={0.06} className="q-rcase__copy">
              <span className="q-rcase__status">{c.status}</span>
              <h2 id={`${c.id}-title`} className="q-display">{c.title}</h2>
              <p className="q-lead">{c.line}</p>
              <dl className="q-rcase__facts">
                <div><dt>The question</dt><dd>{c.question}</dd></div>
                <div><dt>What we are exploring</dt><dd>{c.exploring}</dd></div>
                <div><dt>What it could mean for you</dt><dd>{c.meaning}</dd></div>
              </dl>
              {c.builtOn && (
                <div className="q-rcase__built">
                  <p><b>Built on</b> {c.builtOn.found}</p>
                  <Cite s={c.builtOn} />
                </div>
              )}
            </Reveal>
          </article>
        ))}
      </div>

      {/* The published work behind the directions above, by other teams, with links to read it */}
      <section id="evidence" className="q-proof" aria-labelledby="evidence-title">
        <div className="q-shell">
          <div className="q-proof__head">
            <h2 id="evidence-title" className="q-display">Research you can check<br /><em>and read for yourself</em></h2>
            <p className="q-lead">Our directions start from published work by other teams. These studies show what is possible. They are not tests of our products.</p>
          </div>
          <StudyGroup title="Headbands outside the lab" line="Dry sensors, worn at home, read sleep and attention closely enough to be useful." studies={HEADBAND_STUDIES} />
          <StudyGroup title="Habits and healthy ageing" line="Moving, sleeping well, learning and staying close to people. The habits Persimmon AI is built to make easier." studies={AGEING_STUDIES} />
        </div>
      </section>

      <section id="join" className="q-research__join" aria-labelledby="join-title">
        <div className="q-shell">
          <img className="q-research__rings" src="/media/site/material/rings.webp" alt="Bronze rings linked together, catching warm light" loading="lazy" />
          <Reveal className="q-research__joinhead">
            <h2 id="join-title" className="q-display">Shape what comes next<br /><em>from day one</em></h2>
            <p className="q-lead">The best ideas for active ageing come from the people living it. Join in as much or as little as you like.</p>
          </Reveal>
          <ul className="q-research__ways">
            <li>
              <h3>Join the research panel</h3>
              <p>Try early versions, tell us what feels right, and help decide what we build next.</p>
              <Link className="q-btn q-btn--primary" href="/contact">Join the panel <ArrowRight size={18} aria-hidden="true" /></Link>
            </li>
            <li>
              <h3>Read the weekly quest letter</h3>
              <p>One short email a week about what we are learning, written for people, not scientists.</p>
              <a className="q-link" href="https://siliconjelly.substack.com" target="_blank" rel="noopener noreferrer">Subscribe on Substack <ArrowUpRight size={16} aria-hidden="true" /><span className="q-sr"> (opens in a new tab)</span></a>
            </li>
            <li>
              <h3>See where it comes together</h3>
              <p>Quest View on qPad is where your clothes, headband and daily quests meet.</p>
              <Link className="q-link" href="/quest-view">Explore Quest View <ArrowRight size={16} aria-hidden="true" /></Link>
            </li>
          </ul>
          <p className="q-research__note">Taking part is always your choice. You decide what you share, and you can stop at any time. General wellness research, not medical advice.</p>
        </div>
      </section>
    </main>
  );
}
