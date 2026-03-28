import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

describe('smoke test', () => {
  it('runs vitest and mounts a vue component', () => {
    const TestComponent = defineComponent({
      name: 'TestComponent',
      render() {
        return h('div', { class: 'smoke' }, 'Smoke OK')
      }
    })

    const wrapper = mount(TestComponent)

    expect(wrapper.text()).toContain('Smoke OK')
    expect(wrapper.find('.smoke').exists()).toBe(true)
  })
})
