# UX writing rules (v1.1)

The brand voice is in `BRAND.md` and `DESIGN.md` §9: human-first, confident, warm, plain. These rules apply that voice to interface text in prototypes, products and decks.

## Everywhere

- Use sentence case for every label, title, button and menu item; never Title Case or ALL CAPS (the 12px eyebrow is the one exception).
- Write in plain words, the user's language and not the system's: "Couldn't save your changes", not "Error 500: persistence failure".
- Use "you" for the user, and "I" when geO speaks (portfolio, personal products). In shared products use "we" for the team.
- Write numbers as numerals ("3 projects") and dates as "18 Nov 2026".
- Use no exclamation marks in system messages, and no emoji.

## Buttons and links

- Start with a verb and name the outcome: "Save changes", "Send message", "Download CV". Never "OK", "Submit" or "Click here".
- Keep it to 1–3 words. The primary action repeats the dialog's question: "Delete project?" → "Delete", next to "Cancel".
- Link text says where it goes ("View the case study"), not "Read more".

## Errors

- Start with "Error:" (the components add it), then what happened, then how to fix it: "Error: enter a full email address".
- Never blame the user or apologise for things they did. Apologise once only for the system's own failure: "Sorry, that didn't send. Try again."
- Show errors next to the field, not only in a banner.

## Empty states

- Use three parts: what this place is for, why it's empty, and one action. "No saved projects yet. Save a project to find it here. [Browse work]"
- Use an icon (Phosphor duotone, `gf-icon--lg`), never an illustration of people.

## Confirmations and toasts

- Use the past tense, short, and name the thing: "Message sent.", "Link copied.", "Project archived. [Undo]".
- Offer Undo instead of an "Are you sure?" dialog wherever the action can be reversed.

## Loading

- Use skeletons for layouts and the loader for actions. Add text only after 3 seconds: "Still loading…"

## Placeholders

- Use bracketed placeholders for unknown facts: `[Project name]`, `[Year]`, `[Client]`. Never invent clients, quotes or numbers.
