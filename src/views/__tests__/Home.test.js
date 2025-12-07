import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '../Home.vue'

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '../Home.vue'

vi.mock('../../components/timer/TimerCard.vue', () => ({
  default: {
    template: '<div class="timer-card-stub"></div>',
    emits: ['open-shortcuts']
  }
}))

vi.mock('../../components/tasks/TaskList.vue', () => ({
  default: {
    template: '<div class="task-list-stub"></div>'
  }
}))

vi.mock('../../components/common/ShortcutsModal.vue', () => ({
  default: {
    props: ['isOpen'],
    template: '<div class="shortcuts-modal-stub" :class="{ open: isOpen }"></div>',
    emits: ['close']
  }
}))

const mockTasks = ref([{ id: 1, text: 'Task 1' }])
import { ref } from 'vue'

vi.mock('../../composables/useTasks', () => ({
  useTasks: () => ({
    tasks: mockTasks
  })
}))

describe('Home', () => {
  it('renders TimerCard', () => {
    const wrapper = mount(Home)
    expect(wrapper.find('.timer-card-stub').exists()).toBe(true)
  })

  it('renders TaskList when tasks exist', () => {
    mockTasks.value = [{ id: 1 }]
    const wrapper = mount(Home)
    expect(wrapper.find('.task-list-stub').exists()).toBe(true)
  })

  it('hides TaskList when no tasks', async () => {
    mockTasks.value = []
    const wrapper = mount(Home)
    expect(wrapper.find('.task-list-stub').exists()).toBe(false)
  })

  it('opens shortcuts modal when event emitted', async () => {
    const wrapper = mount(Home)
    
    await wrapper.findComponent({ name: 'TimerCard' }).vm.$emit('open-shortcuts')
    
    const modal = wrapper.findComponent({ name: 'ShortcutsModal' })
    expect(modal.props('isOpen')).toBe(true)
  })
})
