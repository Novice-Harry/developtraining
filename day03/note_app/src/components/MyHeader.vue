<script lang="ts" setup>
const emit = defineEmits(['leftclick', 'rightclick'])
</script>

<template>
  <div class="myheader">
    <span class="left" @click="emit('leftclick')">退出</span>
    <div class="title">学习记事本</div>
    <span class="right" @click="emit('rightclick')">
      <van-icon size="22" name="bars" />
    </span>
  </div>
</template>
<style lang="scss" scoped>
.myheader {
  width: 100vw;
  height: 46px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #6eb3ba;
  color: white;

  .left {
    font-size: 14px;
  }
}
</style>
