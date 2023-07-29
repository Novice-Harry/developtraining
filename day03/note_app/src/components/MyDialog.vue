<script lang="ts" setup>
defineProps(['show'])
const emit = defineEmits(['close', 'onConfirm'])
</script>

<template>
  <div class="mydialog" v-if="show" @click="emit('close')">
    <div class="content" @click.stop>
      <div class="title">提示</div>
      <div class="msg">确定要退出登录？</div>
      <div class="btnbox">
        <div class="btn" @click="emit('close')">取消</div>
        <div
          class="btn"
          style="color: #3535bc; border-left: 1px solid #ccc"
          @click="emit('onConfirm')"
        >
          确定
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mydialog {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: #00000063;

  .content {
    width: 90vw;
    border-radius: 20px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding-top: 20px;

    .title {
      font-weight: 600;
    }

    .msg {
      padding: 10px;
    }

    .btnbox {
      border-top: 1px solid #ccc;
      display: flex;
      align-items: center;
      .btn {
        flex: 1;
        text-align: center;
        line-height: 40px;
      }
    }
  }
}
</style>
