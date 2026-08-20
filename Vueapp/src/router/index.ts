import { createRouter, createWebHistory } from 'vue-router'
import TopSong from "@/components/components/TopSong.vue";
import Homepage from '@/components/Homepage.vue';
import Ranking from "@/components/ranking/Ranking.vue";
import GET from "@/components/components/GET.vue";
import POST from '@/components/components/POST.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/songs',
    },
    {
      path: '/POST',
      name: 'post',
      component: POST,
    },
    {
      path: '/GET',
      name: 'get',
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
      component: TopSong    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/components/About.vue'),
    },
  ],
})

export default router
