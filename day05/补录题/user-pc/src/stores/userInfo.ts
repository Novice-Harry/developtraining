import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type ISetUserInfoDate } from '@/utils/type'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref({
      username: '',
      id: 0
    })
    const access = ref('')
    const setUser = (data: ISetUserInfoDate) => {
      user.value.username = data.username
      user.value.id = data.id
      access.value = data.token
    }

    return { user, access, setUser }
  },
  { persist: true }
)
