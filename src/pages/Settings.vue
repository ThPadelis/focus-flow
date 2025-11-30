<script setup>
import { ref } from 'vue'
import { useTimer } from '../composables/useTimer'
import { ArrowLeft, Volume2 } from 'lucide-vue-next'

const emit = defineEmits(['navigate'])

const { MODES, updateDurations, selectedSound, sounds, setSound, previewSound } = useTimer()

const form = ref({
  work: MODES.work / 60,
  short: MODES.short / 60,
  long: MODES.long / 60
})

const handleSoundSelect = (soundId) => {
  setSound(soundId)
  previewSound()
}

const save = () => {
  updateDurations({
    work: form.value.work * 60,
    short: form.value.short * 60,
    long: form.value.long * 60
  })
  emit('navigate', 'home')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-zinc-800 relative">
      <div class="flex items-center gap-4 mb-8">
        <button 
          @click="$emit('navigate', 'home')"
          class="text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft :size="20" />
          <span>Back</span>
        </button>
        <h1 class="text-xl font-medium text-white">Settings</h1>
      </div>

      <div class="space-y-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-zinc-400">Work Duration (minutes)</label>
          <input 
            v-model="form.work" 
            type="number" 
            min="1"
            class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-zinc-400">Short Break (minutes)</label>
          <input 
            v-model="form.short" 
            type="number" 
            min="1"
            class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-zinc-400">Long Break (minutes)</label>
          <input 
            v-model="form.long" 
            type="number" 
            min="1"
            class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors"
          >
        </div>

        <!-- Sound Selection -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-zinc-400">Completion Sound</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="(sound, key) in sounds"
              :key="key"
              @click="handleSoundSelect(key)"
              class="flex items-center justify-between px-4 py-3 rounded-xl transition-all"
              :class="[
                selectedSound === key
                  ? 'bg-zinc-700 border-2 border-zinc-500 text-white'
                  : 'bg-zinc-800 border-2 border-zinc-700 text-zinc-400 hover:border-zinc-600'
              ]"
            >
              <span class="text-sm font-medium">{{ sound.name }}</span>
              <Volume2 :size="16" class="opacity-50" />
            </button>
          </div>
        </div>

        <button 
          @click="save"
          class="w-full bg-white text-zinc-900 font-medium py-3 rounded-xl hover:bg-zinc-200 transition-colors mt-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>
