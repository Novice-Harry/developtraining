import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const token = ref('')
    const setToken = (newToken: string) => {
      token.value = newToken
    }

    return { token, setToken }
  },
  { persist: true }
)
