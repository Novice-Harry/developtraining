<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccessToast, showFailToast } from 'vant'
import { useLoginStore } from '@/stores/login'

import 'vant/es/toast/style'

const loginStore = useLoginStore()
const router = useRouter()

const loginForm = reactive({
  username: '',
  password: ''
})
const onSubmit = () => {
  if (loginForm.username === 'admin' && loginForm.password === '123456') {
    const token = loginStore.getToken()
    loginStore.serToken(token)
    showSuccessToast('登陆成功')
    router.push('/')
  } else {
    showFailToast('账号或密码错误')
  }
}
</script>
<template>
  <div class="login">
    <div class="logincontent">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="loginForm.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="loginForm.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block color="#6eb3ba" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #6eb3ba;
  position: relative;

  .logincontent {
    width: 90vw;
    background-color: #fff;
    padding: 10px;
    border-radius: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
