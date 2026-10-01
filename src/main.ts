import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import '@/theme'
import '@/styles/main.scss'

/**
 * vite-ssg 要求导出 createApp 而不是直接 app.mount()。
 * 构建期由它把每个路由渲染成静态 HTML，客户端再由这个入口 hydrate。
 */
export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
    scrollBehavior(_to, _from, savedPosition) {
      return savedPosition ?? { top: 0 }
    },
  },
  () => {
    // 主题状态在 @/theme 模块求值时已同步初始化，无需在此额外处理
  }
)
