<script setup>
defineProps({
  currentMode: {
    type: String,
    required: true
  }
})

defineEmits(['change-mode'])

const modes = [
  { id: 'work', label: 'Work' },
  { id: 'short', label: 'Short Break' },
  { id: 'long', label: 'Long Break' }
]
</script>

<template>
  <div class="flex p-1 bg-zinc-800 rounded-xl border border-zinc-700/50">
    <button
      v-for="mode in modes"
      :key="mode.id"
      @click="$emit('change-mode', mode.id)"
      class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
      :class="[
        currentMode === mode.id
          ? 'bg-zinc-700 text-white shadow-sm'
          : 'text-zinc-500 hover:text-zinc-300'
      ]"
    >
      {{ mode.label }}
    </button>
  </div>
</template>
