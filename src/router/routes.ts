import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_PATH } from './constants'
import Home from '@/views/Home'
import About from '@/views/About'
import Blog from '@/views/Blog'
import Project from '@/views/Project'
import Message from '@/views/Message'
import BlogDetail from '@/views/Blog/components/BlogDetail'
export default [
  { name: 'Home', path: ROUTE_PATH.HOME, component: Home },
  { name: 'About', path: ROUTE_PATH.ABOUT, component: About },
  { name: 'Blog', path: ROUTE_PATH.BLOG, component: Blog },
  { name: 'CategoryBlog', path: `${ROUTE_PATH.BLOG}/cate/:categoryId`, component: Blog },
  { name: 'BlogDetail', path: `${ROUTE_PATH.BLOG}/detail/:blogId`, component: BlogDetail },
  { name: 'Project', path: ROUTE_PATH.PROJECT, component: Project },
  { name: 'Message', path: ROUTE_PATH.MESSAGE, component: Message },
] satisfies RouteRecordRaw[]
