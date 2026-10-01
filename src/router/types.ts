import type { RouteRecordRaw } from 'vue-router'

export interface ModuleNavItem {
  label: string
  to: string
}

/**
 * 站点特性模块契约 —— 对齐 miaoapp 种子的 AppModule 思想，
 * 但只保留本站在用的能力：个人站没有菜单权限体系，因此不需要
 * permissions / setup 等字段（见设计文档 §3.3「有意差异」）。
 */
export interface AppModule {
  name: string
  /** 导航排序，越小越靠前 */
  order: number
  /** 贡献给主导航的条目；不填则不出现在导航中 */
  nav?: ModuleNavItem
  /** 本模块的路由，路径为相对路径，挂在 DefaultLayout 之下 */
  routes: RouteRecordRaw[]
}
