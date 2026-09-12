<template>
  <div class="blog-content-container">
    <div class="blog-content-wrapper" v-if="data">
      <h1 class="title">{{ data.title }}</h1>
      <div class="info">
        <span class="time">
          {{ formatTimestamp(data.createDate) }}
        </span>
        <span class="scan-number"> 浏览:{{ data.scanNumber }} </span>
        <a class="comment-number"> 评论:{{ data.commentNumber }} </a>
        <a href="" class="category">
          {{ data.category.name }}
        </a>
      </div>
      <div class="content" v-html="data.htmlContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'highlight.js/styles/github.css'
import '@/styles/markdown.scss'
import { type Blog } from '@/api/blog'
import { formatTimestamp } from '@/utils/formatTimestamp'
interface Props {
  data: Blog | null
}
defineProps<Props>()
</script>

<style scoped lang="scss">
@use '/src/styles/var';
.blog-content-container {
  height: 100%;

  .info {
    display: flex;
    color: var.$gray;
    font-size: 12px;
    a,
    span {
      margin: 0 8px;
    }
  }
  // .blog-content-wrapper {
  //   height: 100%;
  //   overflow-y: auto;
  // }
}
</style>
