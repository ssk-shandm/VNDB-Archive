<template>
  <Waterfall
    ref="waterfallInnerRef"
    :list="list"
    :width="300"
    :gutter="12"
    :breakpoints="{
      1200: { rowPerView: 4 },
      800: { rowPerView: 3 },
      500: { rowPerView: 2 }
    }"
    background-color="transparent"
  >
    <template #item="{ item }">
      <slot name="item" :item="item"></slot>
    </template>
  </Waterfall>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

defineProps<{
  list: any[]
}>()

defineSlots<{
  item(props: { item: any }): any
}>()

const waterfallInnerRef = ref<any>(null)

defineExpose({
  renderer: () => waterfallInnerRef.value?.renderer()
})
</script>

<style>
.waterfall-list {
  background: transparent !important;
  background-color: transparent !important;
}

.waterfall-item {
  background: transparent !important;
}
</style>
