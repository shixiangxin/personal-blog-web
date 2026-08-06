import { request } from './request'
import { type AxiosRequestConfig } from 'axios'

export interface Banner {
  id: string
  midImg: string
  bigImg: string
  title: string
  description: string
}
type GetBannersOptions = Omit<AxiosRequestConfig, 'url' | 'method'>
export function getBanners(options: GetBannersOptions = {}): Promise<Banner[]> {
  return request<Banner[]>({
    ...options,
    url: '/api/banner',
    method: 'GET',
  })
}
