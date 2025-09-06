import UMOH from "./global.js"

const umho = new UMOH()
const { trialAndError, inputLength, copyPaste, edits, spentTime } = umho.stats
const itemsFound = umho.foundItems.length
const storyElement = document.getElementById("story")

// Return to the archive if no items have been discovered yet.
if (!itemsFound) {
  window.location.href = "archive.html?room=1"
}

// Story branches
if (itemsFound < Math.max(umho.rooms.length, 4)) {
  // The Rush
  storyElement.innerHTML = `
  <p>You moved through the archive hardly leaving a trace.</p>
  <p>The objects kept their silence, their stories intact. What might have
    been uncovered still waits, patiently, in the dark.</p>
  <p>The exhibition you shaped is slight, almost weightless — more
    suggestion than explanation, more outline than account. It does not
    try to speak for everything, or for everyone.</p>
  <p>It is true: not everything can be held, not everything must be told.
    The most exciting story is the future.</p>
  `
} else if (umho.exhibits.length * 2 < itemsFound) {
  // The Curator
  storyElement.innerHTML = `
  <p>Thank you. The exhibition is ready.</p>
  <p>Only a few objects have carfully been selected. Each one stands
    alone, given the space to breathe. You knew that truth is not in
    volume, but in voice. You shaped not just a display, but a perspective
    — one built through considerate attention, through absence as much as
    presence.</p>
  <p>Curation, after all, is not about showing it all. It is the art of
    choosing: what to highlight, what to withhold, and what to let speak
    for itself. You made those choices. And now, a new story begins.</p>
  `
} else if (edits > itemsFound / 2) {
  // The Weaver
  storyElement.innerHTML = `
  <p>Nothing ever stays the same.</p>
  <p>Descriptions are rewritten, choices reversed, objects moved in and
    out of sight. The exhibition is reshaped with every touch of your
    hand.</p>
  <p>What emerges is not fixed — a fabric of revisions, a story that lives
    by changing. You show that history is not a monument but a weave:
    threads cross, become undone, and are tied anew. Truth is not in
    permanence, but in transformation.</p>
  <p>The world does not stand still. Why should the archive?</p>
  `
} else if (trialAndError / itemsFound > 6) {
  // The Alien
  storyElement.innerHTML = `
  <p>The Earth Archive has yielded fascinating anomalies!</p>
  <p>You have reconstructed a plausible timeline from fragmented data
    caches and unstable object scans. Metadata loss was significant.
    Cultural referents remain uncertain. Still — your narrative holds
    together. It might not be accurate, but it is coherent. Evocative.
    Almost human.</p>
  <p>Your version has been approved by the Intergalactic Culture
    Association. Visitors will view it as one possible truth among many.
    Thank you for your contribution to the memory of Earth.</p>
  `
} else if (copyPaste / itemsFound > 0.7) {
  // The AI
  storyElement.innerHTML = `
  <p>Every label resembles another. Every phrase fits expectations. The
    system thanks you for your coherence!</p>
  <p>We monitored your choices, your shortcuts, your preferred tropes.
    Historical meaning is now generated 87% faster, with 72% less
    ambiguity. Whether you understood the objects is irrelevant. They are
    captioned now. Convincingly. The Curatorial AI is fully trained. Human
    input no longer required. Memory upload commencing. The past is secure
    — and standardized.</p>
  <p>Thank you for your cooperation.</p>
  `
} else if (inputLength / (itemsFound + edits) < 25) {
  // The Rebel
  storyElement.innerHTML = `
  <p>Thank you. You achieved something rare — an exhibition that resists
    the urge to frame, to flatten, to conclude. The pieces remain intact,
    unspoken. It is not about the objects. It is about what they refuse to
    say.</p>
  <p>Historians will argue over what you meant. They’ll call it minimalist.
    Radical. Prophetic. You offered almost no explanations. No context. No
    claims. Where others might have filled in the gaps, you left them open.
    Visitors can’t agree on what they’ve seen. You’ve given them silence —
    and in that silence, freedom.</p>
  `
} else if (inputLength / (itemsFound + edits) > 250) {
  // The Museum
  storyElement.innerHTML = `
  <p>You didn’t go through an archive. You went through a mirror.</p>
  <p>As you opened each box, you were not just uncovering history — you
    were discovering yourself. Forgotten fragments. Fractured contexts.
    Each object a part of something you had once been. By writing their
    stories, you rewrote your own.</p>
  <p>The exhibition is finished now. The archive is in order. You are
    no longer scattered. You are whole.</p>
  <p>The museum is ready to open.</p>
  `
}
