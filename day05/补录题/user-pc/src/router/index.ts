import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/layout/index.vue'
import { useUserStore } from '@/stores/userInfo'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      redirect: '/welcome',
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: () => import('../views/layout/welcome/index.vue')
        },
        {
          path: 'user/userlist',
          name: 'userlist',
          component: () => import('../views/layout/userlist/index.vue'),
          meta: {
            bread: ['用户管理', '用户列表']
          }
        },
        {
          path: 'right/rightlist',
          name: 'rightlist',
          component: () => import('../views/layout/rightlist/index.vue'),
          meta: {
            bread: ['权限管理', '权限列表']
          }
        },
        {
          path: 'goods/goodslist',
          name: 'goodslist',
          component: () => import('../views/layout/goodslist/index.vue'),
          meta: {
            bread: ['商品管理', '商品列表']
          }
        },
        {
          path: 'order/orderlist',
          name: 'orderlist',
          component: () => import('../views/layout/orderlist/index.vue'),
          meta: {
            bread: ['订单管理', '订单列表']
          }
        },
        {
          path: 'data/datalist',
          name: 'datalist',
          component: () => import('../views/layout/datalist/index.vue'),
          meta: {
            bread: ['数据分析', '数据列表']
          }
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

router.beforeEach((to) => {
  const user = useUserStore()
  const token = user.access
  if (token && to.path === '/login') {
    return
  } else if (!token && to.path !== '/login') {
    return { path: '/login' }
  }
})

export default router
