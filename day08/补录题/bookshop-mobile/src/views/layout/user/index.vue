<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { showNotify } from 'vant'
import API from '@/api'
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()

const user: any = reactive({ user: {} })

const getUser = async () => {
  let res = await API.getUser()
  user.user = res
}
if (counter.token) {
  getUser()
}
const logout = async () => {
  await API.logout()
  router.push('/login')
  showNotify({ type: 'success', message: '退出登录成功' })
}
</script>
<template>
  <div class="layout">
    <div class="top">
      <div class="left">
        <img
          :src="user.user.avatar_url"
          alt=""
          class="img"
          v-if="user.user.id"
        />
        <div class="img" v-else></div>
      </div>
      <div class="right">
        <template v-if="user.user.id">
          <p>姓名：{{ user.user.name }}</p>
          <p>邮箱：{{ user.user.email }}</p>
        </template>
        <p v-if="!user.user.id" @click="router.push('/login')">
          未登录，请登录
        </p>
      </div>
    </div>
    <div class="menu" v-if="user.user.id">
      <van-cell-group>
        <van-cell title="我的订单" is-link />
        <van-cell title="我的收藏" is-link to="/favorite" />
      </van-cell-group>
      <div class="btn" @click="logout">退出登录</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.top {
  background-color: #ff5e1a;
  height: 150px;
  padding: 20px;
  display: flex;
  align-items: center;
  color: white;
  .left {
    margin-right: 20px;
    .img {
      width: 110px;
      height: 110px;
      background-color: #ccc;
      border-radius: 50%;
    }
  }

  .right {
    font-size: 14px;
    p {
      padding: 5px;
    }
  }
}
.menu {
  .btn {
    width: 100%;
    line-height: 40px;
    background-color: #ff976a;
    color: white;
    text-align: center;
    margin-top: 100px;
  }
}
</style>
