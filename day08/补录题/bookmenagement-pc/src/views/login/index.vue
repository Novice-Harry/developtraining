<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import type { FormInstance, FormRules } from 'element-plus'

import { type ILoginForm } from '@/utils/type'
import { API } from '@/api'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
// 表单实例
const loginFormRef = ref<FormInstance>()
// 表单
const loginForm = reactive<ILoginForm>({
  email: '',
  password: ''
})
// 表单校验规则
const loginFormRules = reactive<FormRules<ILoginForm>>({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: '请输入正确的邮箱',
      trigger: 'blur'
    }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 表单提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      login()
    }
  })
}

// 登录功能
const login = async () => {
  const res = await API.login(loginForm)
  userStore.setToken(res.token_type + ' ' + res.access_token)
  ElMessage.success('登录成功')
  router.push('/')
}
</script>
<template>
  <div class="loginpage">
    <el-card class="box-card">
      <el-form
        ref="loginFormRef"
        label-width="80px"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginForm.email" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input show-password v-model="loginForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(loginFormRef)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.loginpage {
  width: 100%;
  height: 100vh;
  position: relative;

  .box-card {
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding-top: 40px;
  }
}
</style>
