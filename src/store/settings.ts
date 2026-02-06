import { reactive, watch } from 'vue'

export const settings = reactive({
  // 默认为 false
  showNSFW: localStorage.getItem('v_archive_nsfw') === 'true'
})

// 监听按键变化并持续化
watch(
  () => settings.showNSFW,
  (newVal) => {
    localStorage.setItem('v_archive_nsfw', String(newVal))
  }
)