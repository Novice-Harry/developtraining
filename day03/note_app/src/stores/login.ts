import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore(
  'login',
  () => {
    // 已存token
    const token = ref('')
    // 获取token
    const getToken = () => {
      const temp =
        'Bearer ' +
        Math.random().toString(32).slice(2, 8) +
        Math.random().toString(32).slice(2, 8) +
        Math.random().toString(32).slice(2, 8) +
        Math.random().toString(32).slice(2, 8)
      return temp
    }
    // 设置token
    const serToken = (newToken: string) => {
      token.value = newToken
    }

    return { token, getToken, serToken }
  },
  { persist: true }
)
