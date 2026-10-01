import type { AppModule } from '@/router/types'

const homeModule: AppModule = {
  name: 'home',
  order: 10,
  nav: { label: '首页', to: '/' },
  routes: [
    {
      path: '',
      name: 'home',
      component: () => import('./views/HomeView.vue'),
      meta: { title: '首页' },
    },
  ],
}

export default homeModule
