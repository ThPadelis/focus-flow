import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ModeSwitcher from '../ModeSwitcher.vue'

describe('ModeSwitcher', () => {
  it('renders all modes', () => {
    const wrapper = mount(ModeSwitcher, {
      props: {
        currentMode: 'work'
      }
    })
    expect(wrapper.text()).toContain('Work')
    expect(wrapper.text()).toContain('Short Break')
    expect(wrapper.text()).toContain('Long Break')
  })

  it('highlights current mode', () => {
    const wrapper = mount(ModeSwitcher, {
      props: {
        currentMode: 'short'
      }
    })
    
    const buttons = wrapper.findAll('button')
    const shortButton = buttons.find(b => b.text() === 'Short Break')
    
    expect(shortButton.classes()).toContain('bg-white')
    expect(shortButton.classes()).toContain('dark:bg-zinc-700')
  })

  it('emits change-mode with correct id when clicked', async () => {
    const wrapper = mount(ModeSwitcher, {
      props: {
        currentMode: 'work'
      }
    })
    
    const buttons = wrapper.findAll('button')
    const longButton = buttons.find(b => b.text() === 'Long Break')
    
    await longButton.trigger('click')
    expect(wrapper.emitted('change-mode')).toBeTruthy()
    expect(wrapper.emitted('change-mode')[0]).toEqual(['long'])
  })
})
