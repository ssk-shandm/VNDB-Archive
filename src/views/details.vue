<template>
  <div class="container">
    <div class="GameContent">
      <GameDetails v-if="gameInfo" :info="gameInfo" />

      <n-alert v-else-if="NODATA" title="Error" type="error" style="margin-top: 20px">
        没有获取到数据
      </n-alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { searchData, type VGame } from '@/api/vndb'
import GameDetails from '../components/GameDetails.vue'

const route = useRoute()
const gameInfo = ref<VGame | null>(null)
const NODATA = ref(false)

// 根据 ID 从 API 中获取数据
const fetchGameData = async (id: string) => {
  try {
    const query = {
      filters: ['id', '=', id],
      fields:
        'title, released, rating, image.url, image.sexual, description, developers.name, languages, relations.id, relations.relation, relations.title, relations.relation_official, relations.image.url, relations.image.sexual, relations.image.dims'
    }
    const res = await searchData(query)
    if (res.results.length > 0) {
      gameInfo.value = res.results[0]
      NODATA.value = false
    } else {
      NODATA.value = true
    }
  } catch (error) {
    console.error(error)
    NODATA.value = true
  }
}

onMounted(() => {
  // 从 state 中获取数据
  const GameData = history.state.gameData as VGame
  const id = route.params.id as string

  // 检查数据完整性(NSFW 图片标记)
  const isDataIncomplete = GameData?.relations?.some(
    r => r.image && r.image.sexual === undefined
  )
  if (GameData && GameData.description && !isDataIncomplete) {
    gameInfo.value = GameData
  } else if (id) {
    // 异常状态或数据不完整时重新获取数据
    fetchGameData(id)
  } else {
    NODATA.value = true
  }
})

// 监听 ID 变化
watch(
  () => route.params.id,
  newId => {
    if (newId) {
      gameInfo.value = null
      fetchGameData(newId as string)
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
}

.GameContent {
  width: 100%;
}
</style>
