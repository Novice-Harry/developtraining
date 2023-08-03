import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const user = ref({ token: '' })
    const getToken = () => user.value.token
    const setToken = (token: string) => (user.value.token = token)
    return { getToken, setToken, user }
  },
  { persist: true }
)
