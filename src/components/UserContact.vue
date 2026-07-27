<template>
  <div class="user-contact-container">
    <a v-for="(item, index) in contacts" :key="index" class="item-wrapper" :href="item.to">
      <div class="contact-item">
        <MenuItem :icon="item.icon" :text="item.text" :qrCode="item.qrCode" /></div
    ></a>
  </div>
</template>
<script setup lang="ts">
import { type IconType } from '@/components/AppIcon/icon.ts'
import MenuItem from '@/components/MenuItem.vue'
import qqQrCode from '@/assets/image/qrcode/QQ.jpg'
import weiXinQrCode from '@/assets/image/qrcode/weixin.jpg'
type MenuItemConfig = {
  text: string
  icon: IconType
  qrCode?: string
  to?: string
}
const contacts: MenuItemConfig[] = [
  {
    text: 'shixiangxin',
    icon: 'github',
  },
  {
    text: 'shixiangxin7@gmail.com',
    icon: 'mail',
    to: 'mailto:shixiangxin@gmail.com',
  },
  {
    text: '839070090',
    icon: 'qq',
    to: 'tencent://message/?Menu=yes&uin=839070090&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45',
    qrCode: qqQrCode,
  },
  {
    text: 'ChenmyO7',
    icon: 'weixin',
    qrCode: weiXinQrCode,
  },
]
</script>
<style scoped lang="scss">
.user-contact-container {
  .item-wrapper {
    display: block;
  }
}
</style>
