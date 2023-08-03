<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import {
  Menu as IconMenu,
  DocumentCopy,
  Avatar,
  Grid
} from '@element-plus/icons-vue'

import { API } from '@/api'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

// 退出登录
const logout = async () => {
  await API.logout()
  userStore.setToken('')
  ElMessage.success('退出登录成功')
  router.push('/login')
}

const defaultActive = ref('')
watch(
  () => route.path,
  () => (defaultActive.value = route.path),
  { immediate: true }
)
</script>
<template>
  <el-container class="layout">
    <el-header>
      <el-button type="primary" @click="logout">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="defaultActive" unique-opened router>
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <IconMenu />
              </el-icon>
              <span>分类</span>
            </template>
            <el-menu-item index="/classify">
              <template #title>
                <el-icon>
                  <Grid />
                </el-icon>
                <span>分类列表</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <Avatar />
              </el-icon>
              <span>用户</span>
            </template>
            <el-menu-item index="/users">
              <template #title>
                <el-icon>
                  <DocumentCopy />
                </el-icon>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-card class="box-card" shadow="never"><RouterView /></el-card>
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100vh;

  .el-header {
    background-color: #b3c0d2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .el-aside {
    .el-menu {
      border-right-color: transparent;
    }
  }

  .el-main {
    background-color: #e9eef4;

    .box-card {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
