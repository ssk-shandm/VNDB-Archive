<template>
  <n-layout-header bordered class="nav-header">
    <div class="nav-content">
      <div class="left-section">
        <n-button
          v-if="showBackButton"
          quaternary
          circle
          size="small"
          class="back-btn"
          @click="handleBack"
        >
          <template #icon>
            <n-icon :component="ArrowLeft" />
          </template>
        </n-button>
      </div>

      <div class="right-section">
        <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
      </div>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { h, ref, computed, watch, type Component } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { NIcon, NMenu, NLayoutHeader, NButton } from 'naive-ui'
import { Home, Search, SettingOne, ArrowLeft } from '@icon-park/vue-next'

const route = useRoute()
const router = useRouter()
const activeKey = ref<string | null>(null)

// 渲染图标的辅助函数
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// 菜单配置
const menuOptions = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => '首页' }),
    key: 'home',
    icon: renderIcon(Home)
  },
  {
    label: () => h(RouterLink, { to: '/search' }, { default: () => '搜索' }),
    key: 'search',
    icon: renderIcon(Search)
  },
  {
    label: () => h(RouterLink, { to: '/setting' }, { default: () => '设置' }),
    key: 'setting',
    icon: renderIcon(SettingOne)
  }
]

// 监听路由变化，实时更新菜单高亮
watch(
  () => route.path,
  path => {
    if (path === '/') {
      activeKey.value = 'home'
    } else if (path.startsWith('/search')) {
      activeKey.value = 'search'
    } else if (path.startsWith('/setting')) {
      activeKey.value = 'setting'
    } else {
      activeKey.value = null
    }
  },
  { immediate: true }
)

// 是否显示返回按钮（非首页显示）
const showBackButton = computed(() => route.path !== '/')

// 返回
const handleBack = () => {
  router.back()
}
</script>

<style scoped>
.nav-header {
  background-color: transparent !important;
  height: 6vh;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(4px);
}

.nav-content {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  height: 100%;
  padding: 0 20px;
  max-width: 100%;
  margin: 0;
}

.left-section {
  display: flex;
  align-items: center;
  min-width: 40px; 
}

.right-section {
  display: flex;
  align-items: center;
  justify-content: flex-end; 
  flex-shrink: 0; 
}

:deep(.n-menu.n-menu--horizontal) {
  background-color: transparent;
}

.back-btn {
  font-size: 20px;
  color: #333;
}
</style>