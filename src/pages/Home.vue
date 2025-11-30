<script setup>
const emit = defineEmits(['navigate'])

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTimer } from '../composables/useTimer'
import { useTasks } from '../composables/useTasks'
import TimerDisplay from '../components/TimerDisplay.vue'
import TimerControls from '../components/TimerControls.vue'
import ModeSwitcher from '../components/ModeSwitcher.vue'
import TaskList from '../components/TaskList.vue'
import { Settings, Volume2, VolumeX, Plus, Keyboard, Sun, Moon } from 'lucide-vue-next'
import ShortcutsModal from '../components/ShortcutsModal.vue'
import { useTheme } from '../composables/useTheme'

const {
  timeLeft,
  formattedTime,
  isRunning,
  start,
  pause,
  reset,
  mode,
  setMode,
  sessions,
  isMuted,
  toggleMute,
  MODES
} = useTimer()

const { tasks, addTask } = useTasks()

const { isDarkMode, toggleDarkMode } = useTheme()

const showTaskInput = ref(false)
const newTaskText = ref('')
const showShortcuts = ref(false)

const handleKeydown = (e) => {
  // Ignore if user is typing in an input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

  switch(e.code) {
    case 'Space':
      e.preventDefault() // Prevent scrolling
      if (isRunning.value) pause()
      else start()
      break
    case 'KeyR':
      reset()
      break
    case 'Digit1':
      setMode('work')
      break
    case 'Digit2':
      setMode('short')
      break
    case 'Digit3':
      setMode('long')
      break
    case 'KeyS':
      emit('navigate', 'settings')
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Calculate progress percentage
const progress = computed(() => {
  const totalTime = MODES[mode.value]
  if (totalTime === 0) return 0
  return ((totalTime - timeLeft.value) / totalTime) * 100
})

const progressGradient = computed(() => {
  const p = progress.value
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary') || '#ef4444'
  const bgColor = isDarkMode.value ? '#27272a' : '#e4e4e7' // zinc-800 for dark, zinc-200 for light
  return `conic-gradient(from 0deg, ${primaryColor} ${p}%, ${bgColor} ${p}%)`
})

const handleAddTask = () => {
  if (newTaskText.value.trim()) {
    addTask(newTaskText.value)
    newTaskText.value = ''
    showTaskInput.value = false
  }
}

const toggleTaskInput = () => {
  showTaskInput.value = !showTaskInput.value
  if (showTaskInput.value) {
    // Focus input after showing
    setTimeout(() => {
      document.querySelector('.task-input')?.focus()
    }, 100)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
    <div class="w-full max-w-6xl flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-center">
      <!-- Timer Card -->
      <div 
        class="w-full max-w-md rounded-3xl p-[3px] shadow-2xl relative"
        :style="{ background: progressGradient }"
      >
        <div class="bg-white dark:bg-zinc-900 rounded-[calc(1.5rem-3px)] p-8 h-full w-full relative transition-colors duration-300">
          <!-- Settings Button -->
          <button 
            @click="$emit('navigate', 'settings')"
            class="absolute top-8 left-8 text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Settings (S)"
          >
            <Settings :size="24" />
          </button>

          <!-- Shortcuts Button -->
          <button 
            @click="showShortcuts = true"
            class="absolute top-8 left-20 text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Keyboard Shortcuts"
          >
            <Keyboard :size="24" />
          </button>

          <!-- Mute Toggle -->
          <button 
            @click="toggleMute"
            class="absolute top-8 right-16 text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            :title="isMuted ? 'Unmute' : 'Mute'"
          >
            <VolumeX v-if="isMuted" :size="24" />
            <Volume2 v-else :size="24" />
          </button>

          <!-- Dark Mode Toggle -->
          <button 
            @click="toggleDarkMode"
            class="absolute top-8 right-8 text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            :title="isDarkMode ? 'Light Mode' : 'Dark Mode'"
          >
            <Sun v-if="isDarkMode" :size="24" />
            <Moon v-else :size="24" />
          </button>

          <div class="flex flex-col items-center space-y-12">
            <!-- Header -->
            <div class="flex items-center gap-2">
              <span class="text-red-500 text-xl">🍅</span>
              <h1 class="text-lg font-medium text-gray-600 dark:text-zinc-400">FocusFlow</h1>
            </div>

            <!-- Timer -->
            <div class="flex flex-col items-center space-y-8 w-full">
              <TimerDisplay :time="formattedTime" />
              
              <TimerControls 
                :is-running="isRunning"
                @start="start"
                @pause="pause"
                @reset="reset"
              />
            </div>

            <!-- Mode Switcher -->
            <ModeSwitcher 
              :current-mode="mode" 
              @change-mode="setMode"
            />

            <!-- Sessions -->
            <div class="flex flex-col items-center space-y-4 w-full">
              <div class="text-gray-500 dark:text-zinc-600 font-medium text-sm">
                Sessions: <span class="text-gray-900 dark:text-zinc-300">{{ sessions }}</span>
              </div>

              <!-- Add Task Button/Input -->
              <div class="w-full">
                <div v-if="!showTaskInput" class="flex justify-center">
                  <button
                    @click="toggleTaskInput"
                    class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 rounded-lg hover:border-gray-400 dark:hover:border-zinc-500 hover:text-gray-900 dark:hover:text-white transition-all text-sm cursor-pointer"
                  >
                    <Plus :size="16" />
                    <span>Add Task</span>
                  </button>
                </div>
                <div v-else class="flex gap-2">
                  <input
                    v-model="newTaskText"
                    @keyup.enter="handleAddTask"
                    @keyup.esc="showTaskInput = false"
                    type="text"
                    placeholder="Enter task name..."
                    class="task-input flex-1 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gray-400 dark:focus:border-zinc-500 transition-colors"
                  >
                  <button
                    @click="handleAddTask"
                    class="p-2 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 rounded-lg hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-zinc-500 transition-all cursor-pointer"
                    title="Add task"
                  >
                    <Plus :size="20" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Task List Card (only visible when tasks exist) -->
      <div 
        v-if="tasks.length > 0"
        class="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-zinc-800 transition-colors duration-300"
      >
        <TaskList />
      </div>
    </div>
    
    <ShortcutsModal 
      :is-open="showShortcuts"
      @close="showShortcuts = false"
    />
  </div>
</template>
