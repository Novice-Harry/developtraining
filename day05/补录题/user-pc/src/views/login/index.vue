<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import type { FormInstance, FormRules } from 'element-plus'
import { Lock, UserFilled } from '@element-plus/icons-vue'

import { API } from '@/api'
import { useUserStore } from '@/stores/userInfo'
import { type ILoginData, type ILoginResult } from '@/utils/type'

const user = useUserStore()
const router = useRouter()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<ILoginData>({
  username: '',
  password: ''
})

const rules = reactive<FormRules<ILoginData>>({
  username: [
    { required: true, message: '请输入登录名称', trigger: 'blur' },
    { min: 3, max: 5, message: '用户名长度为 3 - 5 位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 15, message: '密码长度位 5 - 15 位', trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      API.login(ruleForm).then((res: ILoginResult) => {
        if (res.meta.status === 200) {
          user.setUser(res.data)
          ElMessage.success(res.meta.msg)
          router.push('/')
        } else {
          ElMessage.error(res.meta.msg)
        }
      })
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<template>
  <div class="login">
    <div class="content">
      <div class="logo"><img src="../../assets/logo.svg" alt="" /></div>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon>
        <el-form-item prop="username">
          <el-input :prefix-icon="UserFilled" v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            show-password
            v-model="ruleForm.password"
          />
        </el-form-item>
        <el-form-item>
          <p style="text-align: right; display: block; width: 100%">
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              登录
            </el-button>
            <el-button type="info" @click="resetForm(ruleFormRef)">
              重置
            </el-button>
          </p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: #2d4c6a;
  position: relative;

  .content {
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding-left: 10px;
    padding-right: 10px;

    .logo {
      width: 100px;
      margin: -50px auto 10px;
      height: 100px;
      border-radius: 50px;
      overflow: hidden;
      border: 10px solid #fff;
      box-shadow: 0 0 4px #ccc;
      background-color: #ccc;

      img {
        width: 80px;
        height: 80px;
      }
    }
  }
}
</style>
