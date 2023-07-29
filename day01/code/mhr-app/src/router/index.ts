import { createRouter, createWebHistory } from 'vue-router'
import layout from '../views/LayOut.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/home/HomeView.vue'),
          meta: {
            bread: [{ name: '首页', nav: true }],
            name: '首页'
          }
        },
        {
          path: 'system/sysUserList',
          name: 'sysUserList',
          component: () => import('../views/system/sysUserList.vue'),
          meta: {
            bread: [
              { name: '首页', nav: true },
              { name: '系统管理' },
              { name: '员工管理' }
            ],
            name: '员工管理'
          }
        },
        {
          path: 'system/sysRoleList',
          name: 'sysRoleList',
          component: () => import('../views/system/sysRoleList.vue'),
          meta: {
            bread: [
              { name: '首页', nav: true },
              { name: '系统管理' },
              { name: '角色管理' }
            ],
            name: '角色管理'
          }
        },
        {
          path: 'system/sysMenuList',
          name: 'sysMenuList',
          component: () => import('../views/system/sysMenuList.vue'),
          meta: {
            bread: [
              { name: '首页', nav: true },
              { name: '系统管理' },
              { name: '权限管理' }
            ],
            name: '权限管理'
          }
        },
        {
          path: 'xinchou/statff/dev',
          name: 'dev',
          component: () => import('../views/xinchou/statff/devView.vue'),
          meta: {
            bread: [
              { name: '首页', nav: true },
              { name: '薪酬管理' },
              { name: '薪酬管理' },
              { name: '人员管理' }
            ],
            name: '人员管理'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router
