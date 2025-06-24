import { createRouter, createWebHistory } from 'vue-router'
import Songs from "@/components/components/Songs.vue";
import Homepage from '@/components/Homepage.vue';
import Ranking from "@/components/ranking/Ranking.vue";
import GET from "@/components/components/GET.vue";
import POST from '@/components/components/POST.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/POST',
      name: 'POST',
      component: POST,
    },
    {
      path: '/GET',
      name: 'GET',
      component: GET,
    },
    {
      path: '/homepage',
      name: 'home',
      component: Homepage,
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking,
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/components/About.vue'),
    },
  ],
})

export default router
