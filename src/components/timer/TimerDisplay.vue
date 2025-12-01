<script setup>
defineProps({
  time: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="text-8xl font-bold text-gray-900 dark:text-white tracking-tighter tabular-nums">
    {{ time }}
  </div>
</template>
