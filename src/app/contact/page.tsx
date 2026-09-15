import type { Metadata } from "next";
import {
  ChevronDown,
  CircleDot
} from "lucide-react";
import Reveal from "../components/Reveal";
import ContactForm from "../components/ContactForm";
import { ScrewFrame } from "../components/ui";
import { faqs } from "../data";

export const metadata: Metadata = {
  title: "Contact Persimmon Quest | Pilots, Research, and Partnerships",
  description:
    "Contact Persimmon Quest about dementia-care pilots, neuroscience research, partnerships, or investment."
};

export default function ContactPage() {
  return (
    <main id="main-content" className="contact-page min-h-screen bg-chassis text-ink">
      <section className="mx-auto max-w-7xl px-5 pb-8 pt-32 sm:px-8">
        <Reveal>
          <p className="section-label">
            <CircleDot className="h-4 w-4 fill-accent text-accent" /> Partner with us
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
            Let’s start a conversation
          </h1>
        </Reveal>
      </section>

      <section id="contact-form" className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <Reveal>
          <ScrewFrame className="contact-panel">
            <ContactForm formId={process.env.NEXT_PUBLIC_TALLY_CONTACT_FORM_ID} />
          </ScrewFrame>
        </Reveal>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <Reveal>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="section-label justify-center">
              <CircleDot className="h-4 w-4 fill-accent text-accent" /> Before we connect
            </p>
            <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
              Common questions
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-label">
              A few useful things to know
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

    </main>
  );
}
