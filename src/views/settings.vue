<template>
  <div class="container">
    <n-card title="内容显示设置">
      <n-space vertical size="large">
        <n-space justify="space-between" align="center">
          <div>
            <div style="font-size: 16px; font-weight: 500;">显示成人内容 (NSFW)</div>
            <div style="color: #888;">开启后将不再模糊处理成人游戏的封面图片</div>
          </div>
          <n-switch v-model:value="settings.showNSFW" />
        </n-space>
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { settings } from '@/store/settings'
</script>