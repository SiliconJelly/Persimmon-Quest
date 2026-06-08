import type { Metadata } from "next";
import { ArrowUpRight, FlaskConical, Layers3, MoveRight } from "lucide-react";
import Link from "next/link";
import Reveal from "../components/Reveal";
import { roadmapSteps } from "../data";
import { ScrewFrame } from "../components/ui";

export const metadata: Metadata = {
  title: "Persimmon Quest Roadmap | Focused Research Organization",
  description:
    "The Persimmon Quest roadmap from a Japan-first Focused Research Organization and care-facility MVP to validated neuroadaptive research infrastructure."
};

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-chassis text-ink">
      <section id="roadmap" className="mx-auto max-w-7xl px-5 py-32 sm:px-8">
        <Reveal>
          <ScrewFrame className="roadmap-panel">
            <div className="roadmap-header">
              <div>
                <p className="section-label">
                  <FlaskConical className="h-4 w-4" /> Product research and development
                </p>
                <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-5xl">
                  From FRO launch to validated neuroadaptive experiences.
                </h1>
              </div>
              <div className="roadmap-summary-panel" aria-label="Roadmap summary">
                <span>
                  <strong>Target launch capital</strong>
                  ¥30M
                </span>
                <span>
                  <strong>Initial market</strong>
                  Japanese elderly-care facilities
                </span>
                <span>
                  <strong>Long-term category</strong>
                  Validated neuroadaptive experiences
                </span>
              </div>
            </div>
            <p className="roadmap-intro">
              A staged roadmap to establish Persimmon Quest as a Japan-first nonprofit FRO, validate a tri-product neuroadaptive care ecosystem, and build useful aging-brain research infrastructure.
            </p>

            <div className="roadmap-timeline" aria-label="Persimmon Quest roadmap milestones">
              {roadmapSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div className="roadmap-step" key={step.number}>
                    <div className="roadmap-node" aria-hidden="true">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="roadmap-card">
                      <span className="roadmap-index">Step {step.number}</span>
                      <h3>{step.title}</h3>
                      <p>{step.copy}</p>
                      {step.number === "02" ? (
                        <div className="roadmap-mini-flow" aria-label="Tri-product MVP references">
                          <span>qBand</span>
                          <span>qPad</span>
                          <span>qCore</span>
                        </div>
                      ) : null}
                      {step.number === "04" ? (
                        <div className="roadmap-mini-flow roadmap-mini-flow--wide" aria-label="Longitudinal data flow">
                          <span>Daily engagement</span>
                          <span>EEG/fNIRS + speech</span>
                          <span>Edge AI</span>
                          <span>Research dataset</span>
                        </div>
                      ) : null}
                      {step.number === "07" ? (
                        <div className="roadmap-mini-flow roadmap-mini-flow--wide" aria-label="Validated translation path">
                          <span>Nursing homes</span>
                          <span>Clinical validation</span>
                          <span>Beyond facilities</span>
                          <span>Responsible scale</span>
                        </div>
                      ) : null}
                      <span className="roadmap-output">{step.output}</span>
                    </div>
                    {index < roadmapSteps.length - 1 ? <span className="roadmap-connector" aria-hidden="true" /> : null}
                  </div>
                );
              })}
            </div>
          </ScrewFrame>
        </Reveal>
      </section>

      <section id="deploy" className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Reveal>
          <ScrewFrame className="deploy-panel">
            <div className="relative z-10 max-w-3xl">
              <p className="section-label">
                <Layers3 className="h-4 w-4" /> Data layer that starts with us
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-5xl">
                Help us close the brain-data gap holding back aging research.
              </h2>
              <p className="mt-6 text-base font-medium leading-8 text-label">
                Persimmon Quest brings AI-enhanced hardware into nursing homes, transforming everyday interactions into structured signals that help caregivers personalize engagement and researchers better understand lifelong brain wellness.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  className="primary-key"
                  href="https://www.notion.so/siliconjelly/PQ-Data-Room-30e7b6e77f0a81cb8a63d0145a74dd28?source=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Learn More
                </a>
                <Link className="secondary-key" href="/for-clinicians">
                  For Clinicians
                  <MoveRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="deploy-orbit" aria-hidden="true">
              <img className="final-boss-orbit-image final-boss-orbit-image--base" src="/media/final-boss.png" alt="" />
              <img className="final-boss-orbit-image final-boss-orbit-image--accent" src="/media/final-boss-orange.png" alt="" />
            </div>
          </ScrewFrame>
        </Reveal>
      </section>
    </main>
  );
}
