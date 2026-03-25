import type { Bilingual } from "@/lib/LanguageContext";

export interface Product {
  id: string;
  name: Bilingual;
  subName: Bilingual;
  description: Bilingual;
  folderPath: string;
  frameCount: number;
  frameExtension: "jpg" | "png" | "webp";
  themeColor: string;
  features: Bilingual[];
  stats: { label: Bilingual; val: string }[];
  section1: { title: Bilingual; subtitle: Bilingual };
  section2: { title: Bilingual; subtitle: Bilingual };
  section3: { title: Bilingual; subtitle: Bilingual };
  buyNowSection: { price: Bilingual; unit: Bilingual; compliance: Bilingual };
}

export const products: Product[] = [
  {
    id: "kiosk",
    name: { en: "Healthcare Kiosk Device", ja: "ヘルスケアキオスク" },
    subName: {
      en: "The Intersection of Clinical Precision and Human Warmth.",
      ja: "医療の精度と、人のぬくもりが交差する場所。"
    },
    description: {
      en: "A facility-grade hardware node that transforms intake, biometrics, and communication into one intelligent eldercare surface.",
      ja: "受付、バイオメトリクス、コミュニケーションをひとつのインテリジェントな介護インターフェースに統合する、施設グレードのハードウェアノード。"
    },
    folderPath: "/images/kiosk_sequence",
    frameCount: 275,
    frameExtension: "webp",
    themeColor: "#F4522D",
    features: [
      {
        en: "Antimicrobial, clinical-safe construction",
        ja: "抗菌性、臨床安全設計"
      },
      {
        en: "High-fidelity biometric tracking without the burden of wearables.",
        ja: "ウェアラブルの負担なく、高精度なバイオメトリクスを実現。"
      },
      {
        en: "Nursing workflow automation and triage routing",
        ja: "看護ワークフローの自動化とトリアージルーティング"
      }
    ],
    stats: [
      { label: { en: "Deployment Time", ja: "導入期間" }, val: "<14 days" },
      { label: { en: "Signal Coverage", ja: "信号カバレッジ" }, val: "Facility-wide" },
      { label: { en: "Biometric Readings", ja: "バイオメトリクス" }, val: "24/7 passive" }
    ],
    section1: {
      title: { en: "Persimmon Kiosk.", ja: "パーシモンキオスク。" },
      subtitle: {
        en: "The infrastructure of care.",
        ja: "ケアのインフラストラクチャ。"
      }
    },
    section2: {
      title: { en: "Uncompromised Hygiene.", ja: "妥協なき衛生管理。" },
      subtitle: {
        en: "Seamless, antimicrobial surfaces designed for clinical environments.",
        ja: "臨床環境に設計されたシームレスな抗菌表面。"
      }
    },
    section3: {
      title: { en: "Advanced Biometrics.", ja: "先進のバイオメトリクス。" },
      subtitle: {
        en: "Non-contact vital sign monitoring via integrated 3D LiDAR.",
        ja: "統合3D LiDARによる非接触バイタルサインモニタリング。"
      }
    },
    buyNowSection: {
      price: { en: "Enterprise Quote", ja: "エンタープライズ見積" },
      unit: { en: "per facility", ja: "施設あたり" },
      compliance: {
        en: "PIPA-ready architecture, SOC 2 roadmap in progress",
        ja: "PIPA対応アーキテクチャ、SOC 2ロードマップ進行中"
      }
    }
  },
  {
    id: "tablet",
    name: { en: "Medical Tablet", ja: "メディカルタブレット" },
    subName: {
      en: "The Digital Thread of the Care Continuum.",
      ja: "介護の質を紡ぐ、途切れることのないデジタル・スレッド。"
    },
    description: {
      en: "Bedside durability meets high-performance computing for real-time care coordination and resident-friendly interaction.",
      ja: "ベッドサイドの耐久性とハイパフォーマンス・コンピューティングが、リアルタイムのケア連携と入居者フレンドリーなインタラクションを実現。"
    },
    folderPath: "/images/tablet_sequence",
    frameCount: 184,
    frameExtension: "webp",
    themeColor: "#E5E7EB",
    features: [
      {
        en: "IP-rated enclosure for healthcare environments",
        ja: "医療環境対応のIP規格筐体"
      },
      {
        en: "One-touch emergency and caregiver call controls",
        ja: "ワンタッチ緊急・介護者呼出コントロール"
      },
      {
        en: "PoE support for continuous bedside operation",
        ja: "PoE対応による継続的なベッドサイド稼働"
      }
    ],
    stats: [
      { label: { en: "Battery Dependence", ja: "バッテリー依存" }, val: "0%" },
      { label: { en: "Latency", ja: "遅延" }, val: "<120ms" },
      { label: { en: "Uptime Target", ja: "稼働率目標" }, val: "99.95%" }
    ],
    section1: {
      title: { en: "Medical Tablet.", ja: "メディカルタブレット。" },
      subtitle: {
        en: "Always on. Always connected.",
        ja: "常時稼働。常時接続。"
      }
    },
    section2: {
      title: {
        en: "Sensory-Inclusive Design.",
        ja: "感覚包括型デザイン。"
      },
      subtitle: {
        en: "Sensory-inclusive design that removes the barriers of technology.",
        ja: "テクノロジーの壁をなくす、感覚に響くアクセシビリティ。"
      }
    },
    section3: {
      title: { en: "Continuous Operation.", ja: "継続的稼働。" },
      subtitle: {
        en: "Power over Ethernet (PoE) ensures zero downtime at the bedside.",
        ja: "PoE（Power over Ethernet）でベッドサイドのダウンタイムをゼロに。"
      }
    },
    buyNowSection: {
      price: { en: "Volume Pricing", ja: "ボリューム価格" },
      unit: { en: "per unit", ja: "ユニットあたり" },
      compliance: {
        en: "IEC 60601-aligned hardware pathway",
        ja: "IEC 60601準拠ハードウェアパスウェイ"
      }
    }
  },
  {
    id: "yunomi",
    name: { en: "Yunomi OS", ja: "Yunomi OS" },
    subName: {
      en: "Designing for Deep Emotional Resonance.",
      ja: "深い共鳴を呼ぶ、ビデオコミュニケーションの再定義。"
    },
    description: {
      en: "A senior-first software layer that keeps families, caregivers, and therapists emotionally present inside every room.",
      ja: "ご家族、介護者、セラピストの心のつながりを、すべての居室に届けるシニアファースト・ソフトウェアレイヤー。"
    },
    folderPath: "/images/yunomi_sequence",
    frameCount: 223,
    frameExtension: "webp",
    themeColor: "#F4522D",
    features: [
      {
        en: "Large touch targets and low-cognitive-load UI",
        ja: "大きなタッチターゲットと低認知負荷UI"
      },
      {
        en: "Family and care-team video sessions in one tap",
        ja: "ワンタップでご家族・ケアチームとのビデオセッション"
      },
      {
        en: "Behavioral signal logging for longitudinal care insights",
        ja: "行動シグナルの記録による縦断的ケアインサイト"
      }
    ],
    stats: [
      { label: { en: "Activation Time", ja: "起動時間" }, val: "<3 min" },
      { label: { en: "Senior UI Success", ja: "シニアUI成功率" }, val: "92%" },
      { label: { en: "Family Session Lift", ja: "家族セッション増加" }, val: "+38%" }
    ],
    section1: {
      title: { en: "Yunomi OS.", ja: "Yunomi OS。" },
      subtitle: {
        en: "Innovation that speaks the language of the heart.",
        ja: "心の機微を読み取る、思いやりのイノベーション。"
      }
    },
    section2: {
      title: { en: "Designed for Seniors.", ja: "シニアのためのデザイン。" },
      subtitle: {
        en: "Massive touch targets and jargon-free navigation reduce cognitive load.",
        ja: "大きなタッチターゲットと専門用語のないナビゲーションで認知負荷を軽減。"
      }
    },
    section3: {
      title: { en: "Emotional Resonance.", ja: "感情的共鳴。" },
      subtitle: {
        en: "Seamless video integration brings families and care teams into the room.",
        ja: "シームレスなビデオ統合で、ご家族とケアチームを居室につなぎます。"
      }
    },
    buyNowSection: {
      price: { en: "SaaS License", ja: "SaaSライセンス" },
      unit: { en: "per active bed", ja: "アクティブベッドあたり" },
      compliance: {
        en: "ISO 27001 controls and audit logging",
        ja: "ISO 27001制御と監査ログ"
      }
    }
  }
];
