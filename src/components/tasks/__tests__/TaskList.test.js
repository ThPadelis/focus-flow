import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskList from '../TaskList.vue'

const mockAddTask = vi.fn()
const mockToggleTask = vi.fn()
const mockDeleteTask = vi.fn()
const mockSetCurrentTask = vi.fn()
const mockTasks = [
  { id: 1, text: 'Task 1', completed: false, sessions: 0 },
  { id: 2, text: 'Task 2', completed: true, sessions: 1 }
]
const mockCurrentTaskId = { value: null }

vi.mock('../../../composables/useTasks', () => ({
  useTasks: () => ({
    tasks: mockTasks,
    currentTaskId: mockCurrentTaskId,
    addTask: mockAddTask,
    toggleTask: mockToggleTask,
    deleteTask: mockDeleteTask,
    setCurrentTask: mockSetCurrentTask
  })
}))

describe('TaskList', () => {
  it('renders tasks correctly', () => {
    const wrapper = mount(TaskList)
    expect(wrapper.text()).toContain('Task 1')
    expect(wrapper.text()).toContain('Task 2')
  })

  // Testing integration is tricky with shallowMount vs mount and mocks.
  // We can verify that interactions within child components propagate to our store methods if we mount fully.
  
  it('calls addTask when TaskInput emits add', async () => {
    const wrapper = mount(TaskList)
    const input = wrapper.findComponent({ name: 'TaskInput' })
    
    await input.vm.$emit('add', 'New Task')
    expect(mockAddTask).toHaveBeenCalledWith('New Task')
  })

  it('calls toggleTask when TaskItem emits toggle', async () => {
    const wrapper = mount(TaskList)
    const items = wrapper.findAllComponents({ name: 'TaskItem' })
    
    await items[0].vm.$emit('toggle')
    expect(mockToggleTask).toHaveBeenCalledWith(1)
  })

  it('calls setCurrentTask when TaskItem emits click', async () => {
    const wrapper = mount(TaskList)
    const items = wrapper.findAllComponents({ name: 'TaskItem' })
    
    await items[0].vm.$emit('click')
    expect(mockSetCurrentTask).toHaveBeenCalledWith(1)
  })

  it('calls deleteTask when TaskItem emits delete', async () => {
    const wrapper = mount(TaskList)
    const items = wrapper.findAllComponents({ name: 'TaskItem' })
    
    await items[0].vm.$emit('delete')
    expect(mockDeleteTask).toHaveBeenCalledWith(1)
  })
})
