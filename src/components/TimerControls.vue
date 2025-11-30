<script setup>
defineProps({
  isRunning: {
    type: Boolean,
    required: true
  }
})

defineEmits(['start', 'pause', 'reset'])
</script>

<template>
  <div class="flex gap-4 w-full justify-center">
    <button
      v-if="!isRunning"
      @click="$emit('start')"
      class="w-32 py-3 border border-zinc-700 text-zinc-300 rounded-xl font-medium hover:border-zinc-500 hover:text-white transition-all duration-200 text-lg"
    >
      Start
    </button>
    <button
      v-else
      @click="$emit('pause')"
      class="w-32 py-3 border border-zinc-700 text-zinc-300 rounded-xl font-medium hover:border-zinc-500 hover:text-white transition-all duration-200 text-lg"
    >
      Pause
    </button>
    <button
      @click="$emit('reset')"
      class="w-32 py-3 border border-zinc-700 text-zinc-300 rounded-xl font-medium hover:border-zinc-500 hover:text-white transition-all duration-200 text-lg"
    >
      Reset
    </button>
  </div>
</template>
