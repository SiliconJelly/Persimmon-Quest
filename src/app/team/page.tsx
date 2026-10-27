import type { Metadata } from "next";
import { Linkedin, Mail, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { teamMembers } from "../data";

export const metadata: Metadata = {
  title: "Team | Persimmon Quest",
  description: "Meet the team behind Persimmon Quest, building clothes, a headband and a home screen for active wellness and better aging."
};

// What the team stands for, said plainly, in the brand's own voice
const BELIEFS = ["Style does not retire", "Curiosity has no age limit", "Data should cheer you on"];

export default function TeamPage() {
  return (
    <main className="q-team">
      <section className="q-shell q-pagehead q-team__head">
        <span className="q-mono q-mono--bronze">The team</span>
        <h1 className="q-display-xl">Nobody should age<br /><em>on autopilot</em></h1>
        <p className="q-lead">We make clothes, a headband and a home screen that keep bodies moving and minds curious, for the decades most brands forget to design for.</p>
      </section>

      <section className="q-shell" aria-label="What we believe">
        <ul className="q-team__beliefs">
          {BELIEFS.map((b) => <li key={b}>{b}</li>)}
        </ul>
      </section>

      <section className="q-shell q-team__people" aria-label="Our people">
        {teamMembers.map((member, index) => (
          <Reveal key={member.name} delay={index * 80}>
            <article className="q-person">
              <div className="q-person__head">
                <img src={member.avatar} width="120" height="120" alt={`${member.name} portrait`} />
                <div><h2>{member.name}</h2><p>{member.role}</p></div>
              </div>
              <div className="q-person__bio">{member.copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              <div className="q-person__tags">{member.badges.map((badge) => <span key={badge}>{badge}</span>)}</div>
              <div className="q-person__links">
                <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}><Linkedin size={18} aria-hidden="true" /> LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a>
                <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}><Mail size={18} aria-hidden="true" /> Email</a>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="q-shell q-team__notes" aria-labelledby="build-notes-title">
        <div>
          <span className="q-mono q-mono--bronze">Build notes</span>
          <h2 id="build-notes-title" className="q-display">Follow the quest</h2>
          <p className="q-lead">Notes on design, brain and body science, and what we are building next.</p>
        </div>
        <a className="q-btn q-btn--ink" href="https://siliconjelly.substack.com" target="_blank" rel="noreferrer">Read our updates <ArrowUpRight size={18} aria-hidden="true" /></a>
      </section>
    </main>
  );
}
