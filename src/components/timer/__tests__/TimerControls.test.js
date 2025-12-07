import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TimerControls from '../TimerControls.vue'

const mockRequestNotificationPermission = vi.fn()
vi.mock('../../../composables/useTimer', () => ({
  useTimer: () => ({
    notificationPermission: 'default',
    requestNotificationPermission: mockRequestNotificationPermission,
    sendNotification: vi.fn()
  })
}))

describe('TimerControls', () => {
  it('renders start button when not running', () => {
    const wrapper = mount(TimerControls, {
      props: {
        isRunning: false
      }
    })
    expect(wrapper.text()).toContain('Start')
    expect(wrapper.text()).not.toContain('Pause')
  })

  it('renders pause button when running', () => {
    const wrapper = mount(TimerControls, {
      props: {
        isRunning: true
      }
    })
    expect(wrapper.text()).toContain('Pause')
    expect(wrapper.text()).not.toContain('Start')
  })

  it('emits start event when start button is clicked', async () => {
    const wrapper = mount(TimerControls, {
      props: {
        isRunning: false
      }
    })
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('start')).toBeTruthy()
  })

  it('emits pause event when pause button is clicked', async () => {
    const wrapper = mount(TimerControls, {
      props: {
        isRunning: true
      }
    })
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('pause')).toBeTruthy()
  })

  it('emits reset event when reset button is clicked', async () => {
    const wrapper = mount(TimerControls, {
      props: {
        isRunning: false
      }
    })
    
    // Reset is the second button (index 1) or third if we count by text, 
    // but easier to find by text content or checking the list of buttons.
    // Start/Pause is button 1, Reset is button 2.
    const buttons = wrapper.findAll('button')
    const resetButton = buttons.find(b => b.text() === 'Reset')
    
    await resetButton.trigger('click')
    expect(wrapper.emitted('reset')).toBeTruthy()
  })

  it('calls requestNotificationPermission when notification button is clicked', async () => {
    const wrapper = mount(TimerControls, {
      props: {
        isRunning: false
      }
    })
    
    // Notification button is likely last
    const buttons = wrapper.findAll('button')
    const notifyButton = buttons.find(b => b.text().includes('Enable Notifications'))
    
    await notifyButton.trigger('click')
    expect(mockRequestNotificationPermission).toHaveBeenCalled()
  })
})
