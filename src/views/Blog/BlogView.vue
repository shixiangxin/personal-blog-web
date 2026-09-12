<template>
  <div class="blog-view-container">
    <ThreeColumnLayout>
      <BlogMain />
      <template #right>
        <RightList />
      </template>
    </ThreeColumnLayout>
  </div>
</template>

<script setup lang="ts">
import ThreeColumnLayout from '@/layout/ThreeColumnLayout.vue'
import RightList from './components/RightList'
import BlogMain from './components/BlogMain'

//获取文章内容
</script>

<style scoped lang="scss">
.blog-view-container {
  width: 100%;
  height: 100%;
}
</style>
