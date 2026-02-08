<template>
  <div class="details-wrapper">
    <div class="details-container">
      <n-grid y-gap="40" cols="1" responsive="screen">
        <n-grid-item class="animate-card">
          <n-grid y-gap="24" cols="1 m:24" responsive="screen">
            <n-grid-item span="24 m:9">
              <div class="image-wrapper">
                <GameImage
                  v-if="info.image"
                  :src="info.image.url"
                  :sexual="info.image.sexual"
                  class="game-image"
                />
              </div>
            </n-grid-item>
            <n-grid-item span="24 m:15">
              <div class="info-card">
                <n-space vertical size="large">
                  <div>
                    <h1 class="title">{{ info.title }}</h1>
                    <div class="meta-tags">
                      <n-tag type="primary" bordered> ID: {{ info.id }} </n-tag>
                      <n-tag type="success" bordered v-if="info.released">
                        发售: {{ info.released }}
                      </n-tag>
                      <n-tag type="warning" bordered v-if="info.rating">
                        评分: {{ info.rating }}
                      </n-tag>
                      <n-tag type="info" bordered v-if="info.languages">
                        语言: {{ formatLanguages(info.languages) }}
                      </n-tag>
                    </div>
                  </div>
                  <div v-if="info.developers && info.developers.length">
                    <h3 class="section-title">开发商</h3>
                    <n-space>
                      <n-tag
                        v-for="(dev, index) in info.developers"
                        :key="index"
                        size="small"
                        secondary
                      >
                        {{ dev.name || 'Unknown' }}
                      </n-tag>
                    </n-space>
                  </div>
                  <div v-if="info.description">
                    <h3 class="section-title">简介</h3>
                    <div class="description-text">
                      {{ realDescription(info.description) }}
                    </div>
                  </div>
                </n-space>
              </div>
            </n-grid-item>
          </n-grid>
        </n-grid-item>

        <n-grid-item v-if="sortedTags.length > 0" class="animate-card delay-100">
          <div class="section-header-wrapper">
            <div class="section-header">
              <h3 class="section-title-large">标签 ({{ sortedTags.length }})</h3>
            </div>
          </div>

          <div class="tags-card">
            <n-space :size="[8, 12]">
              <n-tag
                v-for="tag in sortedTags"
                :key="tag.id"
                round
                :bordered="false"
                size="small"
                class="game-tag"
              >
                {{ tag.name }}
                <template #avatar>
                  <span class="tag-score">{{ tag.rating.toFixed(1) }}</span>
                </template>
              </n-tag>
            </n-space>
          </div>
        </n-grid-item>

        <n-grid-item v-if="info.relations && info.relations.length" class="animate-card delay-200">
          <div class="section-header-wrapper">
            <div class="section-header">
              <h3 class="section-title-large">相关游戏</h3>
            </div>
          </div>
          <GameWaterfall ref="waterfall" :list="info.relations">
            <template #item="{ item }">
              <GameCard :info="item" :tag="relationMap[item.relation] || item.relation" />
            </template>
          </GameWaterfall>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, computed } from 'vue'
import type { VGame } from '@/api/vndb'
import { settings } from '@/store/settings'
import GameCard from './GameCard.vue'
import GameWaterfall from './GameWaterfall.vue'
import GameImage from './GameImage.vue'

const props = defineProps<{ info: VGame }>()

const waterfall = ref<any>(null)

// 动态标签排序与过滤
const sortedTags = computed(() => {
  if (!props.info.tags) return []
  const threshold = settings.showLowWeightTags ? 1.0 : 2.9

  return props.info.tags.filter(t => t.rating >= threshold).sort((a, b) => b.rating - a.rating)
})

// 瀑布流布局重新渲染
onMounted(() => {
  nextTick(() => {
    waterfall.value?.renderer()
  })
})

// 简介数据清洗
const realDescription = (text: string) => {
  if (!text) return ''
  return text
    .replace(/\[\/?[u]\]/g, '')
    .replace(/\[\/?[bi]\]/g, '')
    .replace(/\[url=[^\]]+\](.*?)\[\/url\]/g, '$1')
    .replace(/\[\/?(?:spoiler|quote)[^\]]*\]/g, '')
}

const langMap: Record<string, string> = {
  ja: '日语',
  en: '英语',
  'zh-Hans': '简中',
  'zh-Hant': '繁中',
  zh: '中文',
  ko: '韩语',
  ru: '俄语',
  fr: '法语',
  de: '德语',
  es: '西班牙语',
  it: '意大利语',
  pt: '葡萄牙语',
  'pt-br': '巴西葡语',
  vi: '越南语',
  pl: '波兰语',
  tr: '土耳其语',
  uk: '乌克兰语',
  id: '印尼语',
  ta: '泰米尔语',
  th: '泰语',
  ar: '阿拉伯语'
}

const relationMap: Record<string, string> = {
  seq: '续作',
  preq: '前作',
  fan: 'FanDisc',
  set: '同设定',
  char: '同角色',
  side: '外传',
  par: '主线',
  ser: '同系列',
  alt: '不同版本'
}

const formatLanguages = (codes: string[]) => {
  if (!codes) return ''
  return codes.map(code => langMap[code] || code).join(', ')
}
</script>

<style scoped>
.details-wrapper {
  position: relative;
}

.details-container {
  position: relative;
  z-index: 1;
  padding: 20px;
}

.info-card {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.tags-card {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.game-tag {
  font-weight: 500;
  cursor: default;
  transition: all 0.2s;
}

.game-tag:hover {
  transform: translateY(-2px);
}

.tag-score {
  font-size: 0.8em;
  opacity: 0.8;
  margin-right: 2px;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.game-image {
  width: 100%;
  max-width: 30vw;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  object-fit: cover;
  transition: transform 0.3s ease;
}

.game-image:hover {
  transform: scale(1.02);
}

.title {
  font-size: clamp(1.5rem, 2.5vw, 2.2rem);
  font-weight: 800;
  margin: 0 0 10px 0;
  line-height: 1.2;
  color: #2c3e50;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.meta-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.section-header-wrapper {
  margin-bottom: 16px;
  margin-left: 10px;
}

.section-header {
  display: inline-block;
  background: rgba(255, 255, 255, 0.8);
  padding: 4px 16px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.section-title-large {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #333;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #444;
  border-left: 4px solid #18a058;
  padding-left: 10px;
}

.description-text {
  font-size: 1rem;
  line-height: 1.7;
  color: #2c3e50;
  white-space: pre-wrap;
}

.animate-card {
  opacity: 0;
  animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
