import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskItem from '../TaskItem.vue'

describe('TaskItem', () => {
  const task = {
    id: 1,
    text: 'Test Task',
    completed: false,
    sessions: 2
  }

  it('renders task details correctly', () => {
    const wrapper = mount(TaskItem, {
      props: { task }
    })
    expect(wrapper.text()).toContain('Test Task')
    expect(wrapper.text()).toContain('2')
  })

  it('renders completed styling', () => {
    const completedTask = { ...task, completed: true }
    const wrapper = mount(TaskItem, {
      props: { task: completedTask }
    })
    
    const textButton = wrapper.findAll('button').find(b => b.text() === 'Test Task')
    expect(textButton.classes()).toContain('line-through')
  })

  it('renders current task styling', () => {
    const wrapper = mount(TaskItem, {
      props: { 
        task,
        isCurrent: true
      }
    })
    
    expect(wrapper.classes()).toContain('bg-gray-100')
  })

  it('emits toggle event', async () => {
    const wrapper = mount(TaskItem, {
      props: { task }
    })
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('toggle')).toBeTruthy()
  })

  it('emits click event (select)', async () => {
    const wrapper = mount(TaskItem, {
      props: { task }
    })
    
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('emits delete event', async () => {
    const wrapper = mount(TaskItem, {
      props: { task }
    })
    
    const buttons = wrapper.findAll('button')
    await buttons[buttons.length - 1].trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
  })
})
