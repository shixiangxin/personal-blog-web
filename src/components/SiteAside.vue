<template>
  <div class="site-aside-container">
    <div class="avatar-wrapper">
      <UserAvatar
        url="https://img1.baidu.com/it/u=1357796705,1393813091&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      />
      <div class="name">Hello <span>石翔心</span></div>
    </div>
    <div class="menu-wrapper">
      <MenuBar />
    </div>
    <div class="contact-wrapper">
      <UserContact />
    </div>
  </div>
</template>
<script setup lang="ts">
import UserAvatar from '@/components/UserAvatar.vue'
import MenuBar from '@/components/MenuBar.vue'
import UserContact from '@/components/UserContact.vue'
</script>
<style scoped lang="scss">
@use '/src/styles/var';
.site-aside-container {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  justify-content: space-between;
  color: var.$gray;
  background-color: var.$dark;
  height: 100%;
  .avatar-wrapper,
  .menu-wrapper,
  .contact-wrapper {
    margin-bottom: 10px;
  }
  .avatar-wrapper {
    .name {
      text-align: center;
      margin-top: 10px;
    }
  }
  .menu-wrapper {
    flex: 1 1 auto;
  }
  .contact-wrapper {
    padding: 0 10px;
  }
}
</style>
