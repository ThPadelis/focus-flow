import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TimerDisplay from '../TimerDisplay.vue'

describe('TimerDisplay', () => {
  it('renders time correctly', () => {
    const wrapper = mount(TimerDisplay, {
      props: {
        time: '25:00'
      }
    })
    expect(wrapper.text()).toBe('25:00')
  })

  it('updates time when prop changes', async () => {
    const wrapper = mount(TimerDisplay, {
      props: {
        time: '25:00'
      }
    })
    await wrapper.setProps({ time: '24:59' })
    expect(wrapper.text()).toBe('24:59')
  })
})
