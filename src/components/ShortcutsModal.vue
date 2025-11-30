<script setup>
import { X } from 'lucide-vue-next'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

defineEmits(['close'])

const shortcuts = [
  { key: 'Space', description: 'Start / Pause Timer' },
  { key: 'R', description: 'Reset Timer' },
  { key: '1', description: 'Work Mode' },
  { key: '2', description: 'Short Break' },
  { key: '3', description: 'Long Break' },
  { key: 'S', description: 'Open Settings' },
]
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        @click="$emit('close')"
      ></div>

      <!-- Modal -->
      <div class="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-white">Keyboard Shortcuts</h2>
            <button 
              @click="$emit('close')"
              class="text-zinc-500 hover:text-white transition-colors"
            >
              <X :size="20" />
            </button>
          </div>

          <div class="space-y-3">
            <div 
              v-for="shortcut in shortcuts" 
              :key="shortcut.key"
              class="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-800"
            >
              <span class="text-zinc-300">{{ shortcut.description }}</span>
              <kbd class="px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded-md text-sm font-mono text-zinc-400 min-w-[2rem] text-center shadow-sm">
                {{ shortcut.key }}
              </kbd>
            </div>
          </div>
        </div>
        
        <div class="px-6 py-4 bg-zinc-800/30 border-t border-zinc-800 text-center">
          <p class="text-xs text-zinc-500">
            Shortcuts are disabled when typing in text fields
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>
