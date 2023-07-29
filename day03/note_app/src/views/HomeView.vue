<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/login'
import { useNoteStore } from '@/stores/note'

import { ref } from 'vue'

const noteStore = useNoteStore()
const loginStore = useLoginStore()
const router = useRouter()
// 退出登录
const logout = () => {
  loginStore.serToken('')
  router.push('/login')
}
// 呼出侧边抽屉
const callDrawer = () => {
  show.value = true
}

// 输入框文本
const inputvalue = ref('')
// 提交功能
const onSubmit = () => {
  noteStore.submit(inputvalue.value)
  inputvalue.value = ''
}
// 显示隐藏颜色选择
const show = ref(false)

// 获取颜色
const getTheme = () => {
  return noteStore.noteData.theme
}
const dialogVisible = ref(false)
</script>

<template>
  <div class="home">
    <MyHeader @leftclick="dialogVisible = true" @rightclick="callDrawer" />
    <MyInputBox v-model="inputvalue" @onSubmit="onSubmit" />
    <MyListGroup />
    <MyColorSelector :show="show" @close="show = false" />
    <MyDialog
      :show="dialogVisible"
      @close="dialogVisible = false"
      @onConfirm="logout"
    />
  </div>
</template>
<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  position: relative;
}

::v-deep {
  .myheader,
  .submitbtn,
  .listheader {
    background-color: v-bind(getTheme()) !important;
  }
  .inputbox {
    input {
      border-width: 1px;
      border-color: v-bind(getTheme()) !important ;
    }
  }
}
</style>
