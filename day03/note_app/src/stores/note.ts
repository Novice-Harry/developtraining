import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNoteStore = defineStore(
  'note',
  () => {
    // noteapp 数据
    // list 中 三个分别是 未完成 已完成 已取消
    const noteData = ref<{
      list: { txt: string; id: number }[][] // note列表
      isFold: [boolean, boolean, boolean]
      theme: string // 主题色
    }>({
      list: [[], [], []],
      isFold: [false, false, false],
      theme: '#6eb3ba'
    })
    // 提交任务
    const submit = (txt: string) => {
      const obj = {
        txt,
        id: +new Date()
      }
      noteData.value.list[0].push(obj)
    }
    // 折叠状态切换
    const foldList = (index: number) => {
      const flag = noteData.value.isFold[index]
      noteData.value.isFold[index] = !flag
    }
    // 切换任务状态
    const changeStatus = (from: number, to: number, index: number) => {
      const obj = noteData.value.list[from].splice(index, 1)[0]
      noteData.value.list[to].push(obj)
    }
    // 切换主题
    const setTheme = (color: string) => {
      noteData.value.theme = color
    }
    return { noteData, submit, foldList, changeStatus, setTheme }
  },
  { persist: true }
)
