<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import API from '@/api'
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()

const cartData = reactive<any>({ list: [] })
const getCart = async () => {
  let res = await API.getCart()
  cartData.list = res.data
}
if (counter.token) {
  getCart()
}

// 计算总价
const calculateCartPrice = computed(() => {
  let sum = 0
  cartData.list.forEach((item: any) => {
    if (item.is_checked === 1) {
      sum += item.goods.price * item.num
    }
  })
  return sum * 100
})
// 全选状态
const calculateCartCheck = computed(() => {
  return cartData.list.every((item: any) => item.is_checked === 1)
})
const ckAll = async () => {
  let arr: any[] = []
  if (calculateCartCheck.value) {
    arr = []
  } else {
    cartData.list.forEach((item: any) => arr.push(item.id))
  }
  await API.check({ cart_ids: arr })
  getCart()
}

const ckSingle = async (id: number) => {
  let arr: any[] = []
  cartData.list.forEach(async (item: any) => {
    if (item.is_checked === 1 && item.id !== id) {
      arr.push(item.id)
    }
    if (item.is_checked !== 1 && item.id === id) {
      arr.push(item.id)
    }
    await API.check({ cart_ids: arr })
    getCart()
  })
}
</script>
<template>
  <div class="layout">
    <div class="list" v-if="counter.token">
      <div class="cartlistitem" v-for="item in cartData.list" :key="item.id">
        <div class="left">
          <van-checkbox
            :model-value="item.is_checked === 1"
            @click="ckSingle(item.id)"
          />
        </div>
        <div class="right">
          <van-card
            :num="item.num"
            :price="item.goods.price"
            :desc="item.goods.description"
            :title="item.goods.title"
            :thumb="item.goods.cover_url"
          />
        </div>
      </div>
    </div>
    <van-submit-bar
      v-if="counter.token"
      class="mysubmitbar"
      :price="calculateCartPrice"
      button-text="提交订单"
    >
      <van-checkbox :model-value="calculateCartCheck" @click="ckAll">
        {{ calculateCartCheck ? '全不选' : '全选' }}
      </van-checkbox>
    </van-submit-bar>
    <div class="info" v-if="!counter.token">
      <p>登录后可查看</p>
      <van-button
        plain
        hairline
        type="default"
        size="small"
        @click="router.push('/login')"
        >去登陆</van-button
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
.list {
  .cartlistitem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f7f8fa;
    margin-bottom: 6px;

    .left {
      display: flex;
      justify-content: center;
      width: 60px;
    }

    .right {
      width: calc(100% - 60px);
    }
  }
}

.mysubmitbar {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 50px;
}
.info {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
