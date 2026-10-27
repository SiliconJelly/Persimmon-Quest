# Persimmon Quest contact form

The live form is https://tally.so/r/Npa6PW. It is connected in ContactForm.tsx,
with this published ID as the default. Visitors submit directly to Tally without
opening an email application. No account is required.

## Finish the free Tally design
Read **tally-review.md** for the field comparison, exact editor changes, and test results.
Edit the existing form; there is no need to create or import another one.
Publish your Tally changes and they appear in the website embed automatically.

## Website integration
- **embed.html** and **form.css** provide copyable website HTML/CSS with the published form.
- The Next.js site uses src/app/components/ContactForm.tsx, including automatic sizing,
  a loading state, a direct-form link, and recovery when an iframe stalls.
- Optional environment override: NEXT_PUBLIC_TALLY_CONTACT_FORM_ID=Npa6PW.
  Rebuild the static website only if you change this override or the website code.
- Form ID is public, not a credential. No API keys are needed.

Tally does not host an arbitrary uploaded HTML/CSS form as its submission endpoint.
Build and style the native form in Tally, then embed it on your own website.
Website CSS cannot style the contents of a cross-origin iframe.

## Reference files
- **form-spec.md** — the intended five-field structure
- **form-preview.html** and **form.css** — disabled visual reference, not a submission form
- **tally-custom.css** — optional Pro-only CSS reference; NOT needed for the free workflow

## Official documentation
- https://tally.so/help/customize-your-form
- https://tally.so/help/columns
- https://tally.so/help/embed-your-form
- https://developers.tally.so/widgets/examples/nextjs
