<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router"
import MyInput from "@/components/MyInput.vue";

const router = useRouter()
const username = ref('')
const password = ref('')

const login = () => {
  if (username.value && password.value) {
    localStorage.setItem("token", username.value)
    router.push('/')
  }else {
    alert('用户名或密码不能为空')
  }
}
</script>
<template>
  <div class="about">
    <div class="content">
      <div class="logo">LOGO</div>
      <MyInput v-model="username" title="用户名" />
      <MyInput v-model="password" title="密码" password="true" />
      <p style="text-align: center;">
        <span class="btn" @click="login">登录</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  width: 100%;
  height: 100vh;
  background-color: #98eed2;
  position: relative;

  .content {
    width: 400px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .logo {
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      margin: 0 auto 10px;
      border: 3px solid #ccc;
      border-radius: 50%;
    }

    .btn {
      display: inline-block;
      background-color: #245bda;
      padding: 5px 15px;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
