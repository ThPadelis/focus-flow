<script setup>
defineProps({
  isRunning: {
    type: Boolean,
    required: true
  }
})

defineEmits(['start', 'pause', 'reset'])

import { useTimer } from '../composables/useTimer'

const { notificationPermission, requestNotificationPermission, sendNotification } = useTimer()
</script>

<template>
  <div class="flex gap-4 w-full justify-center">
    <button
      v-if="!isRunning"
      @click="$emit('start')"
      class="w-32 py-3 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 rounded-xl font-medium hover:border-gray-500 dark:hover:border-zinc-500 hover:text-gray-900 dark:hover:text-white transition-all duration-200 text-lg cursor-pointer"
    >
      Start
    </button>
    <button
      v-else
      @click="$emit('pause')"
      class="w-32 py-3 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 rounded-xl font-medium hover:border-gray-500 dark:hover:border-zinc-500 hover:text-gray-900 dark:hover:text-white transition-all duration-200 text-lg cursor-pointer"
    >
      Pause
    </button>
    <button
      @click="$emit('reset')"
      class="w-32 py-3 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 rounded-xl font-medium hover:border-gray-500 dark:hover:border-zinc-500 hover:text-gray-900 dark:hover:text-white transition-all duration-200 text-lg cursor-pointer"
    >
      Reset
    </button>
  </div>
  
  <div v-if="notificationPermission === 'default'" class="flex justify-center mt-4">
    <button
      @click="requestNotificationPermission"
      class="text-sm text-gray-600 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-300 transition-colors flex items-center gap-2 cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      Enable Notifications
    </button>
  </div>
</template>
