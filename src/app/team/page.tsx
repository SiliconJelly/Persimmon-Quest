import type { Metadata } from "next";
import { Mail, UsersRound } from "lucide-react";
import Reveal from "../components/Reveal";
import { teamMembers } from "../data";
import { ScrewFrame } from "../components/ui";

export const metadata: Metadata = {
  title: "Persimmon Quest Team | Japan-First Neurotech Research",
  description:
    "Meet the founding team developing Persimmon Quest's Japan-first neuroadaptive care and aging-brain research platform."
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-chassis text-ink">
      <section id="team" className="mx-auto max-w-7xl px-5 py-32 sm:px-8">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="section-label">
                <UsersRound className="h-4 w-4" /> Founding team
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-5xl">
                The Minds Behind Persimmon Quest
              </h1>
            </div>
            <p className="max-w-lg text-base font-medium leading-7 text-label">
              A small, research-driven founding team building the neuroadaptive care infrastructure for Japan&apos;s aging society.
            </p>
          </div>
        </Reveal>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <Reveal key={member.name} delay={index * 100}>
              <ScrewFrame className="team-card group">
                <div className="team-portrait-wrap">
                  <div className="team-portrait">
                    <img src={member.avatar} alt={`${member.name} profile portrait`} />
                  </div>
                </div>
                <div className="team-card-body">
                  <h3 className="text-3xl font-black tracking-normal">{member.name}</h3>
                  <p className="mt-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-accent">{member.role}</p>
                  <p className="mt-5 text-sm font-medium leading-7 text-label">{member.copy}</p>
                </div>
              </ScrewFrame>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <ScrewFrame className="newsletter-panel mt-20">
            <div className="newsletter-copy">
              <p className="section-label">
                <Mail className="h-4 w-4" /> Build notes
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-5xl">
                Follow the neurotech pioneers
              </h2>
            </div>
            <div className="newsletter-embed" aria-label="Persimmon Quest Substack subscription">
              <iframe
                src="https://siliconjelly.substack.com/embed?transparent=1"
                width="480"
                height="320"
                style={{ border: 0, background: "transparent" }}
                frameBorder="0"
                scrolling="no"
                title="Subscribe to Silicon Jelly on Substack"
              />
            </div>
          </ScrewFrame>
        </Reveal>
      </section>
    </main>
  );
}
