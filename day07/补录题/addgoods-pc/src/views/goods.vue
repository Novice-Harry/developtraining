<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const defaultActive = ref('')
watch(() => route.path, 
() => { 
    defaultActive.value = route.path
},
{ immediate: true })
</script>
<template>
    <el-container style="height: 100%;">
        <el-aside width="200px" style="background-color: #444;">
            <el-menu active-text-color="#ffd04b" background-color="#444" style="border-right: transparent;"
                :default-active="defaultActive" text-color="#fff" router>
                <el-menu-item index="/goods/submit">添加商品</el-menu-item>
                <el-menu-item index="/goods/setting">商品审核</el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <RouterView />
        </el-main>
    </el-container>
</template>
<style lang="scss" scoped></style>