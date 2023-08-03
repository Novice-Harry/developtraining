<script lang="ts" setup>
const props = defineProps(['title', 'modelValue', 'password'])
const emit = defineEmits(['update:modelValue'])
</script>
<template>
    <div class="myinputbox">
        <div class="title">{{ title }}</div>
        <input :type="password ? 'password' : 'text'" :value="modelValue"
            @input="emit('update:modelValue', $event.target!.value)">
    </div>
</template>
<style lang="scss" scoped>
.myinputbox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;

    .title {
        width: 70px;
    }

    input {
        flex: 1;
        height: 30px;
        padding: 0 10px;
    }
}
</style>