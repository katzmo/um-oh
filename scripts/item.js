import UMOH from "./global.js"
import initDrag from "./drag.js"

const umho = new UMOH()
const item = await umho.getItem()

// Set the item labels.
const labelsElement = document.getElementById("item-labels")
labelsElement.innerHTML =
  item.labels
    .toSorted(() => Math.random() - 0.5)
    .reduce((html, label) => html + `<li>${label.text}</li>`, "<ul>") + "</ul>"

// Set the item choices.
const createChoiceButton = (label) => {
  const btn = document.createElement("button")
  btn.textContent = label
  btn.addEventListener("click", () => {
    label === item.name ? revealItem() : btn.classList.add("pop")
  })
  return btn
}
const revealItem = () => {
  document.getElementById("step1").hidden = true
  document.getElementById("step2").hidden = false
}
const choicesElement = document.getElementById("item-choices")
UMOH.getRandomChoices([item.name]).forEach((label) => {
  choicesElement
    .appendChild(document.createElement("p"))
    .appendChild(createChoiceButton(label))
})

// Set page title.
const titleElement = document.getElementById("title")
titleElement.textContent = `You found the ${item.name}!`

// Set item info.
const infoElement = document.getElementById("item-info")
infoElement.innerHTML = `
  <figure>
    <img
      src="${item.image.url}"
      alt="${item.name}"
    />
    <figcaption>
      ${item.image.caption}
    </figcaption>
  </figure>
  <div>
    <h2>${item.name}</h2>
    <p>
      ${item.description}
    </p>
  </div>
`

// Append draggables in random order.
const createDraggableElement = (label) => {
  return `<div class="draggable" draggable="true" id="${label.id}">${label.text}</div>`
}
document.getElementById("draggables-wrapper").innerHTML = item.labels
  .toSorted(() => Math.random() - 0.5)
  .reduce((html, label) => html + createDraggableElement(label), "")

// Append dropzones in random order.
const createDropzoneElement = (label) => {
  return `
      <div class="dropzone" data-drop="${label.id}">
        <div class="inner-wrapper">
          <p class="bubble match">${label.match}</p>
          <p class="bubble mismatch">${label.mismatch}</p>
          <p class="voice">${label.voice}</p>
        </div>
      </div>
    `
}
document.getElementById("dropzones-wrapper").innerHTML = item.labels
  .toSorted(() => Math.random() - 0.5)
  .reduce((html, label) => html + createDropzoneElement(label), "")

// Initialize drag and drop functionality.
initDrag()
