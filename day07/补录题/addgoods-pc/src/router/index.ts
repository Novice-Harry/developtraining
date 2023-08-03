import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import layout from '../views/layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: layout,
      redirect:'/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: HomeView,
          meta: {
            title: '商品加购',
            btn:{
              txt:'设置',
              path:'/goods/submit'
            }
          }
        },
        {
          path: 'goods',
          name: 'goods',
          redirect:'/goods/submit',
          component: () => import('../views/goods.vue'),
          meta: {
            title: '商品设置',
            btn:{
              txt:'返回',
              path:'/home'
            }
          },
          children: [
            {
              path: 'submit',
              name: 'submit',
              component: () => import('../views/submit.vue')
            },
            {
              path: 'setting',
              name: 'setting',
              component: () => import('../views/setting.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
