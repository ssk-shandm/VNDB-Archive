<template>
  <div class="container">
    <div class="details-wrapper">
      <img v-if="info.image" :src="info.image.url" loading="lazy" class="game-image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VGame } from '../src/api/vndb'

defineProps<{ info: VGame }>()
</script>

<style scoped>
.container {

}
.game-image {
  max-width: 30vw;
  max-height:50vh;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
