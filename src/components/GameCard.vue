<template>
  <n-card :title="info.title" hoverable class="game-card">
    <template #cover>
      <div class="card-cover">
        <VImage :src="info.image?.url" :sexual="info.image?.sexual" lazy @click="toDetails" />
      </div>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import type { VGame } from '@/api/vndb'
import VImage from '../components/GameImage.vue'
import { useRouter } from 'vue-router'
import { toRaw } from 'vue'

const router = useRouter()

const props = defineProps<{
  info: VGame | any
  tag?: string
}>()

// 跳转对应游戏页面，递交游戏数据
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
  break-inside: avoid;
  margin-bottom: 12px;
  cursor: pointer;
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
