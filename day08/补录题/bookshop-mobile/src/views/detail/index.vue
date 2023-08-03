<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

import { showConfirmDialog, showSuccessToast } from 'vant'

import API from '@/api'
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()

const id = route.params.id
const data = reactive<any>({ info: {} })

const getDetail = async () => {
  let res = await API.getDetail(id)
  data.info = res.goods
}
getDetail()

const collect = () => {
  if (counter.token) {
    API.collects(id).then(() => {
      showSuccessToast('操作成功')
      getDetail()
    })
  } else {
    showConfirmDialog({
      title: '请先登录'
    })
      .then(() => {
        router.push('/login')
      })
      .catch(() => {})
  }
}
const add = () => {
  if (counter.token) {
    API.addToCart({ goods_id: id, Num: 1 }).then(() => {
      showSuccessToast('添加成功')
    })
  } else {
    showConfirmDialog({
      title: '请先登录'
    })
      .then(() => {
        router.push('/login')
      })
      .catch(() => {})
  }
}
</script>
<template>
  <div class="layout" style="padding-bottom: 50px" v-if="data.info.id">
    <img :src="data.info.cover_url" style="width: 100vw" alt="" />
    <div class="info" style="padding-left: 15px">
      <p>{{ data.info.title }}</p>
      <p>{{ '￥' + data.info.price }}</p>
    </div>
    <div class="richtext" v-html="data.info.details"></div>
    <van-action-bar>
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        @click="router.push('/cart')"
      />
      <van-action-bar-icon
        :icon="data.info.is_collect === 0 ? 'star-o' : 'star'"
        :text="data.info.is_collect === 0 ? '收藏' : '已收藏'"
        color="#ff5000"
        @click="collect"
      />
      <van-action-bar-button type="warning" text="加入购物车" @click="add" />
    </van-action-bar>
  </div>
</template>
<style lang="scss">
.richtext {
  img {
    width: 100vw;
  }
}
</style>
