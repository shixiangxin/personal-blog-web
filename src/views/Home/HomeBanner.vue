<template>
  <div v-loading="isLoading" ref="containerRef" class="home-banner-container" @wheel="handleWheel">
    <BaseCarousel
      :data="data || []"
      @change="handleIndexChange"
      @transitionend.self="handleCloseTransition"
      :style="{
        transition: duration ? `all ${duration}ms linear` : '',
        transform: `translate(${0}px,-${currentIndex * height}px)`,
      }"
      ref="carpiselRef"
    >
      <div
        v-for="item in data"
        :key="item.id"
        class="banner-item"
        :style="{
          width: width + 'px',
          height: height + 'px',
        }"
      >
        <ImageLoader :url="item.bigImg" :placeholder="item.midImg" @load="imageLoad" />
      </div>
    </BaseCarousel>
  </div>
</template>

<script setup lang="ts">
import BaseCarousel from '@/components/BaseCarousel.vue'
import ImageLoader from '@/components/ImageLoader.vue'
import { getBanners } from '@/api/banner'
import { useFetchData } from '@/compositions/fetchData'
import { ref, onBeforeUnmount, onMounted, computed } from 'vue'
import { useDebounce } from '@/utils/debounce'
onMounted(() => {
  if (!containerRef.value) return
  // const e = useDebounce(([entry]) => {
  //   width.value = entry?.contentRect.width ?? 0
  //   height.value = entry?.contentRect.height ?? 0
  // }, 100)
  resizeObserver = new ResizeObserver(([entry]) => {
    // e([entry])
    width.value = entry?.contentRect.width ?? 0
    height.value = entry?.contentRect.height ?? 0
  })
  resizeObserver.observe(containerRef.value)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
const { data } = useFetchData({
  fn: getBanners,
  success(data, dataRef) {
    if (data.length <= 0) return
    const arr = [data[data.length - 1], ...data, data[0]] as typeof data
    dataRef.value = arr
    handleInit(1)
  },
})
const isLoading = ref(true) //加载动画
const containerRef = ref<HTMLElement | null>(null) //最外容器
const carpiselRef = ref<InstanceType<typeof BaseCarousel> | null>(null)
const imageEverythingDoneRef = ref(false)
const width = ref(0)
const height = ref(0)
const currentIndex = ref(0)
const duration = ref(500)
let resizeObserver: ResizeObserver | undefined
function imageLoad() {
  if (imageEverythingDoneRef.value === false) {
    imageEverythingDoneRef.value = true
    isLoading.value = false
  }
}
function handleIndexChange(index: number) {
  currentIndex.value = index
}

//重置状态
function handleInit(index: number) {
  duration.value = index //为0时会关闭元素的过渡动画
  currentIndex.value = index
  carpiselRef.value?.to(index) //更新指示器的index
  setTimeout(() => {
    const d = 500
    duration.value = d
  })
}
function handleCloseTransition() {
  //到最后一个的情况
  if (data.value !== null && currentIndex.value === data.value?.length - 1) {
    handleInit(1)
  } else if (data.value !== null && currentIndex.value === 0) {
    handleInit(data.value.length - 2)
  }
}
const prev = computed(() => {
  let fn = carpiselRef.value?.prev
  if (fn === null || fn === undefined) fn = () => {}
  return useDebounce(fn, 500)
})
const next = computed(() => {
  let fn = carpiselRef.value?.next
  if (fn === null || fn === undefined) fn = () => {}
  return useDebounce(fn, 500)
})
function handleWheel(e: WheelEvent) {
  if (e.deltaY > 0) {
    // 向下
    next.value()
  } else {
    prev.value()
  }
}
</script>

<style scoped lang="scss">
@use '/src/styles/mixin.scss';
.home-banner-container {
  @include mixin.self-fill();
  overflow: hidden;
  .banner-item {
    width: 100%;
    height: 100%;
    background-color: black;
  }
}
</style>
