import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const goods = ref<{
    list: {
      name: string; id: number; img: string; price: string; type: string; status: boolean
    }[]
    imgList: string[]
    query: string
  }>({
    list: [],
    imgList: ['ck.jpeg', 'tk.webp', 'ss.webp'],
    query: ''
  })
  const onSearch = (kwd: string) => {
    goods.value.query = kwd
  }
  const queryList = computed(() => {
    return goods.value.list.filter(item => item.name.includes(goods.value.query))
  })
  // 添加
  const add = (data: any) => {
    let index = goods.value.list.findIndex(item => item.name === data.name)
    if (index !== -1) {
      ElMessage.error(`商品 ${data.name} 已存在`)
    } else {
      goods.value.list.push({ ...data, id: +new Date(), status: true })
      ElMessage.success(`添加成功`)
    }
  }
  // 删除
  const del = (id: number) => {
    const index = goods.value.list.findIndex(item => item.id === id)
    goods.value.list.splice(index, 1)
    ElMessage.success(`删除成功`)
  }
  // 修改状态
  const changeStatus = (id: number) => {
    const index = goods.value.list.findIndex(item => item.id === id)
    goods.value.list[index].status = !goods.value.list[index].status
    ElMessage.success(`状态切换成功`)
  }
  return { goods, add, del, changeStatus, queryList, onSearch }
}, { persist: true })
