/**
 * Helper class for loading and retrieving data for the game.
 * - Loads items from sessionStorage or fetches from items.json if not cached.
 * - Provides methods to get a specific item by ID.
 */
export default class UMOH {
  /**
   * Storage keys
   */
  static itemsStore = "umho_items"
  static foundStore = "umho_found"
  static exhibitionStore = "umho_exhibition"
  static statsStore = "umho_stats"

  /**
   * List of all item suggestions in the game.
   * @type {Array<string>}
   */
  static choices = [
    "Venus of Willendorf",
    "Lascaux Cave Paintings",
    "Clovis Points",
    "Stonehenge",
    "Tomb of Khnumhotep and Niankhkhnum",
    "Dead Sea Scrolls",
    "Code of Hammurabi",
    "Antikythera Mechanism",
    "Terracotta Army",
    "Rosetta Stone",
    "Birka grave",
    "Sutton Hoo Ship Burial",
    "Bayeux Tapestry",
    "Gutenberg Bible",
    "Moctezuma's Headdress",
    "Moai Statues of Easter Island",
    "Mona Lisa",
    "Venus de Milo",
    "Benin Bronze",
    "Parthenon Marbles",
    "Crystal Skull",
    "Moon Landing Footage",
    "Berlin Wall Fragments",
    "iPhone",
  ]

  /**
   * Generates a random set of choices for the game.
   * Includes the specified choices and fills up to the count with random choices from the pool.
   * @param {Array<string>} [include] - Choices to include in the result.
   * @param {number} [count=4] - Total number of choices to return.
   * @returns {Array<string>} - An array of random choices.
   */
  static getRandomChoices(include = [], count = 4) {
    const choices = include
    const pool = UMOH.choices.filter((choice) => !choices.includes(choice))
    while (choices.length < count && pool.length > 0) {
      const idx = Math.floor(Math.random() * pool.length)
      choices.push(pool.splice(idx, 1)[0])
    }
    return choices.toSorted(() => Math.random() - 0.5)
  }

  /**
   * Initializes the UMOH instance.
   */
  constructor() {
    this.name = "UMOH"
    this.items = this.loadItems()
    this.foundItems = this.loadFound()
    this.exhibits = this.loadExhibits()
    this.stats = this.loadStats()
  }

  /**
   * Loads items from sessionStorage if available, otherwise fetches from items.json.
   * Caches the result in sessionStorage for future use.
   * @param {string} [storageKey="umho_items"] - The key to use for sessionStorage.
   * @returns {Promise<Object>} - Resolves to the items object.
   */
  async loadItems() {
    // Try to load from sessionStorage first.
    let items = sessionStorage.getItem(UMOH.itemsStore)
    if (items) {
      return JSON.parse(items)
    }
    // Fetch from items.json if not in storage.
    const response = await fetch("items.json")
    if (!response.ok) {
      this.log("Error fetching items:", response.statusText)
      return []
    }
    items = await response.json()
    sessionStorage.setItem(UMOH.itemsStore, JSON.stringify(items))
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
    return { id, ...item }
  }

  /**
   * Extracts the item ID from the current URL‘s "item" query parameter.
   * @returns {string|null} - The item ID or null if not present.
   */
  getIdFromParams() {
    const params = new URLSearchParams(document.location.search)
    return params.get("key")
  }

  /**
   * Loads found items from localStorage if available.
   */
  loadFound() {
    const items = localStorage.getItem(UMOH.foundStore)
    if (items) {
      return JSON.parse(items)
    }
    return []
  }

  /**
   * Retrieves a single found item by ID.
   * If no ID is provided, attempts to extract it from the URL parameters.
   * @param {string} [id] - The item ID.
   * @returns {object|null} - The customized item object if found.
   */
  getFound(id) {
    id ??= this.getIdFromParams()
    if (!id) {
      this.log("No item ID provided.")
      return null
    }
    return this.foundItems.find((item) => item.id === id) || null
  }

  /**
   * Add another found item to localStorage.
   * @param {object} item - The found item with updated description.
   */
  addFound(item) {
    this.foundItems.push(item)
    localStorage.setItem(UMOH.foundStore, JSON.stringify(this.foundItems))
  }

  /**
   * Loads exhibition items from localStorage if available.
   */
  loadExhibits() {
    const items = localStorage.getItem(UMOH.exhibitionStore)
    if (items) {
      return JSON.parse(items)
    }
    return []
  }

  /**
   * Add another item to the exhibition.
   * @param {string} itemId - The id of the item to add to the exhibition.
   */
  addExhibit(itemId) {
    this.exhibits.push(itemId)
    localStorage.setItem(UMOH.exhibitionStore, JSON.stringify(this.exhibits))
  }

  /**
   * Loads statistics from localStorage if available.
   */
  loadStats() {
    const stats = localStorage.getItem(UMOH.statsStore)
    if (stats) {
      return JSON.parse(stats)
    }
    return {}
  }

  /**
   * Update statistics.
   * @param {object} stats - Object containing stats with numeric values.
   */
  updateStats(stats) {
    for (const [key, value] of Object.entries(stats)) {
      this.stats[key] = (this.stats[key] ?? 0) + value
    }
    localStorage.setItem(UMOH.statsStore, JSON.stringify(this.stats))
  }

  /**
   * Logs a message to the console with the class name as a prefix.
   * @param {string} message - The message to log.
   */
  log(message) {
    console.warn(`[${this.name}] ${message}`)
  }
}
