<template>
  <n-card
    :title="info.title"
    :header-style="{ padding: '8px 9px', fontSize: '20px' }"
    hoverable
    class="game-card"
  >
    <template #cover>
      <div class="card-cover">
        <GameImage
          :src="info.image?.url"
          :sexual="info.image?.sexual"
          :dims="info.image?.dims"
          lazy
          @click="toDetails"
        />
      </div>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import type { VGame } from '@/api/vndb'
import GameImage from './GameImage.vue'
import { useRouter } from 'vue-router'
import { toRaw } from 'vue'

const router = useRouter()

const props = defineProps<{
  info: VGame
  tag?: string
}>()

// 跳转到详情页
const toDetails = () => {
  router.push({
    name: 'Details',
    params: { id: props.info.id },
    state: { gameData: toRaw(props.info) as any }
  })
}
</script>

<style scoped>
.game-card {
  border: 1px solid #4f4c4c;
  break-inside: avoid;
  cursor: pointer;
  backdrop-filter: blur(5px);
}
.card-cover {
  position: relative;
  width: 100%;
  height: auto;
  background: #f0f0f0;
  overflow: hidden;
}
.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.game-card:hover img {
  transform: scale(1.05);
}
.corner-tag {
  position: absolute;
  top: 4px;
  left: 4px;
  z-index: 2;
  opacity: 0.9;
}
.no-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #ccc;
}
</style>