import type { Bilingual } from "@/lib/LanguageContext";

export const nav = {
  brand: { en: "PERSIMMON QUEST", ja: "パーシモン クエスト" } satisfies Bilingual,
  cta: { en: "Pre-Book Ecosystem", ja: "エコシステムを予約" } satisfies Bilingual,
  langLabel: { en: "EN / 日本語", ja: "日本語 / EN" } satisfies Bilingual
};

export const hero = {
  eyebrow: {
    en: "AI-Powered End To End Infrastructure",
    ja: "現代の高齢者ケアに向けた、高度なバイオ・デジタル・エコシステム。"
  } satisfies Bilingual,
  headline: {
    en: "Reimagining how Japanese nursing homes deliver daycare at scale.",
    ja: "複雑な生体データを、心の通い合う「かけがえのない瞬間」へと変換します。"
  } satisfies Bilingual,
  body: {
    en: "Three products. One care continuum. Working towards building the next generation of intelligent geriatric data pipeline to make nursing homes across the world never out of care.",
    ja: "3つのプロダクト、ひとつのケア・コンティニュアム。世界中の介護施設が途切れることのないケアを届けられるよう、次世代のインテリジェント高齢者データパイプラインの構築を推進しています。"
  } satisfies Bilingual
};

export const productLabels = {
  brandLine: { en: "Persimmon Quest", ja: "パーシモン クエスト" } satisfies Bilingual,
  clinicalDashboard: { en: "Clinical Dashboard", ja: "臨床ダッシュボード" } satisfies Bilingual,
  boardroomHighlights: { en: "Boardroom Highlights", ja: "ボードルーム・ハイライト" } satisfies Bilingual,
  commercialModel: { en: "Commercial Model", ja: "商業モデル" } satisfies Bilingual,
  sequenceWarmup: { en: "Sequence warmup", ja: "シーケンスの準備" } satisfies Bilingual
};

export const ecosystemSection = {
  heading: {
    en: "One integrated eldercare intelligence network.",
    ja: "統合型インテリジェント・エルダーケア・ネットワーク。"
  } satisfies Bilingual,
  wings: [
    {
      id: "wing-01",
      title: { en: "Wing 01 — Acoustic Biomarkers", ja: "Wing 01 — 音響バイオマーカー" } satisfies Bilingual,
      description: {
        en: "Detect stress signatures and respiratory variance from ambient interaction patterns.",
        ja: "環境内のインタラクションパターンからストレス兆候と呼吸変動を検出します。"
      } satisfies Bilingual
    },
    {
      id: "wing-02",
      title: { en: "Wing 02 — Context-Aware Social Connectivity", ja: "Wing 02 — 文脈認識型ソーシャル接続" } satisfies Bilingual,
      description: {
        en: "Orchestrate context-aware check-ins for residents before escalation is required.",
        ja: "文脈を理解し、孤独を癒す知的介入。エスカレーション前に入居者へのチェックインを調整します。"
      } satisfies Bilingual
    },
    {
      id: "wing-03",
      title: { en: "Wing 03 — Outcome Intelligence", ja: "Wing 03 — アウトカム・インテリジェンス" } satisfies Bilingual,
      description: {
        en: "Convert daily routines into measurable care outcomes for directors and investors.",
        ja: "日常のルーティンを、施設長や投資家向けの測定可能なケア成果に変換します。"
      } satisfies Bilingual
    }
  ]
};

export const ctaSection = {
  investor: {
    label: { en: "For Investors", ja: "投資家の皆様へ" } satisfies Bilingual,
    heading: {
      en: "Invest in the Future of Global Longevity.",
      ja: "世界の長寿社会を支える、次なるスタンダードへ。"
    } satisfies Bilingual,
    body: {
      en: "Review traction, technical moat, and expansion roadmap tailored to aging population infrastructure.",
      ja: "高齢化社会のインフラに特化したトラクション、技術的優位性、拡大ロードマップをご確認ください。"
    } satisfies Bilingual,
    cta: { en: "Request Investor Deck", ja: "投資家向け資料を請求" } satisfies Bilingual
  },
  director: {
    label: { en: "For Nursing Home Directors", ja: "施設長の皆様へ" } satisfies Bilingual,
    heading: {
      en: "Deploy a full-stack care ecosystem in one rollout.",
      ja: "一回の導入でフルスタックのケア・エコシステムを展開。"
    } satisfies Bilingual,
    body: {
      en: "Schedule a facility readiness consultation for hardware placement, training, and compliance mapping.",
      ja: "ハードウェア配置、研修、コンプライアンスマッピングのための施設準備コンサルテーションをご予約ください。"
    } satisfies Bilingual,
    cta: { en: "Book Consultation", ja: "コンサルテーションを予約" } satisfies Bilingual
  }
};

export const footer = {
  tagline: {
    en: "Deeptech infrastructure for future-ready nursing homes.",
    ja: "未来対応型介護施設のためのディープテック・インフラストラクチャ。"
  } satisfies Bilingual,
  links: {
    whitepapers: { en: "Technical Whitepapers", ja: "技術白書" } satisfies Bilingual,
    compliance: { en: "Compliance Documentation", ja: "コンプライアンス文書" } satisfies Bilingual,
    contact: { en: "Contact", ja: "お問い合わせ" } satisfies Bilingual
  }
};

export const warmupOverlay = {
  heading: { en: "Preparing smooth scrollytelling", ja: "スムーズなスクロール体験を準備中" } satisfies Bilingual,
  eyebrow: { en: "Warming visual sequences", ja: "ビジュアルシーケンスを最適化中" } satisfies Bilingual,
  body: { en: "Optimizing assets before interaction.", ja: "インタラクション前にアセットを最適化しています。" } satisfies Bilingual
};

export const chatbot = {
  title: { en: "Persimmon Quest Assistant", ja: "パーシモン クエスト アシスタント" } satisfies Bilingual,
  placeholder: { en: "Ask about our products...", ja: "製品についてお聞きください..." } satisfies Bilingual,
  greeting: {
    en: "Hello! I'm the Persimmon Quest assistant. Ask me anything about our eldercare ecosystem — the Healthcare Kiosk, Medical Tablet, or Yunomi OS.",
    ja: "こんにちは！パーシモン クエストのアシスタントです。ヘルスケアキオスク、メディカルタブレット、Yunomi OSなど、当社のエルダーケア・エコシステムについてお気軽にお尋ねください。"
  } satisfies Bilingual
};
