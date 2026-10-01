import type { RouteRecordRaw } from 'vue-router'
import type { AppModule, ModuleNavItem } from './types'

/**
 * 约定优于注册：用 import.meta.glob 自动发现 src/features/*\/index.ts。
 * 新增一个区块 = 新增一个文件夹，**不需要改这个文件，也不需要改任何中心路由表**。
 * 这是对齐 miaoapp 种子 P1 原则的关键（见设计文档 §3.2）。
 */
const discovered = import.meta.glob<{ default: AppModule }>('../features/*/index.ts', {
  eager: true,
})

export const featureModules: AppModule[] = Object.values(discovered)
  .map((mod) => mod.default)
  .sort((a, b) => a.order - b.order)

export const featureRoutes: RouteRecordRaw[] = featureModules.flatMap((mod) => mod.routes)

export const navItems: ModuleNavItem[] = featureModules
  .map((mod) => mod.nav)
  .filter((nav): nav is ModuleNavItem => Boolean(nav))
