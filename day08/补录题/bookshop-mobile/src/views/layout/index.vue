<script lang="ts" setup></script>
<template>
  <div class="layout">
    <RouterView />
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o">
        购物车
      </van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="friends-o">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<style lang="scss" scoped></style>
