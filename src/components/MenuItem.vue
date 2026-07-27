<template>
  <div class="menu-item-container">
    <div class="item-content">
      <AppIcon
        :type="icon"
        :style="{
          fontSize: `${iconSize}px`,
        }"
      ></AppIcon
      ><span>{{ text }}</span>
    </div>
    <div v-if="qrCode" class="qr-code-container">
      <img class="qr-code" :src="qrCode" alt="" />
    </div>
  </div>
</template>
<script setup lang="ts">
import AppIcon from '@/components/AppIcon'
import type { IconType } from '@/components/AppIcon/icon'
interface Props {
  icon: IconType
  text: string
  qrCode?: string
  iconSize?: number
}
withDefaults(defineProps<Props>(), {
  iconSize: 20,
})
</script>
<style scoped lang="scss">
@use '/src/styles/var';
$QRCodeSize: 150px;
.menu-item-container {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .item-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    transition: all 0.5s linear 0.1s;
    span {
      flex: 1 0 auto;
      margin-left: 5px;
    }
    &:hover + .qr-code-container {
      transform: translateY(-105%) scaleY(1);
    }
  }
  .qr-code-container {
    position: absolute;
    cursor: auto;
    width: $QRCodeSize;
    height: $QRCodeSize;
    top: 0;
    transform: translateY(-105%) scaleY(0);
    background-color: #fff;
    padding: 8px;
    transform-origin: center 105%;
    transition: all 150ms linear;
    border-radius: 5px;
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50%) rotate(45deg);

      border: 5px solid #fff;
    }
    img {
      display: block;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
