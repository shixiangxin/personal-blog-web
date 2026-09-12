<template>
  <div class="blog-detail-container">
    <ThreeColumnLayout>
      <div
        ref="scrollContainerRef"
        class="blog-detail-main"
        v-loading="isLoadingRef"
        v-to-top="400"
        @scroll="handleScroll"
      >
        <div class="blog-content">
          <BlogContent :data="data" />
        </div>
        <div class="blog-comments">
          <BlogComment />
        </div>
      </div>
      <template #right>
        <BlogToc
          :hash="hashRef"
          :toc="data?.toc"
          v-loading="isLoadingRef"
          @select="handleTocSelect"
        />
      </template>
    </ThreeColumnLayout>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, provide, watch, nextTick } from 'vue'
import { useFetchData } from '@/compositions/fetchData'
import { useDebounce } from '@/utils/debounce.ts'
import { getBlog, type BlogTocItem } from '@/api/blog'
import ThreeColumnLayout from '@/layout/ThreeColumnLayout.vue'
import BlogToc from './BlogComment/BlogToc.vue'
import BlogContent from './BlogComment/BlogContent.vue'
import BlogComment from './BlogComment/BlogComment.vue'
import eventBus from '@/eventBus/index.ts'
const route = useRoute()
const blogId = route.params.blogId
const isLoadingRef = ref(true)
const scrollContainerRef = ref<HTMLElement | null>(null)
const eleListRef = ref<Element[]>([])
const hashRef = ref('')
provide('loading', isLoadingRef)
provide('blogId', blogId)
const { data } = useFetchData({
  fn: getBlog,
  initialOptions: {
    id: blogId as string,
  },
  async success() {
    isLoadingRef.value = false

    await nextTick()
    getEles()
  },
})

watch([() => route.hash, data], ([hash]) => scrollToAnchor(hash), { flush: 'post' })

function scrollToAnchor(hash: string) {
  const container = scrollContainerRef.value
  if (!container) return

  if (!hash) {
    container.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const target = document.getElementById(hash.slice(1))
  if (!target || !container.contains(target)) return

  const top =
    container.scrollTop +
    target.getBoundingClientRect().top -
    container.getBoundingClientRect().top -
    container.clientTop
  container.scrollTo({ top, behavior: 'smooth' })
}

function handleTocSelect(hash: string) {
  if (hash === route.hash) {
    scrollToAnchor(hash)
  }
}

function handleScroll(event: Event) {
  getHash(200)
  const element = event.currentTarget as HTMLElement
  const distanceToBottom = element.scrollHeight - element.scrollTop - element.clientHeight
  // 距离底部 20px 时触发
  if (distanceToBottom <= 1) {
    getMoreComment()
    return
  }
}
const getMoreComment = useDebounce(() => {
  //触发事件
  eventBus.$emit('message:loadMore', blogId as string)
}, 200)

function getEles() {
  if (!data.value) return
  function collectElementTops(toc: BlogTocItem[]) {
    for (const item of toc) {
      const ele = document.querySelector(`#${item.anchor}`)
      if (ele) {
        eleListRef.value.push(ele)
      }
      if (item.children) {
        collectElementTops(item.children)
      }
    }
  }

  collectElementTops(data.value.toc)
}
const getHash = useDebounce((value: number) => {
  for (const e of eleListRef.value) {
    const top = e.getBoundingClientRect().top
    if (top >= 0 && top <= value) {
      hashRef.value = '#' + e.id
      return e.id
    }

    //
  }
}, 200)
</script>

<style scoped lang="scss">
.blog-detail-container {
  height: 100%;
  padding: 20px;
  .blog-detail-main {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
