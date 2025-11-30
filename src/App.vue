<script setup>
import { ref } from 'vue'
import Home from './pages/Home.vue'
import Settings from './pages/Settings.vue'
import About from './pages/About.vue'

const currentView = ref('home')

const navigate = (view) => {
  currentView.value = view
}

const getComponent = () => {
  switch (currentView.value) {
    case 'settings':
      return Settings
    case 'about':
      return About
    default:
      return Home
  }
}
</script>

<template>
  <component 
    :is="getComponent()" 
    @navigate="navigate"
  />
</template>
