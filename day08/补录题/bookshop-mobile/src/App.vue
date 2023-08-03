<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
</script>

<template>
  <van-nav-bar
    class="my-nav-bar"
    :title="route.meta.title as string"
    :left-text="!route.meta.isTabBar ? '返回' : ''"
    :left-arrow="!route.meta.isTabBar ? true : false"
    @click-left="router.back()"
  />
  <div class="page">
    <RouterView />
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.my-nav-bar {
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
}
.page {
  padding-top: 46px;
}
</style>
