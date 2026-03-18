import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Show from '@/views/Show.vue';

export const ROUTE_NAMES = {
  HOME: 'home',
  ABOUT: 'about',
  SHOW: 'show',
};

const routes = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    component: Home,
  },
  {
    path: '/about',
    name: ROUTE_NAMES.ABOUT,
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/shows/:id',
    name: ROUTE_NAMES.SHOW,
    props: true,
    component: Show,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
