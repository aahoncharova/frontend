import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePostsStore } from '../../src/store/postsStore'

describe('PostsStore - Async Race Condition Bug (Reproduction & Fix)', () => {
  let pinia
  let store

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    store = usePostsStore()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Bug Reproduction: Race Condition Without AbortController', () => {
    it('should demonstrate race condition: old response overwrites new one', async () => {
      
      const mockFetch = vi.fn(async (url) => {        
        let delay = 0
        if (url.includes('_page=1')) {
          delay = 100
        } else if (url.includes('_page=2')) {
          delay = 10
        }
        
        await new Promise(resolve => setTimeout(resolve, delay))
        
        const pageNum = url.includes('_page=2') ? 2 : 1
        const isOk = true
        
        return {
          ok: isOk,
          json: async () => [
            { id: pageNum * 10, title: `Post from Page ${pageNum}`, body: 'Body' }
          ]
        }
      })

      global.fetch = mockFetch

      store.page = 1
      const promise1 = store.fetchItems()

      await new Promise(resolve => setTimeout(resolve, 5))
      store.page = 2
      const promise2 = store.fetchItems()
      
      await Promise.all([promise1, promise2])

      expect(store.items[0].id).toBe(20)
      expect(store.items[0].title).toBe('Post from Page 2')
    })
  })

  describe('Fix Verification: AbortController prevents race condition', () => {
    it('should cancel previous request when new request starts', async () => {
      const abortedRequests = []
      
      const mockFetch = vi.fn(async (url, options) => {
        const signal = options?.signal
        
        if (signal) {
          signal.addEventListener('abort', () => {
            abortedRequests.push(url)
          })
        }
        
        let delay = url.includes('_page=1') ? 100 : 10
        
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, delay)
          if (signal) {
            signal.addEventListener('abort', () => {
              clearTimeout(timeout)
              reject(new DOMException('Aborted', 'AbortError'))
            })
          }
        })
        
        const pageNum = url.includes('_page=2') ? 2 : 1
        return {
          ok: true,
          json: async () => [
            { id: pageNum * 10, title: `Post from Page ${pageNum}`, body: 'Body' }
          ]
        }
      })

      global.fetch = mockFetch

      store.page = 1
      const promise1 = store.fetchItems()
      
      await new Promise(resolve => setTimeout(resolve, 5))
      store.page = 2
      const promise2 = store.fetchItems()
      
      await Promise.allSettled([promise1, promise2])
      
      expect(abortedRequests.length).toBe(1)
      expect(abortedRequests[0]).toContain('_page=1')
      
      expect(store.items[0].id).toBe(20)
      expect(store.error).toBeNull()
    })

    it('should have correct state after rapid page switches', async () => {
      const mockFetch = vi.fn(async (url, options) => {
        const pageMatch = url.match(/_page=(\d+)/)
        const pageNum = pageMatch ? parseInt(pageMatch[1]) : 1

        const delay = (10 - pageNum) * 5
        
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, delay)
          if (options?.signal) {
            options.signal.addEventListener('abort', () => {
              clearTimeout(timeout)
              reject(new DOMException('Aborted', 'AbortError'))
            })
          }
        })
        
        return {
          ok: true,
          json: async () => [
            { id: pageNum * 100, title: `Page ${pageNum}`, body: 'Content' }
          ]
        }
      })

      global.fetch = mockFetch

      store.page = 1
      store.fetchItems()
      
      await new Promise(resolve => setTimeout(resolve, 2))
      store.page = 3
      store.fetchItems()
      
      await new Promise(resolve => setTimeout(resolve, 2))
      store.page = 5
      store.fetchItems()
      
      await new Promise(resolve => setTimeout(resolve, 50))
      
      expect(store.page).toBe(5)
      expect(store.items[0].id).toBe(500)
      expect(store.isLoading).toBe(false)
    })
  })

  describe('Edge Case: Multiple Rapid Requests', () => {
    it('should handle 10 rapid parallel requests with correct final state', async () => {
      const mockFetch = vi.fn(async (url, options) => {
        const pageMatch = url.match(/_page=(\d+)/)
        const pageNum = pageMatch ? parseInt(pageMatch[1]) : 1
        
        const delay = Math.random() * 50
        
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, delay)
          if (options?.signal) {
            options.signal.addEventListener('abort', () => {
              clearTimeout(timeout)
              reject(new DOMException('Aborted', 'AbortError'))
            })
          }
        })
        
        return {
          ok: true,
          json: async () => [
            { id: pageNum * 1000, title: `Page ${pageNum}`, body: 'Content' }
          ]
        }
      })

      global.fetch = mockFetch

      const pages = [1, 2, 5, 3, 7, 1, 4, 8, 2, 9]
      
      for (const page of pages) {
        store.page = page
        store.fetchItems()
        await new Promise(resolve => setTimeout(resolve, 1))
      }
      
      await new Promise(resolve => setTimeout(resolve, 100))
      
      expect(store.page).toBe(9)
      expect(store.items[0].id).toBe(9000)
      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
    })
  })
})
