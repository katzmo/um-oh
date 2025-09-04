/**
 * Drag and Drop Sort functionality.
 *
 * This script enables elements with the class "sortable" to be sorted.
 * The element container should get the class "sortzone".
 *
 * - dragging class: Applied to a draggable while it is being dragged.
 */

export default () => {
  const sortables = document.querySelectorAll(".sortable")
  const sortzones = document.querySelectorAll(".sortzone")
  const draggingClass = "grabbed"
  const effect = "move"

  for (const sortable of sortables) {
    /**
     * When dragging starts, add the dragging class and set drag data.
     */
    sortable.addEventListener("dragstart", (event) => {
      const dragged = event.target
      dragged.classList.add(draggingClass)
      event.dataTransfer.effectAllowed = effect
      event.dataTransfer.setData("text/plain", dragged.id)
    })

    /**
     * When dragging ends, remove the dragging class.
     */
    sortable.addEventListener("dragend", () => {
      sortable.classList.remove(draggingClass)
    })

    /**
     * When item is dragged over, insert it right before or after.
     */
    sortable.addEventListener("dragover", (event) => {
      const draggingItem = document.querySelector("." + draggingClass)
      const bounding = sortable.getBoundingClientRect()
      const position =
        event.clientX - bounding.x - bounding.width / 2 < 0
          ? "beforebegin"
          : "afterend"
      sortable.insertAdjacentElement(position, draggingItem)
    })
  }

  for (const sortzone of sortzones) {
    /**
     * Allow dropping by preventing the default dragover behavior.
     */
    sortzone.addEventListener("dragover", (event) => {
      event.preventDefault()
    })
  }
}
