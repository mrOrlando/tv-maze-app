import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/app/App.vue';
import router from '@/app/routes';

createApp(App).use(router).use(createPinia()).mount('#app');
