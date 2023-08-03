import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('../views/layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/layout/home/index.vue'),
          meta: {
            title: '首页',
            isTabBar: true
          }
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/layout/cart/index.vue'),
          meta: {
            title: '购物车',
            isTabBar: true
          }
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../views/layout/user/index.vue'),
          meta: {
            title: '个人中心',
            isTabBar: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/detail/index.vue'),
      meta: {
        title: '详情'
      }
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import('../views/favorite/index.vue'),
      meta: {
        title: '我的收藏'
      }
    }
  ]
})

export default router
