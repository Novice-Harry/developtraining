<script setup lang="ts">
import { useNoteStore } from '@/stores/note'
const noteStore = useNoteStore()

defineProps(['show'])
const emit = defineEmits(['close'])
const colorList = ['#00b0f0', '#00d1b2', '#f4b976', '#f39894', '#26b6be']

const change = (item: string) => {
  noteStore.setTheme(item)
  emit('close')
}
</script>

<template>
  <transition>
    <div class="colorselector" v-if="show" @click="emit('close')">
      <div class="content" @click.stop>
        <div class="title">点击切换主题色</div>
        <div class="list">
          <div
            class="item"
            v-for="(item, index) in colorList"
            :key="index"
            @click="change(item)"
          >
            <div class="card" :style="{ 'background-color': item }"></div>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.colorselector {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #0000004e;
  padding-top: 46px;
  padding-right: 30%;
  .content {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 20px;
    .list {
      .item {
        height: 40px;
        border: #ccc solid 1px;
        width: 160px;
        padding: 0 25px;
        margin: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .card {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
.v-enter-active,
.v-leave-active {
  transition: ease 0.3s all;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-100%);
}
</style>
