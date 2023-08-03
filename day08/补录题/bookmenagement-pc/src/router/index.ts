import { createRouter, createWebHistory } from 'vue-router'
import LayOut from '../views/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: LayOut,
      children: [
        {
          path: 'classify',
          name: 'classify',
          component: () => import('../views/layout/classify/index.vue')
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/layout/users/index.vue')
        },
        {
          path: 'users/submit',
          name: 'submit',
          component: () => import('../views/layout/submit/index.vue')
        },
        {
          path: 'users/edit/:id',
          name: 'edit',
          component: () => import('../views/layout/edit/index.vue')
        },
        {
          path: 'users/:id',
          name: 'userdetail',
          component: () => import('../views/layout/detail/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    }
  ]
})

export default router
