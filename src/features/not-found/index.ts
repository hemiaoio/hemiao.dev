import type { AppModule } from '@/router/types'

/**
 * 404 兜底。order 取最大值，保证通配路由在各模块路由之后注册。
 */
const notFoundModule: AppModule = {
  name: 'not-found',
  order: 999,
  routes: [
    {
      path: ':pathMatch(.*)*',
      name: 'not-found',
      component: () => import('./views/NotFoundView.vue'),
      meta: { title: '页面不存在' },
    },
  ],
}

export default notFoundModule
