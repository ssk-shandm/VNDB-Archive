<template>
  <div class="v-image-container" :class="{ 'nsfw-blur': Blurred }" :style="containerStyle">
    <img
      v-if="src"
      :src="src"
      :loading="lazy ? 'lazy' : 'eager'"
      @click="$emit('click')"
      class="v-image"
    />
    <div v-else class="no-image">No Image</div>

    <div v-if="Blurred" class="nsfw-overlay" @click="$emit('click')">
      <p>NSFW</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { settings } from '@/store/settings'

const props = defineProps<{
  src?: string
  sexual?: number
  lazy?: boolean
  dims?: number[]
}>()

defineEmits(['click'])

// 计算纵横比样式
const containerStyle = computed(() => {
  if (props.dims && props.dims.length === 2 && props.dims[0] > 0 && props.dims[1] > 0) {
    return {
      aspectRatio: `${props.dims[0]} / ${props.dims[1]}`
    }
  }
  return {}
})

// NSFW 显示控制
const Blurred = computed(() => {
  const sexualLevel = props.sexual ?? 0
  const isAdultContent = sexualLevel > 0
  return isAdultContent && !settings.showNSFW
})
</script>

<style scoped>
.v-image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #f0f0f0;
}

.v-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 0.3s,
    filter 0.3s;
  display: block;
}

.nsfw-blur .v-image {
  filter: blur(40px);
}

.no-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #ccc;
  background: #f5f5f5;
}

</style>
