import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import { NConfigProvider } from 'naive-ui';
import App from '@/app/App.vue';
import router from '@/app/routes';

const app = createApp({
  render() {
    return h(NConfigProvider, null, { default: () => h(App) });
  },
});
app.use(router).use(createPinia()).mount('#app');
