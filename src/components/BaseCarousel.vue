<template>
  <div class="base-carousel-container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
interface Props {
  data: unknown[]
  duration?: number //停留时间
  seamless?: boolean // 是否无缝轮播
}
interface Emits {
  (e: 'change', index: number): void
}
const props = withDefaults(defineProps<Props>(), {
  duration: 1000,
  seamless: true,
})
const emit = defineEmits<Emits>()
const timerIdRef = ref<number | undefined>(undefined)
const indexRef = ref(0)
function to(index: number) {
  indexRef.value = index
  emit('change', index)
}

function prev() {
  let index = indexRef.value - 1
  const length = props.data.length
  if (props.seamless) {
    //无缝轮播
    index = index < 0 ? length - 1 : index
  } else {
    index = index < 0 ? 0 : index
  }
  to(index)
}
function next() {
  let index = indexRef.value + 1
  const length = props.data.length
  if (props.seamless) {
    //无缝轮播
    index = index >= length ? 0 : index
  } else {
    index = index >= length ? length - 1 : index
  }
  indexRef.value = index
  to(index)
}
function start(index?: number) {
  if (index) {
    to(index)
  }
  if (timerIdRef.value !== undefined) return
  timerIdRef.value = setInterval(() => {
    next()
  }, props.duration)
}
function stop() {
  clearInterval(timerIdRef.value)
  timerIdRef.value = undefined
}

onBeforeUnmount(stop)
defineExpose({
  next,
  prev,
  start,
  stop,
  to,
})
</script>

<style scoped lang="scss">
.base-carousel-container {
  min-height: 100%;
  min-width: 100%;
}
</style>
