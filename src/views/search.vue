<template>
  <div class="container">
    <n-space vertical size="large">
      <div class="input-wrapper" :class="{ 'center-mode': Centered }">
        <n-input
          v-model:value="keyword"
          @keydown.enter="handleSearch"
          size="large"
          round
          placeholder="搜索..."
          class="search-input"
        />
      </div>

      <n-spin :show="loading">
        <div class="container-card">
          <GameWaterfall ref="waterfallRef" v-if="GList.length > 0" :list="GList">
            <template #item="{ item }">
              <GameCard :info="item" />
            </template>
          </GameWaterfall>

          <n-result
            v-else-if="Searched"
            status="404"
            title="啥也没有啊。。"
            style="margin-top: 50px"
          >
          </n-result>
        </div>
      </n-spin>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import GameWaterfall from '../components/GameWaterfall.vue'
import GameCard from '../components/GameCard.vue'
import { useSearch } from '@/hooks/useSearch'

defineOptions({
  name: 'Search'
})

const { GList, loading, Centered, Searched, keyword, waterfallRef, handleSearch } = useSearch()
</script>

<style scoped>
.container {
  position: relative;
  padding: 5vh 5vw 0 5vw;
}
.container-card {
  margin-top: 20px;
  position: relative;
  z-index: 1;
}

.input-wrapper {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transform: translateY(0);
  width: 100%;
  position: relative;
  z-index: 100;
}

.center-mode {
  transform: translateY(35vh);
}

.search-input {
  background-color: #f2f3f5;
  border: 1px solid transparent;
}

.search-input:focus-within {
  background-color: #fff;
  transition: background-color 0.3s;
}
</style>
