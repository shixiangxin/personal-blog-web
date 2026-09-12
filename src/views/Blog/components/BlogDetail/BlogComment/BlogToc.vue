<template>
  <div class="blog-toc-container">
    <div class="blog-toc-list">
      <ArticleList :list="tocRef" @select="handleSelect" v-if="toc" v-bind="$attrs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { type BlogTocItem } from '@/api/blog'
import { type ListItem } from '../../RightList/ArticleList.vue'
import ArticleList from '../../RightList/ArticleList.vue'
defineOptions({
  inheritAttrs: false,
})
interface Props {
  toc: BlogTocItem[] | null | undefined
}
const props = defineProps<Props>()
const emit = defineEmits<{
  select: [anchor: string]
}>()
const route = useRoute()
const tocRef = ref<ListItem[]>([])
watch(
  () => props.toc,
  () => {
    function createTocItems(arr: BlogTocItem[]): ListItem[] {
      const newArr = arr.map((item): ListItem => {
        const anchor = `#${item.anchor}`
        return {
          isSelect: route.hash === anchor,
          anchor,
          name: item.name,
          children: item.children ? createTocItems(item.children) : undefined,
        }
      })
      return newArr
    }
    if (!props.toc) return []
    const toc = createTocItems(props.toc)
    if (!route.hash && toc[0]) {
      toc[0].isSelect = true
    }
    tocRef.value = toc
  },
)
function handleSelect(item: ListItem, oldItem: ListItem | undefined) {
  if (oldItem !== undefined) oldItem.isSelect = false
  item.isSelect = true
  emit('select', item.anchor)
}
</script>

<style scoped lang="scss">
.blog-toc-container {
  height: 100%;
  min-width: 200px;
  .blog-toc-list {
    padding: 20px 30px;
    height: 100%;
  }
}
</style>
