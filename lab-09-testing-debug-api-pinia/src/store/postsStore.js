import { defineStore } from 'pinia'

let controller = null
let activeRequestId = 0

export const usePostsStore = defineStore('posts', {
  state: () => ({
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    limit: 6,
    query: ''
  }),
  getters: {
    filteredItems: (state) => {
      const q = state.query.trim().toLowerCase()
      if (!q) return state.items
      return state.items.filter((post) => post.title.toLowerCase().includes(q))
    }
  },
  actions: {
    async fetchItems() {
      const requestId = ++activeRequestId
      if (controller) controller.abort()
      controller = new AbortController()
      this.isLoading = true
      this.error = null
      try {
        const params = new URLSearchParams({
          _page: String(this.page),
          _limit: String(this.limit)
        })

        if (this.query.trim()) {
          params.set('q', this.query.trim())
        }

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?${params.toString()}`,
          { signal: controller.signal }
        )
        if (!response.ok) throw new Error('Failed to fetch data')
        const data = await response.json()
        if (requestId === activeRequestId) {
          this.items = data
        }
      } catch (err) {
        if (requestId === activeRequestId && err.name !== 'AbortError') {
          this.error = err.message
        }
      } finally {
        if (requestId === activeRequestId) {
          this.isLoading = false
        }
      }
    },
    setQuery(value) {
      this.query = value
      this.page = 1
      return this.fetchItems()
    },
    nextPage() {
      this.page += 1
      return this.fetchItems()
    },
    prevPage() {
      if (this.page === 1) return
      this.page -= 1
      return this.fetchItems()
    }
  }
})

