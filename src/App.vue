<script setup>
import { ref } from 'vue'
import Home from './pages/Home.vue'
import Settings from './pages/Settings.vue'

const currentView = ref('home')

const navigate = (view) => {
  currentView.value = view
}
</script>

<template>
  <component 
    :is="currentView === 'home' ? Home : Settings" 
    @navigate="navigate"
  />
</template>
