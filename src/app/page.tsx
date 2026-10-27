import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import AppShowcase from "./components/site/AppShowcase";
import QBandStory from "./components/site/QBandStory";
import { Chrono, ClothDrift, Film, Hero, Reveal, Stride } from "./components/site/HomeMotion";
import { CASES, CaseVisual } from "./components/site/ResearchCases";
import { edits, products, won } from "./catalog";
import { DUET_PRICE } from "./sensors";
import Lookbook from "./components/site/Lookbook";
import Partners from "./components/site/Partners";
import { ProductRail, StoryCarousel, type Story } from "./components/site/Storefront";

// Research carousel: an entry point into our case studies. Each slide opens its full story on /research.
const stories: Story[] = CASES.map((c, i) => ({
  id: c.id,
  eyebrow: c.eyebrow,
  title: c.title,
  line: c.line,
  cta: { label: c.cta, href: i === 0 ? "/research" : c.id === "brain-every-day" ? "/research#join" : `/research#${c.id}` },
  image: c.visual ? undefined : c.photo?.src,
  alt: c.photo?.alt ?? c.title,
  visual: c.visual ? <CaseVisual kind={c.visual} /> : undefined
}));

// The ending is where people choose what to buy, as a quest in two levels. Level one is the Duet bundle, the hardware
// every quest runs on, offered to founding members whose pre-orders help us make it. Level two is the wardrobe that
// joins it. Each path shows its signature piece from three angles, cut to one frame by scripts/studio/closing.py.
const duetSaving = products.filter((p) => p.slug === "qband-sage-duo" || p.slug === "qpad-one").reduce((sum, p) => sum + p.price, 0) - DUET_PRICE;
const wardrobeFrom = Math.min(...products.filter((p) => ["Tops", "Bottoms", "Outerwear"].includes(p.category)).map((p) => p.price));
const PATHS = [
  {
    id: "duet", level: "Level 1", badge: "Founding member", title: "The Duet bundle",
    line: "Be one of the first to wear it. Your pre-order helps us make Sage Duo and qPad One and bring them to you with Quest View.",
    perks: ["Sage Duo and qPad One, made to work as one", "12 months of Quest View, bundled in", "The founding member price"],
    price: won(DUET_PRICE), sub: `Save ${won(duetSaving)}`, note: "We plan to ship by April 2027.",
    cta: { label: "Become a founding member", href: "/duet", tone: "q-btn--primary" },
    views: ["duet-front", "duet-side", "duet-back"], label: "Sage Duo worn, seen from the front, the side and the back"
  },
  {
    id: "wear", level: "Level 2", badge: "The 2080s wardrobe", title: "Dress for the 2080s",
    line: "Clothes that sense how you move and turn it into daily quests. They join your qBand and qPad on Quest View.",
    perks: ["Heart, breath and posture sensors, woven in", "Every walk and stretch becomes a quest", "Your size, your colours, your sensors"],
    price: `From ${won(wardrobeFrom)}`, sub: "Fitted sensors included", note: "Best with Duet. Your clothes report to qPad One.",
    cta: { label: "Build my wardrobe", href: "/plans", tone: "q-btn--ink" },
    views: ["wear-front", "wear-worn", "wear-back"], label: "The Pine Quest Hood from the front, worn, and from the back"
  }
] as const;

export default function Home() {
  return (
    <main>
      {/* ---------- Deep tech first: qBand and qPad, who backs it, and Quest View on your phone ---------- */}
      <QBandStory />
      <Partners tone="night" />
      <AppShowcase />

      {/* ---------- The future of clothing: the biosensors move from the qBand into fabric ---------- */}
      <Hero later />

      {/* ---------- Your body speaks in movement: from the Pilates floor into clothes that listen ---------- */}
      <Chrono />

      {/* ---------- Storefront: wearable wellness in your own style, what is new, where it goes ---------- */}
      <Lookbook />

      <section className="q-section" aria-label="New arrivals">
        <ProductRail eyebrow="Pre-orders open" title="New arrivals" />
      </section>

      <section className="q-section q-shell" aria-labelledby="edits-title" style={{ paddingTop: 0 }}>
        <div className="q-edits__head">
          <div style={{ display: "grid", gap: 8 }}>
            <span className="q-mono q-mono--bronze">Shop the collection</span>
            <h2 id="edits-title" className="q-h2">Made for how you move</h2>
          </div>
          <nav className="q-edits__more" aria-label="More to shop">
            <Link href="/shop?c=shoes">Footwear</Link>
            <Link href="/shop?c=accessories">Accessories</Link>
            <Link href="/shop?c=devices">qBand &amp; qPad</Link>
          </nav>
        </div>
        <ul className="q-edits">
          {edits.map((e) => (
            <li key={e.id}>
              <Link href={`/shop?edit=${e.id}`} className="q-cat">
                <span className="q-cat__media"><img src={e.image} alt={e.alt} loading="lazy" width={900} height={1125} /></span>
                <span className="q-cat__label">{e.label} <ArrowRight size={18} aria-hidden="true" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ClothDrift />
      <Film />

      {/* ---------- After the film, the research behind it: on the film's own ground, the case studies on one dark screen ---------- */}
      <div className="q-cases">
        <section className="q-section q-shell" aria-labelledby="research-title" style={{ paddingBottom: 0 }}>
          <Reveal className="q-section-head">
            <div style={{ display: "grid", gap: 20 }}>
              <span className="q-mono q-mono--bronze q-rule">Our research</span>
              <h2 id="research-title" className="q-display">Built with you<br /><em>not just for you</em></h2>
            </div>
            <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
              <p className="q-lead">Every product starts as a question we explore with older adults. These case studies show where self care is heading, and how you can help shape it from day one.</p>
              <Link className="q-link" href="/research">See all case studies <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </Reveal>
        </section>
        <StoryCarousel stories={stories} label="Research case studies" />
      </div>

      {/* ---------- The ending: Quest Stride and the two levels share one ground, and the silk flows up behind the shoe ---------- */}
      <div className="q-finale">
        <Stride />

        <section className="q-closing-band" aria-labelledby="closing-title">
          <div className="q-closing-band__cloth" aria-hidden="true">
            <img src="/media/site/material/silk.webp" alt="" loading="lazy" />
            <span className="q-grain" />
          </div>
          <Reveal className="q-closing q-shell">
            <h2 id="closing-title" className="q-display-xl">See you on<br /><em>the long run</em></h2>
            <p className="q-lead q-closing__lead">Your quest unlocks in two levels</p>
            {/* Two matching cards. The whole card is one link, carried by its button so it is reached and read once. */}
            <ul className="q-paths">
              {PATHS.map((path) => (
                <li key={path.id} className={`q-path q-path--${path.id}`}>
                  <span className="q-tri" role="img" aria-label={path.label}>
                    {path.views.map((src) => <img key={src} src={`/media/site/closing/${src}.webp`} alt="" loading="lazy" width={600} height={800} />)}
                  </span>
                  <div className="q-path__body">
                    <p className="q-path__level"><span className="q-path__step">{path.level}</span><span className="q-path__badge">{path.badge}</span></p>
                    <h3 className="q-path__title">{path.title}</h3>
                    <p className="q-path__line">{path.line}</p>
                    <ul className="q-path__perks">
                      {path.perks.map((perk) => <li key={perk}><Check size={18} aria-hidden="true" />{perk}</li>)}
                    </ul>
                    <div className="q-path__foot">
                      <p className="q-path__price"><b>{path.price}</b><span>{path.sub}</span></p>
                      <Link className={`q-btn ${path.cta.tone} q-path__go`} href={path.cta.href}>{path.cta.label} <ArrowRight size={18} aria-hidden="true" /></Link>
                    </div>
                    <p className="q-path__note">{path.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
