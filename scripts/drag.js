/**
 * Drag and Drop functionality.
 *
 * This script enables elements with the class "draggable" to be moved between
 * elements with the class "dropzone". It provides visual feedback during drag
 * operations and prevents dropping into already-solved dropzones. Incorrectly
 * placed draggables will switch places with newly dropped draggables.
 *
 * Key Concepts:
 * - dragging class: Applied to a draggable while it is being dragged.
 * - dropable class: Applied to a dropzone when a draggable is dragged over it.
 * - dropzone.dataset.solved: "1" if solved, "0" if incorrect, "" if empty.
 * - dropzone.dataset.drop: The id of the correct draggable for this dropzone.
 */

export default () => {
  const draggables = document.querySelectorAll(".draggable")
  const dropzones = document.querySelectorAll(".dropzone")
  const draggingClass = "grabbed"
  const dropableClass = "active"
  const effect = "move"

  /**
   * Checks if the dropzone contains the correct draggable and updates its state.
   * @param {HTMLElement} dropzone - The dropzone to check.
   */
  const checkSolved = (dropzone) => {
    if (dropzone && dropzone.dataset?.drop) {
      const dragged = dropzone.querySelector(".draggable")
      if (!dragged) {
        dropzone.dataset.solved = ""
      } else if (dropzone.dataset.drop === dragged.id) {
        dropzone.dataset.solved = "1"
        dragged.draggable = false // Disable further dragging
      } else {
        dropzone.dataset.solved = "0"
      }
    }
  }

  for (const draggable of draggables) {
    /**
     * When dragging starts, add the dragging class and set drag data.
     */
    draggable.addEventListener("dragstart", (event) => {
      const dragged = event.target
      dragged.classList.add(draggingClass)
      event.dataTransfer.effectAllowed = effect
      event.dataTransfer.setData("text/plain", dragged.id)
    })

    /**
     * When dragging ends, remove the dragging class.
     */
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove(draggingClass)
    })
  }

  for (const dropzone of dropzones) {
    // Tracks the last entered element for dragleave.
    let lastDragEnter = null

    /**
     * Allow dropping by preventing the default dragover behavior.
     */
    dropzone.addEventListener("dragover", (event) => {
      event.preventDefault()
    })

    /**
     * When a draggable enters the dropzone, add the dropable class.
     */
    dropzone.addEventListener("dragenter", (event) => {
      event.preventDefault()
      lastDragEnter = event.target
      if (dropzone.dataset.solved === "1") {
        // If the dropzone is already solved, do not allow further drops
        event.dataTransfer.dropEffect = "none"
        return
      }
      event.dataTransfer.dropEffect = effect
      dropzone.classList.add(dropableClass)
    })

    /**
     * When a draggable leaves the outer dropzone, remove the dropable class.
     */
    dropzone.addEventListener("dragleave", (event) => {
      event.preventDefault()
      if (event.target === lastDragEnter) {
        dropzone.classList.remove(dropableClass)
        console.log("dragleave", event.target)
      }
    })

    /**
     * Handles the drop event:
     * - Prevents dropping into already-solved dropzones.
     * - Swaps draggables if the dropzone already contains one.
     * - Moves the dragged element into the dropzone.
     * - Updates the solved state of changed dropzones.
     */
    dropzone.addEventListener("drop", (event) => {
      event.preventDefault()
      const dropped = event.currentTarget
      if (dropped.dataset.solved === "1") {
        // If the dropzone is already solved, do not allow further drops
        return
      }
      dropped.classList.remove(dropableClass)
      const dragged = document.getElementById(
        event.dataTransfer.getData("text/plain")
      )
      if (dragged) {
        const prevItem = dropped.querySelector(".draggable")
        if (prevItem) {
          // If the dropzone already has a draggable, swap it
          const prevItem = dropped.querySelector(".draggable")
          dragged.parentNode.replaceChild(prevItem, dragged)
          checkSolved(prevItem.parentNode)
        } else {
          const prevDropzone = dragged.closest(".dropzone")
          dragged.parentNode.removeChild(dragged)
          checkSolved(prevDropzone)
        }
        dropped.appendChild(dragged)
        checkSolved(dropped)
      }
    })
  }
}
