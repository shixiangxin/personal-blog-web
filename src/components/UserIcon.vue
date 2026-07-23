<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const iconClassMap = {
  home: 'icon-shouye',
  success: 'icon-70chenggong',
  error: 'icon-error',
  close: 'icon-close',
  warn: 'icon-warn',
  info: 'icon-info-circle',
  blog: 'icon-wenzhang',
  code: 'icon-code',
  about: 'icon-guanyuwomen',
  weixin: 'icon-weixin',
  mail: 'icon-youxiang',
  github: 'icon-github',
  qq: 'icon-QQ',
  arrowUp: 'icon-Up',
  arrowDown: 'icon-arrow-down-bold',
  empty: 'icon-wushuju',
  chat: 'icon-jurassic_message',
} as const

type IconType = keyof typeof iconClassMap

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
