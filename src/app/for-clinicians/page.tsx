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
  title: "Persimmon Quest for Nursing Homes | Neuroadaptive Cognitive Engagement for Japan",
  description:
    "EEG-guided, pachinko-inspired neuroadaptive engagement hardware for Japanese nursing homes, elderly-care facilities, and research-forward clinics."
};

const iconMap = [Activity, ClipboardList, Users, Radio] as const;
const facilityIcons = [Cpu, Users, Activity, Radio, Sparkles, HeartHandshake] as const;

export default function ForCliniciansPage() {
  return (
    <main className="clinician-page min-h-screen overflow-hidden bg-chassis text-ink">
      <section className="clinician-hero mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)] lg:pt-28">
        <Reveal className="relative z-10">
          <p className="section-label">
            <CircleDot className="h-4 w-4 fill-accent text-accent" /> For clinicians and facilities
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-none tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-6xl">
            Turn familiar play into measurable cognitive engagement.
          </h1>
          <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-label">
            Persimmon Quest is developing EEG-informed, pachinko-inspired neuroadaptive sessions for Japanese nursing homes, with the goal of pairing joyful resident engagement with consent-based brain-health research.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a className="primary-key" href="#pilot">
              <Sparkles className="h-4 w-4" />
              Apply for Facility Pilot
            </a>
            <a className="secondary-key" href="#pilot">
              Request a 20-Minute Demo
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
              alt="Japanese elderly residents and care staff using Persimmon Quest qBand Controller, qPad Oasis, and qCore Pillar during supervised cognitive engagement."
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
            <h2>Elderly care needs more than entertainment. It needs measurable engagement.</h2>
            <p>
              Many facilities already offer games, TV, karaoke, and light activities. Most of those interactions disappear after the session ends. Persimmon Quest is exploring how a familiar form of Japanese play could become a structured, sensor-guided research experience.
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

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="clinician-section-heading">
            <p className="section-label">
              <Radio className="h-4 w-4" /> Workflow shift
            </p>
            <h2>Neurofeedback has lived inside labs. We are exploring a path into daily care.</h2>
            <p>
              Traditional neurofeedback and qEEG workflows often required multi-electrode EEG caps, trained operators, and research-grade environments. Persimmon Quest simplifies the resident-facing experience into a comfortable headband and a guided game-like session while the system handles signal capture, session structure, and analytics in the background.
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
                  src="/media/after.avif"
                  alt="Older adult wearing Persimmon Quest qBand Controller while using a guided mobile session."
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
              <h2>Explore a broader view of neural activity.</h2>
              <p>
                The proposed workflow combines EEG-informed signals, cognitive tasks, and staff observations to explore useful research baselines over time.
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
              <h2>Take control, monitor, and customize.</h2>
              <p>
                The facility dashboard concept is designed to help staff review session readiness, completion, engagement patterns, and follow-up tasks from one calm operating surface.
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
              <h2>Combine comfort with precision.</h2>
              <p>
                qBand Controller is intended to feel simple and non-intimidating for elderly residents while supporting supervised exploration of neural signals.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="clinician-feature-media">
              <Image
                src="/media/qband-comfort-and-precision.png"
                alt="Japanese elderly resident wearing Persimmon Quest qBand Controller while reviewing qEEG insights."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="clinician-science-grid">
          <Reveal>
            <ScrewFrame className="clinician-science-card">
              <p className="section-label">
                <Brain className="h-4 w-4" /> Neurofeedback
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
                <Cpu className="h-4 w-4" /> Neuroadaptive learning
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

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="resident-experience">
          <Reveal className="resident-experience__media-stack">
            <div className="clinician-feature-media resident-experience__media">
              <Image
                src="/media/hero-care.png"
                alt="Japanese elderly resident wearing Persimmon Quest qBand Controller while using qPad Oasis in a care facility."
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="resident-experience__image object-cover"
              />
            </div>
            <div className="edge-note resident-edge-note">
              <ShieldCheck className="h-4 w-4" />
              Sensitive session data can be processed closer to the facility, reducing latency and supporting privacy-conscious infrastructure.
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="resident-experience__content">
              <p className="section-label">
                <HeartHandshake className="h-4 w-4" /> Resident experience
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-5xl">
                What residents experience.
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

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="clinician-section-heading">
            <p className="section-label">
              <Building2 className="h-4 w-4" /> Facility value
            </p>
            <h2>What your facility gets.</h2>
            <p>
              Persimmon Quest is developing a Focused Research Organization pathway for Japan-first AI-product R&D in elderly brain health. Proposed pilots are intended to test practical engagement workflows while building consent-based infrastructure for longitudinal neuroscience research.
            </p>
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

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <ScrewFrame className="pilot-workflow-panel">
            <div className="clinician-section-heading">
              <p className="section-label">
                <ClipboardList className="h-4 w-4" /> Pilot workflow
              </p>
              <h2>How a facility pilot works.</h2>
              <p>
                A Persimmon Quest pilot starts with operational fit, staff readiness, resident consent, and facility safety requirements before any session data becomes part of a research workflow.
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
                <ShieldCheck className="h-4 w-4" /> Trust before scale
              </p>
              <h2>Built for trust before scale.</h2>
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
          <ScrewFrame className="pilot-form-panel">
            <div className="pilot-form-copy">
              <p className="section-label">
                <Mail className="h-4 w-4" /> Facility pilot
              </p>
              <h2>Bring neuroadaptive engagement to your facility.</h2>
              <p>
                Join the first wave of Japanese elderly-care partners helping shape a safer, warmer, data-rich future for cognitive wellness.
              </p>
              <p className="clinician-disclaimer">
                Persimmon Quest is developing supervised neuroadaptive engagement technology. Product features may change during pilot development. Not intended to diagnose, treat, cure, or prevent disease.
              </p>
              <p className="form-fallback">
                This form opens your email application. If it does not open, write directly to{" "}
                <a href="mailto:nirjhor.builds@proton.me">nirjhor.builds@proton.me</a>.
              </p>
            </div>
            <form
              className="pilot-form"
              action="mailto:nirjhor.builds@proton.me?subject=Persimmon%20Quest%20Facility%20Pilot%20Application"
              method="post"
              encType="text/plain"
            >
              <input name="Form" type="hidden" value="Persimmon Quest Facility Pilot Application" />
              <label>
                Facility name
                <input name="01 Facility name" type="text" autoComplete="organization" required />
              </label>
              <label>
                Location in Japan
                <input name="02 Location in Japan" type="text" autoComplete="address-level2" required />
              </label>
              <label>
                Facility type
                <select name="03 Facility type" required defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Nursing home</option>
                  <option>Clinic</option>
                  <option>Rehabilitation center</option>
                  <option>Dementia-prevention program</option>
                  <option>Research partner</option>
                </select>
              </label>
              <label>
                Number of residents
                <input name="04 Number of residents" type="number" min="1" inputMode="numeric" />
              </label>
              <label>
                Decision-maker name
                <input name="05 Decision-maker name" type="text" autoComplete="name" required />
              </label>
              <label>
                Email
                <input name="06 Email" type="email" autoComplete="email" required />
              </label>
              <label>
                Phone
                <input name="07 Phone" type="tel" autoComplete="tel" />
              </label>
              <label>
                Interest
                <select name="08 Interest" required defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Demo</option>
                  <option>Pilot</option>
                  <option>Research collaboration</option>
                  <option>Investor or partner</option>
                </select>
              </label>
              <label className="pilot-form__wide">
                Message
                <textarea name="09 Message" rows={5} />
              </label>
              <button className="primary-key pilot-form__submit" type="submit">
                <ArrowUpRight className="h-4 w-4" />
                Apply for Facility Pilot
              </button>
            </form>
          </ScrewFrame>
        </Reveal>
      </section>
    </main>
  );
}
