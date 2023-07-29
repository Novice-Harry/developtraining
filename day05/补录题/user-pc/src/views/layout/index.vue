<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import {
  Expand,
  Fold,
  Avatar,
  Menu,
  Box,
  Suitcase,
  List,
  TrendCharts,
  ArrowRight
} from '@element-plus/icons-vue'

const route = useRoute()
const layoutData = reactive({ isCollapse: false, defaultActive: '' })

watch(
  () => route.path,
  () => {
    layoutData.defaultActive = route.path
  },
  { immediate: true }
)
</script>
<template>
  <el-container class="layout">
    <el-header>
      <div class="logo">电商后台管理系统</div>
      <el-button type="info">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="layoutData.isCollapse ? '64px' : '200px'">
        <div
          class="foldbtn"
          @click="layoutData.isCollapse = !layoutData.isCollapse"
        >
          <el-icon>
            <Expand v-if="layoutData.isCollapse" />
            <Fold v-else />
          </el-icon>
        </div>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#373d41"
          :default-active="layoutData.defaultActive"
          text-color="#fff"
          :collapse="layoutData.isCollapse"
          router
          unique-opened
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <Avatar />
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user/userlist">
              <template #title>
                <el-icon>
                  <Menu />
                </el-icon>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <Box />
              </el-icon>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/right/rightlist">
              <template #title>
                <el-icon>
                  <Menu />
                </el-icon>
                <span>权限列表</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <Suitcase />
              </el-icon>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/goods/goodslist">
              <template #title>
                <el-icon>
                  <Menu />
                </el-icon>
                <span>商品列表</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <List />
              </el-icon>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/order/orderlist">
              <template #title>
                <el-icon>
                  <Menu />
                </el-icon>
                <span>订单列表</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <el-icon>
                <TrendCharts />
              </el-icon>
              <span>数据统计</span>
            </template>
            <el-menu-item index="/data/datalist">
              <template #title>
                <el-icon>
                  <Menu />
                </el-icon>
                <span>数据列表</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb
          :separator-icon="ArrowRight"
          v-if="route.meta.bread"
          style="margin-bottom: 10px"
        >
          <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="(item, index) in route.meta.bread"
            :key="index"
          >
            {{ item }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
.layout {
  height: 100vh;

  .el-header,
  .el-aside {
    background-color: #373d41;
    transition: all ease 0.3s;
  }

  .foldbtn {
    text-align: center;
    padding: 4px 0 2px;
    color: white;
    background-color: #4a5163;
  }

  .el-menu {
    border-right: transparent;
  }
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      font-size: 20px;
      color: white;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
