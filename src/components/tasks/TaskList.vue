<script setup>
import { useTasks } from '../../composables/useTasks'
import TaskInput from './TaskInput.vue'
import TaskItem from './TaskItem.vue'

const { tasks, currentTaskId, addTask, toggleTask, deleteTask, setCurrentTask } = useTasks()

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
    <TaskInput @add="addTask" />

    <!-- Task List -->
    <div class="space-y-2 max-h-64 overflow-y-auto">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :is-current="currentTaskId === task.id"
        @toggle="toggleTask(task.id)"
        @click="handleTaskClick(task.id)"
        @delete="deleteTask(task.id)"
      />

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
