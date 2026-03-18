import { createRouter, createWebHistory } from 'vue-router';
import { HomePage } from '@/pages/home';
import { ShowPage } from '@/pages/show';

export const ROUTE_NAMES = {
  HOME: 'home',
  ABOUT: 'about',
  SHOW: 'show',
} as const;

const routes = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    component: HomePage,
  },
  {
    path: '/about',
    name: ROUTE_NAMES.ABOUT,
    component: () => import('@/pages/about/ui/About.vue'),
  },
  {
    path: '/shows/:id',
    name: ROUTE_NAMES.SHOW,
    props: true,
    component: ShowPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
