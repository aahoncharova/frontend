import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePostsStore } from '../../src/store/postsStore'

function createDeferred() {
  let resolve
  let reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

describe('usePostsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('sets isLoading during request and stores items on success', async () => {
    const store = usePostsStore()
    const deferred = createDeferred()
    const apiItems = [
      { id: 1, title: 'alpha post', body: 'A' },
      { id: 2, title: 'beta post', body: 'B' }
    ]

    global.fetch = vi.fn(async () => {
      await deferred.promise
      return {
        ok: true,
        json: async () => apiItems
      }
    })

    const pending = store.fetchItems()

    expect(store.isLoading).toBe(true)
    expect(store.error).toBe(null)

    deferred.resolve()
    await pending

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(store.isLoading).toBe(false)
    expect(store.error).toBe(null)
    expect(store.items).toEqual(apiItems)
  })

  it('sets error on failed response and keeps existing items unchanged', async () => {
    const store = usePostsStore()
    store.items = [{ id: 99, title: 'existing', body: 'keep me' }]

    global.fetch = vi.fn(async () => ({
      ok: false,
      json: async () => []
    }))

    await store.fetchItems()

    expect(store.isLoading).toBe(false)
    expect(store.error).toBe('Failed to fetch data')
    expect(store.items).toEqual([{ id: 99, title: 'existing', body: 'keep me' }])
  })

  it('filteredItems getter returns only matching titles', () => {
    const store = usePostsStore()
    store.items = [
      { id: 1, title: 'Vue basics', body: 'x' },
      { id: 2, title: 'Pinia patterns', body: 'y' },
      { id: 3, title: 'Testing store', body: 'z' }
    ]

    store.query = 'pinia'

    expect(store.filteredItems).toEqual([
      { id: 2, title: 'Pinia patterns', body: 'y' }
    ])
  })
})
