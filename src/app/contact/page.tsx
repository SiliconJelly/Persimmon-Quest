import type { Metadata } from "next";
import {
  ArrowUpRight,
  ChevronDown,
  CircleDot,
  Mail
} from "lucide-react";
import Reveal from "../components/Reveal";
import { ScrewFrame } from "../components/ui";
import { faqs } from "../data";

const CONTACT_EMAIL = "nirjhor.builds@proton.me";

export const metadata: Metadata = {
  title: "Contact Persimmon Quest | Pilots, Research, and Partnerships",
  description:
    "Contact Persimmon Quest about Japanese elderly-care pilots, neuroscience research, partnerships, or investment."
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-chassis text-ink">
      <section className="mx-auto max-w-7xl px-5 pb-8 pt-32 sm:px-8">
        <Reveal>
          <p className="section-label">
            <CircleDot className="h-4 w-4 fill-accent text-accent" /> Partner with us
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-5xl">
            Questions, pilots, and partnership signals
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <Reveal>
          <ScrewFrame className="pilot-form-panel">
            <div className="pilot-form-copy">
              <p className="section-label">
                <Mail className="h-4 w-4" /> Start a conversation
              </p>
              <h2>Tell us where our work intersects.</h2>
              <p>
                We welcome focused conversations with care operators, researchers, product collaborators, and aligned investors.
              </p>
              <p className="form-fallback">
                This form opens your email application. If it does not open, write directly to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            </div>
            <form
              className="pilot-form"
              action={`mailto:${CONTACT_EMAIL}?subject=Persimmon%20Quest%20Inquiry`}
              method="post"
              encType="text/plain"
            >
              <input name="Form" type="hidden" value="Persimmon Quest General Inquiry" />
              <label>
                Name
                <input name="01 Name" type="text" autoComplete="name" required />
              </label>
              <label>
                Email
                <input name="02 Email" type="email" autoComplete="email" required />
              </label>
              <label>
                Organization
                <input name="03 Organization" type="text" autoComplete="organization" />
              </label>
              <label>
                Topic
                <select name="04 Topic" required defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>Care-facility pilot</option>
                  <option>Research collaboration</option>
                  <option>Product collaboration</option>
                  <option>Investment</option>
                  <option>General inquiry</option>
                </select>
              </label>
              <label className="pilot-form__wide">
                Message
                <textarea name="05 Message" rows={6} required />
              </label>
              <button className="primary-key pilot-form__submit" type="submit">
                <ArrowUpRight className="h-4 w-4" />
                Open Email Draft
              </button>
            </form>
          </ScrewFrame>
        </Reveal>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <Reveal>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="section-label justify-center">
              <CircleDot className="h-4 w-4 fill-accent text-accent" /> Partner clarity
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-label">
              Everything early partners, nursing homes, researchers, and investors usually ask about Persimmon Quest.
            </p>
          </div>
        </Reveal>
        <div className="faq-stack">
          {faqs.map(([question, answer], index) => (
            <Reveal key={question} delay={index * 40}>
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

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Reveal>
          <div className="roadmap-contact">
            <div className="roadmap-contact-grid" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <p className="section-label justify-center">
              <Mail className="h-4 w-4" /> Partner signal
            </p>
            <h3>Build the pilot network with us.</h3>
            <p>
              We are speaking with nursing home operators, neuroscience researchers, care partners, and aligned investors.
            </p>
            <a className="roadmap-contact-button" href={`mailto:${CONTACT_EMAIL}`}>
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
