<script lang="ts" setup>
import { reactive } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import type { IGetUsersData, IUserData, IGetUsersResult } from '@/utils/type'
import { API } from '@/api'
const queryForm = reactive({
  name: '',
  email: '',
  phone: ''
})

const UserData: {
  list: IUserData[]
  query: IGetUsersData
  total: number
  loading: boolean
} = reactive({
  list: [],
  query: {
    current: 1,
    name: '',
    email: '',
    phone: ''
  },
  total: 0,
  loading: true
})
// 获取用户列表
const getUsers = async () => {
  UserData.loading = true
  let res: IGetUsersResult = await API.getUsers(UserData.query)
  UserData.loading = false
  console.log(res)
  UserData.list = res.data
  UserData.total = res.meta.pagination.total
}
getUsers()
// 搜索
const onSearch = () => {
  UserData.query.current = 1
  UserData.query = Object.assign(UserData.query, queryForm)
  getUsers()
}
// 翻页
const handleCurrentChange = () => {
  getUsers()
}
// 启用禁用
const lockUser = async (id: number) => {
  await API.lockUser(id)
  getUsers()
}
</script>
<template>
  <div class="layoutpage" v-loading="UserData.loading">
    <el-form :inline="true" :model="queryForm" size="small">
      <el-form-item label="姓名">
        <el-input v-model="queryForm.name" placeholder="姓名" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="queryForm.email" placeholder="邮箱" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="queryForm.phone" placeholder="手机号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      size="small"
      style="margin-bottom: 10px"
      @click="router.push('/users/submit')"
    >
      添加
    </el-button>
    <el-table :data="UserData.list" border style="width: 100%" size="small">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="is_locked" label="状态" width="60px">
        <template #default="scope">
          <el-switch
            :model-value="scope.row.is_locked"
            inactive-value="0"
            active-value="1"
            @click="lockUser(scope.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" width="140px" />
      <el-table-column prop="updated_at" label="更新时间" width="140px" />
      <el-table-column prop="id" label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            link
            @click="router.push('/users/' + scope.row.id)"
          >
            详情
          </el-button>
          <el-button
            type="primary"
            link
            @click="router.push({ path: '/users/edit/' + scope.row.id })"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin-top: 10px"
      v-model:current-page="UserData.query.current"
      :page-size="10"
      :small="true"
      layout="total, prev, pager, next"
      :total="UserData.total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<style lang="scss" scoped></style>
