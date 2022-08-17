import { createApp } from 'vue'
import Vue3TouchEvents from 'vue3-touch-events';

import './style.sass'
import App from './App.vue'

createApp(App).use(Vue3TouchEvents).mount('#app')
