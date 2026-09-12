<template>
  <ul class="data-list-container">
    <li v-for="item in list" :key="item.id">
      <Avatar :url="item.avatar" :size="44" />
      <div class="data">
        <div class="nickname">{{ item.nickname }}</div>
        <div class="content">{{ item.content }}</div>
        <div class="time">{{ formatTimestamp(item.createDate) }}</div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import Avatar from '@/components/UserAvatar.vue'
import { formatTimestamp } from '@/utils/formatTimestamp'
import { type PostComment } from '@/api/blog'
interface Props {
  list: PostComment[]
}
withDefaults(defineProps<Props>(), {
  list: () => [],
})
</script>

<style scoped lang="scss">
@use '/src/styles/var';
.data-list-container {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: flex;
  border-bottom: 1px solid lighten(var.$gray, 20%);
  padding: 15px 0;
}
.avatar-container {
  margin-right: 15px;
  flex: 0 0 auto;
}
.nickname {
  color: darken(var.$success, 10%);
  margin-bottom: 10px;
}
.content {
  font-size: 14px;
}
.data {
  flex: 1 1 auto;
  position: relative;
}
.time {
  position: absolute;
  right: 0;
  top: 5px;
  font-size: 12px;
  color: var.$gray;
}
</style>
