import { reactive, watch } from 'vue'

export const settings = reactive({
  // NSFW 开关
  showNSFW: localStorage.getItem('v_archive_nsfw') === 'true',
  // 自定义背景图片 URL
  backgroundImage: localStorage.getItem('v_archive_bg_image') || '',
  // 背景图片不透明度
  backgroundOpacity: Number(localStorage.getItem('v_archive_bg_opacity')) || 0.5
})

// 监听变化并持久化
watch(
  () => settings.showNSFW,
  (newVal) => localStorage.setItem('v_archive_nsfw', String(newVal))
)

watch(
  () => settings.backgroundImage,
  (newVal) => localStorage.setItem('v_archive_bg_image', newVal)
)

watch(
  () => settings.backgroundOpacity,
  (newVal) => localStorage.setItem('v_archive_bg_opacity', String(newVal))
)