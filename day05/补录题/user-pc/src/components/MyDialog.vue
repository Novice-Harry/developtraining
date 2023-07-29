<script lang="ts" setup>
import { reactive, ref } from 'vue'

import type { FormInstance } from 'element-plus'

import {
  type IMyDialogData,
  type IAddUserResult,
  type IEditUserResult
} from '@/utils/type'
import { API } from '@/api'

const emit = defineEmits(['refresh'])

const formLabelWidth = '70px'
const showDialog = (data?: any) => {
  if (data) {
    dialogData.title = '编辑用户'
    dialogData.form = { ...data }
  } else {
    dialogData.title = '添加用户'
    dialogData.form = {
      username: '',
      password: '',
      email: '',
      mobile: ''
    }
  }

  dialogData.dialogFormVisible = true
}
const dialogData = reactive<IMyDialogData>({
  formLabelWidth: '140px',
  dialogFormVisible: false,
  title: '添加用户',
  form: {
    username: '',
    password: '',
    email: '',
    mobile: ''
  },
  rules: {
    username: [
      { required: true, message: 'Please input Activity name', trigger: 'blur' }
    ],
    password: [
      { required: true, message: 'Please input Activity name', trigger: 'blur' }
    ],
    email: [
      { required: true, message: 'Please input Activity name', trigger: 'blur' }
    ],
    mobile: [
      { required: true, message: 'Please input Activity name', trigger: 'blur' }
    ]
  }
})
const dialogform = ref<FormInstance>()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      if (dialogData.form.id) {
        // 编辑
        API.editUser({
          id: dialogData.form.id,
          email: dialogData.form.email,
          mobile: dialogData.form.mobile
        }).then((res: IEditUserResult) => {
          if (res.meta.status === 200) {
            ElMessage.success(res.meta.msg)
            dialogData.dialogFormVisible = false
            emit('refresh')
          } else {
            ElMessage.error(res.meta.msg)
          }
        })
      } else {
        // 添加
        API.addUser(dialogData.form).then((res: IAddUserResult) => {
          if (res.meta.status === 201) {
            ElMessage.success(res.meta.msg)
            dialogData.dialogFormVisible = false
            emit('refresh')
          } else {
            ElMessage.error(res.meta.msg)
          }
        })
      }
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
defineExpose({ showDialog })
</script>
<template>
  <el-dialog
    v-model="dialogData.dialogFormVisible"
    :title="dialogData.title"
    @closed="resetForm(dialogform)"
  >
    <el-form
      ref="dialogform"
      :model="dialogData.form"
      :rules="dialogData.rules"
    >
      <el-form-item
        label="用户名"
        :label-width="formLabelWidth"
        prop="username"
      >
        <el-input
          v-model="dialogData.form.username"
          autocomplete="off"
          :disabled="!!dialogData.form.id"
        />
      </el-form-item>
      <el-form-item
        v-if="!dialogData.form.id"
        label="密码"
        :label-width="formLabelWidth"
        prop="password"
      >
        <el-input v-model="dialogData.form.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="dialogData.form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
        <el-input v-model="dialogData.form.mobile" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogData.dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="submitForm(dialogform)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
