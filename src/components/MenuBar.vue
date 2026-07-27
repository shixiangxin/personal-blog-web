<template>
  <div class="menu-bar-container">
    <RouterLink class="item-wrapper" :to="item.link" v-for="item in items" :key="item.link">
      <div
        class="menu-item"
        :class="{
          selected: isSelected(item),
        }"
      >
        <MenuItem :icon="item.icon" :text="item.title" />
      </div>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import MenuItem from '@/components/MenuItem.vue'
import { type IconType } from '@/components/AppIcon/icon.ts'
import { useRoute } from 'vue-router'

type MenuItemConfig = {
  link: string
  title: string
  icon: IconType
  startWith?: boolean
}

const items: MenuItemConfig[] = [
  { link: '/', title: '首页', icon: 'home' },
  { link: '/blog', title: '文章', icon: 'blog', startWith: true },
  { link: '/about', title: '关于我', icon: 'about' },
  { link: '/project', title: '项目&效果', icon: 'code' },
  { link: '/message', title: '留言板', icon: 'chat' },
]
const route = useRoute()
function isSelected(item: MenuItemConfig) {
  const link = item.link.toLowerCase() //大写转换成小写
  const currentPath = route.path.toLowerCase() // 当前浏览器的访问路径

  return currentPath === link || currentPath.startsWith(`${link}/`)
}
</script>
<style scoped lang="scss">
@use '/src/styles/var';
@use 'sass:color';
.menu-bar-container {
  .item-wrapper {
    .menu-item {
      padding: 0 30px;
      &.selected {
        color: #fff;
        background-color: color.adjust(var.$words, $lightness: -3%);
      }
    }
  }
}
</style>
