<script setup>
import { Trash2, Circle, CheckCircle2 } from 'lucide-vue-next'

defineProps({
  task: {
    type: Object,
    required: true
  },
  isCurrent: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle', 'click', 'delete'])
</script>

<template>
  <div
    class="flex items-center gap-3 p-3 rounded-lg transition-all"
    :class="[
      isCurrent 
        ? 'bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700' 
        : 'bg-gray-50 dark:bg-zinc-900/50 border border-transparent hover:bg-gray-100 dark:hover:bg-zinc-800/50'
    ]"
  >
    <!-- Checkbox -->
    <button
      @click="$emit('toggle')"
      class="text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors flex-shrink-0 cursor-pointer"
    >
      <CheckCircle2 v-if="task.completed" :size="20" class="text-green-500" />
      <Circle v-else :size="20" />
    </button>

    <!-- Task Text -->
    <button
      @click="$emit('click')"
      class="flex-1 text-left text-sm cursor-pointer"
      :class="[
        task.completed ? 'line-through text-gray-500 dark:text-zinc-600' : 'text-gray-700 dark:text-zinc-300',
        isCurrent ? 'font-medium text-gray-900 dark:text-white' : ''
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
      @click="$emit('delete')"
      class="text-gray-500 dark:text-zinc-600 hover:text-red-500 dark:hover:text-red-400 transition-colors flex-shrink-0 cursor-pointer"
    >
      <Trash2 :size="16" />
    </button>
  </div>
</template>
