<template>
  <n-config-provider>
    <n-message-provider>
      <n-dialog-provider>
        <router-view v-slot="{ Component }">
          <keep-alive include="Search">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts"></script>

<style></style>