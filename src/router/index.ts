import type { RouteRecordRaw } from 'vue-router'
import { featureRoutes } from './modules'

/**
 * 壳级路由：只保留布局与根路径。
 * 所有业务路由（含 404 兜底）都由 features/ 各模块贡献（见 modules.ts），这里不做登记。
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: featureRoutes,
  },
]
