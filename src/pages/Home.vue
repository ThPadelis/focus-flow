<script setup>
import { ref, computed } from 'vue'
import { useTimer } from '../composables/useTimer'
import { useTasks } from '../composables/useTasks'
import TimerDisplay from '../components/TimerDisplay.vue'
import TimerControls from '../components/TimerControls.vue'
import ModeSwitcher from '../components/ModeSwitcher.vue'
import TaskList from '../components/TaskList.vue'
import { Settings, Volume2, VolumeX, Plus } from 'lucide-vue-next'

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

const showTaskInput = ref(false)
const newTaskText = ref('')

// Calculate progress percentage
const progress = computed(() => {
  const totalTime = MODES[mode.value]
  if (totalTime === 0) return 0
  return ((totalTime - timeLeft.value) / totalTime) * 100
})

const progressGradient = computed(() => {
  const p = progress.value
  // Using red-500 (#ef4444) for progress and zinc-800 (#27272a) for the rest
  return `conic-gradient(from 0deg, #ef4444 ${p}%, #27272a ${p}%)`
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
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-6xl flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-center">
      <!-- Timer Card -->
      <div 
        class="w-full max-w-md rounded-3xl p-[3px] shadow-2xl relative"
        :style="{ background: progressGradient }"
      >
        <div class="bg-zinc-900 rounded-[calc(1.5rem-3px)] p-8 h-full w-full relative">
          <!-- Settings Button -->
          <button 
            @click="$emit('navigate', 'settings')"
            class="absolute top-8 left-8 text-zinc-500 hover:text-white transition-colors"
            title="Settings"
          >
            <Settings :size="24" />
          </button>

          <!-- Mute Toggle -->
          <button 
            @click="toggleMute"
            class="absolute top-8 right-8 text-zinc-500 hover:text-zinc-300 transition-colors"
            :title="isMuted ? 'Unmute' : 'Mute'"
          >
            <VolumeX v-if="isMuted" :size="24" />
            <Volume2 v-else :size="24" />
          </button>

          <div class="flex flex-col items-center space-y-12">
            <!-- Header -->
            <div class="flex items-center gap-2">
              <span class="text-red-500 text-xl">🍅</span>
              <h1 class="text-lg font-medium text-zinc-400">FocusFlow</h1>
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
              <div class="text-zinc-600 font-medium text-sm">
                Sessions: <span class="text-zinc-300">{{ sessions }}</span>
              </div>

              <!-- Add Task Button/Input -->
              <div class="w-full">
                <div v-if="!showTaskInput" class="flex justify-center">
                  <button
                    @click="toggleTaskInput"
                    class="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-lg hover:border-zinc-500 hover:text-white transition-all text-sm"
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
                    class="task-input flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                  >
                  <button
                    @click="handleAddTask"
                    class="p-2 bg-zinc-800 border border-zinc-700 text-zinc-400 rounded-lg hover:text-white hover:border-zinc-500 transition-all"
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
        class="w-full max-w-md bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-zinc-800"
      >
        <TaskList />
      </div>
    </div>
  </div>
</template>
