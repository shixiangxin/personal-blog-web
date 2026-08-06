<template>
  <div class="image-loader-container">
    <img v-if="everythingDone" class="placeholder" :src="placeholder" alt="" />
    <img
      @load="handleLoad"
      :src="url"
      alt=""
      :style="{
        opacity: +originLoaded,
        transition: duration + 'ms',
      }"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const originLoaded = ref(false) //原图是否加载完成
const everythingDone = ref(false) //是否全部完成
interface Props {
  url: string
  placeholder: string
  duration?: number
}
interface Emits {
  (e: 'load'): void
}
const props = withDefaults(defineProps<Props>(), {
  duration: 1500,
})
const emit = defineEmits<Emits>()

function handleLoad() {
  originLoaded.value = true
  setTimeout(() => {
    everythingDone.value = true
    emit('load')
  }, props.duration)
}
</script>
<style lang="scss" scoped>
@use '/src/styles/mixin.scss';
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  img {
    @include mixin.self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(2vw);
  }
}
</style>
