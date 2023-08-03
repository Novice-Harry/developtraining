<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { showNotify } from 'vant'

import API from '@/api'

import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
const form = reactive({
  email: '',
  password: ''
})
const onSubmit = async () => {
  let res = await API.login(form)
  counter.setToken(res.token_type + ' ' + res.access_token)
  showNotify({ type: 'success', message: '登陆成功' })
  setTimeout(() => {
    router.back()
  }, 300)
}
</script>
<template>
  <div class="layout">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="form.email"
          name="邮箱"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
        />
        <van-field
          v-model="form.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<style lang="scss" scoped></style>
