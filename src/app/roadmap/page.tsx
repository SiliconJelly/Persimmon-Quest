import type { Metadata } from "next";
import { ArrowUpRight, FlaskConical, Layers3 } from "lucide-react";
import Reveal from "../components/Reveal";
import { roadmapSteps } from "../data";
import { ScrewFrame } from "../components/ui";

export const metadata: Metadata = {
  title: "Persimmon Quest Roadmap | Brain Health & Longevity",
  description:
    "The Persimmon Quest roadmap from US incorporation and dementia-care pilots to EEG applications and longevity research."
};

export default function RoadmapPage() {
  return (
    <main id="main-content" className="min-h-screen bg-chassis text-ink">
      <section id="roadmap" className="mx-auto max-w-7xl px-5 py-32 sm:px-8">
        <Reveal>
          <ScrewFrame className="roadmap-panel">
            <div className="roadmap-header">
              <div>
                <p className="section-label">
                  <FlaskConical className="h-4 w-4" /> Sustainable, product-driven research
                </p>
                <h1 className="mt-4 max-w-3xl text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                  Redefining brain health is our main quest
                </h1>
              </div>
              <div className="roadmap-summary-panel" aria-label="Roadmap summary">
                <span>
                  <strong>Initial market</strong>
                  Dementia-care facilities
                </span>
                <span>
                  <strong>Long-term category</strong>
                  Validated neuroadaptive experiences
                </span>
              </div>
            </div>
            <p className="roadmap-intro">
              Partner with us to bring neuroscience to a personal level.
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
                <Layers3 className="h-4 w-4" /> Research, together
              </p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                Help close the aging research gap
              </h2>
              <p className="mt-6 text-base font-medium leading-8 text-label">
                Help turn everyday care into useful research through thoughtful devices, responsible data collection, and collaboration
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  className="primary-key"
                  href="https://www.notion.so/siliconjelly/PQ-Data-Room-30e7b6e77f0a81cb8a63d0145a74dd28?source=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Explore the research
                </a>
              </div>
            </div>
          </ScrewFrame>
        </Reveal>
      </section>
    </main>
  );
}
