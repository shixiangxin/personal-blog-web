<template>
  <div class="blog-comment-container">
    <MessageArea
      v-if="!BlogPageLoading"
      @submit="handleSubmit"
      :list="commentListRef"
      :title="'评论列表'"
      :subTitle="data?.total + ''"
      :isListLoading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import MessageArea from '@/components/MessageArea/MessageArea.vue'
import { type FormData, type Callback } from '@/components/MessageArea/types'
import type { PostComment, GetCommentsParms } from '@/api/blog'
import { inject, ref, computed, onBeforeUnmount } from 'vue'
import { useFetchData } from '@/compositions/fetchData'
import { getComments, postComment } from '@/api/blog'
import eventBus from '@/eventBus/index.ts'
const BlogPageLoading = inject('loading')
const blogId = inject<string>('blogId')!
const commentListRef = ref<PostComment[]>([])
const currentPage = ref(1)
const limit = 10
const commentParamsRef = computed<GetCommentsParms>(() => {
  return {
    page: currentPage.value,
    limit,
    blogId,
    keyword: '',
  }
})

const { data, execute, loading } = useFetchData({
  fn: getComments,
  initialOptions: {
    params: commentParamsRef.value,
  },
  success(resp) {
    commentListRef.value.push(...resp.rows)
  },
})

eventBus.$on('message:loadMore', getMoreComment)
onBeforeUnmount(() => {
  eventBus.$off('message:loadMore', getMoreComment)
})
function getMoreComment() {
  const total = data.value === null ? 0 : data.value.total
  //当超出总评论数或正在加载时就不发送请求了
  if (currentPage.value * limit >= total || loading.value) return
  loading.value = true
  execute({
    params: {
      ...commentParamsRef.value,
    },
  })
}
async function handleSubmit(formData: FormData, callback: Callback) {
  const nickname = formData.nickname
  const content = formData.content
  const body = {
    blogId,
    nickname,
    content,
  }
  const { execute } = useFetchData({
    fn: postComment,
    initialOptions: { data: body },
    immediate: false,
  })
  const resp = await execute()
  commentListRef.value.unshift(resp)
  data.value!.total++
  callback('评论成功')
  //提交后先把当前评论先加到页面中
}
</script>

<style scoped></style>
