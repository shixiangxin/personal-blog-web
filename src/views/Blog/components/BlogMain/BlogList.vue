<template>
  <div class="blog-list-container" v-loading="isLoadingRef">
    <div v-to-top="400" class="list-wrapper" @scroll="handleScroll">
      <div class="list-item" v-for="item in data?.rows" :key="item.id">
        <BlogListItem :data="item" />
      </div>
      <div class="pagination-wrapper">
        <BasePagination
          v-show="!isLoadingRef"
          :total="totalRef"
          :currentPage="currentPageRef"
          :limit="limitRef"
          :visiblePages="visiblePagesRef"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchData } from '@/compositions/fetchData'
import { getBlogs } from '@/api/blog'
import BlogListItem from './BlogListItem.vue'
import BasePagination from '@/components/BasePagination.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDebounce } from '@/utils/debounce.ts'
import eventBus from '@/eventBus/index.ts'
const { data } = useFetchData({
  fn: getBlogs,
  success() {
    handleLoad(false)
  },
})
const isLoadingRef = ref(true)
const currentPageRef = ref(1)
const totalRef = ref(100)
const limitRef = ref(10)
const visiblePagesRef = ref(10)
const route = useRoute()
const categoryidRef = ref(-1)
function handleLoad(value: boolean) {
  if (isLoadingRef.value === value) return
  isLoadingRef.value = value
}
watch(route, (value) => {
  const categoryid = Number(value.params.categoryId)
  if (!categoryid) return
  categoryidRef.value = categoryid
  handleLoad(true)
  useFetchData({
    fn: getBlogs,
    initialOptions: {
      params: {
        categoryid,
      },
    },
    success(resp) {
      handleLoad(false)
      data.value = resp
    },
  })
})
function handlePageChange(e: number) {
  const newPageNumber = e
  if (newPageNumber === currentPageRef.value) return
  currentPageRef.value = e
  handleLoad(true)
  useFetchData({
    fn: getBlogs,
    initialOptions: {
      params: {
        page: e,
        categoryid: categoryidRef.value,
      },
    },
    success(resp) {
      data.value = resp
      handleLoad(false)
    },
  })
}
function handleScroll() {
  handleLazy()
}
const handleLazy = useDebounce(() => {
  eventBus.$emit('scroll:lazy')
}, 200)
</script>
<style scoped lang="scss">
.blog-list-container {
  position: relative;
  width: 100%;
  height: 100%;
  .list-wrapper {
    width: 100%;
    overflow-y: auto;
    height: 100%;
  }
}
</style>
