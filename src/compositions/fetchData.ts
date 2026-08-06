import { ref, shallowRef, type ShallowRef } from 'vue'
type RequestFunction<TOptions, TData> = (options: TOptions) => Promise<TData>

interface Config<TOptions, TData> {
  fn: RequestFunction<TOptions, TData>
  initialOptions?: TOptions
  immediate?: boolean
  success?: (data: TData, dataRef: ShallowRef<TData | null>) => void
}

export function useFetchData<TData, TOptions>(config: Config<TOptions, TData>) {
  const { immediate = true } = config

  const data = shallowRef<TData | null>(null)
  const error = shallowRef<unknown>(null)
  const loading = ref(false)

  async function execute(options: TOptions = config.initialOptions as TOptions): Promise<TData> {
    loading.value = true
    error.value = null

    try {
      const response = await config.fn(options)
      data.value = response
      config?.success?.(response, data)
      return response
    } catch (cause) {
      error.value = cause

      throw cause
    } finally {
      loading.value = false
    }
  }

  if (immediate) {
    // 错误已经保存在 error 中，避免产生未处理的 Promise 错误
    void execute().catch(() => undefined)
  }

  return {
    data,
    error,
    loading,
    execute,
  }
}
