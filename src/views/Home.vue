<script setup>
import { ref } from 'vue'
import { useTasks } from '../composables/useTasks'
import TimerCard from '../components/timer/TimerCard.vue'
import TaskList from '../components/tasks/TaskList.vue'
import ShortcutsModal from '../components/common/ShortcutsModal.vue'



const { tasks } = useTasks()
const showShortcuts = ref(false)
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
    <div class="w-full max-w-6xl flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-center">
      <!-- Timer Card -->
      <TimerCard 
        @open-shortcuts="showShortcuts = true"
      />

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
