import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  if (to.name === 'login' && token) {
    router.push('/')
  }else if (to.name !== 'login' && !token) {
    router.push('/login')
  }
})

export default router
