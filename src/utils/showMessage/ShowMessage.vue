<template>
  <Transition>
    <div
      :class="['show-message-container', `message-${type}`]"
      v-if="visibleRef"
      v-bind:is-show="visibleRef"
      :style="{
        position: fixed ? 'fixed' : 'absolute',
      }"
    >
      <AppIcon class="icon" :type="type" /><span class="content">{{ content }}</span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppIcon from '@/components/AppIcon'
import type { MessageType } from '.'

interface Props {
  content?: string
  type?: MessageType
  duration?: number
  fixed?: false
}

const props = withDefaults(defineProps<Props>(), {
  content: '不可用',
  type: 'info',
  duration: 2000,
  fixed: false,
})
interface Emits {
  unmount: []
}
const emit = defineEmits<Emits>()
const visibleRef = ref(false)
let timerId: number | undefined = undefined
function open() {
  visibleRef.value = true
  //有值说明已经打开过一次了，就不再打开了，之后再看是否传的是0，0表示不关闭
  if (props.duration <= 0) return
  timerId = setTimeout(close, props.duration)
}
function close() {
  clearTimeout(timerId)
  timerId = undefined
  visibleRef.value = false
  emit('unmount')
}
onMounted(open)

defineExpose({ close, open })
</script>

<style scoped lang="scss">
@use '/src/styles/var';
@use '/src/styles/mixin.scss';
$fontSize: 16px;
.show-message-container {
  @include mixin.self-center();
  display: flex;
  font-size: $fontSize;
  justify-content: center;
  align-items: center;
  color: var.$white;
  padding: 20px 20px;
  border-radius: 10px;
  overflow: hidden;
  transition: all 150ms linear;
  .icon {
    font-size: $fontSize + 5px;
  }
  .content {
    margin-left: 3px;
  }
  &.message {
    &-info {
      background-color: var.$primary;
    }
    &-success {
      background-color: var.$success;
    }
    &-warn {
      background-color: var.$warn;
    }
    &-error {
      background-color: var.$danger;
    }
  }
}

.v-enter-from {
  transform: translate(-50%, 20%);
  opacity: 0;
}

.v-leave-to {
  opacity: 0;
}
</style>
