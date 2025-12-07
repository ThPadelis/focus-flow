import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import About from '../About.vue'

const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

describe('About', () => {
  it('renders correctly', () => {
    const wrapper = mount(About)
    expect(wrapper.text()).toContain('FocusFlow')
    expect(wrapper.text()).toContain('Features')
    expect(wrapper.text()).toContain('How to Use')
  })

  it('navigates back when back button clicked', async () => {
    const wrapper = mount(About)
    
    const buttons = wrapper.findAll('button')
    const backButton = buttons.find(b => b.text().includes('Back'))
    
    await backButton.trigger('click')
    expect(mockPush).toHaveBeenCalledWith('/')
  })
})
