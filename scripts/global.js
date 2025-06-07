/**
 * Helper class for loading and retrieving data for the game.
 * - Loads items from sessionStorage or fetches from items.json if not cached.
 * - Provides methods to get a specific item by ID.
 */
export default class UMOH {
  /**
   * Initializes the UMOH instance.
   */
  constructor() {
    this.name = "UMOH"
    this.items = this.loadItems()
  }

  /**
   * Loads items from sessionStorage if available, otherwise fetches from items.json.
   * Caches the result in sessionStorage for future use.
   * @param {string} [storageKey="umho_items"] - The key to use for sessionStorage.
   * @returns {Promise<Object>} - Resolves to the items object.
   */
  async loadItems(storageKey = "umho_items") {
    // Try to load from sessionStorage first.
    let items = sessionStorage.getItem(storageKey)
    if (items) {
      return JSON.parse(items)
    }
    // Fetch from items.json if not in storage.
    const response = await fetch("../items.json")
    if (!response.ok) {
      this.log("Error fetching items:", response.statusText)
      return []
    }
    items = await response.json()
    sessionStorage.setItem(storageKey, JSON.stringify(items))
    return items
  }

  /**
   * Retrieves a single item by ID.
   * If no ID is provided, attempts to extract it from the URL parameters.
   * @param {string} [id] - The item ID.
   * @returns {Promise<Object|null>} - Resolves to the item object or null if not found.
   */
  async getItem(id) {
    id ??= this.getIdFromParams()
    if (!id) {
      this.log("No item ID provided.")
      return null
    }
    const items = await this.items
    const item = items[id]
    if (!item) {
      this.log(`Item with ID "${id}" not found.`)
      return null
    }
    return item
  }

  /**
   * Extracts the item ID from the current URL‘s "item" query parameter.
   * @returns {string|null} - The item ID or null if not present.
   */
  getIdFromParams() {
    const params = new URLSearchParams(document.location.search)
    return params.get("item")
  }

  /**
   * Logs a message to the console with the class name as a prefix.
   * @param {string} message - The message to log.
   */
  log(message) {
    console.warn(`[${this.name}] ${message}`)
  }
}
