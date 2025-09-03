import UMOH from "./global.js"

const umho = new UMOH()
const { trialAndError, inputLength, copyPaste, edits, spentTime } = umho.stats
const itemsFound = umho.foundItems.length
const storyElement = document.getElementById("story")

// Return to the archive if no items have been discovered yet.
if (!itemsFound) {
  localStorage.setItem("umho_current", 0)
  window.location.href = "archive.html"
}

// Story branches
if (umho.exhibits.length * 2 < itemsFound) {
  // The Curator
  storyElement.innerHTML = `
  <p>Thank you. The exhibition is ready.</p>
  <p>Only a few objects made it out of storage. But each one now stands
    alone, given the space to breathe. You knew that truth is not in
    volume, but in voice. You shaped not just a display, but a perspective
    — one built through careful attention, through absence as much as
    presence.</p>
  <p>Curation, after all, is not about showing it all. It is the art of
    choosing: what to highlight, what to withhold, and what to let speak
    for itself. You made those choices. And now, a new story begins.</p>
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
    system thanks you for your linguistic coherence!</p>
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
  <p>Thank you. The exhibition is… unconventional.</p>
  <p>The objects were placed, but few were labeled. You offered almost no
    explanations. No context. No claims. Where others might have filled in
    the gaps, you left them open.</p>
  <p>Historians will argue over what you meant. They’ll call it minimalist.
    Radical. Prophetic. But only you know: It was never about the objects.
    It was about what they refused to say.</p>
  <p>You made something rare — an exhibition that resists the urge to
    frame, to flatten, to conclude. The pieces remain intact, unspoken.
    Visitors can’t agree on what they’ve seen. You’ve given them only
    silence — and in that silence, freedom.</p>
  `
} else if (inputLength / (itemsFound + edits) > 250) {
  // The Archive
  storyElement.innerHTML = `
  <p>You didn’t go through an archive. You went through a mirror.</p>
  <p>As you opened each box, you weren’t uncovering history — you were
    discovering yourself. Forgotten fragments. Fractured contexts. Each
    object a part of something you had once been. By writing their
    stories, you rewrote your own.</p>
  <p>The exhibition is finished now. Complete, but not closed.</p>
  <p>You are no longer scattered. You are whole. You are the exhibition.</p>
  `
}
