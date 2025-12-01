<script setup>
import { useRouter } from 'vue-router'
import { ArrowLeft, Timer, ListTodo, Palette, Keyboard, Bell, Zap } from 'lucide-vue-next'

const router = useRouter()

const features = [
  {
    icon: Timer,
    title: 'Pomodoro Timer',
    description: 'Work in focused 25-minute sessions with customizable break intervals. Track your productivity with session counters.'
  },
  {
    icon: ListTodo,
    title: 'Task Management',
    description: 'Create and manage tasks alongside your timer. Mark tasks as active, complete them, and track how many sessions you\'ve dedicated to each task.'
  },
  {
    icon: Palette,
    title: 'Themes & Customization',
    description: 'Choose from 5 beautiful color themes (Default, Forest, Ocean, Sunset, Purple Dream) and switch between light and dark modes.'
  },
  {
    icon: Keyboard,
    title: 'Keyboard Shortcuts',
    description: 'Control everything with your keyboard. Start, pause, reset, and switch modes without touching your mouse.'
  },
  {
    icon: Bell,
    title: 'Notifications & Sounds',
    description: 'Get browser notifications when your timer completes. Choose from 4 different completion sounds (Bell, Chime, Digital, Gentle).'
  },
  {
    icon: Zap,
    title: 'Visual Progress',
    description: 'Watch your progress with a beautiful animated gradient border that fills up as you work through each session.'
  }
]

const shortcuts = [
  { key: 'Space', description: 'Start or pause the timer' },
  { key: 'R', description: 'Reset the timer to current mode\'s default duration' },
  { key: '1', description: 'Switch to Work mode (25 minutes)' },
  { key: '2', description: 'Switch to Short Break mode (5 minutes)' },
  { key: '3', description: 'Switch to Long Break mode (15 minutes)' },
  { key: 'S', description: 'Open Settings page' },
  { key: 'Esc', description: 'Close task input (when typing)' }
]

const tips = [
  'Set a task before starting your timer to track what you\'re working on',
  'Use keyboard shortcuts for faster workflow - try pressing Space to start!',
  'Customize your timer durations in Settings to match your work style',
  'Enable notifications to stay aware of timer completion even when multitasking',
  'Try different color themes to find one that helps you focus',
  'Mark tasks as complete to track your productivity over time'
]
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
    <div class="w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-zinc-800 relative transition-colors duration-300">
      <!-- Back Button -->
      <button 
        @click="router.push('/')"
        class="absolute top-8 left-8 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
      >
        <ArrowLeft :size="20" />
        <span>Back</span>
      </button>

      <div class="max-w-3xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12 mt-4">
          <div class="flex items-center justify-center gap-2 mb-4">
            <span class="text-red-500 text-3xl">🍅</span>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">FocusFlow</h1>
          </div>
          <p class="text-lg text-gray-600 dark:text-zinc-400">
            A beautiful, minimalist Pomodoro timer to boost your productivity
          </p>
        </div>

        <!-- What is FocusFlow -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What is FocusFlow?</h2>
          <p class="text-gray-700 dark:text-zinc-300 leading-relaxed mb-4">
            FocusFlow is a modern Pomodoro timer application designed to help you stay focused and productive. 
            Based on the Pomodoro Technique, it breaks your work into focused intervals (typically 25 minutes) 
            separated by short breaks, helping you maintain concentration and avoid burnout.
          </p>
          <p class="text-gray-700 dark:text-zinc-300 leading-relaxed">
            With FocusFlow, you get a clean, distraction-free interface that works beautifully on any device, 
            whether you're on your desktop, tablet, or phone. It's also a Progressive Web App (PWA), so you 
            can install it and use it offline!
          </p>
        </section>

        <!-- Features -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Features</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="p-6 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700"
            >
              <div class="flex items-start gap-4">
                <div class="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg flex-shrink-0">
                  <component :is="feature.icon" :size="24" class="text-primary" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {{ feature.title }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-zinc-400">
                    {{ feature.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- How to Use -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">How to Use</h2>
          
          <div class="space-y-6">
            <div class="p-6 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">1. Start a Session</h3>
              <p class="text-gray-700 dark:text-zinc-300 mb-2">
                Click the "Start" button or press <kbd class="px-2 py-1 bg-gray-200 dark:bg-zinc-700 rounded text-sm font-mono">Space</kbd> to begin your Pomodoro session.
              </p>
              <p class="text-gray-700 dark:text-zinc-300">
                The timer will count down from 25 minutes (or your custom work duration). Watch the gradient border fill up as you progress!
              </p>
            </div>

            <div class="p-6 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">2. Manage Tasks</h3>
              <p class="text-gray-700 dark:text-zinc-300 mb-2">
                Click "+ Add Task" to create tasks you want to work on. Click on a task to mark it as your active focus.
              </p>
              <p class="text-gray-700 dark:text-zinc-300">
                Each task tracks how many Pomodoro sessions you've completed. Mark tasks as done when you finish them!
              </p>
            </div>

            <div class="p-6 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">3. Take Breaks</h3>
              <p class="text-gray-700 dark:text-zinc-300 mb-2">
                When your work session completes, switch to Short Break (5 min) or Long Break (15 min) mode.
              </p>
              <p class="text-gray-700 dark:text-zinc-300">
                Use breaks to rest, stretch, or grab a drink. The timer will notify you when it's time to get back to work!
              </p>
            </div>

            <div class="p-6 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">4. Customize Your Experience</h3>
              <p class="text-gray-700 dark:text-zinc-300 mb-2">
                Open Settings (gear icon or press <kbd class="px-2 py-1 bg-gray-200 dark:bg-zinc-700 rounded text-sm font-mono">S</kbd>) to:
              </p>
              <ul class="list-disc list-inside text-gray-700 dark:text-zinc-300 space-y-1 ml-4">
                <li>Adjust timer durations for work and breaks</li>
                <li>Choose your favorite completion sound</li>
                <li>Select a color theme that matches your style</li>
                <li>Toggle between light and dark mode</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Keyboard Shortcuts -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Keyboard Shortcuts</h2>
          <div class="bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-6">
            <div class="space-y-3">
              <div
                v-for="shortcut in shortcuts"
                :key="shortcut.key"
                class="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-700"
              >
                <span class="text-gray-700 dark:text-zinc-300">{{ shortcut.description }}</span>
                <kbd class="px-3 py-1.5 bg-gray-200 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-md text-sm font-mono text-gray-900 dark:text-zinc-300 min-w-[3rem] text-center">
                  {{ shortcut.key }}
                </kbd>
              </div>
            </div>
            <p class="text-sm text-gray-500 dark:text-zinc-500 mt-4 italic">
              Note: Shortcuts are disabled when typing in text fields
            </p>
          </div>
        </section>

        <!-- Tips & Tricks -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Tips & Tricks</h2>
          <div class="bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-6">
            <ul class="space-y-3">
              <li
                v-for="(tip, index) in tips"
                :key="index"
                class="flex items-center gap-3 text-gray-700 dark:text-zinc-300"
              >
                <span class="text-primary font-bold">•</span>
                <span>{{ tip }}</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- Footer -->
        <div class="text-center pt-8 border-t border-gray-200 dark:border-zinc-700">
          <p class="text-sm text-gray-500 dark:text-zinc-500">
            Built with ❤️ using Vue 3, Vite, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

