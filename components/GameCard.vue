<template>
  <n-card :title="info.title" hoverable class="game-card">
    <template #cover>
      <div>
        <img v-if="info.image" :src="info.image.url" loading="lazy" @click="toDetails" />
      </div>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import type { VGame } from '../src/api/vndb'
import { useRouter } from 'vue-router'
import { toRaw } from 'vue'

const router = useRouter()

const props = defineProps<{ info: VGame }>()

// 跳转对应游戏页面，递交游戏数据
const toDetails = ()=>{
    router.push({
    name: 'Details', 
    params: { id: props.info.id }, 
    state: { gameData: toRaw(props.info) as any } 
  })
}

</script>

<style scoped>
.game-card {
  width: 80%;
  height: auto;
}
</style>
