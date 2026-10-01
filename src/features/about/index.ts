import type { AppModule } from '@/router/types'

const aboutModule: AppModule = {
  name: 'about',
  order: 50,
  nav: { label: '关于', to: '/about' },
  routes: [
    {
      path: 'about',
      name: 'about',
      component: () => import('./views/AboutView.vue'),
      meta: { title: '关于我' },
    },
  ],
}

export default aboutModule
