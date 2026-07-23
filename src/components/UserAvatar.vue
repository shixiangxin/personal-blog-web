<template>
  <div
    class="avatar-container"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  >
    <img :src="url" alt="" />
  </div>
</template>
<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 100,
  },
})
</script>
<style lang="scss" scoped>
@use '@/styles/mixin';
.avatar-container {
  margin: 0 auto;
}
img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}
</style>
