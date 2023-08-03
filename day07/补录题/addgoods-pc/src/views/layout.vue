<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
</script>
<template>
    <el-container class="layout">
        <el-header class="header">
            <div class="title">{{ route.meta.title }}</div>
            <el-button type="primary" @click="router.push(route.meta.btn.path)">{{ route.meta.btn!.txt }}</el-button>
        </el-header>
        <el-main>
            <RouterView />
        </el-main>
    </el-container>
</template>
<style lang="scss" scoped>
.layout{
    height: 100vh;
    .header{
        background-color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title{
            color: white;
        }
    }
    .el-main{
        padding: 0;
    }
}
</style>