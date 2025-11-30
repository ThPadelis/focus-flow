import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// Import theme to initialize it early
import './composables/useTheme'

createApp(App).mount('#app')
