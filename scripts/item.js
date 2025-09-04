import UMOH from "./global.js"
import initDrag from "./drag.js"

const umho = new UMOH()
let item = umho.getFound()
const isNew = !item
let startTime = new Date().getTime()
let trialAndError = 0
let copyPaste = 0

const createButton = (label, onClick) => {
  const btn = document.createElement("button")
  btn.textContent = label
  btn.addEventListener("click", onClick)
  return btn
}

const revealItem = () => {
  document.getElementById("step1").hidden = true
  document.getElementById("step2").hidden = false
}

const revealInput = (timeout = 0) => {
  const decisionElement = document.getElementById("decision")
  decisionElement.hidden = false
  setTimeout(() => {
    decisionElement.scrollIntoView({ behavior: "smooth" })
  }, timeout)
}

// Set page title.
const titleElement = document.getElementById("title")
titleElement.textContent = item?.name

if (isNew) {
  item = await umho.getItem()
  titleElement.textContent = `You found the ${item.name}!`

  // Set the item labels.
  const labelsElement = document.getElementById("item-labels")
  labelsElement.innerHTML =
    item.labels
      .toSorted(() => Math.random() - 0.5)
      .reduce((html, label) => html + `<li>${label.text}</li>`, "<ul>") +
    "</ul>"

  // Set the item choices.
  const createChoiceButton = (label) => {
    const btn = createButton(label, () => {
      label === item.name ? revealItem() : popButton(btn)
    })
    return btn
  }
  const popButton = (btn) => {
    btn.classList.add("pop")
    trialAndError++
  }
  const choicesElement = document.getElementById("item-choices")
  UMOH.getRandomChoices([item.name]).forEach((label) => {
    choicesElement
      .appendChild(document.createElement("p"))
      .appendChild(createChoiceButton(label))
  })

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
  const dropzonesWrapper = document.getElementById("dropzones-wrapper")
  dropzonesWrapper.innerHTML = item.labels
    .toSorted(() => Math.random() - 0.5)
    .reduce((html, label) => html + createDropzoneElement(label), "")

  // Add event listeners for dropzone events.
  dropzonesWrapper.addEventListener("dropzone-tried", () => {
    trialAndError++
  })
  dropzonesWrapper.addEventListener("dropzone-solved", () => {
    const allSolved = Array.from(
      dropzonesWrapper.querySelectorAll(".dropzone")
    ).every((dropzone) => dropzone.dataset.solved === "1")
    if (allSolved) {
      revealInput(800)
    }
  })

  // Initialize drag and drop functionality.
  initDrag()
}

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

// Submit form.
const decisionForm = document.getElementById("decision").querySelector("form")
decisionForm.addEventListener("paste", () => {
  copyPaste = 1
})
decisionForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)
  // Store item with user description.
  const description = formData.get("description")
  umho.addFound({
    id: item.id,
    name: item.name,
    image: item.image,
    description,
  })
  event.submitter.value === "display"
    ? umho.addExhibit(item.id)
    : umho.removeExhibit(item.id)

  // Update statistics.
  const inputLength = description.length
  const spentTime = new Date().getTime() - startTime
  const edits = isNew ? 0 : 1
  umho.updateStats({ trialAndError, inputLength, copyPaste, spentTime, edits })
  // Redirect to the exhibition or the archive.
  window.location.href =
    event.submitter.value === "display"
      ? "exhibition.html"
      : `archive.html?room=${umho.findRoomForItem(item.id)}`
})

if (!isNew) {
  // Show item info immediately + buttons.
  const buttonElement = document.getElementById("buttons")
  buttonElement.appendChild(
    createButton("Change your mind about the artifact", () => {
      buttonElement.hidden = true
      decisionForm.querySelector("textarea").innerHTML = item.description
      revealInput(300)
      startTime = new Date().getTime()
    })
  )
  const previous = umho.exhibits.includes(item.id) ? "exhibition" : "archive"
  buttonElement.appendChild(
    createButton(`Return to the ${previous}`, () => {
      history.back()
    })
  )
  document.getElementById("voices").hidden = true
  buttonElement.hidden = false
  revealItem()
}
