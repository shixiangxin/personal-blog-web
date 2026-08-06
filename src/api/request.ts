import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import showMessage from '@/utils/showMessage'

export interface ApiResponse<T> {
  code: number
  msg: string
  data: T
}

export class ApiError extends Error {
  constructor(
    public readonly code: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

const instance = axios.create({
  timeout: 10000,
})

instance.interceptors.response.use(
  (response) => {
    const result = response.data as ApiResponse<unknown>

    if (result.code !== 0) {
      const message = result.msg || '请求失败'

      showMessage({
        content: message,
        type: 'error',
        duration: 1500,
      })

      throw new ApiError(result.code, message)
    }

    return response
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    const message = error.response?.data?.msg || error.message || '网络异常，请稍后重试'

    showMessage({
      content: message,
      type: 'error',
      duration: 1500,
    })

    return Promise.reject(error)
  },
)

/**
 * 发送请求并直接返回业务数据。
 */
export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await instance.request<ApiResponse<T>>(config)
  return response.data.data
}

export default instance
