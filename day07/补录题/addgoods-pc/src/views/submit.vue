<script lang="ts" setup>
import { reactive, ref } from 'vue'

import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'

import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()

const typeList = reactive<{ list: any[] }>({ list: [] })
axios.get('/type.json').then(res => {
  typeList.list = res.data
  console.log(typeList);
})
interface RuleForm {
  name: string
  img: string
  price: string
  type: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  img: '',
  price: '',
  type: ''
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
  ],
  img: [
    {
      required: true,
      message: '请选择图片',
      trigger: 'change',
    },
  ],
  price: [
    {
      required: true,
      message: '请输入商品加购',
      trigger: 'change',
    }, {
      pattern: /^(([1-9]\d*)|0)(\.\d{1,2})?$/,
      message: '请输入正确的价格',
      trigger: 'change',
    }
  ],
  type: [
    {
      required: true,
      message: '请选择商品类型',
      trigger: 'change',
    },
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      counter.add(ruleForm)
    } else { }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>

<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" :size="'default'"
    status-icon>
    <el-form-item label="商品名称" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请选择商品名称" />
    </el-form-item>
    <el-form-item label="商品图片" prop="img">
      <el-select v-model="ruleForm.img" placeholder="请选择商品图片">
        <el-option v-for="item in typeList.list" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="商品价格" prop="price">
      <el-input v-model="ruleForm.price" placeholder="请选择商品价格" />
    </el-form-item>
    <el-form-item label="商品类型" prop="type">
      <el-radio-group v-model="ruleForm.type">
        <el-radio v-for="item in typeList.list" :key="item.value" :label="item.label" />
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        确定添加
      </el-button>
      <el-button type="primary" @click="resetForm(ruleFormRef)">再加一个</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
