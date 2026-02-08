<template>
  <div class="container" :style="{ opacity: isReady ? 1 : 0, transition: 'opacity 0.2s ease' }">
    <div class="GameContent">
      <GameDetails v-if="gameInfo" :info="gameInfo" />

      <n-alert v-else-if="noData" title="Error" type="error" style="margin-top: 20px">
        没有获取到数据
      </n-alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { searchData, type VGame } from '@/api/vndb'
import GameDetails from '../components/GameDetails.vue'

const route = useRoute()
const gameInfo = ref<VGame | null>(null)
const noData = ref(false)
const isReady = ref(false) 

// 强制滚动到顶部
const forceScrollTop = () => {
  const scrollContainer = 
    document.querySelector('.n-layout-scroll-container') || 
    document.querySelector('.n-scrollbar-container') ||
    document.documentElement 

  if (scrollContainer) {
    scrollContainer.scrollTop = 0
    scrollContainer.scrollTo({ top: 0, behavior: 'instant' }) 
  }
  window.scrollTo(0, 0)
}

const resetAndShow = () => {
  isReady.value = false 

  forceScrollTop()

  setTimeout(() => {
    forceScrollTop() 
    isReady.value = true 
  }, 100)
}

const fetchGameData = async (id: string) => {
  try {
    const query = {
      filters: ['id', '=', id]
    }
    const res = await searchData(query)
    if (res.results.length > 0) {
      gameInfo.value = res.results[0]
      noData.value = false
      
      nextTick(() => {
        resetAndShow()
      })
    } else {
      noData.value = true
      isReady.value = true
    }
  } catch (error) {
    console.error(error)
    noData.value = true
    isReady.value = true
  }
}

// 初始化逻辑提取
const initPage = () => {
  isReady.value = false
  forceScrollTop()

  const cachedData = history.state.gameData as VGame
  const id = route.params.id as string

  // 检查缓存
  const isDataIncomplete = cachedData?.relations?.some(
    r => r.image && r.image.sexual === undefined
  )

  if (cachedData && cachedData.description && !isDataIncomplete) {
    gameInfo.value = cachedData
    nextTick(() => {
      resetAndShow()
    })
  } else if (id) {
    fetchGameData(id)
  } else {
    noData.value = true
    isReady.value = true
  }
}

onMounted(() => {
  initPage()
})

onActivated(() => {
  initPage()
})

// 监听同路由参数变化
watch(
  () => route.params.id,
  newId => {
    if (newId) {
      gameInfo.value = null
      initPage()
    }
  }
)
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  padding: 5vh 2vw 0 2vw;
  box-sizing: border-box;
  overflow-anchor: none; 
}

.GameContent {
  width: 100%;
}
</style>