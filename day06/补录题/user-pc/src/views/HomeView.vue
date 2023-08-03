<script setup lang="ts">
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

import axios from "axios";

const router = useRouter()

const showUserMenu = ref(false)
const user = localStorage.getItem('token')

// 当前菜单选中
const current = ref('0')
const usermenulist = reactive<{
  list: any[]; menu: any[]; currentMenu: any[]
}>({ list: [], menu: [], currentMenu: [] })
const currentid = ref(1)
const changeMenu = () => {
  usermenulist.currentMenu = []
  usermenulist.menu.forEach((item, index) => {
    usermenulist.currentMenu.push({
      title: item.title,
      id: item.id,
      children: []
    })
    if (item.children) {
      item.children.forEach((child: any) => {
        child.type.includes(currentid.value) && usermenulist.currentMenu[index].children.push(child)
      })
    }
  })
}
// 获取数据 角色菜单 和 侧边菜单
axios.get('roles.json').then(res => {
  usermenulist.list = res.data
})
axios.get('menu.json').then(res => {
  usermenulist.menu = res.data
  changeMenu()
})

// 退出登录
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const changeId = (id:number) => {
  currentid.value = id
  changeMenu()
}

</script>

<template>
  <div class="home">
    <div class="top">
      <div class="logout" @click="showUserMenu = true">{{ user }}</div>
    </div>
    <div class="container">
      <div class="aside">
        <!-- 菜单 -->
        <div class="menu">
          <div class="submenu" v-for="item in usermenulist.currentMenu" :key="item.id">
            <div class="content" @click="current == item.id ? current = '' : current = item.id">
              <div class="name">{{ item.title }}</div>
              <div class="arrow" v-if="item.children.length > 0">></div>
            </div>
            <div class="list" v-if="item.children"
              :style="{ height: current == item.id ? item.children.length * 40 + 'px' : '0px' }">
              <div class="content" v-for="v in item.children">
                <div class="name">{{ v.title }}</div>
                <div class="arrow" v-if="v.children">></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main"></div>
    </div>
  </div>
  <div class="usermenu" v-if="showUserMenu" @click="showUserMenu = false">
    <div class="usermenulist">
      <div class="listitem" v-for="item, index in usermenulist.list" :key="index" @click="changeId(item.type)" :class="{'current':item.type === currentid}">{{ item.name }}</div>
      <div class="listitem" @click="logout">退出</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;

  .top {
    width: 100%;
    height: 50px;
    background-color: #333;
    position: relative;

    .logout {
      width: 100px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background-color: #fff;
      position: absolute;
      right: 30px;
      top: 5px;
      cursor: pointer;
    }
  }

  .container {
    width: 100%;
    height: calc(100vh - 50px);

    .aside {
      width: 200px;
      height: 100%;
      background-color: #999;

      .menu {

        .submenu {
          .list {
            overflow: hidden;
            transition: all .3s ease;
          }

          .content {
            width: 100%;
            height: 40px;
            padding: 0 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.usermenu {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;

  .usermenulist {
    width: 100px;
    text-align: center;
    position: absolute;
    right: 30px;
    top: 50px;
    background-color: #fff;
    border: 1px solid #111;

    .listitem {
      cursor: pointer;
      line-height: 40px;
    }

    .listitem:hover {
      color: aqua;
      background-color: #ccc;
    }
  }
}
.current{
  background-color: #f00;
}
</style>
