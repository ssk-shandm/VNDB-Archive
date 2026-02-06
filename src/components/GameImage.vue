<template>
  <div class="v-image-container" :class="{ 'nsfw-blur': Blurred }">
    <img 
      v-if="src" 
      :src="src" 
      :loading="lazy ? 'lazy' : 'eager'" 
      @click="$emit('click')"
      class="v-image"
    />
    <div v-else class="no-image">No Image</div>
    
    <div v-if="Blurred" class="nsfw-overlay" @click="$emit('click')">
      <span>NSFW</span>
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
}>()

defineEmits(['click'])

// NSFW 显示控制
const Blurred = computed(() => {
  const isAdultContent = (props.sexual || 0) > 0 
  return isAdultContent && !settings.showNSFW
})
</script>

<style scoped>
.v-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.v-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 0.3s,
    filter 0.3s;
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
