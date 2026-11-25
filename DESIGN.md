---
name: NEXUSDV
description: A development studio in Lima presented as a dark launch stage, with one centered promise and a framed screen where every service runs live, ending in WhatsApp.
colors:
  stage: "#08090B"
  stage-2: "#0C0D10"
  graphite-1: "#111215"
  graphite-2: "#17191D"
  graphite-3: "#1F2227"
  paper: "#F2F3EE"
  paper-2: "#E2E4DD"
  lime: "#C8F135"
  lime-hover: "#D6F85A"
  lime-soft: "rgba(200,241,53,.12)"
  ink: "#0B0F14"
  text: "#F2F4EE"
  text-2: "#A3AAB1"
  text-3: "#7D858D"
  line: "rgba(255,255,255,.08)"
  line-2: "rgba(255,255,255,.14)"
  status-online: "#2FBF6B"
typography:
  display:
    fontFamily: "Proxima Nova, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(42px, 5.4vw, 76px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  display-close:
    fontFamily: "Proxima Nova, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(36px, 5vw, 68px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Proxima Nova, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(24px, 2.5vw, 34px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  figure:
    fontFamily: "Proxima Nova, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(40px, 4vw, 56px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Proxima Nova, Helvetica Neue, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Proxima Nova, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(16px, 1.25vw, 18px)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Proxima Nova, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Proxima Nova, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Proxima Nova, Helvetica Neue, Arial, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.4
  button:
    fontFamily: "Proxima Nova, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    letterSpacing: "-0.005em"
rounded:
  tag: "8px"
  chip: "10px"
  button: "12px"
  button-lg: "14px"
  tile: "16px"
  bar: "18px"
  dock: "20px"
  card: "22px"
  keycap: "28px"
  frame: "30px"
  round: "999px"
spacing:
  gutter: "20px"
  grid-gap: "16px"
  card-pad: "22px"
  plan-pad: "28px"
  head-gap: "14px"
  head-bottom: "clamp(40px, 5vw, 64px)"
  section: "clamp(110px, 13vw, 190px)"
  section-sm: "96px"
  container: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "0 18px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.lime-hover}"
    textColor: "{colors.ink}"
  button-primary-lg:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button-lg}"
    padding: "0 24px"
    height: "52px"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "0 18px"
    height: "44px"
  button-ghost:
    backgroundColor: "rgba(255,255,255,.03)"
    textColor: "{colors.text}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "0 18px"
    height: "44px"
  nav-bar:
    backgroundColor: "rgba(14,15,18,.78)"
    textColor: "{colors.text-2}"
    rounded: "{rounded.bar}"
    height: "64px"
    padding: "0 10px 0 18px"
  dock-key:
    backgroundColor: "{colors.graphite-3}"
    textColor: "{colors.text-2}"
    rounded: "{rounded.button-lg}"
    size: "52px"
  dock-key-active:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
  keycap:
    backgroundColor: "{colors.graphite-3}"
    textColor: "{colors.text}"
    rounded: "{rounded.keycap}"
    size: "clamp(112px, 11vw, 140px)"
  keycap-lime:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
  card-project:
    backgroundColor: "{colors.graphite-2}"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "0 22px 22px"
  card-plan:
    backgroundColor: "{colors.graphite-2}"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "{spacing.plan-pad}"
  faq-item:
    backgroundColor: "{colors.graphite-1}"
    textColor: "{colors.text}"
    rounded: "{rounded.tile}"
    padding: "18px 20px"
  faq-item-open:
    backgroundColor: "{colors.graphite-2}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.chip}"
    padding: "7px 12px"
  input-chat:
    backgroundColor: "{colors.stage-2}"
    textColor: "{colors.text}"
    rounded: "{rounded.button}"
    height: "44px"
    padding: "0 16px"
---

# Design System: NEXUSDV

## Overview

**Creative North Star: "The Launch Stage"**

The site is a product launch for a studio. One near-black stage, wide black silences between sections, a centered promise in sentence case, and a single large framed screen where each service is shown working. Everything is staged in front of the visitor rather than described to them: the showcase plays the real projects, Nexo answering, and a WhatsApp inbox filling up, then the page lets real projects, three keys, clear prices and answers carry the rest. The style reference is raycast.com, used for its stagecraft only; the palette and the blur-to-sharp scroll reveal were pinned by the user from the previous build.

Density is low and centered. Section heads sit on the center axis and content groups in a 1200px column. Solid graphite surfaces use a quiet 1px border, consistent compact radii, and restrained shadows. The UI borrows shadcn/ui's clear component hierarchy and accessible focus treatment without replacing the custom showcase or the NEXUSDV palette. Lime is the one voice: primary actions, active states and the subtle light in the hero. Paper appears only as a light button and as a contact avatar.

The page rejects the agency default of stacked marketing cards, stock imagery and invented proof. Illustrative screens say "Ejemplo"; real ones say "Proyecto entregado".

**Key Characteristics:**
- Dark stage (#08090B) with graphite surfaces s1 to s3 and white hairlines at 8% and 14%.
- Lime as the only accent hue; ink text on every lime fill.
- Proxima Nova only, weight 600 for every heading, sentence case, tight negative tracking.
- Section heads: a white sentence, optionally a grey sentence on its own line, then one body line.
- A restrained lime light accent in the hero; surfaces stay flat and legible.
- Buttons, cards, inputs and focus rings share a compact, predictable component language.
- Motion is a blur-to-sharp rise on scroll, a crossfade between showcase views, and small arrivals in the chat demos.
- Design read: homepage for Lima businesses in the dark launch-stage language; ENERGY 2 / RHYTHM 2 / MOTION 2.
- The project carousel advances only on visitor input; the showcase stops cycling when a tab is chosen; testimonials stay still so real proof is easy to read.
- The primary navigation points to services, projects, pricing and FAQs; the WhatsApp CTA stays visible for the main conversion.

## Email messages

The subscriber welcome email follows the supplied editorial layout: a light neutral canvas, white content card, graphite brand bar, lime action, and the existing NEXUSDV preview image. Table layout and inline styles keep it compatible with email clients.

## Colors

A near-black, graphite and lime palette: one cold dark stage, three steps of machined grey, one acid accent.

### Primary
- **Signal Lime** (#C8F135): primary actions, active states, user chat bubbles, the Nexo face tile, focus outlines, selection and check marks. Large glows are avoided.
- **Lit Lime** (#D6F85A): lime hover and the Nexo face.
- **Lime Wash** (rgba(200,241,53,.12)): the fill behind check marks and the open FAQ tile.

### Neutral
- **Stage Black** (#08090B): page background, the space between sections, scrollbar track.
- **Screen Black** (#0C0D10): the showcase screen, closing CTA and chat input wells.
- **Graphite 1** (#111215): chat windows, WhatsApp cards, FAQ rows, plain chips and content cards.
- **Graphite 2** (#17191D): chat and browser title bars, tooltips, the greeting bubble.
- **Graphite 3** (#1F2227): bot chat bubbles, the newest WhatsApp row and scrollbar thumb.
- **Paper** (#F2F3EE): the light button and the WhatsApp contact avatar; never a section background. **Paper 2** (#E2E4DD) is declared but not yet used.
- **Ink** (#0B0F14): text and glyphs on lime and paper.
- **Bright Text** (#F2F4EE): headings and primary copy. **Mist** (#A3AAB1): body copy under headings (`.sec__p`), card text, nav links. **Fog** (#7D858D): the grey half of section titles, captions, metadata, the hero meta line.
- **Hairline** (rgba(255,255,255,.1)) and **Bright Hairline** (rgba(255,255,255,.16)): borders and dividers; the second for interactive edges.
- **Online Green** (#2FBF6B): status only, the presence dot on Nexo's avatar and the "en línea" line of the WhatsApp chat. It is a signal, not an accent.

The CSS theme uses shadcn/ui's semantic roles (`background`, `foreground`, `card`, `primary`, `muted`, `border`, `input`, `ring` and `radius`) while keeping NEXUSDV's dark graphite and lime palette.

### Named Rules
**The One Hue Rule.** Lime is the only accent hue. Online Green is the sole exception and is confined to presence status; no other hue enters the page.

**The Ink On Lime Rule.** Anything filled with lime carries Ink (#0B0F14) text or glyphs, never white.

## Typography

**Display Font:** Proxima Nova (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Proxima Nova (same stack)

**Character:** One grotesk carries everything, loaded through next/font at 400 to 700. Headings at 600 with tight negative tracking read like a product keynote; body stays at 400 with generous 1.55 leading.

### Hierarchy
- **Display** (600, clamp(42px, 5.4vw, 76px), line-height 1, -0.04em): the centered hero H1, balanced over a restrained background. On phones it is clamp(40px, 11.6vw, 56px).
- **Display Close** (600, clamp(36px, 5vw, 68px), 1.02, -0.04em, max 16ch): the closing CTA headline.
- **Headline** (600, clamp(24px, 2.5vw, 34px), 1.2, -0.035em, max 34ch): section titles. A white sentence, then an optional grey sentence (Fog) on its own line, centered.
- **Figure** (600, clamp(40px, 4vw, 56px), 1, -0.04em): plan prices; the keycap numerals use 600 at clamp(48px, 4.6vw, 60px), -0.03em.
- **Title** (600, 21 to 22px, 1.2, -0.02em): project and process step names.
- **Lead** (400, clamp(16px, 1.25vw, 18px), Mist, max 56ch): the `.sec__p` line under each section title; the hero lead runs clamp(17px, 1.4vw, 20px) in Bright Text at 82% opacity.
- **Body** (400, 17px, 1.55; 16px under 640px): running copy. Card and step copy drops to 15px in Mist.
- **Label** (400 to 600, 12.5 to 13.5px, sentence case, no tracking): captions, screen notes, meta lines, tooltips, the "Ejemplo" tag.
- **Button** (600, 15px; 16px large, -0.005em).

### Named Rules
**The Sentence Case Rule.** Every line is sentence case. No uppercase display, no letter-spaced labels, no eyebrows or kickers above titles.

**The Two Sentence Head Rule.** A section head is one white sentence plus at most one short grey sentence; anything longer goes into the single `.sec__p` line beneath.

## Layout

A single centered column, 1200px max, with 20px side gutters that respect safe-area insets. Sections are separated by large black silences: clamp(110px, 13vw, 190px) of top padding, 96px under 640px. Section heads are centered grids with a 14px gap and clamp(40px, 5vw, 64px) below. The services section is the exception: it starts directly under the hero with no top padding so the showcase frame peeks into the first viewport.

Content groups (project cards, process steps, plans) are three equal columns with a 16px gap (process steps widen to clamp(24px, 4vw, 56px)). The FAQ narrows to 820px. The contact list is a three-column row grid (160px key, value, action).

Breakpoints:
- **1100px:** nav links tighten.
- **960px:** the nav collapses to a burger and a dropdown menu panel; projects and plans go to two columns with one card spanning the full row; the showcase screen fixes at 560px.
- **640px:** everything stacks to one column; hero and CTA buttons go full width; the header CTA becomes a 44px WhatsApp icon button; the dock keys shrink to 48px; the contact rows move the key above the value; the Nexo chat opens full-screen.

## Elevation & Depth

Depth comes from tonal contrast and image content, not glossy card treatments. Cards use solid graphite, a 1px border and no shadow; floating controls use a small soft shadow only when separation is needed. The showcase and chat keep enough depth to read as working product previews.

### Shadow Vocabulary
- **Cards:** no shadow; the border and surface tone define the edge.
- **Floating controls:** a small, soft dark shadow separates controls from page content.
- **Product previews:** deeper shadows stay inside the showcase and chat demos to preserve their screen-like depth.

### Named Rules
**The Quiet Surface Rule.** Cards use solid graphite, compact radii and a subtle border; avoid gradients and inner highlights as default surface treatments.

**The Lime Is The Signal Rule.** Lime marks primary actions, active states and focus; do not use it as ambient glow.

## Shapes

Rounded rectangles stay compact: 8px for tags, 10px for controls, 12px for buttons and inputs, 14px for cards and panels, and 20px for the showcase frame. Circles are reserved for status dots, avatars and check marks. Chat bubbles flatten one corner toward their speaker.

## Components

### Buttons
- **Shape:** compact rounded rectangle (12px, 44px tall); large is 12px and 48px tall.
- **Primary (lime):** Signal Lime fill and Ink label at 600. Hover goes to Lit Lime without a glow. It is the WhatsApp action.
- **Light (paper):** Paper fill and Ink label; hover to pure white. Used for the Nexo section action.
- **Ghost:** transparent fill, subtle border and Bright Text label; hover uses a graphite surface.
- **States:** trailing arrows slide 2px on hover; press sinks 1px; focus is a 2px lime outline offset 3 to 4px.

### Navigation
A solid graphite bar (14px, 60px tall) stays sticky 14px from the top. Logo (lime tile with ink mark) left, Mist links centered, and a lime "Cotizar gratis" button right. Under 960px a burger opens a dropdown panel with link rows and a full-width lime CTA.

### Light Streaks (signature atmosphere)
Soft, low-opacity diagonal lime bars remain as a restrained brand accent behind the hero, inside the showcase screen and at the top of the closing CTA.

### Showcase (signature component)
A graphite frame (20px, 8px padding and a subtle border) holds the screen (14px, clamp(520px, 52vw, 640px) tall). A compact dock floats at its foot with five 48px keys; the active key uses the lime fill. Views crossfade in 0.6s and the caption beneath crossfades with them. It auto-advances every 7s while on screen and stops once a key is chosen. Each view carries a small Fog note naming what it is: "Proyecto entregado" for real work.

### Keycaps (process)
Simple square tiles clamp(104px, 10vw, 124px) at 18px corners, with a solid graphite surface and a large numeral. The first is lime with an Ink numeral.

### Cards / Containers
- **Project card:** screenshot-led, with the project image, name, type, text and concise result details on a solid graphite surface. A subtle border change is the hover state; the screenshot remains the focus.
- **Plan card:** 14px corners and 24px padding. Plan name, Figure price, plain-language details, a hairline-topped check list, and a full-width action pinned to the bottom. The highlighted plan uses a quiet lime border and the lime button; it carries no badge.

### FAQ
Rows on Graphite 1 (12px, subtle border) that open with a brighter hairline. The question is 16px 600. A small tile on the right shows a plus; open, it fills with Lime Wash and swaps to a lime minus. The tile does not rotate.

### Contact list
Hairline rows on the stage: Fog key (13px), value in 18px 600, and an outlined 10px action that fills lime with ink on hover. No cards around it.

### Chat (Nexo)
A graphite window (18px, Bright Hairline, window shadow): a Graphite 2 head with the lime Nexo avatar and its green presence dot, a log of bubbles (bot on Graphite 3, user on lime with ink, 14px with a 5px speaker corner), lime typing dots, outlined chips that turn lime on hover (a filled lime chip for WhatsApp), and an input well on Screen Black that gets a lime border and 4px lime ring on focus, with a 44px lime send key. The FAB is a compact graphite button with a lime face tile and small soft shadow; it waves on arrival, hides over the hero and at the closing CTA. The greeting bubble is Graphite 2 with a flattened bottom-right corner, sitting above the FAB.

### WhatsApp examples
Two graphite cards (18px, Bright Hairline) each tagged "Ejemplo" with a small outlined tag. The inbox shows three 66px rows fading out at the bottom; a new row arrives from above (0.7s) on Graphite 3 with a lime unread counter that pops in. The chat shows a short thread with paper avatar, lime outgoing bubbles with a read tick, and graphite incoming ones.

### Inputs / Fields
The chat input is 44px with a lime caret. The subscription dialog uses one 48px email field and an unchecked consent checkbox with a separate privacy link; controls use a visible 3px lime focus ring.

### Subscription dialog
A compact graphite dialog, centered on desktop and anchored near the bottom on phones. It asks only for an email and explicit consent, with one full-width lime action. The close button, Escape key and backdrop dismiss it. The prompt appears immediately when the page loads and stays dismissed for the current browser tab session; a completed subscription is remembered across visits.
The welcome email uses Graphite 1 (#111215) for both the message canvas and its header, so the background stays dark around the brand and message content.

### Motion
- **Scroll reveal:** `.rv` rises 28px from scale .985 and blur 10px to sharp over 0.9s on `cubic-bezier(.16, 1, .3, 1)`.
- **Streak drift:** hero bars slide 6vw, 16s alternate.
- **Showcase crossfade:** 0.6s, blur 6px to sharp.
- **Controls:** buttons and accordion rows use short color and border transitions.
- **Arrivals:** WhatsApp row 0.7s, unread pop 0.45s, bubbles 0.35 to 0.45s.
- **Reduced motion:** all of the above, plus the blink, typing dots and FAB wave, are off; reveals render in place; auto-advance does not start.

## Do's and Don'ts

### Do:
- **Do** put Ink (#0B0F14) on every lime fill.
- **Do** keep lime the only accent hue; use Online Green (#2FBF6B) for presence status only.
- **Do** write every heading in sentence case: a white sentence, at most one short grey sentence on its own line, and longer copy in the `.sec__p` line.
- **Do** label any illustrative screen, chat or inbox with an "Ejemplo" tag, and label real work as delivered.
- **Do** demonstrate services in the showcase only; other sections point to it or to real projects.
- **Do** keep cards flat, borders subtle and radii consistent.
- **Do** keep the lime accent focused on actions, active states and focus rings.
- **Do** keep the light streaks low-opacity and only behind the hero, showcase and closing CTA.
- **Do** honor reduced motion: no streak drift, no crossfade, no auto-advance, reveals in place.

### Don't:
- **Don't** invent ratings, reviews, popularity badges, client counts, logos or capabilities.
- **Don't** mark the highlighted plan with a badge; the lime border and button are enough.
- **Don't** add eyebrows, kickers, uppercase labels or letter-spaced display.
- **Don't** introduce a second accent hue, or put white text on lime.
- **Don't** use paper as a section background; it is a button and avatar color.
- **Don't** add a second services grid or feature cards that re-explain what the showcase plays.
- **Don't** use hard offset shadows or side-lit shadows; light comes from above.
- **Don't** rotate the FAQ plus; it swaps to a minus.
