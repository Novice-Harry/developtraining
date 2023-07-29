<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'

import { Search, Edit, Delete, Setting } from '@element-plus/icons-vue'

import { API } from '@/api'
import {
  type IGetUserListData,
  type IGetUserListResult,
  type IUserListItem,
  type IDeleteUserResult,
  type IChangeUserStatusResult
} from '@/utils/type'

const UserListData = reactive<{
  list: IUserListItem[]
  total: number
  keyWord: string
  page: IGetUserListData
  loading: boolean
}>({
  list: [],
  total: 0,
  keyWord: '',
  page: {
    query: '',
    pagenum: 1,
    pagesize: 5
  },
  loading: true
})
const getUserList = () => {
  UserListData.loading = true
  API.getUserList(UserListData.page).then((res: IGetUserListResult) => {
    UserListData.loading = false
    UserListData.list = res.data.users
    UserListData.total = res.data.total
  })
}
onMounted(() => {
  getUserList()
})
const onSearch = () => {
  UserListData.page.query = UserListData.keyWord
  UserListData.page.pagenum = 1
  getUserList()
}
const handleChange = () => {
  getUserList()
}

const mydialog = ref()

const callAddDialog = () => {
  mydialog.value.showDialog()
}
const callEditDialog = (data: IUserListItem) => {
  mydialog.value.showDialog(data)
}
const deleteUser = (id: number) => {
  ElMessageBox.confirm('该操作将会永久删除该用户，是否继续?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      API.deleteUser({ id }).then((res: IDeleteUserResult) => {
        if (res.meta.status === 200) {
          ElMessage.success(res.meta.msg)
          getUserList()
        } else {
          ElMessage.error(res.meta.msg)
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '用户取消操作'
      })
    })
}

const changeUserStatus = (e: IUserListItem) => {
  API.changeUserStatus({ uId: e.id, type: e.mg_state }).then(
    (res: IChangeUserStatusResult) => {
      if (res.meta.status === 200) {
        ElMessage.success(res.meta.msg)
        getUserList()
      } else {
        ElMessage.error(res.meta.msg)
      }
    }
  )
}
</script>
<template>
  <div class="page" v-loading="UserListData.loading">
    <div class="top">
      <el-input
        v-model="UserListData.keyWord"
        placeholder="请输入内容"
        style="width: 300px; margin-right: 10px"
      >
        <template #append>
          <el-button :icon="Search" @click="onSearch" />
        </template>
      </el-input>
      <el-button type="primary" @click="callAddDialog"> 添加用户 </el-button>
    </div>
    <el-table
      :data="UserListData.list"
      style="width: 100%; margin-bottom: 10px"
      border
    >
      <el-table-column type="index" label="#" width="40" />
      <el-table-column prop="username" label="姓名" width="120" />
      <el-table-column prop="email" label="邮箱" width="200" />
      <el-table-column prop="mobile" label="电话" width="150" />
      <el-table-column prop="role_name" label="角色" width="120" />
      <el-table-column prop="mg_state" label="状态" width="80">
        <template #default="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @click="changeUserStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            :icon="Edit"
            @click="callEditDialog(scope.row)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            @click="deleteUser(scope.row.id)"
          />
          <el-button type="warning" :icon="Setting" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="UserListData.page.pagenum"
      v-model:page-size="UserListData.page.pagesize"
      :page-sizes="[2, 3, 4, 5]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="UserListData.total"
      @size-change="handleChange"
      @current-change="handleChange"
    />
    <MyDialog ref="mydialog" @refresh="getUserList" />
  </div>
</template>
<style lang="scss" scoped>
.page {
  .top {
    margin-bottom: 10px;
  }
}
</style>
