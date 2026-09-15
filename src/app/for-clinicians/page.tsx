import type { Metadata } from "next";
import Image from "next/image";
import {
  Activity,
  ArrowUpRight,
  Brain,
  Building2,
  Check,
  ChevronDown,
  CircleDot,
  ClipboardList,
  Cpu,
  HeartHandshake,
  Mail,
  MoveRight,
  Radio,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import Reveal from "../components/Reveal";
import { ScrewFrame } from "../components/ui";
import {
  clinicianComparison,
  clinicianEthicsCards,
  clinicianFacilityCards,
  clinicianFaqs,
  clinicianHeroMetrics,
  clinicianLearningLoop,
  clinicianNeedCards,
  clinicianPilotSteps,
  clinicianResidentCards
} from "../data";

export const metadata: Metadata = {
  title: "Persimmon Quest for Nursing Homes | Neuroadaptive Cognitive Engagement for South Korea",
  description:
    "EEG-guided, pachinko-inspired neuroadaptive engagement hardware planned for testing with South Korean nursing homes, elderly-care facilities, and research-forward clinics."
};

const iconMap = [Activity, ClipboardList, Users, Radio] as const;
const facilityIcons = [Cpu, Users, Activity, Radio, Sparkles, HeartHandshake] as const;

export default function ForCliniciansPage() {
  return (
    <main id="main-content" className="clinician-page min-h-screen overflow-hidden bg-chassis text-ink">
      <section className="clinician-hero mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)] lg:pt-28">
        <Reveal className="relative z-10">
          <p className="section-label">
            <CircleDot className="h-4 w-4 fill-accent text-accent" /> For clinicians and facilities
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-none tracking-[-0.04em] sm:text-6xl">
            Meaningful play for everyday care
          </h1>
          <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-label">
            We’re developing guided play for South Korean care facilities, with a planned path toward greater Northeast Asia and APAC, connecting resident engagement with consent-based brain research
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a className="primary-key" href="#pilot">
              <Sparkles className="h-4 w-4" />
              Explore a facility pilot
            </a>
            <a className="secondary-key" href="/connect">
              Try the experience
              <MoveRight className="h-4 w-4" />
            </a>
          </div>
          <p className="clinician-disclaimer mt-7">
            Designed for supervised wellness, research, and elderly-care engagement. Not a diagnostic or treatment device.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ScrewFrame className="clinician-hero-visual">
            <Image
              src="/media/care-facility.png"
              alt="Elderly residents and care staff using Persimmon Quest qBand Air, qPad One, and qCore Pillar during supervised cognitive engagement."
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover"
            />
            <div className="clinician-hero-metrics" aria-label="Persimmon Quest pilot signals">
              {clinicianHeroMetrics.map((metric) => (
                <span key={metric}>
                  <span className="status-led status-led--green" aria-hidden="true" />
                  {metric}
                </span>
              ))}
            </div>
          </ScrewFrame>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="clinician-section-heading">
            <p className="section-label">
              <Building2 className="h-4 w-4" /> Facility need
            </p>
            <h2>Everyday engagement, lasting insight</h2>
            <p>
              We’re exploring how familiar activities can help care teams understand participation over time
            </p>
          </div>
        </Reveal>
        <div className="clinician-card-grid clinician-card-grid--four">
          {clinicianNeedCards.map(([title, copy], index) => {
            const Icon = iconMap[index];
            return (
              <Reveal key={title} delay={index * 50}>
                <ScrewFrame className="clinician-info-card">
                  <div className="icon-housing">
                    <Icon className="h-6 w-6 text-accent" strokeWidth={1.8} />
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </ScrewFrame>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="care-workflow" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="clinician-section-heading">
            <p className="section-label">
              <Radio className="h-4 w-4" /> Workflow shift
            </p>
            <h2>From the lab to daily care</h2>
            <p>
              A comfortable headband and guided activities are at the center of our proposed care workflow. Staff support setup, consent, and each session.
            </p>
          </div>
        </Reveal>
        <div className="clinician-comparison-grid">
          <Reveal>
            <ScrewFrame className="comparison-card">
              <div className="comparison-media">
                <Image
                  src="/media/before.avif"
                  alt="Traditional EEG setup with multiple electrodes and clinical equipment."
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover grayscale"
                />
              </div>
              <p className="section-label">Traditional setup</p>
              <ul>
                {clinicianComparison.oldWay.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ScrewFrame>
          </Reveal>
          <Reveal delay={80}>
            <ScrewFrame className="comparison-card comparison-card--active">
              <div className="comparison-media">
                <Image
                  src="/media/sleep on it.png"
                  alt="A person resting comfortably while wearing a soft qBand headband"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="section-label">Persimmon Quest setup</p>
              <ul>
                {clinicianComparison.pqWay.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ScrewFrame>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="clinician-feature-row">
          <Reveal>
            <div className="clinician-feature-copy">
              <p className="section-label">
                <Brain className="h-4 w-4" /> Brain assessment
              </p>
              <h2>A broader view of neural activity</h2>
              <p>
                The proposed workflow combines EEG-informed signals, cognitive tasks, and staff observations to explore useful research baselines over time
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="clinician-feature-media">
              <Image
                src="/media/neural-assessment-dashboard.png"
                alt="qEEG brain map dashboard showing eyes-open and eyes-closed activity for elderly-care research."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="clinician-feature-row clinician-feature-row--reverse">
          <Reveal>
            <div className="clinician-feature-copy">
              <p className="section-label">
                <ClipboardList className="h-4 w-4" /> Staff dashboard
              </p>
              <h2>A clear view for care teams</h2>
              <p>
                A dashboard concept for session readiness, participation, and follow-up tasks
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="clinician-feature-media">
              <Image
                src="/media/clinician-monitoring-dashboard.png"
                alt="Persimmon Quest clinician dashboard showing live EEG session channels and engagement analytics."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="clinician-feature-row">
          <Reveal>
            <div className="clinician-feature-copy">
              <p className="section-label">
                <ShieldCheck className="h-4 w-4" /> Comfort with precision
              </p>
              <h2>Comfort by design</h2>
              <p>
                qBand Air is intended to feel simple and non-intimidating for elderly residents while supporting supervised exploration of neural signals
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="clinician-feature-media">
              <Image
                src="/media/qband-comfort-and-precision.png"
                alt="Elderly resident wearing Persimmon Quest qBand Air while reviewing qEEG insights."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="personal-learning" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="clinician-science-grid">
          <Reveal>
            <ScrewFrame className="clinician-science-card">
              <p className="section-label">
                <Brain className="h-4 w-4" /> Cognition builds narrative
              </p>
              <h2>What is neurofeedback?</h2>
              <p>
                Neurofeedback is a form of EEG-based brain training. Sensors measure brainwave activity in real time. When the user's brain activity moves toward a target pattern, the system gives gentle feedback through visuals, sound, or gameplay. Over repeated sessions, this feedback loop may help users practice self-regulation.
              </p>
              <div className="analogy-card">
                Like physical exercise gives feedback to muscles, neurofeedback gives feedback to the brain. The resident does not need to understand brainwaves. They simply participate in a guided activity while the system responds to their brain signals.
              </div>
              <p className="clinician-disclaimer">
                Persimmon Quest is currently positioned for supervised engagement, wellness, and research workflows. It should not be presented as a cure or replacement for medical treatment.
              </p>
            </ScrewFrame>
          </Reveal>
          <Reveal delay={80}>
            <ScrewFrame className="clinician-science-card">
              <p className="section-label">
                <Cpu className="h-4 w-4" /> Your personal algorithm
              </p>
              <h2>What is neuroadaptive learning?</h2>
              <p>
                Neuroadaptive learning means an experience can change based on a user's brain and behavior. Persimmon Quest is researching how qBand signals and qCore processing could eventually inform session difficulty, pace, and feedback style without overstimulation.
              </p>
              <div className="clinician-loop">
                {clinicianLearningLoop.map(([number, title, copy]) => (
                  <div className="loop-step" key={number}>
                    <span>{number}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrewFrame>
          </Reveal>
        </div>
      </section>

      <section id="resident-experience" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="resident-experience">
          <Reveal className="resident-experience__media-stack">
            <div className="clinician-feature-media resident-experience__media">
              <Image
                src="/media/hero-care.png"
                alt="Elderly resident wearing Persimmon Quest qBand Air while using qPad One in a care facility."
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="resident-experience__image object-cover"
              />
            </div>
            <div className="edge-note resident-edge-note">
              <ShieldCheck className="h-4 w-4" />
              Our edge-processing approach aims to keep sensitive session data closer to the facility
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="resident-experience__content">
              <p className="section-label">
                <HeartHandshake className="h-4 w-4" /> Longevity care as a service
              </p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                Designed around residents
              </h2>
              <div className="resident-card-grid">
                {clinicianResidentCards.map(([title, copy]) => (
                  <div className="resident-card" key={title}>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="monarch" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="monarch-feature">
            <div className="clinician-section-heading monarch-copy">
              <p className="section-label">
                <Building2 className="h-4 w-4" /> Facility value
              </p>
              <h2>Empower the residents</h2>
              <p>Set agents for consent-based monitoring and care workflow management with Monarch EHR suite</p>
            </div>
            <div className="monarch-stage">
              <img className="monarch-butterflies" src="/media/funky neon monarch.png" width="500" height="473" alt="" aria-hidden="true" loading="lazy" />
              <img className="monarch-package" src="/media/Monarch.png" width="531" height="470" alt="Monarch EHR suite package — Wings for cognitive care" loading="lazy" />
            </div>
          </div>
        </Reveal>
        <div className="clinician-card-grid clinician-card-grid--three">
          {clinicianFacilityCards.map(([title, copy], index) => {
            const Icon = facilityIcons[index];
            return (
              <Reveal key={title} delay={index * 45}>
                <ScrewFrame className="clinician-info-card">
                  <div className="icon-housing">
                    <Icon className="h-6 w-6 text-accent" strokeWidth={1.8} />
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </ScrewFrame>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="pilot-workflow" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <ScrewFrame className="pilot-workflow-panel">
            <div className="clinician-section-heading">
              <p className="section-label">
                <ClipboardList className="h-4 w-4" /> Hire us
              </p>
              <h2>A pilot, step by step</h2>
              <p>
                Contact us to check your facility's operational fit, staff readiness, resident consent planning, and facility safety requirements before we can setup our ecosystem. Fill out{" "}
                <a className="pq-inline-link" href="https://forms.gle/kzbuLfF125qkUYC19" target="_blank" rel="noopener noreferrer">this form</a>
              </p>
            </div>
            <div className="pilot-step-grid">
              {clinicianPilotSteps.map(([number, title, copy]) => (
                <div className="pilot-step" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </ScrewFrame>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <ScrewFrame className="ethics-panel">
            <div className="ethics-copy">
              <p className="section-label section-label--dark">
                <ShieldCheck className="h-4 w-4" /> Research ethics
              </p>
              <h2>Trust before scale</h2>
              <p>
                Elderly brain data must be handled with care. Persimmon Quest communicates privacy, consent, staff supervision, and research ethics clearly from the first demo.
              </p>
              <strong>
                Persimmon Quest does not operate as gambling. The pachinko-like UX is redesigned as a supervised cognitive engagement interface with no betting, no prizes, and no monetary reward loop.
              </strong>
            </div>
            <div className="ethics-grid">
              {clinicianEthicsCards.map((item) => (
                <span key={item}>
                  <Check className="h-4 w-4" />
                  {item}
                </span>
              ))}
            </div>
          </ScrewFrame>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="clinician-section-heading clinician-section-heading--center">
            <p className="section-label justify-center">
              <CircleDot className="h-4 w-4 fill-accent text-accent" /> Common questions
            </p>
            <h2>Still have questions?</h2>
          </div>
        </Reveal>
        <div className="faq-stack">
          {clinicianFaqs.map(([question, answer], index) => (
            <Reveal key={question} delay={index * 35}>
              <details className="faq-item" open={index === 0}>
                <summary>
                  <span>{question}</span>
                  <span className="faq-toggle" aria-hidden="true">
                    <ChevronDown className="h-5 w-5" />
                  </span>
                </summary>
                <p>{answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="pilot" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <ScrewFrame className="clinician-pilot-invitation">
            <div>
              <p className="section-label"><Mail className="h-4 w-4" /> Build with us</p>
              <h2>Help shape a facility pilot</h2>
              <p>Tell us about your residents, care team, and goals for a pilot</p>
            </div>
            <a className="primary-key" href="/contact#contact-form">Discuss a facility pilot <ArrowUpRight className="h-4 w-4" /></a>
          </ScrewFrame>
        </Reveal>
      </section>
    </main>
  );
}
