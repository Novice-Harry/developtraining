<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { API } from '@/api'
import type { IUserData } from '@/utils/type'

const route = useRoute()
const router = useRouter()

const ready = ref(false)
let userInfo = reactive<IUserData>({
  name: '',
  avatar: null,
  avatar_url: '',
  created_at: '',
  email: '',
  id: 0,
  is_locked: 0,
  openid: null,
  phone: null,
  total: 0,
  unum: 0,
  updated_at: ''
})
const getUserInfo = async (id: string) => {
  ready.value = false
  let res: IUserData = await API.getDetail(id)
  userInfo = res
  ready.value = true
  console.log(res)
}
let id = route.params.id as string
getUserInfo(id)
</script>
<template>
  <div class="info" v-if="ready">
    <div class="line">
      <div class="left">姓名</div>
      <div class="right">{{ userInfo.name }}</div>
    </div>
    <div class="line">
      <div class="left">头像</div>
      <div class="right">
        <el-avatar :size="100" :src="userInfo.avatar_url" />
      </div>
    </div>
    <div class="line">
      <div class="left">邮箱</div>
      <div class="right">{{ userInfo.email }}</div>
    </div>
    <div class="line">
      <div class="left">手机号</div>
      <div class="right">{{ userInfo.phone }}</div>
    </div>
    <div class="line">
      <div class="left">创建时间</div>
      <div class="right">{{ userInfo.created_at }}</div>
    </div>
    <div class="line">
      <div class="left">更新时间</div>
      <div class="right">{{ userInfo.updated_at }}</div>
    </div>
    <div class="line">
      <div class="left">状态</div>
      <div class="right">{{ userInfo.is_locked === 0 ? '锁定' : '正常' }}</div>
    </div>
    <div class="line">
      <div class="left"></div>
      <div class="right">
        <el-button type="primary" @click="router.back()">返回</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.info {
  .line {
    display: flex;
    margin-bottom: 15px;

    .left {
      width: 130px;
      text-align: right;
      color: #333;
    }
    .right {
      flex: 1;
      padding-left: 30px;
    }
  }
}
</style>
