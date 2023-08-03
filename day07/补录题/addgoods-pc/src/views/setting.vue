<script lang="ts" setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()


</script>
<template>
	<el-table :data="counter.goods.list" style="width: 100%">
		<el-table-column type="index" label="#" width="60" />
		<el-table-column prop="name" label="商品名称" />
		<el-table-column prop="price" label="商品价格" />
		<el-table-column prop="name" label="状态">
			<template #default="scope">
				<el-switch :model-value="scope.row.status" @click="counter.changeStatus(scope.row.id)" />
			</template>
		</el-table-column>
		<el-table-column prop="name" label="操作">
			<template #default="scope">
				<el-button type="danger" @click="counter.del(scope.row.id)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>
  

  
<style lang="scss" scoped></style>