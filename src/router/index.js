import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Show from '@/views/Show.vue';

Vue.use(VueRouter);

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/shows/:id',
    name: ROUTE_NAMES.SHOW,
    props: true,
    component: Show,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
