// framework
import { createApp } from 'vue';

// kit
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia';

// i18n
import i18n from './plugins/i18n';

// router
import { router } from './router';

// component & style
import './style.css';
import App from './App.vue';

createApp(App)
    .use(createPinia()) // [必須] 使用pinia
    .use(router) // [必須] 使用vue-router
    .use(VueAxios, axios) // [必須] 使用axios
    .use(i18n) // [必須] 使用i18n 多國語系
    .mount('#app');
