import { ArrowUpRight, Check, Plus } from "lucide-react";
import Link from "next/link";
import type { Product } from "../../catalog";

// Headbands and qPads: how people use them, what each key does, and the research behind Brainwear.
// The studies below used other teams' headbands. They show what headband EEG can do, never Brainwear's own results.

const isHeadband = (p: Product) => p.slug.indexOf("brainwear") > -1;
const isPad = (p: Product) => p.slug.indexOf("qpad") === 0;

/* ---------- Toggles beside the pre-order button ---------- */

export function DeviceDetails({ product }: { product: Product }) {
  const band = isHeadband(product);
  const grip = product.slug === "qpad-grip";
  return (
    <div className="q-acc">
      <details open>
        <summary>{band ? "What it notices" : "What it does"} <Plus size={20} aria-hidden="true" /></summary>
        <div className="q-acc__body">
          <ul className="q-checks">
            {product.senses.map((s) => <li key={s}><Check size={18} aria-hidden="true" />{s}</li>)}
          </ul>
          {product.usage && <p className="q-hint" style={{ marginTop: 12 }}>{product.usage}</p>}
          {band && <p className="q-hint" style={{ marginTop: 8 }}>General wellness insight, not medical advice.</p>}
        </div>
      </details>
      {band ? (
        <details>
          <summary>Putting it on <Plus size={20} aria-hidden="true" /></summary>
          <div className="q-acc__body">
            <p style={{ margin: 0 }}>
              Slide it on like a sweatband with the pods at your forehead, then pull the strap until it feels snug, not tight. qPad shows a simple check before each session, so you know the sensors are touching.
            </p>
          </div>
        </details>
      ) : (
        <details>
          <summary>Setting up <Plus size={20} aria-hidden="true" /></summary>
          <div className="q-acc__body">
            <p style={{ margin: 0 }}>
              {grip
                ? "Fold out the stand, or slip your hand under the strap and hold it like a book. Pair your Brainwear once; after that, one key starts each session."
                : "Set it on its dock, choose your language and pair your Brainwear once. After that, one key starts each session, and it charges while it rests."}
            </p>
          </div>
        </details>
      )}
      <details>
        <summary>Care <Plus size={20} aria-hidden="true" /></summary>
        <div className="q-acc__body">
          <p style={{ margin: 0 }}>
            {band
              ? `${product.fabric}. Wipe the pods with a soft, damp cloth. Hand wash the band in cool water and let it dry flat.`
              : `${product.fabric}. Wipe the screen and keys with a soft, dry cloth.`}
          </p>
        </div>
      </details>
      {band && (
        <p className="q-hint" style={{ padding: "16px 0 0" }}>
          <Link className="q-link" href="#research">The research behind Brainwear</Link>
        </p>
      )}
    </div>
  );
}

/* ---------- The four keys ---------- */

const KEYS = [
  { name: "Move", tone: "#a9c29a", line: "Today's movement session: stretches, Water Moves, Pilates or your walk plan." },
  { name: "Calm", tone: "#a9c1db", line: "A breathing or focus session with Brainwear, such as Focus Garden." },
  { name: "Rest", tone: "#e6c26f", line: "Wind down with Reading Rhythm, then let the evening slow." },
  { name: "Your quest", tone: "#e8773f", line: "Your plan for today, shaped by how you slept and moved." }
];

function Keys({ product }: { product: Product }) {
  const keys = product.colorways[0].views?.find((v) => v.label === "Four keys" || v.label === "Side keys");
  return (
    <section className="q-keys" aria-labelledby="keys-title">
      {keys && <img className={`q-keys__img ${keys.label === "Side keys" ? "q-keys__img--tall" : ""}`} src={keys.src} alt={keys.alt} width={1000} height={1250} loading="lazy" />}
      <div>
        <h2 id="keys-title" className="q-h2">Four keys, no menus</h2>
        <p className="q-lead" style={{ maxWidth: "36ch" }}>Each key has its own colour and symbol, so you can find it without reading. Press one and the session starts.</p>
        <ul className="q-keys__list">
          {KEYS.map((k) => (
            <li key={k.name}>
              <span className="q-keys__cap" style={{ background: k.tone }} aria-hidden="true" />
              <span><b>{k.name}</b>{k.line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- The research behind Brainwear ---------- */

const STUDIES = [
  {
    place: "France", who: "French Armed Forces Biomedical Research Institute, with Dreem",
    found: "A dry-sensor headband was compared with a full sleep lab test, polysomnography, in 25 adults. Its sleep staging agreed with the lab 83.5% of the time, close to the 86.4% of trained human scorers.",
    cite: "Arnal et al., Sleep, 2020", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7751170/"
  },
  {
    place: "Canada", who: "University of Victoria",
    found: "A low-cost consumer headband picked up the same brain responses that lab systems measure during attention tasks.",
    cite: "Krigolson et al., Frontiers in Neuroscience, 2017", href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5344886/"
  },
  {
    place: "UK and Ireland", who: "Cumulus Neuroscience, Queen's University Belfast and Trinity College Dublin",
    found: "89 healthy adults aged 40 to 79 used a dry-sensor headset with tablet games at home for twelve weeks, about four times a week against a goal of five. It is the closest study to how Brainwear and qPad work together.",
    cite: "McWilliams et al., Frontiers in Psychiatry, 2021", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8281974/"
  },
  {
    place: "Denmark", who: "Aarhus University, Center for Ear-EEG",
    found: "Dry-electrode EEG recorded sleep at home, outside the lab.",
    cite: "Tabar et al., Frontiers in Neuroscience, 2023", href: "https://www.frontiersin.org/articles/10.3389/fnins.2023.987578/full"
  },
  {
    place: "Australia", who: "Bond University",
    found: "A small study found that care home residents living with dementia could wear a consumer EEG headband.",
    cite: "Pu et al., Geriatric Nursing, 2021", href: "https://research.bond.edu.au/en/publications/portable-eeg-monitoring-for-older-adults-with-dementia-and-chroni/"
  },
  {
    place: "Hong Kong", who: "The Hong Kong Polytechnic University",
    found: "A registered trial is testing headband-guided meditation for pain and stress in people living with dementia.",
    cite: "ClinicalTrials.gov, NCT06094400", href: "https://clinicaltrials.gov/study/NCT06094400"
  }
];

const PROMISES: { title: string; points: string[] }[] = [
  {
    title: "Why Brainwear is different",
    points: [
      "Made for older adults from the first sketch, not adapted later: a soft woven band, dry sensors with no gel, and pods shaped to rest gently on the forehead.",
      "Headband and screen are designed as one. qPad pairs once, then a single key starts each session, so there is nothing to set up day to day.",
      "It measures during things people enjoy: reading, word games, music and movement. People come back, so the picture builds week after week."
    ]
  },
  {
    title: "An age-inclusive company",
    points: [
      "We design with older adults, not just for them. Every product starts as a question we explore with the people who will wear it.",
      "The studies we co-create are shaped with older adults and their care partners, never simply run on them.",
      "Age is not a setting. Everything works the same for everyone, with room to go at your own pace."
    ]
  },
  {
    title: "Designed for access",
    points: [
      "Four large tactile keys, each with its own colour and symbol, so you can find them without reading.",
      "Large, high contrast type on qPad, and no menus to learn.",
      "No gel, no wires and no fiddly clasps. One adjustable strap fits most heads.",
      "Sessions work seated or standing, at the pace you set."
    ]
  },
  {
    title: "Our commitment to you",
    points: [
      "General wellness, not medical advice. Brainwear does not diagnose or treat any condition.",
      "Your readings are yours. You choose what is shared, and family sees only the parts you switch on.",
      "Research only with your consent. If you join a study, you are told what is collected and why, and you can leave at any time."
    ]
  }
];

function Research() {
  return (
    <section id="research" className="q-research" aria-labelledby="research-title">
      <div className="q-research__intro">
        <h2 id="research-title" className="q-h2">The research behind Brainwear</h2>
        <p className="q-lead">Teams around the world have shown that a headband can read brain activity outside the lab. We are building on that work for the people it can help most.</p>
        <p className="q-hint">These studies used other teams&apos; research and consumer headbands. They show what headband EEG can do; they are not tests of Brainwear.</p>
        <Link className="q-link" href="/contact">Co-create a study with us</Link>
      </div>
      <div className="q-acc">
        <details open>
          <summary>Who has studied headband EEG <Plus size={20} aria-hidden="true" /></summary>
          <div className="q-acc__body">
            <ol className="q-studies">
              {STUDIES.map((s) => (
                <li key={s.cite}>
                  <p className="q-studies__where"><b>{s.place}</b> {s.who}</p>
                  <p>{s.found}</p>
                  <a className="q-studies__cite" href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.cite} <ArrowUpRight size={14} aria-hidden="true" /><span className="q-sr"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </details>
        {PROMISES.map((p) => (
          <details key={p.title}>
            <summary>{p.title} <Plus size={20} aria-hidden="true" /></summary>
            <div className="q-acc__body">
              <ul className="q-checks">
                {p.points.map((t) => <li key={t}><Check size={18} aria-hidden="true" />{t}</li>)}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------- The section under the product ---------- */

export default function DeviceStory({ product }: { product: Product }) {
  const uses = product.uses ?? [];
  return (
    <div className="q-device">
      {uses.length > 0 && (
        <section className="q-uses" aria-labelledby="uses-title">
          <h2 id="uses-title" className="q-h2">How people use it</h2>
          <ul className="q-uses__grid">
            {uses.map((u) => (
              <li key={u.src}>
                <img src={u.src} alt={u.alt} width={1200} height={800} loading="lazy" />
                <h3>{u.title}</h3>
                <p>{u.line}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      {isPad(product) && <Keys product={product} />}
      {isHeadband(product) && <Research />}
    </div>
  );
}
