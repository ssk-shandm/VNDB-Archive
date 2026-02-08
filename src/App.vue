<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        
        <div 
          class="global-bg" 
          :style="bgStyle"
        ></div>

        <n-layout position="absolute" style="background: transparent;">
          
          <NavBar />

          <n-layout-content 
            content-style="min-height: calc(100vh - 6vh); display: flex; flex-direction: column; position: relative;"
            :native-scrollbar="false" 
            style="background: transparent;"
          >
            
            <router-view v-slot="{ Component }">
              <keep-alive include="Search">
                <component :is="Component" />
              </keep-alive>
            </router-view>
            
          </n-layout-content>

        </n-layout>

      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { settings } from '@/store/settings'
import type { GlobalThemeOverrides } from 'naive-ui'

// 动态背景样式
const bgStyle = computed(() => {
  if (settings.backgroundImage) {
    return {
      backgroundImage: `url(${settings.backgroundImage})`,
      opacity: settings.backgroundOpacity 
    }
  }
  return { opacity: 1 } 
})

// 强制所有卡片背景透明
const themeOverrides = computed<GlobalThemeOverrides>(() => {
  return {
    Card: {
      color: 'rgba(255, 255, 255, 0)', 
      borderColor: 'transparent',
      titleTextColor: '#333', 
      textColor: '#333'
    },
    Layout: {
      color: 'transparent'
    }
  }
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #ffffff; 
}

.global-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  transition: opacity 0.2s ease, background-image 0.5s ease;
}

.details-container, .game-card {
  background: transparent !important;
}
</style>