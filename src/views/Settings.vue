<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTimer } from '../composables/useTimer'
import { useTheme } from '../composables/useTheme'
import { ArrowLeft, Volume2 } from 'lucide-vue-next'

const router = useRouter()

const { MODES, updateDurations, selectedSound, sounds, setSound, previewSound } = useTimer()
const { currentTheme, themes, setTheme } = useTheme()

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
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
    <div class="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-zinc-800 relative transition-colors duration-300">
      <div class="flex items-center gap-4 mb-8">
        <button 
          @click="router.push('/')"
          class="text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft :size="20" />
          <span>Back</span>
        </button>
        <h1 class="text-xl font-medium text-gray-900 dark:text-white">Settings</h1>
      </div>

      <div class="space-y-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-zinc-400">Work Duration (minutes)</label>
          <input 
            v-model="form.work" 
            type="number" 
            min="1"
            class="w-full bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-gray-400 dark:focus:border-zinc-500 transition-colors"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-zinc-400">Short Break (minutes)</label>
          <input 
            v-model="form.short" 
            type="number" 
            min="1"
            class="w-full bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-gray-400 dark:focus:border-zinc-500 transition-colors"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-zinc-400">Long Break (minutes)</label>
          <input 
            v-model="form.long" 
            type="number" 
            min="1"
            class="w-full bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-gray-400 dark:focus:border-zinc-500 transition-colors"
          >
        </div>

        <!-- Sound Selection -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-zinc-400">Completion Sound</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="(sound, key) in sounds"
              :key="key"
              @click="handleSoundSelect(key)"
              class="flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer"
              :class="[
                selectedSound === key
                  ? 'bg-gray-200 dark:bg-zinc-700 border-2 border-gray-400 dark:border-zinc-500 text-gray-900 dark:text-white'
                  : 'bg-gray-100 dark:bg-zinc-800 border-2 border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-400 hover:border-gray-400 dark:hover:border-zinc-600'
              ]"
            >
              <span class="text-sm font-medium">{{ sound.name }}</span>
              <Volume2 :size="16" class="opacity-50" />
            </button>
          </div>
        </div>

        <!-- Theme Selection -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-zinc-400">Color Theme</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="(theme, key) in themes"
              :key="key"
              @click="setTheme(key)"
              class="flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer"
              :class="[
                currentTheme === key
                  ? 'bg-gray-200 dark:bg-zinc-700 border-2 border-gray-400 dark:border-zinc-500 text-gray-900 dark:text-white'
                  : 'bg-gray-100 dark:bg-zinc-800 border-2 border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-400 hover:border-gray-400 dark:hover:border-zinc-600'
              ]"
            >
              <span class="text-sm font-medium">{{ theme.name }}</span>
              <div 
                class="w-4 h-4 rounded-full" 
                :style="{ backgroundColor: theme.primary }"
              ></div>
            </button>
          </div>
        </div>

        <button 
          @click="save"
          class="w-full bg-gray-900 dark:bg-white text-white dark:text-zinc-900 font-medium py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors mt-4 cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>
