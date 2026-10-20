"use client";

import { Activity, ArrowLeft, ArrowRight, BarChart3, Brain, Check, CircleSlash, Compass, Dumbbell, Flower2, Footprints, Gamepad2, Moon, Music, Shirt, Video, Waves } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FOUNDING_COHORT, plans, productBySlug } from "../catalog";
import ProductCard from "../components/site/ProductCard";
import SubstackSignup from "../components/site/SubstackSignup";
import RhythmSlider from "./RhythmSlider";
import { type Answers, type IconKey, type Option, type Question, ambitionFromStart, core, invitation, isHidden, pickProducts, recommendPlan, scoreProfiles, trackingSummary } from "./quiz";

const icons: Record<IconKey, typeof Footprints> = {
  walk: Footprints, mindful: Flower2, water: Waves, strength: Dumbbell, social: Music, discover: Compass,
  sleep: Moon, focus: Brain, games: Gamepad2, move: Activity, summary: BarChart3, family: Video, clothes: Shirt, none: CircleSlash
};

// One flat sequence: intro, 8 core questions, the invitation, 5 optional questions, result.
const SEQ = ["intro", ...core.map((q) => q.id), "invite", ...invitation.map((q) => q.id), "result"];
const RESULT = SEQ.length - 1;
const questionById = (id: string) => [...core, ...invitation].find((q) => q.id === id);

const ADVANCE_MS = 220;
const STORE = "pq-wellness-profile-v1";
const DEFAULT_RHYTHM = 3;

export default function PlanFinder() {
  const params = useSearchParams();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswersState] = useState<Answers>({});
  // Mirror of answers so navigation (often fired from a timer) always sees the latest choice.
  const answersRef = useRef<Answers>({});
  const setAnswers = (update: Answers | ((a: Answers) => Answers)) => {
    const nextAnswers = typeof update === "function" ? update(answersRef.current) : update;
    answersRef.current = nextAnswers;
    setAnswersState(nextAnswers);
  };
  const [rhythmDraft, setRhythmDraft] = useState(DEFAULT_RHYTHM);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const restored = useRef(false);
  const firstFocus = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Resume within this browser session (answers never leave the device).
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORE) ?? "null");
      if (saved && typeof saved.idx === "number" && saved.answers && typeof saved.answers === "object") {
        setIdx(Math.min(Math.max(saved.idx, 0), RESULT));
        setAnswers(saved.answers);
        if (typeof saved.answers.rhythm === "number") setRhythmDraft(saved.answers.rhythm);
      }
    } catch { /* storage unavailable */ }
    restored.current = true;
  }, []);

  useEffect(() => {
    const ambition = ambitionFromStart(params.get("start"));
    if (ambition) setAnswers((a) => (a.ambition ? a : { ...a, ambition }));
  }, [params]);

  useEffect(() => {
    if (!restored.current) return;
    try { sessionStorage.setItem(STORE, JSON.stringify({ idx, answers })); } catch { /* storage unavailable */ }
  }, [idx, answers]);

  useEffect(() => {
    if (firstFocus.current) { firstFocus.current = false; return; }
    headingRef.current?.focus();
  }, [idx]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const go = (to: number) => { clearTimeout(timer.current); setIdx(to); };
  const step_ = (from: number, dir: 1 | -1) => {
    let to = from + dir;
    while (to > 0 && to < RESULT && isHidden(SEQ[to], answersRef.current)) to += dir;
    return Math.min(Math.max(to, 1), RESULT);
  };
  const next = () => go(step_(idx, 1));
  const back = () => go(step_(idx, -1));
  const restart = () => {
    setAnswers({}); setRhythmDraft(DEFAULT_RHYTHM);
    try { sessionStorage.removeItem(STORE); } catch { /* storage unavailable */ }
    go(0);
  };

  const step = SEQ[idx];
  const q = questionById(step);

  return (
    <div className="q-finder q-journey" id="finder">
      {step === "intro" && <Intro onStart={() => go(1)} />}
      {step === "invite" && <Invite headingRef={headingRef} onYes={next} onNo={() => go(RESULT)} onBack={back} />}
      {q && (
        <QuestionStep
          key={q.id}
          q={q}
          idx={idx}
          headingRef={headingRef}
          value={answers[q.id]}
          rhythmDraft={rhythmDraft}
          setRhythmDraft={setRhythmDraft}
          onAnswer={(v, advance) => {
            setAnswers((a) => ({ ...a, [q.id]: v }));
            if (advance) { clearTimeout(timer.current); timer.current = setTimeout(next, ADVANCE_MS); }
          }}
          onContinue={() => { if (q.kind === "slider") setAnswers((a) => ({ ...a, rhythm: rhythmDraft })); next(); }}
          onSkip={() => { setAnswers((a) => { const copy = { ...a }; delete copy[q.id]; return copy; }); next(); }}
          onBack={idx > 1 ? back : undefined}
        />
      )}
      {step === "result" && <Result answers={answers} headingRef={headingRef} onRestart={restart} />}
    </div>
  );
}

/* ---------- Intro ---------- */
function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="q-intro-step">
      <div className="q-intro-step__copy">
        <span className="q-mono q-mono--bronze">Persimmon Quest · Your wellness profile</span>
        <h2 className="q-h2">Move your way. <em>Live your way.</em></h2>
        <p className="q-lead">Your days are your own. Your movement, your pace, your definition of feeling well.</p>
        <p className="q-body">Tell us what you enjoy, what feels good, and what you&apos;d like to explore. We&apos;ll help you discover activewear and everyday wellness ideas that fit your life.</p>
        <p className="q-mono">About 2 minutes · Skip any question</p>
        <button type="button" className="q-btn q-btn--primary" onClick={onStart}>Explore my profile <ArrowRight size={18} aria-hidden="true" /></button>
      </div>
      <img className="q-intro-step__img" src="/media/shop/movement-tank/sage-motion.webp" alt="Woman in her sixties smiling in a seated yoga pose" />
    </div>
  );
}

/* ---------- One question ---------- */
type StepProps = {
  q: Question;
  idx: number;
  headingRef: React.RefObject<HTMLHeadingElement>;
  value: Answers[string];
  rhythmDraft: number;
  setRhythmDraft: (v: number) => void;
  onAnswer: (v: string | string[], advance: boolean) => void;
  onContinue: () => void;
  onSkip: () => void;
  onBack?: () => void;
};

function QuestionStep({ q, idx, headingRef, value, rhythmDraft, setRhythmDraft, onAnswer, onContinue, onSkip, onBack }: StepProps) {
  const isCore = core.includes(q);
  const group = isCore ? core : invitation;
  const pos = group.indexOf(q);
  const titleId = `q-${q.id}`;
  const chosen = Array.isArray(value) ? value : [];
  const max = q.max ?? Infinity;

  const toggle = (o: Option) => {
    const on = chosen.includes(o.value);
    // "None" style answers stand alone.
    const exclusive = o.value === "none";
    const nextList = on ? chosen.filter((v) => v !== o.value) : exclusive ? [o.value] : [...chosen.filter((v) => v !== "none"), o.value];
    if (!on && nextList.length > max) return;
    onAnswer(nextList, false);
  };

  return (
    <div className="q-step">
      <div className="q-step__head">
        <span className="q-mono q-mono--bronze">{q.chapter}</span>
        <div className="q-progress" aria-hidden="true">
          {group.map((g, i) => <span key={g.id} className={i <= pos ? "is-on" : ""} />)}
        </div>
      </div>

      <h2 ref={headingRef} tabIndex={-1} id={titleId} className="q-h2 q-step__title">{q.title}</h2>
      {q.note && <p className="q-hint q-step__note">{q.note}</p>}

      {q.kind === "slider" ? (
        <RhythmSlider value={rhythmDraft} onChange={setRhythmDraft} labelledBy={titleId} />
      ) : (
        <div className={`q-answers ${q.options.some((o) => o.icon) ? "q-answers--icons" : ""}`} role={q.kind === "single" ? "radiogroup" : "group"} aria-labelledby={titleId}>
          {q.options.map((o) => {
            const Icon = o.icon ? icons[o.icon] : null;
            const on = q.kind === "single" ? value === o.value : chosen.includes(o.value);
            const blocked = q.kind === "multi" && !on && chosen.length >= max;
            return (
              <button
                key={o.value}
                type="button"
                role={q.kind === "single" ? "radio" : "checkbox"}
                aria-checked={on}
                aria-disabled={blocked || undefined}
                className={`q-answer ${on ? "is-on" : ""} ${blocked ? "is-blocked" : ""}`}
                onClick={() => (q.kind === "single" ? onAnswer(o.value, true) : !blocked && toggle(o))}
              >
                {Icon && <Icon className="q-answer__icon" size={30} strokeWidth={1.4} aria-hidden="true" />}
                <span className="q-answer__label">{o.label}</span>
                <span className="q-answer__mark" aria-hidden="true">{on && <Check size={16} strokeWidth={2.4} />}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="q-step__foot">
        {onBack ? <button type="button" className="q-btn q-btn--ghost" onClick={onBack}><ArrowLeft size={18} aria-hidden="true" />Back</button> : <span />}
        <div className="q-step__right">
          <button type="button" className="q-skip-link" onClick={onSkip}>Skip</button>
          {(q.kind === "multi" || q.kind === "slider") && (
            <>
              {q.kind === "multi" && Number.isFinite(max) && <span className="q-hint q-tabular" aria-live="polite">{chosen.length} of {max} chosen</span>}
              <button type="button" className="q-btn q-btn--ink" onClick={onContinue} disabled={q.kind === "multi" && chosen.length === 0}>
                {idx === SEQ.length - 2 ? "Show my profile" : "Continue"} <ArrowRight size={18} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Invitation to shape what's next ---------- */
function Invite({ headingRef, onYes, onNo, onBack }: { headingRef: React.RefObject<HTMLHeadingElement>; onYes: () => void; onNo: () => void; onBack: () => void }) {
  return (
    <div className="q-step q-invite">
      <span className="q-mono q-mono--bronze">An invitation to shape what&apos;s next</span>
      <h2 ref={headingRef} tabIndex={-1} className="q-display q-step__title">What if your everyday essentials could tell you <em>a little more?</em></h2>
      <p className="q-lead">We&apos;re exploring ways to bring thoughtful sensing into clothing, footwear and comfortable wearables. Your perspective will help us understand which experiences deserve to exist.</p>
      <p className="q-mono">Optional · About one more minute</p>
      <div className="q-step__foot">
        <button type="button" className="q-btn q-btn--ghost" onClick={onBack}><ArrowLeft size={18} aria-hidden="true" />Back</button>
        <div className="q-step__right">
          <button type="button" className="q-btn q-btn--ghost" onClick={onNo}>Show my profile</button>
          <button type="button" className="q-btn q-btn--primary" onClick={onYes}>I&apos;d like to help <ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Result: an editorial reveal ---------- */
function Result({ answers, headingRef, onRestart }: { answers: Answers; headingRef: React.RefObject<HTMLHeadingElement>; onRestart: () => void }) {
  const { primary, secondary, why } = scoreProfiles(answers);
  const picks = pickProducts(answers);
  const { plan, brainwearPreview } = recommendPlan(answers, primary);
  const premium = plans.find((p) => p.id === "premium")!;
  const duet = plans.find((p) => p.id === "duet")!;
  const testing = answers.shape === "clothing" || answers.shape === "tech" || answers.shape === "both";
  const brainwear = productBySlug("everyday-brainwear")!;
  const tracking = trackingSummary(answers);

  const founding = <Founding key="founding" />;
  const newsletter = (
    <section key="news" className="q-optin" aria-labelledby="news-title">
      <span className="q-mono q-mono--bronze">Newsletter</span>
      <h3 id="news-title" className="q-h3">Get your weekly quest.</h3>
      <p className="q-body">Stories, gentle routines and first looks at new pieces. This is a newsletter subscription only, through Substack.</p>
      <SubstackSignup />
    </section>
  );

  return (
    <div className="q-result">
      <section className="q-result__profile" aria-labelledby="profile-title">
        <img className="q-result__portrait" src={primary.image} alt="" />
        <div className="q-result__copy">
          <span className="q-mono q-mono--bronze">Your wellness profile</span>
          <h2 ref={headingRef} tabIndex={-1} id="profile-title" className="q-display">{primary.name}</h2>
          {secondary && <p className="q-mono">With a touch of {secondary.name.replace("The ", "")}</p>}
          <p className="q-lead">{primary.line}</p>
          {why.length > 0 && (
            <div className="q-why">
              <p className="q-why__title">Why this fits you</p>
              <ul>{why.map((w) => <li key={w}><Check size={18} aria-hidden="true" />Shaped by {w}</li>)}</ul>
            </div>
          )}
          <p className="q-hint">Profiles overlap and come from your answers, never your age.</p>
        </div>
      </section>

      <section className="q-result__block" aria-labelledby="picks-title">
        <h3 id="picks-title" className="q-h2">Your picks</h3>
        {picks.length ? (
          <ul className="q-picks">
            {picks.map(({ product, reason }) => (
              <li key={product.slug}>
                <ProductCard product={product} />
                <p className="q-pick__reason">{reason}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="q-body">Tell us a little more about what you enjoy and we&apos;ll suggest pieces, or <Link className="q-link" href="/shop">explore the full collection</Link>.</p>
        )}
      </section>

      <section className="q-result__block q-result__plan" aria-labelledby="plan-title">
        <span className="q-mono q-mono--bronze">Your plan</span>
        {plan.kind === "clothing" && (
          <>
            <h3 id="plan-title" className="q-h2">Clothing, beautifully done.</h3>
            <p className="q-lead">No app, no notifications. Just pieces made to feel good, wherever your day goes.</p>
            <Link className="q-btn q-btn--ink" href="/shop">Shop the collection <ArrowRight size={18} aria-hidden="true" /></Link>
          </>
        )}
        {plan.kind === "premium" && (
          <>
            <h3 id="plan-title" className="q-h2">{premium.name}</h3>
            <p className="q-lead">Start with the {plan.program}, shaped around your answers. {premium.price}{premium.unit ? ` ${premium.unit}` : ""}.</p>
            <Link className="q-btn q-btn--ink" href={premium.cta.href}>{premium.cta.label} <ArrowRight size={18} aria-hidden="true" /></Link>
          </>
        )}
        {plan.kind === "duet" && (
          <>
            <h3 id="plan-title" className="q-h2">The Duet bundle, with a year of Premium</h3>
            <p className="q-lead">Brainwear and qPad together, starting with the {plan.program}. {duet.price} {duet.unit}.</p>
            <Link className="q-btn q-btn--ink" href={duet.cta.href}>{duet.cta.label} <ArrowRight size={18} aria-hidden="true" /></Link>
          </>
        )}
        {tracking && plan.kind !== "clothing" && (
          <div className="q-tracking">
            <p className="q-why__title">Your smart wear, set up for you</p>
            <p className="q-body">Pods tuned for {tracking.labels.length > 1 ? `${tracking.labels.slice(0, -1).join(", ")} and ${tracking.labels[tracking.labels.length - 1]}` : tracking.labels[0]}. {tracking.setup}</p>
          </div>
        )}
        {brainwearPreview && (
          <Link href={`/shop/${brainwear.slug}`} className="q-preview">
            <img src={brainwear.cut} alt="" />
            <span><b>Curious about the headband?</b><br /><span className="q-hint">Meet Everyday Brainwear, a soft band for focus and calm.</span></span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        )}
      </section>

      <div className="q-optins">{testing ? [founding, newsletter] : [newsletter, founding]}</div>

      <div className="q-result__foot">
        <p className="q-hint">General wellness ideas, not medical advice. Your answers stay on this device during this session.</p>
        <button type="button" className="q-btn q-btn--ghost" onClick={onRestart}><ArrowLeft size={18} aria-hidden="true" />Start over</button>
      </div>
    </div>
  );
}

/* ---------- Founding Member invitation: facts appear only once confirmed in FOUNDING_COHORT ---------- */
function Founding() {
  const { capacity, eligibility, benefits, dates } = FOUNDING_COHORT;
  const facts = [
    capacity ? `${capacity} founding members` : null,
    dates ?? null,
    eligibility ?? null
  ].filter(Boolean) as string[];
  return (
    <section className="q-optin q-optin--founding" aria-labelledby="founding-title">
      <span className="q-mono q-mono--bronze">Persimmon Quest · Early access</span>
      <h3 id="founding-title" className="q-h3">Help shape what comes next.</h3>
      <p className="q-body">We&apos;re developing a new approach to everyday activewear and personal wellness. Early participants help us understand what feels good, what works in real life, and which wearable features are worth building.</p>
      <ul className="q-founding">
        <li><b>The fit and feel</b><span>Guide the comfort, materials and design of future activewear.</span></li>
        <li><b>The technology</b><span>Decide which wearable experiences earn a place in everyday life.</span></li>
        <li><b>The experience</b><span>Help design products around real people, not assumptions about age.</span></li>
      </ul>
      {facts.length > 0 && <p className="q-mono">{facts.join(" · ")}</p>}
      {benefits && benefits.length > 0 && <ul className="q-why">{benefits.map((b) => <li key={b}><Check size={18} aria-hidden="true" />{b}</li>)}</ul>}
      <Link className="q-btn q-btn--primary" href="/contact">Help shape the collection <ArrowRight size={18} aria-hidden="true" /></Link>
      <p className="q-hint">Joining is separate from the newsletter, and anything you share there is asked for with its own consent.</p>
    </section>
  );
}
