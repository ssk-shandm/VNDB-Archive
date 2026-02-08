import { reactive, watch } from 'vue'

export const settings = reactive({
  // NSFW 开关
  showNSFW: localStorage.getItem('v_archive_nsfw') === 'true',
  // 显示权重小于2.9的标签
  showLowWeightTags: localStorage.getItem('v_archive_show_low_weight_tags') === 'true',
  // 自定义背景图片 URL
  backgroundImage: localStorage.getItem('v_archive_bg_image') || '',
  // 背景图片不透明度
  backgroundOpacity: Number(localStorage.getItem('v_archive_bg_opacity')) || 0.5
})

// 监听变化并持久化
watch(
  () => settings.showNSFW,
  newVal => localStorage.setItem('v_archive_nsfw', String(newVal))
)

watch(
  () => settings.showLowWeightTags,
  newVal => localStorage.setItem('v_archive_show_low_weight_tags', String(newVal))
)

watch(
  () => settings.backgroundImage,
  newVal => localStorage.setItem('v_archive_bg_image', newVal)
)

watch(
  () => settings.backgroundOpacity,
  newVal => localStorage.setItem('v_archive_bg_opacity', String(newVal))
)
