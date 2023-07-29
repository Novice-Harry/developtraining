<script lang="ts" setup>
const emit = defineEmits(['onSubmit', 'update:modelValue'])
defineProps(['modelValue'])

const snycValue = (e: any) => {
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <div class="inputbox">
    <input
      type="text"
      :value="modelValue"
      @input="snycValue"
      placeholder="待办事项"
      @keydown.enter="emit('onSubmit')"
    />
    <div class="submitbtn" @click="emit('onSubmit')">提交</div>
  </div>
</template>

<style lang="scss" scoped>
.inputbox {
  width: 100vw;
  padding: 20px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: calc(100% - 70px);
    height: 32px;
    padding: 0 10px;
  }

  .submitbtn {
    width: 60px;
    background-color: #6eb3ba;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: white;
    border-radius: 4px;
  }
}
</style>
