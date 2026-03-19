import { createRouter, createWebHistory } from 'vue-router';
import { HomePage } from '@/pages/home';
import { ShowPage } from '@/pages/show';
import { ActorPage } from '@/pages/actor';
import { FavoritesPage } from '@/pages/favorites';

export const ROUTE_NAMES = {
  HOME: 'home',
  FAVORITES: 'favorites',
  SHOW: 'show',
  ACTOR: 'actor',
} as const;

const routes = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    component: HomePage,
  },
  {
    path: '/favorites',
    name: ROUTE_NAMES.FAVORITES,
    component: FavoritesPage,
  },
  {
    path: '/about',
    redirect: { name: ROUTE_NAMES.FAVORITES },
  },
  {
    path: '/shows/:id',
    name: ROUTE_NAMES.SHOW,
    props: true,
    component: ShowPage,
  },
  {
    path: '/actors/:id',
    name: ROUTE_NAMES.ACTOR,
    props: true,
    component: ActorPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
