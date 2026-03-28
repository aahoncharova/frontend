import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import PostsList from '../../src/components/PostsList.vue'
import { usePostsStore } from '../../src/store/postsStore'

describe('PostsList Component - Interaction Tests', () => {
  let pinia
  let store

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    store = usePostsStore()
    
    // Mock fetchItems to track calls
    store.fetchItems = vi.fn().mockResolvedValue(undefined)
    
    // Set initial data
    store.items = [
      { id: 1, title: 'Post 1', body: 'Body 1' },
      { id: 2, title: 'Post 2', body: 'Body 2' }
    ]
  })

  it('should call fetchItems() when user types in search field', async () => {
    const wrapper = mount(PostsList, {
      global: {
        plugins: [pinia]
      }
    })

    const searchInput = wrapper.find('.search-input')
    await searchInput.setValue('React')
    
    expect(store.fetchItems).toHaveBeenCalled()
  })

  it('should reset page to 1 when search query changes', async () => {
    store.page = 5
    
    const wrapper = mount(PostsList, {
      global: {
        plugins: [pinia]
      }
    })

    const searchInput = wrapper.find('.search-input')
    await searchInput.setValue('Vue')

    expect(store.page).toBe(1)
    expect(store.query).toBe('Vue')
  })

  it('should call fetchItems() when Next button is clicked', async () => {
    const wrapper = mount(PostsList, {
      global: {
        plugins: [pinia]
      }
    })

    const nextButton = wrapper.findAll('button').find(btn => btn.text() === 'Next')
    await nextButton.trigger('click')

    expect(store.fetchItems).toHaveBeenCalled()
  })

  it('should increment page when Next button is clicked', async () => {
    store.page = 2
    
    const wrapper = mount(PostsList, {
      global: {
        plugins: [pinia]
      }
    })

    const nextButton = wrapper.findAll('button').find(btn => btn.text() === 'Next')
    await nextButton.trigger('click')

    expect(store.page).toBe(3)
  })

  it('should call fetchItems() when Previous button is clicked', async () => {
    store.page = 3
    
    const wrapper = mount(PostsList, {
      global: {
        plugins: [pinia]
      }
    })

    const prevButton = wrapper.findAll('button').find(btn => btn.text() === 'Previous')
    await prevButton.trigger('click')

    expect(store.fetchItems).toHaveBeenCalled()
  })

  it('should decrement page when Previous button is clicked', async () => {
    store.page = 3
    
    const wrapper = mount(PostsList, {
      global: {
        plugins: [pinia]
      }
    })

    const prevButton = wrapper.findAll('button').find(btn => btn.text() === 'Previous')
    await prevButton.trigger('click')

    expect(store.page).toBe(2)
  })

  it('should reset page when searching while on higher page number', async () => {
    store.page = 3
    
    const wrapper = mount(PostsList, {
      global: {
        plugins: [pinia]
      }
    })

    expect(store.page).toBe(3)

    const searchInput = wrapper.find('.search-input')
    await searchInput.setValue('new search')

    expect(store.page).toBe(1)
    expect(store.query).toBe('new search')
  })
})
