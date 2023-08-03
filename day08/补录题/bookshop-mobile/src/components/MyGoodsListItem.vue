<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps(['item'])
const linkTo = (id: any) => {
  router.push('/detail/' + id)
}
</script>
<template>
  <div class="listitem" @click="linkTo(item.id)">
    <img :src="item.cover_url" alt="" />
    <p>{{ item.title }}</p>
    <p>{{ '￥' + item.price }}</p>
    <p>{{ '已售' + item.sales }}</p>
  </div>
</template>
<style lang="scss" scoped>
.listitem {
  width: 50vw;
  img {
    width: 100%;
  }
}
p {
  padding-left: 15px;
  padding-bottom: 3px;
  font-size: 14px;
}
</style>
