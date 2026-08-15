// HarmonyOS Sans (Latin, self-hosted woff2) is declared via @font-face
// in assets/tokens.css — bundled by Vite, no runtime network request.
// Fragment Mono remains for technical labels.
import '@fontsource/fragment-mono/latin-400.css'

import '@/assets/global.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

createApp(App).use(router).mount('#app')
