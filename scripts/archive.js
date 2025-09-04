const rooms = [
  {name: "Storage 1: Ancient Origins", items: ["vn7f", "clv2", "khn9", "atm3"]},
  {name: "Storage 2: Imperial Legacies", items: ["tra5", "rst4", "shb1", "mzh7"]},
  {name: "Storage 3: Modern Icons", items: ["mls2", "mlv8", "bwf3", "iph0"]},
]
const itemsPerRoom = 4
const currentRoom = parseInt(localStorage.getItem("umho_current")) || 0

if (currentRoom >= rooms.length) {
  // No more rooms left, game is over.
  window.location.href = "end.html"
}

const loadRooms = () => {
  const rooms = localStorage.getItem("umho_rooms")
  if (rooms) {
    return JSON.parse(rooms)
  }
  return null
}

const savedRooms = loadRooms() ?? rooms.map(() => null)

const saveRooms = () => {
  localStorage.setItem("umho_rooms", JSON.stringify(savedRooms))
}

const saveRoom = (current) => {
  current ??= currentRoom
  savedRooms[current] = roomElement.innerHTML
  saveRooms()
}

const openBox = (event) => {
  event.target.classList.add("open")
  const item = event.target.dataset.item
  if (item) {
    saveRoom()
    window.location.href = `item.html?key=${item}`
  }
}

// Set page title.
const titleElement = document.getElementById("title")
titleElement.textContent = rooms[currentRoom].name

// Render archive boxes.
const roomElement = document.getElementById("room")
let currentHtml = savedRooms[currentRoom]
if (currentHtml) {
  roomElement.innerHTML = currentHtml
} else {
  const itemPool = rooms[currentRoom].items.toSorted(() => Math.random() - 0.5)
  const room = itemPool.slice(0, itemsPerRoom)
  for (const item of room) {
    const boxElement = document.createElement("div")
    boxElement.classList.add("box")
    boxElement.dataset.item = item
    roomElement.prepend(boxElement)
  }
}

// Add event handlers.
roomElement.querySelectorAll(".box").forEach((box) => {
  box.addEventListener("click", () => {
    box.classList.add("open")
    const item = box.dataset.item
    if (item) {
      saveRoom()
      window.location.href = `item.html?key=${item}`
    }
  })
})
roomElement.querySelector(".door").addEventListener("click", (event) => {
  saveRoom()
  localStorage.setItem("umho_current", currentRoom + 1)
  window.location.href = `archive.html`
})
