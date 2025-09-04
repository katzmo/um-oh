import UMOH from "./global.js"
import initSort from "./sort.js"

const umho = new UMOH()
const exhibitionElement = document.getElementById("exhibition")

const createExhibit = (item) => {
  return `
  <div id="${item.id}" class="exhibit sortable" draggable="true">
    <a href="item.html?key=${item.id}" draggable="false">
      <img
        src="${item.image.url}"
        alt="${item.name}"
        draggable="false"
      />
    </a>
  </div>
`
}
if (umho.exhibits.length) {
  exhibitionElement.innerHTML = umho.exhibits.reduce(
    (html, item) => html + createExhibit(umho.getFound(item)),
    ""
  )
}

// Save re-ordered items after sort
exhibitionElement.addEventListener("drop", (event) => {
  umho.updateExhibits([...exhibitionElement.children].map((item) => item.id))
})

initSort()
