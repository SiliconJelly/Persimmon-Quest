import {
  Activity,
  ArrowUpRight,
  Boxes,
  BrainCircuit,
  Building2,
  Check,
  ChevronDown,
  CircleDot,
  Cpu,
  Gauge,
  Mail,
  Layers3,
  LockKeyhole,
  MoveRight,
  Radio,
  Sparkles,
  TabletSmartphone,
  UsersRound,
  Zap
} from "lucide-react";

const products = [
  {
    id: "PQ-SENSOR",
    name: "qBand Controller",
    type: "Input signal device",
    icon: BrainCircuit,
    iconImage: "/media/qband-sensor-icon.png",
    visual: "console",
    copy: "A lightweight BCI headband designed to be the primary interface for PQ care ecosystem. By continuously capturing natural brain data streams, qAura functions as an intuitive controller that drives our games and virtual activities.",
    more: "This engineered virtual reality experience automatically shapes itself to the user's exact cognitive threshold in real time—stimulating neuroplasticity and focus without inducing stress.",
    stats: ["8ms sensor relay", "24/7 triage", "FHIR-ready"]
  },
  {
    id: "PQ-APPLIANCE",
    name: "qPad Oasis",
    type: "Room intelligence",
    icon: TabletSmartphone,
    visual: "scanner",
    copy: "A medical-grade cabin stationary. Far more than a standard consumer tablet, the qPad functions as a dedicated, low-latency mobile device to continuously monitor, assist, and elderly residents right from their bedside.",
    more: "Equipped with localized multi-modal processing capabilities, the hardware brings ambient room intelligence to the modern care facility. Continuously evaluating acoustic biomarkers during everyday use, seamlessly bridging raw conversational inputs into the localized electronic health record (EHR) scribe architecture without generating clinical overhead or violating user privacy.",
    stats: ["Sterile shell", "Auto-calibrated", "Eye trackability"]
  },
  {
    id: "PQ-GATEWAY",
    name: "qCore Pillar",
    type: "Autonomous processing unit",
    icon: Boxes,
    visual: "rover",
    copy: "A heavy-duty, edge-compute server that functions as the centralized operational centerpiece for the modern care facility. Purpose-built to handle intense localized computing overhead, this compact powerhouse eliminates cloud dependency, ensuring zero-latency feedback loops and absolute APPI medical data privacy by processing all resident biometric streams entirely on-premise.",
    more: "By integrating our on-site edge compute layer with PQ laboratory's proprietary predictive models and multi-modal architectures, we can validate personalized neuroadaptive feedback loops against gold-standard clinical benchmarks in real time. This dual-GPU multimodal architecture takes geriatric data collection from sparse annual clinical checkups to dense, daily temporal time-series. The PQ ecosystem continuously captures multi-modal acoustic, semantic, and electrophysiological biomarkers during relaxed, zero-friction interactions.",
    stats: ["Lift dock", "UV chamber", "Route memory"]
  }
];

const systemCards = [
  {
    icon: Cpu,
    title: "Agentic Workflow",
    copy: "Local processing keeps patient-room events responsive even during network degradation.",
    status: "Module ready"
  },
  {
    icon: Gauge,
    title: "Hardware Accelerated",
    copy: "A central status wall prioritizes bay turnover, supply levels, and escalations.",
    status: "Module ready"
  },
  {
    icon: LockKeyhole,
    title: "APPI Compliance",
    copy: "Hardware identity, audit trails, and permission layers are part of the visual architecture.",
    status: "Module ready"
  },
  {
    icon: TabletSmartphone,
    title: "End-to-End",
    copy: "Complete, integrated system to assist clinicians and researchers that spans from manufacturing to patient monitoring data infrastructure.",
    status: "END-TO-END"
  }
];

const facilitySteps = [
  ["01", "Sense", "Continuous room, bed, and device telemetry is captured at the edge."],
  ["02", "Verify", "Clinical rules, device health, and patient context reconcile before alerts move."],
  ["03", "Dispatch", "Tasks route to the right surface: console, tablet, bay, or operations board."],
  ["04", "Document", "Every action leaves an auditable trail for care teams and facility operators."]
];

const specs = [
  ["Facility latency", "< 12ms"],
  ["Device uptime target", "99.95%"],
  ["Care surfaces", "18+"],
  ["Deployment mode", "Hybrid edge"]
];

const teamMembers = [
  {
    name: "Nirjhor",
    role: "Founder, CEO",
    avatar: "/media/team-nirjhor.png",
    copy: "Lead technical architect behind Persimmon Quest's edge AI systems, foundation model development, and Japan-compliant research infrastructure on blockchain."
  },
  {
    name: "Dr. Yana",
    role: "Head of Research",
    avatar: "/media/team-yana.png",
    copy: "Directing clinical trial design, neuroadaptive modeling, and cognitive exercise engineering for Persimmon Quest's medical device development."
  }
];

const faqs = [
  [
    "What is Persimmon Quest?",
    "Persimmon Quest is building an immersive neurotech platform for elderly care, transforming familiar gameplay interactions into healthier, neuroadaptive experiences that support engagement, focus, and long-term brain health research."
  ],
  [
    "Is Persimmon Quest a gambling product?",
    "No. We are not building a gambling product. We are reimagining the familiar interaction patterns of pachinko-style gameplay into a safer, research-oriented, non-extractive experience designed for elderly engagement and cognitive wellness."
  ],
  [
    "Who is this platform for?",
    "Our first users are elderly residents in Japanese nursing homes and care facilities. The platform is also designed to support caregivers, researchers, clinicians, and long-term partners working in aging brain health."
  ],
  [
    "Are you pre-revenue?",
    "Yes, Persimmon Quest is currently pre-revenue. We are focused on validating the MVP, building research partnerships, and preparing for pilot deployments with elderly care facilities in Japan."
  ],
  [
    "What is your roadmap?",
    "Our roadmap begins with a focused MVP: a neuroadaptive gameplay kiosk, a lightweight EEG/headband integration, and a simple analytics dashboard. From there, we plan to run pilot programs in nursing homes, collect longitudinal engagement and brain-health data, refine therapeutic protocols, and expand into a broader Persimmon OS ecosystem."
  ],
  [
    "What makes Persimmon Quest different?",
    "Instead of treating elderly entertainment, care, and research as separate worlds, Persimmon Quest connects them into one adaptive ecosystem. The goal is to make everyday engagement measurable, therapeutic, and useful for long-term aging brain research."
  ],
  [
    "Are you looking for partners or investors?",
    "Yes. We are interested in speaking with nursing home operators, neuroscience researchers, healthcare partners, game designers, and early investors who are aligned with our Japan-first neurotech vision."
  ]
];

function ProductVisual({ type }: { type: string }) {
  return (
    <div className={`product-visual product-visual--${type}`} aria-hidden="true">
      <div className="visual-shadow" />
      <div className="visual-base" />
      <div className="visual-screen">
        <span />
        <span />
        <span />
      </div>
      <div className="visual-led" />
      <div className="visual-arm" />
      <div className="visual-dial" />
    </div>
  );
}

function ScrewFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`screw-frame ${className}`}>{children}</div>;
}

function LedLabel({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "orange" | "red" | "blue" }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-3 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-label shadow-recessed">
      <span className={`status-led status-led--${tone}`} />
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-chassis text-ink">
      <div className="noise-layer" />
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/50 bg-chassis/78 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-3.5" aria-label="Persimmon Quest home">
            <span className="nav-logo-shell">
              <img className="nav-logo-mark" src="/media/logo_3d.svg" alt="" aria-hidden="true" />
            </span>
            <span className="brand-copy">
              <span className="brand-title">Persimmon Quest</span>
              <span className="brand-subtitle">Pro aging neurotech OS for Japan</span>
            </span>
          </a>
          <div className="hidden items-center gap-2 lg:flex">
            {[
              ["Product", "#showcase"],
              ["Facility", "#facility"],
              ["Systems", "#systems"],
              ["Team", "#team"],
              ["Deploy", "#deploy"]
            ].map(([item, href]) => (
              <a className="nav-key" href={href} key={item}>
                {item}
              </a>
            ))}
          </div>
          <a className="primary-key hidden sm:inline-flex" href="#deploy">
            <Zap className="h-4 w-4" />
            Invest in Us
          </a>
        </div>
      </nav>

      <section id="top" className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[minmax(0,1.34fr)_minmax(22rem,0.66fr)] lg:gap-8 lg:pt-24 xl:grid-cols-[minmax(0,1.3fr)_minmax(28rem,0.7fr)]">
        <div className="relative z-10">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <LedLabel>Intelligent EEG Analytics</LedLabel>
            <span className="rounded-full px-3 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-label shadow-recessed">
              Longevity UX for Japan
            </span>
          </div>
          <h1 className="hero-title max-w-4xl font-black tracking-normal text-ink drop-shadow-[0_1px_0_#ffffff]">
            Reimagining the Virtual Reality. But This Time for the Aging Brains.
          </h1>
          <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-label">
            Persimmon Quest transforms familiar pachinko-style activity into brain-signal-powered neurogaming for nursing homes. Our AI-enhanced environment support seniors&apos; focus and cognitive wellness while converting their everyday engagement into a continuous data pipeline for global computational neuroscience research.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a className="primary-key" href="#showcase">
              <Sparkles className="h-4 w-4" />
              View Showcase
            </a>
            <a className="secondary-key" href="#facility">
              Operating System
              <MoveRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {specs.map(([label, value]) => (
              <div className="rounded-2xl bg-chassis p-4 shadow-card" key={label}>
                <p className="font-mono text-xl font-bold tracking-normal text-ink">{value}</p>
                <p className="mt-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.08em] text-label">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <ScrewFrame className="hero-device">
          <div className="device-rack">
            <div className="device-bezel">
              <div className="device-screen">
                <div className="scanlines" />
                <div className="screen-topline">
                  <LedLabel tone="orange">PQ CORE</LedLabel>
                  <span>08:24:16</span>
                </div>
                <div className="body-scan" />
                <div className="screen-grid">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="device-controls">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="rack-foot rack-foot--left" />
            <div className="rack-foot rack-foot--right" />
          </div>
        </ScrewFrame>
      </section>

      <section id="showcase" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="section-label"><CircleDot className="h-4 w-4 fill-accent text-accent" /> The Quest Ecosystem For</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-5xl">
              Game-style medical equipment reveals, built for render replacement.
            </h2>
          </div>
          <p className="max-w-md text-base font-medium leading-7 text-label">
            Each panel behaves like a product selection module: tactile casing, status LEDs, telemetry tags, and a clear slot for photoreal 3D device files.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <ScrewFrame className="product-card group" key={product.id}>
                <div className="mb-5 flex items-start justify-between">
                  <div className="icon-housing product-icon-housing">
                    {"iconImage" in product ? (
                      <img className="product-icon-image" src={product.iconImage} alt="" aria-hidden="true" />
                    ) : (
                      <Icon className="product-lucide-icon h-7 w-7 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" strokeWidth={1.9} />
                    )}
                  </div>
                  <span className="rounded-full px-3 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-label shadow-recessed">
                    {product.id}
                  </span>
                </div>
                <ProductVisual type={product.visual} />
                <p className="mt-7 font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-accent">{product.type}</p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-normal">{product.name}</h3>
                <div className="product-copy">
                  <p className="product-copy-main">{product.copy}</p>
                  <details className="learn-more">
                    <summary>Learn more</summary>
                    <p>{product.more}</p>
                  </details>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.stats.map((stat) => (
                    <span className="rounded-lg px-3 py-2 font-mono text-[0.64rem] font-bold uppercase tracking-[0.06em] text-label shadow-recessed" key={stat}>
                      {stat}
                    </span>
                  ))}
                </div>
              </ScrewFrame>
            );
          })}
        </div>
      </section>

      <section id="facility" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <ScrewFrame className="facility-panel">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-label"><Building2 className="h-4 w-4" /> Facility operating loop</p>
              <h2 className="mt-4 text-4xl font-black tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-5xl">
                Clinical spaces wired like dependable machinery.
              </h2>
              <p className="mt-6 max-w-xl text-base font-medium leading-8 text-label">
                The site structure supports the story we need later: every device is a physical module in a larger facility grid, not an isolated product tile.
              </p>
            </div>
            <div className="facility-steps">
              {facilitySteps.map(([number, title, copy], index) => (
                <div className="step-module" key={number}>
                  <div className="step-node">{number}</div>
                  {index < facilitySteps.length - 1 ? <div className="step-pipe" /> : null}
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrewFrame>
      </section>

      <section id="systems" className="mx-auto grid max-w-7xl gap-6 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <ScrewFrame className="dark-panel">
          <p className="section-label section-label--dark"><Radio className="h-4 w-4" /> Longitudinal brain health research</p>
          <div className="radar-display">
            <div className="radar-sweep" />
            <span className="radar-dot radar-dot--one" />
            <span className="radar-dot radar-dot--two" />
            <span className="radar-dot radar-dot--three" />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              ["Neuroadaptive Games", "128"],
              ["Ontological Layers", "04"],
              ["Decentralized Swarm Agents", "17"],
              ["Operating System", "01"]
            ].map(([label, value]) => (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sharp" key={label}>
                <p className="font-mono text-3xl font-bold text-white">{value}</p>
                <p className="mt-2 font-mono text-[0.65rem] font-bold uppercase leading-snug tracking-[0.08em] text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </ScrewFrame>
        <div className="grid gap-6 sm:grid-cols-2">
          {systemCards.map(({ icon: Icon, title, copy, status }) => {
            const LucideIcon = Icon as typeof Activity;
            return (
              <ScrewFrame className="system-card group" key={title}>
                <div className="icon-housing">
                  <LucideIcon className="h-7 w-7 text-accent transition-transform duration-300 group-hover:rotate-12" strokeWidth={1.7} />
                </div>
                <h3 className="mt-6 text-xl font-extrabold tracking-normal">{title}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-label">{copy}</p>
                <div className="mt-6 flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.08em] text-label">
                  <Check className="h-4 w-4 text-accent" /> {status}
                </div>
              </ScrewFrame>
            );
          })}
        </div>
      </section>

      <section id="team" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="section-label"><UsersRound className="h-4 w-4" /> Founding team</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-5xl">
              The Minds Behind Persimmon Quest
            </h2>
          </div>
          <p className="max-w-lg text-base font-medium leading-7 text-label">
            A small, research-driven founding team building the neuroadaptive care infrastructure for Japan's aging society.
          </p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <ScrewFrame className="team-card group" key={member.name}>
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
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="section-label justify-center"><CircleDot className="h-4 w-4 fill-accent text-accent" /> Partner clarity</p>
          <h2 className="mt-4 text-4xl font-black tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-label">
            Everything early partners, nursing homes, researchers, and investors usually ask about Persimmon Quest.
          </p>
        </div>
        <div className="faq-stack">
          {faqs.map(([question, answer], index) => (
            <details className="faq-item" key={question} open={index === 0}>
              <summary>
                <span>{question}</span>
                <span className="faq-toggle" aria-hidden="true">
                  <ChevronDown className="h-5 w-5" />
                </span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="newsletter" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <ScrewFrame className="newsletter-panel">
          <div className="newsletter-copy">
            <p className="section-label"><Mail className="h-4 w-4" /> Build notes</p>
            <h2 className="mt-4 text-4xl font-black tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-5xl">
              Follow the Persimmon Quest Build Journey
            </h2>
          </div>
          <div className="newsletter-embed" aria-label="Persimmon Quest Substack subscription">
            <iframe
              src="https://siliconjelly.substack.com/embed?transparent=1"
              width="480"
              height="360"
              style={{ border: 0, background: "transparent" }}
              frameBorder="0"
              scrolling="no"
              title="Subscribe to Silicon Jelly on Substack"
            />
          </div>
        </ScrewFrame>
      </section>

      <section id="deploy" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <ScrewFrame className="deploy-panel">
          <div className="relative z-10 max-w-3xl">
            <p className="section-label"><Layers3 className="h-4 w-4" /> Data layer that starts with us</p>
            <h2 className="mt-4 text-4xl font-black tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-5xl">
              Help us close the brain-data gap holding back aging research.
            </h2>
            <p className="mt-6 text-base font-medium leading-8 text-label">
              Persimmon Quest brings AI-enhanced hardwares beside nursing home beds. Capturing the power of your thoughts and transforming everyday interactions into clinically meaningful signals that help caregivers to personalize care, clinicians to detect changes earlier, and researchers to better understand lifelong brain wellness. Finally, giving seniors a healthier, more dignified way to live and experience technology.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a className="primary-key" href="https://www.notion.so/siliconjelly/PQ-Data-Room-30e7b6e77f0a81cb8a63d0145a74dd28?source=copy_link" target="_blank" rel="noopener noreferrer">
                <ArrowUpRight className="h-4 w-4" />
                Learn More
              </a>
              <a className="secondary-key" href="#top">
                Return Top
              </a>
            </div>
          </div>
          <div className="deploy-orbit" aria-hidden="true">
            <img className="vitruvian-orbit-image" src="/media/Vitruvian_particular.jpeg" alt="" />
          </div>
        </ScrewFrame>
      </section>

      <footer className="mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-8">
        <div className="site-footer">
          <div className="footer-bottom">
            <nav className="footer-links footer-links--formal" aria-label="Formal links">
              <span className="status-led status-led--green" aria-hidden="true" />
              <a href="#top">Privacy Policy</a>
              <a href="#top">Terms</a>
              <a href="mailto:hello@persimmon.quest">Contact</a>
            </nav>
            <span>© 2026 Persimmon Quest. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
