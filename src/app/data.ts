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
    name: "qBand Air",
    type: "Input signal device",
    iconKey: "brain",
    iconImage: "/media/qband-sensor-icon.png",
    frame1: "/media/5afad371-aea0-4d9a-9b78-9d9ed1e256b4.png",
    frame2: "/media/eba98a24-0e1b-4ef2-9fd6-6c469a75357f.png",
    stagePosition: "center 42%",
    stageScale: 1.08,
    copy: [
      "Lightweight multisensor headband designed for daily use inside elderly-care facilities",
      "Designed to capture brain-signal patterns and interaction responses during guided activities",
      "Works as the primary input device for PQ games, tablets, and edge-computing systems",
      "Aims to turn routine play and cognitive tasks into structured, consent-based research signals"
    ],
    more: [
      "qBand is a headband concept for collecting signals during games, focus tasks, and guided care activities, with informed consent",
      "Paired with qPad, it is intended to connect EEG-informed signals with activity responses, helping researchers study attention, fatigue, and engagement in everyday care."
    ],
    stats: ["Prototype concept", "Supervised sessions", "Consent-first"]
  },
  {
    id: "PQ-APPLIANCE",
    name: "qPad One",
    type: "Room intelligence",
    iconKey: "tablet",
    frame1: "/media/8fa8621f-3f14-4152-a110-af6e79388582.png",
    frame2: "/media/5e3dc914-6ba6-4247-8c10-f89525dff27c.png",
    stagePosition: "center 48%",
    stageScale: 1.02,
    copy: [
      "Dedicated bedside tablet for nursing homes, clinics, and assisted-living rooms",
      "Connects residents, caregivers, family members, and PQ neurogaming activities through one calm interface",
      "Designed to capture interaction data such as task response, speech activity, engagement, and session behavior",
      "Bridges daily care moments into the facility’s local research and monitoring ecosystem"
    ],
    more: [
      "qPad is a tablet concept for guided games, family calls, and everyday care support",
      "Designed to work with qBand, it would bring activity responses and session history into local records for care teams and consent-based research"
    ],
    stats: ["Guided workflow", "Care-room concept", "Family connection"]
  }
];

export const clinicianHeroMetrics = [
  "Guided engagement",
  "Consent-based research",
  "Family connection"
] as const;

export const clinicianNeedCards = [
  [
    "Resident engagement",
    "A familiar, low-friction activity designed to feel enjoyable rather than clinical"
  ],
  [
    "Staff visibility",
    "Session summaries help staff understand participation patterns without adding heavy workflow"
  ],
  [
    "Family connection",
    "Remote multiplayer moments allow residents to play with children or grandchildren"
  ],
  [
    "Research-ready data",
    "With appropriate consent and validation, EEG-informed signals could support longitudinal aging-brain research"
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
    "Simple qBand Air",
    "qCore Pillar edge device",
    "Guided tablet workflow",
    "Familiar pachinko-inspired interaction",
    "Staff-friendly sessions",
    "Longitudinal research signals"
  ]
} as const;

export const clinicianLearningLoop = [
  ["01", "Sense", "qBand is designed to capture EEG-informed signals"],
  ["02", "Adapt", "qCore is intended to inform game response and session flow"],
  ["03", "Engage", "Resident plays a familiar pachinko-inspired neurogame"],
  ["04", "Learn", "Staff review trends and session summaries"]
] as const;

export const clinicianResidentCards = [
  [
    "Gentle challenge",
    "The session adapts to attention and relaxation patterns instead of forcing one fixed difficulty"
  ],
  [
    "Family multiplayer",
    "Residents can play connected sessions with family members, creating emotional participation"
  ],
  [
    "Progress snapshots",
    "Simple visual summaries help residents and families understand participation over time"
  ]
] as const;

export const clinicianFacilityCards = [
  ["Local processing", "Designed to protect sensitive data through local processing"],
  ["Staff onboarding", "Simple workflows for placing the headband, starting sessions, and reviewing results"],
  ["Facility dashboard", "An EHR integration to aggregate engagement trends and interactive EEG session completion"],
  ["Research collaboration", "Consent-based and anonymized data structure designed for future collaboration with neuroscience labs"],
  ["Differentiation", "Position your facility as an early testing partner in Korean and Northeast Asian brain-health innovation"],
  ["Family communication", "Use session snapshots and multiplayer moments to make care feel more connected"]
] as const;

export const clinicianPilotSteps = [
  ["01", "Discovery call", "We understand your facility size, resident profile, staff workflow, and safety requirements"],
  ["02", "Prototype setup", "We prepare the proposed qCore, qBand, and qPad workflow for the agreed pilot scope"],
  ["03", "Staff training", "Care staff learn how to run short supervised sessions"],
  ["04", "Guided sessions", "Residents participate in scheduled neuroadaptive gameplay"],
  ["05", "Review findings", "Facility owners review the engagement and session findings supported by the pilot"],
  ["06", "Research planning", "For approved partners, we explore anonymized longitudinal data collaboration"]
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
    "Is this a medical treatment?",
    "Not at this stage. Persimmon Quest is positioned for supervised wellness, engagement, and research workflows. It is not a diagnostic or treatment device unless future regulatory clearance is obtained."
  ],
  [
    "Do residents need technical knowledge?",
    "No. Residents wear the qBand and interact with the guided experience. Staff use qPad One to start sessions, monitor participation, and review summaries."
  ],
  [
    "What data is collected?",
    "A pilot may collect EEG-derived signals, session duration, engagement patterns, interaction events, and progress summaries depending on consent and facility configuration."
  ],
  [
    "Can families join?",
    "Yes. The concept supports remote multiplayer or video-connected sessions so residents can share gameplay moments with family members."
  ]
] as const;

export const specs = [
  ["Current stage", "MVP"],
  ["First market", "South Korea"],
  ["Product concepts", "3"],
  ["Research model", "FRO"]
] as const;

export const teamMembers = [
  {
    name: "Nirjhor",
    role: "Founder, CEO",
    avatar: "/media/team-nirjhor.png",
    copy: [
      "Leads product strategy, hardware development, and fundraising. Building a foundational model for everyday care.",
      "Former CS student from Japan, bridging artificial intelligence with electroencephalography (EEG) technology and longevity research."
    ],
    linkedin: "https://linkedin.com/in/siliconjelly",
    email: "nirjhor@persimmon.quest",
    badges: ["User advocacy", "Engineering"]
  },
  {
    name: "Dr. Yana",
    role: "Co-founder, CSO",
    avatar: "/media/team-yana.png",
    copy: [
      "Connects neuroscience research with product design. Leads brain-monitoring criteria, care workflows, and research partnerships.",
      "A neuroscience PhD researcher at the University of Wyoming, with an MD from Tashkent Medical Academy"
    ],
    linkedin: "https://www.linkedin.com/in/muzayyana-akhmadjonova-49191a1ab/",
    email: "makhmadj@uwyo.edu",
    badges: ["Trial design", "Research partnerships"]
  }
];

export const faqs = [
  [
    "What is Persimmon Quest?",
    "We’re developing qBand Air, qPad One, and care software to bring guided engagement and brain-health research into everyday life."
  ],
  [
    "Who are you building for?",
    "Residents, families, and teams in dementia and elderly care, alongside researchers studying the aging brain."
  ],
  [
    "Can I try the experience?",
    "Yes. Connect offers a browser-based simulation with breathing guidance, recall activities, and illustrative signals. No hardware or account is required."
  ],
  [
    "How can we work together?",
    "We welcome care-facility pilots, research and product collaborations, and conversations with investors. Tell us what you have in mind using the form above."
  ]
] as const;

export const roadmapSteps = [
  {
    number: "01",
    title: "Incorporate and get funded",
    icon: HandCoins,
    copy: "Establish a corporation in the US, hire the core team, and fund compliance, prototypes, and research",
    output: "Corporation incorporated + first hires"
  },
  {
    number: "02",
    title: "Build the research MVP",
    icon: CircuitBoard,
    copy: "Develop qBand Air and qPad One prototypes with Monarch EHR integration for validation in elderly care settings",
    output: "Device and EHR validation"
  },
  {
    number: "03",
    title: "Launch care-facility pilots",
    icon: Building2,
    copy: "Partner with dementia-care facilities to test repeated engagement workflows with residents, caregivers, and operators",
    output: "Facility workflow evidence"
  },
  {
    number: "04",
    title: "Prioritize longevity UX",
    icon: DatabaseZap,
    copy: "Cognitive-care and everyday apps learn from calibrated time-series EEG",
    output: "Foundational model"
  },
  {
    number: "05",
    title: "EEG App Development",
    icon: Network,
    copy: "Use pilot data to explore engagement detection, personalized neurofeedback, and insights for care teams",
    output: "Proprietary ML models"
  },
  {
    number: "06",
    title: "Partner with neuroscience labs",
    icon: Globe2,
    copy: "Collaborate on computational neuroscience, neurofeedback, and aging research to improve our models",
    output: "Research collaboration network"
  },
  {
    number: "07",
    title: "Explore guided home experiences",
    icon: HousePlug,
    copy: "After research and validation, explore supervised neurofeedback beyond care facilities",
    output: "Validated translation pathway"
  }
];
