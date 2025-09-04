import UMOH from "./global.js"

const umho = new UMOH()
const exhibitionElement = document.getElementById("exhibition")

const createExhibit = (item) => {
  return `
  <div class="exhibit">
    <a href="item.html?key=${item.id}">
      <img
        src="${item.image.url}"
        alt="${item.name}"
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
