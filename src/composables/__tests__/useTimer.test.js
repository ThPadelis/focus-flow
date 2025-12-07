import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useTimer } from '../useTimer'

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useTimer } from '../useTimer'

global.Notification = {
  permission: 'default',
  requestPermission: vi.fn(),
}

const mockIncrementTaskSession = vi.fn()
vi.mock('../useTasks', () => ({
  useTasks: () => ({
    currentTaskId: { value: '123' },
    incrementTaskSession: mockIncrementTaskSession
  })
}))

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    localStorage.clear()
    vi.clearAllMocks()
    global.Notification.requestPermission.mockResolvedValue('granted')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initializes with default values', () => {
    const { timeLeft, isRunning, mode, formattedTime } = useTimer()
    expect(mode.value).toBe('work')
    expect(timeLeft.value).toBe(25 * 60)
    expect(isRunning.value).toBe(false)
    expect(formattedTime.value).toBe('25:00')
  })

  it('start decreases time', () => {
    const { start, timeLeft } = useTimer()
    start()
    vi.advanceTimersByTime(1000)
    expect(timeLeft.value).toBe(25 * 60 - 1)
  })

  it('pause stops timer', () => {
    const { start, pause, timeLeft, isRunning } = useTimer()
    start()
    vi.advanceTimersByTime(1000)
    pause()
    expect(isRunning.value).toBe(false)
    const timeAtPause = timeLeft.value
    vi.advanceTimersByTime(2000)
    expect(timeLeft.value).toBe(timeAtPause)
  })

  it('reset sets time back to mode duration', () => {
    const { start, reset, timeLeft } = useTimer()
    start()
    vi.advanceTimersByTime(5000)
    reset()
    expect(timeLeft.value).toBe(25 * 60)
  })

  it('setMode changes mode and resets time', () => {
    const { setMode, mode, timeLeft } = useTimer()
    setMode('short')
    expect(mode.value).toBe('short')
    expect(timeLeft.value).toBe(5 * 60)
  })

  it('toggleMute persists to localStorage', () => {
    const { toggleMute, isMuted } = useTimer()
    expect(isMuted.value).toBe(false)
    
    toggleMute()
    expect(isMuted.value).toBe(true)
    expect(localStorage.getItem('focus-flow-muted')).toBe('true')
  })

  it('finish increments sessions and plays sound', () => {
    const { start, sessions } = useTimer()
    start()
    vi.advanceTimersByTime(25 * 60 * 1000 + 100)
    
    expect(sessions.value).toBe(1)
    expect(mockIncrementTaskSession).toHaveBeenCalledWith('123')
  })
})
