import { describe, it, expect, beforeEach } from 'vitest'
import { useTasks } from '../useTasks'

describe('useTasks', () => {
  beforeEach(() => {
    localStorage.clear()
    const { tasks, currentTaskId } = useTasks()
    tasks.value = []
    currentTaskId.value = null
  })

  it('addTask creates a new task', () => {
    const { addTask, tasks } = useTasks()
    const id = addTask('New Task')
    
    expect(tasks.value).toHaveLength(1)
    expect(tasks.value[0].text).toBe('New Task')
    expect(tasks.value[0].id).toBe(id)
  })

  it('toggleTask changes completed status', () => {
    const { addTask, toggleTask, tasks } = useTasks()
    const id = addTask('Task to toggle')
    
    toggleTask(id)
    expect(tasks.value[0].completed).toBe(true)
    
    toggleTask(id)
    expect(tasks.value[0].completed).toBe(false)
  })

  it('deleteTask removes task', () => {
    const { addTask, deleteTask, tasks } = useTasks()
    const id = addTask('Task to delete')
    
    deleteTask(id)
    expect(tasks.value).toHaveLength(0)
  })

  it('setCurrentTask updates currentTaskId', () => {
    const { addTask, setCurrentTask, currentTaskId } = useTasks()
    const id = addTask('Current Task')
    
    setCurrentTask(id)
    expect(currentTaskId.value).toBe(id)
    expect(localStorage.getItem('focus-flow-current-task')).toBe(id)
  })

    incrementTaskSession(id)
    expect(tasks.value[0].sessions).toBe(1)
  })

  it('deleteTask clears currentTaskId if deleted', () => {
    const { addTask, deleteTask, setCurrentTask, currentTaskId } = useTasks()
    const id = addTask('Task')
    setCurrentTask(id)
    
    deleteTask(id)
    expect(currentTaskId.value).toBe(null)
    expect(localStorage.getItem('focus-flow-current-task')).toBe(null)
  })

  it('setCurrentTask(null) clears storage', () => {
    const { setCurrentTask } = useTasks()
    setCurrentTask(null)
    expect(localStorage.getItem('focus-flow-current-task')).toBe(null)
  })
})
