<template>
  <div class="blog-main-container">
    <div class="main-list">
      <BlogList />
    </div>
  </div>
</template>

<script setup lang="ts">
import BlogList from './BlogList.vue'
</script>

<style scoped lang="scss">
.blog-main-container {
  width: 100%;
  height: 100%;
  .main-list {
    width: 100%;
    height: 100%;
  }
}
</style>
