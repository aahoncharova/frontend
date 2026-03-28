import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import PostsList from '../../src/components/PostsList.vue'
import { usePostsStore } from '../../src/store/postsStore'

describe('PostsList UI states', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  function mountWithState(statePatch) {
    const pinia = createPinia()
    setActivePinia(pinia)

    const store = usePostsStore()
    Object.assign(store, statePatch)
    vi.spyOn(store, 'fetchItems').mockResolvedValue(undefined)

    const wrapper = mount(PostsList, {
      global: {
        plugins: [pinia]
      }
    })

    return { wrapper, store }
  }

  it('shows "Завантаження..." when isLoading=true', () => {
    const { wrapper } = mountWithState({
      isLoading: true,
      error: null,
      items: []
    })

    expect(wrapper.text()).toContain('Завантаження...')
  })

  it('shows error message when error exists', () => {
    const { wrapper } = mountWithState({
      isLoading: false,
      error: 'Network error',
      items: []
    })

    expect(wrapper.text()).toContain('Помилка: Network error')
  })

  it('shows posts list when items.length > 0', () => {
    const { wrapper } = mountWithState({
      isLoading: false,
      error: null,
      items: [
        { id: 1, title: 'First post', body: 'A' },
        { id: 2, title: 'Second post', body: 'B' }
      ]
    })

    expect(wrapper.findAll('.post-item')).toHaveLength(2)
    expect(wrapper.text()).toContain('First post')
    expect(wrapper.text()).toContain('Second post')
  })

  it('shows "Немає даних" when empty and not loading and no error', () => {
    const { wrapper } = mountWithState({
      isLoading: false,
      error: null,
      items: []
    })

    expect(wrapper.text()).toContain('Немає даних')
  })
})
