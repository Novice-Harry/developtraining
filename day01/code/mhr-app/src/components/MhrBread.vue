<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in route.meta.bread"
      :key="index"
      :to="item.nav ? '/' : ''"
      >{{ item.name }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>
