<template>
  <div class="base-pagination-container" v-if="total > 0">
    <a @click="handleClick(1)" :class="{ disabled: currentPage === 1 }">|&lt;&lt;</a>
    <a @click="handleClick(currentPage - 1)" :class="{ disabled: currentPage === 1 }">&lt;&lt;</a>
    <a
      v-for="(item, index) in pages"
      :key="index"
      @click="handleClick(item)"
      :class="{
        active: currentPage === item,
      }"
      >{{ item }}</a
    >
    <a @click="handleClick(currentPage + 1)" :class="{ disabled: currentPage === pageNumber }"
      >&gt;&gt;</a
    >
    <a @click="handleClick(pageNumber)" :class="{ disabled: currentPage === pageNumber }"
      >&gt;&gt;|</a
    >
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  total?: number
  currentPage?: number
  limit?: number
  visiblePages?: number
}
interface Emits {
  (e: 'pageChange', page: number): void
}
const props = withDefaults(defineProps<Props>(), {
  total: 100,
  currentPage: 1,
  limit: 10,
  visiblePages: 10,
})
const emit = defineEmits<Emits>()

const pageNumber = computed(() => Math.ceil(props.total / props.limit)) //总页数
const minPageNumber = computed(() => {
  let num = props.currentPage - Math.floor(props.visiblePages / 2) + 1
  if (num <= 1) num = 1
  return num
})
const maxPageNumber = computed(() => {
  let num = props.currentPage + Math.floor(props.visiblePages / 2)
  if (num >= pageNumber.value) num = pageNumber.value
  return num
})
const pages = computed(() => {
  const numbers = []
  let min = minPageNumber.value
  let max = maxPageNumber.value
  if (min <= 1) {
    const temp = max + Math.abs(max - min - (props.visiblePages - 1))
    max = temp >= pageNumber.value ? pageNumber.value : temp
  } else if (max >= pageNumber.value) {
    min = min - Math.abs(max - min - (props.visiblePages - 1))
  }
  for (let i = min; i <= max; i++) {
    numbers.push(i)
  }
  return numbers
})
function handleClick(page: number) {
  emit('pageChange', page)
}
</script>
<style lang="scss" scoped>
@use '/src/styles/var';
.base-pagination-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: var.$primary;
    margin: 0 6px;
    cursor: pointer;
    &.disabled {
      color: var.$lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: var.$words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>
