<template>
  <div class="empty-page-container">
    <AppIcon type="empty"></AppIcon>
    <p>{{ text }}</p>
  </div>
</template>
<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
interface Props {
  text?: string
}
withDefaults(defineProps<Props>(), {
  text: '暂无内容',
})
</script>
<style scoped lang="scss">
@use '/src/styles/mixin';
@use '/src/styles/var';
.empty-page-container {
  @include mixin.self-center(absolute);
  color: var.$gray;
  text-align: center;
  .icon-container {
    font-size: 100px;
  }
  p {
    font-size: 20px;
    margin: 0;
  }
}
</style>
