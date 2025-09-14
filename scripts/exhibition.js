import UMOH from "./global.js"
import initSort from "./sort.js"

const umho = new UMOH()
const exhibitionElement = document.getElementById("exhibition")
const buttonElement = document.getElementById("buttons")

const createExhibit = (item, description) => {
  description = description ? `&description=${description}` : ""
  return `
  <div id="${item.id}" class="exhibit sortable" draggable="true">
    <a href="item.html?key=${item.id}${description}" draggable="false">
      <img
        src="${item.image.url}"
        alt="${item.name}"
        draggable="false"
      />
    </a>
  </div>
`
}

const createShareButton = () => {
  const shareUrl = new URL(window.location.href)
  umho.exhibits.forEach((item) =>
    shareUrl.searchParams.append(item, umho.getFound(item).description)
  )
  const shareData = {
    title: "Visit my exhibition at UM-OH",
    url: shareUrl.href,
  }
  const shareBtn = document.createElement("button")
  shareBtn.textContent = "Share your exhibition"
  shareBtn.addEventListener("click", async () => {
    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData)
    } else {
      navigator.clipboard
        .writeText(shareData.url)
        .then(() => alert("URL copied to clipboard."))
    }
  })
  return shareBtn
}

// Shared exhibition
const params = new URLSearchParams(document.location.search)
if (params.size) {
  exhibitionElement.innerHTML = ""
  for (const [id, description] of params) {
    const item = await umho.getItem(id)
    exhibitionElement.innerHTML += createExhibit(item, description)
  }
  buttonElement.hidden = true
}

// Saved exhibition
else if (umho.exhibits.length) {
  exhibitionElement.innerHTML = umho.exhibits.reduce(
    (html, item) => html + createExhibit(umho.getFound(item)),
    ""
  )
  buttonElement.append(createShareButton())

  // Save re-ordered items after sort
  exhibitionElement.addEventListener("drop", (event) => {
    umho.updateExhibits([...exhibitionElement.children].map((item) => item.id))
  })
  initSort()
}
