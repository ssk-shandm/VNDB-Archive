<template>
  <div class="container">
    <n-card title="全局设置" class="settings-card">
      <n-space vertical size="large">
        <n-space justify="space-between" align="center">
          <div>
            <div class="setting-title">显示成人内容 (NSFW)</div>
            <div class="setting-desc">开启后将不再模糊处理成人游戏的封面图片</div>
          </div>
          <n-switch v-model:value="settings.showNSFW" />
        </n-space>

        <n-space justify="space-between" align="center">
          <div>
            <div class="setting-title">显示权重小于2.9的标签</div>
            <div class="setting-desc">开启后显示权重小于2.9大于1的标签</div>
          </div>
          <n-switch v-model:value="settings.showLowWeightTags" />
        </n-space>

        <n-divider />

        <n-space vertical>
          <div class="setting-title">自定义背景图片</div>
          <div class="setting-desc">选择本地图片作为背景 (建议小于 3MB)</div>

          <n-space align="center">
            <input
              type="file"
              ref="fileInputRef"
              accept="image/*"
              style="display: none"
              @change="handleFileSelect"
            />

            <n-button strong secondary type="primary" @click="triggerFileSelect">
              {{ settings.backgroundImage ? '更换图片' : '选择图片' }}
            </n-button>

            <n-button
              v-if="settings.backgroundImage"
              strong
              secondary
              type="error"
              @click="clearBackground"
            >
              清除背景
            </n-button>
          </n-space>
        </n-space>

        <n-space vertical>
          <div class="setting-title">背景图片不透明度 ({{ settings.backgroundOpacity }})</div>
          <div class="setting-desc">调节背景图片的淡入程度，浓度越低文字越清晰</div>
          <n-slider v-model:value="settings.backgroundOpacity" :min="0.0" :max="1.0" :step="0.05" />
        </n-space>
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { settings } from '@/store/settings'

const fileInputRef = ref<HTMLInputElement | null>(null)

const triggerFileSelect = () => {
  fileInputRef.value?.click()
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = e => {
    const result = e.target?.result as string
    if (result) {
      settings.backgroundImage = result
    }
  }

  reader.readAsDataURL(file)
  input.value = ''
}

const clearBackground = () => {
  settings.backgroundImage = ''
}
</script>

<style scoped>
.container {
  width: 95%;
  padding: 20px;
  margin: 0 auto;
}
.setting-title {
  font-size: 16px;
  font-weight: 500;
}
.setting-desc {
  color: #888;
  font-size: 14px;
  margin-bottom: 4px;
}

.settings-card {
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
}
</style>
