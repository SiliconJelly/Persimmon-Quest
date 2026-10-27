# Tally review — 15 September 2026

Published form: https://tally.so/r/Npa6PW
Website: http://localhost:3000/contact

## Submission test
- Empty submission was blocked with seven required-field errors.
- Invalid email was rejected with “Please enter a valid email”.
- Text fields, dropdowns, conditional Other answers, and contact-permission checkbox accepted input.
- One synthetic test was submitted. Tally displayed “Form submitted” and
  “Thanks for completing this form!”.
- Test name: Website QA — TEST ONLY
- Test email: website-qa@example.com (reserved example address; no reply needed)
- Test reference in message: PQ-WEB-QA-20260915
- Organization and discussion dropdowns used Other, with test-purpose answers.
- This verifies public form acceptance. Tally's private submissions list and email
  notifications were not inspected. Find this reference in your Submissions tab to
  confirm receipt in your account. No real personal or health information was used.

The direct public form and the website's embedded form both loaded. An initial
iframe load stalled; the component now includes a 12-second recovery state with a
direct-form link and retry. All fields and the Submit button were visible inside
/contact at desktop and mobile widths. The browser automation tool could not
safely target iframe inputs because of fractional frame coordinates, so the
accepted test above was performed on Tally's direct public embed page. The
embedded click-to-submit path has not been independently verified.

## Compare with the intended website form

| Intended field | Published Tally field | Action |
|---|---|---|
| Name, required | Name, Position, required | Rename to Name; keep role optional if added separately |
| Email, required | Email Address, required, validates format | Keep email type; replace sample address |
| Organization, optional | Organization Name, required | Turn Required off |
| Topic, required | What would you like to discuss?, required | Add Care-facility pilot |
| Message, required | Tell us more, required | Good equivalent |
| No organization-type requirement | Organization Type, required | Optional extra; make optional or remove |
| Contact permission | Required checkbox | Keep if desired; name its field Contact permission |

Current topics: Research collaboration, Product or technology collaboration,
Investment, Press or media, General inquiry, Other.
Add **Care-facility pilot** first. Other and Press or media can remain.

## Exact free-editor changes

Open this existing form in your Tally workspace and choose Edit.

1. **Fix the column layout.** Currently Name is alone on the left, while Email and
   the following questions occupy the right column. Use block drag handles to
   move questions out of that column. A single-column form is the simplest reliable
   option. If using columns, make separate rows: Name/Email, then
   Organization/Organization Type. Topic, Message and consent should be full width.
   Preview desktop and phone layouts before publishing.
2. **Name:** rename “Name, Position” to “Name”. Placeholder: “Your full name”.
   Do not make role/title mandatory.
3. **Email Address:** keep the email field and required setting.
   Placeholder: “you@organization.com”.
4. **Organization:** turn Required off. Placeholder: “Organization (optional)”.
5. **Organization Type:** turn Required off or remove this extra field.
6. **Topic:** add “Care-facility pilot” as the first choice. Keep Required on.
7. **Intro:** convert the large Heading 3 paragraph to ordinary text. Use:
   “For care providers, researchers, collaborators, and investors.”
   The website already supplies the main title.
8. **Contact permission:** name the checkbox field “Contact permission” so screen
   readers do not announce “Untitled checkboxes field”. Suggested option text:
   “You may contact me about this inquiry.”
9. **Customize:** use Inter (or a simple sans serif), background #fcf9f5,
   text #242522, button #e8783c, and accent #b7572b. Keep Submit as the button label.
   Use the free font/color controls. Advanced sizing, custom CSS, and branding
   removal are paid features; no Pro upgrade is needed for this setup.
10. **Thank-you page:** replace the default message with:
    “Thank you for reaching out”
    “Your message has been sent to Persimmon Quest. We’ll reply using the email you provided.”
    Keep Tally's free branding.
11. Publish changes. Reopen the website, check mobile layout, and confirm the test
    reference above in the Submissions tab. No website HTML changes are needed for
    these Tally edits.

## HTML/CSS
The included embed.html and form.css are for hosting on your own site, not pasting
into Tally. The free native editor controls the form's inner appearance.
tally-custom.css is retained only as an optional Pro reference.

Official references:
- https://tally.so/help/customize-your-form
- https://tally.so/help/columns
- https://tally.so/help/embed-your-form
