import { createRouter, createWebHistory } from 'vue-router'
import Songs from "@/components/songs/Songs.vue";
import Homepage from '@/components/Homepage.vue';
import Ranking from "@/components/ranking/Ranking.vue";
import GET from "../components/songs/GET.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'GET',
      component: GET,
    },
    {
      path: '/',
      name: 'home',
      component: Homepage,
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking,
    },
    {
      path: '/Songs',
      name: 'songs',
      component: Songs    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
