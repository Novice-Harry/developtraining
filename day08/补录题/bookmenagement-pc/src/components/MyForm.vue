<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()

import type { FormInstance, FormRules } from 'element-plus'

import { API } from '@/api'
import type { IUserData } from '@/utils/type'

const props = defineProps({ edit: Boolean })

// 处于加载状态
const loading = ref(false)
const users = ref(0)

const getUserInfo = async (id: string) => {
  loading.value = true
  let res: IUserData = await API.getDetail(id)
  loading.value = false
  myForm.name = res.name
  myForm.email = res.email
  users.value = res.id
}
// 判断是否是编辑状态，是否需要数据回显
if (props.edit) {
  let id = route.params.id as string
  getUserInfo(id)
}

interface MyForm {
  name: string
  email: string
  password: string
}
const ruleFormRef = ref<FormInstance>()
const myForm = reactive<MyForm>({
  name: '',
  email: '',
  password: ''
})

const rules = reactive<FormRules<MyForm>>({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      if (props.edit) {
        editUser()
      } else {
        addUser()
      }
    }
  })
}
const addUser = async () => {
  loading.value = true
  await API.addUser(myForm)
  loading.value = false
  ElMessage.success('添加成功')
  router.back()
}
const editUser = async () => {
  await API.editUser({
    users: users.value,
    email: myForm.email,
    name: myForm.name
  })
  ElMessage.success('编辑成功')
  router.back()
}
</script>
<template>
  <el-form
    ref="ruleFormRef"
    :model="myForm"
    :rules="rules"
    label-width="120px"
    size="small"
    v-loading="loading"
  >
    <el-form-item label="用户名" prop="name">
      <el-input v-model="myForm.name" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="myForm.email" />
    </el-form-item>
    <el-form-item v-if="!route.params.id" label="密码" prop="password">
      <el-input v-model="myForm.password" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        {{ route.params.id ? '编辑' : '新建' }}
      </el-button>
      <el-button @click="router.back()">返回</el-button>
    </el-form-item>
  </el-form>
</template>
<style></style>
