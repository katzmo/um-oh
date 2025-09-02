import UMOH from "./global.js"

const umho = new UMOH()
const exhibitionElement = document.getElementById("exhibition")

const createExhibit = (item) => {
  return `
  <div class="exhibit">
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
  </div>
`
}
if (umho.exhibits.length) {
  exhibitionElement.innerHTML = umho.exhibits.reduce(
    (html, item) => html + createExhibit(umho.getFound(item)),
    ""
  )
}
