<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { reactive } from 'vue';

const counter = useCounterStore()
const formInline = reactive({
  query: ''
})

const onSubmit = () => {
  counter.onSearch(formInline.query)
}
</script>

<template>
  <div class="homepage">
    <!-- 列表 -->
    <div class="content" v-if="counter.goods.list.length > 0">
      <div class="top">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-form-item>
            <el-input v-model="formInline.query" style="width: 300px;" placeholder="搜索" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="list">
          <div class="listitem" v-for="item in counter.queryList">
            <div class="imgbox">
              <img :src="'/' + counter.goods.imgList[parseInt(item.img)]" alt="">
              <el-tag class="ml-2 tag" type="danger" v-if="item.status">已通过</el-tag>
              <el-tag class="ml-2 tag" type="info" v-else>未通过</el-tag>
            </div>
            <div class="info">
              <p>{{ item.name }}</p>
              <p>{{ '￥' + item.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 空列表显示的消息 -->
    <div class="emptyMessage" v-else>
      <h2>暂无商品</h2>
      <Router-link to="/goods/submit">去添加</Router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.homepage {
  width: 100%;
  height: 100%;
  position: relative;

  .emptyMessage {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;

    a {
      color: aqua;
      margin-left: 10px;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    padding: 20px;

    .form-inline {
      text-align: center;
    }
  }

  .list {
    padding: 20px 5vw;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .listitem {
      width: 18vw;
      box-shadow: 0 0 5px #ccc;
      margin: 0 1vw 10px;

      .imgbox {
        width: 100%;
        height: 12vw;
        padding: 1vw;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          transition: all .2s ease;
        }

        .tag {
          position: absolute;
          right: 1vw;
          top: 1vw;
        }
      }

      .info {
        padding: 1vw;
      }
    }

    .listitem :hover {
      img {
        transform: scale(1.1);
      }
    }
  }
}
</style>