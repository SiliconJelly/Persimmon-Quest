import type { Metadata } from "next";
import { Linkedin, Mail, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { teamMembers } from "../data";

export const metadata: Metadata = {
  title: "Team | Persimmon Quest",
  description: "Meet the founders building Persimmon Quest’s neurotechnology for everyday care."
};

export default function TeamPage() {
  return (
    <main id="main-content" className="pq-team-page">
      <section id="team" className="pq-shell pq-inner-page">
        <div className="pq-page-heading">
          <p className="pq-eyebrow">The founding team</p>
          <h1>Meet the people<br />behind the quest</h1>
          <p>Bringing product thinking and neuroscience together for better aging</p>
        </div>
        <div className="pq-founders">
          {teamMembers.map((member, index) => (
            <Reveal key={member.name} delay={index * 80}>
              <article className="pq-founder-card">
                <div className="pq-founder-heading">
                  <img src={member.avatar} width="112" height="112" alt={`${member.name} portrait`} />
                  <div><h2>{member.name}</h2><p>{member.role}</p></div>
                </div>
                <div className="pq-founder-bio">{member.copy.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
                <div className="pq-founder-tags">{member.badges.map(badge => <span key={badge}>{badge}</span>)}</div>
                <div className="pq-founder-links">
                  <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}><Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} /></a>
                  <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}><Mail size={15} /> Email</a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <section className="pq-build-notes" aria-labelledby="build-notes-title">
          <div><p className="pq-eyebrow">Build notes</p><h2 id="build-notes-title">Follow the research</h2><p>Notes on what we’re building and learning</p></div>
          <a className="pq-button pq-button--dark" href="https://siliconjelly.substack.com" target="_blank" rel="noreferrer">Read our updates <ArrowUpRight size={16} /></a>
        </section>
      </section>
    </main>
  );
}
