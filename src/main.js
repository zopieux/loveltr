import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import Vue3TouchEvents from 'vue3-touch-events'

import './style.sass'
import en from './locale/en.json'
import fr from './locale/fr.json'

import App from './App.vue'

const i18n = createI18n({
  locale: 'en',
  legacy: false,
  globalInjection: true,
  messages: { en, fr },
})

createApp(App).use(Vue3TouchEvents).use(i18n).mount('#app')
