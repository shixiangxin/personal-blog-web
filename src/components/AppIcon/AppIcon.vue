<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { iconClassMap, type IconType } from './icon'

interface Props {
  type: IconType
}

const props = defineProps<Props>()

const fontClass = computed(() => iconClassMap[props.type])
</script>
<style scoped lang="scss">
@import '//at.alicdn.com/t/c/font_4032070_v21fv5053d9.css';
.iconfont {
  color: inherit;
  font-size: inherit;
}
</style>
