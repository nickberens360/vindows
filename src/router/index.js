import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'desktop',
      component: () => import('@/views/DesktopView'),
      meta: {
        title: 'Desktop',
      },
    },
    {
      path: '/:id',
      name: 'window',
      component: () => import('@/views/DesktopView'),
    },


    {
      path: '/:pathMatch(.*)*',
      name: 'pageNotFound',
      component: () => import('@/views/NotFound'),
      meta: {
        title: '404 Page Not Found',
      },
    },
  ],
});



export default router;
