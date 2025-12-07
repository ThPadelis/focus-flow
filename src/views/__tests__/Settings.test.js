import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Settings from '../Settings.vue'

const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

const mockUpdateDurations = vi.fn()
const mockSetSound = vi.fn()
const mockPreviewSound = vi.fn()
const mockSetTheme = vi.fn()

vi.mock('../../composables/useTimer', () => ({
  useTimer: () => ({
    MODES: { work: 1500, short: 300, long: 900 },
    updateDurations: mockUpdateDurations,
    selectedSound: 'bell',
    sounds: { bell: { name: 'Bell' }, chime: { name: 'Chime' } },
    setSound: mockSetSound,
    previewSound: mockPreviewSound
  })
}))

vi.mock('../../composables/useTheme', () => ({
  useTheme: () => ({
    currentTheme: 'default',
    themes: { default: { name: 'Default', primary: '#red' }, forest: { name: 'Forest', primary: '#green' } },
    setTheme: mockSetTheme
  })
}))

describe('Settings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes form with current values (converted to minutes)', () => {
    const wrapper = mount(Settings)
    const inputs = wrapper.findAll('input[type="number"]')
    expect(inputs[0].element.value).toBe('25')
    expect(inputs[1].element.value).toBe('5')
    expect(inputs[2].element.value).toBe('15')
  })

  it('calls updateDurations and redirects on save', async () => {
    const wrapper = mount(Settings)
    
    const buttons = wrapper.findAll('button')
    const saveButton = buttons.find(b => b.text().includes('Save Changes'))
    
    await saveButton.trigger('click')
    
    expect(mockUpdateDurations).toHaveBeenCalledWith({
      work: 1500,
      short: 300,
      long: 900
    })
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('calls setSound and previewSound when sound selected', async () => {
    const wrapper = mount(Settings)
    
    const buttons = wrapper.findAll('button')
    const chimeButton = buttons.find(b => b.text().includes('Chime'))
    
    await chimeButton.trigger('click')
    
    expect(mockSetSound).toHaveBeenCalledWith('chime')
    expect(mockPreviewSound).toHaveBeenCalled()
  })

  it('calls setTheme when theme selected', async () => {
    const wrapper = mount(Settings)
    
    const buttons = wrapper.findAll('button')
    const forestButton = buttons.find(b => b.text().includes('Forest'))
    
    await forestButton.trigger('click')
    
    expect(mockSetTheme).toHaveBeenCalledWith('forest')
  })
})
