import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// Import theme to initialize it early
import './composables/useTheme'

import router from './router'

createApp(App).use(router).mount('#app')
