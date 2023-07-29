<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { API } from '@/api'

const route = useRoute()
const mhr_LayoutData: {
  menus: any[]
  isCollapse: boolean
  defaultActive: string
} = reactive({
  menus: [],
  isCollapse: false,
  defaultActive: ''
})
API.getMenuApi().then((res) => {
  mhr_LayoutData.menus = res.data
})
// const id = localStorage.getItem('userId') as string
// API.getUserInfo({ id: parseInt(id) }).then((res) => {
//   console.log(res)
// })
onMounted(() => {
  watch(
    () => route.path,
    () => {
      mhr_LayoutData.defaultActive = route.path
      let obj = { name: route.meta.name, id: +new Date(), path: route.fullPath }
      let flag = pageList.list.some((item) => item.name == obj.name)
      console.log(flag)

      if (!flag) {
        pageList.list.push(obj)
      }
    },
    { immediate: true }
  )
})
const pageList: { list: any[] } = reactive({ list: [] })
</script>

<template>
  <el-container class="mhr-layout">
    <el-aside :width="mhr_LayoutData.isCollapse ? '64px' : '200px'">
      <el-menu
        :default-active="mhr_LayoutData.defaultActive"
        :collapse="mhr_LayoutData.isCollapse"
        background-color="#28394c"
        text-color="#fff"
        unique-opened
        router
      >
        <el-menu-item index="/dashboard">
          <template #title>首页</template>
        </el-menu-item>
        <el-sub-menu
          :index="menu.path"
          v-for="menu in mhr_LayoutData.menus"
          :key="menu.path"
        >
          <template #title>
            <span>{{ menu.meta.title }}</span>
          </template>
          <template v-for="menuItem in menu.children" :key="menuItem.path">
            <el-sub-menu
              v-if="menuItem.children && menuItem.children.length > 0"
              :key="menu.path + menuItem.path"
              :index="menu.path + menuItem.path"
            >
              <template #title>
                <span>{{ menu.meta.title }}</span>
              </template>
              <el-menu-item
                v-for="v in menuItem.children"
                :key="v.path"
                :index="menu.path + menuItem.path + v.path"
              >
                {{ menuItem.meta.title }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="menu.path + menuItem.path">
              {{ menuItem.meta.title }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="mhr-left">
          <el-icon
            style="cursor: pointer"
            size="24px"
            @click="mhr_LayoutData.isCollapse = !mhr_LayoutData.isCollapse"
          >
            <Fold v-if="!mhr_LayoutData.isCollapse" />
            <Expand v-else />
          </el-icon>
          <div class="mhr-pagetitle">
            <MhrBread />
          </div>
        </div>
        <div class="mhr-right">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar
                :size="30"
                src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
                shape="square"
              />
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <div class="mhr-pagelist">
          <el-tag
            closable
            @click="$router.push(item.fullPath)"
            v-for="item in pageList.list"
            :key="item.id"
            :type="route.meta.name == item.name ? '' : 'info'"
          >
            {{ item.name }}
          </el-tag>
        </div>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.mhr-layout {
  width: 100%;
  height: 100vh;

  .el-aside {
    background-color: #28394c;
    transition: all 0.3s ease;
    .el-menu {
      border-right: transparent;
    }
  }
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .mhr-left {
      display: flex;
      align-items: center;

      .mhr-pagetitle {
        margin-left: 20px;
      }
    }
  }
  .mhr-pagelist {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 0 5px #ccc;
    display: flex;
    align-items: center;

    .el-tag {
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .el-main {
    position: relative;
    padding-top: 60px;
  }
}
</style>
