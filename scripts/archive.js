import UMOH from "./global.js"

const umho = new UMOH()

const rooms = [
  {}, // dummy room to start with index 1
  {
    name: "Storage 1: Ancient Origins",
    items: ["vn7f", "clv2", "khn9", "atm3"],
  },
  {
    name: "Storage 2: Imperial Legacies",
    items: ["tra5", "rst4", "shb1", "mzh7"],
  },
  { name: "Storage 3: Modern Icons", items: ["mls2", "mlv8", "bwf3", "iph0"] },
]
const itemsPerRoom = 4
const currentRoom = umho.setCurrentRoom()

if (currentRoom >= rooms.length) {
  // No more rooms left, game is over.
  window.location.href = "end.html"
}

// Ensure a consistent browser history
if (!window.location.search) {
  history.replaceState(
    history.state,
    "",
    `${window.location.href}?room=${currentRoom}`
  )
}

// Set page title.
const titleElement = document.getElementById("title")
titleElement.textContent = rooms[currentRoom].name

// Render archive boxes.
const roomElement = document.getElementById("room")
let room = umho.rooms[currentRoom]
if (!room) {
  const itemPool = rooms[currentRoom].items.toSorted(() => Math.random() - 0.5)
  room = itemPool.slice(0, itemsPerRoom)
  umho.saveRoom(currentRoom, room)
}
for (const item of room) {
  const boxElement = document.createElement("div")
  boxElement.dataset.item = item
  boxElement.classList.add("box")
  if (umho.exhibits.includes(item)) {
    boxElement.classList.add("void")
  } else if (umho.getFound(item)) {
    boxElement.classList.add("open")
  }
  roomElement.prepend(boxElement)
}

// Add event handlers.
roomElement.querySelectorAll(".box").forEach((box) => {
  box.addEventListener("click", () => {
    box.classList.add("open")
    const item = box.dataset.item
    if (item) {
      window.location.href = `item.html?key=${item}`
    }
  })
})
roomElement.querySelector(".door").addEventListener("click", () => {
  window.location.href = `archive.html?room=${currentRoom + 1}`
})
