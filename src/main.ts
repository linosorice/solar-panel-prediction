import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import en from './locales/en.json'
import it from './locales/it.json'

const i18n = createI18n({
  legacy: false,
  fallbackLocale: 'en',
  messages: {
    en,
    it
  }
})

const app = createApp(App)

app.use(i18n)

app.use(createPinia())

app.mount('#app')
