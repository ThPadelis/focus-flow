import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskInput from '../TaskInput.vue'

describe('TaskInput', () => {
  it('renders correctly', () => {
    const wrapper = mount(TaskInput)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('updates v-model', async () => {
    const wrapper = mount(TaskInput)
    const input = wrapper.find('input')
    await input.setValue('New Task')
    expect(input.element.value).toBe('New Task')
  })

  it('emits add event with input value on enter', async () => {
    const wrapper = mount(TaskInput)
    await wrapper.find('input').setValue('New Task')
    await wrapper.find('input').trigger('keyup.enter')
    
    expect(wrapper.emitted('add')).toBeTruthy()
    expect(wrapper.emitted('add')[0]).toEqual(['New Task'])
    expect(wrapper.find('input').element.value).toBe('')
  })

  it('emits add event with input value on button click', async () => {
    const wrapper = mount(TaskInput)
    await wrapper.find('input').setValue('New Task')
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('add')).toBeTruthy()
    expect(wrapper.emitted('add')[0]).toEqual(['New Task'])
  })

  it('does not emit add event if input is empty', async () => {
    const wrapper = mount(TaskInput)
    await wrapper.find('input').setValue('   ')
    await wrapper.find('input').trigger('keyup.enter')
    
    expect(wrapper.emitted('add')).toBeFalsy()
  })
})
