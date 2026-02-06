<template>
  <n-layout-header bordered class="nav-bar">
    <div class="nav-wrapper">
      <button @click="router.back()" class="back">< 返回</button>

      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" class="nav-menu" />
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { type MenuOption } from 'naive-ui'

const router = useRouter()
const activeKey = ref<string | null>(null)

// 定义菜单项
const menuOptions: MenuOption[] = [
    {
        label: () => h(RouterLink, { to: '/' }, { default: () => '首页' }),
        key: 'home'
    },
    {
        label: () => h(RouterLink, { to: '/search' }, { default: () => '搜索' }),
        key: 'search'
    },
    {
        label: () => h(RouterLink, { to: '/setting' }, { default: () => '设置' }),
        key: 'setting'
    }
]
</script>

<style scoped>
.nav-bar {
  border: 0px;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: rgba(191, 191, 191, 0.359);
  backdrop-filter: blur(10px);
}

.nav-wrapper {
  width: 100%;
  max-width: 114514px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.nav-menu {
  flex: 1;
  justify-content: flex-end;
}

.back {
  background: none;
  border: 0px;
  font-weight: bold;
}
</style>
