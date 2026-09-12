<template>
  <div class="article-list-container">
    <ul class="list">
      <li v-for="item in list" :key="item.anchor" @click.stop="handleClick(item)" class="list-item">
        <RouterLink :to="item.anchor">
          <div :class="['item-wrapper', item.isSelect ? 'active' : '']">
            <span class="title">{{ item.name }}</span
            ><span class="details" v-if="item.articleCount">{{ item.articleCount }}篇</span>
          </div>
        </RouterLink>
        <ArticleList
          class="childen"
          v-if="item.children"
          :list="item.children"
          @select="handleClick"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
export interface ListItem {
  id?: number
  name: string
  isSelect?: boolean
  anchor: string
  articleCount?: number
  children?: ListItem[]
}
interface Props {
  list: ListItem[]
  hash?: string
}
const props = withDefaults(defineProps<Props>(), {
  list: () => [],
})
watch(
  () => props.hash,
  () => {
    const item = getItem(props.list, (e) => e.anchor === props.hash)
    if (!item) return
    handleClick(item)
  },
)
const emit = defineEmits<{
  select: [item: ListItem, oldItem: ListItem | undefined]
}>()
function getItem(arr: ListItem[], callBack: (item: ListItem) => boolean): ListItem | undefined {
  if (!arr.length) return
  for (const i of arr) {
    if (callBack(i)) {
      return i
    }
    if (i.children) {
      const resp = getItem(i.children, callBack)
      if (resp) return resp
    }
  }
}

function handleClick(item: ListItem) {
  const oldItem = getItem(props.list, (entry) => entry.isSelect === true)

  emit('select', item, oldItem)
}
defineExpose({
  getItem,
})
</script>

<style scoped lang="scss">
@use '/src/styles/var';
.article-list-container {
  width: 150px;
  .childen {
    margin-left: 20px;
    font-size: 14px;
  }
  .list {
    .list-item {
      cursor: pointer;
      .item-wrapper {
        display: flex;
        align-items: center;
        transition: all 300ms linear;
        padding-bottom: 10px;
        &:hover,
        &.active {
          color: var.$warn;
        }
        .details {
          margin-left: 3px;
          font-size: 12px;
          color: var.$lightWords;
          transform: scale(0.8);
        }
      }
    }
  }
}
</style>
