<script lang="ts" setup>
import { reactive } from 'vue'

import { showNotify } from 'vant'

import API from '@/api'

const data: any = reactive({
  list: [],
  loading: false,
  finished: false,
  refreshing: false,
  page: 1,
  total: 0
})
const cancel = async (id: number) => {
  await API.collects(id)
  showNotify({ type: 'danger', message: '取消成功' })
  onRefresh()
}

const onLoad = async () => {
  if (data.refreshing) {
    data.list = []
    data.refreshing = false
  }
  let res = await API.getCollects({ page: data.page })
  data.total = res.meta.pagination.total - 1

  data.loading = false
  data.list = [
    ...data.list,
    ...res.data.filter((item: any) => item.goods !== null)
  ]

  if (data.list.length >= data.total) {
    data.finished = true
  } else {
    data.page++
  }
}

const onRefresh = () => {
  // 清空列表数据
  data.list = []
  data.finished = false
  data.page = 1

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  data.loading = true
  onLoad()
}
</script>
<template>
  <div class="layout">
    <van-pull-refresh v-model="data.refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="data.loading"
        :finished="data.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-card
          v-for="item in data.list"
          :key="item.id"
          :price="item.goods.price"
          :desc="item.goods.description"
          :title="item.goods.title"
          :thumb="item.goods.cover_url"
        >
          <template #footer>
            <van-button size="mini" @click="cancel(item.goods_id)">
              取消收藏
            </van-button>
          </template>
        </van-card>
      </van-list>
    </van-pull-refresh>

    <van-empty
      v-if="data.list.length === 0"
      description="暂无收藏，快去逛逛吧"
    />
  </div>
</template>
<style lang="scss" scoped></style>
