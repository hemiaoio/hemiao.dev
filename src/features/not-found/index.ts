import type { AppModule } from '@/router/types'

const NotFoundView = () => import('./views/NotFoundView.vue')

/**
 * 404 兜底。order 取最大值，保证通配路由在各模块路由之后注册。
 *
 * 为什么除通配路由外还要声明一条静态 `/404` 路由：
 * vite-ssg 只会预渲染 `routesToPaths()` 推导出来的路径，而通配路由是
 * `:pathMatch(.*)*`，含 `:` 与 `*`，会被 `includedRoutes` 的过滤器排除，
 * 结果就是**永远产不出 `dist/404.html`**。
 * 静态路径 `/404` 不含通配符，能顺利通过过滤并被渲染成 `dist/404.html`，
 * 供 GitHub Pages / Netlify 等平台在命中未知路径时兜底返回。
 * 这条路由同时也是可访问的（`https://hemiao.dev/404`），语义上并不算造物。
 */
const notFoundModule: AppModule = {
  name: 'not-found',
  order: 999,
  routes: [
    {
      path: '/404',
      name: 'not-found-page',
      component: NotFoundView,
      meta: { title: '页面不存在' },
    },
    {
      path: ':pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: '页面不存在' },
    },
  ],
}

export default notFoundModule
