export default function CTASection() {
  return (
    <section id="contact" className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10">
      <div className="grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-persimmon/30 bg-persimmon/10 p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-persimmon">For Investors</p>
          <h3 className="mt-3 text-3xl font-semibold text-white">Back Japan's next eldercare platform layer.</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-200">
            Review traction, technical moat, and expansion roadmap tailored to aging population infrastructure.
          </p>
          <a
            href="mailto:founder@persimmon.quest?subject=Investor%20Inquiry"
            className="mt-6 inline-block rounded-full bg-persimmon px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white"
          >
            Request Investor Deck
          </a>
        </article>
        <article className="rounded-2xl border border-white/10 bg-black/50 p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-persimmon">For Nursing Home Directors</p>
          <h3 className="mt-3 text-3xl font-semibold text-white">Deploy a full-stack care ecosystem in one rollout.</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            Schedule a facility readiness consultation for hardware placement, training, and compliance mapping.
          </p>
          <a
            href="mailto:founder@persimmon.quest?subject=Facility%20Consultation"
            className="mt-6 inline-block rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-100 transition hover:border-persimmon hover:text-persimmon"
          >
            Book Consultation
          </a>
        </article>
      </div>
    </section>
  );
}
