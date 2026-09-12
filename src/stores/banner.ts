import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getBanners, type Banner } from '@/api/banner'
import { useFetchData } from '@/compositions/fetchData'

export const useBannerStore = defineStore('banner', () => {
  const banners = ref<Banner[]>([])
  const isLoading = ref(true)

  const hasBanners = computed(() => banners.value.length > 0)

  async function fetchBanners(): Promise<Banner[]> {
    const { execute } = useFetchData({ fn: getBanners, immediate: false })
    const resp = await execute()
    isLoading.value = false
    banners.value = resp
    return resp
  }

  return {
    banners,
    isLoading,
    hasBanners,
    fetchBanners,
  }
})
