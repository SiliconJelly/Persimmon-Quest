import {
  Building2,
  CircuitBoard,
  DatabaseZap,
  Globe2,
  HandCoins,
  HousePlug,
  Network
} from "lucide-react";

export type ProductIconKey = "brain" | "tablet" | "boxes";

export type Product = {
  id: string;
  name: string;
  type: string;
  iconKey: ProductIconKey;
  iconImage?: string;
  frame1: string;
  frame2: string;
  stagePosition: string;
  stageScale: number;
  copy: string[];
  more: string[];
  stats: string[];
};

export const products: Product[] = [
  {
    id: "PQ-SENSOR",
    name: "qBand Controller",
    type: "Input signal device",
    iconKey: "brain",
    iconImage: "/media/qband-sensor-icon.png",
    frame1: "/media/product-qband-1.jpeg",
    frame2: "/media/product-qband-2.jpeg",
    stagePosition: "center 42%",
    stageScale: 1.08,
    copy: [
      "Lightweight multisensor headband designed for daily use inside elderly-care facilities.",
      "Designed to capture brain-signal patterns and interaction responses during guided activities.",
      "Works as the primary input device for PQ games, tablets, and edge-computing systems.",
      "Aims to turn routine play and cognitive tasks into structured, consent-based research signals."
    ],
    more: [
      "qBand Controller is the proposed resident-facing signal layer of the Persimmon Quest ecosystem. The concept explores how consent-based signal collection could become part of natural interaction: games, focus tasks, video calls, and guided care activities.",
      "When connected to qPad Oasis and qCore Pillar, qBands become more than wearables. They transform into an adaptive input system for neurogaming, cognitive engagement, and an anchor point for global brain-health research. Each session can generate synchronized behavioral and EEG-informed signals, helping researchers create time-series brain models to study attention, fatigue, engagement, and response patterns in real-world elderly-care environments."
    ],
    stats: ["Prototype concept", "Supervised sessions", "Consent-first"]
  },
  {
    id: "PQ-APPLIANCE",
    name: "qPad Oasis",
    type: "Room intelligence",
    iconKey: "tablet",
    frame1: "/media/product-qpad-1.jpeg",
    frame2: "/media/product-qpad-2.jpeg",
    stagePosition: "center 48%",
    stageScale: 1.02,
    copy: [
      "Dedicated bedside tablet for nursing homes, clinics, and assisted-living rooms.",
      "Connects residents, caregivers, family members, and PQ neurogaming activities through one calm interface.",
      "Designed to capture interaction data such as task response, speech activity, engagement, and session behavior.",
      "Bridges daily care moments into the facility’s local research and monitoring ecosystem."
    ],
    more: [
      "qPad Oasis is the proposed room-level interface of Persimmon Quest. It is intended to give residents a familiar, low-friction access point for cognitive games, family communication, guided activities, and caregiver support.",
      "The tablet connects with qBand Controller and qCore Pillar to create a continuous feedback loop between the resident, the care team, and the research system. During everyday use, qPad can help organize behavioral signals, voice-based interaction patterns, session history, and engagement trends into structured local records for future brain-health research and care optimization."
    ],
    stats: ["Guided workflow", "Care-room concept", "Family connection"]
  },
  {
    id: "PQ-GATEWAY",
    name: "qCore Pillar",
    type: "Autonomous processing unit",
    iconKey: "boxes",
    frame1: "/media/product-qcore-1.jpeg",
    frame2: "/media/product-qcore-2.jpeg",
    stagePosition: "center 50%",
    stageScale: 1.05,
    copy: [
      "On-premise edge-compute unit designed to power the full PQ facility ecosystem.",
      "Processes EEG-informed, behavioral, acoustic, and interaction data locally inside the care facility.",
      "Reduces cloud dependency while supporting low-latency feedback for neuroadaptive applications.",
      "Creates the secure data backbone for product-driven brain-health research and facility-level analytics."
    ],
    more: [
      "qCore Pillar is the proposed computational backbone of the Persimmon Quest ecosystem. It is designed to connect qBand Controller, qPad Oasis, and facility applications into one local intelligence layer. The edge-first direction aims to reduce unnecessary cloud transfers and give facilities more operational control.",
      "For research-driven facilities, qCore is intended to help turn scattered daily interactions into structured research datasets. The concept prioritizes facility control, privacy-conscious infrastructure, and a practical path toward future validation."
    ],
    stats: ["Edge-first concept", "Local processing", "Research infrastructure"]
  }
];

export const clinicianHeroMetrics = [
  "Proposed EEG session",
  "Engagement research",
  "Consent-first signals",
  "Family connection concept",
  "qCore + qBand ecosystem"
] as const;

export const clinicianNeedCards = [
  [
    "Resident engagement",
    "A familiar, low-friction activity designed to feel enjoyable rather than clinical."
  ],
  [
    "Staff visibility",
    "Session summaries help staff understand participation patterns without adding heavy workflow."
  ],
  [
    "Family connection",
    "Remote multiplayer moments allow residents to play with children or grandchildren."
  ],
  [
    "Research-ready data",
    "With appropriate consent and validation, EEG-informed signals could support longitudinal aging-brain research."
  ]
] as const;

export const clinicianComparison = {
  oldWay: [
    "Many electrodes",
    "Specialist setup",
    "Lab or clinic visit",
    "Expensive equipment",
    "Hard to repeat frequently",
    "Difficult for nursing homes to scale"
  ],
  pqWay: [
    "Simple qBand Controller",
    "qCore Pillar edge device",
    "Guided tablet workflow",
    "Familiar pachinko-inspired interaction",
    "Staff-friendly sessions",
    "Longitudinal research signals"
  ]
} as const;

export const clinicianLearningLoop = [
  ["01", "Sense", "qBand is designed to capture EEG-informed signals."],
  ["02", "Adapt", "qCore is intended to inform game response and session flow."],
  ["03", "Engage", "Resident plays a familiar pachinko-inspired neurogame."],
  ["04", "Learn", "Staff review trends and session summaries."]
] as const;

export const clinicianResidentCards = [
  [
    "Familiar play",
    "A Japanese-inspired game interaction that feels intuitive, nostalgic, and enjoyable."
  ],
  [
    "Gentle challenge",
    "The session adapts to attention and relaxation patterns instead of forcing one fixed difficulty."
  ],
  [
    "Family multiplayer",
    "Residents can play connected sessions with family members, creating emotional participation."
  ],
  [
    "Progress snapshots",
    "Simple visual summaries help residents and families understand participation over time."
  ]
] as const;

export const clinicianFacilityCards = [
  ["Pilot-oriented prototypes", "qBand Controller, qCore Pillar, and qPad Oasis designed around guided sessions."],
  ["Staff onboarding", "Simple workflows for placing the headband, starting sessions, and reviewing results."],
  ["Facility dashboard concept", "A proposed view of aggregate engagement trends and session completion."],
  ["Research collaboration pathway", "Consent-based data structure designed for future collaboration with neuroscience labs."],
  ["Differentiation", "Position your facility as an early adopter in Japan-first brain-health innovation."],
  ["Family communication", "Use session snapshots and multiplayer moments to make care feel more connected."]
] as const;

export const clinicianPilotSteps = [
  ["01", "Discovery call", "We understand your facility size, resident profile, staff workflow, and safety requirements."],
  ["02", "Prototype setup", "We prepare the proposed qCore, qBand, and qPad workflow for the agreed pilot scope."],
  ["03", "Staff training", "Care staff learn how to run short supervised sessions."],
  ["04", "Guided sessions", "Residents participate in scheduled neuroadaptive gameplay."],
  ["05", "Review findings", "Facility owners review the engagement and session findings supported by the pilot."],
  ["06", "Research planning", "For approved partners, we explore anonymized longitudinal data collaboration."]
] as const;

export const clinicianEthicsCards = [
  "Consent-first participation",
  "Facility-controlled onboarding",
  "De-identified research pathways",
  "Edge-first processing direction",
  "No betting, prizes, or monetary rewards",
  "No diagnostic claims without regulatory clearance"
] as const;

export const clinicianFaqs = [
  [
    "Is this gambling?",
    "No. Persimmon Quest uses a pachinko-inspired interaction because it is familiar and engaging in Japan, but it removes betting, prizes, and monetary reward loops. The experience is designed for supervised cognitive engagement and consent-based data collection."
  ],
  [
    "Is this a medical treatment?",
    "Not at this stage. Persimmon Quest is positioned for supervised wellness, engagement, and research workflows. It is not a diagnostic or treatment device unless future regulatory clearance is obtained."
  ],
  [
    "Do residents need technical knowledge?",
    "No. Residents wear the qBand and interact with the guided experience. Staff use qPad Oasis to start sessions, monitor participation, and review summaries."
  ],
  [
    "What data is collected?",
    "A pilot may collect EEG-derived signals, session duration, engagement patterns, interaction events, and progress summaries depending on consent and facility configuration."
  ],
  [
    "Why pachinko-inspired?",
    "Familiarity matters. Many elderly Japanese users already understand the rhythm and visual language of pachinko-like play. Persimmon Quest redirects that familiarity into structured, supervised, non-gambling cognitive engagement."
  ],
  [
    "Can families join?",
    "Yes. The concept supports remote multiplayer or video-connected sessions so residents can share gameplay moments with family members."
  ]
] as const;

export const specs = [
  ["Current stage", "MVP"],
  ["First market", "Japan"],
  ["Product concepts", "3"],
  ["Research model", "FRO"]
] as const;

export const teamMembers = [
  {
    name: "Nirjhor",
    role: "Founder, CEO",
    avatar: "/media/team-nirjhor.png",
    copy: [
      "Directs the growth of the project from a non-profit FRO into a scalable deep-tech start-up, with a clear plan to commercialization. Drives cross-border research alliances with global labs and institutional clinical partners. And specializes in Physical AI implementation. Actively fundraising for R&D: to develop the core neural infrastructure MVP with product design and multi-device data synchronization strategy for public health.",
      "Nirjhor is a sophomore at Ritsumeikan APU, in Japan. Currently taking a study-break to establish his founder-market-fit in neurotech."
    ],
    linkedin: "https://linkedin.com/in/siliconjelly",
    email: "nirjhor@persimmon.quest",
    badges: ["First-Principles Builder", "FRO Venture Pioneer"]
  },
  {
    name: "Dr. Yana",
    role: "Head of Clinical Neuroscience",
    avatar: "/media/team-yana.png",
    copy: [
      "Translates clinical medical research and neural imaging paradigms to a very adaptive, and feature-rich software interface designing. Also sets the brain activity monitoring criteria and IRB-compliant workflows to safely deploy non-invasive wellness data pipelines directly into on-device systems.",
      "A proud mother and a fifth-year Neuroscience PhD researcher at the University of Wyoming, Yana pairs rigorous academic inquiry with formal medical training. She completed her Doctor of Medicine (MD) at Tashkent Medical Academy."
    ],
    linkedin: "https://www.linkedin.com/in/muzayyana-akhmadjonova-49191a1ab/",
    email: "makhmadj@uwyo.edu",
    badges: ["Care Facility UI/UX", "Clinical Trials (IRB)"]
  },
  {
    name: "Mushfiq",
    role: "DSP Engineer, CTO",
    avatar: "/media/team-mushfiq.png",
    copy: [
      "Engineers the low-level system, and the real-time digital signal processing (DSP) layers. Programs low-level firmware required to extract research-grade EEG signals on resource-constrained edge devices. Ensures data integrity across the full product development cycle, establishing the hardware reliability required for pilot programs.",
      "Mushfiqul Amin is currently a senior at Bangladesh University of Engineering and Technology, EEE Department."
    ],
    linkedin: "https://www.linkedin.com/in/amin-mushfiqul/",
    email: "2106194@eee.buet.ac.bd",
    badges: ["Embedded Firmware", "Biosignal Data Integrity"]
  }
];

export const faqs = [
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
    "Our roadmap begins with a focused MVP: a neuroadaptive gameplay kiosk, a lightweight EEG/headband integration, and a simple analytics dashboard. From there, we plan to run pilot programs in nursing homes, collect longitudinal engagement and brain-health data, refine research protocols, and expand into a broader Persimmon OS ecosystem."
  ],
  [
    "What makes Persimmon Quest different?",
    "Instead of treating elderly entertainment, care, and research as separate worlds, Persimmon Quest connects them into one adaptive ecosystem. The goal is to make everyday engagement measurable and useful for long-term aging-brain research."
  ],
  [
    "Are you looking for partners or investors?",
    "Yes. We are interested in speaking with nursing home operators, neuroscience researchers, healthcare partners, game designers, and early investors who are aligned with our Japan-first neurotech vision."
  ]
] as const;

export const roadmapSteps = [
  {
    number: "01",
    title: "Raise ¥30M & Incorporate PQ FRO Lab",
    icon: HandCoins,
    copy: "Secure catalytic launch capital to establish a Japan-based nonprofit Focused Research Organization, hire the first core team, and fund compliance, prototyping, and research operations.",
    output: "FRO incorporated + first hires"
  },
  {
    number: "02",
    title: "Build the Research-Grade MVP",
    icon: CircuitBoard,
    copy: "Convert the proof-of-concept into a tri-product MVP across qBand Controller, qPad Oasis, and qCore Pillar for care-room validation.",
    output: "Tri-product MVP validated"
  },
  {
    number: "03",
    title: "Launch Nursing Home Pilots",
    icon: Building2,
    copy: "Partner with Japanese elderly-care facilities to test repeated engagement workflows with residents, caregivers, and operators.",
    output: "Facility workflow evidence"
  },
  {
    number: "04",
    title: "Create the Longitudinal Research Layer",
    icon: DatabaseZap,
    copy: "Collect privacy-preserving engagement, EEG/fNIRS, speech, and interaction signals to build a proprietary aging-brain dataset for Persimmon Quest Lab.",
    output: "Longitudinal data pipeline"
  },
  {
    number: "05",
    title: "Train Proprietary Neuroadaptive Models",
    icon: Network,
    copy: "Use pilot data to develop ML algorithms for engagement detection, neurofeedback personalization, cognitive-state modeling, and caregiver-facing insights.",
    output: "Proprietary ML models"
  },
  {
    number: "06",
    title: "Collaborate With Global Neuroscience Labs",
    icon: Globe2,
    copy: "Work with computational neuroscience, neurofeedback, dementia research, and brain-modeling labs to improve model quality and cultural adaptation.",
    output: "Research collaboration network"
  },
  {
    number: "07",
    title: "Explore AI-Guided Home Experiences",
    icon: HousePlug,
    copy: "After appropriate research and validation, explore how nursing-home infrastructure could inform supervised neurofeedback experiences beyond care facilities.",
    output: "Validated translation pathway"
  }
];
