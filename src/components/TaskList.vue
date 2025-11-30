<script setup>
import { ref } from 'vue'
import { useTasks } from '../composables/useTasks'
import { Plus, Trash2, Circle, CheckCircle2 } from 'lucide-vue-next'

const { tasks, currentTaskId, addTask, toggleTask, deleteTask, setCurrentTask } = useTasks()

const newTaskText = ref('')

const handleAddTask = () => {
  if (newTaskText.value.trim()) {
    addTask(newTaskText.value)
    newTaskText.value = ''
  }
}

const handleTaskClick = (taskId) => {
  if (currentTaskId.value === taskId) {
    setCurrentTask(null)
  } else {
    setCurrentTask(taskId)
  }
}
</script>

<template>
  <div class="w-full space-y-4">
    <div class="flex items-center gap-2">
      <h2 class="text-sm font-medium text-gray-600 dark:text-zinc-400 uppercase tracking-wider">Tasks</h2>
      <div class="flex-1 h-px bg-gray-300 dark:bg-zinc-800"></div>
    </div>

    <!-- Add Task Input -->
    <div class="flex gap-2">
      <input
        v-model="newTaskText"
        @keyup.enter="handleAddTask"
        type="text"
        placeholder="Add a new task..."
        class="flex-1 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gray-400 dark:focus:border-zinc-500 transition-colors"
      >
      <button
        @click="handleAddTask"
        class="p-2 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 rounded-lg hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-zinc-500 transition-all cursor-pointer"
        title="Add task"
      >
        <Plus :size="20" />
      </button>
    </div>

    <!-- Task List -->
    <div class="space-y-2 max-h-64 overflow-y-auto">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="flex items-center gap-3 p-3 rounded-lg transition-all"
        :class="[
          currentTaskId === task.id 
            ? 'bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700' 
            : 'bg-gray-50 dark:bg-zinc-900/50 border border-transparent hover:bg-gray-100 dark:hover:bg-zinc-800/50'
        ]"
      >
        <!-- Checkbox -->
        <button
          @click="toggleTask(task.id)"
          class="text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors flex-shrink-0 cursor-pointer"
        >
          <CheckCircle2 v-if="task.completed" :size="20" class="text-green-500" />
          <Circle v-else :size="20" />
        </button>

        <!-- Task Text -->
        <button
          @click="handleTaskClick(task.id)"
          class="flex-1 text-left text-sm cursor-pointer"
          :class="[
            task.completed ? 'line-through text-gray-500 dark:text-zinc-600' : 'text-gray-700 dark:text-zinc-300',
            currentTaskId === task.id ? 'font-medium text-gray-900 dark:text-white' : ''
          ]"
        >
          {{ task.text }}
        </button>

        <!-- Session Badge -->
        <div
          v-if="task.sessions > 0"
          class="px-2 py-1 bg-gray-200 dark:bg-zinc-700 rounded text-xs text-gray-700 dark:text-zinc-300 flex-shrink-0"
        >
          {{ task.sessions }}
        </div>

        <!-- Delete Button -->
        <button
          @click="deleteTask(task.id)"
          class="text-gray-500 dark:text-zinc-600 hover:text-red-500 dark:hover:text-red-400 transition-colors flex-shrink-0 cursor-pointer"
        >
          <Trash2 :size="16" />
        </button>
      </div>

      <div v-if="tasks.length === 0" class="text-center py-8 text-gray-500 dark:text-zinc-600 text-sm">
        No tasks yet. Add one to get started!
      </div>
    </div>

    <!-- Current Task Indicator -->
    <div v-if="currentTaskId" class="text-xs text-gray-600 dark:text-zinc-500 flex items-center gap-2">
      <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      Working on: {{ tasks.find(t => t.id === currentTaskId)?.text }}
    </div>
  </div>
</template>
