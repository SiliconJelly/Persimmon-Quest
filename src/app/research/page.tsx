import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import AutoVideo from "../components/site/AutoVideo";
import { Reveal } from "../components/site/HomeMotion";
import { CASES, CaseVisual } from "../components/site/ResearchCases";

export const metadata: Metadata = {
  title: "Research | Persimmon Quest",
  description: "The questions we explore with older adults: touch free help, learning at home, gentle sleep insight, steadier steps and everyday brain sensing. Take part from day one."
};

export default function ResearchPage() {
  return (
    <main className="q-research">
      <header className="q-shell q-pagehead q-research__head">
        <span className="q-mono q-mono--bronze">Our research</span>
        <h1 className="q-display-xl">Built with you,<br /><em>not just for you.</em></h1>
        <p className="q-lead">Self care is changing. We think it should be calm, private and made with the people who use it. Here is what we are exploring, in plain words, and how you can help shape it.</p>
        <nav className="q-research__toc" aria-label="Case studies">
          {CASES.map((c) => <a key={c.id} href={`#${c.id}`}>{c.title.replace(/\.$/, "")}</a>)}
        </nav>
      </header>

      <div className="q-shell q-research__list">
        {CASES.map((c) => (
          <article key={c.id} id={c.id} className="q-rcase" aria-labelledby={`${c.id}-title`}>
            <Reveal className={`q-rcase__visual ${c.photo ? "is-photo" : ""}`}>
              {c.photo ? (
                <img src={c.photo.src} alt={c.photo.alt} loading="lazy" />
              ) : c.visual === "touch" ? (
                <div className="q-casevid">
                  <AutoVideo src="/media/case-study/8e04c71fd9e9ca3efeab1f4cb1d0a9c5648f8165.webm" poster="" label="A wheelchair user replying to family messages without using her hands" toggleClassName="q-media-toggle q-casevid__toggle" />
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
            </Reveal>
          </article>
        ))}
      </div>

      <section id="join" className="q-research__join" aria-labelledby="join-title">
        <div className="q-shell">
          <Reveal className="q-research__joinhead">
            <h2 id="join-title" className="q-display">Shape what comes next, <em>from day one.</em></h2>
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
