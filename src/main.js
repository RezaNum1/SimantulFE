import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './helper/store';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.use(router)
app.use(store)
app.use(pinia);
app.mount('#app')
