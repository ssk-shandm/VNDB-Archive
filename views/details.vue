<template>
  <div class="container">
    <n-button
      strong
      secondary
      type="success"
      @click="router.back()"
      style="font-size: 12px; position: absolute; left: 1vw; top: 1vh; z-index: 10;"
    >
      < Back
    </n-button>

    <div class="GameContent">
      <GD v-if="gameInfo" :info="gameInfo" />
      
      <n-alert v-else-if="NODATA" title="Error" type="error" style="margin-top: 20px"> 
        没有获取到数据 
      </n-alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { VGame } from '../src/api/vndb'
import GD from '../components/GameDetails.vue'

const router = useRouter()
const gameInfo = ref<VGame | null>(null)
const NODATA = ref(false)

onMounted(() => {
  const GameData = history.state.gameData as VGame
  if (GameData) {
    gameInfo.value = GameData
  } else {
    NODATA.value = true
  }
})
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  padding: 5vh 2vw 0 2vw; 
  
  box-sizing: border-box;
}

.GameContent {
  width: 100%;
}
</style>