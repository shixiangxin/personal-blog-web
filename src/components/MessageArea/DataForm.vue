<template>
  <div class="data-form-container">
    <form
      id="data-form-container"
      ref="formRef"
      @submit.prevent="handleSubmit"
      class="data-form-container"
    >
      <div class="form-item">
        <div class="input-area">
          <input type="text" maxlength="10" v-model="formData.nickname" placeholder="用户昵称" />
          <span class="tip">{{ formData.nickname.length }}/10</span>
        </div>
        <div class="error">{{ error.nickname }}</div>
      </div>
      <div class="form-item">
        <div class="text-area">
          <textarea maxlength="300" placeholder="输入内容" v-model="formData.content"></textarea>
          <span class="tip">{{ formData.content.length }}/300</span>
        </div>
        <div class="error">{{ error.content }}</div>
      </div>
      <div class="form-item">
        <div class="button-area">
          <button :disabled="isSubmitingRef">
            {{ isSubmitingRef ? '提交中...' : '提交' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import showMessage from '@/utils/showMessage'
import { type FormData, type Callback } from './types'
const emit = defineEmits<{
  submit: [data: FormData, callback: Callback]
}>()
const formData = reactive<FormData>({
  nickname: '',
  content: '',
})
const formRef = ref<HTMLElement | undefined>(undefined)
const error = reactive<FormData>({
  nickname: '',
  content: '',
})
const isSubmitingRef = ref(false)
function handleSubmit() {
  error.nickname = formData.nickname ? '' : '请填写昵称'
  error.content = formData.content ? '' : '请填写内容'
  if (error.nickname || error.content) {
    // 有错误
    return
  }
  isSubmitingRef.value = true // 正在提交，防止重复点击
  emit('submit', formData, callback) // 让父组件来处理事件
}
function callback(successMsg: string) {
  showMessage({
    content: successMsg,
    type: 'success',
    duration: 1000,
    container: formRef?.value,
    onClose: () => {
      isSubmitingRef.value = false
      formData.nickname = ''
      formData.content = ''
    },
  })
}
</script>

<style scoped lang="scss">
@use 'sass:color';
@use '/src/styles/var';
.data-form-container {
  margin-bottom: 20px;
  overflow: hidden;

  .form-item {
    margin-bottom: 8px;
  }

  .input-area {
    position: relative;
    width: 50%;
  }

  .text-area {
    position: relative;
  }

  .tip {
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: #b4b8bc;
    font-size: 12px;
  }

  input,
  textarea {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border: 1px dashed var.$gray;
    outline: none;
    color: var.$words;
    font-size: 14px;
    border-radius: 4px;

    &:focus {
      border-color: var.$primary;
    }
  }

  input {
    height: 40px;
    padding: 0 15px;
  }

  textarea {
    height: 120px;
    padding: 8px 15px;
    resize: none;
  }

  .error {
    height: 20px;
    margin-top: 6px;
    color: var.$danger;
    font-size: 14px;
    line-height: 20px;
  }

  button {
    position: relative;
    width: 100px;
    height: 34px;
    border: none;
    border-radius: 4px;
    outline: none;
    color: #fff;
    background: var.$primary;
    cursor: pointer;

    &:hover {
      background: color.adjust(var.$primary, $lightness: -10%);
    }

    &:disabled {
      background: color.adjust(var.$primary, $lightness: 20%);
      cursor: not-allowed;
    }
  }
}
</style>
