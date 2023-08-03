<script lang="ts" setup>
import { reactive } from 'vue'

import API from '@/api'

const indexData = reactive<any>({
  slides: [], // 轮播图
  goods: [] // 商品列表
})
// 获取首页数据
const getIndex = async () => {
  let res = await API.getIndex()
  indexData.slides = res.slides
  indexData.goods = res.goods.data
}
getIndex()
</script>
<template>
  <div class="layout">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in indexData.slides" :key="item.id">
        <img :src="item.img_url" alt="" referrerpolicy="no-referrer" />
      </van-swipe-item>
    </van-swipe>
    <!-- 热门商品列表 -->
    <div class="hotgoodslist">
      <MyGoodsListItem
        v-for="item in indexData.goods"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.my-swipe {
  width: 100vw;
  height: 43vw;
  img {
    width: 100vw;
    height: 43vw;
  }
}
.hotgoodslist {
  padding-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
}
</style>
