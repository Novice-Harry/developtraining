<script lang="ts" setup>
import { useNoteStore } from '@/stores/note'

const noteStore = useNoteStore()
</script>
<template>
  <div class="listgroup">
    <!-- 未完成 -->
    <div class="list">
      <div class="listheader" @click="noteStore.foldList(0)">
        <div class="title">未完成</div>
        <div
          class="arrow"
          :class="{ 'arrow-down': noteStore.noteData.isFold[0] }"
        >
          <van-icon name="arrow" />
        </div>
      </div>
      <div
        class="listcontent"
        :style="{
          height: !noteStore.noteData.isFold[0]
            ? '0px'
            : noteStore.noteData.list[0].length * 40 + 'px'
        }"
      >
        <div
          class="listitem"
          v-for="(item, index) in noteStore.noteData.list[0]"
          :key="item.id"
        >
          <div class="itemleft">
            <input
              type="checkbox"
              :checked="false"
              @click="noteStore.changeStatus(0, 1, index)"
            />
            <span class="txt">{{ item.txt }}</span>
          </div>
          <div class="itemright">
            <span class="itembtn" @click="noteStore.changeStatus(0, 2, index)">
              取消
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 已完成 -->
    <div class="list">
      <div class="listheader" @click="noteStore.foldList(1)">
        <div class="title">已完成</div>
        <div
          class="arrow"
          :class="{ 'arrow-down': noteStore.noteData.isFold[1] }"
        >
          <van-icon name="arrow" />
        </div>
      </div>
      <div
        class="listcontent"
        :style="{
          height: !noteStore.noteData.isFold[1]
            ? '0px'
            : noteStore.noteData.list[1].length * 40 + 'px'
        }"
      >
        <div
          class="listitem"
          v-for="(item, index) in noteStore.noteData.list[1]"
          :key="item.id"
        >
          <div class="itemleft">
            <input
              type="checkbox"
              :checked="true"
              @click="noteStore.changeStatus(1, 0, index)"
            />
            <span class="txt">{{ item.txt }}</span>
          </div>
          <div class="itemright">
            {{ new Date(item.id).toLocaleDateString() }}
          </div>
        </div>
      </div>
    </div>
    <!-- 已取消 -->
    <div class="list">
      <div class="listheader" @click="noteStore.foldList(2)">
        <div class="title">已取消</div>
        <div
          class="arrow"
          :class="{ 'arrow-down': noteStore.noteData.isFold[2] }"
        >
          <van-icon name="arrow" />
        </div>
      </div>
      <div
        class="listcontent"
        :style="{
          height: !noteStore.noteData.isFold[2]
            ? '0px'
            : noteStore.noteData.list[2].length * 40 + 'px'
        }"
      >
        <div
          class="listitem"
          v-for="(item, index) in noteStore.noteData.list[2]"
          :key="item.id"
        >
          <div class="itemleft">
            <span class="throughlinetxt">{{ item.txt }}</span>
          </div>
          <div class="itemright">
            <span class="itembtn" @click="noteStore.changeStatus(2, 0, index)">
              恢复
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.listgroup {
  padding: 0 5px;

  .list {
    .listheader {
      z-index: 99;
      height: 40px;
      background-color: #6eb3ba;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;

      .title {
        font-size: 14px;
      }

      .arrow {
        transition: all 0.3s ease;
      }

      .arrow-down {
        transform: rotate(90deg);
      }
    }

    .listcontent {
      transition: all ease 0.3s;
      overflow: hidden;
      .listitem {
        height: 40px;
        padding: 0 10px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .itemleft {
          display: flex;
          align-items: center;
          input[type='checkbox'] {
            margin-right: 5px;
          }

          .throughlinetxt {
            text-decoration: line-through;
          }
        }
        .itemright {
          .itembtn {
            padding: 2px 4px;
            border: 1px #ccc solid;
            border-radius: 3px;
          }
        }
      }
    }
  }
}
</style>
