import { request } from './request'
import { type AxiosRequestConfig } from 'axios'
//获取所有文章类型
export function getBlogTypes() {
  return request<BlogType[]>({
    url: '/api/blogtype',
    method: 'GET',
  })
}
export interface BlogType {
  id: number
  name: string
  articleCount: number //该分类下文章的数量
  order: number
}

export function getBlogs(
  options: Options & {
    params: GetBlogsParams
  } = {
    params: { page: 1, limit: 10, categoryid: -1, keyword: '' },
  },
) {
  return request<BlogList>({
    ...options,
    url: '/api/blog',
    method: 'GET',
  })
}
export interface BlogList {
  total: number //总数
  rows: BlogListItem[]
}
export interface Category {
  id: number
  name: string
}
export interface BlogListItem {
  // 当前页列表数据
  id: string
  title: string
  description: string
  category: Category
  scanNumber: number
  commentNumber: number
  thumb: string
  createDate: number
}
type Options = Omit<AxiosRequestConfig, 'url' | 'method'>
interface GetBlogsParams {
  page?: number
  limit?: number
  categoryid?: number
  keyword?: string
}
//获取单个文章
export function getBlog(
  options: Options & {
    id: string
  },
) {
  return request<Blog>({
    ...options,
    url: `/api/blog/${options.id}`,
    method: 'GET',
  })
}

export interface BlogTocItem {
  name: string
  anchor: string
  children?: BlogTocItem[]
}
export interface Blog {
  id: string
  title: string

  category: Category

  /** 浏览次数 */
  scanNumber: number

  /** 评论数 */
  commentNumber: number

  /** 博客描述 */
  description: string

  /** 创建日期，时间戳 */
  createDate: number

  /** 博客章节目录 */
  toc: BlogTocItem[]

  /** 博客 HTML 内容 */
  htmlContent: string

  /** 缩略图地址 */
  thumb: string
}
//提交评论
export function postComment(
  options: Options & {
    data: PostCommentParams
  },
) {
  return request<PostComment>({
    ...options,
    url: `/api/comment`,
    method: 'POST',
  })
}
export interface PostCommentParams {
  nickname: string
  content: string
  blogId: string
}
export interface PostComment {
  id: string
  nickname: string
  content: string
  createDate: number
  avatar: string
}
//获取评论
export function getComments(
  options: Options & {
    params: GetCommentsParms
  },
) {
  return request<GetComment>({
    ...options,
    url: `/api/comment`,
    method: 'get',
  })
}
export interface GetCommentsParms {
  page: number
  limit: number
  blogId: string
  keyword: string
}
export interface Comment {
  id: string
  nickname: string
  content: string
  blog: {
    id: number
    title: string
  }
  createDate: number
  avatar: string
}
interface GetComment {
  total: number
  rows: Comment[]
}
