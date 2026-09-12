<template>
  <div class="blog-left-container" v-loading="isLoadingRef">
    <ArticleList :list="blogTypesRef" @select="handleSelect" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { getBlogTypes } from '@/api/blog'
import { useFetchData } from '@/compositions/fetchData'
import { default as ArticleList, type ListItem } from './ArticleList.vue'
import { ROUTE_PATH } from '@/router/constants'
const route = useRoute()
//获取文章分类列表
const blogTypesRef = ref<ListItem[]>([])
const isLoadingRef = ref(true)
function handleLoad(value: boolean) {
  if (isLoadingRef.value === value) return
  isLoadingRef.value = value
}
useFetchData({
  fn: getBlogTypes,
  success(resp) {
    handleLoad(false)
    const arr = resp.map((item): ListItem => {
      return {
        ...item,
        isSelect: +route.params.categoryId! === item.id,
        anchor: `${ROUTE_PATH.BLOG}/cate/${item.id}`,
      }
    })
    const isSelect = route.path === ROUTE_PATH.BLOG
    const listItem: ListItem = {
      name: '全部',
      id: -1,
      anchor: `${ROUTE_PATH.BLOG}`,
      isSelect,
      children: arr,
    }
    blogTypesRef.value = [listItem]
  },
})
function handleSelect(item: ListItem, oldItem: ListItem | undefined) {
  if (oldItem !== undefined) oldItem.isSelect = false

  item.isSelect = true
}
</script>

<style scoped lang="scss">
.blog-left-container {
  padding: 20px 30px;
  height: 100%;
  overflow: hidden;
}
</style>
