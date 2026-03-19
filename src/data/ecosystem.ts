export interface Product {
  id: string;
  name: string;
  subName: string;
  description: string;
  folderPath: string;
  frameCount: number;
  frameExtension: "jpg" | "png" | "webp";
  themeColor: string;
  features: string[];
  stats: { label: string; val: string }[];
  section1: { title: string; subtitle: string };
  section2: { title: string; subtitle: string };
  section3: { title: string; subtitle: string };
  buyNowSection: { price: string; unit: string; compliance: string };
}

export const products: Product[] = [
  {
    id: "kiosk",
    name: "Healthcare Kiosk Device",
    subName: "The Infrastructure Of Care.",
    description:
      "A facility-grade hardware node that transforms intake, biometrics, and communication into one intelligent eldercare surface.",
    folderPath: "/images/kiosk_sequence",
    frameCount: 275,
    frameExtension: "webp",
    themeColor: "#F4522D",
    features: [
      "Antimicrobial, clinical-safe construction",
      "3D LiDAR-powered non-contact biometrics",
      "Nursing workflow automation and triage routing"
    ],
    stats: [
      { label: "Deployment Time", val: "<14 days" },
      { label: "Signal Coverage", val: "Facility-wide" },
      { label: "Biometric Readings", val: "24/7 passive" }
    ],
    section1: {
      title: "Persimmon Kiosk.",
      subtitle: "The infrastructure of care."
    },
    section2: {
      title: "Uncompromised Hygiene.",
      subtitle:
        "Seamless, antimicrobial surfaces designed for clinical environments."
    },
    section3: {
      title: "Advanced Biometrics.",
      subtitle: "Non-contact vital sign monitoring via integrated 3D LiDAR."
    },
    buyNowSection: {
      price: "Enterprise Quote",
      unit: "per facility",
      compliance: "PIPA-ready architecture, SOC 2 roadmap in progress"
    }
  },
  {
    id: "tablet",
    name: "Medical Tablet",
    subName: "Ruggedized Companion.",
    description:
      "Bedside durability meets high-performance computing for real-time care coordination and resident-friendly interaction.",
    folderPath: "/images/tablet_sequence",
    frameCount: 184,
    frameExtension: "webp",
    themeColor: "#E5E7EB",
    features: [
      "IP-rated enclosure for healthcare environments",
      "One-touch emergency and caregiver call controls",
      "PoE support for continuous bedside operation"
    ],
    stats: [
      { label: "Battery Dependence", val: "0%" },
      { label: "Latency", val: "<120ms" },
      { label: "Uptime Target", val: "99.95%" }
    ],
    section1: {
      title: "Medical Tablet.",
      subtitle: "Always on. Always connected."
    },
    section2: {
      title: "Tactile Accessibility.",
      subtitle:
        "Hardware one-click call buttons designed for diminished motor control."
    },
    section3: {
      title: "Continuous Operation.",
      subtitle: "Power over Ethernet (PoE) ensures zero downtime at the bedside."
    },
    buyNowSection: {
      price: "Volume Pricing",
      unit: "per unit",
      compliance: "IEC 60601-aligned hardware pathway"
    }
  },
  {
    id: "yunomi",
    name: "Yunomi OS",
    subName: "Therapy-Style Video Chat.",
    description:
      "A senior-first software layer that keeps families, caregivers, and therapists emotionally present inside every room.",
    folderPath: "/images/yunomi_sequence",
    frameCount: 223,
    frameExtension: "webp",
    themeColor: "#F4522D",
    features: [
      "Large touch targets and low-cognitive-load UI",
      "Family and care-team video sessions in one tap",
      "Behavioral signal logging for longitudinal care insights"
    ],
    stats: [
      { label: "Activation Time", val: "<3 min" },
      { label: "Senior UI Success", val: "92%" },
      { label: "Family Session Lift", val: "+38%" }
    ],
    section1: {
      title: "Yunomi OS.",
      subtitle: "Technology that understands."
    },
    section2: {
      title: "Designed for Seniors.",
      subtitle:
        "Massive touch targets and jargon-free navigation reduce cognitive load."
    },
    section3: {
      title: "Emotional Resonance.",
      subtitle:
        "Seamless video integration brings families and care teams into the room."
    },
    buyNowSection: {
      price: "SaaS License",
      unit: "per active bed",
      compliance: "ISO 27001 controls and audit logging"
    }
  }
];
