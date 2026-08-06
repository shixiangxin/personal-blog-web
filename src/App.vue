<template>
  <div class="app-container">
    <ThreeColumnLayout>
      <template #left>
        <div class="left">
          <SiteAside />
        </div>
      </template>
      <template #default>
        <div class="main">
          <RouterView />
        </div>
      </template>
    </ThreeColumnLayout>
  </div>
</template>
<script setup lang="ts">
import ThreeColumnLayout from '@/layout/ThreeColumnLayout.vue'
import SiteAside from '@/components/SiteAside.vue'
</script>
<style scoped lang="scss">
@use '/src/styles/mixin.scss';
.app-container {
  @include mixin.self-fill(fixed);
  .left {
    height: 100%;
  }
  .main {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
