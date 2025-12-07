import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ShortcutsModal from '../ShortcutsModal.vue'

describe('ShortcutsModal', () => {
  it('does not render when isOpen is false', () => {
    const wrapper = mount(ShortcutsModal, {
      props: {
        isOpen: false
      }
    })
    expect(wrapper.find('.fixed').exists()).toBe(false)
  })

  it('renders when isOpen is true', () => {
    const wrapper = mount(ShortcutsModal, {
      props: {
        isOpen: true
      }
    })
    expect(wrapper.find('.fixed').exists()).toBe(true)
    expect(wrapper.text()).toContain('Keyboard Shortcuts')
  })

  it('renders all shortcuts', () => {
    const wrapper = mount(ShortcutsModal, {
      props: {
        isOpen: true
      }
    })
    expect(wrapper.text()).toContain('Space')
    expect(wrapper.text()).toContain('Start / Pause Timer')
    expect(wrapper.text()).toContain('R')
    expect(wrapper.text()).toContain('Reset Timer')
  })

  it('emits close event when backdrop is clicked', async () => {
    const wrapper = mount(ShortcutsModal, {
      props: {
        isOpen: true
      }
    })
    
    await wrapper.find('.backdrop-blur-sm').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(ShortcutsModal, {
      props: {
        isOpen: true
      }
    })
    
    // Find the close button (one with X icon)
    const buttons = wrapper.findAll('button')
    // We can assume it's the first button (header close) or filter by finding icon parent.
    // The modal has nice semantic structure, button inside header.
    const closeBtn = buttons[0]
    
    await closeBtn.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
