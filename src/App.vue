<template>

</template>

<script setup lang="ts">
import { ref } from "vue";
import { searchData, type VQuery,type VGame } from "./api/vndb";

const searchText = ref("Fate"); // 测试期间硬编码
const VList = ref<VGame[]>([]);

const isLoading = ref(false);

async function handleSearch() {
    isLoading.value = true;
  try {
    // 整合待搜索数据
    const query: VQuery = {
      filters: ["search", "=", searchText.value], 
      fields: "title, released, rating, image.url, description", 
    };

    // 发送请求
    const data = await searchData(query);
    VList.value = data.results;

  } catch (error) {
    console.error(error);
  }
}
</script>

<style scoped>

</style>