<template>
  <div class="message-area-container">
    <DataForm v-bind="$attrs" />
    <h3>
      {{ title }}
      <span>{{ subTitle }}</span>
    </h3>
    <DataList :list="list" />
    <div v-loading="isListLoading" class="loading"></div>
  </div>
</template>

<script setup lang="ts">
import DataForm from './DataForm.vue'
import DataList from './DataList.vue'
import { type PostComment } from '@/api/blog.ts'
defineOptions({
  inheritAttrs: false,
})

interface Props {
  title?: string
  subTitle?: string
  list?: PostComment[]
  isListLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '列表',
  subTitle: '0条',
  list: () => [],
  isListLoading: false,
})
</script>

<style scoped lang="scss">
.loading {
  position: relative;
  height: 100px;
}
</style>
