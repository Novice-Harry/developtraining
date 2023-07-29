<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { API } from '@/api'

const router = useRouter()
const ruleFormRef = ref<FormInstance>()
interface RuleForm {
  username: string
  password: string
  userType: number
}
const ruleForm = reactive({
  username: '',
  password: '',
  userType: -1
})
const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  userType: [
    {
      required: true,
      message: '请选择身份',
      trigger: 'change'
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      API.loginApi(ruleForm).then((res) => {
        if (res.code === 200) {
          ElMessage.success(res.msg)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userId', res.data.userId)
          setTimeout(() => {
            router.push('/')
          }, 100)
        } else {
          ElMessage.error(res.msg)
        }
      })
    }
  })
}
</script>

<template>
  <div class="mhr-login">
    <div class="mhr-login-content">
      <h3 class="mhr-tltle">小区物业管理</h3>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            show-password
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item prop="userType">
          <el-radio-group v-model="ruleForm.userType">
            <el-radio :label="0">业主</el-radio>
            <el-radio :label="1">物主</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div
            style="width: 100%; display: flex; justify-content: space-between"
          >
            <el-button
              style="flex: 1"
              type="primary"
              @click="submitForm(ruleFormRef)"
            >
              登录
            </el-button>
            <el-button style="flex: 1">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mhr-login {
  width: 100%;
  height: 100vh;
  background-color: #4177e1;

  .mhr-login-content {
    width: 500px;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .mhr-tltle {
      text-align: center;
      color: #4177e1;
      font-size: 28px;
      font-weight: 500;
    }
  }
}
</style>
