<script setup>
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'

defineProps({
  placeholder: {
    type: String,
    default: 'Add a new task...'
  }
})

const emit = defineEmits(['add'])

const newTaskText = ref('')

const handleAddTask = () => {
  if (newTaskText.value.trim()) {
    emit('add', newTaskText.value)
    newTaskText.value = ''
  }
}
</script>

<template>
  <div class="flex gap-2">
    <input
      v-model="newTaskText"
      @keyup.enter="handleAddTask"
      type="text"
      :placeholder="placeholder"
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
</template>
